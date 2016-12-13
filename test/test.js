const Linter = require('tslint').Linter;
const fs = require('fs');
const linterConfig = require('../index.js');

const fileName = 'test_app.ts';

const options = {
    rulesDirectory: linterConfig.rulesDirectory
};
const fileContents = fs.readFileSync(__dirname + '/' + fileName, 'utf8');

const configuration = {
    rulesDirectory: linterConfig.rulesDirectory,
    rules: linterConfig.rules
};

const linter = new Linter(options);
linter.lint(fileName, fileContents, configuration);
const result = linter.getResult();
const expectedOutput = fs.readFileSync(__dirname + '/expected-output.txt').toString();

if (result.output.trim() !== expectedOutput.trim()) {
    throw new Error(`Linter output did not match expected output. \nActual: ${result.output}\nExpected: ${expectedOutput}`);
} else {
    console.log('All good!');
}
