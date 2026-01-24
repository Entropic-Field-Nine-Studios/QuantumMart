import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  btnLoginDisabled = true;

  constructor(private authService: AuthService) {}

  formValid(): boolean {
    this.btnLoginDisabled = !this.loginForm.valid;

    return this.loginForm.valid;
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;

      this.authService.passwordMatches(username, password).subscribe({
        next: matches => {
          if (matches) {
            alert("User can login!");
          } else {
            alert("Invalid username or password.");
          }
        },
        error: (err: HttpErrorResponse) => alert(err.message)
      });
    }
  }
}
