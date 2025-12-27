import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.type';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input';

interface ProductForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<string | null>;
  image: FormControl<File | null>;
  category: FormControl<string | null>;
  quantity: FormControl<string | null>;
}

@Component({
  selector: 'app-admin',
  imports: [
    DefaultHomepage,
    CommonModule,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminPage implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  productForm!: FormGroup<ProductForm>;
  editingProduct: Product | null = null;
  showForm: boolean = false;
  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastService: ToastrService
  ){
    this.initializeForm();
  }

  ngOnInit() {
    this.loadProducts();
  }

  initializeForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+([.,]\d{1,2})?$/)]),
      image: new FormControl<File | null>(null),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)])
    });
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

  navigateToUserPage(){
    this.router.navigate(['user'])
  }

  navigateToProductsPage(){
    this.router.navigate(['products'])
  }

  navigateToCartPage(){
    this.router.navigate(['cart'])
  }

  navigateToUsersManagement(){
    this.router.navigate(['admin/users'])
  }

  navigateToSalesManagement(){
    this.router.navigate(['admin/sales'])
  }

  openCreateForm() {
    this.editingProduct = null;
    this.productForm.reset();
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.showForm = true;
  }

  openEditForm(product: Product) {
    this.editingProduct = product;
    this.selectedImageFile = null;
    this.imagePreview = product.image ? this.getImageUrl(product.image) : null;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: (product.price / 100).toFixed(2).replace('.', ','), // Convert from cents to reais
      image: null,
      category: product.category,
      quantity: product.quantity?.toString() || '0'
    });
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.editingProduct = null;
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.productForm.reset();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.toastService.error('Por favor, selecione um arquivo de imagem válido.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.toastService.error('A imagem deve ter no máximo 5MB.');
        return;
      }
      
      this.selectedImageFile = file;
      this.productForm.patchValue({ image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.productForm.invalid) {
      this.toastService.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Check if image is required (for new products or if editing and new image selected)
    if (!this.editingProduct && !this.selectedImageFile) {
      this.toastService.error("Por favor, selecione uma imagem para o produto.");
      return;
    }

    const formValue = this.productForm.value;
    // Convert price string to number (handles both comma and dot as decimal separator)
    const priceValue = parseFloat((formValue.price || '0').replace(',', '.'));

    if (this.editingProduct) {
      // Update existing product
      // If no new image selected, use existing image URL
      const imageData = this.selectedImageFile || this.editingProduct.image;
      const quantityValue = parseInt(formValue.quantity || '0', 10);
      const productData = {
        name: formValue.name!,
        description: formValue.description!,
        price: Math.round(priceValue * 100), // Convert to cents
        image: typeof imageData === 'string' ? imageData : undefined,
        category: formValue.category!,
        quantity: quantityValue
      };

      if (this.selectedImageFile) {
        // Send with file
        this.productService.updateProductWithFile(this.editingProduct.id, productData, this.selectedImageFile).subscribe({
          next: () => {
            this.toastService.success("Produto atualizado com sucesso!");
            this.loadProducts();
            this.cancelForm();
          },
          error: () => {
            this.toastService.error("Erro ao atualizar produto. Tente novamente.");
          }
        });
      } else {
        // Send without file (only data)
        this.productService.updateProduct(this.editingProduct.id, productData).subscribe({
          next: () => {
            this.toastService.success("Produto atualizado com sucesso!");
            this.loadProducts();
            this.cancelForm();
          },
          error: () => {
            this.toastService.error("Erro ao atualizar produto. Tente novamente.");
          }
        });
      }
    } else {
      // Create new product with file
      const quantityValue = parseInt(formValue.quantity || '0', 10);
      const productData = {
        name: formValue.name!,
        description: formValue.description!,
        price: Math.round(priceValue * 100), // Convert to cents
        category: formValue.category!,
        quantity: quantityValue
      };

      this.productService.createProductWithFile(productData, this.selectedImageFile!).subscribe({
        next: () => {
          this.toastService.success("Produto cadastrado com sucesso!");
          this.loadProducts();
          this.cancelForm();
        },
        error: () => {
          this.toastService.error("Erro ao cadastrar produto. Tente novamente.");
        }
      });
    }
  }

  deleteProduct(product: Product) {
    if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.toastService.success("Produto excluído com sucesso!");
          this.loadProducts();
        },
        error: () => {
          this.toastService.error("Erro ao excluir produto. Tente novamente.");
        }
      });
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  }

  getImageUrl(imagePath: string | null): string {
    return this.productService.getImageUrl(imagePath);
  }
}

