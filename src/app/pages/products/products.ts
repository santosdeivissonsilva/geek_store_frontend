import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.type';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [
    DefaultHomepage,
    CommonModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})

export class Products implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  selectedCategory: string = 'all';

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastService: ToastrService,
    private cartService: CartService,
  ){}

  ngOnInit() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    const authToken = sessionStorage.getItem('auth-token');
    
    if (!authToken) {
      this.toastService.warning('Você precisa estar autenticado para acessar esta página.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.toastService.error("Erro ao carregar produtos. Tente novamente mais tarde.");
        this.products = [];
        this.loading = false;
      }
    });
  }

  getImageUrl(imagePath: string | null): string {
    return this.productService.getImageUrl(imagePath);
  }

  navigateToUserPage(){
    this.router.navigate(['user'])
  }

  navigateToProductsPage(){
    this.router.navigate(['products'])
  }

  navigateToCartPage(){
    this.router.navigate(['cart'])
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.category.toLowerCase() === this.selectedCategory.toLowerCase());
  }

  get uniqueCategories(): string[] {
    const categories = this.products.map(p => p.category);
    return Array.from(new Set(categories));
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    this.toastService.success(`${product.name} adicionado ao carrinho!`);
  }
}