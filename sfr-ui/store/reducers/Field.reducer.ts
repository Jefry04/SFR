/* eslint-disable default-param-last */
import { IinitialState } from '../../types/field.reducer.type';
import { FIELD_SUCCESS, FIELD_ERROR } from '../actions/Field.actions';
import { IAction } from './Auth.type';

const initialState = {
  fields: [],
  error: null,
};

function FieldReducer(state = initialState, action: IAction) {
  if (action.type === FIELD_SUCCESS) {
    return {
      ...state,
      fields: action.payload,
      error: null,
    };
  }
  return state;
}

export default FieldReducer;
