import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import {
  FIELD_SUCCESS,
  FIELD_ERROR,
  CREATE_FIELD_SUCCESS,
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
  fieldData: any,
  token: string | null | undefined
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${url}/fields`, fieldData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_FIELD_SUCCESS, payload: data.field });
      dispatch(hideCreateFieldForm());
    } catch (error) {
      dispatch({ type: FIELD_ERROR, payload: error });
    }
  };
};
