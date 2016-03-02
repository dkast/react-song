import { createStore, applyMiddleware } from 'redux';
import promise from '../lib/promiseMiddleware';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  promise,
  logger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}