const Linter = require('tslint');
const fs = require('fs');
const linterConfig = require('../index.js');

const fileName = 'test_app.ts';

const options = {
    formatter: 'json',
    configuration: {
        rules: linterConfig.rules,
    },
    rulesDirectory: linterConfig.rulesDirectory
};

const fileContents = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
const linter = new Linter(fileName, fileContents, options);
const result = linter.lint();

const expectedOutput = '[{"endPosition":{"character":16,"line":0,"position":16},"failure":"comment must start with a space","name":"test_app.ts","ruleName":"comment-format","startPosition":{"character":2,"line":0,"position":2}},{"endPosition":{"character":5,"line":10,"position":204},"failure":"The exported module or identifier name must match the file name. Found: test_app.ts and Foo","name":"test_app.ts","ruleName":"export-name","startPosition":{"character":4,"line":2,"position":38}},{"endPosition":{"character":18,"line":3,"position":83},"failure":"Method name does not match /^[a-z][\\\\w\\\\d]+$/: Bar","name":"test_app.ts","ruleName":"function-name","startPosition":{"character":15,"line":3,"position":80}},{"endPosition":{"character":18,"line":2,"position":52},"failure":"Use of default exports is forbidden","name":"test_app.ts","ruleName":"no-default-export","startPosition":{"character":11,"line":2,"position":45}},{"endPosition":{"character":1,"line":11,"position":206},"failure":"\'namespace\' and \'module\' are disallowed","name":"test_app.ts","ruleName":"no-namespace","startPosition":{"character":0,"line":1,"position":17}}]';

if (result.output !== expectedOutput) {
    throw new Error(`Linter output did not match expected output. \nActual: ${result.output}\nExpected: ${expectedOutput}`);
} else {
    console.log('All good!');
}
