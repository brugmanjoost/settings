import { SettingReaderOptionsForURL } from './settingreaderoptions';
import { SettingReader } from './settingreader';

export class SettingReaderForURL extends SettingReader<URL> {
    static regex = /^[a-z]+:\/\/([-a-zA-Z0-9@:%._\+~#=]{2,256}\.)+[a-z]{2,256}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

    #acceptedProtocols:         /**/ string[];
    #requiredParameters:        /**/ string[];

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    constructor
    //
    // Description: 
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(name: string, opts?: SettingReaderOptionsForURL) {
        super(name, opts);
        opts                        /**/ = opts ?? {}
        this.#acceptedProtocols     /**/ = opts.acceptedProtocols ?? [];
        this.#requiredParameters    /**/ = opts.requiredParameters ?? [];
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateProtocolConstraints
    //
    // Description: Validates that the url uses a protocol (e.g. https) from the list of specified values.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateProtocolConstraints(value: URL) {
        if (this.#acceptedProtocols.length == 0) return;
        if (this.#acceptedProtocols.indexOf(value.protocol.substr(0, value.protocol.length - 1)) == -1) this.invalidValueError(`Expecting any one of the following protocols only: ${this.#acceptedProtocols.map((v) => '\'' + ('' + v).replaceAll('\'', '\\\'') + '\'').join(', ')}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    validateParameterConstraints
    //
    // Description: Validates that the url includes all required parameters.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    protected validateParameterConstraints(value: URL) {
        let missing = [];
        for (let name of this.#requiredParameters) {
            if (value.searchParams.get(name) === null) {
                missing.push(name);
            }
        }
        if (missing.length) return this.invalidValueError(`Missing required parameter(s) ${this.summarizeValues(missing)}.`);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): URL {
        rawValue = this.normalizeTrim(rawValue);
        this.validateLengthConstraints(rawValue);
        this.validateMatchConstraints(rawValue);
        let value;
        try {
            value = new URL(rawValue);
        }
        catch (e) {
            this.invalidValueError(`Expecting valid url.`);
        }

        this.validateProtocolConstraints(value);
        this.validateParameterConstraints(value);
        return value;
    }
}