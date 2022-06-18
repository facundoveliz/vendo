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
  const res = await axiosClient.put(url, userData);
  if (res.toString() === 'Invalid email or password') {
    return res;
  }
  return null;
}

export async function deleteUser(id) {
  await axiosClient.delete(`${url}/${id}`);
}

export async function deleteProfile() {
  await axiosClient.delete(url);
}
