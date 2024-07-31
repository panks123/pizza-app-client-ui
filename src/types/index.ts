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
    attributes: Attribute[]
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