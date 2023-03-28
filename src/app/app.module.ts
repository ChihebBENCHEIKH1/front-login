import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';

import { HttpClientModule } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,

} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './componants/header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { SocialComponent } from './componants/social/social.component';
import { StudentsComponent } from './componants/students/students.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {path: '', component: LogComponent},
  {path: 'login', component: LogComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SocialComponent,
    StudentsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '660220038969-1gl4foc68ueti12oheh6tpcfshpgb70p.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('728923272051295')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
