import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemListing } from '../item-listing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../date/date.service';
import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { MessageService } from '../../shared/message/message.service';
import { ItemListingService } from '../item-listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardTitle, MatCardHeader, MatCardAvatar } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemListingListComponent } from '../item-listing-list/item-listing-list.component';

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
  templateUrl: './item-listing-page.component.html',
  styleUrl: './item-listing-page.scss',
})

export class ItemListingPageComponent implements OnInit {
  private userService = inject(UserService);
  private itemListingService = inject(ItemListingService);
  private dateService = inject(DateService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  user = signal<User | null>(null);
  sDateCreated!: string;
  listing = signal<ItemListing | null>(null);

  ngOnInit(): void {
    this.itemListingService.getListingById(this.activatedRoute.snapshot.params['listid']).subscribe({
      next: (listing1) => {
        this.listing.set(listing1);
        //this.sDateCreated = this.dateService.formatDate(new Date(listing.createdAt));
        this.userService.getUserById(listing1.sellerId ?? '').subscribe({
          next: (data) => this.user.set(data)
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
}
