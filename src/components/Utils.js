class Utils {
    static convertArrayToMatrix(array, eltPerSubArr){
            var matrix = [], i, k;

        for (i = 0, k = -1; i < array.length; i++) {
            if (i % eltPerSubArr === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(array[i]);
        }

        return matrix;
    }

    static convertMatrixToArray(matrix){
        var arr = [];
        for (var x = 0; x < matrix.length; x++){
            for (var y = 0; y < matrix[x].length; y++){
                arr.push(matrix[x][y]);
            }
        }
        return arr;
    }

    static getHisto(array){
        const histo = {}
        for (const num of array){
            var stringRep = Utils.stringRepOfArray(num);
            histo[stringRep] = histo[stringRep] ? histo[stringRep] + 1 : 1;
        }
        return histo;
    }

    static areSameMatrix(array1,array2){
        if (array1.length != array2.length)
            return false;
        for (var x = 0; x < array1.length; x++){
            if (array1[x].every((elt, index) => elt === array2[x][index]) == false)
                return false;
        }
        return true;
    }

    static areSameMatrix3D(array1, array2){
        if (array1.length != array2.length)
            return false;
        for (var x = 0; x < array1.length; x++){
            if (array1[x].every((elt, index) => elt.join('') === array2[x][index].join('')) == false)
                return false;
        }
        return true;
    }

    static stringRepOfArray(array){
        if (Array.isArray(array) == false)
            throw new TypeError('Must be an array to convert to string')
        return array.join('');
    }

    static arrayRepOfString(str){
        if (typeof str !== 'string')
            throw new TypeError('Must be a string to convert to an array')
        return Array.from(str).map(elt => parseInt(elt));
    }

    static areSameArray(array1, array2){
        console.log('compare array :', array1, ' and ', array2);
        return Array.isArray(array1) && Array.isArray(array2)
        && array1.length === array2.length && array1.every((elt, index) => elt == array2[index]);
    }

    /// min and max are inclusive
    static getRandomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static deepCopyMatrix(matrix){
        var newMatrix = [];
        for (var i = 0; i < matrix.length; i++)
            newMatrix[i] = matrix[i].slice();
        return newMatrix;
    }




}

export default Utils