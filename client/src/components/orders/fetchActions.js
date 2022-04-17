import axiosClient from "../auth/axiosClient";

export async function getOrders() {
  let res = await axiosClient.get(
    `${process.env.REACT_APP_API_URL}/api/orders/`
  );
  return res.data;
}

export async function addOrder(orderData) {
  await axiosClient.post(
    `${process.env.REACT_APP_API_URL}/api/orders/add`,
    orderData
  );
}

export async function editOrder(id, orderData) {
  await axiosClient.put(
    `${process.env.REACT_APP_API_URL}/api/orders/edit/${id}`,
    orderData
  );
}

export async function deleteOrder(id) {
  await axiosClient.delete(
    `${process.env.REACT_APP_API_URL}/api/orders/delete/${id}`
  );
}
