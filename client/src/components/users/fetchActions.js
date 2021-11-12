import axios from "axios";

export const getUser = async (id) => {
  try {
    let res = await axios
      .get(`/api/users/${id}`)
      .catch((err) => console.log(err));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  try {
    let res = await axios.get(`/api/users/`).catch((err) => console.log(err));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const editUser = async (id, userData) => {
  try {
    await axios.put(`/api/users/edit/${id}`, userData).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios
      .delete(`/api/users/delete/${id}`)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
