export interface IAction {
  type: string;
  payload: string | object;
}

export interface IinitialState {
  isAuth: boolean;
  user: object;
  error: null | string;
}
