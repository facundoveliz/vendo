import axiosClient from "../auth/axiosClient";

const url = `${process.env.REACT_APP_API_URL}/api/products`;

export async function getProducts() {
  let res = await axiosClient.get(url);
  return res.data;
}

export async function postProduct(productData) {
  await axiosClient.post(url, productData);
}

export async function putProduct(id, productData) {
  await axiosClient.put(`${url}/${id}`, productData);
}

export async function deleteProduct(id) {
  await axiosClient.delete(`${url}/${id}`);
}
