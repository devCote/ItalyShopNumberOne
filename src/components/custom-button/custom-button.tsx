import React from 'react';

import './custom-button.scss';

interface Props {
  inverted?: boolean;
  isGoogleSignIn?: boolean;
  apply?: boolean;
  overlay?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: any;
  className?: string;
  component?: any;
  ref?: any;
}

const CustomButton: React.FC<Props> = ({
  onClick,
  type,
  children,
  className,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`${className} ${props?.inverted ? 'inverted' : ''} ${
      props?.isGoogleSignIn ? 'google-sign-in' : ''
    } ${props?.overlay ? 'overlay' : ''} ${
      props?.apply ? 'apply' : ''
    } custom-button`}
  >
    {children}
  </button>
);

export default CustomButton;
