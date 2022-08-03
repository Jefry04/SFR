import { Dispatch } from 'redux';
import {
  SHOW_CREATE_FIELD,
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
  HIDE_CREATE_FIELD,
  SHOW_REGISTER_FORM,
  HIDE_REGISTER_FORM,
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
export const hideLoginForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: HIDE_LOGIN_FORM });
};

export const showRegisterForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: SHOW_REGISTER_FORM });
};
export const hideRegisterForm = () => (dispatch: Dispatch) => {
  return dispatch({ type: HIDE_REGISTER_FORM });
};
