import BoardCell from "../board-cell/board-cell";

interface BoardTargetCellProps {
  col: number;
  row: number;
  item: string;
  size: number;
  isReached: boolean;
}

const BoardTargetCell = ({ col, row, item, size, isReached }: BoardTargetCellProps) => {
  let style = {};
  if (isReached === true) {
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
