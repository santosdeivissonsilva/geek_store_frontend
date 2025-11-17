import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { UserComponent } from './pages/user/user';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
    // {
    //     path: "",
    //     component: HomePage
    // },
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
        path: "user/:id",
        component: UserComponent,
        canActivate: [AuthGuard]
    }
    // {
    //     path: 'admin',
    //     component: AdminPage,
    // },
];
