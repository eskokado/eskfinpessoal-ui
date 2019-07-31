import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  cidade: string;
  estado: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) {
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.cidade) {
      params = params.set('cidade', filtro.cidade);
    }

    if (filtro.estado) {
      params = params.set('estado', filtro.estado);
    }

    return this.http.get(`${this.pessoasUrl}/page`, {headers, params})
      .toPromise<any>()
      .then((response) => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');
    return this.http.get(`${this.pessoasUrl}/search`, {headers})
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');
    return this.http.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

}
