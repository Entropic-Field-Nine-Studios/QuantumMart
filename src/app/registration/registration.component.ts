import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../users/user.service';
import { RegisterUserInfo } from '../users/register-user-info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-registration',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registerForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.email),
    password: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required),
  });

  btnRegisterDisabled = true;
  loading = false;

  private userService = inject(UserService);
  private router = inject(Router);

  registerUser() {
    if (this.isValidForm()) {
      const usernameInput = this.registerForm.value.username!;
      const newUser: RegisterUserInfo = {
        username: usernameInput,
        rawPassword: this.registerForm.value.password!,
        email: this.registerForm.value.email ?? '',
      };

      this.loading = true;
      this.userService.createUser(newUser).subscribe({
        next: () => {
          alert('User registered successfully!');
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          switch (err.status) {
            case 409:
              alert('Username already in use.');
              break;
            default:
              alert(err.message);
          }
        },
      });
    }
  }

  isValidForm(): boolean {
    const pass1 = this.registerForm.value.password!;
    const pass2 = this.registerForm.value.password2!;
    const valid = this.registerForm.valid && pass1 === pass2;

    this.btnRegisterDisabled = !valid;

    return valid;
  }
}
