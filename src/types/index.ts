import { CartItem } from "@/lib/store/features/cart/cart-slice";

export type Tenant = {
    id: number | string;
    name: string;
    address: string;
}

export type PriceConfiguration = {
    [key: string] : {
        priceType: 'base' | 'aditional';
        availableOptions: string[];
    }
}
export type ProductPriceConfiguration = {
    [key: string] : {
        priceType: 'base' | 'aditional';
        availableOptions: {
            [key: string] : number;
        };
    }
}

export type Attribute = {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export type Category = {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
    hasToppings: boolean;
}

export type ProductAttribute = {
    name: string;
    value: string | boolean;
}

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    categoryId: string;
    category?: Category;
    priceConfiguration: ProductPriceConfiguration;
    attributes: ProductAttribute[]
    isPublish: boolean;
    createdAt: string;
}

export type Topping =  {
    _id: number;
    name: string;
    image: string;
    price: number;
    isAvailable: boolean;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'customer' | 'mananger';
    tenantId: number | null;
}

export type Address = {
    text: string;
    isDefault: boolean;
}

export type Customer = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    addresses: Address[];
}

export type OrderData = {
    cart: CartItem[];
    couponCode: string;
    tenantId: string;
    customerId: string;
    comment: string;
    address: string;
    paymentMode: 'card' | 'cash';
}

export interface Order {
    _id: string;
    // cart: CartItem[];
    customerId: string;
    total: number;
    discount: number;
    taxes: number;
    deliveryCharges: number;
    address: string;
    tenantId: string;
    comment?: string;
    paymentMode: string;
    paymentStatus: string;
    orderStatus: string;
    paymentId?: string;
    createdAt: string;
}