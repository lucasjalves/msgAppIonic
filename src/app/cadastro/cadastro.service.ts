import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../usuario/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private usuarios: Usuario[];
  constructor(private db: AngularFirestore) {
  }

  cadastrarUsuario(usuario: Usuario) {
    console.log(usuario.serialize());
   return this.db.collection('usuarios').add(usuario.serialize());
  }

  async consultarUsuario() {
    this.usuarios = [];
    const self = this;
    const q: firebase.firestore.QuerySnapshot = await this.db.collection('usuarios').get().toPromise();

    q.forEach(function(queryDocument) {
      self.usuarios.push(new Usuario().deserialize(queryDocument.data()));
    });

    return this.usuarios;
  }

}
