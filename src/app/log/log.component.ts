import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider,GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { SocialService } from '../services/social.service';
import { LoginService } from '../services/login.service';
import {  Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  template:'GoogleSigninButtonDirective',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit{
  test:boolean=false;
  user?:SocialUser;
  isLogged:boolean=false;
  private accessToken = '';
email: any;
password: any;
emailFocused: boolean=false;
passwordFocused: boolean=false;
logg: boolean=false;

  constructor(private authService: SocialAuthService,
     private httpClient: HttpClient,
     private social: SocialService,
     private loginService:LoginService,
     private router:Router) { }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }


   login(form :any) :void{
    this.loginService.loginWithMailAndPass(form.email,form.password);
    console.log(sessionStorage.getItem('token'))
    this.router.navigate(['/students']);
  }
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data=>{
        this.isLogged=(data!=null);
        this.user=data;
        console.log(this.user);
        if(this.user.idToken!=null)
        {this.social.loginWithGoogle(this.user.idToken).subscribe(
          res=>console.log(res)
        );
          console.log(sessionStorage.getItem('token'));
          this.router.navigate(['/students']);
        }
      }

    )
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {

        this.social.loginWithFacebook(data.authToken).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    );
  }

  signOut(): void {
    this.authService.signOut();
  }
}
