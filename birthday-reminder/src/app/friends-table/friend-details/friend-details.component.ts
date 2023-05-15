import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../services/friend.service';
import { Friend } from 'src/app/inferfaces/friend.interface';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss'],
})
export class FriendDetailsComponent implements OnInit {
  friend: Friend | undefined;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getFriend(id);
    }
  }

  getFriend(id: number): void {
    this.friendService.getFriendById(id).subscribe({
      next: (friend) => (this.friend = friend),
    });
  }

  onBack(): void {
    this.router.navigate(['/friends']);
  }
}
