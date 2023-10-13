import { SettingReader } from './settingreader';

export class SettingReaderForBoolean extends SettingReader<boolean> {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): boolean {
        rawValue = this.normalizeTrim(rawValue);
        switch (rawValue) {
            case '0':
            case 'false':
            case 'off':
            case 'no':
                return false;
            case '1':
            case 'true':
            case 'on':
            case 'yes':
                return true;
            default:
                this.invalidValueError(`Expecting 1, 0, true, false, yes, no, on, or off.`);
        }
    }
}