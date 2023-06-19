import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {orderActions} from "../../redux/slice/order.slice";
import Order from "./Order";
import css from './styles/orders.module.css'
import {Button, Pagination, Spacer} from "@nextui-org/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Autocomplete, TextField} from "@mui/material";
import {IOrder} from "../../interfaces/order.interface";

const Orders:FC = () => {
    const {orders, trigger, page} = useAppSelector(state => state.orderReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useSearchParams({page: '1'})

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(orderActions.getAll({page: query.get('page'), nameLte: query.get('name[lte]')}))
    }, [dispatch, query, trigger, setCurrentPage])

    const handleClick = (page: any) => {
        setQuery((prevState) => {
            const nameLte = prevState.get('name[lte]');
            if (nameLte) {
                return {
                    'name[lte]': nameLte,
                    page: page ? page.toString() : '1',
                };
            } else {
                return {
                    'name[gte]': prevState.get('name[gte]') || '1',
                    page: page ? page.toString() : '1',
                };
            }
        });

        setCurrentPage(page);
    };

    const handleSortA = (page: any) => {
        setQuery({ page: page.toString(), 'name[lte]': '1' });
    };

    const handleSortB = (page: any) => {
        setQuery({ page: page.toString(), 'name[gte]': '1' });
    };

    return (
        <div className={css.Father}>
            <div className={css.PaginationTop}>
                <Pagination total={21} initialPage={currentPage} onChange={handleClick} size="sm" className={css.Pag}/>
            </div>
            <Spacer y={1.6} />
            <div className={css.Autocomplete}>
                <Autocomplete
                    sx={{ width: 300 }}
                    disableCloseOnSelect
                    options={orders}
                    getOptionLabel={(order: IOrder) => order.name}
                    renderInput={(params) => <TextField {...params} label="Search"/>}
                    onChange={(event, value) => {
                        navigate(`/orders/${value._id}`)
                    }}
                />
            </div>
            <div className={css.Wrap}>
                <div>
                    <Button auto onPress={handleSortA}>Z-A</Button>
                </div>
                <div>
                    <Button auto onPress={handleSortB}>A-Z</Button>
                </div>
            </div>
            <div className={css.Orders}>
                {orders.map(order => <Order key={order._id} order={order}/>)}
            </div>
            <div className={css.Pagination}>
                <Pagination total={21} initialPage={currentPage} onChange={handleClick} size="sm" className={css.Pag}/>
            </div>
        </div>
    );
};

export default Orders;
