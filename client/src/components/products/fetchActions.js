import axios from "axios";

export const getProducts = async () => {
  try {
    let res = await axios
      .get(`/api/products/`)
      .catch((err) => console.log(err));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (productData) => {
  try {
    await axios.post(`/api/products/add`, productData).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProduct = async (id, productData) => {
  try {
    await axios.put(`/api/products/edit/${id}`, productData).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios
      .delete(`/api/products/delete/${id}`)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
