import { SettingReader } from './settingreader';
export declare class SettingReaderForBoolean extends SettingReader<boolean> {
    convertRawValueToUsableValue(rawValue: string): boolean;
}
