import { Mensagem } from './mensagem.model';
import { Serializable } from '../common/serializable.interface';

export class Contato implements Serializable<Contato> {
    id: string;
    nome: string;
    email: string;
    mensagens: Mensagem[] = new Array<Mensagem>();

    deserialize(input): Contato {
        this.id = input.id;
        this.nome = input.nome;
        this.email = input.email;
        this.mensagens = [];
        for (let i = 0; i < this.mensagens.length; i++) {
            const msg: Mensagem = new Mensagem().deserialize(this.mensagens[i]);
            this.mensagens.push(msg);
        }

        return this;
    }
    serialize(): Object {
        const msgs: Object[] = [];
        for (let i = 0; i < msgs.length; i ++) {
            msgs.push(this.mensagens[i].serialize());
        }
        return {
            nome: this.nome,
            email: this.email,
            mensagens: msgs
        };
    }

    constructor() {}
}
