import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";
import {IRes} from "../types/axiosRes.type";
import {IPagination} from "../interfaces/pagination.interface";
import {IOrder} from "../interfaces/order.interface";

class OrderService {
    getAll(page=1): IRes<IPagination<IOrder[]>> {
        return axiosService.get(urls.orders.orders, {params: {page}})
    }

    getById(id: string): IRes<IPagination<IOrder[]>> {
        return axiosService.get(urls.orders.byId(id))
    }
}

export const orderService = new OrderService()
