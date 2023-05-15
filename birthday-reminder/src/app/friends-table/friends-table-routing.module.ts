import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FriendDetailsComponent } from './friend-details/friend-details.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-friend',
    component: AddFriendComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-friend',
    component: AddFriendComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'friend-details/:id',
    component: FriendDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsTableRoutingModule {}
