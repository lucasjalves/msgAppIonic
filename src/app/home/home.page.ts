import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private usuario: Usuario = new Usuario();

  constructor(private router: Router) {
  }

  cadastrar() {
    this.router.navigateByUrl('/cadastro');
  }
}
