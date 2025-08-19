
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
  }
  
  export interface IProductResponse {
    products: IProduct[];
  }
  
  export interface ICategory {
    id: number;
    name: string;
  }
  
  export interface IPaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }