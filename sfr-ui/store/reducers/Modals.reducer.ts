/* eslint-disable default-param-last */
import {
  SHOW_CREATE_FIELD,
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
  HIDE_CREATE_FIELD,
  SHOW_REGISTER_FORM,
  HIDE_REGISTER_FORM,
} from '../actions/Modal.actions';

interface IinitialState {
  showCreateFieldForm: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
}
interface IModalAction {
  type: string;
}

const initialState: IinitialState = {
  showCreateFieldForm: false,
  showLoginForm: false,
  showRegisterForm: false,
};

function ModalsReducer(
  state: IinitialState = initialState,
  action: IModalAction
) {
  if (action.type === SHOW_CREATE_FIELD) {
    return {
      ...state,
      showCreateFieldForm: true,
    };
  }
  if (action.type === HIDE_CREATE_FIELD) {
    return {
      ...state,
      showCreateFieldForm: false,
    };
  }
  if (action.type === SHOW_LOGIN_FORM) {
    return {
      ...state,
      showLoginForm: true,
    };
  }
  if (action.type === HIDE_LOGIN_FORM) {
    return {
      ...state,
      showLoginForm: false,
    };
  }
  if (action.type === SHOW_REGISTER_FORM) {
    return {
      ...state,
      showRegisterForm: true,
    };
  }
  if (action.type === HIDE_REGISTER_FORM) {
    return {
      ...state,
      showRegisterForm: false,
    };
  }
  return state;
}
export default ModalsReducer;
