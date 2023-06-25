import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { orderService } from "../../services";
import OrderDetails from "./OrderDetails";

const OrdersDetails = ({ orderId }: any) => {
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    orderService
      .getById(orderId)
      .then(({ data }) => setOrder([data]))
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setError(error);
        } else {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });
  }, [orderId]);

  if (error) {
    navigate("/422");
  }

  return (
    <div>
      {order.map((item) => (
        <OrderDetails key={item._id} order={item} />
      ))}
    </div>
  );
};

export default OrdersDetails;
