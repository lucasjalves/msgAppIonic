import { Serializable } from '../common/serializable.interface';
import { CorpoMensagem } from './corpo-mensagem.model';

export class Mensagem implements Serializable<Mensagem> {

    idRemetente: string;
    idDestinatario: string;
    mensagens: CorpoMensagem[] = new Array<CorpoMensagem>();
    constructor() {}

    deserialize(input): Mensagem {
       this.mensagens = [];
       for (let i = 0; i < input.mensagens.length ; i++) {
        this.mensagens.push(new CorpoMensagem().deserialize(input.mensagens[i]));
       }
       this.idDestinatario = input.idDestinatario;
       this.idRemetente = input.idRemetente;
       return this;
    }
    serialize(): Object {
        const mensagens: Object[] = [];
        for (let i = 0; i < this.mensagens.length; i++) {
            mensagens.push(this.mensagens[i].serialize());
        }
        return {
            idDestinatario: this.idDestinatario,
            idRemetente: this.idRemetente,
            mensagens: mensagens
        };
    }
}
