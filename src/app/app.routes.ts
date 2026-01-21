import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent }
];
