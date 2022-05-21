import { useDispatch, useSelector } from "react-redux";
import { pressButton } from "../../slices/calcItemSlice";

export const CalcButton = ({ button }) => {
  const dispatch = useDispatch();
  const displayValue = useSelector((state) => state.calcItem.displayValue);
  const isConstructorMode = useSelector(
    (state) => state.calcItem.isConstructorMode
  );
  const { id, value, title } = button;
  const buttonClick = (value, title) => {
    if (!isConstructorMode && title !== "display") {
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
      <div>{title === "display" ? displayValue : value}</div>
    </div>
  );
};
