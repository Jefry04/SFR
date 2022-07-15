import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/Auth.reducer';
import FieldReducer from './reducers/Field.reducer';

const rootReducer = combineReducers({
  AuthReducer,
  FieldReducer,
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
