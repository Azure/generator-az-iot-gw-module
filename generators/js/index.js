'use strict';

module.exports = class extends JSModuleGenerator {
  constructor() {
    this.name = '';
    this.version = '';
    this.desc = '';
    this.author = '';
    this.license = '';
  }

  prompting() {
    return this.prompt([{
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
      this.name = answers.version;
      this.desc = answers.desc;
      this.author = answers.author;
      this.license = answers.license;
    })
  }

  writing() {
    this._copyFiles();

    this._copyDynamicFiles();
  }

  // Private Methods
  _copyStaticFiles() {
    this.fs.copy(
      this.templatePath('js/modules/printer.js'),
      this.destinationPath('modules/printer.js')
    );

    this.fs.copy(
      this.templatePath('js/modules/sensor.js'),
      this.destinationPath('modules/sensor.js')
    );

    this.fs.copy(
      this.templatePath('js/app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copy(
      this.templatePath('js/gw.config.json'),
      this.destinationPath('gw.config.json')
    );

    this.fs.copy(
      this.templatePath('shared/.editorconfig.json'),
      this.destinationPath('.editorconfig.json')
    );

    this.fs.copy(
      this.templatePath('shared/.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('shared/.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  _copyDynamicFiles() {
    this.fs.copy(
      this.templatePath('js/package.json'),
      this.destinationPath('package.json'), {
        name: this.name,
        version: this.version,
        desc: this.desc,
        author: this.author,
        license: this.license
      }
    );

    this.fs.copy(
      this.templatePath('js/README.md'),
      this.destinationPath('README.md'), {
        name: this.name
      }
    );
  }
};
