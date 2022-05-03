import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addConstructorItem,
  addConstructorLine,
  filtrConstructorLine,
  pressButton,
  setCurrentIndex,
  setDeleteIndex,
  unActiveItems,
  removeItem,
} from "./slices/calcItemSlice";

function App() {
  const dispatch = useDispatch();
  const calcItem = useSelector((state) => state.calcItem.calcButton);
  const constructorItem = useSelector((state) => state.calcItem.constructor);

  const [currentItem, setCurrentItem] = useState(null);

  const [count, setCount] = useState(0);
  const [targetClass, setTargetClass] = useState(0);
  const [parentClass, setParentClass] = useState(0);
  const [constructorMode, setConstructorMode] = useState(true);
  const line = {
    id: 105,
    title: "line",
    items: [{ id: 1, title: "" }],
  };

  const dragStartHandler = (e, item) => {
    const deleteIndex = constructorItem.findIndex((items) => items == item);
    dispatch(setDeleteIndex(deleteIndex));
    setCurrentItem(item);
  };

  const dragOverHandler = (e, item) => {
    e.preventDefault();
    const currentIndex = constructorItem.findIndex((items) => items == item);
     console.log("Линия", currentIndex)
    dispatch(setCurrentIndex(currentIndex));
    setParentClass(e.target.className);
    
    if (!targetClass) {
      //  console.log("Линия")
      setTargetClass(e.target.className);

      dispatch(addConstructorLine(currentIndex));
    }
  };

  const dragOverHandlerArea = (e) => {
    e.preventDefault();
    // console.log("over")
    if (!targetClass) {
      // console.log("Линия")
     setTargetClass(e.target.className);

     dispatch(addConstructorLine(6));
   }
  };
  const dragLeaveHandler = (e) => {
    // console.log("Текущий", e.target.className);
    // console.log("Родитель", e.target.parentElement.className);
    // console.log("Корень", parentClass);

    if ((parentClass !== "items") & (e.target.className !== "items")) {
      // console.log("Стересть линию");
      dispatch(filtrConstructorLine());
      setTargetClass(0);
    }
  };
  const dragEndHandler = (e) => {
    dispatch(filtrConstructorLine());
  };

  const dropHandler = (e, item) => {
    e.preventDefault();
    dispatch(filtrConstructorLine());
    setTargetClass(0);
    setCount(0);
    dispatch(unActiveItems(item));
  };

  const dropHandlerConstructor = (e, item) => {
    e.preventDefault();
    dispatch(filtrConstructorLine());
    setTargetClass(0);
    dispatch(addConstructorItem(currentItem));
    dispatch(unActiveItems(currentItem));

  };

  const hoverHandler = (e) => {
    e.target.style.border = "2px solid blue";
  };
  const outHandler = (e) => {
    e.target.style.border = "1px solid green";
  };

  const changeConstructorMode = () => {
    setConstructorMode(!constructorMode);
    let calcButton = document.querySelectorAll(
      "div.calculator_area > div > div.items"
    );
    calcButton.forEach((element) => {
      element.onmousedown = function () {
        element.style.background = "#5D5FEF";
      };
      element.onmouseenter = function () {
        element.style.border = "2px solid #5D5FEF";
      };
      element.onmouseleave = function () {
        element.style.border = "1px solid #E2E3E5";
      };
      element.onmouseup = function () {
        element.style.background = "none";
      };
      element.onclick = function (e) {
        dispatch(pressButton(e.path[0].innerText));
      };
    });
  };
  const remove = (item) => {
    const deleteIndex = constructorItem.findIndex((items) => items.id === item.id);
    dispatch(setDeleteIndex(deleteIndex));
    dispatch(removeItem(item.id));
  };

  const enableCalck = () => {
    setConstructorMode(!constructorMode);
    let result = document.querySelectorAll(
      "div.calculator_area > div > div.items"
    );
    result.forEach((element) => {
      element.onmousedown = null;
      element.onmouseenter = function () {
        element.style.border = null;
      };
      element.onmouseleave = function () {
        element.style.border = null;
      };
      element.onmouseup = function () {
        element.style.background = null;
      };
      element.onclick = null;
    });
  };

  return (
    <div className="App">
      <button onClick={() => changeConstructorMode()}>Нажии меня</button>
      <button onClick={() => enableCalck()}>Нажми меня2</button>
      <div className="container">
        {constructorMode && (
          <div className="calculator_item">
            {calcItem.map((item) => (
              <div
                key={item.id}
                className={item.title}
                draggable={item.draggable}
                // onDragOver={(e) => dragOverHandler(e)}
                // onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
              >
                {item.items.map((key) => (
                  <div className="items" id={key.id}>
                    <div>{key.value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div
          className="calculator_area"
          onDragOver={(e) => dragOverHandlerArea(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          //  onDragStart={(e) => dragStartHandler(e, item)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandlerConstructor(e)}
        >
          {constructorItem.map((item) => (
            <div
              className={item.title}
              onDragOver={(e) => dragOverHandler(e, item)}
              onDragStart={(e) => dragStartHandler(e, item)}
             //  onDrop={(e) => dropHandlerConstructor(e, item)}
              draggable="true"
             onDoubleClick={() => remove(item)}
              disabled="true"
            >
              {item.items.map((number) => (
                <div
                  className="items"
                  id={number.id}
                  // onClick={() => dispatch(pressButton(number.value))}
                  // onMouseEnter={(e) => hoverHandler(e)}
                  //onMouseLeave={(e) => outHandler(e)}
                >
                  <div>{number.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
