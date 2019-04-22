import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ToastProvider } from 'react-awesome-toasts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={ new Firebase() }>
      <ToastProvider>
        <App />
      </ToastProvider>
    </FirebaseContext.Provider>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
