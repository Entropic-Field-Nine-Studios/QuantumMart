import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';
import { HomeComponent } from './home/home';
import { UserProfile } from './user-profile/user-profile';

import { AboutUs } from './about-us/about-us';
import { Support } from './support/support';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUs },
  { path: 'contact', component: Support },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'profile/:userid', component: UserProfile },
];
