export class OrderDetail {
    order_detail_id: number;
    category_id: number;
    image: string;
    stock: number;
    qty: number;
    name: string;
    price: number;
    category_name?: (CategoryNameEntity)[] | null;
}

export class CategoryNameEntity {
    _id: number;
    category_name: string;
  }