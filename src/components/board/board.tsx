import { LEVELS, CellType, DEFAULT_CELLS_NUMBER } from "../../const";
import BoardCell from "../board-cell/board-cell";
import BoardDroneCell from "../board-drone-cell/board-drone-cell";
import BoardTargetCell from "../board-target-cell/board-target-cell";
import "./board.css";

const isValidLevel = (level: number) => (Number.isInteger(level) && level >= 0 && level < LEVELS.length);
const generateKey = (r: number, c: number) => (`key-${r}-${c}`);

interface BoardProps {
  level: number;
  drone: {
    position: {
      row: number;
      col: number;
    };
    speed: number;
    direction: number;
  };
  goal: {
    getTargetState: (r: number, c: number) => boolean;
  };
  boardSize: number;
}

const Board = ({ level, drone, goal, boardSize }: BoardProps) => {
  if (!isValidLevel(level)) {
    return null;
  }

  const cellSize = boardSize / DEFAULT_CELLS_NUMBER;
  const map = LEVELS[level].map;

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
                      row={drone.position.row}
                      col={drone.position.col}
                      item={item}
                      size={cellSize}
                      speed={drone.speed}
                      direction={drone.direction}
                    />
                  );
                } else if (CellType.PRIS === item || CellType.PRISER === item) {
                  cell = <BoardTargetCell 
                    key={generateKey(rIdx, cIdx)}
                    row={rIdx}
                    col={cIdx}
                    item={item}
                    size={cellSize}
                    state={goal.getTargetState(rIdx, cIdx)}
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
