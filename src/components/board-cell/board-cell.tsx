/* eslint-disable default-case */

import { CellType } from "../../const";
import "./board-cell.css";

interface BoardCellProps {
  col: number;
  row: number;
  item: string;
  size: number;
  style?: React.CSSProperties;
}

const BoardCell = ({ col, row, item, size, style }: BoardCellProps) => {
  if (CellType.EMPTY === item || CellType.WALL_ASIDE === item) {
    return null;
  }

  const classes = (r: number, c: number, i: string) => {
    let classes = `board__cell board__cell--${r}-${c}`;
    switch(i) {
      case CellType.WALL_TOP:
        classes = `${classes} ${"board__cell--wall-top"}`;
        break;
      case CellType.WALL_MID:
        classes = `${classes} ${"board__cell--wall-mid"}`;
        break;
      case CellType.PRIS:
        classes = `${classes} ${"board__cell--pris"}`;
        break;
      case CellType.PRISER:
        classes = `${classes} ${"board__cell--priser"}`;
        break;
      case CellType.DRONE:
        classes = `${classes} ${"board__cell--drone"}`;
        break;
    }
    return classes;
  };

  return (
    <div
      data-testid="board-cell"
      className={classes(row, col, item)}
      style={{
        left: size * (col - 1),
        top: size * (row - 1),
        width: Math.ceil(size),
        height: Math.ceil(size),
        ...style
      }}
    >
      {item}
    </div>
  );
};

export default BoardCell;
