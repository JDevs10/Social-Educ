import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WallComponent } from './wall/wall.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { ModificationFormComponent } from './modification-form/modification-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/wall', pathMatch: 'full'},
  { path: 'wall', component: WallComponent},
  { path: 'student-Profile/:id', component: StudentProfileComponent},
  { path: 'detail/:id', component: DetailPostComponent},
  { path: 'student-Profile/:id/form-modification/:id-fm', component: ModificationFormComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
