import { generateEmptyBoard, addCellToBoard } from './index'
import * as Const from "../const"

describe("generateEmptyBoard", () => {
	const emptyBoard_5 = [
		"_______",
		"_     _",
		"_     _",
		"_     _",
		"_     _",
		"_     _",
		"_______",
	]

	const emptyBoard_10 = [
		"____________",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"_          _",
		"____________",
	]

	const emptyBoard_15 = [
		"_________________",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_               _",
		"_________________",
	]

	it("should return a 5x5 empty board", () => {
		const board = generateEmptyBoard(5)
		expect(board).toStrictEqual(emptyBoard_5)
	})

  it("should return a 10x10 empty board", () => {
		const board = generateEmptyBoard(10)
		expect(board).toStrictEqual(emptyBoard_10)
	})

  it("should return a 15x15 empty board", () => {
		const board = generateEmptyBoard(15)
		expect(board).toStrictEqual(emptyBoard_15)
	})

	it("should return a 10x10 empty board if size is is less than 5", () => {
		const board = generateEmptyBoard(4)
		expect(board).toStrictEqual(emptyBoard_10)
	})
	
	it("should return a 10x10 empty board if size is is more than 20", () => {
		const board = generateEmptyBoard(21)
		expect(board).toStrictEqual(emptyBoard_10)
	})
})

describe("addCellToBoard", () => {
  const emptyBoard_5 = [
		"_______",
		"_     _",
		"_     _",
		"_     _",
		"_     _",
		"_     _",
		"_______",
	]

  const updatedBoard_5 = [
		"_______",
		"_p    _",
		"_     _",
		"_     _",
		"_     _",
		"_    t_",
		"_______",
	]

	it("should add drone and pris to the board", () => {
		const board = generateEmptyBoard(5)
		expect(board).toStrictEqual(emptyBoard_5)
    const board2 = addCellToBoard(board, 1, 1, Const.CellType.DRONE)
    const board3 = addCellToBoard(board2, 5, 5, Const.CellType.PRIS)
    expect(board2).not.toStrictEqual(updatedBoard_5)
    expect(board3).toStrictEqual(updatedBoard_5)
	})
})
