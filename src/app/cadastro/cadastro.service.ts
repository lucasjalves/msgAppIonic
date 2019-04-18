import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../usuario/usuario.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(public db: AngularFirestore) {
  }

  cadastrarUsuario(usuario: Usuario) {
   return this.db.collection('usuarios').add({
      email: usuario.email,
      nome: usuario.nome,
      senha: usuario.senha
    });
  }
}
