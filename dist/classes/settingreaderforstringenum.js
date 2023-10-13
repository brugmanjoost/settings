"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingReaderForStringEnum = void 0;
const settingreader_1 = require("./settingreader");
class SettingReaderForStringEnum extends settingreader_1.SettingReader {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue) {
        rawValue = this.normalizeTrim(rawValue);
        this.validateEnumConstraints(rawValue);
        return rawValue;
    }
}
exports.SettingReaderForStringEnum = SettingReaderForStringEnum;
//# sourceMappingURL=settingreaderforstringenum.js.map