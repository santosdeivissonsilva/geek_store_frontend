import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../types/sale.type';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  apiUrl: string = "http://localhost:8080/sale";

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSales(): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getSaleById(id: string): Observable<Sale> {
    return this.httpClient.get<Sale>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  getSalesByDateRange(startDate: string, endDate: string): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(this.apiUrl + "/date-range", {
      params: { startDate, endDate },
      headers: this.getAuthHeaders()
    });
  }

  getSalesByUser(userId: string): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(this.apiUrl + "/user/" + userId, {
      headers: this.getAuthHeaders()
    });
  }

  // Endpoints para usuários autenticados
  getMyPurchases(): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(this.apiUrl + "/my-purchases", {
      headers: this.getAuthHeaders()
    });
  }

  getMyPurchaseById(id: string): Observable<Sale> {
    return this.httpClient.get<Sale>(this.apiUrl + "/my-purchases/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  // Endpoints para ADMIN
  createSale(sale: Partial<Sale>): Observable<Sale> {
    return this.httpClient.post<Sale>(this.apiUrl, sale, {
      headers: this.getAuthHeaders()
    });
  }

  deleteSale(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }
}

