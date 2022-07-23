/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import { toast } from 'react-toastify';
import {
  GET_BOOKING_SUCCESS,
  GET_BOOKING_ERROR,
  GET_BOOKING_LOADING,
} from '../actions/Booking.actions';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getBookingByUser = (
  token: string | null | undefined
): ThunkAction<void, unknown, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BOOKING_LOADING });
      const { data } = await axios.get(`${url}/user/profile/bookings`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: GET_BOOKING_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: GET_BOOKING_ERROR, payload: error });
      toast.error(error.response.data.message);
    }
  };
};
