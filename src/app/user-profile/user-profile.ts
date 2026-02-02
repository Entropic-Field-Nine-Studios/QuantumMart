import { Component, inject } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader, MatCardAvatar, MatCardSubtitle } from "@angular/material/card";
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/user.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardAvatar, MatCardSubtitle],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
  
  constructor(
    private userService: UserService, private authService: AuthService
  ) {}
    username:any;
    user:User;
    dateCreated:Date;
    sDateCreated:String;
    
    ngOnInit(): void {
      this.username = this.authService.username;
      this.userService.getUserByUsername(this.username).subscribe({
        next: user => {
          this.user = user;
          this.dateCreated = new Date(this.user.createdAt);
          this.sDateCreated = (this.dateCreated.getMonth()+1) + '/' + this.dateCreated.getDate() + '/' + this.dateCreated.getFullYear();
        },
        error: (err: HttpErrorResponse) => alert(err.message)
      });
  }
  
  
}
