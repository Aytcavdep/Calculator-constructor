import { CalcButton } from "./calcButton";

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
        <CalcButton button={button} />
      ))}
    </div>
  ) : (
    <div
      key={id}
      className={title}
      draggable="true"
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDoubleClick={onDoubleClick}
    >
      {block.items.map((button) => (
        <CalcButton button={button} />
      ))}
    </div>
  );
};
