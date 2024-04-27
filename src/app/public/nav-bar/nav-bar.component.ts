import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() currentPage: number=0;
  @Input() pageSize: number=0;
  @Input() totalProducts: number=0;
  @Input() checkedProducts: number=0;

  sessionName: string='';
  currentActiveLink: string='';

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

     ngOnInit() {
      this.getSessionName();
      this.router.events.subscribe(() => {
        this.currentActiveLink = this.router.url;
      });
    }
    fetchProductData(): void {
      const page = 1; // Set the initial page value
      const pageSize = 10; // Set the page size value
    
      this.productService.getAllProducts(page, pageSize).subscribe(
        ({ products, totalItems, currentPage, pageSize, totalPages }) => {
          if (products) {
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.totalProducts = totalItems;
            this.checkedProducts = products.filter(product => product.checked).length;
            this.getSessionName(); // Fetch the session name after successful login
          }
        }
      );
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getSessionName(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user: User = JSON.parse(userString);
      this.sessionName = user.username;
    } else {
      this.sessionName = '';
    }
  }
}
