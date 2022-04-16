import axiosClient from "../auth/axiosClient";

export async function getProducts() {
  let res = await axiosClient
    .get(`${process.env.REACT_APP_API_URL}/api/products/`)
    .catch((err) => console.log(err));
  return res.data;
}

export async function addProduct(productData) {
  await axiosClient
    .post(`${process.env.REACT_APP_API_URL}/api/products/add`, productData)
    .catch((err) => {
      console.log(err);
    });
}

export async function editProduct(id, productData) {
  await axiosClient
    .put(
      `${process.env.REACT_APP_API_URL}/api/products/edit/${id}`,
      productData
    )
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteProduct(id) {
  await axiosClient
    .delete(`${process.env.REACT_APP_API_URL}/api/products/delete/${id}`)
    .catch((err) => console.log(err));
}
