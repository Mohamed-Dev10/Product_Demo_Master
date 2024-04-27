export interface Product {
    id:number,
    name: string;
    price: number;
    description?: string;
    quantity: number;
    isAvailable: boolean;
    checked?: boolean;
}
export interface ProductPagination {
  products: Product[];
  searchText: string ;
  currentPage: number ;
  pageSize: number ;
  totalItems: number ;
  totalPages: number ;


}
