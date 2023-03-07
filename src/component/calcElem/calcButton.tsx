import React from 'react';
import { useSelector } from 'react-redux';
import { pressButton } from '../../redux/slices/calcLogicSlice';
import { RootState, useAppDispatch } from '../../redux/store';

type CalcButtonProps = {
  button: {
    id: number;
    title: number | string;
    value: number | string;
  };
};

export const CalcButton: React.FC<CalcButtonProps> = ({ button }) => {
  const dispatch = useAppDispatch();
  const { displayValue, isConstructorMode } = useSelector(
    (state: RootState) => state.calcItem
  );
  const { id, value, title } = button;
  const buttonClick = (value: number | string, title: number | string) => {
    if (!isConstructorMode && title !== 'display') {
      dispatch(pressButton(value));
    }
  };
  return (
    <div
      key={id}
      className={
        isConstructorMode
          ? `calc_Button ${title}`
          : `calc_Button ${title} hover`
      }
      onClick={() => buttonClick(value, title)}
    >
      <div>{title === 'display' ? displayValue : value}</div>
    </div>
  );
};
