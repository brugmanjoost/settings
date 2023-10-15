import { EnvVariableMissingError }      /**/ from './classes/error';
import { EnvVariableInvalidError }      /**/ from './classes/error';
import { SettingReader }                /**/ from './classes/settingreader';
import { SettingReaderOptions }         /**/ from './classes/settingreaderoptions';
import { SettingReaderOptionsForURL }   /**/ from './classes/settingreaderoptions';
import { SettingReaderForString }       /**/ from './classes/settingreaderforstring';
import { SettingReaderForBoolean }      /**/ from './classes/settingreaderforboolean';
import { SettingReaderForInteger }      /**/ from './classes/settingreaderforinteger';
import { SettingReaderForFloat }        /**/ from './classes/settingreaderforfloat';
import { SettingReaderForStringEnum }   /**/ from './classes/settingreaderforstringenum';
import { SettingReaderForIntegerEnum }  /**/ from './classes/settingreaderforintegerenum';
import { SettingReaderForURL }          /**/ from './classes/settingreaderforurl';
import { SettingReaderForDate }         /**/ from './classes/settingreaderfordate';

const string            /**/ = (name: string, defaultValue?: string,    /**/opts?: SettingReaderOptions<string>,  /**/): undefined | string       /**/ => (new SettingReaderForString     /**/(name, opts)).getValue  /**/(defaultValue);
const stringList        /**/ = (name: string, defaultValue?: string[],  /**/opts?: SettingReaderOptions<string>,  /**/): undefined | string[]     /**/ => (new SettingReaderForString     /**/(name, opts)).getList   /**/(defaultValue);
const integer           /**/ = (name: string, defaultValue?: number,    /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number       /**/ => (new SettingReaderForInteger    /**/(name, opts)).getValue  /**/(defaultValue);
const integerList       /**/ = (name: string, defaultValue?: number[],  /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number[]     /**/ => (new SettingReaderForInteger    /**/(name, opts)).getList   /**/(defaultValue);
const float             /**/ = (name: string, defaultValue?: number,    /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number       /**/ => (new SettingReaderForFloat      /**/(name, opts)).getValue  /**/(defaultValue);
const floatList         /**/ = (name: string, defaultValue?: number[],  /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number[]     /**/ => (new SettingReaderForFloat      /**/(name, opts)).getList   /**/(defaultValue);
const stringEnum        /**/ = (name: string, defaultValue?: string,    /**/opts?: SettingReaderOptions<string>,  /**/): undefined | string       /**/ => (new SettingReaderForStringEnum /**/(name, opts)).getValue  /**/(defaultValue);
const stringEnumList    /**/ = (name: string, defaultValue?: string[],  /**/opts?: SettingReaderOptions<string>,  /**/): undefined | string[]     /**/ => (new SettingReaderForStringEnum /**/(name, opts)).getList   /**/(defaultValue);
const integerEnum       /**/ = (name: string, defaultValue?: number,    /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number       /**/ => (new SettingReaderForIntegerEnum/**/(name, opts)).getValue  /**/(defaultValue);
const integerEnumList   /**/ = (name: string, defaultValue?: number[],  /**/opts?: SettingReaderOptions<number>,  /**/): undefined | number[]     /**/ => (new SettingReaderForIntegerEnum/**/(name, opts)).getList   /**/(defaultValue);
const boolean           /**/ = (name: string, defaultValue?: boolean,   /**/opts?: SettingReaderOptions<boolean>, /**/): undefined | boolean      /**/ => (new SettingReaderForBoolean    /**/(name, opts)).getValue  /**/(defaultValue);
const booleanList       /**/ = (name: string, defaultValue?: boolean[], /**/opts?: SettingReaderOptions<boolean>, /**/): undefined | boolean[]    /**/ => (new SettingReaderForBoolean    /**/(name, opts)).getList   /**/(defaultValue);
const url               /**/ = (name: string, defaultValue?: URL,       /**/opts?: SettingReaderOptionsForURL,    /**/): undefined | URL          /**/ => (new SettingReaderForURL        /**/(name, opts)).getValue  /**/(defaultValue);
const urlList           /**/ = (name: string, defaultValue?: URL[],     /**/opts?: SettingReaderOptionsForURL,    /**/): undefined | URL[]        /**/ => (new SettingReaderForURL        /**/(name, opts)).getList   /**/(defaultValue);
const date              /**/ = (name: string, defaultValue?: Date,      /**/opts?: SettingReaderOptions<Date>,    /**/): undefined | Date         /**/ => (new SettingReaderForDate       /**/(name, opts)).getValue  /**/(defaultValue);
const dateList          /**/ = (name: string, defaultValue?: Date[],    /**/opts?: SettingReaderOptions<Date>,    /**/): undefined | Date[]       /**/ => (new SettingReaderForDate       /**/(name, opts)).getList   /**/(defaultValue);

export {
    string,
    stringList,
    integer,
    integerList,
    float,
    floatList,
    stringEnum,
    stringEnumList,
    integerEnum,
    integerEnumList,
    boolean,
    booleanList,
    url,
    urlList,
    date,
    dateList,
    // ip4address,          // e.g. 192.168.0.1
    // ip4addressList,      
    // ip4network,          // e.g. 192.168.0.0/24
    // ip4networkList,
    // hostname,            // e.g. www.example.com | 192.168.1.4
    // hostnameList,

    SettingReader,
    SettingReaderOptions,
    SettingReaderOptionsForURL,
    EnvVariableMissingError,
    EnvVariableInvalidError,
}
