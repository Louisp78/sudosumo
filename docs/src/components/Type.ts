import CellType from "../domain/CellType";

type GridMatrixType = CellType[][];
type GridArrayType = CellType[];
type PossibilitiesType = Array<Array<Array<number>>>;
type CoordinateType = {x : number, y : number};

export { GridMatrixType, GridArrayType, PossibilitiesType, CoordinateType};