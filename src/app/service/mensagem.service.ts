import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mensagem } from '../model/mensagem.model';
@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private db: AngularFirestore) { }

  consultar(idRemetente?: string) {
    if (idRemetente !== undefined) {
      return this.db.collection<Mensagem[]>('mensagens', ref => ref.where('idRemetente', '==', idRemetente));
    }
    return this.db.collection<Mensagem[]>('mensagens');
  }


  adicionar(msg: CorpoMensagem) {
    
    return this.db.collection('mensagens').add(msg);
  }
}
