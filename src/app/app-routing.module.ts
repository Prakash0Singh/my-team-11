import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { OtpComponent } from './user/otp/otp.component';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthUserGuard } from './auth/auth-user.guard';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path:'', redirectTo:'menu', pathMatch:'full'},
  {path:'register-user',component:RegisterComponent, title:'Register-User'},
  {path:'user-verify',component:OtpComponent, title:'Verify'},
  {path:'user-login',component:LoginComponent, title: 'Login' },
  {path: 'menu',canActivate:[AuthUserGuard] ,loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),title: 'Menu'},
  {path: 'contest-team',canActivate:[AuthUserGuard] ,loadChildren: () => import('./contest-team/contest-team.module').then(m => m.ContestTeamModule),title: 'Fantasy Team' },
  {path:'fill-form',component:UserFormComponent},
  {path:'**',component:PageNotFoundComponent, data: { title: 'Not Found' }}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

