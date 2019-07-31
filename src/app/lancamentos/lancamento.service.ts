import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  pessoa: string;
  categoria: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.pessoa) {
      params = params.set('nomePessoa', filtro.pessoa);
    }

    if (filtro.categoria) {
      params = params.set('nomeCategoria', filtro.categoria);
    }

    if (filtro.dataVencimentoDe) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}/page`, {headers, params})
      .toPromise<any>()
      .then((response) => {
        const lancamentos = response.content;

        const resultado = {
          lancamentos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AZXNraW5mb3RlY2h3ZWIuY29tOmFkbWlu');
    return this.http.delete(`${this.lancamentoUrl}/${id}/erro`, {headers})
      .toPromise()
      .then(() => null);
  }
}

