import Utils from './components/Utils.js'
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

test('test histogram', () => {
    expect(Utils.getHisto([[1, 2], [1, 2], [4], [5]])).toStrictEqual({'12': 2, '4': 1, '5': 1});
    expect(Utils.getHisto([[5]])).toStrictEqual({'5': 1});
});

test('random generation', () => {
    for (var i = 0; i < 1000; i++){
        const num = Utils.getRandomInt(1, 9);
        expect(num >= 1 && num <= 9).toBe(true);
    }
})

test('deep copy matrix', () => {
    var mat = [[1], [1, 2]];
    
    var matCopy = Utils.deepCopyMatrix(mat);
    mat[0][0] = 5;
    expect(matCopy[0][0]).toBe(1);
    expect(mat[0][0]).toBe(5);
});