import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { HttpClientModule }    from '@angular/common/http';
import { LoginSignInComponent } from './LoginSignIn/login-sign-in/login-sign-in.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    WallComponent,
    LoginSignInComponent,
    StudentProfileComponent,
    DetailPostComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}