export interface IAction {
  type: string;
  payload: IUser;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookings: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IinitialState {
  isAuth: boolean;
  user: object;
  error: null | string;
  isAdmin: boolean;
}
