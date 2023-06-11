import React, {useEffect, useState} from 'react';
import {orderService} from "../../services/order.service";

const OrdersDetails = ({orderId}: any) => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        orderService.getById(orderId).then(({data}) => setOrder([data]))
    }, [orderId])

    return (
        <div>

        </div>
    );
};

export default OrdersDetails;
