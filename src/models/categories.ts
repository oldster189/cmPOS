export class Category {
  success: number;
  message: string;
  data?: (CategoryData)[] | null;
}
export class CategoryData {
  _id: number;
  category_name: string; 
}