import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import authToken from './middlewares/auth_token';
import authChecker from './middlewares/auth_checker';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const reduxMiddleware = () => {
  const defaultMiddlewares = [authToken, thunk, authChecker];
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(...defaultMiddlewares);
  }
  defaultMiddlewares.push(loggerMiddleware);
  return applyMiddleware(...defaultMiddlewares);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  reduxMiddleware(),
));

export default store;
