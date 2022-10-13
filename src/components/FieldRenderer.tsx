import { CSSProperties, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import MessageContainer from './MessageContainer';

type Props = {
  style?: CSSProperties;
  className?: string;
  label?: string;
  meta: {
    error?: any;
    touched?: boolean;
  };
  showError?: boolean | 'onBlur';
  children: ReactNode;
};

const Label = styled.div`
  font-weight: bold;
  margin: 8px 0 4px 0;
`;

const FieldRenderer = ({ style, className, label, meta, showError = 'onBlur', children }: Props) => {
  const errorMessage = useMemo(
    () => (showError === true || (showError === 'onBlur' && meta.touched) ? meta.error : undefined),
    [meta.error, meta.touched, showError]
  );

  return (
    <div className={className} style={style}>
      {label && <Label>{label}</Label>}
      <div>{children}</div>
      {errorMessage && <MessageContainer message={errorMessage} />}
    </div>
  );
};

export default FieldRenderer;
