import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { CadastroService } from './cadastro.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private usuario: Usuario = new Usuario();

  constructor(public service: CadastroService) {}

  ngOnInit() {
  }

  cadastrar() {
    // console.log(this.service.cadastrarUsuario(this.usuario));
  }
}
