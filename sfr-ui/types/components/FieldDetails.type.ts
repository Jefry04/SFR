export interface IFieldDetailsProps {
  isAuth: boolean;
}
export interface IResponse {
  boookingsByField: [IBooking];
}
export interface IBooking {
  _id: string;
  userId: string;
  fieldId: FieldID;
  bookingDate: Date;
  __v: number;
}

export interface FieldID {
  _id: string;
  fieldName: string;
  capacity: number;
  city: string;
  description: string;
  phone: number;
  address: string;
  images: Image[];
  userId: string;
  bookings: string[];
  __v: number;
}

export interface Image {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}
