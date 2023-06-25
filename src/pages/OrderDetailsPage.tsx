import React from "react";
import { useParams } from "react-router-dom";

import OrdersDetails from "../components/Orders/OrdersDetails";

const OrderDetailsPage = () => {
  const { orderId } = useParams();

  return (
    <div>
      <OrdersDetails orderId={orderId} />
    </div>
  );
};

export default OrderDetailsPage;
