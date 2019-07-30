import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = [];
  descricao: string;
  pessoa: string;
  categoria: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;

  constructor(
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      pessoa: this.pessoa,
      categoria: this.categoria,
      dataVencimentoDe: this.dataVencimentoDe,
      dataVencimentoAte: this.dataVencimentoAte
    }

    this.lancamentoService.pesquisar( filtro )
      .then((response) => {
        this.lancamentos = response.content;
      });
  }
}
