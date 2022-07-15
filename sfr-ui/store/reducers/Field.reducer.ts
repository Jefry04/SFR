/* eslint-disable default-param-last */
import { IinitialState } from '../../types/field.reducer.type';
import {
  FIELD_SUCCESS,
  FIELD_ERROR,
  CREATE_FIELD_SUCCESS,
} from '../actions/Field.actions';
import { IAction } from './Auth.type';

const initialState = {
  fields: [],
  error: null,
  createField: {},
};

function FieldReducer(state = initialState, action: IAction) {
  if (action.type === FIELD_SUCCESS) {
    return {
      ...state,
      fields: action.payload,
      error: null,
    };
  }
  if (action.type === CREATE_FIELD_SUCCESS) {
    return {
      ...state,
      createField: action.payload,
      error: null,
    };
  }
  return state;
}

export default FieldReducer;
