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