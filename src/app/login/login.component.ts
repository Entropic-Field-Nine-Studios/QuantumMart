import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserStore } from '../core/stores/user.store';
import { MessageService } from '../shared/message/message.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  btnLoginDisabled = true;
  readonly loading = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  userStore = inject(UserStore);

  formValid(): boolean {
    this.btnLoginDisabled = !this.loginForm.valid;

    return this.loginForm.valid;
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;

      this.loading.set(true);
      this.authService
        .login(username, password)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (res) => {
            this.authService.setToken(res.token);
            this.userStore.init();
            this.router.navigate(['/home']);
          },
          error: (err: HttpErrorResponse) => {
            switch (err.status) {
              case 400:
                this.messageService.error('Invalid credentials');
                break;
              default:
                this.messageService.error(err.message);
            }
          },
        });
    }
  }
}
