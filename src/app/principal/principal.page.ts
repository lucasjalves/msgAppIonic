import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { MensagemService } from '../service/mensagem.service';
import { QuerySnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  public usuario: Usuario = new Usuario();
  private idLogado = '';
  public conversas: Object = [];

  constructor(private service: UsuarioService, private router: Router) {
      this.atualizarContatos();
  }

  ngOnInit() {

  }

  adicionar() {
    this.router.navigateByUrl('/adicionar-contato');
  }

  atualizarContatos() {
    const email: string = localStorage.getItem('usuario');
    const self = this;
    this.service.consultarPorEmail(email).subscribe(querySnapshot => {
      querySnapshot.docs.forEach(function(doc) {
        self.usuario = new Usuario().deserialize(doc.data());
        self.usuario.id = doc.id;
      });
    });
  }
  visualizarContato(id) {
    console.log(this.usuario.id);
    this.router.navigate(['/visualizar-contato'], {
        queryParams: {  id: id, 'idLogado': this.usuario.id}
      });
  }
}
