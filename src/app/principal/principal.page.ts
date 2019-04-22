import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public usuario: Usuario = new Usuario();
  constructor(private service: UsuarioService) { }

  async ngOnInit() {
    const email: string = localStorage.getItem('usuario');
    if (email === undefined || email === null) {
      throw new Error('Usuário não logado');
    }
    const self = this;
    const usuarios: Usuario[] = await this.service.consultarUsuario();
    this.usuario = usuarios.filter((usuario) => usuario.email === email)[0];
    console.log(this.usuario);
  }

  adicionar() {

  }
}
