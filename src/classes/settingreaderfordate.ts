import { SettingReader } from './settingreader';

export class SettingReaderForDate extends SettingReader<Date> {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): Date {
        rawValue = this.normalizeTrim(rawValue);
        let value = new Date(rawValue);
        if (isNaN(value.getTime())) this.invalidValueError(`Not a valid datetime string.`);
        this.validateValueConstraints(value);
        return new Date(value);
    }
}