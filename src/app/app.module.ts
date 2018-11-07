import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WallComponent } from '../wall/wall.component';
import { HttpClientModule }    from '@angular/common/http';
import { LoginSignInComponent } from './LoginSignIn/login-sign-in/login-sign-in.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    WallComponent,
    LoginSignInComponent,
    StudentProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}