import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    const userRole = sessionStorage.getItem('user-role');

    // Verifica se há token e se a role é ADMIN
    if (authToken && userRole === 'ADMIN') {
      return true;
    } else {
      // Se não tiver token, redireciona para login
      // Se tiver token mas não for ADMIN, redireciona para login também
      this.router.navigate(['/login']);
      return false;
    }
  }
}

