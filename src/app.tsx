import Board from './components/board/board'
import { LEVELS, CellType } from './const'
import { generateEmptyBoard, addCellToBoard } from './algorithm'
import Solver from './components/solver/solver'
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
  let boardHorizontal = generateEmptyBoard(10)
  boardHorizontal = addCellToBoard(boardHorizontal, 1, 1, CellType.DRONE)
  boardHorizontal = addCellToBoard(boardHorizontal, 1, 10, CellType.PRIS)

  let boardVertical = generateEmptyBoard(10)
  boardVertical = addCellToBoard(boardVertical, 1, 1, CellType.DRONE)
  boardVertical = addCellToBoard(boardVertical, 10, 1, CellType.PRIS)

  let boardDiagonal = generateEmptyBoard(10)
  boardDiagonal = addCellToBoard(boardDiagonal, 1, 1, CellType.DRONE)
  boardDiagonal = addCellToBoard(boardDiagonal, 10, 10, CellType.PRIS)

  return (
    <main>
      <h1 className="title">Labyrint Generator</h1>

      {/* Find a Way */}
      <section className="levels">
        <h2 className="levels__title">Find a Way</h2>
        <div className='levels__container labyrint-container'>
          <div className="labyrint-container__item">
            <h3 className='labyrint-container__title'>Horizontal</h3>
            <Solver
              initialLevel={{map: boardHorizontal, minMoves: 0, minTime: 0}}
            />
          </div>
          <div className="labyrint-container__item">
            <h3 className='labyrint-container__title'>Vertical</h3>
            <Board
              level={{map: boardVertical, minMoves: 0, minTime: 0}}
              drone={{ position: { row: 1, col: 1 }, speed: 0, direction: null }}
              goal={{ getTargetState: () => false }}
              boardSize={400}
            />
          </div>
          <div className="labyrint-container__item">
            <h3 className='labyrint-container__title'>Diagonal</h3>
            <Board
              level={{map: boardDiagonal, minMoves: 0, minTime: 0}}
              drone={{ position: { row: 1, col: 1 }, speed: 0, direction: null }}
              goal={{ getTargetState: () => false }}
              boardSize={400}
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
                    goal={{ getTargetState: () => false }}
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
                  goal={{ getTargetState: () => false }}
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
