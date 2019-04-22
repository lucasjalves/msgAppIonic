import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: Usuario = new Usuario();

  constructor(private service: UsuarioService, private alertController: AlertController, private router: Router) {
  }

  async mostrarModal(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  cadastrar() {
    this.router.navigateByUrl('/cadastro');
  }

  async logar() {
    const usuarios: Usuario[] = await this.service.consultarUsuario();
    const usuarioLogado: Usuario = usuarios.filter((usuario) => usuario.email === this.usuario.email
    && usuario.senha === this.usuario.senha)[0];

    if (usuarioLogado) {
      localStorage.setItem('usuario', usuarioLogado.email);
      this.router.navigateByUrl('/principal');
    } else {
      this.mostrarModal('E-mail ou senha incorretos');
    }
  }
}
