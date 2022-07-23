/* eslint-disable default-param-last */
import { IinitialState } from '../../types/field.reducer.type';
import {
  FIELD_SUCCESS,
  CREATE_FIELD_SUCCESS,
  FILTER_FIELD_ERROR,
  FILTER_FIELD_SUCCESS,
  CREATE_FIELD_LOADING,
  FIELD_BYUSER_LOADING,
  FIELD_BYUSER_SUCCESS,
  FIELD_BYUSER_ERROR,
  CLEAR_FIELDS_FILTER,
} from '../actions/Field.actions';

const initialState = {
  fields: [],
  error: null,
  createField: {},
  filteredFields: [],
  isLoading: false,
  fieldsByUser: [],
};

interface IAction {
  type: string;
  payload: string | object;
}

function FieldReducer(state = initialState, action: IAction) {
  if (action.type === CREATE_FIELD_LOADING) {
    return {
      ...state,
      error: null,
      isLoading: true,
    };
  }

  if (action.type === FIELD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      fields: action.payload,
      error: null,
    };
  }
  if (action.type === CREATE_FIELD_SUCCESS) {
    return {
      ...state,
      createField: action.payload,
      error: null,
      isLoading: false,
    };
  }
  if (action.type === FILTER_FIELD_SUCCESS) {
    return {
      ...state,
      filteredFields: action.payload,
      error: null,
      isLoading: false,
    };
  }
  if (action.type === FILTER_FIELD_ERROR) {
    return {
      ...state,
      filteredFields: null,
      error: action.payload,
      isLoading: false,
    };
  }
  if (action.type === FIELD_BYUSER_LOADING) {
    return {
      ...state,
      error: null,
      isLoading: true,
    };
  }
  if (action.type === FIELD_BYUSER_SUCCESS) {
    return {
      ...state,
      fieldsByUser: action.payload,
      error: null,
      isLoading: false,
    };
  }
  if (action.type === FIELD_BYUSER_ERROR) {
    return {
      ...state,
      fieldsByUser: null,
      error: action.payload,
      isLoading: false,
    };
  }
  if (action.type === CLEAR_FIELDS_FILTER) {
    return {
      filteredFields: [],
    };
  }
  return state;
}

export default FieldReducer;
