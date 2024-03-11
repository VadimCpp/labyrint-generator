import { Direction } from '../../types'
import { solveLabyrint } from './solver-logic'

describe("solveLabyrint", () => {
  it("should return null for wrong board", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_     _",
      "_     _",
      "_     _",
      "_______",
    ]
    expect(solveLabyrint(board)).toStrictEqual([])
  })

  it("should return null for non existent solution", () => {
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    expect(solveLabyrint(board)).toStrictEqual([])
  })

  it("should return 1 step solution - just move up", () => {
    const board = [
      "_______",
      "_  t  _",
      "_     _",
      "_ =p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.UP ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 1 step solution - just move down", () => {
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p= _",
      "_     _",
      "_  t  _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.DOWN ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 1 step solution - just move right", () => {
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p t_",
      "_  =  _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.RIGHT ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 1 step solution - just move left", () => {
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_t p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.LEFT ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 2 step solution - move up and right", () => {
    const board = [
      "_______",
      "_ =  t_",
      "_     _",
      "_ =p= _",
      "_  =  _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.UP, Direction.RIGHT ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 2 step solution - move down and right", () => {
    const board = [
      "_______",
      "_     _",
      "_  =  _",
      "_ =p= _",
      "_     _",
      "_ =  t_",
      "_______",
    ]
    const solution: Direction[] = [ Direction.DOWN, Direction.RIGHT]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 2 step solution - move right and up", () => {
    const board = [
      "_______",
      "_    t_",
      "_  =  _",
      "_ =p  _",
      "_  = =_",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.RIGHT, Direction.UP ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return 2 step solution - move left and up", () => {
    const board = [
      "_______",
      "_t    _",
      "_  =  _",
      "_  p= _",
      "_= =  _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.LEFT, Direction.UP ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  // Alternative solutions
  // Check if result matches either of the solutions
  const isValidSolution = (expected: Direction[], actual: Direction[] | null) => {
    if (actual?.length !== expected.length) return false;
    for (let i = 0; i < expected.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }
    return true;
  };

  it("should return 2 step alternative solution - right and down", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p  _",
      "_     _",
      "_    t_",
      "_______",
    ]
    const result: Direction[] | null = solveLabyrint(board)
    const solution1: Direction[] = [ Direction.RIGHT, Direction.DOWN ]
    const solution2: Direction[] = [ Direction.DOWN, Direction.RIGHT ]
    expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
  })

  it("should return 2 step alternative solution - right and up", () => {
    const board = [
      "_______",
      "_    t_",
      "_     _",
      "_  p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    const result: Direction[] | null = solveLabyrint(board)
    const solution1: Direction[] = [ Direction.RIGHT, Direction.UP ]
    const solution2: Direction[] = [ Direction.UP, Direction.RIGHT ]
    expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
  })

  it("should return 2 step alternative solution - left and up", () => {
    const board = [
      "_______",
      "_t    _",
      "_     _",
      "_  p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    
    const result: Direction[] | null = solveLabyrint(board)
    const solution1: Direction[] = [ Direction.LEFT, Direction.UP ]
    const solution2: Direction[] = [ Direction.UP, Direction.LEFT ]
    expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
  })

  it("should return 2 step alternative solution - left and down", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p  _",
      "_     _",
      "_t    _",
      "_______",
    ]
    const result: Direction[] | null = solveLabyrint(board)
    const solution1: Direction[] = [ Direction.LEFT, Direction.DOWN ]
    const solution2: Direction[] = [ Direction.DOWN, Direction.LEFT ]
    expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
  })

  it("should return shortest way 1 step solution - just move up", () => {
    const board = [
      "_______",
      "_  t  _",
      "_     _",
      "_  p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.UP ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return shortest way 1 step solution - just move down", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p  _",
      "_     _",
      "_  t  _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.DOWN ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return shortest way 1 step solution - just move right", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_  p t_",
      "_     _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.RIGHT ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })

  it("should return shortest way 1 step solution - just move left", () => {
    const board = [
      "_______",
      "_     _",
      "_     _",
      "_t p  _",
      "_     _",
      "_     _",
      "_______",
    ]
    const solution: Direction[] = [ Direction.LEFT ]
    expect(solveLabyrint(board)).toStrictEqual(solution)
  })
})
