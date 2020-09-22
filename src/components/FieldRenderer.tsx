import React, { useMemo } from 'react';
import { Message } from 'semantic-ui-react';

type RenderProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
};

type Props<T> = { input: RenderProps<T> } & {
  meta: {
    error?: any;
    touched?: boolean;
  };
  showError?: boolean | 'onBlur';
  children: (props: RenderProps<T>) => JSX.Element;
};

const FieldRenderer = <T extends any>({
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
    <div>
      <div>{children(fieldProps.input)}</div>
      {errorMessage && <Message error content={errorMessage} style={{ marginTop: 8 }} />}
    </div>
  );
};

export default FieldRenderer;
