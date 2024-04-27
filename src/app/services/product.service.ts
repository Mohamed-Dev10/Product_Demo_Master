import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Product, ProductPagination } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAllProducts(page: number, pageSize: number): Observable<{ products: Product[] | null; totalItems: number; currentPage: number; pageSize: number; totalPages: number; }> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString())
      .set('_start', (page*pageSize).toString())
      .set('_end', (page*pageSize+pageSize).toString());

    return this.http.get<Product[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map(response => {
          const totalItemsHeader = response.headers.get('X-Total-Count');
          const totalItems = totalItemsHeader ? Number(totalItemsHeader) : 0;
          const products = response.body;
          const totalPages = Math.ceil(totalItems / pageSize);

          return { products, totalItems, currentPage: page, pageSize, totalPages };
        })
      );
  }

  getTotalProducts(pageSize: number): Observable<number> {
    return this.http.get<Product[]>(`${this.apiUrl}/`).pipe(
      map(data => {
        const totalPages = Math.ceil(data.length / pageSize);
        console.log(totalPages);
        return totalPages;
      })
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const params = new HttpParams().set('keyword', keyword);
  
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }


  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, newProduct);
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${updatedProduct.id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
