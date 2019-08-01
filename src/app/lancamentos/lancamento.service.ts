import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { LancamentoDTO } from './../core/models';

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

    return this.http.get(`${this.lancamentoUrl}/page`, {params})
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
    return this.http.delete(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<LancamentoDTO>(`${this.lancamentoUrl}`, lancamento)
      .toPromise();
  }

  atualizar(lancamento: LancamentoDTO): Promise<LancamentoDTO> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put<LancamentoDTO>(`${this.lancamentoUrl}/${lancamento.id}`, lancamento, { headers })
      .toPromise()
      .then((response) => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
    });
  }

  buscaPorId(id: number): Promise<LancamentoDTO> {
    return this.http.get<LancamentoDTO>(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then((response) => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      })
  }

  private converterStringsParaDatas(lancamentos: LancamentoDTO[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}

