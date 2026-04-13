import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { userRedirectGuard } from './users/user-redirect.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { checkoutGuard } from './checkout/checkout.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { authGuard } from './auth/auth.guard';
import { CreateItemListingComponent } from './create-item-listing/create-item-listing.component';
import { createItemListingGuard } from './create-item-listing/create-item-listing.guard';
import { CartComponent } from './cart/cart.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SavedAddressesComponent } from './user-settings/saved-addresses/saved-addresses.component';
import { CreateAddressComponent } from './user-settings/saved-addresses/create-address/create-address.component';
import { ItemListingPageComponent } from './item-listings/item-listing-page/item-listing-page.component';
import { EditItemListingComponent } from './item-listings/edit-item-listing/edit-item-listing.component';
import { editItemListingGuard } from './item-listings/edit-item-listing.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
  { path: 'login', component: LoginComponent, canActivate: [userRedirectGuard], title: 'Login' },
  { path: 'register', component: RegistrationComponent, canActivate: [userRedirectGuard], title: 'Regesiter' },
  { path: 'profile/:userid', component: UserProfileComponent, title: 'Profile' },
  { path: 'listing/:listid', component: ItemListingPageComponent, title: 'Listing'  },
  {
    path: 'listing/:listid/edit',
    component: EditItemListingComponent,
    canActivate: [editItemListingGuard],
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [checkoutGuard], title: 'Checkout'  },
  { path: 'dashboard', component: SellerDashboardComponent, canActivate: [authGuard], title: 'Dashboard'  },
  {
    path: 'create-listing',
    component: CreateItemListingComponent,
    canActivate: [authGuard],
    canDeactivate: [createItemListingGuard],
    title: 'Create Listing' 
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    title: 'Cart' 
  },
  {
    path: 'purchases',
    component: PurchasesComponent,
    canActivate: [authGuard],
    title: 'Purchases' 
  },
  {
    path: 'account-settings',
    component: UserSettingsComponent,
    canActivate: [authGuard],
    title: 'Account Settings', 
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'saved-addresses', // Redirect to the top-most setting tab
      },
      {
        path: 'saved-addresses',
        children: [
          { path: '', component: SavedAddressesComponent },
          { path: 'create', component: CreateAddressComponent },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Please keep this route at the bottom
];
