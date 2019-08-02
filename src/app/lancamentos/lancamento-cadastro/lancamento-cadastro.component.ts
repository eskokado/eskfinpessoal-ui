import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService } from '../lancamento.service';
import { LancamentoDTO } from './../../core/models';

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
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const idlancamento = this.route.snapshot.params.id;
    this.title.setTitle('Novo lançamento');

    if (idlancamento) {
      this.carregarLancamento(idlancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: [ 'DESPESA' , Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [ null, [Validators.required, Validators.minLength(5)] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        id: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
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

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamento) => {
        this.messageService.add({severity: 'success', summary: 'Inclusão de lançamento', detail: 'Lançamento incluído com sucesso!'});
        this.router.navigate(['/lancamentos', lancamento.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then((response) => {
        this.formulario.patchValue(response);
        this.atualizarTituloEdicao();
        this.messageService.add({severity: 'success', summary: 'Edição de lançamento', detail: 'Lançamento atualizado com sucesso!'});
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscaPorId(id)
      .then((response) => {
        this.formulario.patchValue(response);
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  novo() {
    this.formulario.reset();
    setTimeout(function() {
      this.lancamento = new LancamentoDTO();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
