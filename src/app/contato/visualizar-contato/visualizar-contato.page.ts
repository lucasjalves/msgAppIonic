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

  public idContato: string;
  public id: string;
  public msg: string;
  public mensagens: Mensagem;

  public fodase = 'adsadasd';
  constructor(private route: ActivatedRoute, private mensagemService: MensagemService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idContato = params.id;
      this.id = params.idLogado;
     });
     this.carregarMensagens();
  }

  carregarNovasMensagens() {
    const self = this;
    this.mensagemService.consultar(this.idContato).snapshotChanges()
      .subscribe((ob) => {
        ob.forEach(docChange => {
          const m: Mensagem =  new Mensagem().deserialize(docChange.payload.doc.data());
          self.mensagens = m;
        });
      });
  }

  async carregarMensagens() {
    this.mensagens = new Mensagem();
    const self = this;
    this.mensagemService.consultar().get().toPromise()
    .then(query => {
      query.docs.forEach(doc => {
        const m: Mensagem = new Mensagem().deserialize(doc.data());
        if (m.idDestinatario === self.idContato || m.idRemetente === self.id) {
          self.mensagens = m;
        }
      });
    });
  }

  enviarMensagem() {
    const self = this;
    this.mensagemService.adicionar(this.gerarCorpo()).then(response => {
      self.carregarMensagens();
    });
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
