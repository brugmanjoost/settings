export interface SettingReaderOptions<T> {
    minItems?: number;
    maxItems?: number;
    delimiter?: string;
    quote?: string;
    escape?: string;
    minLength?: number;
    maxLength?: number;
    minValue?: /**/ number | Date;
    maxValue?: /**/ number | Date;
    match?: RegExp;
    enumValues?: T[];
}
export interface SettingReaderOptionsForURL extends SettingReaderOptions<URL> {
    acceptedProtocols?: string[];
    requiredParameters?: string[];
}
