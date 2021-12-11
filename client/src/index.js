import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from './store/Modal';
import Store from './store/store';

const store = new Store()
const modal = new Modal()
export const Context = createContext({
	store, 
	modal
})
ReactDOM.render(
  <Context.Provider value={{store, modal}}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

