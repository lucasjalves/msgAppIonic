import { Serializable } from '../common/serializable.interface';

export class CorpoMensagem implements Serializable<CorpoMensagem> {

    mensagem: string;
    data: string;
    hora: string;
    rementente: string;
    constructor() {}

    deserialize(input): CorpoMensagem {
        this.mensagem = input.mensagem;
        this.data = input.data;
        this.hora = input.hora;
        this.rementente = input.rementente;
        return this;
    }
    serialize(): Object {
        return {
            mensagem: this.mensagem,
            data: this.data,
            hora: this.hora,
            rementente: this.rementente
        };
    }
}
