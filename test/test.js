const Linter = require('tslint');
const fs = require('fs');
const linterConfig = require('../index.js');

const fileName = 'test_app.ts';

const options = {
    configuration: {
        rules: linterConfig.rules,
    },
    rulesDirectory: linterConfig.rulesDirectory
};

const fileContents = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
const linter = new Linter(fileName, fileContents, options);
const result = linter.lint();

const expectedOutput = fs.readFileSync(__dirname + '/expected-output.txt').toString();

if (result.output.trim() !== expectedOutput.trim()) {
    throw new Error(`Linter output did not match expected output. \nActual: ${result.output}\nExpected: ${expectedOutput}`);
} else {
    console.log('All good!');
}
