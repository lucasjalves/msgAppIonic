import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = new Usuario();
  constructor(private service: UsuarioService, private alertController: AlertController, private router: Router) {}

  ngOnInit() {
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
    const self = this;
    this.isUsuarioCadastrado().then(function(cadastrado) {
      if (cadastrado) {
        self.mostrarModal('Usuário já cadastrado');
        return;
      } else {
        self.service.cadastrarUsuario(self.usuario)
        .then(function(sucesso) {
          self.mostrarModal('Cadastro realizado com sucesso!');

        }).catch(function(error) {
          console.log(error);
          self.mostrarModal('Falha ao cadastrar o usuário');
        });
      }
    }).catch(function(error) {
      console.log(error);
      self.mostrarModal('Falha ao consultar o usuário');
    });


  }

  voltar() {
    this.router.navigateByUrl('/home');
  }
  async isUsuarioCadastrado() {
    const self = this;
    let u: Usuario[] = await this.service.consultarUsuario();
    console.log(u.filter((usuario) => usuario.email === self.usuario.email));
    return u.filter((usuario) => usuario.email === self.usuario.email).length > 0;
  }

}
