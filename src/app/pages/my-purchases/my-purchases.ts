import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../types/sale.type';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-purchases',
  imports: [
    DefaultHomepage,
    CommonModule
  ],
  templateUrl: './my-purchases.html',
  styleUrl: './my-purchases.scss',
})
export class MyPurchasesComponent implements OnInit {
  purchases: Sale[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private saleService: SaleService,
    private toastService: ToastrService
  ){}

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    this.loading = true;
    this.saleService.getMyPurchases().subscribe({
      next: (purchases) => {
        this.purchases = Array.isArray(purchases) ? purchases : [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar compras:', error);
        this.toastService.error("Erro ao carregar suas compras. Tente novamente mais tarde.");
        this.purchases = [];
        this.loading = false;
      }
    });
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

  navigateToPurchaseDetails(id: string) {
    this.router.navigate(['purchases', id]);
  }

  formatPrice(price: number | string | null | undefined): string {
    let numericPrice: number;
    
    if (price === null || price === undefined) {
      return 'R$ 0,00';
    }
    
    if (typeof price === 'string') {
      numericPrice = parseInt(price, 10);
    } else {
      numericPrice = Math.round(price);
    }
    
    if (isNaN(numericPrice)) {
      return 'R$ 0,00';
    }
    
    const priceInReais = numericPrice / 100;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceInReais);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getItemPrice(item: any): number {
    return item.price || item.unitPrice || item.pricePerUnit || item.itemPrice || 0;
  }

  calculateSubtotal(item: any): number {
    const price = this.getItemPrice(item);
    
    let numericPrice: number;
    if (price === null || price === undefined) {
      numericPrice = 0;
    } else if (typeof price === 'string') {
      numericPrice = parseInt(price, 10);
    } else {
      numericPrice = Math.round(price);
    }
    
    let numericQuantity: number;
    const quantity = item.quantity;
    if (quantity === null || quantity === undefined) {
      numericQuantity = 0;
    } else if (typeof quantity === 'string') {
      numericQuantity = parseInt(quantity, 10);
    } else {
      numericQuantity = Math.round(quantity);
    }
    
    const subtotal = numericPrice * numericQuantity;
    if (isNaN(subtotal)) {
      return 0;
    }
    return subtotal;
  }

  getStatusBadgeClass(status: string | undefined): string {
    if (!status) return 'badge-default';
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'concluido') {
      return 'badge-success';
    }
    if (statusLower === 'pending' || statusLower === 'pendente') {
      return 'badge-warning';
    }
    if (statusLower === 'cancelled' || statusLower === 'cancelado') {
      return 'badge-danger';
    }
    return 'badge-default';
  }
}

