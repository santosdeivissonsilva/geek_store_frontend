import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { Sale, SaleItem } from '../../types/sale.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { User } from '../../types/user.type';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-sales-management',
  imports: [
    DefaultHomepage,
    CommonModule,
    FormsModule
  ],
  templateUrl: './sales-management.html',
  styleUrl: './sales-management.scss',
})
export class SalesManagementComponent implements OnInit {
  sales: Sale[] = [];
  loading: boolean = true;
  filteredSales: Sale[] = [];
  searchTerm: string = '';
  selectedDateFilter: string = 'all';
  showCreateForm: boolean = false;
  users: User[] = [];
  products: Product[] = [];
  selectedUserId: string = '';
  saleItems: Array<{productId: string, quantity: number}> = [];
  selectedProductId: string = '';
  selectedQuantity: number = 1;

  constructor(
    private router: Router,
    private saleService: SaleService,
    private toastService: ToastrService,
    private userService: UserService,
    private productService: ProductService
  ){}

  ngOnInit() {
    this.loadSales();
  }

  openCreateSaleForm() {
    this.showCreateForm = true;
    this.loadUsers();
    this.loadProducts();
  }

  cancelCreateForm() {
    this.showCreateForm = false;
    this.selectedUserId = '';
    this.saleItems = [];
    this.selectedProductId = '';
    this.selectedQuantity = 1;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = Array.isArray(users) ? users : [];
      },
      error: () => {
        this.toastService.error("Erro ao carregar usuários.");
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
      },
      error: () => {
        this.toastService.error("Erro ao carregar produtos.");
      }
    });
  }

  addItemToSale() {
    if (!this.selectedProductId || this.selectedQuantity < 1) {
      this.toastService.error("Selecione um produto e informe a quantidade.");
      return;
    }

    const product = this.products.find(p => p.id === this.selectedProductId);
    if (!product) {
      this.toastService.error("Produto não encontrado.");
      return;
    }

    const existingItem = this.saleItems.find(item => item.productId === this.selectedProductId);
    if (existingItem) {
      existingItem.quantity += this.selectedQuantity;
    } else {
      this.saleItems.push({
        productId: this.selectedProductId,
        quantity: this.selectedQuantity
      });
    }

    this.selectedProductId = '';
    this.selectedQuantity = 1;
  }

  removeItemFromSale(index: number) {
    this.saleItems.splice(index, 1);
  }

  createSale() {
    if (!this.selectedUserId) {
      this.toastService.error("Selecione um usuário.");
      return;
    }

    if (this.saleItems.length === 0) {
      this.toastService.error("Adicione pelo menos um item à venda.");
      return;
    }

    const selectedUser = this.users.find(u => u.id === this.selectedUserId);
    if (!selectedUser) {
      this.toastService.error("Usuário não encontrado.");
      return;
    }

    // Calcula o total
    let total = 0;
    const items: SaleItem[] = this.saleItems.map(item => {
      const product = this.products.find(p => p.id === item.productId);
      if (!product) {
        return null;
      }
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      return {
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price
      };
    }).filter(item => item !== null) as SaleItem[];

    const saleData = {
      userId: this.selectedUserId,
      items: items,
      total: total,
      status: 'completed'
    };

    this.saleService.createSale(saleData).subscribe({
      next: () => {
        this.toastService.success("Venda criada com sucesso!");
        this.loadSales();
        this.cancelCreateForm();
      },
      error: (error) => {
        console.error('Erro ao criar venda:', error);
        const errorMessage = error.error?.message || "Erro ao criar venda. Tente novamente.";
        this.toastService.error(errorMessage);
      }
    });
  }

  loadSales() {
    this.loading = true;
    this.saleService.getAllSales().subscribe({
      next: (sales) => {
        this.sales = Array.isArray(sales) ? sales : [];
        this.filteredSales = [...this.sales];
        
        // Debug: log dos dados recebidos
        if (this.sales.length > 0) {
          console.log('Vendas carregadas:', this.sales);
          console.log('Primeira venda completa:', JSON.stringify(this.sales[0], null, 2));
          if (this.sales[0].items && this.sales[0].items.length > 0) {
            console.log('Primeiro item completo:', JSON.stringify(this.sales[0].items[0], null, 2));
            console.log('Chaves do item:', Object.keys(this.sales[0].items[0]));
            console.log('Price do item:', this.sales[0].items[0].price, 'tipo:', typeof this.sales[0].items[0].price);
            console.log('Quantity do item:', this.sales[0].items[0].quantity, 'tipo:', typeof this.sales[0].items[0].quantity);
          }
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas:', error);
        this.toastService.error("Erro ao carregar vendas. Tente novamente mais tarde.");
        this.sales = [];
        this.filteredSales = [];
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

  navigateToAdminPage(){
    this.router.navigate(['admin'])
  }

  navigateToSaleDetails(id: string) {
    this.router.navigate(['admin/sales', id]);
  }

  deleteSale(sale: Sale) {
    if (confirm(`Tem certeza que deseja excluir a venda "${sale.id.substring(0, 8)}"?`)) {
      this.saleService.deleteSale(sale.id).subscribe({
        next: () => {
          this.toastService.success("Venda excluída com sucesso!");
          this.loadSales();
        },
        error: () => {
          this.toastService.error("Erro ao excluir venda. Tente novamente.");
        }
      });
    }
  }

  getItemPrice(item: any): number {
    // Tenta encontrar o preço em diferentes campos possíveis
    return item.price || item.unitPrice || item.pricePerUnit || item.itemPrice || 0;
  }

  formatPrice(price: number | string | null | undefined): string {
    // Converte para número se for string
    let numericPrice: number;
    
    if (price === null || price === undefined) {
      return 'R$ 0,00';
    }
    
    if (typeof price === 'string') {
      numericPrice = parseInt(price, 10);
    } else {
      numericPrice = Math.round(price); // Garante que é inteiro
    }
    
    // Verifica se é um número válido
    if (isNaN(numericPrice)) {
      return 'R$ 0,00';
    }
    
    // O backend envia valores em centavos (INT), então divide por 100
    const priceInReais = numericPrice / 100;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceInReais);
  }

  calculateSubtotal(item: any): number {
    // Obtém o preço do item (tenta diferentes campos)
    const price = this.getItemPrice(item);
    
    // Converte price para número inteiro
    let numericPrice: number;
    if (price === null || price === undefined) {
      console.warn('Price é undefined ou null no item:', item);
      numericPrice = 0;
    } else if (typeof price === 'string') {
      numericPrice = parseInt(price, 10);
    } else {
      numericPrice = Math.round(price);
    }
    
    // Converte quantity para número inteiro
    let numericQuantity: number;
    const quantity = item.quantity;
    if (quantity === null || quantity === undefined) {
      console.warn('Quantity é undefined ou null no item:', item);
      numericQuantity = 0;
    } else if (typeof quantity === 'string') {
      numericQuantity = parseInt(quantity, 10);
    } else {
      numericQuantity = Math.round(quantity);
    }
    
    // Retorna o subtotal em centavos (INT)
    const subtotal = numericPrice * numericQuantity;
    if (isNaN(subtotal)) {
      console.error('Subtotal é NaN. Item completo:', item);
      return 0;
    }
    return subtotal;
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

  getTotalSales(): number {
    return this.filteredSales.reduce((total, sale) => {
      // O backend envia valores em centavos (INT)
      const saleTotal = typeof sale.total === 'string' 
        ? parseInt(sale.total, 10) 
        : (Math.round(sale.total || 0));
      
      if (isNaN(saleTotal)) {
        return total;
      }
      
      // Retorna em centavos para manter consistência
      return total + saleTotal;
    }, 0);
  }

  getTotalItems(): number {
    return this.filteredSales.reduce((total, sale) => {
      return total + sale.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0);
    }, 0);
  }

  filterSales() {
    this.filteredSales = this.sales.filter(sale => {
      const matchesSearch = !this.searchTerm || 
        sale.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sale.userEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sale.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      if (this.selectedDateFilter === 'all') {
        return true;
      }

      const saleDate = new Date(sale.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (this.selectedDateFilter) {
        case 'today':
          return saleDate >= today;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return saleDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return saleDate >= monthAgo;
        default:
          return true;
      }
    });
  }

  onSearchChange() {
    this.filterSales();
  }

  onDateFilterChange() {
    this.filterSales();
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

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product?.name || 'Produto não encontrado';
  }

  getProductPrice(productId: string): number {
    const product = this.products.find(p => p.id === productId);
    return product?.price || 0;
  }

  getSaleTotal(): number {
    return this.saleItems.reduce((total, item) => {
      const product = this.products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }
}

