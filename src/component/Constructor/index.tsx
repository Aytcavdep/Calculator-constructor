import React, { useEffect, useState } from 'react';
import { CalcBlockButtons } from '../calcElem/calcBlockButtons';
import { useSelector } from 'react-redux';
import { calcItems, CalcItemsProps } from '../../data/calcItem';
import { Icon } from '../../IconSelector';
import './Constructor.scss';
import { Button } from '../Button';
import { RootState } from '../../redux/store';

export const Constructor = () => {
  const [calcItem, setCalcItem] = useState<CalcItemsProps[] | []>([]);
  const [constructorItem, setConstructorItem] = useState<CalcItemsProps[] | []>(
    []
  );
  useEffect(() => {
    setCalcItem(calcItems);
  }, []);

  const [currentBlock, setCurrentBlock] = useState<null | CalcItemsProps>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);

  const [targetClass, setTargetClass] = useState<EventTarget>();
  const [deleteBlockIndex, setDeleteBlockIndex] = useState(-1);
  const line = {
    id: 105,
    title: 'line',
    isDraggable: false,
    items: [{ id: 1, title: '', value: '' }],
  };

  const isConstructorMode = useSelector(
    (state: RootState) => state.calcItem.isConstructorMode
  );
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
      <div
        className={
          isConstructorMode ? 'constructor_area' : 'constructor_area runtime'
        }
      >
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
              ? 'calculator_area'
              : 'calculator_area not_empty'
          }
          onDragOver={(e) => dragOverHandlerArea(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandlerConstructor(e)}
        >
          {!constructorItem.length && (
            <div className="image">
              <Icon name={'image'} />
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
