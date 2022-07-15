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

export const getCharactersDetail = async () => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/`
  );
  return data;
};
