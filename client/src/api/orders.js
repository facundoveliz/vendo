import axiosClient from "../auth/axiosClient";

const url = `${process.env.REACT_APP_API_URL}/api/orders`;

export async function getOrders() {
  let res = await axiosClient.get(url);
  return res.data;
}

export async function postOrder(orderData) {
  await axiosClient.post(url, orderData);
}

export async function deleteOrder(id) {
  await axiosClient.delete(`${url}/${id}`);
}
