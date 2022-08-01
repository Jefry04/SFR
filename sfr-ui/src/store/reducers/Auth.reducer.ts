/* eslint-disable default-param-last */
import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_REGISTER_LOADING,
  LOGOUT,
} from '../actions/Auth.actions';
import { IinitialState, IAction } from './Auth.type';

const initialState: IinitialState = {
  isAuth: false,
  user: {},
  error: null,
  isAdmin: false,
  isLoading: false,
};

function AuthReducer(state: IinitialState = initialState, action: IAction) {
  if (action.type === AUTH_REGISTER_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === AUTH_SUCCESS) {
    const { isAdmin } = action.payload;
    return {
      ...state,
      isAuth: true,
      user: action.payload,
      error: null,
      isAdmin,
      isLoading: false,
    };
  }
  if (action.type === AUTH_ERROR) {
    return {
      ...state,
      isLoading: false,
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
