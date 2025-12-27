import { Component, OnInit } from '@angular/core';
import { DefaultHomepage } from '../../components/default-homepage/default-homepage';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input';

interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  role: FormControl<string | null>;
}

@Component({
  selector: 'app-users-management',
  imports: [
    DefaultHomepage,
    CommonModule,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './users-management.html',
  styleUrl: './users-management.scss',
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  userForm!: FormGroup<UserForm>;
  editingUser: User | null = null;
  showForm: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService
  ){
    this.initializeForm();
  }

  ngOnInit() {
    this.loadUsers();
  }

  initializeForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      role: new FormControl('USER', [Validators.required])
    });
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = Array.isArray(users) ? users : [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.toastService.error("Erro ao carregar usuários. Tente novamente mais tarde.");
        this.users = [];
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

  openCreateForm() {
    this.editingUser = null;
    this.userForm.reset();
    // Reset form state
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.setErrors(null);
    });
    this.userForm.patchValue({ role: 'USER' });
    // Senha é obrigatória apenas na criação
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  openEditForm(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: '', // Não preenche senha na edição
      role: user.role || 'USER'
    });
    // Senha não é obrigatória na edição
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.editingUser = null;
    this.userForm.reset();
    this.userForm.patchValue({ role: 'USER' });
    // Reset validators
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
  }

  submitForm() {
    // Marca todos os campos como touched para mostrar erros
    this.userForm.markAllAsTouched();
    
    if (this.userForm.invalid) {
      // Verifica qual campo está inválido para dar feedback específico
      if (this.userForm.get('name')?.invalid) {
        this.toastService.error("Nome deve ter no mínimo 3 caracteres.");
      } else if (this.userForm.get('email')?.invalid) {
        this.toastService.error("Email inválido. Verifique o formato.");
      } else if (this.userForm.get('password')?.invalid && !this.editingUser) {
        this.toastService.error("Senha deve ter no mínimo 6 caracteres.");
      } else {
        this.toastService.error("Por favor, preencha todos os campos corretamente.");
      }
      return;
    }

    const formValue = this.userForm.value;

    if (this.editingUser) {
      // Update existing user
      const userData: any = {
        name: formValue.name!,
        email: formValue.email!,
        role: formValue.role!
      };

      // Só inclui senha se foi preenchida
      if (formValue.password && formValue.password.length >= 6) {
        userData.password = formValue.password;
      }

      this.userService.updateUser(this.editingUser.id, userData).subscribe({
        next: () => {
          this.toastService.success("Usuário atualizado com sucesso!");
          this.loadUsers();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
          const errorMessage = error.error?.message || "Erro ao atualizar usuário. Tente novamente.";
          this.toastService.error(errorMessage);
        }
      });
    } else {
      // Create new user
      if (!formValue.password || formValue.password.length < 6) {
        this.toastService.error("A senha deve ter no mínimo 6 caracteres.");
        return;
      }

      const userData = {
        name: formValue.name!,
        email: formValue.email!,
        password: formValue.password!,
        role: formValue.role || 'USER'
      };

      console.log('Criando usuário com dados:', { ...userData, password: '***' }); // Log sem senha

      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.toastService.success("Usuário cadastrado com sucesso!");
          this.loadUsers();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          let errorMessage = "Erro ao cadastrar usuário. Tente novamente.";
          
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 409) {
            errorMessage = "Email já cadastrado. Use outro email.";
          } else if (error.status === 400) {
            errorMessage = "Dados inválidos. Verifique as informações e tente novamente.";
          } else if (error.status === 401 || error.status === 403) {
            errorMessage = "Você não tem permissão para criar usuários.";
          } else if (error.status === 0) {
            errorMessage = "Erro de conexão. Verifique se o servidor está rodando.";
          } else if (error.status >= 500) {
            errorMessage = "Erro no servidor. Tente novamente mais tarde.";
          }
          
          this.toastService.error(errorMessage);
        }
      });
    }
  }

  deleteUser(user: User) {
    if (confirm(`Tem certeza que deseja excluir o usuário "${user.name}"?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.toastService.success("Usuário excluído com sucesso!");
          this.loadUsers();
        },
        error: () => {
          this.toastService.error("Erro ao excluir usuário. Tente novamente.");
        }
      });
    }
  }

  updateUserRole(user: User, newRole: string) {
    if (user.role === newRole) {
      return;
    }

    this.userService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        this.toastService.success(`Role do usuário atualizada para ${newRole}`);
        this.loadUsers();
      },
      error: () => {
        this.toastService.error("Erro ao atualizar role do usuário. Tente novamente.");
      }
    });
  }

  getRoleBadgeClass(role: string | undefined): string {
    if (role === 'ADMIN') {
      return 'badge-admin';
    }
    return 'badge-user';
  }
}

