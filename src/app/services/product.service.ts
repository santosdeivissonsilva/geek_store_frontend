import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = "http://localhost:8080/product";
  baseUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      return '/assets/no-image.png'; // imagem padrão
    }
    // O backend retorna o caminho como "uploads/images/{filename}"
    // Construímos a URL completa: http://localhost:8080/uploads/images/{filename}
    return `${this.baseUrl}/${imagePath}`;
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl + "/register", product, {
      headers: this.getAuthHeaders()
    });
  }

  createProductWithFile(product: Omit<Product, 'id' | 'image'>, imageFile: File): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('quantity', (product.quantity ?? 0).toString());
    formData.append('image', imageFile);

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Product>(this.apiUrl + "/register", formData, {
      headers: headers
    });
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl + "/update" + "/" + id, product, {
      headers: this.getAuthHeaders()
    });
  }

  updateProductWithFile(id: string, product: Partial<Omit<Product, 'id' | 'image'>>, imageFile: File): Observable<Product> {
    const formData = new FormData();
    if (product.name) formData.append('name', product.name);
    if (product.description) formData.append('description', product.description);
    if (product.price !== undefined) formData.append('price', product.price.toString());
    if (product.category) formData.append('category', product.category);
    if (product.quantity !== undefined) formData.append('quantity', product.quantity.toString());
    formData.append('image', imageFile);

    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put<Product>(this.apiUrl + "/update" + "/" + id, formData, {
      headers: headers
    });
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }
}

