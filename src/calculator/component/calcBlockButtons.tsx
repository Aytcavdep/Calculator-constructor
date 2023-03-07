import { CalcButton } from "./calcButton";
import { useSelector } from "react-redux";
import React from "react";
import { CalcItemsProps } from "./calcItem";
import { RootState } from "../../redux/store";

type CalcBlockButtonsProps = {
  block: CalcItemsProps;
  area?: string;
  onDoubleClick?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const CalcBlockButtons: React.FC<CalcBlockButtonsProps> = ({
  block,
  area,
  onDoubleClick,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  onDragLeave
}) => {
  const isConstructorMode = useSelector(
    (state: RootState) => state.calcItem.isConstructorMode
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
      draggable={title === "display" ? false : isConstructorMode}
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
