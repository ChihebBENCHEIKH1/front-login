import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private baseUrl = 'http://localhost:8081/social/';
  constructor(private http: HttpClient,private router:Router) { }

  loginWithGoogle(token:string): Observable<any>{
    // @ts-ignore

    return this.http.post<any>(`${this.baseUrl}google`,{token}).pipe(
      map(
        response => {
          sessionStorage.setItem('token','Bearer ' + response.token);
          return response;
        }
      ),

         catchError(err => {
           console.error('HTTP ERROR: ', err);
           return throwError(err);
         })
    );
  }
  loginWithFacebook(token:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}facebook`, {token}).pipe(
      map(
        response => {

          sessionStorage.setItem('token','Bearer ' +response.token);
          console.log(sessionStorage.getItem('token'))
          this.router.navigate(['/students'])
          return response;
        }
      )
    );
  }
}
