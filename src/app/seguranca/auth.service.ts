import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.http.post<any>(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
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

  isAccessTokenInvalido() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return !token || jwtHelper.isTokenExpired(token);
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ZXNraW5mb3RlY2h3ZWI6M3NrMW5mMHQzY2h3M2Iw');

    const params = new HttpParams()
      .set('grant_type', 'refresh_token');

    return this.http.post<any>(this.oauthTokenUrl, null, { headers, params, withCredentials: true })
      .pipe(
        map(token => {
          this.armazenarToken(token.access_token);
          return token.access_token;
        })
      );
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }
}
