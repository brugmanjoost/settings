import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<number>) => expectValueExecutor((): any => Settings.integerEnum(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<number>) => expectErrorExecutor((): any => Settings.integerEnum(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('Integer enum values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ '2000',
        defaultValue:   /**/ undefined,
        opts:           /**/ { enumValues: [1000, 2000, 3000] },
        expectValue:    /**/ 2000,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/1000,
        opts:           /**/ { enumValues: [1000, 2000, 3000] },
        expectValue:    /**/ 1000,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/1000,
        opts:           /**/ { enumValues: [1000, 2000, 3000] },
        expectValue:    /**/ 1000,
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
        value:          /**/ '4000',
        defaultValue:   /**/ undefined,
        opts:           /**/ { enumValues: [1000, 2000, 3000] },
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if there are no options to choose from.',
        value:          /**/ '1000',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
    });

    // Special Constraints

    // Special Formatting

});

