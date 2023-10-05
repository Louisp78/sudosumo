import { render, screen } from '@testing-library/react';
import App from '../pages/App';
import {shallow} from 'enzyme';
import Solver from '../domain/Solver.ts.old';
import Utils from '../components/Utils';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('sudoku 1 level 1', () => {
  const s1 = [
        [6, 4, 1, null, null, 3, null, 2, 7],
        [null, 2, null, 6, 1, null, null, 3, 9],
        [null, null, null, null, 5, null, null, null, null],
        [7, null, 4, null, 3, null, 1, 9, null],
        [null, null, null, 4, 7, 8, null, null, 6],
        [null, 6, 5, null, 2, null,7, null, null],
        [9, null, null, null, 6, 5, 4, null, null],
        [null, 1, null, null, 8, null, 2, 6, null],
        [2, null, 6, null, 4, null, null, 7, null]
     ];
  const correction = [
    [6, 4, 1, 8, 9, 3, 5, 2, 7],
    [5, 2, 7, 6, 1, 4, 8, 3, 9],
    [8, 3, 9, 7, 5, 2, 6, 4, 1],
    [7, 8, 4, 5, 3, 6, 1, 9, 2],
    [1, 9, 2, 4, 7, 8, 3, 5, 6],
    [3, 6, 5, 1, 2, 9, 7, 8, 4],
    [9, 7, 8, 2, 6, 5, 4, 1, 3],
    [4, 1, 3, 9, 8, 7, 2, 6, 5],
    [2, 5, 6, 3, 4, 1, 9, 7, 8]
]
  const sudokuSolver = new Solver(s1)
  sudokuSolver.solve();


  expect(sudokuSolver.grid).toStrictEqual(correction);
});

test('sudoku solved level 1', () => {
  var dict = {}
  dict[[1, 2]] = 1;
  dict[[1, 3]] = 3;


  console.log("dict test", dict[[1, 3]]);
  const su = [
    [null, 7, null, null, null, 3, null, null, null],
    [null, null, 5, 4, 6, null, null, null, 1],
    [null, null, null, 7, null, null, null, null, null],
    [null, null, 2, null, 8, null, 6, null, 4],
    [null, null, 7, null, null, null, 9, null, null],
    [9, null, 3, null, 2, null, 1, null, null],
    [null, null, null, null, null, 8, null, null,null],
    [1, null, null, null, 4, 6, 5, null, null],
    [null, null, null, 5, null, null, null, 3, null]
  ];
  const sudokuSolver = new Solver(su);
  sudokuSolver.solve()
  expect(sudokuSolver.isSolved())
})
