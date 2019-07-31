import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoDTO } from './../../core/models';
import { LancamentoService } from '../lancamento.service';

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
  lancamento = new LancamentoDTO();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
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

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: 'Inclusão de lançamento', detail: 'Lançamento incluído com sucesso!'});
        form.reset();
        this.lancamento = new LancamentoDTO();
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
