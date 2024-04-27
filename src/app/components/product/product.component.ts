import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
public products : Array<Product>=[];
  public keyword : string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService : ProductService ){}
  
  ngOnInit(){
    this.getProducts();
  }


  getProducts() {
    this.productService.getAllProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          const { products, totalItems, currentPage, pageSize } = response;
  
          if (products) {
            this.products = products;
          } else {
            this.products = []; // Provide a default value when products is null
          }
          
          this.totalPages = Math.ceil(totalItems / pageSize);
          this.currentPage = currentPage;
          this.pageSize = pageSize;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  handleCheckProduct(product: Product) {
    this.productService.updateProduct(product)
      .subscribe({
        next: (updatedProduct) => {
          product.checked = !product.checked;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  
  handleDelete(product: Product) {
    if (confirm("Etes vous sûr?")) {
      this.productService.deleteProduct(product.id)
        .subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }
  
  searchProducts() {
    this.productService.searchProducts(this.keyword)
      .subscribe({
        next: (value: Product[]) => {
          this.products = value;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }



}
