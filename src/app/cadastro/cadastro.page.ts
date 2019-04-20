import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { CadastroService } from './cadastro.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = new Usuario();
  constructor(private service: CadastroService, private alertController: AlertController) {}

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

  async isUsuarioCadastrado() {
    const self = this;
    let u: Usuario[] = await this.service.consultarUsuario();
    console.log(u.filter((usuario) => usuario.email === self.usuario.email));
    return u.filter((usuario) => usuario.email === self.usuario.email).length > 0;
  }

}
