/* eslint-disable default-param-last */
import {
  SHOW_CREATE_FIELD,
  SHOW_LOGIN_FORM,
  HIDE_CREATE_FIELD,
} from '../actions/Modal.actions';

interface IinitialState {
  showCreateFieldForm: boolean;
}
interface IModalAction {
  type: string;
}

const initialState: IinitialState = {
  showCreateFieldForm: false,
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
  return state;
}
export default ModalsReducer;
