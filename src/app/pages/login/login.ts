import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr'

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    const email = this.loginForm.value.email;
    this.loginService.login(email, this.loginForm.value.password).subscribe({
      next: () => {
        // Salva o email usado no login
        if (email) {
          sessionStorage.setItem('email', email);
        }
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(['/products']);
      },
      error: (error) => {
        let errorMessage = "Erro inesperado! Tente novamente mais tarde";
        
        if (error.status === 401 || error.status === 403) {
          // Verifica se a mensagem de erro indica senha incorreta
          const errorText = error.error?.message || error.message || '';
          const errorTextLower = errorText.toLowerCase();
          
          if (errorTextLower.includes('senha') || errorTextLower.includes('password') || 
              errorTextLower.includes('credenciais') || errorTextLower.includes('credentials') ||
              errorTextLower.includes('incorret') || errorTextLower.includes('invalid')) {
            errorMessage = "Senha incorreta. Verifique suas credenciais e tente novamente.";
          } else if (errorTextLower.includes('usuário') || errorTextLower.includes('user') ||
                     errorTextLower.includes('não encontrado') || errorTextLower.includes('not found')) {
            errorMessage = "Usuário não encontrado. Verifique seu email e tente novamente.";
          } else {
            errorMessage = "Email ou senha incorretos. Verifique suas credenciais e tente novamente.";
          }
        } else if (error.status === 404) {
          errorMessage = "Usuário não encontrado. Verifique seu email e tente novamente.";
        } else if (error.status === 0 || error.status >= 500) {
          errorMessage = "Erro no servidor. Tente novamente mais tarde.";
        }
        
        this.toastService.error(errorMessage);
      }
    })
  }

  navigate(){
    this.router.navigate(['signup'])
  }
}