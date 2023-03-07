import './Button.scss';
import { Icon } from '../../IconSelector';
import React from 'react';

type ButtonProps = {
  className: string;
  title: string;
  disabled: boolean;
  switchConstructorMode: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  title,
  disabled,
  switchConstructorMode,
}) => {
  return (
    <button
      className={className}
      onClick={() => switchConstructorMode()}
      disabled={disabled}
    >
      <Icon name={className} />
      <span>{title}</span>
    </button>
  );
};
