import { useEffect, useState } from "react";
import { CalcBlockButtons } from "./component/calcBlockButtons";
import { useSelector } from "react-redux";
import { calcItems } from "./component/calcItem";
import { Icon } from "../icon/icon";
import "../scss/Constructor.scss";
import { Button } from "./component/button/Button";

export const Constructor = () => {
  const [calcItem, setCalcItem] = useState([]);
  const [constructorItem, setConstructorItem] = useState([]);
  useEffect(() => {
    setCalcItem(calcItems);
  }, []);

  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);

  const [targetClass, setTargetClass] = useState(0);
  const [parentClass, setParentClass] = useState(0);
  const [deleteBlockIndex, setDeleteBlockIndex] = useState(-1);
  const line = {
    id: 105,
    title: "line",
    items: [{ id: 1, title: "" }]
  };

  const isConstructorMode = useSelector(
    (state) => state.calcItem.isConstructorMode
  );
  const findConstructorBlockIndex = ({ id }) => {
    return constructorItem.findIndex((items) => items.id === id);
  };
  const removeBlockConstructor = (id) => {
    if (isConstructorMode) {
      setConstructorItem([...constructorItem.filter((item) => item.id !== id)]);
    }
  };
  const changeDraggableBlock = (id, del) => {
    if (!constructorItem.find((item) => item.id === id) || del === "del") {
      setCalcItem([
        ...calcItem.map((item) =>
          item.id === id
            ? { ...item, isDraggable: !item.isDraggable }
            : { ...item }
        )
      ]);
    }
  };
  const addConstructorLine = (index) => {
    if (index === -1 && !constructorItem.length) {
      index = 0;
    } else if (index === -1) {
      index = constructorItem.length + 1;
    }
    const cloneConstructorItem = constructorItem.slice();
    if (!cloneConstructorItem.find((item) => item.id === 105)) {
      cloneConstructorItem.splice(index + 1, 0, line);
      setConstructorItem(cloneConstructorItem);
    }
  };
  const removeConstructorLine = () => {
    removeBlockConstructor(105);
  };
  const addConstructorBlock = (currentBlock) => {
    const cloneConstructorItem = constructorItem.slice();
    if (currentBlock.title === "display") {
      if (deleteBlockIndex !== -1) {
      } else {
        cloneConstructorItem.unshift(currentBlock);
        setConstructorItem(cloneConstructorItem);
      }
    } else if (currentBlockIndex !== -1 && currentBlockIndex !== undefined) {
      if (deleteBlockIndex !== -1) {
        removeConstructorLine();
        if (deleteBlockIndex < currentBlockIndex) {
          cloneConstructorItem.splice(deleteBlockIndex, 1);
        } else {
          cloneConstructorItem.splice(
            cloneConstructorItem.indexOf(currentBlock),
            1
          );
        }
        if (deleteBlockIndex !== currentBlockIndex) {
          cloneConstructorItem.splice(currentBlockIndex + 1, 0, currentBlock);
          setConstructorItem(cloneConstructorItem);
          setCurrentBlockIndex(-1);
        }
      } else {
        cloneConstructorItem.splice(currentBlockIndex + 1, 0, currentBlock);
        setConstructorItem(cloneConstructorItem);
        setCurrentBlockIndex(-1);
      }
    } else if (deleteBlockIndex !== -1) {
      cloneConstructorItem.splice(deleteBlockIndex, 1);
      cloneConstructorItem.splice(currentBlockIndex + 1, 0, currentBlock);
      setConstructorItem(cloneConstructorItem);
      setCurrentBlockIndex(-1);
    } else {
      cloneConstructorItem.push(currentBlock);
      setConstructorItem(cloneConstructorItem);
      setCurrentBlockIndex(-1);
    }
  };
  const removeBlockButtons = (id) => {
    if (isConstructorMode) {
      removeBlockConstructor(id);
      changeDraggableBlock(id, "del");
    }
  };

  const dragStartHandler = (e, block) => {
    setDeleteBlockIndex(findConstructorBlockIndex(block));
    setCurrentBlock(block);
  };

  const dragOverHandler = (e, block) => {
    e.preventDefault();
    setCurrentBlockIndex(findConstructorBlockIndex(block));
    setParentClass(e.target.className);

    if (!targetClass) {
      setTargetClass(e.target.className);

      addConstructorLine(findConstructorBlockIndex(block));
    }
  };

  const dragOverHandlerArea = (e) => {
    e.preventDefault();
    if (!targetClass) {
      setTargetClass(e.target.className);

      addConstructorLine(currentBlockIndex);
    }
  };
  const dragLeaveHandler = (e) => {
    if ((parentClass !== "items") & (e.target.className !== "items")) {
      removeConstructorLine();
      setTargetClass(0);
    }
  };
  const dragEndHandler = (e) => {
    removeConstructorLine();
  };

  const dropHandler = (e, id) => {
    e.preventDefault();
    removeConstructorLine();
    setTargetClass(0);
    changeDraggableBlock(id);
  };

  const dropHandlerConstructor = (e, block) => {
    e.preventDefault();
    removeConstructorLine();
    setTargetClass(0);
    changeDraggableBlock(currentBlock.id);
    addConstructorBlock(currentBlock);
  };

  return (
    <div className="area">
      <div className="button_area">
        <Button
          className="enable_calculator"
          title="Runtime"
          disabled={!isConstructorMode}
        />
        <Button
          className="disable_calculator"
          title="Constructor"
          disabled={isConstructorMode}
        />
      </div>
      <div className="constructor_area">
        {isConstructorMode && (
          <div className="buttonsBlock_area">
            {calcItem.map((block) => (
              <CalcBlockButtons
                key={block.id}
                block={block}
                area="consrtructor_block"
                onDragStart={(e) => dragStartHandler(e, block)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, block.id)}
              />
            ))}
          </div>
        )}
        <div
          className={
            !constructorItem.length
              ? "calculator_area"
              : "calculator_area not_empty"
          }
          onDragOver={(e) => dragOverHandlerArea(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandlerConstructor(e)}
        >
          {!constructorItem.length && (
            <div className="image">
              <Icon name={"image"} />
              <h3>Перетащите сюда</h3>
              <div>
                любой элемент
                <br /> из левой панели
              </div>
            </div>
          )}
          {constructorItem.map((block) => (
            <CalcBlockButtons
              key={block.id}
              block={block}
              onDragOver={(e) => dragOverHandler(e, block)}
              onDragStart={(e) => dragStartHandler(e, block)}
              onDoubleClick={() => removeBlockButtons(block.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
