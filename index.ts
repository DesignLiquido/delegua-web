import { Lexador } from "@designliquido/delegua/fontes/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/fontes/avaliador-sintatico";
import { Interpretador } from "@designliquido/delegua/fontes/interpretador";
import tiposDeSimbolos from "@designliquido/delegua/fontes/tipos-de-simbolos/delegua";
import {
    AvaliadorSintaticoInterface,
    DeleguaInterface,
    ImportadorInterface,
    InterpretadorInterface,
    LexadorInterface,
    RetornoExecucaoInterface,
    SimboloInterface,
} from "@designliquido/delegua/fontes/interfaces/index";
import { RetornoImportador } from "@designliquido/delegua/fontes/importador";
import * as matematica from "@designliquido/delegua-matematica";
import { DeleguaModulo, FuncaoPadrao } from "@designliquido/delegua/fontes/estruturas";
import { TradutorJavaScript } from "@designliquido/delegua/fontes/tradutores";

export class DeleguaWeb implements DeleguaInterface {
    nomeArquivo: string;

    teveErro: boolean = false;
    teveErroEmTempoDeExecucao: boolean = false;
    // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
    dialeto: string = "delegua";
    arquivosAbertos: any;
    interpretador: InterpretadorInterface;
    lexador: LexadorInterface;
    avaliadorSintatico: AvaliadorSintaticoInterface;
    importador: ImportadorInterface;
    funcaoDeRetorno: Function;
    iniciarDelegua: any;
    carregarArquivo: any;
    conteudoArquivosAbertos: any;
    executarUmaLinha: any;
    tradutorJavascript = new TradutorJavaScript();

    constructor(nomeArquivo: string, funcaoDeRetorno: Function = null) {
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;

        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.interpretador = new Interpretador(
            null,
            "",
            false,
            this.funcaoDeRetorno
        );

        (this.interpretador as any).interfaceEntradaSaida = {
            question: (mensagem: string, callback: (resposta: any) => any) => {
                const resposta = window.prompt(mensagem);
                callback(resposta);
            }
        }

        const moduloMatematica = new DeleguaModulo("matematica");
        const chaves = Object.keys(matematica);
        for (let i = 0; i < chaves.length; i++) {
            const funcao = matematica[chaves[i]];
            moduloMatematica.componentes[chaves[i]] = new FuncaoPadrao(funcao.length, funcao);
        }

        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "matematica",
            moduloMatematica
        );
    }

    async executar(
        retornoImportador: RetornoImportador,
        manterAmbiente: boolean = false
    ): Promise<RetornoExecucaoInterface> {
        if (retornoImportador.retornoLexador.erros.length > 0) {
            for (const erroLexador of retornoImportador.retornoLexador.erros) {
                this.reportar(
                    erroLexador.linha,
                    ` no '${erroLexador.caractere}'`,
                    erroLexador.mensagem
                );
            }
            return;
        }

        if (retornoImportador.retornoAvaliadorSintatico.erros.length > 0) {
            for (const erroAvaliadorSintatico of retornoImportador
                .retornoAvaliadorSintatico.erros) {
                this.erro(
                    erroAvaliadorSintatico.simbolo,
                    erroAvaliadorSintatico.message
                );
            }
            return;
        }

        const retornoInterpretador = await this.interpretador.interpretar(
            retornoImportador.retornoAvaliadorSintatico.declaracoes,
            manterAmbiente
        );

        if (retornoInterpretador.erros.length > 0) {
            for (const erroInterpretador of retornoInterpretador.erros) {
                if (erroInterpretador.simbolo) {
                    this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
                } else {
                    const erroEmJavaScript: any = erroInterpretador as any;
                    console.error(
                        `Erro em JavaScript: ` + `${erroEmJavaScript.message}`
                    );
                    console.error(
                        `Pilha de execução: ` + `${erroEmJavaScript.stack}`
                    );
                }
            }
        }

        return {
            erros: retornoInterpretador.erros,
            resultado: retornoInterpretador.resultado,
        };
    }

    versao() {
        return "0.11";
    }

    reportar(linha: number, onde: any, mensagem: string) {
        if (this.nomeArquivo)
            console.error(
                `[Arquivo: ${this.nomeArquivo}] [Linha: ${linha}]` +
                    ` Erro${onde}: ${mensagem}`
            );
        else console.error(`[Linha: ${linha}]` + ` Erro${onde}: ${mensagem}`);
        this.teveErro = true;
    }

    erro(simbolo: SimboloInterface, mensagemDeErro: string) {
        if (simbolo.tipo === tiposDeSimbolos.EOF) {
            this.reportar(Number(simbolo.linha), " no final", mensagemDeErro);
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
                    `Erro: [Arquivo: ${this.nomeArquivo}] [Linha: ${erro.simbolo.linha}]` +
                        ` ${erro.mensagem}`
                );
            else
                console.error(
                    `Erro: [Linha: ${erro.simbolo.linha}]` + ` ${erro.mensagem}`
                );
        } else {
            console.error(
                `Erro: [Linha: ${erro.linha || 0}]` + ` ${erro.mensagem}`
            );
        }

        this.teveErroEmTempoDeExecucao = true;
    }
}
