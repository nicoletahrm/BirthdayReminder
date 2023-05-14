import { Component, Input, OnInit } from '@angular/core';
import { Friend } from 'src/app/inferfaces/friend.interface';
import { FriendService } from '../services/friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends: Friend[];
  filteredFriends: Friend[];

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFriends = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.friends;
  }

  constructor(
    private friendService: FriendService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.friendService.getFriends().subscribe({
      next: (friends) => {
        this.friends = friends;
        this.filteredFriends = friends;
      },
    });
  }

  deleteFriend(id: any) {
    this.friendService.deleteFriend(id).subscribe({
        next: () => {
          this.filteredFriends = this.filteredFriends.filter(friend => friend.id !== id);
          this.message.success('Deleted successfully');
        },
        error: (error) => {
          console.error(error);
          this.message.error(error.error.detail || 'Deletion failed');
        }
      });   
  }

  performFilter(filterBy: string): Friend[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.friends.filter(
      (friend: Friend) =>
        friend.first_name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        friend.last_name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        friend.city.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  logout() {
    this.authService.logout();
    this.message.success('Logged out successfully');
  }
}
