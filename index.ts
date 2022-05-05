import { ExcecaoRetornar } from '@designliquido/delegua/fontes/excecoes';
import { Lexador } from "@designliquido/delegua/fontes/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/fontes/avaliador-sintatico";
import { Resolvedor } from "@designliquido/delegua/fontes/resolvedor";
import { Interpretador } from "@designliquido/delegua/fontes/interpretador";
import tiposDeSimbolos from "@designliquido/delegua/fontes/tipos-de-simbolos";
import { 
  AvaliadorSintaticoInterface,
  DeleguaInterface,
  ImportadorInterface,
  InterpretadorInterface,
  LexadorInterface,
  SimboloInterface
} from "@designliquido/delegua/fontes/interfaces/index";
import { RetornoImportador } from '@designliquido/delegua/fontes/importador';

export class Delegua implements DeleguaInterface {
  nomeArquivo: string;

  teveErro: boolean;
  teveErroEmTempoDeExecucao: boolean;
  // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
  dialeto: string = 'delegua';
  arquivosAbertos: any;
  interpretador: InterpretadorInterface;
  lexador: LexadorInterface;
  avaliadorSintatico: AvaliadorSintaticoInterface;
  resolvedor: Resolvedor;
  importador: ImportadorInterface;
  funcaoDeRetorno: Function;
  iniciarDelegua: any;
  carregarArquivo: any;

  constructor(nomeArquivo: string, funcaoDeRetorno: Function = null) {
    this.nomeArquivo = nomeArquivo;
    this.funcaoDeRetorno = funcaoDeRetorno || console.log;

    this.resolvedor = new Resolvedor();
    this.lexador = new Lexador();
    this.avaliadorSintatico = new AvaliadorSintatico();
    this.interpretador = new Interpretador(null, this.resolvedor, '', false, this.funcaoDeRetorno);

    this.teveErro = false;
    this.teveErroEmTempoDeExecucao = false;
  }

  executar(retornoImportador: RetornoImportador): void {

    const retornoLexador = this.lexador.mapear(retornoImportador.codigo);
    const retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador);

    if (retornoLexador.erros.length > 0) {
      for (const erroLexador of retornoLexador.erros) {
          this.reportar(erroLexador.linha, ` no '${erroLexador.caractere}'`, erroLexador.mensagem);
        }
        return;
    }

    if (retornoAvaliadorSintatico.erros.length > 0) {
        for (const erroAvaliadorSintatico of retornoAvaliadorSintatico.erros) {
            this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
        }
        return;
    }

    const retornoInterpretador = this.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);

    if (retornoInterpretador.erros.length > 0) {
        for (const erroInterpretador of retornoInterpretador.erros) {
            if (erroInterpretador.simbolo) {
                this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
            } else {
                const erroEmJavaScript: any = erroInterpretador as any;
                console.error(`Erro em JavaScript: ` + `${erroEmJavaScript.message}`);
                console.error(`Pilha de execução: ` + `${erroEmJavaScript.stack}`);
            }
        }
    }
  }

  versao(){
      return '0.2'
  }

  reportar(linha: number, onde: any, mensagem: string) {
    if (this.nomeArquivo)
        console.error(
            `[Arquivo: ${this.nomeArquivo}] [Linha: ${linha}]` + ` Erro${onde}: ${mensagem}`
        );
    else console.error(`[Linha: ${linha}]` +  ` Erro${onde}: ${mensagem}`);
    this.teveErro = true;
  }

  erro(simbolo: SimboloInterface, mensagemDeErro: string) {
    if (simbolo.tipo === tiposDeSimbolos.EOF) {
        this.reportar(Number(simbolo.linha), ' no final', mensagemDeErro);
    } else {
        this.reportar(
            Number(simbolo.linha),
            ` no '${simbolo.lexema}'`,
            mensagemDeErro
        );
    }
  }

  erroEmTempoDeExecucao(erro: any): void {
    if (erro && erro.simbolo && erro.simbolo.linha) {
        if (this.nomeArquivo)
            console.error(
                `Erro: [Arquivo: ${this.nomeArquivo}] [Linha: ${erro.simbolo.linha}]` + ` ${erro.mensagem}`
            );
        else
            console.error(
                `Erro: [Linha: ${erro.simbolo.linha}]` + ` ${erro.mensagem}`
            );
    } else if (!(erro instanceof ExcecaoRetornar)) { // TODO: Se livrar de ExcecaoRetornar.
        console.error(`Erro: [Linha: ${erro.linha || 0}]` + ` ${erro.mensagem}`);
    }

    this.teveErroEmTempoDeExecucao = true;
  }
}
