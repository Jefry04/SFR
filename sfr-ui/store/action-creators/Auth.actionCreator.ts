import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { Dispatch, AnyAction } from 'redux';
import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  AUTH_REGISTER_LOADING,
} from '../actions/Auth.actions';
import { FormValues, IloginForm } from '../../types/register.type';
import { hideLoginForm, hideRegisterForm } from './Modals.action.Creator';

const url = process.env.NEXT_PUBLIC_API_URL;

export const authUser = (
  body: IloginForm
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_REGISTER_LOADING });
      const response = await axios.post(`${url}/auth/login`, body);
      const { token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
      dispatch(hideLoginForm());
      toast.success('Login exitoso');
    } catch (error: any) {
      dispatch({ type: AUTH_ERROR, payload: error });
      toast.error(error.response.data.message);
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
      toast.success('Usuario registrado con exito');
    } catch (error: any) {
      dispatch({ type: AUTH_ERROR, payload: error });
      toast.error(error.response.data.message);
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
