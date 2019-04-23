import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from '../../service/mensagem.service';
import { Mensagem } from '../../model/mensagem.model';
import { map } from 'rxjs/operators';
import { CorpoMensagem } from '../../model/corpo-mensagem.model';
@Component({
  selector: 'app-visualizar-contato',
  templateUrl: './visualizar-contato.page.html',
  styleUrls: ['./visualizar-contato.page.scss'],
})
export class VisualizarContatoPage implements OnInit {

  private idContato: string;
  private id: string;
  private msg: string;
  public mensagens: Mensagem[] = [];

  constructor(private route: ActivatedRoute, private mensagemService: MensagemService) {
    this.route.queryParams.subscribe((params) => {
     this.idContato = params.id;
     this.id = params.idLogado;
    });
    this.carregarMensagens();
  }

  ngOnInit() {
  }

  carregarNovasMensagens() {
    const self = this;
    this.mensagemService.consultar(this.idContato).snapshotChanges()
      .subscribe((ob) => {
        ob.forEach(docChange => {
          const m: Mensagem =  new Mensagem().deserialize(docChange.payload.doc.data());
          self.mensagens.push(m);
        });
      });
  }

  async carregarMensagens() {
    this.mensagens = [];
    const self = this;
    this.mensagemService.consultar().get().toPromise()
    .then(query => {
      query.docs.forEach(doc => {
        const m: Mensagem = new Mensagem().deserialize(doc.data());
        if (doc.id === self.id) {
          self.mensagens.push(m);
        }
      });
    });
  }

  enviarMensagem() {
    this.mensagemService.adicionar(this.gerarCorpo());
  }

  private gerarCorpo(): CorpoMensagem {
    const dt: Date = new Date();
    const corpo: CorpoMensagem = new CorpoMensagem();
    corpo.rementente = this.id;
    corpo.mensagem = this.msg;
    corpo.data = dt.toLocaleDateString();
    corpo.hora = dt.toLocaleTimeString();
    corpo.destinatario = this.idContato;
    return corpo;
  }
}
