import { SettingReaderOptions } from './settingreaderoptions';
export declare abstract class SettingReader<T> {
    #private;
    constructor(name: string, opts?: SettingReaderOptions<T>);
    private decodeCSVLine;
    getValue(defaultValue?: T): T | undefined;
    getList(defaultValue?: T[]): T[] | undefined;
    protected missingValueError(): never;
    protected invalidValueError(msg: string): never;
    protected summarizeValues(arr: string[] | number[]): string;
    protected normalizeTrim(value: string): string;
    protected validateLengthConstraints(value: string): void;
    protected validateValueConstraints(value: number | Date): void;
    protected validateMatchConstraints(value: string): void;
    protected validateEnumConstraints(value: T): void;
    protected abstract convertRawValueToUsableValue(rawValue: string): T;
}
