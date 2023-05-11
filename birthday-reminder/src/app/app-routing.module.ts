import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    path: '',
  },
  {
    loadChildren: () =>
      import('./friends-table/friends-table.module').then(
        (m) => m.FriendsTableModule
      ),
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
