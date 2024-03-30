import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';

// const elem = <h2>Hello</h2>;
// const elem = React.createElement('h2', {className: 'greetings'}, 'Hello');

// const elemen = { // это как должно быть без сокращений
//   type: 'h2';
//   props: {
//     className:'greetings',
//     children:'Hello'
//   }
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // elem
);

