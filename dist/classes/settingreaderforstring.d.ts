import { SettingReader } from './settingreader';
export declare class SettingReaderForString extends SettingReader<string> {
    convertRawValueToUsableValue(rawValue: string): string;
}
