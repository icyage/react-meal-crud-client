import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({ reducer: rootReducer, middleware: [createLogger(), sagaMiddleware]});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
