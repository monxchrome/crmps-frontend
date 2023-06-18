import React, {useEffect, useState} from 'react';
import {orderService} from "../../services/order.service";
import OrderDetails from "./OrderDetails";

const OrdersDetails = ({orderId}: any) => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        orderService.getById(orderId).then(({data}) => setOrder([data]))
    }, [orderId])

    return (
        <div>
            {order.map(item => <OrderDetails key={item._id} order={item}/>)}
        </div>
    );
};

export default OrdersDetails;
