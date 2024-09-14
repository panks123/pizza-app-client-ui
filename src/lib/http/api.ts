import { OrderData } from '@/types';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',   
    }
});

const ORDER_SERVICE = '/api/order';

export const getCustomer = () => api.get(`${ORDER_SERVICE}/customer`);
export const addAddress = (customerId: string, payload: { address: string }) => api.patch(`${ORDER_SERVICE}/customer/addresses/${customerId}`, payload);
export const validateCoupon = (payload: { code: string, tenantId: number }) => api.post(`${ORDER_SERVICE}/coupon/verify`, payload);
export const createOrder = (payload: OrderData, idempotencyKey: string) => api.post(
    `${ORDER_SERVICE}/orders`, payload, { 
        headers: { 'Idempotency-Key': idempotencyKey } 
    }
);
export const getCustomerOrders = (currentPage: number, perPage: number) => api.get(`${ORDER_SERVICE}/orders/mine?page=${currentPage}&limit=${perPage}`);