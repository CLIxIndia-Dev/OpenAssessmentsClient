import React from 'react';
import _ from 'lodash';

export default class FileUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired // TODO when we add styles, localize strings
  };

  constructor() {
    super();
    this.state = {
      uplFile: ''
    };
  }

  handleChange(e) {
    if (_.isFunction(this.props.selectAnswer)) {
      // We are currently only allowing a single file upload. Without enabling
      // multiple uploads on the file input, the file list will only be of size 1
      // and will get replaced every time the file is updated.
      this.props.selectAnswer(e.target.files[0]);
    }

    if (e.target.files[0] !== undefined) {
      console.log('file here');
      this.setState({ uplFile:e.target.files[0].name });
    } else {
      console.log('no file here');
      this.setState({ uplFile: '' });
    }
  }

  resetChange() {
    this.setState({ uplFile: '' });
    this.formInput.reset();
    this.props.selectAnswer('');
    this.inputField.click();
  }

  render() {
    return (
      <div>
        <label htmlFor="file-upload" className="c-file-upload">
          <span>{this.props.localizedStrings.chooseFile}</span>
          <input id="file-upload" ref={(input) => { this.inputField = input; }} onChange={e => this.handleChange(e)} type="file" className="c-file-upload-input" /><input type="text" value={this.state.uplFile ? this.state.uplFile : this.props.localizedStrings.noFile} readOnly />
        </label>
      </div>
    );
  }
}
