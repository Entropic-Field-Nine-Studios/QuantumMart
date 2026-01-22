import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-registration',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class RegistrationComponent {

  registerForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.email),
    password: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required)
  });

  btnRegisterDisabled = true;
  
  constructor(private userService: UserService) {}

  registerUser() {
    if (this.isValidForm()) {
      const usernameInput = this.registerForm.value.username!

      this.userService.getUserByUsername(usernameInput).subscribe(existingUser => {
        if (existingUser != null) {
          alert("Error: Username is taken.");

          return;
        }

        const newUser: User = {
          username: usernameInput,
          rawPassword: this.registerForm.value.password!,
          email: this.registerForm.value.email ?? ""
        };

        const res = this.userService.createUser(newUser);

        res.subscribe(data => {
          console.log("Username is " + data.username);
        });

        alert("User created successfully.");
      });
    }
  }

  isValidForm(): boolean {
    const valid = this.registerForm.valid && this.registerForm.value.password! === this.registerForm.value.password2!;

    this.btnRegisterDisabled = !valid;

    return valid;
  }
}
