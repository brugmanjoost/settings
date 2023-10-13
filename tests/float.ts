import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<number>) => expectValueExecutor((): any => Settings.float(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<number>) => expectErrorExecutor((): any => Settings.float(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('Float values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ '5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ 5.3,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ 6.3,
        opts:           /**/ undefined,
        expectValue:    /**/ 6.3,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ 6.3,
        opts:           /**/ undefined,
        expectValue:    /**/ 6.3,
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
        value:          /**/ '5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minValue: 5.3 },
        expectValue:    /**/ 5.3,
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the minimum value.',
        value:          /**/ '4.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minValue: 5.3 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if it meets the maximum value.',
        value:          /**/ '5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxValue: 5.3 },
        expectValue:    /**/ 5.3,
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the maximum value.',
        value:          /**/ '6.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxValue: 5.3 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Constraints

    // Special Formatting

    expectValue({
        it: 	        /**/ 'Should accept spaces around.',
        value:          /**/ '     5.3  ',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ 5.3,
    });

    expectValue({
        it: 	        /**/ 'Should accept + signs.',
        value:          /**/ '+5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ 5.3,
    });

    expectValue({
        it: 	        /**/ 'Should accept - signs.',
        value:          /**/ '-5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ -5.3,
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if there are spaces between +/- and digits.',
        value:          /**/ '- 5.3',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });
});

