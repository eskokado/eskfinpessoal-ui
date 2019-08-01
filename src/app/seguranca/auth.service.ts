import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ZXNraW5mb3RlY2h3ZWI6M3NrMW5mMHQzY2h3M2Iw');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `client=eskinfotechweb&username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(`${this.oauthTokenUrl}`, body, { headers })
      .toPromise()
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      });
  }
}
