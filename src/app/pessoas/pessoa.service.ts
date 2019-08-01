import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { PessoaDTO } from './../core/models';

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

    return this.http.get(`${this.pessoasUrl}/page`, {params})
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
    return this.http.get(`${this.pessoasUrl}/search`)
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: PessoaDTO): Promise<PessoaDTO> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<PessoaDTO>(`${this.pessoasUrl}`, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: PessoaDTO): Promise<PessoaDTO> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put<PessoaDTO>(`${this.pessoasUrl}/${pessoa.id}`, pessoa, { headers })
      .toPromise();

  }

  buscarPorId(id: number): Promise<PessoaDTO> {
    return this.http.get<PessoaDTO>(`${this.pessoasUrl}/${id}`)
      .toPromise();
  }


}
