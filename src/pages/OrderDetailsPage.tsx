import React from 'react';
import OrdersDetails from "../components/Orders/OrdersDetails";
import {useParams} from "react-router-dom";

const OrderDetailsPage = () => {
    const {orderId} = useParams();

    return (
        <div>
            <OrdersDetails orderId={orderId}/>
        </div>
    );
};

export default OrderDetailsPage;
