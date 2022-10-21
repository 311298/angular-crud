export interface IProduct {
    productName: string;
    category: string;
    date: Date;
    comment: string;
    price: number;
    productFreshness: string;
    id: number
}

export interface IDropDown {
    value: string;
    viewValue: string;
}