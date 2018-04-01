import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextArea.scss';

class RichTextArea extends Component {
  state = {
    value: ''
  };

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}]
    ]
  };

  handleChange = (value) => {
    console.log(value);
    this.setState({value});
  };

  render () {
    return (
      <ReactQuill
        value={this.state.value}
        modules={this.modules}
        onChange={this.handleChange}
      />
    );
  }
}

RichTextArea.propTypes = {
};

export default RichTextArea;
