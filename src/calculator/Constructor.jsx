import { useEffect, useState } from "react";
import { CalcBlockButtons } from "./component/calcBlockButtons";
import { isConstructorModeChange } from "../slices/calcItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { calcItems } from "./component/calcItem";
import { SvgSelector } from "../icon/svgSelector";
import "./Constructor.css";

export const Constructor = () => {
  const [calcItem, setCalcItem] = useState([]);
  const [constructorItem, setConstructorItem] = useState([]);
  useEffect(() => {
    setCalcItem(calcItems);
  }, []);
  
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1)

  const [targetClass, setTargetClass] = useState(0);
  const [parentClass, setParentClass] = useState(0);
  const [deleteBlockIndex, setDeleteBlockIndex] = useState(-1)
  const line = {
    id: 105,
    title: "line",
    items: [{ id: 1, title: "" }],}

  const dispatch = useDispatch();
  const isConstructorMode = useSelector(
    (state) => state.calcItem.isConstructorMode
  );
  const findConstructorBlockIndex = ({ id }) => {
    console.log("find index",id)
    return constructorItem.findIndex((items) => items.id === id);
  };
  const removeBlockConstructor =(id) => {
    console.log("remove",id)
    setConstructorItem([...constructorItem.filter((item) => item.id !== id)])
  }
  const changeDraggableBlock = (id) => {
    console.log("dragchange",id)
setCalcItem([...calcItem.map((item) => item.id === id ? {...item, isDraggable: !item.isDraggable} : {...item})])
  }
  const addConstructorLine =(index) => {
if (!constructorItem.find((item) => item.id === 105)) {
  console.log("line")
  console.log(index)
  setConstructorItem([...constructorItem.splice(index+1, 0, line)])
  console.log("line", constructorItem);
}
  }
  const removeConstructorLine = () => {
    removeBlockConstructor(105)
  }
  const addConstructorBlock = (currentBlock) => {
    console.log(currentBlock)
    console.log(currentBlock.title)
    console.log(deleteBlockIndex)
    console.log(constructorItem);
    if (currentBlock.title === "display") {
      if (deleteBlockIndex !== -1) {
        setConstructorItem([...constructorItem].splice(deleteBlockIndex, 1));
        setConstructorItem([...constructorItem].unshift(currentBlock));
      } else {
        console.log("true")
        setConstructorItem(constructorItem.unshift(currentBlock));
        // setConstructorItem([...constructorItem.splice(-1, 0, currentBlock)]);
      }
      
      // setConstructorItem([currentBlock]);
    } else if (
      currentBlockIndex !== -1 &&
      currentBlockIndex !== undefined
    ) {
      console.log("true1")
      if (deleteBlockIndex !== -1) {
        console.log("true1")
        setConstructorItem([...constructorItem].splice(deleteBlockIndex, 1));
        setConstructorItem([...constructorItem].splice(currentBlockIndex + 1, 0, currentBlock));
        setCurrentBlockIndex(-1);
      } else {
        console.log("true2")
        setConstructorItem([...constructorItem].splice(currentBlockIndex + 1, 0, currentBlock));
        setCurrentBlockIndex(-1);
      }
    } else if (deleteBlockIndex !== -1) {
      console.log("true3")
      setConstructorItem([...constructorItem].splice(deleteBlockIndex, 1));
      setConstructorItem([...constructorItem].splice(currentBlockIndex + 1, 0, currentBlock));
        setCurrentBlockIndex(-1);
    } else {
      console.log("true4")
      setConstructorItem([...constructorItem].push(currentBlock));
        setCurrentBlockIndex(-1);
    }
    console.log("добавили объект", constructorItem);
  }
   const removeBlockButtons = (id) => {
    removeBlockConstructor(id);
    changeDraggableBlock(id);
  };

  const dragStartHandler = (e, block) => {
    setDeleteBlockIndex(findConstructorBlockIndex(block));
    setCurrentBlock(block);
  };

  const dragOverHandler = (e, {id}) => {
    e.preventDefault();
  setCurrentBlockIndex(findConstructorBlockIndex(id));
    setParentClass(e.target.className);

    if (!targetClass) {
      setTargetClass(e.target.className);

      addConstructorLine(findConstructorBlockIndex(id));
    }
  };

  const dragOverHandlerArea = (e) => {
    e.preventDefault();
    if (!targetClass) {
      setTargetClass(e.target.className);

      addConstructorLine(6);
    }
  };
  const dragLeaveHandler = (e) => {
    if ((parentClass !== "items") & (e.target.className !== "items")) {
      removeConstructorLine()
      setTargetClass(0);
    }
  };
  const dragEndHandler = (e) => {
    removeConstructorLine()
  };

  const dropHandler = (e, id) => {
    e.preventDefault();
    removeConstructorLine()
    setTargetClass(0);
    changeDraggableBlock(id)
  };

  const dropHandlerConstructor = (e, block) => {
    e.preventDefault();
    removeConstructorLine()
    setTargetClass(0);
    addConstructorBlock(currentBlock);
    changeDraggableBlock(currentBlock.id)
  };

  return (
    <div className="container">
      {isConstructorMode && (
        <div className="buttonsBlock_area">
          {calcItem.map((block) => (
            <CalcBlockButtons
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
        className="calculator_area"
        onDragOver={(e) => dragOverHandlerArea(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandlerConstructor(e)}
      >
        {!constructorItem.length && (
          <div className="image">
            <SvgSelector id={"image"} />
            <h3>Перетащите сюда</h3>
            <div>
              любой элемент
              <br /> из левой панели
            </div>
          </div>
        )}
{console.log("конструктор", constructorItem)}
        {/* {
          constructorItem.map((block) => (
          <CalcBlockButtons
            block={block}
            onDragOver={(e) => dragOverHandler(e, block.id)}
            onDragStart={(e) => dragStartHandler(e, block)}
            onDoubleClick={() => removeBlockButtons(block.id)}
          />
        ))} */}
      </div>
    </div>
  );
};
