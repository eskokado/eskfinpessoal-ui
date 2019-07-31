import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then((categorias) => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
