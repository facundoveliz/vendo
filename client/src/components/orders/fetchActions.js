import axios from "axios";

export const getOrders = async () => {
  try {
    let res = await axios.get(`/api/orders/`).catch((err) => console.log(err));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addOrder = async (orderData) => {
  try {
    await axios
      .post(`/api/orders/add`, orderData)
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const editOrder = async (id, orderData) => {
  try {
    await axios.put(`/api/orders/edit/${id}`, orderData).catch((err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios
      .delete(`/api/orders/delete/${id}`)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
