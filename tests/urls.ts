import * as Settings from '../src';
import { TestOptionsForURL, VARNAME, expectValueExecutor, expectErrorExecutor } from './lib/helpers';

var expectValue = (testOpts: TestOptionsForURL) => expectValueExecutor((): any => Settings.url(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);
var expectError = (testOpts: TestOptionsForURL) => expectErrorExecutor((): any => Settings.url(VARNAME, testOpts.defaultValue, testOpts.opts), testOpts);

describe('Url values', () => {

    // Basic testing

    expectValue({
        it: 	        /**/ 'Should get the value.',
        value:          /**/ 'https://www.example.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ undefined,
        expectValue:    /**/ new URL('https://www.example.com'),
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is missing.',
        value:          /**/ undefined,
        defaultValue:   /**/ new URL('https://www.default.com'),
        opts:           /**/ undefined,
        expectValue:    /**/ new URL('https://www.default.com'),
    });

    expectValue({
        it: 	        /**/ 'Should get the default value if the value is an empty string.',
        value:          /**/ '',
        defaultValue:   /**/ new URL('https://www.default.com'),
        opts:           /**/ undefined,
        expectValue:    /**/ new URL('https://www.default.com'),
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
        it: 	        /**/ 'Should get the value if it meets the maximum length.',
        value:          /**/ 'https://www.default.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxLength: 23 },
        expectValue:    /**/ new URL('https://www.default.com'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not meet the maximum length.',
        value:          /**/ 'https://www.default.com?but=not&its=too&long=sorry',
        defaultValue:   /**/ undefined,
        opts:           /**/ { maxLength: 23 },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    // Special Constraints

    // Special Formatting

    expectValue({
        it: 	        /**/ 'Should get the value if it matches a regular expression.',
        value:          /**/ 'https://www.default.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ { match: /default\.com/ },
        expectValue:    /**/ new URL('https://www.default.com'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if it does not match a regular expression.',
        value:          /**/ 'https://www.default.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ { match: /specific\.com/ },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if the protocol is whitelisted.',
        value:          /**/ 'https://www.default.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ { acceptedProtocols: ['https'] },
        expectValue:    /**/ new URL('https://www.default.com'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if the protocol is not whitelisted.',
        value:          /**/ 'http://www.default.com',
        defaultValue:   /**/ undefined,
        opts:           /**/ { acceptedProtocols: ['https'] },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

    expectValue({
        it: 	        /**/ 'Should get the value if all required parameters are present.',
        value:          /**/ 'https://www.default.com?user=john&message=hello%20world',
        defaultValue:   /**/ undefined,
        opts:           /**/ { requiredParameters: ['user', 'message'] },
        expectValue:    /**/ new URL('https://www.default.com?user=john&message=hello%20world'),
    });

    expectError({
        it: 	        /**/ 'Should throw an invalid error if one or more parameters are missing.',
        value:          /**/ 'https://www.default.com?user=john',
        defaultValue:   /**/ undefined,
        opts:           /**/ { requiredParameters: ['user', 'message'] },
        expectError:    /**/ Settings.EnvVariableInvalidError,
    });

});

