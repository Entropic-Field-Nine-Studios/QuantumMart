import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MessageService } from '../shared/message/message.service';

@Component({
  imports: [MatGridListModule, NotFoundComponent, MatProgressSpinner, UpperCasePipe, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly itemListingService = inject(ItemListingService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  private readonly _userData = signal<User | null>(null);
  private readonly _userListings = signal<ItemListing[]>([]);

  readonly notFound = signal(false);

  ngOnInit(): void {
    const profileId = this.activatedRoute.snapshot.paramMap.get('userid');

    if (!profileId) {
      this.navigate404();
      return;
    }

    this.userService.getUserById(profileId).subscribe({
      next: (user) => {
        this._userData.set(user);
        this.loadListings(user.id);
      },
      error: () => this.notFound.set(true),
    });
  }

  copyId(id: string) {
    navigator.clipboard
      .writeText(id)
      .then(() => this.messageService.info('User ID copied to clipboard.'));
  }

  isStaff(): boolean {
    const adminRoles = ['moderator', 'admin', 'superadmin'];

    return adminRoles.includes(this._userData()!.role);
  }

  get userInfo(): User | null {
    return this._userData();
  }

  get userListings(): ItemListing[] {
    return this._userListings();
  }

  private navigate404() {
    this.router.navigate(['/404']);
  }

  private loadListings(userId: string) {
    this.itemListingService
      .getListingsByUserId(userId)
      .subscribe((listings) => this._userListings.set(listings));
  }
}
