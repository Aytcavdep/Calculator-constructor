import { CalcBlockButtons } from '../calcElem/calcBlockButtons';
import { CalcItemsProps } from '../../data/calcItem';
import './ConstructorBlock.scss';

type ConstructorBlockProps = {
  isConstructorMode: boolean;
  calcItem: CalcItemsProps[];
  dragStartHandler: (
    e: React.DragEvent<HTMLDivElement>,
    block: CalcItemsProps
  ) => void;
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
};

export const ConstructorBlock: React.FC<ConstructorBlockProps> = ({
  isConstructorMode,
  calcItem,
  dragStartHandler,
  dragEndHandler,
  dropHandler,
}) => {
  return (
    <div className="constructorBlock">
      {calcItem.map((block) => (
        <CalcBlockButtons
          isConstructorMode={isConstructorMode}
          key={block.id}
          block={block}
          area="constructorBlock"
          onDragStart={(e) => dragStartHandler(e, block)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandler(e, block.id)}
        />
      ))}
    </div>
  );
};
