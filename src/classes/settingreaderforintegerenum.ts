import { SettingReaderForInteger } from './settingreaderforinteger';

export class SettingReaderForIntegerEnum extends SettingReaderForInteger {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): number {
        rawValue = this.normalizeTrim(rawValue);
        const value = super.convertRawValueToUsableValue(rawValue);
        this.validateEnumConstraints(value);
        return value;
    }
}