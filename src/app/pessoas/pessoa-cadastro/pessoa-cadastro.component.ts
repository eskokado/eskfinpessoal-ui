import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { PessoaDTO } from 'src/app/core/models';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PessoaDTO();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    const idPessoa = this.route.snapshot.params.id;
    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then((response) => {
        this.pessoa = response;
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizandoPessoa(form);
    } else {
      this.adicionandoPessoa(form);
    }
  }

  adicionandoPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: 'Inclusão de pessoa', detail: 'Pessoa adicionada com sucesso!'});
        this.router.navigate(['/pessoas', response.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizandoPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then((response) => {
        this.pessoa = response;
        this.atualizarTituloEdicao();
        this.messageService.add({severity: 'success', summary: 'Atualização de pessoa', detail: 'Pessoa atualizada com sucesso!'});
      })
      .catch(error => this.errorHandler.handle(error));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(() => {
      this.pessoa = new PessoaDTO();
    }, 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
