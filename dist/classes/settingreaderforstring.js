"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingReaderForString = void 0;
const settingreader_1 = require("./settingreader");
class SettingReaderForString extends settingreader_1.SettingReader {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue) {
        rawValue = this.normalizeTrim(rawValue);
        this.validateLengthConstraints(rawValue);
        this.validateMatchConstraints(rawValue);
        return rawValue;
    }
}
exports.SettingReaderForString = SettingReaderForString;
//# sourceMappingURL=settingreaderforstring.js.map