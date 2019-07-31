import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(errorResponse: any) {
    let msg: string;
    let titulo: string;

    console.log(errorResponse);

    if (typeof errorResponse === 'string') {
      titulo = 'Mensagem de Erro';
      msg = errorResponse;
    } else if (errorResponse.status === 404) {
      titulo = errorResponse.error.error;
      msg = `(${errorResponse.status}) - ${errorResponse.error.message}`;
    } else {
      titulo = 'Mensagem de Erro';
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    this.messageService.add({severity: 'error', summary: titulo, detail: msg});
  }
}
