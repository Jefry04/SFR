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

const url = process.env.NEXT_PUBLIC_API_URL;

export const authUser = (
  body: IloginForm
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${url}/auth/login`, body);
      const { token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };
};

export const authRegister = (body: FormValues) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, body);

      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      dispatch({ type: AUTH_SUCCESS, payload: user });
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

// export const logout = () => {
//   return async (dispatch) => {
//     localStorage.removeItem('token');
//     axios.defaults.headers.common.Authorization = '';
//     dispatch({ type: LOGOUT });
//   };
// };
