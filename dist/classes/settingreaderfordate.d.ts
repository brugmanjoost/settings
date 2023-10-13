import { SettingReader } from './settingreader';
export declare class SettingReaderForDate extends SettingReader<Date> {
    convertRawValueToUsableValue(rawValue: string): Date;
}
