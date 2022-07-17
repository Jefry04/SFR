export interface IProps {
  isAuth: boolean;
  user: IUser;
  isAdmin: boolean;
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
  __v: number;
}

export interface IBooking {
  _id: string;
  userId: string;
  fieldId: IFieldID;
  bookingDate: Date;
}

export interface IFieldID {
  _id: string;
  fieldName: string;
  capacity: number;
  city: string;
  description: string;
  phone: number;
  address: string;
  image: IImage;
  userId: string;
  bookings: string[];
  __v: number;
}

export interface IImage {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}
