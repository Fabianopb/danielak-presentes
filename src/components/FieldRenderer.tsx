import React, { CSSProperties, useMemo } from 'react';
import MessageContainer from './MessageContainer';

type RenderProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
};

type Props<T> = { input: RenderProps<T> } & {
  style?: CSSProperties;
  className?: string;
  label?: string;
  meta: {
    error?: any;
    touched?: boolean;
  };
  showError?: boolean | 'onBlur';
  children: (props: RenderProps<T>) => JSX.Element;
};

const FieldRenderer = <T extends any>({
  style,
  className,
  label,
  meta,
  showError = 'onBlur',
  children,
  ...fieldProps
}: Props<T>) => {
  const errorMessage = useMemo(
    () => (showError === true || (showError === 'onBlur' && meta.touched) ? meta.error : undefined),
    [meta.error, meta.touched, showError],
  );

  return (
    <div className={className} style={style}>
      {label && <div style={{ marginTop: 8 }}>{label}</div>}
      <div>{children(fieldProps.input)}</div>
      {errorMessage && <MessageContainer message={errorMessage} />}
    </div>
  );
};

export default FieldRenderer;
