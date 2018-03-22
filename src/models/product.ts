import { UnitData } from "./Unit";

export class Product {
  success: number;
  message: string;
  data?: (ProductData)[] | null;
}
export class ProductData {
  _id: number;
  category: number;
  image: string;
  stock: number;
  qty: number;
  name: string;
  price: number;
  unit: number;
  category_name?: (CategoryNameEntity)[] | null;
  unit_name?: (UnitData)[] | null;
}
export class CategoryNameEntity {
  _id: number;
  category_name: string;
} 