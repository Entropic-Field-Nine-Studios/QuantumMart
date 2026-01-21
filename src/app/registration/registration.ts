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
    password: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required)
  });
  
  constructor(private userService: UserService) {}

  registerUser() {
    if (this.isValidForm()) {
      const newUser: User = {
        username: this.registerForm.value.username!,
        rawPassword: this.registerForm.value.password!
      };

      const res = this.userService.createUser(newUser);

      res.subscribe(data => {
        console.log("Username is " + data.username);
      });

      alert("User created successfully.");

      // TODO Uncomment this and finish registration
      // this.registerForm.reset();
    }
  }

  private isValidForm(): boolean {
    return this.registerForm.valid && this.registerForm.value.password! === this.registerForm.value.password2!;
  }
}
