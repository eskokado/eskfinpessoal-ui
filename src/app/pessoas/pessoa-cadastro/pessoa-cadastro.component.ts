import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PesssoaDTO } from 'src/app/core/models';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PesssoaDTO();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: 'Inclusão de pessoa', detail: 'Pessoa adicionada com sucesso!'});
        form.reset();
        this.pessoa = new PesssoaDTO();
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
