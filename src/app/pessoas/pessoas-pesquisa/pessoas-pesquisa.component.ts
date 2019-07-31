import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoaFiltro } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  pessoas = [];

  filtro = new PessoaFiltro();

  constructor(
    private pessoaService: PessoaService
  ) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pessoaService.pesquisar(this.filtro)
      .then((response) => {
        this.pessoas = response.pessoas;
      });
  }
}
