import Utils from './Utils.js'

class SudokuSolver{
constructor(grid){
    this.grid = grid;
    this.possibilities = JSON.parse(JSON.stringify(this.grid))
    for (var x = 0; x < this.possibilities.length; x++){
        for (var y = 0; y < this.possibilities.length; y++){
            if (this.grid[x][y] == null)
                this.possibilities[x][y] = Array.from(Array(9).fill(1), (elt,index) => elt + index)
            else
                this.possibilities[x][y] = [this.grid[x][y]]
        }
    }
    //console.log("possibilities :" + this.possibilities)
    //console.log("grid" + this.grid)
}

getSquareFromIndex(x, y){
    const valueX = x % 3
    const valueY = y % 3
    const startX = x - valueX
    const startY = y - valueY
    return {startX, startY}
}

getCols(y){
    var result = []
    for (var x = 0; x < this.possibilities.length; x++){
        result.push({x, y})
    }
    return result;
}
getLine(x){
    var result = []
    for (var y = 0; y< this.possibilities.length; y++){
        result.push({x, y})
    }
    return result;
}

getBlock(x, y){
    var result = []
    const {startX, startY} = this.getSquareFromIndex(x, y);
    for (var xBis = startX; xBis <= startX + 2; xBis++)
    {
        for (var yBis = startY; yBis <= startY + 2; yBis++){
            result.push({x: xBis,y: yBis})
        }
    }
    return result;
}

removePossibilityFromIndex(number, x, y){
    /// line
    for (var yBis = 0; yBis < this.possibilities[x].length; yBis++){
        if (yBis != y)
            this.possibilities[x][yBis] = this.possibilities[x][yBis].filter(elt => elt != number);
    }
    /// column
    for (var xBis = 0; xBis < this.possibilities.length; xBis++){
        if (xBis != x)
            this.possibilities[xBis][y] = this.possibilities[xBis][y].filter((elt) => elt != number);
    }
    /// square
    let {startX, startY} = this.getSquareFromIndex(x, y)
    //console.log("startX : ", startX, " startY :", startY);
    for (var xBis = startX; xBis <= startX + 2; xBis++){
        for (var yBis = startY; yBis <= startY + 2; yBis++){
            if (xBis != x || yBis != y)
                this.possibilities[xBis][yBis] = (this.possibilities[xBis][yBis]).filter((elt) => elt != number)
        }
    }

}

/// Need to be careful not to remove other naked twins
/// Need to remove all related square from position of naked twins
removePossibilitiesFromIndex(strOfPossibilities, x, y){
    const arrayOfPossibilities = Utils.arrayRepOfString(strOfPossibilities);
    console.log('removing all possibilities because of naked twins')
    /// line
    for (var yBis = 0; yBis < this.possibilities[x].length; yBis++){
        if (yBis != y && Utils.stringRepOfArray(this.possibilities[x][yBis]) != strOfPossibilities)
            this.possibilities[x][yBis] = this.possibilities[x][yBis].filter(elt => arrayOfPossibilities.includes(elt) == false);
    }      
/*
    /// column
    for (var xBis = 0; xBis < this.possibilities.length; xBis++){
        if (xBis != x && Utils.areSameArray(this.possibilities[xBis][y] ,arrayOfPossibilities) == false)
            this.possibilities[xBis][y] = this.possibilities[xBis][y].filter((elt) => arrayOfPossibilities.includes(elt) == false);
    }

    /// square
    let {startX, startY} = this.getSquareFromIndex(x, y)
    console.log("startX : ", startX, " startY :", startY);
    for (var xBis = startX; xBis <= startX + 2; xBis++){
        for (var yBis = startY; yBis <= startY + 2; yBis++){
            if ((xBis != x || yBis != y) && Utils.areSameArray(this.possibilities[xBis][yBis], arrayOfPossibilities) == false)
                this.possibilities[xBis][yBis] = (this.possibilities[xBis][yBis]).filter((elt) => arrayOfPossibilities.includes(elt) == false)
        }
    }*/
}

eliminate(){
    for (var selectedNumber = 1; selectedNumber <= 9; selectedNumber++){
        for (var x = 0; x < this.grid.length; x++){
            for (var y = 0; y < this.grid[x].length; y++){
                if (this.grid[x][y] == selectedNumber){
                    this.removePossibilityFromIndex(selectedNumber, x, y)
                }
            }
        }
    }
}

keepOnePossibility(){
    for(var x = 0; x < this.possibilities.length; x++){
        for (var y = 0; y < this.possibilities[x].length; y++){
            if (this.possibilities[x][y].length == 1){
                //console.log(this.possibilities[x][y][0], "is the only possibilty at ", x, ", ", y);
                this.grid[x][y] = this.possibilities[x][y][0]
            }
            // TODO: detect error when this.possibilities[x][y].length == 0 mean puzzle is wrong
        }
    }
}

getFirstPossibility(){
    for(var x = 0; x < this.possibilities.length; x++){
        for (var y = 0; y < this.possibilities[x].length; y++){
            if (this.possibilities[x][y].length == 1 && this.grid[x][y] == null){
                //console.log(this.possibilities[x][y][0], "is the only possibilty at ", x, ", ", y);
                return {x, y};
            }
            // TODO: detect error when this.possibilities[x][y].length == 0 mean puzzle is wrong
        }
    }
    return null;
}

nakedTwinHint(){
    var result = []
    for (var x = 0; x < this.possibilities.length; x++)
    {
        var histo = Utils.getHisto(this.possibilities[x])
        for (const [key, value] of Object.entries(histo)){
            if (histo[key] == 2 && key.length == 2){
                console.log('naked twins detected line :', key, " at x :", x);
                for (var y = 0; y < this.possibilities[x].length; y++){
                    if (key == Utils.stringRepOfArray(this.possibilities[x][y]))
                        result.push({x, y})
                }
                return result;
            }
        }
    }
    
    /// by columns
    for (var y = 0; y < this.possibilities.length; y++){
        var cols = this.getCols(y).map(({x, y}) => this.possibilities[x][y])
        var histo = Utils.getHisto(cols)
        for (const [key, value] of Object.entries(histo)){
            if (histo[key] == 2 && key.length == 2){
                console.log('naked twins detected cols :', key, ' at y: ', y);
                for (var x = 0; x < this.possibilities.length; x++){
                    if (key == Utils.stringRepOfArray(this.possibilities[x][y]))
                        result.push({x, y})
                }
                return result;
            }
        }
    }

    /// by blocks
    for (var x = 0; x < this.possibilities.length; x += 3){
        for (var y = 0; y < this.possibilities.length; y += 3){
            const block = this.getBlock(x, y).map(({x, y}) => this.possibilities[x][y]);
            const histo2 = Utils.getHisto(block)
            for (const [key,value] of Object.entries(histo2)){ 
                if (histo2[key] == 2 && key.length == 2){
                console.log('naked twins detected block :', key, ' at x: ', x, ' at y: ', y);
                    for (var {x, y} of this.getBlock(x, y)){
                        if (key == Utils.stringRepOfArray(this.possibilities[x][y]))
                            result.push({x, y})
                    }
                    return result;
                }
            }
        }
    }
    return null;
}

nakedTwin(){
    console.log('naked twins')
    /// by line
    for (var x = 0; x < this.possibilities.length; x++)
    {
        var histo = Utils.getHisto(this.possibilities[x])
        for (const [key, value] of Object.entries(histo)){
            if (histo[key] == 2 && key.length == 2){
                console.log('naked twins detected line :', key, " at x :", x);
                for (var y = 0; y < this.possibilities[x].length; y++){
                    //console.log('at x:', x, ' and y:', y, ' it is the naked twin by line : ', key)
                    if (key != Utils.stringRepOfArray(this.possibilities[x][y]))
                        this.possibilities[x][y] = this.possibilities[x][y].filter(elt => Utils.arrayRepOfString(key).includes(elt) == false);
                }
            }
        }
    }
    
    /// by columns
    for (var y = 0; y < this.possibilities.length; y++){
        var cols = this.getCols(y).map(({x, y}) => this.possibilities[x][y])
        var histo = Utils.getHisto(cols)
        for (const [key, value] of Object.entries(histo)){
            if (histo[key] == 2 && key.length == 2){
                console.log('naked twins detected cols :', key, ' at y: ', y);
                for (var x = 0; x < this.possibilities.length; x++){
                    if (key != Utils.stringRepOfArray(this.possibilities[x][y])){
                        this.possibilities[x][y] = this.possibilities[x][y].filter(elt => Utils.arrayRepOfString(key).includes(elt) == false);
                    }
                }
            }
        }
    }

    /// by blocks
    for (var x = 0; x < this.possibilities.length; x += 3){
        for (var y = 0; y < this.possibilities.length; y += 3){
            const block = this.getBlock(x, y).map(({x, y}) => this.possibilities[x][y]);
            const histo2 = Utils.getHisto(block)
            for (const [key,value] of Object.entries(histo2)){ 
                if (histo2[key] == 2 && key.length == 2){
                console.log('naked twins detected block :', key, ' at x: ', x, ' at y: ', y);
                    for (var {x, y} of this.getBlock(x, y)){
                        if (key != Utils.stringRepOfArray(this.possibilities[x][y])){
                            this.possibilities[x][y] = this.possibilities[x][y].filter(elt => Utils.arrayRepOfString(key).includes(elt) == false);
                        }
                    }
                }
            }
        }
    }
    //console.log("startX : ", startX, " startY :", startY);

}


lastPossibility(){
    for(var x = 0; x < this.possibilities.length; x += 3){
        for (var y = 0; y < this.possibilities[x].length; y += 3){
            
        }
    }
}

isSolved(){
    const gridArr = Utils.convertMatrixToArray(this.grid);
    if (gridArr.includes(null) != false){
        return false;
    }
    for (var x = 0; x < this.grid.length; x++){
        if (this.grid[x].length != new Set(this.grid[x]).size)
            return false;
        
    }
    for (var y = 0; y < 9; y++){
        let tmpCol = []
        for (var x = 0; x < this.grid.length; x++){
            tmpCol.push(this.grid[x][y])
        }
        if (tmpCol.length != new Set(tmpCol).size)
            return false;
    }
    return true;
}

hint(){
    console.log('Getting an hint')
    this.eliminate();
    const fHint = this.getFirstPossibility();
    if (fHint != null){
        var {x, y} = fHint;
        console.log('display hint at x:', x, ' and y:', y)
        this.grid[x][y] = this.possibilities[x][y][0];
    } else{
        console.log('no hint');
    }
    
}

solve(){
    let prevGrid = [[null]];
    var numberOfPass = 0;
    while (this.isSolved() == false)
    {
        while(this.isSolved() == false && Utils.areSameMatrix(prevGrid, this.grid) == false){
            prevGrid = JSON.parse(JSON.stringify(this.grid));
            this.eliminate();
            this.keepOnePossibility();
            numberOfPass++;
        }
        if (this.isSolved())
        {
            break;
        }
        else{

            if (numberOfPass > 100){
                break;
            }
            this.nakedTwin();
            this.keepOnePossibility();
            if (Utils.areSameMatrix(prevGrid, this.grid))
                break;
        }
    }
    if (this.isSolved() == false){
        console.log("couldn't solve the current puzzle");
    } else {
        console.log("puzzle solved !");
    }
    console.log("With number of pass ", numberOfPass);
    
}

}

export default SudokuSolver