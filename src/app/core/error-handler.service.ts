import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;
    let titulo: string;

    console.log('Error handler: ', errorResponse);

    if (typeof errorResponse === 'string') {
      titulo = 'Mensagem de Erro';
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse &&
      errorResponse.status === 401 &&
      errorResponse.error.error === 'invalid_token') {
        titulo = errorResponse.error.error;
        msg = 'Sua Sessão expirou';
        this.router.navigate(['/login']);
    } else if (errorResponse instanceof HttpErrorResponse &&
      errorResponse.status >= 400 &&
      errorResponse.status <= 499) {
        if (errorResponse.status === 404) {
          titulo = errorResponse.error.error;
          msg = `(${errorResponse.status}) - ${errorResponse.error.message}`;
        } else if (errorResponse.status === 403) {
          titulo = errorResponse.error.error;
          msg = 'Você não tem permissão para executar esta ação';
        } else {
          titulo = 'Mensagem de Erro';
          msg = 'Erro ao processar serviço remoto. Tente novamente.';
        }
    } else {
      titulo = 'Mensagem de Erro';
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    this.messageService.add({severity: 'error', summary: titulo, detail: msg});
  }
}
