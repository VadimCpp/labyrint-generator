import BoardCell from "../board-cell/board-cell";
import { MoveDirection } from "../../const"

interface BoardDroneCellProps {
  col: number;
  row: number;
  item: string;
  size: number;
  speed: number | string;
  direction: number;
}

const BoardDroneCell = ({ col, row, item, size, speed, direction }: BoardDroneCellProps) => {
  let animation = "vertical_wave 1s infinite";
  if (direction === MoveDirection.RIGHT) {
    animation = `fly-right ${speed}`;
  } else if (direction === MoveDirection.LEFT) {
    animation = `fly-left ${speed}`;
  }

  return (
    <BoardCell
      col={col}
      row={row}
      item={item}
      size={size}
      style={{
        transitionTimingFunction: "linear",
        transitionDuration: `${speed}`,
        animation: animation
      }}
    />
  );
};

export default BoardDroneCell;
