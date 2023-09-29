import { Lexador } from "@designliquido/delegua/fontes/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/fontes/avaliador-sintatico";
import { AnalisadorSemantico } from "@designliquido/delegua/fontes/analisador-semantico";
import { InterpretadorBase } from "@designliquido/delegua/fontes/interpretador/interpretador-base";
import tiposDeSimbolos from "@designliquido/delegua/fontes/tipos-de-simbolos/delegua";
import {
    AvaliadorSintaticoInterface,
    LexadorInterface,
    RetornoExecucaoInterface,
    SimboloInterface,
} from "@designliquido/delegua/fontes/interfaces/index";
import { DeleguaModulo, FuncaoPadrao } from "@designliquido/delegua/fontes/estruturas";
import { TradutorJavaScript, TradutorPython, TradutorAssemblyScript } from "@designliquido/delegua/fontes/tradutores";

import * as estatistica from "@designliquido/delegua-estatistica";
import * as fisica from "@designliquido/delegua-fisica";
import * as matematica from "@designliquido/delegua-matematica";
import * as tempo from "@designliquido/delegua-tempo";
import { Declaracao } from "@designliquido/delegua/fontes/declaracoes";

export class DeleguaWeb {
    nomeArquivo: string;

    teveErro: boolean = false;
    teveErroEmTempoDeExecucao: boolean = false;
    // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
    dialeto: string = "delegua";
    arquivosAbertos: any;
    interpretador: InterpretadorBase;
    lexador: LexadorInterface<SimboloInterface>;
    avaliadorSintatico: AvaliadorSintaticoInterface<SimboloInterface, Declaracao>;
    analisadorSemantico: AnalisadorSemantico
    funcaoDeRetorno: Function;
    iniciarDelegua: any;
    carregarArquivo: any;
    conteudoArquivosAbertos: any;
    executarUmaLinha: any;
    tradutorJavascript = new TradutorJavaScript();
    tradutorPython = new TradutorPython();
    tradutorAssemblyScript = new TradutorAssemblyScript();

    constructor(nomeArquivo: string, funcaoDeRetorno: Function = null) {
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;

        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.analisadorSemantico = new AnalisadorSemantico();
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

        const moduloEstatistica = new DeleguaModulo("estatistica");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "estatistica",
            this.montarModulo(estatistica, moduloEstatistica)
        );

        const moduloFisica = new DeleguaModulo("fisica");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "fisica",
            this.montarModulo(fisica, moduloFisica)
        );

        const moduloMatematica = new DeleguaModulo("matematica");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "matematica",
            this.montarModulo(matematica, moduloMatematica)
        );

        const moduloTempo = new DeleguaModulo("tempo");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "tempo",
            this.montarModulo(tempo, moduloTempo)
        );
    }

    montarModulo(moduloNode: any, moduloDelegua: DeleguaModulo): DeleguaModulo {
        const chaves = Object.keys(moduloNode);
        for (let i = 0; i < chaves.length; i++) {
            const funcao = moduloNode[chaves[i]];
            moduloDelegua.componentes[chaves[i]] = new FuncaoPadrao(funcao.length, funcao);
        }

        return moduloDelegua;
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
        return "0.17";
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
