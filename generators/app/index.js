'use strict';

module.exports = class extends ModuleGenerator {
  constructor() {
    this.name = '';
    this.moduleType = '';
  }
  
  initializing() {
    this.composeWith(require.resolve('../js'));
    // this.composeWith(require.resolve('../dotnet'));
  }
  
  prompting() {
    return this.prompt([{
      type: 'intput',
      name: 'name',
      message: 'Name of your Azure IoT Gateway module project',
      default: this.appname // default to current folder name
    }, {
      type: 'list',
      name: 'moduleType',
      message: 'Choose the type for your project',
      choices: ['js', 'dotnet<not supported>'],
      default: 'js' // default to current folder name
    }]).then((answers) => {
      this.name = answers.name;
      this.moduleType = answers.moduleType;
    });

    if (this.moduleType == 'js') {
      this.composeWith(require.resolve('../js'));
    } else if (this.moduleType == 'dotnet') {
      this.composeWith(require.resolve('../dotnet'));
    }
  }

  writing() {
  }
};
