import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  currentPassword: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-user',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    CommonModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {
  userForm!: FormGroup<UserForm>;
  isEditMode: boolean = false;
  isSaving: boolean = false;
  apiUrl: string = "http://localhost:8080";

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private toastService: ToastrService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      currentPassword: new FormControl(''),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value && confirmPassword.value) {
      if (newPassword.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  ngOnInit() {
    this.loadUserData();
    this.updateFormState();
  }

  loadUserData() {
    const token = sessionStorage.getItem('auth-token');
    const username = sessionStorage.getItem('username');
    
    if (username) {
      const email = sessionStorage.getItem('email') || '';
      this.userForm.patchValue({
        name: username,
        email: email || ''
      });
    }
    
    if (token) {
      this.httpClient.get<any>(`${this.apiUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe({
        next: (userData) => {
          this.userForm.patchValue({
            name: userData.name || username || '',
            email: userData.email || ''
          });
          if (userData.name) {
            sessionStorage.setItem('username', userData.name);
          }
          if (userData.email) {
            sessionStorage.setItem('email', userData.email);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      });
    }
  }

  updateFormState() {
    if (this.isEditMode) {
      this.userForm.get('name')?.enable();
      this.userForm.get('email')?.enable();
    } else {
      this.userForm.get('name')?.disable();
      this.userForm.get('email')?.disable();
    }
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.loadUserData();
      this.userForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    this.isEditMode = !this.isEditMode;
    this.updateFormState();
  }

  saveChanges() {
    if (!this.userForm.valid) {
      this.toastService.error('Por favor, preencha todos os campos obrigatórios corretamente');
      return;
    }

    const formValue = this.userForm.value;
    
    if (formValue.newPassword && formValue.newPassword !== formValue.confirmPassword) {
      this.toastService.error('As senhas não coincidem');
      return;
    }

    if (formValue.newPassword && !formValue.currentPassword) {
      this.toastService.error('Por favor, informe sua senha atual para alterar a senha');
      return;
    }

    this.isSaving = true;
    const token = sessionStorage.getItem('auth-token');

    const updateData: any = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.newPassword) {
      updateData.currentPassword = formValue.currentPassword;
      updateData.newPassword = formValue.newPassword;
    }

    this.httpClient.put(`${this.apiUrl}/user`, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        this.toastService.success('Informações atualizadas com sucesso!');
        sessionStorage.setItem('username', formValue.name || '');
        sessionStorage.setItem('email', formValue.email || '');
        this.isEditMode = false;
        this.userForm.patchValue({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        this.isSaving = false;
      },
      error: (error) => {
        this.toastService.error('Erro ao atualizar informações. Tente novamente.');
        console.error('Error updating user:', error);
        this.isSaving = false;
      }
    });
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToPurchases() {
    this.router.navigate(['/purchases']);
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    this.toastService.success('Logout realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
