import UtilsGrid from "./UtilsGrid";

/// TODO: Find an hint system
/// display possibilities to the user
class Hint {
    constructor(grid) {
        this.grid = grid;
        this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(grid);
    }

    getFirstPossibility(){
        for(let x = 0; x < this.possibilities.length; x++){
            for (let y = 0; y < this.possibilities[x].length; y++){
                if (this.possibilities[x][y].length === 1 && this.grid[x][y] == null){
                    //console.log(this.possibilities[x][y][0], "is the only possibilty at ", x, ", ", y);
                    return {x, y};
                }
                // TODO: detect error when this.possibilities[x][y].length == 0 mean puzzle is wrong
            }
        }
        return null;
    }



    // TODO: fix eliminate
    hint(){
        console.log('Getting an hint')
        this.eliminate();
        const fHint = this.getFirstPossibility();
        if (fHint !== null){
            let {x, y} = fHint;
            console.log('display hint at x:', x, ' and y:', y)
            this.grid[x][y] = this.possibilities[x][y][0];
        } else{
            console.log('no hint');
        }

    }

    /*
    nakedTwinHint(){
        var result = []
        for (var x = 0; x < this.possibilities.length; x++)
        {
            var histo = Utils.getHistogramArrayPossibilities(this.possibilities[x])
            for (const [key, value] of Object.entries(histo)){
                if (histo[key] == 2 && key.length == 2){
                    //console.log('naked twins detected line :', key, " at x :", x);
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
            var cols = this.getColumn(y).map(({x, y}) => this.possibilities[x][y])
            var histo = Utils.getHistogramArrayPossibilities(cols)
            for (const [key, value] of Object.entries(histo)){
                if (histo[key] == 2 && key.length == 2){
                    //console.log('naked twins detected cols :', key, ' at y: ', y);
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
                const histo2 = Utils.getHistogramArrayPossibilities(block)
                for (const [key,value] of Object.entries(histo2)){
                    if (histo2[key] == 2 && key.length == 2){
                    //console.log('naked twins detected block :', key, ' at x: ', x, ' at y: ', y);
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
    }*/
}

export default Hint;