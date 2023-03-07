import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calcItems, CalcItemsProps } from '../../data/calcItem';
import { Button } from '../Button';
import { RootState, useAppDispatch } from '../../redux/store';
import { changeConstructorMode } from '../../redux/slices/calcLogicSlice';
import { ConstructorBlock } from '../ConstructorBlock';
import { CalculatorBlock } from '../CalculatorBlock';
import { line } from '../../data/line';
import './Constructor.scss';

export const Constructor = () => {
  const [calcItem, setCalcItem] = useState<CalcItemsProps[] | []>([]);
  const [constructorItem, setConstructorItem] = useState<CalcItemsProps[] | []>(
    []
  );
  const [currentBlock, setCurrentBlock] = useState<null | CalcItemsProps>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [targetClass, setTargetClass] = useState<EventTarget>();
  const [deleteBlockIndex, setDeleteBlockIndex] = useState(-1);

  useEffect(() => {
    setCalcItem(calcItems);
  }, []);

  const dispatch = useAppDispatch();
  const isConstructorMode = useSelector(
    (state: RootState) => state.calcItem.isConstructorMode
  );
  const switchConstructorMode = () => {
    dispatch(changeConstructorMode(!isConstructorMode));
  };

  const findConstructorBlockIndex = ({ id }: { id: number }) => {
    return constructorItem.findIndex((items) => items.id === id);
  };

  const removeBlockConstructor = (id: number) => {
    if (isConstructorMode) {
      setConstructorItem([...constructorItem.filter((item) => item.id !== id)]);
    }
  };

  const changeDraggableBlock = (id: number, del?: string) => {
    if (!constructorItem.find((item) => item.id === id) || del === 'del') {
      setCalcItem([
        ...calcItem.map((item) =>
          item.id === id
            ? { ...item, isDraggable: !item.isDraggable }
            : { ...item }
        ),
      ]);
    }
  };

  const addConstructorLine = (index: number) => {
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

  const addConstructorBlock = (currentBlock: CalcItemsProps) => {
    const cloneConstructorItem = constructorItem.slice();
    if (currentBlock.title === 'display') {
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

  const removeBlockButtons = (id: number) => {
    if (isConstructorMode) {
      removeBlockConstructor(id);
      changeDraggableBlock(id, 'del');
    }
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    block: CalcItemsProps
  ) => {
    setDeleteBlockIndex(findConstructorBlockIndex(block));
    setCurrentBlock(block);
  };

  const dragOverHandler = (
    e: React.DragEvent<HTMLDivElement>,
    block: CalcItemsProps
  ) => {
    e.preventDefault();
    setCurrentBlockIndex(findConstructorBlockIndex(block));
    if (!targetClass) {
      setTargetClass(e.target);
      addConstructorLine(findConstructorBlockIndex(block));
    }
  };

  const dragOverHandlerArea = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!targetClass) {
      setTargetClass(e.target);
      addConstructorLine(currentBlockIndex);
    }
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    removeConstructorLine();
    setTargetClass(undefined);
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    removeConstructorLine();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    removeConstructorLine();
    setTargetClass(undefined);
    changeDraggableBlock(id);
  };

  const dropHandlerConstructor = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    removeConstructorLine();
    setTargetClass(undefined);
    if (currentBlock) {
      changeDraggableBlock(currentBlock.id);
      addConstructorBlock(currentBlock);
    }
  };

  return (
    <div className="wrapper">
      <div className="buttonSwitcher">
        <Button
          className="buttonSwitcher__enableCalculator"
          title="Runtime"
          disabled={isConstructorMode}
          switchConstructorMode={switchConstructorMode}
        />
        <Button
          className="buttonSwitcher__disableCalculator"
          title="Constructor"
          disabled={!isConstructorMode}
          switchConstructorMode={switchConstructorMode}
        />
      </div>
      <div
        className={isConstructorMode ? 'constructor' : 'constructor runtime'}
      >
        {isConstructorMode && (
          <ConstructorBlock
            isConstructorMode={isConstructorMode}
            calcItem={calcItem}
            dragStartHandler={dragStartHandler}
            dragEndHandler={dragEndHandler}
            dropHandler={dropHandler}
          />
        )}
        <CalculatorBlock
          isConstructorMode={isConstructorMode}
          constructorItem={constructorItem}
          dragOverHandlerArea={dragOverHandlerArea}
          dragLeaveHandler={dragLeaveHandler}
          dragEndHandler={dragEndHandler}
          dropHandlerConstructor={dropHandlerConstructor}
          dragOverHandler={dragOverHandler}
          dragStartHandler={dragStartHandler}
          removeBlockButtons={removeBlockButtons}
        />
      </div>
    </div>
  );
};
