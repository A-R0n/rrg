import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

import promiseMiddleware from 'redux-promise';
export default createStore( reducer, applyMiddleware(promiseMiddleware) );