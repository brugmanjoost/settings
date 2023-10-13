import { SettingReader } from './settingreader';

export class SettingReaderForFloat extends SettingReader<number> {

    static regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): number {
        rawValue = this.normalizeTrim(rawValue);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Convert to float
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let value: number;
        try {
            if (!SettingReaderForFloat.regex.test(rawValue)) throw 'invalid';
            value = parseFloat(rawValue);
            if (isNaN(value)) throw 'invalid';
        }
        catch (e) {
            this.invalidValueError(`Expecting valid float (e.g. +735.53).`);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Validate constraints before returning
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.validateValueConstraints(value);
        return value;
    }
}