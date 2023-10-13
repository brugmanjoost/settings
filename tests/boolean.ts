import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<boolean>) => expectValueExecutor((): any => Settings.boolean(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<boolean>) => expectErrorExecutor((): any => Settings.boolean(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('Boolean values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value (true).',
        value:          /**/ 'true',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (yes).',
        value:          /**/ 'yes',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (on).',
        value:          /**/ 'on',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (1).',
        value:          /**/ '1',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (false).',
        value:          /**/ 'false',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ false,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (off).',
        value:          /**/ 'off',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ false,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (no).',
        value:          /**/ 'no',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ false,
    });

    expectValue({
        it: 	        /**/ 'Should get the value (0).',
        value:          /**/ '0',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ false,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ true,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ false,
        opts:           /**/ undefined,
        expectValue:    /**/ false,
    });

    expectError({
        it: 	        /**/ 'Should throw a missing error if the value is missing and there is no default value.',
        value:          /**/ '',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectError:    /**/ Settings.EnvVariableMissingError,
    });

    // Special Constraints

    // Special Formatting

    expectValue({
        it: 	        /**/ 'Should accept spaces around.',
        value:          /**/ ' true ',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

    expectValue({
        it: 	        /**/ 'Should accept spaces around.',
        value:          /**/ '    1',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ true,
    });

});

