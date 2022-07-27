import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import { toast } from 'react-toastify';
import {
  FIELD_SUCCESS,
  FIELD_ERROR,
  CREATE_FIELD_SUCCESS,
  FILTER_FIELD_ERROR,
  FILTER_FIELD_SUCCESS,
  CREATE_FIELD_LOADING,
  FIELD_BYUSER_LOADING,
  FIELD_BYUSER_SUCCESS,
  FIELD_BYUSER_ERROR,
  CLEAR_FIELDS_FILTER,
} from '../actions/Field.actions';
import { hideCreateFieldForm } from './Modals.action.Creator';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllFields1 = (): ThunkAction<
  void,
  unknown,
  unknown,
  AnyAction
> => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`${url}/fields`);
      dispatch({ type: FIELD_SUCCESS, payload: data.fields });
    } catch (error) {
      dispatch({ type: FIELD_ERROR, payload: error });
    }
  };
};

export const createField = (
  fieldData: any
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_FIELD_LOADING });
      const { data } = await axios.post(`${url}/fields`, fieldData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: CREATE_FIELD_SUCCESS, payload: data.field });
      dispatch(hideCreateFieldForm());
      dispatch(getFieldByUser());
      toast.success('Se crea cancha exitosamente');
    } catch (error: any) {
      dispatch({ type: FIELD_ERROR, payload: error });
      toast.error(error.response.data.message);
    }
  };
};

export const getFieldByUser = (): ThunkAction<
  void,
  unknown,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_BYUSER_LOADING });
      const { data } = await axios.get(`${url}/user/profile/fields`);
      dispatch({ type: FIELD_BYUSER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: FIELD_BYUSER_ERROR, payload: error });
      toast.error(error.response.data.message);
    }
  };
};

export const getFilterFields = (
  city: string,
  capacity: string
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const paramsObject = {
        city,
        capacity,
      };
      const { data } = await axios.get(`${url}/fields/results`, {
        params: paramsObject,
      });
      dispatch({ type: FILTER_FIELD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FILTER_FIELD_ERROR, payload: error });
    }
  };
};

export const clearFieldsFilter = () => (dispatch: Dispatch) => {
  return dispatch({ type: CLEAR_FIELDS_FILTER });
};
