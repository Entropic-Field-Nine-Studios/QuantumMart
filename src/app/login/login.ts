import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import { jwtDecode } from 'jwt-decode';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  formValid(): boolean {
    this.btnLoginDisabled = !this.loginForm.valid;

    return this.loginForm.valid;
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;

      this.authService.login(username, password).subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);

          const payload = jwtDecode(res.token);

          console.log(payload);
          
          this.router.navigate(['/home']);
        },
        error: _ => alert("Invalid credentials.")
      });
    }
  }
}
