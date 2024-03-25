import { Position, Direction } from "../../../types"
import { CellType, DRONE_SPEED } from "../../../const"

export function getDroneStartPosition(board: string[]): Position | null {
  let pos: Position | null = null

  board.some((stringElement, r) => {
    const row = Array.from(stringElement)
    return row.some((cell, c) => {
      if (CellType.DRONE === cell) {
        pos = {
          row: r,
          col: c
        }
      }
      return Boolean(pos)
    })
  })

  return pos
}

export function isTransparentCell(cell: string) {
  return [CellType.EMPTY, CellType.PRIS, CellType.PRISER, CellType.DRONE].indexOf(cell) !== -1
}

export function isPossibleToMove(board: string[], dronePosition: Position, direction: Direction): boolean{
  let isPossible = false
  const map = board
  
  if (Direction.UP === direction && dronePosition.row > 0) {
    const cell = map[dronePosition.row - 1][dronePosition.col]
    if (isTransparentCell(cell)) {
      isPossible = true
    }
  } else if (Direction.DOWN === direction && dronePosition.row < map.length - 1) {
    const cell = map[dronePosition.row + 1][dronePosition.col]
    if (isTransparentCell(cell)) {
      isPossible = true
    }
  } else if (Direction.LEFT === direction && dronePosition.col > 0) {
    const cell = map[dronePosition.row][dronePosition.col - 1]
    if (isTransparentCell(cell)) {
      isPossible = true
    }
  } else if (Direction.RIGHT === direction && dronePosition.col < map[0].length - 1) {
    const cell = map[dronePosition.row][dronePosition.col + 1]
    if (isTransparentCell(cell)) {
      isPossible = true
    }
  }

  return isPossible
}

export function moveDrone(
  board: string[],
  dronePosition: Position,
  direction: Direction,
  onMoveCallback: (pos: Position) => void
): Position | null {
  let newDronePosition = null
  
  if (isPossibleToMove(board, dronePosition, direction)) {
    newDronePosition = { ...dronePosition }
    let isMoving = true
    while(isMoving) {
      switch(direction) {
        case Direction.UP:
          newDronePosition.row--
          break
        case Direction.DOWN:
          newDronePosition.row++
          break
        case Direction.LEFT:
          newDronePosition.col--
          break
        case Direction.RIGHT:
          newDronePosition.col++
          break
      }
      onMoveCallback(newDronePosition)
      isMoving = isPossibleToMove(board, newDronePosition, direction)
    }
  }

  return newDronePosition
}

export function calculateDroneSpeed(dronePosition: Position, newDronePosition: Position) {
  let speed = 0
  if (dronePosition.col === newDronePosition.col) {
    speed = Math.abs(dronePosition.row - newDronePosition.row) * DRONE_SPEED
  } else {
    speed = Math.abs(dronePosition.col - newDronePosition.col) * DRONE_SPEED
  }
  return speed + "ms"
}
