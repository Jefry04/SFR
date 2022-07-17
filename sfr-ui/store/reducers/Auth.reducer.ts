/* eslint-disable default-param-last */
import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  USER_SUCCESS,
} from '../actions/Auth.actions';
import { IinitialState, IAction } from './Auth.type';

const initialState: IinitialState = {
  isAuth: false,
  user: {},
  error: null,
  isAdmin: false,
};

function AuthReducer(state: IinitialState = initialState, action: IAction) {
  if (action.type === AUTH_SUCCESS) {
    const { isAdmin } = action.payload;
    return {
      ...state,
      isAuth: true,
      user: action.payload,
      error: null,
      isAdmin,
    };
  }
  if (action.type === AUTH_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (action.type === LOGOUT) {
    return {
      ...state,
      isAuth: false,
      user: null,
    };
  }
  return state;
}

export default AuthReducer;
