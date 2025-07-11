import { Lexador } from "@designliquido/delegua/lexador";
import { AvaliadorSintatico } from "@designliquido/delegua/avaliador-sintatico";
import { AnalisadorSemantico } from "@designliquido/delegua/analisador-semantico";
import { Interpretador } from "@designliquido/delegua/interpretador";

import {
    AvaliadorSintaticoInterface,
    LexadorInterface,
    RetornoExecucaoInterface,
    SimboloInterface,
} from "@designliquido/delegua/interfaces";
import { DeleguaModulo, FuncaoPadrao } from "@designliquido/delegua/interpretador/estruturas";
import { TradutorJavaScript, TradutorPython, TradutorAssemblyScript } from "@designliquido/delegua/tradutores";
import { Declaracao } from "@designliquido/delegua/declaracoes";

import * as estatistica from "@designliquido/delegua-estatistica";
import * as fisica from "@designliquido/delegua-fisica";
import * as matematica from "@designliquido/delegua-matematica";
import * as tempo from "@designliquido/delegua-tempo";
import { ObjetoData } from "@designliquido/delegua-tempo/objeto-data";

import tiposDeSimbolos from "@designliquido/delegua/tipos-de-simbolos/delegua";
import { InformacaoVariavelOuConstante } from "@designliquido/delegua/informacao-variavel-ou-constante";

import { InterpretadorWeb } from "./interpretador-web";

export class DeleguaWeb {
    nomeArquivo: string;

    teveErro: boolean = false;
    teveErroEmTempoDeExecucao: boolean = false;

    dialeto: string = "delegua";
    interpretador: Interpretador;
    lexador: LexadorInterface<SimboloInterface>;
    avaliadorSintatico: AvaliadorSintaticoInterface<SimboloInterface, Declaracao>;
    analisadorSemantico: AnalisadorSemantico;
    funcaoDeRetorno: Function;

    tradutorJavascript = new TradutorJavaScript();
    tradutorPython = new TradutorPython();
    tradutorAssemblyScript = new TradutorAssemblyScript();

    constructor(nomeArquivo: string, funcaoDeRetorno: Function = null) {
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;

        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.analisadorSemantico = new AnalisadorSemantico();
        this.interpretador = new InterpretadorWeb(
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
            this.montarModulo(moduloEstatistica, estatistica)
        );

        const moduloFisica = new DeleguaModulo("fisica");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "fisica",
            this.montarModulo(moduloFisica, fisica)
        );

        const moduloMatematica = new DeleguaModulo("matematica");
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "matematica",
            this.montarModulo(moduloMatematica, matematica)
        );

        const moduloTempo = new DeleguaModulo("tempo");
        // TODO: Pensar numa forma de exportar sem precisar fazer isso.
        const moduloTempoResolvido = this.montarModulo(moduloTempo, tempo, {'ObjetoData': ObjetoData});
        this.interpretador.pilhaEscoposExecucao.definirVariavel(
            "tempo",
            moduloTempoResolvido
        );

        (this.avaliadorSintatico as any).tiposDefinidosEmCodigo['tempo'] = 'módulo';
        const primitivasConhecidas: { [nomeModuloOuClasse: string]: {[nomePrimitiva: string]: InformacaoVariavelOuConstante }} = (this.avaliadorSintatico as any).primitivasConhecidas;
        primitivasConhecidas['tempo'] = {};
        for (const nomeComponente in moduloTempoResolvido.componentes) {
            primitivasConhecidas['tempo'][nomeComponente] = new InformacaoVariavelOuConstante(nomeComponente, 'qualquer', []);
        }
    }

    montarModulo(moduloDelegua: DeleguaModulo, ...modulosNode: any[]): DeleguaModulo {
        for (const moduloNode of modulosNode) {
            const chaves = Object.keys(moduloNode);
            for (let i = 0; i < chaves.length; i++) {
                const funcao = moduloNode[chaves[i]];
                moduloDelegua.componentes[chaves[i]] = new FuncaoPadrao(funcao.length, funcao);
            }
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
        return "0.42 (web)";
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
