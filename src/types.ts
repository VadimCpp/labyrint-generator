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
