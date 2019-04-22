import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private usuarios: Usuario[];
  constructor(private db: AngularFirestore) {
  }

  cadastrarUsuario(usuario: Usuario) {
   return this.db.collection('usuarios').add(usuario.serialize());
  }

  async consultarUsuario() {
    this.usuarios = [];
    const self = this;
    const q: firebase.firestore.QuerySnapshot = await this.db.collection('usuarios').get().toPromise();
    q.forEach(function(queryDocument) {
      const u: Usuario = new Usuario().deserialize(queryDocument.data());
      u.id = queryDocument.id;
      self.usuarios.push(u);
    });

    return this.usuarios;
  }

  async alterarUsuario(usuario: Usuario) {
    const userRef: AngularFirestoreDocument<any> =
      this.db.collection('usuarios').doc(usuario.id);

      return userRef.update(usuario.serialize());
  }

  async getUsuarioLogado() {
    const email: string = localStorage.getItem('usuario');
    if (email === null || email === undefined) {
      throw new Error('Usuário não logado');
    }
    const usuarios: Usuario[] = await this.consultarUsuario();

    const usuarioLogado: Usuario =
      usuarios.filter((usuario) => usuario.email === email)[0];

      return usuarioLogado;
  }

  consultarPorId(id: string) {
    return this.db.collection('usuarios').get();
  }

}
