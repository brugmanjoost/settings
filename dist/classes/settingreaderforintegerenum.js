"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingReaderForIntegerEnum = void 0;
const settingreaderforinteger_1 = require("./settingreaderforinteger");
class SettingReaderForIntegerEnum extends settingreaderforinteger_1.SettingReaderForInteger {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Function:    convertRawValueToUsableValue
    //
    // Description: Convert raw string input value into output value in desired datatype.
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertRawValueToUsableValue(rawValue) {
        rawValue = this.normalizeTrim(rawValue);
        const value = super.convertRawValueToUsableValue(rawValue);
        this.validateEnumConstraints(value);
        return value;
    }
}
exports.SettingReaderForIntegerEnum = SettingReaderForIntegerEnum;
//# sourceMappingURL=settingreaderforintegerenum.js.map