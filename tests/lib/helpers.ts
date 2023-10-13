import * as Settings from '../../src';

export const VARNAME = 'TESTVALUE';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Varios interfaces to configure tests
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface TestOptionsBase<T> {
    it:                 /**/ string;
    value?:             /**/ string;
    expectError?:       /**/ any;
}

export interface TestOptions<T> extends TestOptionsBase<T> {
    opts?:              /**/ Settings.SettingReaderOptions<T>;
    defaultValue?:      /**/ T;
    expectValue?:       /**/ T;
}

export interface TestOptionsForList<T> extends TestOptionsBase<T> {
    opts?:              /**/ Settings.SettingReaderOptions<T>;
    defaultValue?:      /**/ T[];
    expectValue?:       /**/ T[];
}

export interface TestOptionsForURL extends TestOptionsBase<URL> {
    opts?:              /**/ Settings.SettingReaderOptionsForURL;
    defaultValue?:      /**/ URL;
    expectValue?:       /**/ URL;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Function:    setValue
//
// Description: Used to set or delete an environment variable at the start of a test, prior to reading it.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setValue(opts: TestOptions<any>) {
    if (opts.value === undefined) {
        delete process.env[VARNAME];
    } else {
        process.env[VARNAME] = opts.value;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Function:    expectValueExecutor
//
// Description: Executes a test with the intend to expect a value. callback is called to produce the expected value.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function expectValueExecutor(callback: any, testOpts: TestOptions<any>) {
    it(testOpts.it, () => {
        setValue(testOpts);
        expect(callback()).toStrictEqual(testOpts.expectValue);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Function:    expectErrorExecutor
//
// Description: Executes a test with the intend to expect a thrown error. callback is called to produce the expected value.
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function expectErrorExecutor(callback: any, testOpts: TestOptions<any>) {
    it(testOpts.it, () => {
        setValue(testOpts);
        expect(() => callback()).toThrow(testOpts.expectError);
    });
}
