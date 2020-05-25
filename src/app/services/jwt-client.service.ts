import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthRequest } from '../model/auth-request';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient: HttpClient) { }


  public generateToken(request:AuthRequest) {
    console.log(request)
    return this.httpClient.post<UserToken>("http://localhost:9000/app/auth/signin", request);
  }


  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:9000/", {headers});
  }
}
