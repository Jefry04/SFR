import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  USER_SUCCESS,
} from '../actions/Auth.actions';
import { FormValues, IloginForm } from '../../types/register.type';
import { hideLoginForm, hideRegisterForm } from './Modals.action.Creator';

const url = process.env.NEXT_PUBLIC_API_URL;

export const authUser = (
  body: IloginForm
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${url}/auth/login`, body);
      const { token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
      dispatch(hideLoginForm());
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };
};

export const authRegister = (
  body: FormValues
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, body);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
      dispatch(hideRegisterForm());
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };
};

export const getUerData = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${url}/user/profile`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
    } catch (error) {
      console.log(error);
      // localStorage.removeItem('token');
      // dispatch({ type: AUTH_ERROR, payload: error.response });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    dispatch({ type: LOGOUT });
  };
};
