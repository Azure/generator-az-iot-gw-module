'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.name = '';
    this.version = '';
    this.desc = '';
    this.author = '';
    this.license = '';
  }

  initializing() {
    this.composeWith(require.resolve('../shared'));
  }

  prompting() {
    return this.prompt([{
      type: 'intput',
      name: 'name',
      message: 'Name of your Azure IoT Gateway module project',
      default: this.appname // default to current folder name
    }, {
      type: 'intput',
      name: 'version',
      message: 'Version of js module project.',
      default: '0.1.0' // default to current folder name
    }, {
      type: 'intput',
      name: 'desc',
      message: 'Description of your project.',
      default: this.appname // default to current folder name
    }, {
      type: 'intput',
      name: 'author',
      message: 'Author name of your project.',
      default: this.appname // default to current folder name
    }, {
      type: 'intput',
      name: 'license',
      message: 'License type(MIT/BSD) of your project.',
      default: ''
    }]).then((answers) => {
      this.name = answers.name;
      this.version = answers.version;
      this.desc = answers.desc;
      this.author = answers.author;
      this.license = answers.license;
    })
  }

  writing() {
    this._copyStaticFiles();

    this._copyDynamicFiles();
  }

  // Private Methods
  _copyStaticFiles() {
    this.fs.copy(
      this.templatePath('modules/printer.js'),
      this.destinationPath('modules/printer.js')
    );

    this.fs.copy(
      this.templatePath('modules/sensor.js'),
      this.destinationPath('modules/sensor.js')
    );

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copy(
      this.templatePath('gw.config.json'),
      this.destinationPath('gw.config.json')
    );

    this.fs.copy(
      this.templatePath('.npmrc'),
      this.destinationPath('.npmrc')
    );
  }

  _copyDynamicFiles() {
    this.log('this.author: ' + this.author);

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.name,
        version: this.version,
        desc: this.desc,
        author: this.author,
        license: this.license
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        name: this.name
      }
    );
  }
};
