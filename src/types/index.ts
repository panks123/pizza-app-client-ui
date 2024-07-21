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
    priceConfiguration: PriceConfiguration;
    attributes: ProductAttribute[]
    isPublish: boolean;
    createdAt: string;
}