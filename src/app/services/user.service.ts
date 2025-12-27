import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = "http://localhost:8080/user";
  apiUrlRegister: string = "http://localhost:8080/auth/register";

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + "/" + id, user, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + "/" + id, {
      headers: this.getAuthHeaders()
    });
  }

  updateUserRole(id: string, role: string): Observable<User> {
    return this.httpClient.put<User>(this.apiUrl + "/" + id + "/role", { role }, {
      headers: this.getAuthHeaders()
    });
  }

  createUser(user: { name: string; email: string; password: string; role?: string }): Observable<User> {
    return this.httpClient.post<User>(this.apiUrlRegister, user, {
      headers: this.getAuthHeaders()
    });
  }
}

