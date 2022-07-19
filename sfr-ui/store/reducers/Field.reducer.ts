/* eslint-disable default-param-last */
import { IinitialState } from '../../types/field.reducer.type';
import {
  FIELD_SUCCESS,
  FIELD_ERROR,
  CREATE_FIELD_SUCCESS,
  FILTER_FIELD_ERROR,
  FILTER_FIELD_SUCCESS,
} from '../actions/Field.actions';

const initialState = {
  fields: [],
  error: null,
  createField: {},
  filteredFields: [],
};

interface IAction {
  type: string;
  payload: string | object;
}

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
  if (action.type === FILTER_FIELD_SUCCESS) {
    return {
      ...state,
      filteredFields: action.payload,
      error: null,
    };
  }
  if (action.type === FILTER_FIELD_ERROR) {
    return {
      ...state,
      filteredFields: null,
      error: action.payload,
    };
  }
  return state;
}

export default FieldReducer;
