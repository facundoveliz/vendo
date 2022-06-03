import axiosClient from "./axiosClient";

const url = `${process.env.REACT_APP_API_URL}/api/users`;

export async function getUsers() {
  let res = await axiosClient.get(url);
  return res.data.result;
}

export async function getUser() {
  let res = await axiosClient.get(`${url}/profile`);
  return res.data.result;
}

export async function putUser(userData) {
  await axiosClient.put(url, userData);
}

export async function deleteUser() {
  await axiosClient.delete(url);
}
