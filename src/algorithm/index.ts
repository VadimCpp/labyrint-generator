
import * as Const from "../const"

export function generateEmptyBoard(board_size: number): string[] {
  const default_size = 10;
  const size = (board_size >= Const.MIN_CELLS_NUMBER && board_size <= Const.MAX_CELLS_NUMBER) ? board_size : default_size;
  const asideRow = Const.CellType.WALL_ASIDE.repeat(size + 2);
  const row = Const.CellType.WALL_ASIDE + Const.CellType.EMPTY.repeat(size) + Const.CellType.WALL_ASIDE;

  const board = [
    asideRow,
    ...Array.from({ length: size }, () => row),
    asideRow,
  ];

  return board;
}

export function addCellToBoard(board: string[], row: number, col: number, cell: string): string[] {
  const newBoard = [...board];
  const newRow = newBoard[row].split("");
  newRow[col] = cell;
  newBoard[row] = newRow.join("");
  return newBoard;
}

export function generateLabyrint() {
  const emptyBoard = generateEmptyBoard(10);
  return emptyBoard;
}
