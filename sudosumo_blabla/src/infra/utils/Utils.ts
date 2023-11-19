class Utils {
    static convertArrayToMatrix<TypeVal>(array : Array<TypeVal>, eltPerSubArr : number) : Array<Array<TypeVal>>{
        let matrix : Array<Array<TypeVal>> = [], i, k;

        for (i = 0, k = -1; i < array.length; i++) {
            if (i % eltPerSubArr === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(array[i]);
        }

        return matrix;
    }

    static convertMatrixToArray<TypeVal>(matrix : Array<Array<TypeVal>>) : Array<TypeVal>{
        let arr = [];
        for (let x = 0; x < matrix.length; x++){
            for (let y = 0; y < matrix[x].length; y++){
                arr.push(matrix[x][y]);
            }
        }
        return arr;
    }

    /// Return combination with 2 digits
    static getArrayCombination2(array: Array<number>) : Array<Array<number>>{
        let combination = [];
        for (let i = 0; i < array.length; i++){
            for (let j = i + 1; j < array.length; j++){
                combination.push([array[i], array[j]]);
            }
        }
        return combination;
    }

    /// Return combination with 2 digits and 3 digits
    static  getArrayCombination23(array : Array<number>) : Array<Array<number>>{
        let combination = this.getArrayCombination2(array);
        for (let i = 0; i < array.length; i++){
            for (let j = i + 1; j < array.length; j++){
                for (let k = j + 1; k < array.length; k++) {
                    combination.push([array[i], array[j], array[k]]);
                }
            }
        }
        return combination;
    }


    /// Special histogram used for pairing
    static getHistogramOfPairing(matrix : Array<Array<number>>) : { [id: string] : number }{
        const histogram : { [id: string] : number } = {}
        for (const array of matrix){
            let stringRep = Utils.stringRepOfArray(array);
            if (array.length === 4){
                histogram[stringRep] = histogram[stringRep] ? histogram[stringRep] + 1 : 1;
            }
        }
        for (const array of matrix){
            let stringRep = Utils.stringRepOfArray(array);
            if (array.length === 3)
            {
                histogram[stringRep] = histogram[stringRep] ? histogram[stringRep] + 1 : 1;
                for (const [key, value] of Object.entries(histogram)){
                    if (key.length === 4 && this.getArrayCombination23(Utils.arrayRepOfString(key)).filter(elt => this.areSameArray(elt, array)).length > 0)
                    {
                        histogram[key] += 1;
                    }
                }
            }
        }
        for (const array of matrix){
            let stringRep = Utils.stringRepOfArray(array);
            if (array.length === 2)
            {
                histogram[stringRep] = histogram[stringRep] ? histogram[stringRep] + 1 : 1;
                for (const [key, value] of Object.entries(histogram)){
                    if (key.length === 4 && this.getArrayCombination23(Utils.arrayRepOfString(key)).filter(elt => Utils.areSameArray(elt, array)).length > 0)
                    {
                        histogram[key] += 1;
                    }
                    if (key.length === 3 && this.getArrayCombination2(Utils.arrayRepOfString(key)).filter(elt => Utils.areSameArray(elt, array)).length > 0)
                    {
                        histogram[key] += 1;
                    }
                }
            }
            if (array.length === 1){
                histogram[stringRep] = histogram[stringRep] ? histogram[stringRep] + 1 : 1;
            }
        }
        return histogram;
    }

    /// Histogram of possibilities
    static getHistogramPossibilities(matrix : Array<Array<number>>) : { [id: string] : number }{
        const histogram : { [id: string] : number} = {}
        for (const array of matrix){
            for (const num of array){
                histogram[num] = histogram[num] ? histogram[num] + 1 : 1;
            }
        }
        return histogram;
    }

    static areSameMatrix<TypeVal>(array1 : Array<Array<TypeVal>>,array2 : Array<Array<TypeVal>>) : boolean{
        if (array1.length !== array2.length)
            return false;
        for (let x = 0; x < array1.length; x++){
            if (!array1[x].every((elt, index) => elt === array2[x][index]))
                return false;
        }
        return true;
    }

    static areSameMatrix3D<TypeVal>(array1: Array<Array<Array<TypeVal>>>, array2: Array<Array<Array<TypeVal>>>) : boolean{
        if (array1.length !== array2.length)
            return false;
        for (let x = 0; x < array1.length; x++){
            if (!array1[x].every((elt, index) => elt.join('') === array2[x][index].join('')))
                return false;
        }
        return true;
    }

    static stringRepOfArray(array : Array<number>) : string{
        if (Array.isArray(array) === false)
            throw new TypeError('Must be an array to convert to string')
        return array.join('');
    }

    static arrayRepOfString(str : string) : Array<number>{
        return Array.from(str).map(elt => parseInt(elt));
    }

    static areSameArray<TypeVal>(array1 : Array<TypeVal>, array2 : Array<TypeVal>){
        return array1.length === array2.length && array1.every((elt, index) => elt === array2[index]);
    }

    /// min and max are inclusive
    static getRandomInt(min : number, max : number) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static deepCopyMatrix<TypeVal>(matrix : Array<Array<TypeVal>>) : Array<Array<TypeVal>>{
        var newMatrix = [];
        for (var i = 0; i < matrix.length; i++)
            newMatrix[i] = matrix[i].slice();
        return newMatrix;
    }

    static hasDuplicates<TypeVal>(array : Array<TypeVal>) : boolean{
        return new Set(array).size !== array.length;
    }


    static getCombinations<TypeVal>(array : Array<TypeVal>) : Array<Array<TypeVal>> | undefined{
        var fn = function (active : Array<TypeVal>, rest : Array<TypeVal>, a : Array<Array<TypeVal>>) {
            if (active.length === 0 && rest.length === 0)
                return;
            if (rest.length === 0) {
                a.push(active);
            } else {
                fn(active.concat([rest[0]]), rest.slice(1), a);
                fn(active, rest.slice(1), a);
            }
            return a;
        }
        return fn([], array, [[]]);
    }

    /// Fisher-Yates shuffle
    static shuffleArray<TypeVal>(array : Array<TypeVal>) : Array<TypeVal>{
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}

export default Utils