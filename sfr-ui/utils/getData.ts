import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllFields = async () => {
  try {
    const { data } = await axios.get(`${url}/fields`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getFieldDetails = async (id: string) => {
  const { data } = await axios.get(`${url}/fields/${id}`);
  return data;
};

export const getFieldByUser = async (token: string | null) => {
  const { data } = await axios.get(`${url}/user/profile/fields`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return data;
};

export const getBookingByUser = async (token: string | null) => {
  const { data } = await axios.get(`${url}/user/profile/bookings`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return data;
};
