import axios from 'axios';

const BASE_URL = 'https://https://66a9825f613eced4eba57cbe.mockapi.io/contacts';

export const getContacts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createContact = async (contact) => {
  const response = await axios.post(BASE_URL, contact);
  return response.data;
};

export const removeContact = async (contactId) => {
  await axios.delete(`${BASE_URL}/${contactId}`);
};