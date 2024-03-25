import { Target, CellType, Direction, Position } from '../../types'
import {
  isSomeNewTargetReached,
  getUpdatedTargets,
  isDroneRepeatingThePath,
  solveLabyrint,
  SolutionStep
} from './solver-logic'

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

  describe("1 step solution", () => {
    it("should move up", () => {
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

    it("should move down", () => {
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

    it("should move right", () => {
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

    it("should left", () => {
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
  })

  describe("2 steps solution", () => {
    it("should move up and right", () => {
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

    it("should move down and right", () => {
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

    it("should move right and up", () => {
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

    it("should move left and up", () => {
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
  })
  
  describe("2 step alternative solution", () => {
    const isValidSolution = (expected: Direction[], actual: Direction[] | null) => {
      if (actual?.length !== expected.length) return false;
      for (let i = 0; i < expected.length; i++) {
        if (actual[i] !== expected[i]) return false;
      }
      return true;
    };

    it("should return right and down", () => {
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

    it("should return right and up", () => {
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

    it("should return left and up", () => {
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

    it("should return left and down", () => {
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
  })

  describe("shortest way 1 step solution", () => {
    it("should move up", () => {
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

    it("should move down", () => {
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

    it("should move right", () => {
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

    it("should move left", () => {
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

  describe("Pris is on the way", () => {
    it("should move up and right", () => {
      const board = [
        "_______",
        "_ = t _",
        "_     _",
        "_ =p= _",
        "_  =  _",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.UP, Direction.RIGHT ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move down and right", () => {
      const board = [
        "_______",
        "_     _",
        "_  =  _",
        "_ =p= _",
        "_     _",
        "_ = t _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.DOWN, Direction.RIGHT]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move right and up", () => {
      const board = [
        "_______",
        "_     _",
        "_  = t_",
        "_ =p  _",
        "_  = =_",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.RIGHT, Direction.UP ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move left and up", () => {
      const board = [
        "_______",
        "_     _",
        "_t =  _",
        "_  p= _",
        "_= =  _",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.LEFT, Direction.UP ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })
  })

  describe("2 priser and 2 moves", () => {
    it("should move up and right", () => {
      const board = [
        "_______",
        "_ = t _",
        "_  t  _",
        "_ =p= _",
        "_  =  _",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.UP, Direction.RIGHT ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move down and right", () => {
      const board = [
        "_______",
        "_     _",
        "_  =  _",
        "_ =p= _",
        "_  f  _",
        "_ = f _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.DOWN, Direction.RIGHT]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move right and up", () => {
      const board = [
        "_______",
        "_     _",
        "_  = f_",
        "_ =pf _",
        "_  = =_",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.RIGHT, Direction.UP ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("should move left and up", () => {
      const board = [
        "_______",
        "_     _",
        "_f =  _",
        "_ fp= _",
        "_= =  _",
        "_     _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.LEFT, Direction.UP ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })
  })

  describe("5 priser", () => {
    it("one solution is possible", () => {
      const board = [
        "_______",
        "_  f  _",
        "_f =  _",
        "_ fp=f_",
        "_= =  _",
        "_  f  _",
        "_______",
      ]
      const solution: Direction[] = [ Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT ]
      expect(solveLabyrint(board)).toStrictEqual(solution)
    })

    it("two solutions are possible", () => {
      const isValidSolution = (expected: Direction[], actual: Direction[] | null) => {
        if (actual?.length !== expected.length) return false;
        for (let i = 0; i < expected.length; i++) {
          if (actual[i] !== expected[i]) return false;
        }
        return true;
      }
      const board = [
        "_______",
        "_f f f_",
        "_ # # _",
        "_ = = _",
        "_ =p= _",
        "_f===f_",
        "_______",
      ]
      const solution1: Direction[] = [
        Direction.UP,
        Direction.LEFT,
        Direction.DOWN,
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN
      ]
      const solution2: Direction[] = [
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN,
        Direction.UP,
        Direction.LEFT,
        Direction.DOWN
      ]
      const result: Direction[] | null = solveLabyrint(board)
      expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
    })
  })

  describe("15 priser", () => {
    it("two solutions are possible", () => {
      const isValidSolution = (expected: Direction[], actual: Direction[] | null) => {
        if (actual?.length !== expected.length) return false;
        for (let i = 0; i < expected.length; i++) {
          if (actual[i] !== expected[i]) return false;
        }
        return true;
      }
      const board = [
        "_______",
        "_f###f_",
        "_f=p=f_",
        "_f=f=f_",
        "_f=f=f_",
        "_fffff_",
        "_______",
      ]
      const solution1: Direction[] = [
        Direction.DOWN,
        Direction.LEFT,
        Direction.UP,
        Direction.DOWN,
        Direction.RIGHT,
        Direction.UP
      ]
      const solution2: Direction[] = [
        Direction.DOWN,
        Direction.RIGHT,
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.UP
      ]
      const result: Direction[] | null = solveLabyrint(board)
      expect(isValidSolution(solution1, result) || isValidSolution(solution2, result)).toBeTruthy();
    }) 
  })  
})

describe("isSomeNewTargetReached", () => {
  describe("should return false", () => {
    it("empty arrays provided", () => {
      expect(isSomeNewTargetReached([], [])).toBeFalsy()
    })

    it("one-element arrays with different targets", () => {
      const targets: Target[] = [{ row: 1, col: 2, item: CellType.PRIS, isReached: false }]
      const updatedTargets: Target[] = [{ row: 4, col: 5, item: CellType.PRIS, isReached: true }]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeFalsy()
    })

    it("same targets, but no targets reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeFalsy()
    })

    it("different targets, but all targets reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 2, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeFalsy()
    })
  })

  describe("should return true", () => {
    it("same targets, one-element arrays", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })

    it("same targets, one target is reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })

    it("same targets, some targets is reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })

    it("same targets, all targets is reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: false },
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })

    it("same targets, last target was reached", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })

    it("mixed targets", () => {
      const targets: Target[] = [
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
        { row: 4, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
      ]
      const updatedTargets: Target[] = [
        { row: 4, col: 2, item: CellType.PRISER, isReached: true },
        { row: 1, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 2, item: CellType.PRISER, isReached: true },
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
      ]
      expect(isSomeNewTargetReached(targets, updatedTargets)).toBeTruthy()
    })
  })
})

describe("getUpdatedTargets", () => {
  describe("updates in easy labyrint", () => {
    const board = [
      "_______",
      "_  f  _",
      "_f =  _",
      "_ fp=f_",
      "_= =  _",
      "_  f  _",
      "_______",
    ]

    it("should success on move left", () => {
      const dronePosition: Position = { row: 3, col: 3 }
      const direction: Direction = Direction.LEFT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move up", () => {
      const dronePosition: Position = { row: 3, col: 1 }
      const direction: Direction = Direction.UP
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move right", () => {
      const dronePosition: Position = { row: 1, col: 1 }
      const direction: Direction = Direction.RIGHT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move down", () => {
      const dronePosition: Position = { row: 1, col: 5 }
      const direction: Direction = Direction.DOWN
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move left again", () => {
      const dronePosition: Position = { row: 5, col: 5 }
      const direction: Direction = Direction.LEFT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })
  })

  describe("no updates in easy labyrint", () => {
    const board = [
      "_______",
      "_  f  _",
      "_f =  _",
      "_ fp=f_",
      "_= =  _",
      "_  f  _",
      "_______",
    ]

    it("should not move right", () => {
      const dronePosition: Position = { row: 3, col: 3 }
      const direction: Direction = Direction.RIGHT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should not move down", () => {
      const dronePosition: Position = { row: 3, col: 1 }
      const direction: Direction = Direction.DOWN
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should not move left", () => {
      const dronePosition: Position = { row: 1, col: 1 }
      const direction: Direction = Direction.LEFT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should not move up", () => {
      const dronePosition: Position = { row: 1, col: 5 }
      const direction: Direction = Direction.UP
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should not move right again", () => {
      const dronePosition: Position = { row: 5, col: 5 }
      const direction: Direction = Direction.RIGHT
      const solutionTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 2, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 3, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })
  })

  describe("multiupdates in easy labyrint", () => {
    const board = [
      "_______",
      "_f###f_",
      "_f=p=f_",
      "_f=f=f_",
      "_f=f=f_",
      "_fffff_",
      "_______",
    ]

    it("should success on move down", () => {
      const dronePosition: Position = { row: 2, col: 3 }
      const direction: Direction = Direction.DOWN
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: false },
        { row: 4, col: 3, item: CellType.PRISER, isReached: false },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: false },
        { row: 5, col: 2, item: CellType.PRISER, isReached: false },
        { row: 5, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 1, item: CellType.PRISER, isReached: false },
        { row: 3, col: 1, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: false },
        { row: 5, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 1, item: CellType.PRISER, isReached: false },
        { row: 3, col: 1, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move left", () => {
      const dronePosition: Position = { row: 5, col: 3 }
      const direction: Direction = Direction.LEFT
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: false },
        { row: 5, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 1, item: CellType.PRISER, isReached: false },
        { row: 3, col: 1, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: false },
        { row: 3, col: 1, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move up in 1 col", () => {
      const dronePosition: Position = { row: 5, col: 1 }
      const direction: Direction = Direction.UP
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: false },
        { row: 3, col: 1, item: CellType.PRISER, isReached: false },
        { row: 2, col: 1, item: CellType.PRISER, isReached: false },
        { row: 1, col: 1, item: CellType.PRISER, isReached: false },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should no updates on move down in 1 col", () => {
      const dronePosition: Position = { row: 1, col: 1 }
      const direction: Direction = Direction.DOWN
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should no updates on move right in 5 row", () => {
      const dronePosition: Position = { row: 5, col: 1 }
      const direction: Direction = Direction.RIGHT
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: false },
        { row: 5, col: 4, item: CellType.PRISER, isReached: false },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 4, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })

    it("should success on move up in 5 col", () => {
      const dronePosition: Position = { row: 5, col: 5 }
      const direction: Direction = Direction.UP
      const solutionTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 4, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: false },
        { row: 3, col: 5, item: CellType.PRISER, isReached: false },
        { row: 2, col: 5, item: CellType.PRISER, isReached: false },
        { row: 1, col: 5, item: CellType.PRISER, isReached: false },
      ]
      const expectedTargets: Target[] = [
        { row: 3, col: 3, item: CellType.PRISER, isReached: true },
        { row: 4, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 5, item: CellType.PRISER, isReached: true },
        { row: 5, col: 4, item: CellType.PRISER, isReached: true },
        { row: 5, col: 3, item: CellType.PRISER, isReached: true },
        { row: 5, col: 2, item: CellType.PRISER, isReached: true },
        { row: 5, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 1, item: CellType.PRISER, isReached: true },
        { row: 3, col: 1, item: CellType.PRISER, isReached: true },
        { row: 2, col: 1, item: CellType.PRISER, isReached: true },
        { row: 1, col: 1, item: CellType.PRISER, isReached: true },
        { row: 4, col: 5, item: CellType.PRISER, isReached: true },
        { row: 3, col: 5, item: CellType.PRISER, isReached: true },
        { row: 2, col: 5, item: CellType.PRISER, isReached: true },
        { row: 1, col: 5, item: CellType.PRISER, isReached: true },
      ]
      const updatedTargets: Target[] = getUpdatedTargets(board, dronePosition, direction, solutionTargets)
      
      expect(JSON.stringify(updatedTargets)).toStrictEqual(JSON.stringify(expectedTargets))
    })
  })
})

describe("isDroneRepeatingThePath", () => {
  describe("should return false", () => {
    // Tests are written based on the path on this board:
    // const board = [
    //   "_______",
    //   "_  f  _",
    //   "_f =  _",
    //   "_ fp=f_",
    //   "_= =  _",
    //   "_  f  _",
    //   "_______",
    // ]

    it("while moving left", () => {
      const path: SolutionStep[] = []
      const dronePosition: Position = { row: 3, col: 1 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("while moving up", () => {
      const path: SolutionStep[] = [
        {
          position: { row: 3, col: 3 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        }
      ]
      const dronePosition: Position = { row: 1, col: 1 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("while moving left", () => {
      const path: SolutionStep[] = [
        {
          position: { row: 3, col: 3 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        },
        {
          position: { row: 3, col: 1 },
          direction: Direction.UP,
          reachSomeTarget: true
        },   
      ]
      const dronePosition: Position = { row: 1, col: 1 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("while moving left", () => {
      const path: SolutionStep[] = [
        {
          position: { row: 3, col: 3 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        },
        {
          position: { row: 3, col: 1 },
          direction: Direction.UP,
          reachSomeTarget: true
        },
        {
          position: { row: 1, col: 1 },
          direction: Direction.RIGHT,
          reachSomeTarget: true
        },  
      ]
      const dronePosition: Position = { row: 1, col: 5 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("while moving down", () => {
      const path: SolutionStep[] = [
        {
          position: { row: 3, col: 3 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        },
        {
          position: { row: 3, col: 1 },
          direction: Direction.UP,
          reachSomeTarget: true
        },
        {
          position: { row: 1, col: 1 },
          direction: Direction.RIGHT,
          reachSomeTarget: true
        },
        {
          position: { row: 1, col: 5 },
          direction: Direction.DOWN,
          reachSomeTarget: true
        },  
      ]
      const dronePosition: Position = { row: 5, col: 5 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("while moving left again", () => {
      const path: SolutionStep[] = [
        {
          position: { row: 3, col: 3 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        },
        {
          position: { row: 3, col: 1 },
          direction: Direction.UP,
          reachSomeTarget: true
        },
        {
          position: { row: 1, col: 1 },
          direction: Direction.RIGHT,
          reachSomeTarget: true
        },
        {
          position: { row: 1, col: 5 },
          direction: Direction.DOWN,
          reachSomeTarget: true
        },
        {
          position: { row: 5, col: 5 },
          direction: Direction.LEFT,
          reachSomeTarget: true
        },  
      ]
      const dronePosition: Position = { row: 5, col: 1 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })
  })

  describe("should return true", () => {
    const path: SolutionStep[] = [
      {
        position: { row: 3, col: 3 },
        direction: Direction.LEFT,
        reachSomeTarget: false
      },
      {
        position: { row: 3, col: 1 },
        direction: Direction.UP,
        reachSomeTarget: false
      },
      {
        position: { row: 1, col: 1 },
        direction: Direction.RIGHT,
        reachSomeTarget: false
      },
      {
        position: { row: 1, col: 5 },
        direction: Direction.DOWN,
        reachSomeTarget: false
      },
      {
        position: { row: 5, col: 5 },
        direction: Direction.LEFT,
        reachSomeTarget: false
      },  
    ]

    it("case 1", () => {
      const dronePosition: Position = { row: 5, col: 5 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeTruthy()
    })

    it("case 2", () => {
      const dronePosition: Position = { row: 1, col: 1 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeTruthy()
    })

    it("case 3", () => {
      const dronePosition: Position = { row: 3, col: 3 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeTruthy()
    })
  })

  describe("edge cases", () => {
    const path: SolutionStep[] = [
      {
        position: { row: 3, col: 3 },
        direction: Direction.LEFT,
        reachSomeTarget: false
      },
      {
        position: { row: 3, col: 1 },
        direction: Direction.UP,
        reachSomeTarget: false
      },
      {
        position: { row: 1, col: 1 },
        direction: Direction.RIGHT,
        reachSomeTarget: true
      },
      {
        position: { row: 1, col: 5 },
        direction: Direction.DOWN,
        reachSomeTarget: false
      },
      {
        position: { row: 5, col: 5 },
        direction: Direction.LEFT,
        reachSomeTarget: false
      },  
    ]

    it("case 1", () => {
      const dronePosition: Position = { row: 5, col: 5 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeTruthy()
    })
  
    it("case 2", () => {
      const dronePosition: Position = { row: 1, col: 5 }
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeTruthy()
    })
  
    it("case 3", () => {
      const dronePosition: Position = { row: 1, col: 1}
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("case 4", () => {
      const dronePosition: Position = { row: 3, col: 1}
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })

    it("case 5", () => {
      const dronePosition: Position = { row: 3, col: 3}
      expect(isDroneRepeatingThePath(path, dronePosition)).toBeFalsy()
    })
  })
})
