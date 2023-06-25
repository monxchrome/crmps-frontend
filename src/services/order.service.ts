import { urls } from "../constants";
import { IOrder, IPagination } from "../interfaces";
import { IRes } from "../types";
import { axiosService } from "./axios.service";

class OrderService {
  getAll(params: any): IRes<IPagination<IOrder[]>> {
    const queryParams: any = { page: params.page };

    const parameterKeys = [
      "name",
      "surname",
      "email",
      "phone",
      "age",
      "course",
      "course_format",
      "course_type",
      "status",
      "sum",
      "already_paid",
    ];

    for (const key of parameterKeys) {
      const gteValue = params[`${key}Gte`];
      const lteValue = params[`${key}Lte`];

      if (gteValue) {
        queryParams[`${key}[gte]`] = gteValue;
      }

      if (lteValue) {
        queryParams[`${key}[lte]`] = lteValue;
      }
    }

    return axiosService.get(urls.orders.orders, { params: queryParams });
  }

  getById(id: string): IRes<IPagination<IOrder[]>> {
    return axiosService.get(urls.orders.byId(id));
  }

  update(id: string, order: IOrder): IRes<IOrder> {
    return axiosService.put(urls.orders.byId(id), order);
  }
}

export const orderService = new OrderService();
