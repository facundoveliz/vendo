import axiosClient from "../auth/axiosClient";

export async function getUser(id) {
  let res = await axiosClient
    .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
    .catch((err) => console.log(err));
  return res.data;
}

export async function getUsers() {
  let res = await axiosClient
    .get(`${process.env.REACT_APP_API_URL}/api/users/`)
    .catch((err) => console.log(err));
  return res.data;
}

export async function editUser(id, userData) {
  await axiosClient
    .put(`${process.env.REACT_APP_API_URL}/api/users/edit/${id}`, userData)
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteUser(id) {
  await axiosClient
    .delete(`${process.env.REACT_APP_API_URL}/api/users/delete/${id}`)
    .catch((err) => console.log(err));
}
