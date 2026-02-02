import { Component, Input, numberAttribute, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../users/user.service';
import { ItemListing } from '../item-listing.model';

@Component({
  selector: 'app-item-listing',
  imports: [MatCardModule, CurrencyPipe],
  templateUrl: './item-listing.html',
  styleUrl: './item-listing.scss',
})
export class ItemListingComponent implements OnInit {
  @Input({ required: true }) listing!: ItemListing;

  sellerImgUrl?: string;
  sellerUsername!: string;

  loaded = signal(false);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Load seller information
    this.userService.getUserById(this.listing.sellerId).subscribe({
      next: (user) => {
        if (user != null) {
          this.sellerImgUrl = ''; // TODO
          this.sellerUsername = user.username;

          this.loaded.set(true);
        }
      },
    });
  }
}
