import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  filteredProducts: Product[] | null  = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts(this.currentPage, this.pageSize)
    .subscribe((data: { products: Product[] | null; totalItems: number; currentPage: number; pageSize: number;totalPages: number; }) => {
      this.filteredProducts = data.products;
      this.currentPage= data.currentPage;
      this.pageSize= data.pageSize;

    });
    this.productService.getTotalProducts(this.pageSize).subscribe((data: number) => {
      this. totalPages =data-1;
    });
  }



  updateProduct(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
  handleGotoPage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
