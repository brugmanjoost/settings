import * as Settings from '../src';
import { TestOptionsForList, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptionsForList<string>) => expectValueExecutor((): any => Settings.stringList(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptionsForList<string>) => expectErrorExecutor((): any => Settings.stringList(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('String list values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ 'Foo, Bar',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/['Foo', 'Bar'],
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/['Hello', 'World'],
        opts:           /**/ undefined,
        expectValue:    /**/['Hello', 'World'],
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/['Hello', 'World'],
        opts:           /**/ undefined,
        expectValue:    /**/['Hello', 'World'],
    });

    expectError({
        it: 	        /**/ 'Should throw a missing error if the value is missing and there is no default value.',
        value:          /**/ '',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectError:    /**/ Settings.EnvVariableMissingError,
    });

    // Basic constraint testing

    expectValue({
        it: 	        /**/ 'Should get the value if the minimum number of items is present.',
        value:          /**/ 'Foo, Bar',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minItems: 2 },
        expectValue:    /**/['Foo', 'Bar'],
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if the minimum number of items is not present.',
        value:          /**/ 'Foo, Bar',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minItems: 3 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if the maxim number of items is not exceeded.',
        value:          /**/ 'Foo, Bar',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxItems: 2 },
        expectValue:    /**/['Foo', 'Bar'],
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if the maximum number of items is exceeded.',
        value:          /**/ 'Foo, Bar',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxItems: 1 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Constraints

    expectValue({
        it: 	        /**/ 'Should get an undefined value if optional and value is missing while defaultValue is not set.',
        value:          /**/ undefined,
        defaultValue:   /**/ undefined,
        opts:           /**/ { isOptional: true },
        expectValue:    /**/ undefined,
    });

    expectValue({
        it: 	        /**/ 'Should get an undefined value if optional and value is \'\' while defaultValue is not set and we treatEmptyAsNotPresent.',
        value:          /**/ '',
        defaultValue:   /**/ undefined,
        opts:           /**/ { isOptional: true, treatEmptyAsNotPresent: true },
        expectValue:    /**/ undefined,
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if one of the items in the list does not meet the requirements.',
        value:          /**/ 'Hello, World',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxLength: 4 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Formatting

    expectValue({
        it: 	        /**/ 'Should get multiple values, using default csv settings.',
        value:          /**/ 'John \'Walker\' Smith, Frank Zemekis, Suzan Campbell',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/['John \'Walker\' Smith', 'Frank Zemekis', 'Suzan Campbell'],
    });

    expectValue({
        it: 	        /**/ 'Should get multiple values, using custom csv settings.',
        value:          /**/ '"John ""Walker"" Smith"; "Frank Zemekis"; "Suzan Campbell"',
        defaultValue:   /**/ undefined,
        opts:           /**/ {
            quote:      /**/ '"',
            delimiter:  /**/ ';',
            escape:     /**/ '"',
        },
        expectValue:    /**/['John "Walker" Smith', 'Frank Zemekis', 'Suzan Campbell'],
    });

});

