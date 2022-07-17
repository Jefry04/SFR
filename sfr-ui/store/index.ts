import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import thunk, { ThunkDispatch } from 'redux-thunk';
import AuthReducer from './reducers/Auth.reducer';
import FieldReducer from './reducers/Field.reducer';
import ModalsReducer from './reducers/Modals.reducer';

const rootReducer = combineReducers({
  AuthReducer,
  FieldReducer,
  ModalsReducer,
});

const middleware = [thunk];

// creating store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
// assigning store to next wrapper
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<unknown, unknown, AnyAction>;
