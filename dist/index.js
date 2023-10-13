"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVariableInvalidError = exports.EnvVariableMissingError = exports.SettingReader = exports.dateList = exports.date = exports.urlList = exports.url = exports.booleanList = exports.boolean = exports.integerEnumList = exports.integerEnum = exports.stringEnumList = exports.stringEnum = exports.floatList = exports.float = exports.integerList = exports.integer = exports.stringList = exports.string = void 0;
const error_1 = require("./classes/error");
Object.defineProperty(exports, "EnvVariableMissingError", { enumerable: true, get: function () { return error_1.EnvVariableMissingError; } });
const error_2 = require("./classes/error");
Object.defineProperty(exports, "EnvVariableInvalidError", { enumerable: true, get: function () { return error_2.EnvVariableInvalidError; } });
const settingreader_1 = require("./classes/settingreader");
Object.defineProperty(exports, "SettingReader", { enumerable: true, get: function () { return settingreader_1.SettingReader; } });
const settingreaderforstring_1 = require("./classes/settingreaderforstring");
const settingreaderforboolean_1 = require("./classes/settingreaderforboolean");
const settingreaderforinteger_1 = require("./classes/settingreaderforinteger");
const settingreaderforfloat_1 = require("./classes/settingreaderforfloat");
const settingreaderforstringenum_1 = require("./classes/settingreaderforstringenum");
const settingreaderforintegerenum_1 = require("./classes/settingreaderforintegerenum");
const settingreaderforurl_1 = require("./classes/settingreaderforurl");
const settingreaderfordate_1 = require("./classes/settingreaderfordate");
const string /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforstring_1.SettingReaderForString /**/(name, opts)).getValue /**/(defaultValue);
exports.string = string;
const stringList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforstring_1.SettingReaderForString /**/(name, opts)).getList /**/(defaultValue);
exports.stringList = stringList;
const integer /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforinteger_1.SettingReaderForInteger /**/(name, opts)).getValue /**/(defaultValue);
exports.integer = integer;
const integerList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforinteger_1.SettingReaderForInteger /**/(name, opts)).getList /**/(defaultValue);
exports.integerList = integerList;
const float /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforfloat_1.SettingReaderForFloat /**/(name, opts)).getValue /**/(defaultValue);
exports.float = float;
const floatList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforfloat_1.SettingReaderForFloat /**/(name, opts)).getList /**/(defaultValue);
exports.floatList = floatList;
const stringEnum /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforstringenum_1.SettingReaderForStringEnum /**/(name, opts)).getValue /**/(defaultValue);
exports.stringEnum = stringEnum;
const stringEnumList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforstringenum_1.SettingReaderForStringEnum /**/(name, opts)).getList /**/(defaultValue);
exports.stringEnumList = stringEnumList;
const integerEnum /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforintegerenum_1.SettingReaderForIntegerEnum /**/(name, opts)).getValue /**/(defaultValue);
exports.integerEnum = integerEnum;
const integerEnumList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforintegerenum_1.SettingReaderForIntegerEnum /**/(name, opts)).getList /**/(defaultValue);
exports.integerEnumList = integerEnumList;
const boolean /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforboolean_1.SettingReaderForBoolean /**/(name, opts)).getValue /**/(defaultValue);
exports.boolean = boolean;
const booleanList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforboolean_1.SettingReaderForBoolean /**/(name, opts)).getList /**/(defaultValue);
exports.booleanList = booleanList;
const url /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforurl_1.SettingReaderForURL /**/(name, opts)).getValue /**/(defaultValue);
exports.url = url;
const urlList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderforurl_1.SettingReaderForURL /**/(name, opts)).getList /**/(defaultValue);
exports.urlList = urlList;
const date /**/ = (name, defaultValue, /**/ opts) => (new settingreaderfordate_1.SettingReaderForDate /**/(name, opts)).getValue /**/(defaultValue);
exports.date = date;
const dateList /**/ = (name, defaultValue, /**/ opts) => (new settingreaderfordate_1.SettingReaderForDate /**/(name, opts)).getList /**/(defaultValue);
exports.dateList = dateList;
//# sourceMappingURL=index.js.map