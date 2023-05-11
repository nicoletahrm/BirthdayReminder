import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/inferfaces/friend.interface';
import { FriendService } from '../friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends: Friend[] = [];

  constructor(
    private friendService: FriendService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.friendService
      .getFriends()
      .subscribe((friends) => (this.friends = friends));
  }

  logout() {
    this.authService.logout();
  }
}