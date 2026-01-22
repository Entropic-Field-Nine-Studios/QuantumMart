import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';
import { App } from './app';

export const routes: Routes = [
    { path: "", component: App },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent }
];
