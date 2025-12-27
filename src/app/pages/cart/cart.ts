import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [
    DefaultHomepage,
    CommonModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private toastService: ToastrService,
  ){}

  ngOnInit() {
    this.checkAuthorization();
    this.loadCartItems();
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  checkAuthorization() {
    const authToken = sessionStorage.getItem('auth-token');
    
    if (!authToken) {
      this.toastService.warning('Você precisa estar autenticado para acessar o carrinho.');
      this.router.navigate(['/login']);
      return;
    }
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
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

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.product.id, newQuantity);
      this.toastService.success('Quantidade atualizada!');
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
    this.toastService.success('Produto removido do carrinho!');
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  }

  clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.cartService.clearCart();
      this.toastService.success('Carrinho limpo!');
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      this.toastService.warning('Seu carrinho está vazio!');
      return;
    }
    // TODO: Implementar checkout quando o endpoint estiver disponível
    this.toastService.info('Funcionalidade de checkout em desenvolvimento!');
  }
}

