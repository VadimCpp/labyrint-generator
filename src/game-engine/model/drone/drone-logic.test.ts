import { CellType } from '../../../const'
import { Direction } from '../../../types'
import { getDroneStartPosition, isTransparentCell, isPossibleToMove, moveDrone, calculateDroneSpeed } from './drone-logic'

describe('getDroneStartPosition', () => {
  it('should return the correct position', () => {
    const board = [
      "_______",
      "_p    _",
      "_     _",
      "_     _",
      "_     _",
      "_    t_",
      "_______",
    ]
    const position = { row: 1, col: 1 }
    expect(getDroneStartPosition(board)).toStrictEqual(position)
  })

  it('should return null', () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_     _",
      "_     _",
      "_    t_",
      "_______",
    ]
    expect(getDroneStartPosition(board)).toStrictEqual(null)
  })
})

describe('isTransparentCell', () => {
  it('should return true', () => {
    expect(isTransparentCell(CellType.EMPTY)).toStrictEqual(true)
    expect(isTransparentCell(CellType.DRONE)).toStrictEqual(true)
    expect(isTransparentCell(CellType.PRIS)).toStrictEqual(true)
    expect(isTransparentCell(CellType.PRISER)).toStrictEqual(true)
  })

  it('should return false', () => {
    expect(isTransparentCell(CellType.WALL_ASIDE)).toStrictEqual(false)
    expect(isTransparentCell(CellType.WALL_MID)).toStrictEqual(false)
    expect(isTransparentCell(CellType.WALL_TOP)).toStrictEqual(false)
  })
})

describe('isPossibleToMove', () => {


  it('should return true', () => {
    const dronePosition = { row: 3, col: 3 }
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    expect(isPossibleToMove(board, dronePosition, Direction.UP)).toStrictEqual(true)
    expect(isPossibleToMove(board, dronePosition, Direction.RIGHT)).toStrictEqual(true)
    expect(isPossibleToMove(board, dronePosition, Direction.DOWN)).toStrictEqual(true)
    expect(isPossibleToMove(board, dronePosition, Direction.LEFT)).toStrictEqual(true)
  })

  it('should return false', () => {
    const dronePosition = { row: 3, col: 3 }
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    expect(isPossibleToMove(board, dronePosition, Direction.UP)).toStrictEqual(false)
    expect(isPossibleToMove(board, dronePosition, Direction.RIGHT)).toStrictEqual(false)
    expect(isPossibleToMove(board, dronePosition, Direction.DOWN)).toStrictEqual(false)
    expect(isPossibleToMove(board, dronePosition, Direction.LEFT)).toStrictEqual(false)
  })
})

describe('moveDrone', () => {
  it('should return the correct position', () => {
    const dronePosition = { row: 3, col: 3 }
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    expect(moveDrone(board, dronePosition, Direction.UP)).toStrictEqual({ row: 1, col: 3 })
    expect(moveDrone(board, dronePosition, Direction.RIGHT)).toStrictEqual({ row: 3, col: 5 })
    expect(moveDrone(board, dronePosition, Direction.DOWN)).toStrictEqual({ row: 5, col: 3 })
    expect(moveDrone(board, dronePosition, Direction.LEFT)).toStrictEqual({ row: 3, col: 1 })
  })

  
  it('should return null', () => {
    const dronePosition = { row: 3, col: 3 }
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    expect(moveDrone(board, dronePosition, Direction.UP)).toStrictEqual(null)
    expect(moveDrone(board, dronePosition, Direction.RIGHT)).toStrictEqual(null)
    expect(moveDrone(board, dronePosition, Direction.DOWN)).toStrictEqual(null)
    expect(moveDrone(board, dronePosition, Direction.LEFT)).toStrictEqual(null)
  })
})

describe('calculateDroneSpeed', () => {
  it('should return the correct speed', () => {
    const dronePosition = { row: 3, col: 3 }
    const newDronePosition = { row: 1, col: 3 }
    expect(calculateDroneSpeed(dronePosition, newDronePosition)).toStrictEqual("100ms")
  })

  it('should return the correct speed', () => {
    const dronePosition = { row: 3, col: 1 }
    const newDronePosition = { row: 3, col: 4 }
    expect(calculateDroneSpeed(dronePosition, newDronePosition)).toStrictEqual("150ms")
  })
})
