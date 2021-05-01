import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './modules/users/users.component';
import {UserDetailsComponent} from './modules/user-details/user-details.component';
import {RegisterComponent} from './modules/register/register.component';
import {LoginComponent} from './modules/login/login.component';
import {AuthGuard} from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users-detais', component: UserDetailsComponent},
  {path: '**', redirectTo: '/users'}

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})


export class AppRoutingModule {
}
