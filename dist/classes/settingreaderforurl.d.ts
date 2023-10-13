import { SettingReaderOptionsForURL } from './settingreaderoptions';
import { SettingReader } from './settingreader';
export declare class SettingReaderForURL extends SettingReader<URL> {
    #private;
    static regex: RegExp;
    constructor(name: string, opts?: SettingReaderOptionsForURL);
    protected validateProtocolConstraints(value: URL): void;
    protected validateParameterConstraints(value: URL): undefined;
    convertRawValueToUsableValue(rawValue: string): URL;
}
