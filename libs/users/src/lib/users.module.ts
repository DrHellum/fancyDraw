import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@fancydraw/core';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: UserListComponent, canActivate: [AuthGuard]}
    ])
  ],
  declarations: [UserListComponent]
})
export class UsersModule {
}
