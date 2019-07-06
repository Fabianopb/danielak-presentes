import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';
import styles from './RichTextArea.module.scss';

const hasErrored = (touched: boolean, errorMessage: string): boolean => (touched && !_.isUndefined(errorMessage));

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
  ],
};

type RichTextAreaProps = WrappedFieldProps & {
  required: boolean;
  formLabel: string;
  handleTouch: (name: string) => any;
};

const RichTextArea: React.SFC<RichTextAreaProps> = ({meta, input, handleTouch, formLabel, required}) => {
  const error = hasErrored(meta.touched, meta.error);
  const { value, onChange } = input;
  return (
    <div className={`field ${styles.quillWrapper} ${error && 'error'}`}>
      <label className={`${required && styles.required}`}>{formLabel}</label>
      <ReactQuill
        value={value}
        modules={modules}
        onChange={text => onChange(text)}
        onBlur={() => handleTouch(input.name)}
      />
      <div className={styles.errorMessage}>{error && <span>{meta.error}</span>}</div>
    </div>
  );
};

export default RichTextArea;
