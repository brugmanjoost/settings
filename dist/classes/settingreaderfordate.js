"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingReaderForDate = void 0;
const settingreader_1 = require("./settingreader");
class SettingReaderForDate extends settingreader_1.SettingReader {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue) {
        rawValue = this.normalizeTrim(rawValue);
        let value = new Date(rawValue);
        if (isNaN(value.getTime()))
            this.invalidValueError(`Not a valid datetime string.`);
        this.validateValueConstraints(value);
        return new Date(value);
    }
}
exports.SettingReaderForDate = SettingReaderForDate;
//# sourceMappingURL=settingreaderfordate.js.map