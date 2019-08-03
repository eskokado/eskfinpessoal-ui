import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from '../relatorios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then((response) => {
        const url = window.URL.createObjectURL(response);
        window.open(url);
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
