'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.name = '';
    this.moduleType = '';
  }
  
  initializing() {
    // this.composeWith(require.resolve('../js'));
    // this.composeWith(require.resolve('../dotnet'));
  }
  
  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'moduleType',
      message: 'Choose the language for your project',
      choices: ['node', 'net', 'java'],
      default: 'node' // default to current folder name
    }]).then((answers) => {
      this.name = answers.name;
      this.moduleType = answers.moduleType;

      if (this.moduleType == 'node') {
        this.composeWith(require.resolve('../node'));
      } else if (this.moduleType == 'net') {
        this.composeWith(require.resolve('../net'));
      }
    });
  }

  writing() {
  }
};
