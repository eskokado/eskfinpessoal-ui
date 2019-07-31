import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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
    private lancamentoService: LancamentoService
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
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        this.grid.reset();
      });
  }
}
