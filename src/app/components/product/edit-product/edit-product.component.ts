import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    isAvailable: false
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(): void {
    this.route.params.subscribe(params => {
      const productId = +params["id"];
      this.productService.getProductById(productId).subscribe({
        next: (res) => {
          if (res) {
            this.product = res;
          } else {
            console.error('Product not found');
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }



  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.router.navigate(['/admin/product-list']);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

}
