import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

//import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,

    Title,

    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
