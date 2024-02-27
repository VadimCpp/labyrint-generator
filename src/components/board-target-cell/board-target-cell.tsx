import { TargetState } from "../../const";
import BoardCell from "../board-cell/board-cell";

interface BoardTargetCellProps {
  col: number;
  row: number;
  item: string;
  size: number;
  state: boolean;
}

const BoardTargetCell = ({ col, row, item, size, state }: BoardTargetCellProps) => {
  let style = {};
  if (state === TargetState.REACHED) {
    style = {
      animation: "reached 1s",
      opacity: 0,
      transition: "opacity 1s ease"
    };
  }

  return (
    <BoardCell
      col={col}
      row={row}
      item={item}
      size={size}
      style={style}
    />
  );
};

export default BoardTargetCell;
