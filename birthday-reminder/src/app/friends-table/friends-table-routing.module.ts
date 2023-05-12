import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './add-friend/add-friend.component';

const routes: Routes = [
  {
    path: 'friends',
    component: FriendsComponent,
  },
  {
    path: 'add-friend',
    component: AddFriendComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsTableRoutingModule {}
