import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  pessoas = [];

  filtro = new PessoaFiltro();

  @ViewChild('tabela', { static: true }) grid;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then((response) => {
        this.totalRegistros = response.total;
        this.pessoas = response.pessoas;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .then(() => {
        this.grid.reset();
        this.messageService.add({severity: 'success', summary: 'Excluir pessoa', detail: 'Pessoa excluído com sucesso!'});
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
