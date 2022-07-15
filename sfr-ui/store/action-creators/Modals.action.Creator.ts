import { Dispatch } from 'redux';
import {
  SHOW_CREATE_FIELD,
  SHOW_LOGIN_FORM,
  HIDE_CREATE_FIELD,
} from '../actions/Modal.actions';

export const showCreateFieldForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: SHOW_CREATE_FIELD });
};

export const hideCreateFieldForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: HIDE_CREATE_FIELD });
};

export const ShowLoginForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: SHOW_LOGIN_FORM });
};
