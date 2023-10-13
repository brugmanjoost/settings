# Settings

Read and validate environment variables with built in support for various datatypes such as booleans, urls, enums, and listed items. Settings is exposed as a CommonJS module. To integrates with dotenv simply load dotenv before you read your first setting through **settings**.

## Installation

    npm install @brugmanjoost/settings --save

Using CommonJS:

    const Settings = require('@brugmanjoost/settings');
    
Using TypeScript:

    import * as Settings from '@brugmanjoost/settings';


## Usage
The following returns the value of the VAR environment variable:

    // C:\> set VAR=Hello world
    value = Settings.string('VAR'); // value == 'Hello World'

Settings provides a number of methods, each of which provides reads and returns a specific datatype. This is illustrated by the following example that returns a URL object:

    // C:\> set VAR=http://www.example.com
    value = Settings.url('VAR'); // value == URL('http://www.xample.com')


A list of all members with their datatypes is at the bottom of this page. All members are called with the same arguments:

    Settings.string(name, defaultValue?, opts?);

When reading an environment variable you can pass the following options through opts:

 - **`minLength:`** The minimum number of characters required in a string value. Affects string, stringList, url, urlList.
 - **`maxLength:`** The maximum number of characters acceptable in a string value. Affectsstring, stringList, url, urlList.
 - **`minValue:`** The lowest acceptable value. Affects integer, integerList, float, floatList, date, dateList.
 - **`maxValue:`** The highest acceptable value. Affects integer, integerList, float, floatList, date, dateList.
 - **`match:`** A regular expression that must match string values. Affects string, stringList, url, urlList.
 - **`enumValues:`** An array where each entry designates an acceptable input value.
 - **`acceptedProtocols:`** An array of strings where each string contains an accepted protocol for URLs, such as 'http', 'ftp', 'callto'. Affects url and urlList.
 - **`minItems:`** The minimum number of items required in the list. Affects all list variants.
 - **`maxItems:`** The maximum number of items accepted in the list. Affects all list variants.
 - **`delimiter:`** A csv style delimeter token to separate out multiple values in a list. Defaults to **`,`**. Affects all list variants.
 - **`quote:`** A csv style quote token to identify quoted values in a list. Defaults to `"`. Affects all list variants.
 - **`escape:`** A csv style escape token to escape quotes in quotes values. Defaults to `\`. Affects all list variants.

## Using default values
A **Settings.EnvVariableMissingError** error is thrown if VAR does not exist or is an empty string (''). To prevent exceptions a default value may be provided like so.

    // C:\> set VAR=
    value = Settings.string('VAR', 'Some default value');   // value == 'Some default value'

Note that default values are to be specified in the datatype associated with the method. the date() method returns a **Date** object and a default value is expected to also be a **Date** object.

	// C:\> set VAR=
    value = Settings.date('VAR', new Date('2023-10-12T14:24:15.000Z')); // value == Thu Oct 12 2023 16:24:15 GMT+0200

## Constraints
Values are tested for constraints before being returned. Reading a value that does not meet a constraint throws a **Settings.EnvVariableInvalidError**.

`minLength` and `maxLength` are integers and place length constraints on strings and URLs. `minValue` and `maxValue` place constraints on integer, float and date values.

Note that `minValue` and `maxValue`  are to be specified in the datatype associated with the method. For example, specifying a minum integer or a minimum date as follows:

	// C:\> set VAR=17
    value = Settings.integer('VAR', 0, {
	    minValue: 18,						                // Set as an integer.
    ); // Throws EnvVariableInvalidError.
    
    // C:\> set VAR=2023-10-12T14:24:15.000Z
    value = Settings.date('VAR', {
	    maxValue: new Date('2024-01-01'),	                // Set as a Date
    );
    
`acceptedProtocols` is used on URL to specify what kind of URLs are acceptable:

    // C:\> set VAR=https://example.com
    value = Settings.url('VAR', {
        acceptedProtocols: ['ftp']
    ); // Throws EnvVariableInvalidError

`requiredParameters` is used on URL to specify what parameters must be present in the url:

    // C:\> set VAR=https://www.default.com?user=john
    value = Settings.url('VAR', {
        requiredParameters: ['user', 'message']
    ); // Throws EnvVariableInvalidError

## Boolean values
Boolean values can be specified using four different combinations that all yield true or false:

    process.env.VAR='true';					                // or: 'yes', 'on', '1'
    value = Settings.boolean('VAR');	                    // true

    process.env.VAR='false';				                // or: 'no', 'off', '0'
    value = Settings.boolean('VAR');	                    // false

## Date values
Date values are interpreted and returned by passing the raw string value into the **Date** constructor. This effectively means that for dates the value in an environment variable must be formatted as follows:

    2023-10-12 14:12:22
    2023-10-12T14:12:22
    2023-10-12T14:12:22.248Z

Note that input values without timezone designation are subject to interpretation issues. A user entering a value may be in a timezone different from where the value is
processed, leading to different expectations on outcomes.

## Enum values
Use enums to restrict values to specific values. Enums are available for strings and integers. Note that enum values are case sensitive.

    // C:\> set VAR=yellow
    value = Settings.enum('VAR', {
        enumValues: ['red', 'yellow', 'green']
    ); // 'yellow'

    // C:\> set VAR=purple
    value = Settings.enum('VAR', {
        enumValues: ['red', 'yellow', 'green']
    ); // Throws EnvVariableInvalidError
    
    // C:\> set VAR=150
    value = Settings.enum('VAR', {
        enumValues: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
    ); // 150


## List values
All ...List() members make use of the options `delimiter`, `quote` and `escape` to interpret a single value from an environment variable as a CSV line and convert it into a list:

    // C:\> set VAR="John ""Smarty"" Wick", "Suzan Dubois", "Frank Boyle"
    value = Settings.boolean('VAR', [], {
		delimiter: ';',
		quote: '"',
		escape '"',
	});	// value == ['John "Smarty" Wick", "Suzan Dubois", "Frank Boyle"]
	
	// C:\> set VAR=true,false,yes,no,on,off,1,0
	value = Settings.boolean('VAR'); // Using defaults
	// value == [ true, false, true, false, true, false, true, false]


## All members

| Method            | Response  |
|-------------------|-----------|
| string()     		| string 	|
| stringList() 		| string[]	|
| integer() 		| number 	|
| integerList() 	| number[]  |
| float() 			| number  	|
| floatList() 		| number[]  |
| boolean() 		| boolean  	|
| booleanList() 	| boolean[] |
| stringEnum() 		| string  	|
| stringEnumList() 	| string[]  |
| integerEnum() 	| number  	|
| integerEnumList() | number[]  |
| date() 			| Date  	|
| dateList()		| Date[]  	|
| url()				| URL  		|
| urlList() 		| URL[]  	|







