import { Target, CellType } from "../../../types"
import { getTargets } from "./goal-logic";

describe('getTargets', () => {
  it('should return the correct target', () => {
    const board = [
      "_______",
      "_p    _",
      "_     _",
      "_     _",
      "_     _",
      "_    t_",
      "_______",
    ]
    const targets: Target[] = [
      { row: 5, col: 5, isReached: false, item: CellType.PRIS },
    ]
    expect(getTargets(board)).toStrictEqual(targets)
  })

  it('should return the correct target', () => {
    const board = [
      "_______",
      "_p f  _",
      "_     _",
      "_f f f_",
      "_     _",
      "_  f  _",
      "_______",
    ]
    const targets: Target[] = [
      { row: 1, col: 3, isReached: false, item: CellType.PRISER },
      { row: 3, col: 1, isReached: false, item: CellType.PRISER },
      { row: 3, col: 3, isReached: false, item: CellType.PRISER },
      { row: 3, col: 5, isReached: false, item: CellType.PRISER },
      { row: 5, col: 3, isReached: false, item: CellType.PRISER },
    ]
    expect(getTargets(board)).toStrictEqual(targets)
  })
})