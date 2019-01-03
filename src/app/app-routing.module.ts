import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WallComponent } from './wall/wall.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { ModificationFormComponent } from './modification-form/modification-form.component';
import { DetailPostEditComponent } from './detail-post-edit/detail-post-edit.component';
import { LoginSignInComponent } from './LoginSignIn/login-sign-in/login-sign-in.component';


const routes: Routes = [
  { path: '', redirectTo: '/wall', pathMatch: 'full'},
  { path: 'wall', component: WallComponent},
  { path: 'student-Profile/:id', component: StudentProfileComponent},
  { path: 'detail/:id', component: DetailPostComponent},
  { path: 'detail/:id/edit', component: DetailPostEditComponent},
  { path: 'student-Profile/:id/form-modification/:id-fm', component: ModificationFormComponent},
  { path: 'loginSignIn', component: LoginSignInComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
