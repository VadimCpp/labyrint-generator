import Board from './components/board/board'
import { LEVELS, CellType } from './const'
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
  return (
    <main>
      <h1 className="title">Labyrint Generator</h1>
      <section className="levels">
        <h2 className="levels__title">Classic Labyrint Levels</h2>
        <div className='levels__container labyrint-container'>
          {
            Array.from({ length: LEVELS.length }).map((_, idx) => (
              <div key={idx} className="labyrint-container__item">
                <h3 className='labyrint-container__title'>Level {idx + 1}</h3>
                <Board
                  level={idx}
                  drone={{ position: getDroneStartPosition(idx) || { row: 0, col: 0}, speed: 0, direction: 0 }}
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
