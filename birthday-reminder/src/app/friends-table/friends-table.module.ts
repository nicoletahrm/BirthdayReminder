import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsTableRoutingModule } from './friends-table-routing.module';
import { FriendsComponent } from './friends/friends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    FriendsTableRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    HttpClientModule,
    NzButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class FriendsTableModule {}
