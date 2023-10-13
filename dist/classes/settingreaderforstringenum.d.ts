import { SettingReader } from './settingreader';
export declare class SettingReaderForStringEnum extends SettingReader<string> {
    convertRawValueToUsableValue(rawValue: string): string;
}
