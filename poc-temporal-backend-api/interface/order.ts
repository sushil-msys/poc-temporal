export interface Iorder {
        type:string,
        quantity:number,
        price:number,
        size:number,
        gender:string,
        address:string
}

export interface IFullOrder extends Iorder{
    order_id:string
}