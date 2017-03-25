'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Module project name'
    });
  }

  initializing() {
    this.props = {
      name: this.options.name || this.appname
    };
  }

  _askForProjectName() {
    return askName({
      type: 'input',
      name: 'name',
      message: 'Module project Name',
      filter: _.kebabCase,
      validate(str) {
        return str.length > 0;
      }
    }, this).then(answer => {
      this.props.name = answer.name || this.props.name;
    });
  }

  _askFor() {
    const prompts = [{
      type: 'input',
      name: 'description',
      message: 'Description of module project.',
      when: !this.props.description
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.props.authorName,
      store: true
    }, {
      type: 'list',
      name: 'moduleType',
      message: 'Choose the module type(language) for your project.',
      choices: ['node', 'net', 'java'],
      default: 'node',
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    })
  }
  
  prompting() {
    return this._askForProjectName()
      .then(this._askFor.bind(this));
  }

  configuring() {
  }

  default() {
    switch(this.props.moduleType) {
      case 'node':
      this.composeWith(require.resolve('../node'), {
        name: this.props.name,
        description: this.props.description,
        license: this.props.license,
        authorName: this.props.authorName
      });
      break;

      case 'net':
      throw '.Net module type is not supported yet.'
      break;

      case 'java':
      throw 'Java module type is not supported yet.'
      break;

      default:
      throw 'Invalid module type.';
    }
  }

  writing() {
  }

  conflicts() {
  }

  install() {
  }

  end() {
    this.log('Thanks for using module generator for azure iot gateway.');
  }
};
