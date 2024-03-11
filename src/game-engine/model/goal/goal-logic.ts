import { CellType, Target } from "../../../types";

export const getTargets = (board: string[]) => {
  const targets: Target[] = []

  board.forEach((stringElement, r) => {
    Array.from(stringElement).forEach((cell, c) => {
      if (CellType.PRIS === cell || CellType.PRISER === cell) {
        targets.push({
          row: r,
          col: c,
          item: cell,
          isReached: false
        })
      }
    })
  })

	return targets
}
