export interface Order {
    id: number;
    buyer_id: number;
    order_items_attributes: Array<{ product_id: number}>;
    createdAt: Date;
    updatedAt:Date;
    state: string;
    payment: boolean;
}
  
export interface User {
    email: string
    token: string
}

export interface Store {
    id: any
    name: string
}
