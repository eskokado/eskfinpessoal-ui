import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = [];

  totalRegistros = 0;
  filtro = new LancamentoFiltro();

  @ViewChild('tabela', {static: true}) grid;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar( this.filtro )
      .then((response) => {
        this.totalRegistros = response.total;
        this.lancamentos = response.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        this.grid.reset();
        this.messageService.add({severity: 'success', summary: 'Excluido lançamento', detail: 'Lançamento excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
