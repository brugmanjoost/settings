import { SettingReader } from './settingreader';
export class SettingReaderForStringEnum extends SettingReader<string> {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue: string): string {
        rawValue = this.normalizeTrim(rawValue);
        this.validateEnumConstraints(rawValue);
        return rawValue;
    }
}