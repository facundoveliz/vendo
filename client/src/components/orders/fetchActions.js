import axios from "axios";

export const getOrders = async () => {
  try {
    let res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/`)
      .catch((err) => console.log(err));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addOrder = async (orderData) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/add`, orderData)
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const editOrder = async (id, orderData) => {
  try {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/orders/edit/${id}`, orderData)
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/orders/delete/${id}`)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
