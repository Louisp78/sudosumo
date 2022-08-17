import Utils from './components/Utils.ts'
test('test string representation of array', () => {
    expect(Utils.stringRepOfArray([1, 2])).toBe('12');
    expect(Utils.stringRepOfArray([1])).toBe('1');
    expect(Utils.stringRepOfArray([])).toBe('');
    expect(Utils.stringRepOfArray([1, 2, 5, 6])).toBe('1256');
});

test('array rep of string', () => {
    expect(Utils.arrayRepOfString('12')).toStrictEqual([1, 2]);
    expect(Utils.arrayRepOfString('4')).toStrictEqual([4]);
})

test('array rep of string v2', () => {
    expect(Array.from('12').map(elt => parseInt(elt))).toStrictEqual([1, 2]);
});

test('test histogram of pairing', () => {
    expect(Utils.getHistogramOfPairing([[1, 2, 3], [1, 2], [1, 2], [4], [5]])).toStrictEqual({'123': 3, '12': 2, '4': 1, '5': 1});
    expect(Utils.getHistogramOfPairing([[1, 2, 3], [1, 2], [1, 3], [4], [5]])).toStrictEqual({'123': 3, '12': 1, '13': 1, '4': 1, '5': 1});
    expect(Utils.getHistogramOfPairing([[1, 2, 3], [1, 2], [2, 3], [4], [5]])).toStrictEqual({'123': 3, '12': 1, '23': 1,  '4': 1, '5': 1});
    expect(Utils.getHistogramOfPairing([[1, 2], [1, 2], [4], [5]])).toStrictEqual({'12': 2, '4': 1, '5': 1});
    expect(Utils.getHistogramOfPairing([[5]])).toStrictEqual({'5': 1});
});

test('test histogram', () => {
    const currentColumn = Array.of([1, 2], [1, 2], [4], [5]);
    const histo = Utils.getHistogramPossibilities(currentColumn);
    const index = currentColumn.findIndex(elt => elt.includes(parseInt('4')));
    console.log(index, "currentColumn", currentColumn) ;
    expect(histo).toStrictEqual({1: 2, 2: 2, 4: 1, 5: 1});
});

test('random generation', () => {
    for (var i = 0; i < 1000; i++){
        const num = Utils.getRandomInt(1, 9);
        expect(num >= 1 && num <= 9).toBe(true);
    }
    expect(Utils.getRandomInt(1, 1)).toBe(1);
    expect(Utils.getRandomInt(0, 0)).toBe(0);
})

test('deep copy matrix', () => {
    var mat = [[1], [1, 2]];
    
    var matCopy = Utils.deepCopyMatrix(mat);
    mat[0][0] = 5;
    expect(matCopy[0][0]).toBe(1);
    expect(mat[0][0]).toBe(5);
});

test('array combination' , () => {
    expect(Utils.getArrayCombination2([1])).toStrictEqual([]);
    expect(Utils.getArrayCombination2([1, 2])).toStrictEqual([[1, 2]]);
    expect(Utils.getArrayCombination23([1, 2])).toStrictEqual([[1, 2]]);
    expect(Utils.getArrayCombination2([1, 2, 3])).toStrictEqual([[1, 2], [1, 3], [2, 3]]);
    expect(Utils.getArrayCombination2([2, 8 , 9])).toStrictEqual([[2, 8], [2, 9], [8, 9]]);
    expect(Utils.getArrayCombination23([2, 7 , 8, 9])).toStrictEqual([[2, 7], [2, 8], [2, 9], [7, 8], [7, 9], [8, 9], [2, 7, 8], [2, 7, 9], [2, 8, 9], [7, 8, 9]]);
});