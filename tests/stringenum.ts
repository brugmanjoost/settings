import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<string>) => expectValueExecutor((): any => Settings.stringEnum(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<string>) => expectErrorExecutor((): any => Settings.stringEnum(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('String enum values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ 'yellow',
        defaultValue:   /**/ undefined,
        opts:           /**/ { enumValues: ['red', 'yellow', 'green'] },
        expectValue:    /**/ 'yellow',
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ 'red',
        opts:           /**/ { enumValues: ['red', 'yellow', 'green'] },
        expectValue:    /**/ 'red',
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ 'red',
        opts:           /**/ { enumValues: ['red', 'yellow', 'green'] },
        expectValue:    /**/ 'red',
    });

    expectError({
        it: 	        /**/ 'Should throw a missing error if the value is missing and there is no default value.',
        value:          /**/ '',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectError:    /**/ Settings.EnvVariableMissingError,
    });

    // Basic constraint testing

    expectError({
        it: 	        /**/ 'Should throw an invalid error if the value is not an existing enum.',
        value:          /**/ 'purple',
        defaultValue:   /**/ undefined,
        opts:           /**/ { enumValues: ['red', 'yellow', 'green'] },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if there are no options to choose from.',
        value:          /**/ 'yellow',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Constraints

    // Special Formatting

});

