import { SettingReader } from './settingreader';
export declare class SettingReaderForFloat extends SettingReader<number> {
    static regex: RegExp;
    convertRawValueToUsableValue(rawValue: string): number;
}
