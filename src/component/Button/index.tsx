import './Button.scss';
import { Icon } from '../../IconSelector';
import { changeConstructorMode } from '../../redux/slices/calcItemSlice';
import React from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

type ButtonProps = {
  className: string;
  title: string;
  disabled: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  title,
  disabled,
}) => {
  const dispatch = useAppDispatch();
  const isConstructorMode = useSelector((state: RootState) => state.calcItem);

  return (
    <button
      className={className}
      onClick={() => dispatch(changeConstructorMode(!isConstructorMode))}
      disabled={disabled}
    >
      <Icon name={className} />
      <span>{title}</span>
    </button>
  );
};
