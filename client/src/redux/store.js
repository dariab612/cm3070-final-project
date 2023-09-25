import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import { adminAuthWatcher } from './sagas/adminAuthSaga';
import { sessionWatcher } from './sagas/sessionSaga'
import { cabinetWatcher } from './sagas/cabinetSaga';
import { rootReducer } from './reducers/rootReducer';
import { adminChangePassWatcher } from './sagas/adminChangePassSaga';
import { mySaga } from '../redux/sagas/sagas';

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mySaga)
sagaMiddleware.run(adminAuthWatcher)
sagaMiddleware.run(sessionWatcher)
sagaMiddleware.run(cabinetWatcher)
sagaMiddleware.run(adminChangePassWatcher);
