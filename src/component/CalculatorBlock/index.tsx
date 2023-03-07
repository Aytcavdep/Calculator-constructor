import { CalcBlockButtons } from '../calcElem/calcBlockButtons';
import { CalcItemsProps } from '../../data/calcItem';
import { Icon } from '../../IconSelector';
import './CalculatorBlock.scss';

type CalculatorBlockType = {
  isConstructorMode: boolean;
  constructorItem: CalcItemsProps[];
  dragOverHandlerArea: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandlerConstructor: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (
    e: React.DragEvent<HTMLDivElement>,
    block: CalcItemsProps
  ) => void;
  dragStartHandler: (
    e: React.DragEvent<HTMLDivElement>,
    block: CalcItemsProps
  ) => void;
  removeBlockButtons: (id: number) => void;
};

export const CalculatorBlock: React.FC<CalculatorBlockType> = ({
  isConstructorMode,
  constructorItem,
  dragOverHandlerArea,
  dragLeaveHandler,
  dragEndHandler,
  dropHandlerConstructor,
  dragOverHandler,
  dragStartHandler,
  removeBlockButtons,
}) => {
  return (
    <div
      className={
        !constructorItem.length ? 'calculatorBlock' : 'calculatorBlock notEmpty'
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
          isConstructorMode={isConstructorMode}
        />
      ))}
    </div>
  );
};
