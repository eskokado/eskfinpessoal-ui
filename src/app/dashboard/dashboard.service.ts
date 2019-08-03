import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl = `http://localhost:8080/lancamentos`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  lancamentosPorCategoria(): Promise<Array<any>> {
    let params = new HttpParams();
    params = params.set('dataDe', '2017-01-01');
    params = params.set('dataAte', '2019-12-31');

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`, { params })
      .toPromise<any>()
      .catch(error => this.errorHandler.handle(error));
  }

  lancamentosPorDiaTipo(): Promise<Array<any>> {
    let params = new HttpParams();
    params = params.set('dataDe', '2017-01-01');
    params = params.set('dataAte', '2019-12-31');

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia-tipo`, { params })
      .toPromise<any>()
      .then((response) => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  lancamentosPorCategoriaTipo(): Promise<Array<any>> {
    let params = new HttpParams();
    params = params.set('dataDe', '2017-01-01');
    params = params.set('dataAte', '2019-12-31');

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria-tipo`, { params })
      .toPromise<any>()
      .catch(error => this.errorHandler.handle(error));
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for ( const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
   }
}
