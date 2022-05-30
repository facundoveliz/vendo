import axiosClient from "../auth/axiosClient";

const url = `${process.env.REACT_APP_API_URL}/api/users`;

export async function getUsers() {
  let res = await axiosClient.get(url);
  return res.data;
}

export async function getUser(id) {
  let res = await axiosClient.get(`${url}/${id}`);
  return res.data;
}

// TODO: check if this works
export async function putUser(userData) {
  await axiosClient.put(url, userData);
}

export async function deleteUser(id) {
  await axiosClient.delete(`${url}/${id}`);
}
