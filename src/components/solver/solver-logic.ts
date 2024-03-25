import { Direction, Position, Target } from '../../types'
import { getDroneStartPosition, moveDrone, isPossibleToMove } from '../../game-engine/model/drone/drone-logic'
import { getTargets } from '../../game-engine/model/goal/goal-logic'

export interface SolutionStep {
  position: Position
  direction: Direction
  reachSomeTarget: boolean
}

const DEPTH_LIMIT = 25
let solutionLength: number  = 0
let solution: Direction[] = []
let step: number = 0

export function isSomeNewTargetReached(targets: Target[], updatedTargets: Target[]): boolean {
  return targets.some(target => (
    updatedTargets.some(updatedTarget => (
      target.row === updatedTarget.row &&
      target.col === updatedTarget.col &&
      target.isReached === false && 
      updatedTarget.isReached === true
    ) ? true : false)
  ) ? true : false)
}

export function getUpdatedTargets(board: string[], dronePosition: Position, direction: Direction, solutionTargets: Target[]): Target[] {
  const updatedTargets = structuredClone(solutionTargets)

  let newDronePosition: Position;
  
  if (isPossibleToMove(board, dronePosition, direction)) {
    newDronePosition = { ...dronePosition };
    let isMoving = true;
    while(isMoving) {
      switch(direction) {
        case Direction.UP:
          newDronePosition.row--;
          break;
        case Direction.DOWN:
          newDronePosition.row++;
          break;
        case Direction.LEFT:
          newDronePosition.col--;
          break;
        case Direction.RIGHT:
          newDronePosition.col++;
          break;
      }
      updatedTargets.forEach(target => {
        if (target.row === newDronePosition.row && target.col === newDronePosition.col) {
          target.isReached = true
        }
      })
      
      isMoving = isPossibleToMove(board, newDronePosition, direction);
    }
  }

  return updatedTargets
}

// If we have already been here since the last pick up, we should not go here again
export function isDroneRepeatingThePath(path: SolutionStep[], position: Position): boolean {
  let result = false
  
  for (let i = path.length - 1; i >= 0; i--) {
    const solutionStep = path[i]

    if (solutionStep.reachSomeTarget === true) {
      // We reach last pick up - we can go anywhere
      break
    } else if (solutionStep.position.row === position.row && solutionStep.position.col === position.col) {
      // We have already been here - we should not go here again
      result = true
      break
    }
  }      

  return result
}

function findPath(board: string[], path: SolutionStep[], position: Position | null, solutionTargets: Target[], depth: number = 0): void {
  step++
  if (!position) {
    // If we are out of the board, we should 
    return
  }

  if (depth >= DEPTH_LIMIT) {
    //console.log('depth limit reached', path)
    return
  }

  // If we have already been here since the last pick up, we should not go here again
  if (isDroneRepeatingThePath(path, position)) {
    return
  }
  
  if (solutionTargets.every(t => t.isReached === true)) {
    if (solutionLength === 0 || path.length < solutionLength) {
      solutionLength = path.length
      solution = path.map(step => step.direction)
    }

    return
  }

  // Try to move in all directions
  
  let updatedTargets: Target[]
  let reachSomeTarget: boolean
  let direction: Direction

  // Move up
  direction = Direction.UP
  updatedTargets = getUpdatedTargets(board, position, direction, solutionTargets)
  reachSomeTarget = isSomeNewTargetReached(solutionTargets, updatedTargets)
  findPath(
    board,
    [...path, { position, direction, reachSomeTarget }],
    moveDrone(board, position, direction, () => {}),
    updatedTargets,
    depth + 1
  )

  // Move left
  direction = Direction.LEFT
  updatedTargets = getUpdatedTargets(board, position, direction, solutionTargets)
  reachSomeTarget = isSomeNewTargetReached(solutionTargets, updatedTargets)
  findPath(
    board,
    [...path, { position, direction, reachSomeTarget }],
    moveDrone(board, position, direction, () => {}),
    updatedTargets,
    depth + 1
  )

  // Move down
  direction = Direction.DOWN
  updatedTargets = getUpdatedTargets(board, position, direction, solutionTargets)
  reachSomeTarget = isSomeNewTargetReached(solutionTargets, updatedTargets)
  findPath(
    board,
    [...path, { position, direction, reachSomeTarget }],
    moveDrone(board, position, direction, () => {}),
    updatedTargets,
    depth + 1
  )

  // Move right
  direction = Direction.RIGHT
  updatedTargets = getUpdatedTargets(board, position, direction, solutionTargets)
  reachSomeTarget = isSomeNewTargetReached(solutionTargets, updatedTargets)
  findPath(
    board,
    [...path, { position, direction, reachSomeTarget }],
    moveDrone(board, position, direction, () => {}),
    updatedTargets,
    depth + 1
  )
}

export function solveLabyrint(board: string[]): Direction[] {
  const startPosition: Position | null = getDroneStartPosition(board)

  if (startPosition) {
    solutionLength = 0
    solution = []
    step = 0
    findPath(board, [], startPosition, getTargets(board))
  }

  console.log('board', board, 'steps', step)
  return solution
}
