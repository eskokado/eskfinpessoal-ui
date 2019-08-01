import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Login', detail: 'Logado com sucesso! Aguarde...'});
        this.router.navigate(['']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
