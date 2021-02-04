import React from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
const middleware = [thunk]
const createStore = () => reduxCreateStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default ({ children }) => (
  <Provider store={createStore()}>{children}</Provider>
);
