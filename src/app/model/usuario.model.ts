import {Serializable} from '../common/serializable.interface';
import { Contato } from './contato.model';

export class Usuario implements Serializable<Usuario> {
    nome: string;
    email: string;
    senha: string;
    id: string;
    contatos: Contato[] = [];
    constructor() {
    }

    deserialize(input) {
        this.contatos = [];
        this.nome = input.nome;
        this.email = input.email;
        this.senha = input.senha;
        for (let i = 0; i < input.contatos.length; i++) {
            this.contatos.push(new Contato().deserialize(input.contatos[i]));
        }
        return this;
    }

    serialize() {
       const contatos: Object[] = [];
       for (let i = 0; i < this.contatos.length; i++) {
            contatos.push(this.contatos[i].serialize());
       }
       return {
            email:  this.email,
            nome:   this.nome,
            senha:  this.senha,
            contatos: contatos
        };
    }
}
