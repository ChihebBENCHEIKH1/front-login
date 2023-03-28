import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string="http://localhost:8081auth/login"
  constructor(private http:HttpClient) { }
  public loginWithMailAndPass(email:string,password:string):Observable<void>{
    return this.http.post<LoginResponse>(this.url, { email, password}).pipe(
      map(
        response => {
          sessionStorage.setItem('token', 'Bearer ' + response.tokenValue);

        }
      )
    );
  }
}
