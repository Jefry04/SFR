export interface IallFields {
  allFields: IFields;
}

export interface IFields {
  fields: IField[];
}

export interface IField {
  _id: string;
  fieldName: string;
  capacity: number;
  city: string;
  description: string;
  phone: number;
  address: string;
  images: [IImage];
  userId: IUserID;
  bookings: any[];
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

export interface IUserID {
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
