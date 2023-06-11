import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {orderActions} from "../../redux/slice/order.slice";
import Order from "./Order";
import css from './styles/orders.module.css'
import {Pagination} from "@nextui-org/react";
import {useSearchParams} from "react-router-dom";

const Orders:FC = () => {
    const {orders, trigger, page} = useAppSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams({page: '1'})
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(orderActions.getAll({page: query.get('page')}))
    }, [dispatch, query, trigger])

    const handleClick = (page: any) => {
        setQuery({ page: page.toString() });
    };

    return (
        <div className={css.Father}>
            <div className={css.PaginationTop}>
                <Pagination total={21} initialPage={1} onChange={handleClick} size="sm" className={css.Pag}/>
            </div>
            <div>
                {orders.map(order => <Order key={order._id} order={order}/>)}
            </div>
            <div className={css.Pagination}>
                <Pagination total={21} initialPage={1} onChange={handleClick} size="sm" className={css.Pag}/>
            </div>
        </div>
    );
};

export default Orders;
