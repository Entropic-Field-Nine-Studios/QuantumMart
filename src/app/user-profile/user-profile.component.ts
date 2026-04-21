import { Component, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListingService } from '../item-listings/item-listing.service';
import { ItemListing } from '../item-listings/item-listing.model';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MessageService } from '../shared/message/message.service';
import { ItemListingListComponent } from '../item-listings/item-listing-list/item-listing-list.component';
import { UserAvatarComponent } from '../shared/display/user-avatar/user-avatar.component';
import { Title } from '@angular/platform-browser';
import { qmTitle } from '../title/qm-title';

@Component({
  imports: [
    MatGridListModule,
    NotFoundComponent,
    MatProgressSpinner,
    DatePipe,
    ItemListingListComponent,
    UserAvatarComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly itemListingService = inject(ItemListingService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly title = inject(Title);

  private readonly _userData = signal<User | null>(null);
  private readonly _userListings = signal<ItemListing[]>([]);

  readonly notFound = signal(false);

  ngOnInit(): void {
    this.listenForRouteParams();
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

  private loadUser(id: string) {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this._userData.set(user);
        this.title.setTitle(qmTitle(`${user.username}'s Profile`));
        this.loadListings(user.id);
      },
      error: () => this.notFound.set(true),
    });
  }

  private listenForRouteParams() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('userid');

      if (id) {
        this.loadUser(id);
      }
    });
  }
}
