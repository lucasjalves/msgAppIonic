import { Serializable } from '../common/serializable.interface';

export class Mensagem implements Serializable<Mensagem> {

    mensagem: string;
    data: string;
    hora: string;

    constructor() {}

    deserialize(input): Mensagem {
       this.mensagem = input.mensagem;
       this.data = input.data;
       this.hora = input.hora;
       return this;
    }
    serialize(): Object {
        return {
            mensagem : this.mensagem,
            data : this.data,
            hora : this.hora
        };
    }
}
