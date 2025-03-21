import {
    IProductSearchParams
} from "@/interface/request/products";
import {
    IProductsListResponse
} from "@/interface/response/products";
import {  sendGet} from "./axios";

export const getShopProducts = async (params?: IProductSearchParams): Promise<IProductsListResponse> => {
    const res = await sendGet('/products/shop', params);
    const data: IProductsListResponse = res;
    return data;
};

export const getProducts = async (params?: IProductSearchParams): Promise<IProductsListResponse> => {
    const res = await sendGet('/products', params);
    const data: IProductsListResponse = res;
    return data;
};
