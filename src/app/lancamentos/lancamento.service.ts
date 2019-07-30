import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  pessoa: string;
  categoria: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
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

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.pessoa) {
      params = params.append('nomePessoa', filtro.pessoa);
    }

    if (filtro.categoria) {
      params = params.append('nomeCategoria', filtro.categoria);
    }

    if (filtro.dataVencimentoDe) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}/resum`, {headers, params})
      .toPromise();
  }
}

