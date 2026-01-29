import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';
import { HomeComponent } from './home/home';
import { AboutUs } from './about-us/about-us';
import { Support } from './support/support';
import { ItemListingResolver } from './item-listings/item-listing.resolver';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, resolve: { listings: ItemListingResolver } },
    { path: "about-us", component: AboutUs },
    { path: "contact", component: Support },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent }
];
