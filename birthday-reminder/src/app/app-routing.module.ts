import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    path: 'auth',
  },
  {
    loadChildren: () =>
      import('./friends-table/friends-table.module').then(
        (m) => m.FriendsTableModule
      ),
    path: 'friends',
  },
  {
    path: '',
    redirectTo: 'friends',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
