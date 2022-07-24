export interface IinitialState {
  fields: object;
  error: null | string;
}

export interface IAction {
  type: string;
  payload: string | object;
}
