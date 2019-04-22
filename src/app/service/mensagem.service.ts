import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mensagem } from '../model/mensagem.model';
@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private db: AngularFirestore) { }

  consultar(idRemetente: string) {
    return this.db.collection('mensagens', ref => ref.where('idRemetente', '==', idRemetente)).get();
  }
}
