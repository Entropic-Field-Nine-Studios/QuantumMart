import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader, MatCardAvatar } from '@angular/material/card';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message/message.service';
import { ItemListingListComponent } from '../item-listings/item-listing-list/item-listing-list.component';

@Component({
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardAvatar,
    MatGridListModule,
    MatProgressSpinner,
    ItemListingListComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private itemListingService = inject(ItemListingService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  user = signal<User | null>(null);
  sDateCreated!: string;
  listings = signal<ItemListing[] | null>(null);

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params['userid']).subscribe({
      next: (user) => {
        this.user.set(user);
        this.sDateCreated = this.formatDate(new Date(user.createdAt));
        this.itemListingService.getAllListingsByUsername(user.username ?? '').subscribe({
          next: (data) => this.listings.set(data),
          error: () => this.listings.set([]),
        });
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
          case 404:
            this.router.navigate(['/404']);
            break;
          default:
            this.messageService.error(err.message);
        }
      },
    });
  }

  private formatDate(date: Date): string {
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }
}
