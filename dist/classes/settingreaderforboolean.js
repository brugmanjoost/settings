"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingReaderForBoolean = void 0;
const settingreader_1 = require("./settingreader");
class SettingReaderForBoolean extends settingreader_1.SettingReader {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue) {
        rawValue = this.normalizeTrim(rawValue);
        switch (rawValue) {
            case '0':
            case 'false':
            case 'off':
            case 'no':
                return false;
            case '1':
            case 'true':
            case 'on':
            case 'yes':
                return true;
            default:
                this.invalidValueError(`Expecting 1, 0, true, false, yes, no, on, or off.`);
        }
    }
}
exports.SettingReaderForBoolean = SettingReaderForBoolean;
//# sourceMappingURL=settingreaderforboolean.js.map