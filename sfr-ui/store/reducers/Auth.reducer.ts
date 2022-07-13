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
};

function AuthReducer(state: IinitialState = initialState, action: IAction) {
  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      isAuth: true,
      user: action.payload,
      error: null,
    };
  }
  if (action.type === AUTH_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }
  // if (action.type === LOGOUT) {
  //   return {
  //     ...state,
  //     isAuth: false,
  //     user: null,
  //   };
  // }
  return state;
}

export default AuthReducer;
