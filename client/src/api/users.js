import axiosClient from './axiosClient';

const url = `${process.env.REACT_APP_API_URL}/api/users`;

export async function getUsers() {
  const res = await axiosClient.get(url);
  return res.data.result;
}

export async function getUser() {
  const res = await axiosClient.get(`${url}/profile`);
  return res.data.result;
}

export async function putUser(id, userData) {
  await axiosClient.put(`${url}/${id}`, userData);
}

export async function putProfile(userData) {
  await axiosClient.put(url, userData);
}

export async function deleteUser(id) {
  await axiosClient.delete(`${url}/${id}`);
}

export async function deleteProfile() {
  await axiosClient.delete(url);
}
