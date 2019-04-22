import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { MensagemService } from '../service/mensagem.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public usuario: Usuario = new Usuario();
  public conversas: Object = [];

  constructor(private service: UsuarioService, private router: Router,
    private mensagemService: MensagemService) { }

  async ngOnInit() {
    const email: string = localStorage.getItem('usuario');
    if (email === undefined || email === null) {
      throw new Error('Usuário não logado');
    }
    const self = this;
    const usuarios: Usuario[] = await this.service.consultarUsuario();
    this.usuario = usuarios.filter((usuario) => usuario.email === email)[0];
    this.mensagemService.consultar(this.usuario.id).subscribe((next) => {

    });

  }

  adicionar() {
    this.router.navigateByUrl('/adicionar-contato');
  }
}
