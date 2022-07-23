/* eslint-disable default-param-last */
import {
  GET_BOOKING_SUCCESS,
  GET_BOOKING_ERROR,
  GET_BOOKING_LOADING,
} from '../actions/Booking.actions';

const initialState = {
  bookings: [],
  bookinIsLoading: false,
  error: null,
};
interface IAction {
  type: string;
  payload: string | object;
}

function BookingReducer(state = initialState, action: IAction) {
  if (action.type === GET_BOOKING_LOADING) {
    return {
      ...state,
      error: null,
      bookinIsLoading: true,
    };
  }
  if (action.type === GET_BOOKING_SUCCESS) {
    return {
      ...state,
      bookinIsLoading: false,
      bookings: action.payload,
      error: null,
    };
  }
  if (action.type === GET_BOOKING_ERROR) {
    return {
      ...state,
      bookinIsLoading: false,
      error: action.payload,
    };
  }
  return state;
}

export default BookingReducer;
