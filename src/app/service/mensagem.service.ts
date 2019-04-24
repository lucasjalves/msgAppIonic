import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mensagem } from '../model/mensagem.model';
import { CorpoMensagem } from '../model/corpo-mensagem.model';
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
    return this.consultar(msg.rementente).get().toPromise()
    .then(query => {
        if (query.docs.length === 0) {
          const m: Mensagem = new Mensagem();
          m.idDestinatario = msg.destinatario;
          m.idRemetente = msg.rementente;
          m.mensagens.push(msg);

          return m;
        } else {
          const m: Mensagem = new Mensagem().deserialize(query.docs[0].data());
          m.id = query.docs[0].id;
          return m;
        }
    })
    .then(mensagem => {
      console.log(mensagem);
      if (mensagem.id === undefined || mensagem.id === null) {
        this.db.collection('mensagens').add(mensagem.serialize());
      } else {
        mensagem.mensagens.push(msg);
        this.db.collection('mensagens').doc(mensagem.id).update(mensagem.serialize());
      }
    });
  }
}
