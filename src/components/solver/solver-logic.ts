import { Direction, Position, CellType } from '../../types'
import { getDroneStartPosition, moveDrone } from '../../game-engine/model/drone/drone-logic'

export interface SolutionStep {
  position: Position
  direction: Direction
}

let solutionLength: number  = 0
let solution: Direction[] = []

function findPath(board: string[], path: SolutionStep[], position: Position | null): void {
  if (!position) {
    // If we are out of the board, we should 
    return
  }

  if (board[position.row][position.col] === CellType.PRIS) {
    // We found the goal, so now need to save the shortest path
    if (solutionLength === 0 || path.length < solutionLength) {
      solutionLength = path.length
      solution = path.map(step => step.direction)
    }

    return
  }

  if (path.some(step => step.position.row === position.row && step.position.col === position.col)) {
    // If we have already been here, we should not go here again
    return
  }

  // Try to move in all directions

  // Move up
  findPath(board, [...path, { position, direction: Direction.UP }], moveDrone(board, position, Direction.UP))

  // Move left
  findPath(board, [...path, { position, direction: Direction.LEFT }], moveDrone(board, position, Direction.LEFT))

  // Move down
  findPath(board, [...path, { position, direction: Direction.DOWN }], moveDrone(board, position, Direction.DOWN))

  // Move right
  findPath(board, [...path, { position, direction: Direction.RIGHT }], moveDrone(board, position, Direction.RIGHT))
}

export function solveLabyrint(board: string[]): Direction[] {
  const startPosition: Position | null = getDroneStartPosition(board)

  if (startPosition) {
    solutionLength = 0
    solution = []
    findPath(board, [], startPosition)
  }

  return solution
}
