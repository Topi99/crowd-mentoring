import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ToastProvider } from 'react-awesome-toasts';

ReactDOM.render(
  <FirebaseContext.Provider value={ new Firebase() }>
    <ToastProvider>
      <App />
    </ToastProvider>
  </FirebaseContext.Provider>, 
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
