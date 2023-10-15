import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<string>) => expectValueExecutor((): any => Settings.string(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<string>) => expectErrorExecutor((): any => Settings.string(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('String values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ 'Foo',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ 'Foo',
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ 'Bar',
        opts:           /**/ undefined,
        expectValue:    /**/ 'Bar',
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ 'Bar',
        opts:           /**/ undefined,
        expectValue:    /**/ 'Bar',
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
        it: 	        /**/ 'Should get the value if it meets the minimum value.',
        value:          /**/ 'abcde',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minLength: 5 },
        expectValue:    /**/ 'abcde',
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the minimum value.',
        value:          /**/ 'abcd',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minLength: 5 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if it meets the maximum length.',
        value:          /**/ 'abcde',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxLength: 5 },
        expectValue:    /**/ 'abcde',
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the maximum length.',
        value:          /**/ 'abcdef',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxLength: 5 },
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

    expectValue({
        it: 	        /**/ 'Should get the value if it matches a regular expression.',
        value:          /**/ 'Old McDonald had a farm.',
        defaultValue:   /**/ undefined,
        opts:           /**/ { match: /Donald/ },
        expectValue:    /**/ 'Old McDonald had a farm.',
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not match a regular expression.',
        value:          /**/ 'Old Mekinzi had a farm.',
        defaultValue:   /**/ undefined,
        opts:           /**/ { match: /Donald/ },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Formatting

});

