export interface Level {
  map: string[];
  minMoves: number;
  minTime: number;
}

export interface Position {
  row: number;
  col: number;
}


export enum Direction {
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  LEFT = 37,
}

export enum CellType {
	EMPTY = " ",
	WALL_ASIDE = "_",
	WALL_MID = "=",
	WALL_TOP = "#",
	PRIS = "t",
	PRISER = "f",
	DRONE = "p"
}

export interface Target {
  row: number;
  col: number;
  item: CellType;
  isReached: boolean;
}

export interface Goal {
  targets: Target[]
  setTargets: (targets: Target[]) => void
  initTargets: () => void
  isTargetReached: (position: Position) => boolean
  updateTarget: (position: Position) => void
}
