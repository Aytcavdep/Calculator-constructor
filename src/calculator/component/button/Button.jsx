import "../../../scss/Button.scss";
import { Icon } from "../../../icon/icon";
import { changeConstructorMode } from "../../../slices/calcItemSlice";
import { useDispatch } from "react-redux";

export const Button = ({ className, title, disabled }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={className}
      onClick={() => dispatch(changeConstructorMode())}
      disabled={disabled}
    >
      <Icon name={className} />
      <span>{title}</span>
    </button>
  );
};
