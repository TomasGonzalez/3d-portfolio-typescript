export interface Coordinate {
  x?: number | undefined;
  y?: number | undefined;
  z?: number | undefined;
}

export interface Position {
  position: Coordinate;
  rotation: Coordinate;
}