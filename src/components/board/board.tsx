import { CellType } from "../../const";
import { Level, Direction, Position, Goal } from "../../types";
import BoardCell from "../board-cell/board-cell";
import BoardDroneCell from "../board-drone-cell/board-drone-cell";
import BoardTargetCell from "../board-target-cell/board-target-cell";
import "./board.css";

const generateKey = (r: number, c: number) => (`key-${r}-${c}`);

interface BoardProps {
  level: Level;
  drone: {
    position: Position | null;
    speed: number | string;
    direction: Direction | null;
  };
  goal: Goal | null;
  boardSize: number;
}

const Board = ({ level, drone, goal, boardSize }: BoardProps) => {
  const cellSize = boardSize / Number(level.map.length - 2);
  const map = level.map;

  return (
    <div 
      className={"board winter"}
      data-testid="board"
      style={{
        width: boardSize,
        height: boardSize
      }}
    >
      {
        map.map((stringRow, rIdx) => {
          let row = null;

          // Ignore first and last rows
          if (rIdx > 0 && rIdx < map.length - 1) {
            row = Array.from(stringRow).map((item, cIdx) => {
              let cell = null;

              // Ignore first and last columns
              if (cIdx > 0 && cIdx < stringRow.length - 1) {
                if (CellType.DRONE === item && Boolean(drone) && Boolean(drone.position)) {
                  cell = (
                    <BoardDroneCell 
                      key={generateKey(rIdx, cIdx)}
                      row={drone.position?.row || 0}
                      col={drone.position?.col || 0}
                      item={item}
                      size={cellSize}
                      speed={drone.speed}
                      direction={drone.direction || Direction.UP}
                    />
                  );
                } else if (CellType.PRIS === item || CellType.PRISER === item) {
                  cell = <BoardTargetCell 
                    key={generateKey(rIdx, cIdx)}
                    row={rIdx}
                    col={cIdx}
                    item={item}
                    size={cellSize}
                    isReached={goal ? goal.isTargetReached({row: rIdx, col: cIdx}) : false}
                  />
                } else {
                  cell = (
                    <BoardCell 
                      key={generateKey(rIdx, cIdx)}
                      row={rIdx}
                      col={cIdx}
                      item={item}
                      size={cellSize}
                    />
                  );
                }
              }

              return cell;
            });
          }
          
          return row;
        })
      }
    </div>
  );
};

export default Board;
