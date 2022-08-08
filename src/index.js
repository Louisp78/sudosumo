import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
root.render(
  <React.StrictMode>
    <App current={su}/>
  </React.StrictMode>
);
