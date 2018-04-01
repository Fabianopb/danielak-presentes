import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';
import './RichTextArea.scss';

const hasErrored = (touched, errorMessage) => (touched && !_.isUndefined(errorMessage));

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}]
  ]
};

const RichTextArea = ({meta, input, handleTouch, formLabel, required}) => {
  const error = hasErrored(meta.touched, meta.error);
  const { value, onChange } = input;
  return (
    <div className={`field quill-wrapper ${error && 'error'}`}>
      <label className={`${required && 'required'}`}>{formLabel}</label>
      <ReactQuill
        value={value}
        modules={modules}
        onChange={value => onChange(value)}
        onFocus={() => handleTouch(input.name)}
      />
      <div className='error-message'>{error && <span>{meta.error}</span>}</div>
    </div>
  );
};

RichTextArea.propTypes = {
  required: PropTypes.bool,
  formLabel: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  handleTouch: PropTypes.func.isRequired
};

export default RichTextArea;
