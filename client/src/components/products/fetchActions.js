import axios from "axios";

export const getProducts = async () => {
  let res = await axios.get(`/api/products/`).catch((err) => console.log(err));
  return res.data;
};

export const addProduct = async (productData) => {
  let res = await axios.post(`/api/products/add`, productData).catch((err) => {
    console.log(err);
  });
};

export const editProduct = async (id, productData) => {
  await axios
    .put(`/api/products/edit/${id}`, productData)
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = async (id) => {
  await axios
    .delete(`/api/products/delete/${id}`)
    .catch((err) => console.log(err));
};
