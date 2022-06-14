import axiosClient from './axiosClient';

const url = `${process.env.REACT_APP_API_URL}/api/products`;

export async function getProducts() {
  const res = await axiosClient.get(url);
  return res.data.result;
}

export async function postProduct(data) {
  await axiosClient.post(url, data);
}

export async function putProduct(id, data) {
  await axiosClient.put(`${url}/${id}`, data);
}

export async function deleteProduct(id) {
  await axiosClient.delete(`${url}/${id}`);
}
