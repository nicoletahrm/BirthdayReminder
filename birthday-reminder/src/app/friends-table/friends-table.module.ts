import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsTableRoutingModule } from './friends-table-routing.module';
import { FriendsComponent } from './friends/friends.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { EditFriendComponent } from './edit-friend/edit-friend.component';

@NgModule({
  declarations: [FriendsComponent, AddFriendComponent, FriendDetailsComponent, EditFriendComponent],
  imports: [
    CommonModule,
    FriendsTableRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    HttpClientModule,
    NzButtonModule,
    NzMessageModule,
    NzCardModule,
  ],
})
export class FriendsTableModule {}
