import { CalcButton } from "./calcButton";
import { useSelector } from "react-redux";

export const CalcBlockButtons = ({
  block,
  area,
  onDoubleClick,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  onDragLeave,
}) => {
  const isConstructorMode = useSelector(
    (state) => state.calcItem.isConstructorMode
  );
  const { id, title, isDraggable } = block;
  return area === "consrtructor_block" ? (
    <div
      key={id}
      className={title}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {block.items.map((button) => (
        <CalcButton button={button} key={button.id} />
      ))}
    </div>
  ) : (
    <div
      key={id}
      className={title}
      draggable={isConstructorMode}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDoubleClick={onDoubleClick}
    >
      {block.items.map((button) => (
        <CalcButton button={button} key={button.id} />
      ))}
    </div>
  );
};
