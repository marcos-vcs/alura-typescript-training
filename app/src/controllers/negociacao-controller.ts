import { DiasSemana } from './../enums/dias-semana.js';
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { logarTempoExecucao } from '../decorators/logar-tempo-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
  @domInjector("#data")
  private inputData: HTMLInputElement;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacaoService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoExecucao(true)
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
        this.inputData.value,
        this.inputQuantidade.value,
        this.inputValor.value
    );

    if (!this.ehDiaUtil(negociacao.data)) {
        this.mensagemView.update("Apenas negociações em dias úteis são aceitas.");
        return;
    }

    this.negociacoes.adiciona(negociacao);
    imprimir(negociacao);

    this.atualizaView();
    this.limparFormulario();
  }

  public importaDados(){
    this.negociacaoService.obterNegociacoes()
    .then(negociacoesDeHoje => {
      return negociacoesDeHoje.filter(negociacaoDeHoje => {
        return !this.negociacoes
        .lista()
        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
      })
    })
    .then(negociacoesDeHoje => {
      for(let negociacao of negociacoesDeHoje){
        this.negociacoes.adiciona(negociacao);
      }
      this.negociacoesView.update(this.negociacoes);
    })
  }

  private ehDiaUtil(date: Date): boolean {
    return date.getDay() > DiasSemana.DOMINGO && date.getDay() < DiasSemana.SABADO
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso :)");
  }
}
