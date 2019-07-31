import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias'

  constructor(
    private http: HttpClient
  ) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');

    return this.http.get(`${this.categoriasUrl}`, { headers })
      .toPromise();
  }
}
