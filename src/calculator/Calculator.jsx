import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../store/store";
import {
  addConstructorItem,
  addConstructorLine,
  filtrConstructorLine,
  pressButton,
  setCurrentIndex,
  setDeleteIndex,
  unActiveItems,
  removeItem,
} from "../slices/calcItemSlice";
import "./Calculator.css";
import { SvgSelector } from "../icon/svgSelector";

function Calculator() {
  const dispatch = useDispatch();
  const calcItem = useSelector((state) => state.calcItem.calcButton);
  const constructorItem = useSelector((state) => state.calcItem.constructor);

  const [currentItem, setCurrentItem] = useState(null);

  const [targetClass, setTargetClass] = useState(0);
  const [parentClass, setParentClass] = useState(0);
  const [constructorMode, setConstructorMode] = useState(true);

  useEffect(() => {
    let buttonSwith = document.querySelector("button.constructor");
    buttonSwith.disabled = true;
  }, []);

  const dragStartHandler = (e, item) => {
    const deleteIndex = constructorItem.findIndex((items) => items === item);
    dispatch(setDeleteIndex(deleteIndex));
    setCurrentItem(item);
  };

  const dragOverHandler = (e, item) => {
    e.preventDefault();
    const currentIndex = constructorItem.findIndex((items) => items === item);
    dispatch(setCurrentIndex(currentIndex));
    setParentClass(e.target.className);

    if (!targetClass) {
      setTargetClass(e.target.className);

      dispatch(addConstructorLine(currentIndex));
    }
  };

  const dragOverHandlerArea = (e) => {
    e.preventDefault();
    if (!targetClass) {
      setTargetClass(e.target.className);

      dispatch(addConstructorLine(6));
    }
  };
  const dragLeaveHandler = (e) => {
    if ((parentClass !== "items") & (e.target.className !== "items")) {
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
    dispatch(unActiveItems(item));
  };

  const dropHandlerConstructor = (e, item) => {
    e.preventDefault();
    dispatch(filtrConstructorLine());
    setTargetClass(0);
    dispatch(addConstructorItem(currentItem));
    dispatch(unActiveItems(currentItem));
  };

  const enableCalculator = () => {
    if (constructorMode === true) {
      setConstructorMode(!constructorMode);
      let buttonSwith = document.querySelector("button.runtime");
      buttonSwith.disabled = true;
      buttonSwith = document.querySelector("button.constructor");
      buttonSwith.disabled = null;
      let calcButtonEnable = document.querySelectorAll(
        "div.calculator_area > div > div.items"
      );
      calcButtonEnable.forEach((element) => {
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
        element.style.cursor = "pointer";
      });
    }
  };
  const remove = (item) => {
    const deleteIndex = constructorItem.findIndex(
      (items) => items.id === item.id
    );
    dispatch(setDeleteIndex(deleteIndex));
    dispatch(removeItem(item.id));
  };

  const enableConstructor = () => {
    if (constructorMode === false) {
      setConstructorMode(!constructorMode);
      let buttonSwith = document.querySelector("button.runtime");
      buttonSwith.disabled = null;
      buttonSwith = document.querySelector("button.constructor");
      buttonSwith.disabled = true;
      let calcButtonDisable = document.querySelectorAll(
        "div.calculator_area > div > div.items"
      );
      calcButtonDisable.forEach((element) => {
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
        element.style.cursor = null;
      });
    }
  };

  return (
    <div className="area">
      <div className="button_area">
        <button className="runtime" onClick={() => enableCalculator()}>
          <SvgSelector id={"eye"} />
          <span>Runtime</span>
        </button>
        <button className="constructor" onClick={() => enableConstructor()}>
          <SvgSelector id={"selector"} />
          <span>Constructor</span>
        </button>
      </div>
      <div className="container">
        {constructorMode && (
          <div className="calculator_item">
            {calcItem.map((item) => (
              <div
                key={item.id}
                className={item.title}
                draggable={item.draggable}
                onDragStart={(e) => dragStartHandler(e, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
              >
                {item.items.map((key) => (
                  <div className="items" id={key.id} key={key.id}>
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
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandlerConstructor(e)}
        >
          {constructorItem.length == 0 && (
            <div className="image">
              <SvgSelector id={"image"} />
              <h3>Перетащите сюда</h3>
              <div>
                любой элемент
                <br /> из левой панели
              </div>
            </div>
          )}

          {constructorItem.map((item) => (
            <div
              className={item.title}
              key={item.id}
              onDragOver={(e) => dragOverHandler(e, item)}
              onDragStart={(e) => dragStartHandler(e, item)}
              draggable="true"
              onDoubleClick={() => remove(item)}
            >
              {item.items.map((number) => (
                <div className="items" id={number.id} key={number.id}>
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

export default Calculator;
