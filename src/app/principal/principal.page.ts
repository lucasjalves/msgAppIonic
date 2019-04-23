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
  public conversas: Object = [];

  constructor(private service: UsuarioService, private router: Router,
    private mensagemService: MensagemService) { }

    ngOnInit() {
    const email: string = localStorage.getItem('usuario');
    if (email === undefined || email === null) {
      throw new Error('Usuário não logado');
    }
    const self = this;
    this.service.consultarPorEmail(email).toPromise()
      .then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(doc) {
          self.usuario = new Usuario().deserialize(doc.data());
        });
      });
  }

  adicionar() {
    this.router.navigateByUrl('/adicionar-contato');
  }

  visualizarContato(id) {
    this.router.navigate(['/visualizar-contato'],{
        queryParams: {  id: id  }
      });
  }
}
