/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import { FIELD_SUCCESS, FIELD_ERROR } from '../actions/Field.actions';

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
