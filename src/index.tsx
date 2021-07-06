import React from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import './design/index.less';

import { HashRouter } from 'react-router-dom';
import RenderRouter from '../src/router';
const App: React.FC = () => {
  return (
    <HashRouter>
      <RenderRouter />
    </HashRouter>
  );
};

import registerServiceWorker from './sw';
import catchUnhandledRejection from './errorHandler';

console.log(process.env.REACT_GLOB_API_URL);
registerServiceWorker();
catchUnhandledRejection();

ReactDOM.render(<App />, document.getElementById('root'));
