import { Lexer } from "@designliquido/delegua/src/lexador";
import { Parser } from "@designliquido/delegua/src/avaliador-sintatico";
import { Resolver } from "@designliquido/delegua/src/resolvedor";
import { Interpretador } from "@designliquido/delegua/src/interpretador";
import tiposDeSimbolos from "@designliquido/delegua/src/tiposDeSimbolos";

export class Delegua {
  nomeArquivo: any;

  teveErro: any;
  teveErroEmTempoDeExecucao: any;

  constructor(nomeArquivo: any) {
    this.nomeArquivo = nomeArquivo;

    this.teveErro = false;
    this.teveErroEmTempoDeExecucao = false;
  }

  runBlock(codigo: any) {
    const interpretador = new Interpretador(this, process.cwd());

    const lexer = new Lexer(this);
    const simbolos = lexer.scan(codigo);

    if (this.teveErro === true) return;

    const analisar = new Parser(this);
    const declaracoes = analisar.analisar(simbolos);

    if (this.teveErro === true) return;

    const resolver = new Resolver(this, interpretador);
    resolver.resolver(declaracoes);

    if (this.teveErro === true) return;

    interpretador.interpretar(declaracoes);
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
      else console.error(`Erro: [Linha: ${erro.simbolo.linha}] ${erro.mensagem}`);
    } else {
      console.error(`Erro: ${erro.mensagem}`);
    }
    this.teveErroEmTempoDeExecucao = true;
  }
};
