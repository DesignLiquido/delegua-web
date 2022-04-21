import { Lexador } from "@designliquido/delegua/fontes/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/fontes/avaliador-sintatico";
import { Resolvedor } from "@designliquido/delegua/fontes/resolvedor";
import { Interpretador } from "@designliquido/delegua/fontes/interpretador";
import tiposDeSimbolos from "@designliquido/delegua/fontes/tipos-de-simbolos";
import { DeleguaInterface } from "@designliquido/delegua/fontes/interfaces";

export class Delegua implements DeleguaInterface {
  nomeArquivo: any;

  teveErro: boolean;
  teveErroEmTempoDeExecucao: boolean;
  // TODO: Remover todos os `any` abaixo depois de mplementar DeleguaInterface.
  dialeto: any;
  arquivosAbertos: any;
  interpretador: any;
  lexador: any;
  avaliadorSintatico: any;
  resolvedor: any;
  versao: any;
  iniciarDelegua: any;
  carregarArquivo: any;

  constructor(nomeArquivo: any) {
    this.nomeArquivo = nomeArquivo;

    this.teveErro = false;
    this.teveErroEmTempoDeExecucao = false;
  }

  executar(codigo: string[], nomeArquivo?: string): void {
    const interpretador = new Interpretador(this, process.cwd());

    const lexador = new Lexador(false);
    const retornoLexador = lexador.mapear(codigo);

    if (this.teveErro) return;

    const avaliadorSintatico = new AvaliadorSintatico(false);
    const retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador);

    if (this.teveErro) return;

    const resolvedor = new Resolvedor();
    const retornoResolvedor = resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);

    if (this.teveErro) return;

    interpretador.interpretar(retornoAvaliadorSintatico.declaracoes, retornoResolvedor.locais);
  }

  reportar(linha: any, onde: any, mensagem: any) {
    if (this.nomeArquivo)
      console.error(
        `[Arquivo: ${this.nomeArquivo}] [Linha: ${linha}] Erro${onde}: ${mensagem}`
      );
    else console.error(`[Linha: ${linha}] Erro${onde}: ${mensagem}`);
    this.teveErro = true;
  }

  erro(simbolo: any, mensagemDeErro: any) {
    if (simbolo.tipo === tiposDeSimbolos.EOF) {
      this.reportar(simbolo.line, " no final", mensagemDeErro);
    } else {
      this.reportar(simbolo.line, ` no '${simbolo.lexema}'`, mensagemDeErro);
    }
  }

  lexerError(linha: any, caractere: any, mensagem: any) {
    this.reportar(linha, ` no '${caractere}'`, mensagem);
  }

  erroEmTempoDeExecucao(erro: any) {
    const linha = erro.simbolo.linha;
    if (erro.simbolo && linha) {
      if (this.nomeArquivo)
        console.error(
          `Erro: [Arquivo: ${this.nomeArquivo}] [Linha: ${erro.simbolo.linha}] ${erro.mensagem}`
        );
      else
        console.error(`Erro: [Linha: ${erro.simbolo.linha}] ${erro.mensagem}`);
    } else {
      console.error(`Erro: ${erro.mensagem}`);
    }
    this.teveErroEmTempoDeExecucao = true;
  }
}
