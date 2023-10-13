import * as Settings from '../src';
import { TestOptions, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptions<Date>) => expectValueExecutor((): any => Settings.date(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptions<Date>) => expectErrorExecutor((): any => Settings.date(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('Date values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ '2023-10-12T14:25:16.353Z',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ new Date('2023-10-12T14:25:16.353Z'),
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ new Date('2023-10-01T09:53:12.141Z'),
        opts:           /**/ undefined,
        expectValue:    /**/ new Date('2023-10-01T09:53:12.141Z'),
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ new Date('2023-10-01T09:53:12.141Z'),
        opts:           /**/ undefined,
        expectValue:    /**/ new Date('2023-10-01T09:53:12.141Z'),
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
        value:          /**/ '2024-01-01T00:00:00.000Z',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minValue: new Date('2024-01-01T00:00:00.000Z') },
        expectValue:    /**/ new Date('2024-01-01T00:00:00.000Z'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the minimum value.',
        value:          /**/ '2023-12-31T23:59:59.999Z',
        defaultValue:   /**/ undefined,
        opts:           /**/ { minValue: new Date('2024-01-01T00:00:00.000Z') },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if it meets the maximum value.',
        value:          /**/ '2023-12-31T23:59:59.999Z',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxValue: new Date('2023-12-31T23:59:59.999Z') },
        expectValue:    /**/ new Date('2023-12-31T23:59:59.999Z'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the maximum value.',
        value:          /**/ '2024-01-01T00:00:00.000Z',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxValue: new Date('2023-12-31T23:59:59.999Z') },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Constraints

    // Special Formatting

});

