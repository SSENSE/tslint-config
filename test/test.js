const Linter = require('tslint').Linter;
const Configuration = require('tslint').Configuration;
const fs = require('fs');
const linterConfig = require('../index.js');

const options = {
    rulesDirectory: linterConfig.rulesDirectory
};

const fileName = 'test_app.ts';

const program = Linter.createProgram("tsconfig.json", "./test");
const fileContents = program.getSourceFile(__dirname + '/' + fileName).getFullText();
const files = Linter.getFileNames(program);

const configuration = {
    rulesDirectory: linterConfig.rulesDirectory,
    rules: linterConfig.rules
};

const linter = new Linter(options, program);

linter.lint(files[0], fileContents, Configuration.parseConfigFile(configuration), program);
const result = linter.getResult();
const expectedOutput = fs.readFileSync(__dirname + '/expected-output.txt').toString();

if (result.output.trim() !== expectedOutput.trim()) {
    throw new Error(`Linter output did not match expected output. \nActual: ${result.output}\nExpected: ${expectedOutput}`);
} else {
    console.log('All good!');
}
