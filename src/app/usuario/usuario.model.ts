import {Serializable} from '../common/serializable.interface';
export class Usuario implements Serializable<Usuario> {
    nome: string;
    email: string;
    senha: string;

    constructor() {
    }

    deserialize(input) {
        this.nome = input.nome;
        this.email = input.email;
        this.senha = input.senha;
        return this;
    }

    serialize() {
       return {
            email:  this.email,
            nome:   this.nome,
            senha:  this.senha
        };
    }
}
