import { Component, OnInit } from '@angular/core';
import { Contato } from '../../model/contato.model';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
})
export class AdicionarContatoPage implements OnInit {

  public contato: Contato = new Contato();
  private usuario: Usuario;
  constructor(private service: UsuarioService,
    private alertController: AlertController,
    private router: Router) {
  }

  ngOnInit() {
  }

  voltar() {
    this.router.navigate(['/principal']);
  }

  async adicionar() {
    const self = this;
    try {

      const contatoDuplicado: boolean =
        await self.isContatoDuplicado();

      if (contatoDuplicado) {
        this.mostrarModal('Contato já cadastrado');
        return;
      }

      const contatoExistente: Usuario =
        await this.isContatoExistente();

      if (contatoExistente === null || contatoExistente === undefined) {
        this.mostrarModal('Verifique o email do contato');
        return;
      }
      const usuarioLogado = await this.service.getUsuarioLogado();
      this.contato.id = contatoExistente.id;
      console.log(this.contato);
      usuarioLogado.contatos.push(this.contato);

      this.service.alterarUsuario(usuarioLogado);
      this.mostrarModal('Contato adicionado com sucesso!');
    } catch (err) {
      this.mostrarModal('Ocorreu um erro');
    }
  }

  async mostrarModal(msg: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async isContatoDuplicado() {
    const usuarioLogado: Usuario = await this.service.getUsuarioLogado();
    return usuarioLogado.contatos
      .filter((contato) => contato.email === this.contato.email).length > 0;
  }

  async isContatoExistente() {
    const usuarios: Usuario[] = await this.service.consultarUsuario();
    console.log(usuarios);
    return usuarios
      .filter((usuario) => usuario.email === this.contato.email)[0];
  }
}
