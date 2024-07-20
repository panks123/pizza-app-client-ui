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