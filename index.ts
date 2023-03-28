import { Lexador } from "@designliquido/delegua/fontes/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/fontes/avaliador-sintatico";
import { InterpretadorBase } from "@designliquido/delegua/fontes/interpretador/interpretador-base";
import tiposDeSimbolos from "@designliquido/delegua/fontes/tipos-de-simbolos/delegua";
import {
    AvaliadorSintaticoInterface,
    InterpretadorInterface,
    LexadorInterface,
    RetornoExecucaoInterface,
    SimboloInterface,
} from "@designliquido/delegua/fontes/interfaces/index";
import * as matematica from "@designliquido/delegua-matematica";
import { DeleguaModulo, FuncaoPadrao } from "@designliquido/delegua/fontes/estruturas";
import { TradutorJavaScript } from "@designliquido/delegua/fontes/tradutores";

export class DeleguaWeb {
    nomeArquivo: string;

    teveErro: boolean = false;
    teveErroEmTempoDeExecucao: boolean = false;
    // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
    dialeto: string = "delegua";
    arquivosAbertos: any;
    interpretador: InterpretadorBase;
    lexador: LexadorInterface;
    avaliadorSintatico: AvaliadorSintaticoInterface;
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
        this.interpretador = new InterpretadorBase(
            "",
            false,
            this.funcaoDeRetorno,
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
        retornoImportador: any,
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
        return "0.15";
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

    erro(simbolo: SimboloInterface, mensagemDeErro: string): void {
        const _simbolo = simbolo || { tipo: tiposDeSimbolos.EOF, linha: -1, lexema: '(indefinido)' };
        if (_simbolo.tipo === tiposDeSimbolos.EOF) {
            this.reportar(Number(_simbolo.linha), ' no final do código', mensagemDeErro);
        } else {
            this.reportar(Number(_simbolo.linha), ` no '${_simbolo.lexema}'`, mensagemDeErro);
        }
    }

    erroEmTempoDeExecucao(erro: any): void {
        const linha = erro?.simbolo?.linha || erro?.linha;
        const mensagem = erro?.mensagem || erro?.message;
        console.error(`Erro: [Linha: ${linha}]` + ` ${mensagem}`);
    }
}
