import Board from './components/board/board'
import { LEVELS, CellType } from './const'
import { Direction } from './types';
import { generateEmptyBoard, addCellToBoard } from './algorithm'
import Solver from './components/solver/solver'
import { solveLabyrint } from './components/solver/solver-logic'
import './app.css'

function getDroneStartPosition(level: number): null | { row: number; col: number } {
  let pos: null | { row: number; col: number } = null;

  if (Number.isInteger(level) && level >= 0 && level < LEVELS.length) {
    const map = LEVELS[level].map;
    map.some((stringElement, r) => {
      const row = Array.from(stringElement);
      return row.some((cell, c) => {
        if (CellType.DRONE === cell) {
          pos = {
            row: r,
            col: c
          };
        }
        return Boolean(pos);
      });
    });
  }

  return pos;
}

function App() {
  let boardClockwise = generateEmptyBoard(10)
  boardClockwise = addCellToBoard(boardClockwise, 1, 1, CellType.DRONE)
  boardClockwise = addCellToBoard(boardClockwise, 1, 10, CellType.PRIS)

  let boardCounterclockwise = generateEmptyBoard(10)
  boardCounterclockwise = addCellToBoard(boardCounterclockwise, 1, 1, CellType.DRONE)
  boardCounterclockwise = addCellToBoard(boardCounterclockwise, 10, 1, CellType.PRIS)

  return (
    <main>
      <h1 className="title">Labyrint Generator</h1>

      {/* Let's solve levels 1-2 */}
      <section className="levels">
        <h2 className="levels__title">Let's solve levels 1-2</h2>
        <div className='levels__container labyrint-container'>
          {
            Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="labyrint-container__item">
                <h3 className='labyrint-container__title'>Level {idx + 1}</h3>
                <Solver
                  initialLevel={{map: LEVELS[idx].map, minMoves: 0, minTime: 0}}
                  path={solveLabyrint(LEVELS[idx].map)}
                />
              </div>
            ))
          }
        </div>
      </section>
      
      {/* Let's move the drone */}
      <section className="levels">
        <h2 className="levels__title">Let's move the drone</h2>
        <div className='levels__container labyrint-container'>
          <div className="labyrint-container__item">
            <h3 className='labyrint-container__title'>Clockwise</h3>
            <Solver
              initialLevel={{map: boardClockwise, minMoves: 0, minTime: 0}}
              path={[ Direction.RIGHT, Direction.DOWN, Direction.LEFT, Direction.UP ]}
            />
          </div>
          <div className="labyrint-container__item">
            <h3 className='labyrint-container__title'>Counterclockwise</h3>
            <Solver
              initialLevel={{map: boardCounterclockwise, minMoves: 0, minTime: 0}}
              path={[ Direction.DOWN, Direction.RIGHT, Direction.UP, Direction.LEFT ]}
            />
          </div>
        </div>
      </section>

      {/* Different Size */}
      <section className="levels">
        <h2 className="levels__title">Different Size</h2>
        <div className='levels__container labyrint-container'>
          {
            Array.from({ length: 20 - 5 + 1 }).map((_, idx) => {
              const boardSize = idx + 5
              let board = generateEmptyBoard(boardSize)
              for (let i = 0; i < boardSize; i++) {
                board = addCellToBoard(board, boardSize - i, 1 + i, CellType.WALL_TOP)
                board = addCellToBoard(board, boardSize - i, 1 + i + 1, CellType.WALL_MID)
              }
              board = addCellToBoard(board, 1, 1, CellType.DRONE)
              board = addCellToBoard(board, boardSize, boardSize, CellType.PRIS)

              return (
                <div key={idx} className="labyrint-container__item">
                  <h3 className='labyrint-container__title'>Boar Size: {boardSize}</h3>
                  <Board
                    level={{map: board, minMoves: 0, minTime: 0}}
                    drone={{ position: { row: 1, col: 1 }, speed: 0, direction: null }}
                    goal={null}
                    boardSize={400}
                  />
                </div>
              )
            })
          }
        </div>
      </section>

      {/* Classic Labyrint Levels */}
      <section className="levels">
        <h2 className="levels__title">Classic Labyrint Levels</h2>
        <div className='levels__container labyrint-container'>
          {
            Array.from({ length: LEVELS.length }).map((_, idx) => (
              <div key={idx} className="labyrint-container__item">
                <h3 className='labyrint-container__title'>Level {idx + 1}</h3>
                <Board
                  level={LEVELS[idx]}
                  drone={{ position: getDroneStartPosition(idx) || { row: 0, col: 0}, speed: 0, direction: null }}
                  goal={null}
                  boardSize={400}
                />
              </div>
            ))
          }
        </div>
      </section>
    </main>
  )
}

export default App
