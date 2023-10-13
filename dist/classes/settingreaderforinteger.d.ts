import { SettingReader } from './settingreader';
export declare class SettingReaderForInteger extends SettingReader<number> {
    static regex: RegExp;
    convertRawValueToUsableValue(rawValue: string): number;
}
