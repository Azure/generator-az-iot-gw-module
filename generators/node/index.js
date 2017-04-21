'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Module project name.'
    });

    this.option('description', {
      type: String,
      required: false,
      desc: 'Description of module project.'
    });

    this.option('authorName', {
      type: String,
      required: false,
      desc: 'Author\'s name.'
    });
  }

  initializing() {
    // Refresh the current package content to latest one.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: currentPkg.name || _.kebabCase(this.options.name),
      description: currentPkg.descrption || this.options.description,
      version: currentPkg.version || '0.0.0',
      authorName: this.options.authorName,
      keywords: currentPkg.keywords || [],
      license: currentPkg.license,
      devDependencies: currentPkg.devDependencies || {}
    };
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.props.keywords || this.props.keywords.length == 0,
      filter(words) {
        return words.split(/\s*,\s*/g);
      }
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  configuring() {}

  default () {
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.authorName
    });

    this.composeWith(require.resolve('../shared'));
  }

  writing() {
    this._generateDynamicFiles();
    this._generateStaticFiles();
  }

  conflicts() {}

  install() {}

  end() {
  }

  _generateStaticFiles() {
    this.fs.copy(
      this.templatePath('printer.js'),
      this.destinationPath('printer.js')
    );

    this.fs.copy(
      this.templatePath('sensor.js'),
      this.destinationPath('sensor.js')
    );

    this.fs.copy(
      this.templatePath('bin/gw.js'),
      this.destinationPath('bin/gw.js')
    );

    this.fs.copy(
      this.templatePath('gw.config.json'),
      this.destinationPath('gw.config.json')
    );
  }

  _generateDynamicFiles() {
    // package.json
    this.fs.writeJSON(this.destinationPath('package.json'), {
      name: this.props.name,
      version: this.props.version,
      description: this.props.description,
      author: {
        name: this.props.authorName
      },
      license: this.props.license,
      main: './bin/gw.js',
      scripts: {
        start: 'node ./bin/gw.js'
      },
      keywords: _.uniq(this.props.keywords || []),
      devDependencies: extend(
        this.props.devDependencies, {
          'azure-iot-gateway': '~1.0.4'
        })
    });

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );
  }
};
