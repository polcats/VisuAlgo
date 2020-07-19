import React from 'react';
import ReactDOM from 'react-dom';
import 'mobx-react-lite/batchingForReactDom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Menu from './containers/Menu';
import Display from './containers/Display';
import createStore from './store/store';

const App = () => {
  const store = createStore();
  return (
    <>
      <Menu store={store} />
      <Display store={store} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
