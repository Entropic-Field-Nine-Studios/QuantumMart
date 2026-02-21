import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader, MatCardAvatar } from '@angular/material/card';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingComponent } from '../item-listings/item-listing/item-listing';
import { DateService } from '../date/date.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatGridListModule,
    ItemListingComponent,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  private userService = inject(UserService);
  private itemListingService = inject(ItemListingService);
  private dateService = inject(DateService);
  private activatedRoute = inject(ActivatedRoute);

  user = signal<User | null>(null);
  sDateCreated!: string;
  listings = signal<ItemListing[] | null>(null);

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params['userid']).subscribe({
      next: (user) => {
        this.user.set(user);
        this.sDateCreated = this.dateService.formatDate(new Date(user.createdAt));
        this.itemListingService.getAllListingsByUsername(user.username ?? '').subscribe({
          next: (data) => this.listings.set(data),
          error: () => this.listings.set([]),
        });
      },
      error: (err: HttpErrorResponse) => alert(err.message),
    });
  }
}
