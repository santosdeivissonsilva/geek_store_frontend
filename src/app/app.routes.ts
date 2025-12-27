import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { UserComponent } from './pages/user/user';
import { AuthGuard } from './services/auth-guard';
import { Products } from './pages/products/products';
import { HomeComponent } from './pages/home/home';
import { AdminPage } from './pages/admin/admin';
import { AdminGuard } from './services/admin-guard';
import { CartComponent } from './pages/cart/cart';
import { UsersManagementComponent } from './pages/users-management/users-management';
import { SalesManagementComponent } from './pages/sales-management/sales-management';
import { MyPurchasesComponent } from './pages/my-purchases/my-purchases';
import { PurchaseDetailsComponent } from './pages/purchase-details/purchase-details';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Geek Store - Bem-vindo"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Geek Store - Login"
    },
    {
        path: "signup",
        component: SignupComponent,
        title: "Geek Store - Crie sua conta"
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "products",
        component:Products,
        title: "Geek Store - Loja especializada em Funkos Geek",
        canActivate: [AuthGuard]
    },
    {
        path: "cart",
        component: CartComponent,
        title: "Geek Store - Carrinho de Compras",
        canActivate: [AuthGuard]
    },
    {
        path: "admin",
        component: AdminPage,
        title: "Geek Store - Painel Administrativo",
        canActivate: [AdminGuard]
    },
    {
        path: "admin/users",
        component: UsersManagementComponent,
        title: "Geek Store - Controle de Usuários",
        canActivate: [AdminGuard]
    },
    {
        path: "admin/sales",
        component: SalesManagementComponent,
        title: "Geek Store - Registro de Vendas",
        canActivate: [AdminGuard]
    },
    {
        path: "admin/sales/:id",
        component: PurchaseDetailsComponent,
        title: "Geek Store - Detalhes da Venda",
        canActivate: [AdminGuard]
    },
    {
        path: "purchases",
        component: MyPurchasesComponent,
        title: "Geek Store - Minhas Compras",
        canActivate: [AuthGuard]
    },
    {
        path: "purchases/:id",
        component: PurchaseDetailsComponent,
        title: "Geek Store - Detalhes da Compra",
        canActivate: [AuthGuard]
    }
];
