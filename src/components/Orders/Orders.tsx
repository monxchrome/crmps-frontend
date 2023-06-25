import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {orderActions} from "../../redux/slice/order.slice";
import Order from "./Order";
import css from './styles/orders.module.css'
import {Button, Pagination, Spacer, Text} from "@nextui-org/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Autocomplete, TextField} from "@mui/material";
import {IOrder} from "../../interfaces/order.interface";
import {useIsMobile} from "../../hoc/MediaQuery";
import LoadingPage from "../../pages/LoadingPage";

const Orders:FC = () => {
    const {orders, trigger, page, loading} = useAppSelector(state => state.orderReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useSearchParams({page: '1'})
    const [previousSort, setPreviousSort] = useState('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        const queryParams: any = {
            page: query.get('page'),
            nameLte: query.get('name[lte]'),
            nameGte: query.get('name[gte]'),
            surnameLte: query.get('surname[lte]'),
            surnameGte: query.get('surname[gte]'),
            emailLte: query.get('email[lte]'),
            emailGte: query.get('email[gte]'),
            phoneLte: query.get('phone[lte]'),
            phoneGte: query.get('phone[gte]'),
            ageLte: query.get('age[lte]'),
            ageGte: query.get('age[gte]'),
            courseLte: query.get('course[lte]'),
            courseGte: query.get('course[gte]'),
            course_formatLte: query.get('course_format[lte]'),
            course_formatGte: query.get('course_format[gte]'),
            course_typeLte: query.get('course_type[lte]'),
            course_typeGte: query.get('course_type[gte]'),
            statusLte: query.get('status[lte]'),
            statusGte: query.get('status[gte]'),
            sumLte: query.get('sum[lte]'),
            sumGte: query.get('sum[gte]'),
            already_paidLte: query.get('already_paid[lte]'),
            already_paidGte: query.get('already_paid[gte]'),
        };

        dispatch(orderActions.getAll(queryParams));
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

    const handleSort = (sortType: string) => {
        let newSort;
        if (previousSort === `${sortType}[lte]`) {
            newSort = `${sortType}[gte]`;
        } else {
            newSort = `${sortType}[lte]`;
        }

        setPreviousSort(newSort);
        setQuery({ page: page.toString(), [newSort]: '1' });
    };

    const isMobile = useIsMobile()

    const avatar = 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'

    return (
        <div>
            {loading? <LoadingPage/> :
                <div className={css.Father}>
                    <div className={css.Mother}>
                        <div className={css.UserDiv}>
                            <div className={css.ImgDiv}>
                                <img src={avatar} alt="" className={css.Img}/>
                            </div>
                            <div className={css.TextDiv}>
                                <Text h3>admin@gmail.com</Text>
                            </div>
                        </div>
                        <div className={css.PaginationTop}>
                            <Pagination total={21} initialPage={currentPage} onChange={handleClick} size="sm" className={css.Pag}/>
                        </div>
                        <Spacer y={1.6} />
                        <div className={css.Autocomplete}>
                            <Autocomplete
                                sx={isMobile ? { width: 500 } : { width: 300 }}
                                disableCloseOnSelect
                                options={orders}
                                getOptionLabel={(order: IOrder) => order.name}
                                renderInput={(params) => <TextField {...params} label="Search"/>}
                                onChange={(event, value) => {
                                    navigate(`/orders/${value._id}`)
                                }}
                            />
                        </div>
                        <Spacer y={1.6} />
                        <div className={css.UserDivPC}>
                            <div className={css.WrapText}>
                                <Text h4 className={css.Text1}>Id</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('name')}>Name</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('surname')}>Surname</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('email')}>Email</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('phone')}>Phone</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('age')}>Age</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('course')}>Course</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('course_format')}>Course Format</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('course_type')}>Course Type</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('status')}>Status</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('sum')}>Sum</Text>
                                <Text h4 className={css.Text} onClick={() => handleSort('already_paid')}>Already paid</Text>
                            </div>
                            <div className={css.ImgDiv}>
                                <img src={avatar} alt="" className={css.Img}/>
                            </div>
                        </div>
                        <div className={css.Wrap}>
                            <div>
                                <Button auto onPress={handleSortA} size={isMobile ? "xl" : "md"}>Z-A</Button>
                            </div>
                            <div>
                                <Button auto onPress={handleSortB} size={isMobile ? "xl" : "md"}>A-Z</Button>
                            </div>
                        </div>
                        <div className={css.Orders}>
                            {orders.map(order => <Order key={order._id} order={order}/>)}
                        </div>
                        <div className={css.Pagination}>
                            <Pagination total={21} initialPage={currentPage} onChange={handleClick} size={isMobile ? "xl" : "sm"} className={css.Pag}/>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Orders;
