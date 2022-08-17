import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);
