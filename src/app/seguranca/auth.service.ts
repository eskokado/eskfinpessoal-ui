import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ZXNraW5mb3RlY2h3ZWI6M3NrMW5mMHQzY2h3M2Iw');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `client=eskinfotechweb&username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post<any>(`${this.oauthTokenUrl}`, body, { headers })
      .toPromise()
      .then((response) => {
        console.log(response);
        this.armazenarToken(response.access_token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private armazenarToken(token: string) {
    const jwtHelper = new JwtHelperService();
    this.jwtPayload = jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
