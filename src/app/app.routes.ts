import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { SupportComponent } from './support/support.component';
import { userRedirectGuard } from './users/user-redirect.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { checkoutGuard } from './checkout/checkout.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: SupportComponent },
  { path: 'login', component: LoginComponent, canActivate: [userRedirectGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [userRedirectGuard] },
  { path: 'profile/:userid', component: UserProfileComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [checkoutGuard] },
  { path: '**', component: NotFoundComponent }, // Please keep this route at the bottom
];
