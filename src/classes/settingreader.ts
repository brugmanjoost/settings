import { SettingReaderOptions }                             /**/ from './settingreaderoptions';
import { EnvVariableMissingError, EnvVariableInvalidError } /**/ from './error';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Class:       SettingReader
//
// Description: Base class for all datatype readers
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export abstract class SettingReader<T> {

    #name:                  /**/ string;
    #delimiter:             /**/ string;
    #quote:                 /**/ string;
    #escape:                /**/ string;
    #minItems:              /**/ number;
    #maxItems:              /**/ number;
    #minLength:             /**/ number;
    #maxLength:             /**/ number;
    #minValue:              /**/ number | Date;
    #maxValue:              /**/ number | Date;
    #match?:                /**/ RegExp;
    #enumValues:            /**/ T[];
    #treatEmptyAsNotPresent:/**/ boolean;
    #isOptional:            /**/ boolean;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    constructor
    //
    // Description: 
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(name: string, opts?: SettingReaderOptions<T>) {
        opts                        /**/ = opts ?? {}
        this.#name                  /**/ = name;
        this.#delimiter             /**/ = opts.delimiter               /**/ ?? ',';        // Delimiter
        this.#quote                 /**/ = opts.quote                   /**/ ?? '"';        // Quote symbol
        this.#escape                /**/ = opts.escape                  /**/ ?? '\\';       // Escape character
        this.#minItems              /**/ = opts.minItems                /**/ ?? 0;          // Minimum number of items to read.
        this.#maxItems              /**/ = opts.maxItems                /**/ ?? Infinity;   // Maximum number of items to read.
        this.#minLength             /**/ = opts.minLength               /**/ ?? 0;          // Constraint: Minimum length for string values
        this.#maxLength             /**/ = opts.maxLength               /**/ ?? Infinity;   // Constraint: Maximum length for string values
        this.#minValue              /**/ = opts.minValue                /**/ ?? -Infinity;  // Constraint: Minimum value for integer and float values
        this.#maxValue              /**/ = opts.maxValue                /**/ ?? Infinity;   // Constraint: Maximum value for integer and float values
        this.#match                 /**/ = opts.match;                                      // Constraint: A regular expression that must match a value
        this.#enumValues            /**/ = opts.enumValues              /**/ ?? [];         // Constraint: A fixed number of possible values
        this.#treatEmptyAsNotPresent/**/ = opts.treatEmptyAsNotPresent  /**/ ?? true;       // Converts empty values into undefined before checking if the value isOptional
        this.#isOptional            /**/ = opts.isOptional              /**/ ?? false;      // Allowance: Does not throw missing if value is not present and defaultValue is undefined.
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    decodeCSVLine
    //
    // Description: For lists of values, treat the value as a csv line and decode.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private decodeCSVLine(line: string): string[] {
        let insideQuote     /**/ = false;//
        let token           /**/ = '';
        let result          /**/ = [];
        let wasEscape       /**/ = false;

        for (let i = 0; i < line.length; i++) {
            let char = line[i];

            if (insideQuote) {

                if ((char === this.#quote) && (this.#quote === this.#escape)) {
                    // If the quote and escape are the same, and the next character is also a quote, 
                    // then treat the current quote as an escape.
                    if (line[i + 1] === this.#quote) {
                        token += this.#quote;  // Add the escaped quote to the token.
                        i++;  // Skip the next quote since it's part of the escape sequence.
                    } else {
                        insideQuote = false;
                    }
                } else if (char === this.#quote && !wasEscape) {
                    insideQuote = false;
                } else if (char === this.#escape) {
                    if (wasEscape) {
                        token += this.#escape;
                        wasEscape = false;
                    } else {
                        wasEscape = true;
                    }
                } else {
                    if (wasEscape && char !== this.#quote) {
                        token += this.#escape; // Add escaped char if not quote
                    }
                    token += char;
                    wasEscape = false;
                }
            } else {
                if (char === this.#delimiter) {
                    result.push(token);
                    token = '';
                } else if (char === this.#quote) {
                    insideQuote = true;
                } else {
                    token += char;
                }
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Make sure the last token is terminated.
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (insideQuote) this.invalidValueError(`Quote of last value in list is unclosed.`);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Add last token
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        result.push(token);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Validate list meets requirements
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (result.length < this.#minItems) this.invalidValueError(`Expecting at least ${this.#minItems} values.`);
        if (result.length > this.#maxItems) this.invalidValueError(`Expecting at most ${this.#maxItems} values.`);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Done
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        return result.map(item => item.trim()); // Trim whitespace
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    getValue
    //
    // Description: Read an individual value from the environment. For values that are missing or empty the defaultValue is returned without
    //              inspecting that default value. Values that are set are converted into their usable value using a client class implementation
    //              of convertRawValueToUsableValue.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public getValue(defaultValue?: T): T | undefined {
        let rawValue = this.#emptyToUndefined(process.env[this.#name]);
        if (rawValue === undefined) {
            if (this.#isOptional) return undefined;
            if (defaultValue === undefined) this.missingValueError();
            return defaultValue;
        } else {
            return this.convertRawValueToUsableValue(rawValue);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    getList
    //
    // Description: Gets a list of T values as an array. As input the environment variable is interpreted as a CSV line.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public getList(defaultValue?: T[]): T[] | undefined {
        let rawValue = this.#emptyToUndefined(process.env[this.#name]);
        if (rawValue === undefined) {
            if (this.#isOptional) return undefined;
            if (defaultValue === undefined) this.missingValueError();
            return defaultValue;
        } else {
            return this.decodeCSVLine(rawValue).map((valueFromList: string) => this.convertRawValueToUsableValue(valueFromList));
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    #emptyToUndefined
    //
    // Description: On some systems setting an environment variable to empty deletes it, yet in other environments the same empty string is passed
    //              as a value. Therefore, by default we treat empty strings as undefined. Making them undefined enters them into being overruled by
    //              defaultValue at a later stage.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    #emptyToUndefined(rawValue?: string): string | undefined {
        if (rawValue !== '') return rawValue;
        return this.#treatEmptyAsNotPresent
            ? undefined
            : rawValue;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    missingValueError
    //
    // Description: Throws an error the environment variable we're trying is not present.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected missingValueError(): never {
        throw new EnvVariableMissingError(`Configuration error: Missing environment variable '${this.#name}'.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    invalidValueError
    //
    // Description: Throws an error naming the environment variable we're trying to get and a message.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected invalidValueError(msg: string): never {
        throw new EnvVariableInvalidError(`Configuration error: Invalid value for environment variable '${this.#name}'. ${msg}`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    summarizeValues
    //
    // Description: Creates a printable list of values as part of constructing a message for invalidValueError.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected summarizeValues(arr: string[] | number[]) {
        return arr.map((v) => '\'' + ('' + v).replaceAll('\'', '\\\'') + '\'').join(', ');
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    normalizeTrim
    //
    // Description: Trims a value before further interpretation.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected normalizeTrim(value: string) {
        return value.trim();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateLengthConstraints
    //
    // Description: Used in string like values such as string and url.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateLengthConstraints(value: string) {
        if (this.#minLength > value.length) this.invalidValueError(`Expecting a minimum length of ${this.#minLength}.`);
        if (this.#maxLength < value.length) this.invalidValueError(`Expecting a maximum length of ${this.#maxLength}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateValueConstraints
    //
    // Description: used in scalar like values such as numbers.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateValueConstraints(value: number | Date) {
        if (this.#minValue > value) this.invalidValueError(`Expecting a minimum value of ${this.#minValue}.`);
        if (this.#maxValue < value) this.invalidValueError(`Expecting a maximum value of ${this.#maxValue}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateMatchConstraints
    //
    // Description: used in string like values such as strings and urls.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateMatchConstraints(value: string) {
        if (this.#match === undefined) return;
        if (!this.#match.test(value)) this.invalidValueError(`Does not match the specified input pattern ${this.#match}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateEnumConstraints
    //
    // Description: used in scalar like values such as numbers.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateEnumConstraints(value: T) {
        if (this.#enumValues.indexOf(value) == -1) this.invalidValueError(`Expecting any one of the following values only: ${this.#enumValues.map((v) => '\'' + ('' + v).replaceAll('\'', '\\\'') + '\'').join(', ')}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected abstract convertRawValueToUsableValue(rawValue: string): T;
}
