"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delegua = void 0;
var lexador_1 = require("@designliquido/delegua/fontes/lexador");
var avaliador_sintatico_1 = require("@designliquido/delegua/fontes/avaliador-sintatico");
var resolvedor_1 = require("@designliquido/delegua/fontes/resolvedor");
var interpretador_1 = require("@designliquido/delegua/fontes/interpretador");
var tipos_de_simbolos_1 = __importDefault(require("@designliquido/delegua/fontes/tipos-de-simbolos"));
var Delegua = /** @class */ (function () {
    function Delegua(nomeArquivo, funcaoDeRetorno) {
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
        // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
        this.dialeto = 'delegua';
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.resolvedor = new resolvedor_1.Resolvedor();
        this.lexador = new lexador_1.Lexador();
        this.avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico();
        this.interpretador = new interpretador_1.Interpretador(null, this.resolvedor, '', false, this.funcaoDeRetorno);
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
    }
    Delegua.prototype.executar = function (retornoImportador, manterAmbiente) {
        if (manterAmbiente === void 0) { manterAmbiente = false; }
        if (retornoImportador.retornoLexador.erros.length > 0) {
            for (var _i = 0, _a = retornoImportador.retornoLexador.erros; _i < _a.length; _i++) {
                var erroLexador = _a[_i];
                this.reportar(erroLexador.linha, " no '".concat(erroLexador.caractere, "'"), erroLexador.mensagem);
            }
            return;
        }
        if (retornoImportador.retornoAvaliadorSintatico.erros.length > 0) {
            for (var _b = 0, _c = retornoImportador.retornoAvaliadorSintatico.erros; _b < _c.length; _b++) {
                var erroAvaliadorSintatico = _c[_b];
                this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
            }
            return;
        }
        var retornoInterpretador = this.interpretador.interpretar(retornoImportador.retornoAvaliadorSintatico.declaracoes, manterAmbiente);
        if (retornoInterpretador.erros.length > 0) {
            for (var _d = 0, _e = retornoInterpretador.erros; _d < _e.length; _d++) {
                var erroInterpretador = _e[_d];
                if (erroInterpretador.simbolo) {
                    this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
                }
                else {
                    var erroEmJavaScript = erroInterpretador;
                    console.error("Erro em JavaScript: " + "".concat(erroEmJavaScript.message));
                    console.error("Pilha de execu\u00E7\u00E3o: " + "".concat(erroEmJavaScript.stack));
                }
            }
        }
        return {
            erros: {
                lexador: retornoImportador.retornoLexador.erros,
                avaliadorSintatico: retornoImportador.retornoAvaliadorSintatico.erros,
                interpretador: retornoInterpretador.erros
            },
            resultado: retornoInterpretador.resultado
        };
    };
    Delegua.prototype.versao = function () {
        return '0.4';
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === tipos_de_simbolos_1["default"].EOF) {
            this.reportar(Number(simbolo.linha), ' no final', mensagemDeErro);
        }
        else {
            this.reportar(Number(simbolo.linha), " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    Delegua.prototype.erroEmTempoDeExecucao = function (erro) {
        if (erro && erro.simbolo && erro.simbolo.linha) {
            if (this.nomeArquivo)
                console.error("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "]") + " ".concat(erro.mensagem));
            else
                console.error("Erro: [Linha: ".concat(erro.simbolo.linha, "]") + " ".concat(erro.mensagem));
        }
        else {
            console.error("Erro: [Linha: ".concat(erro.linha || 0, "]") + " ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return Delegua;
}());
exports.Delegua = Delegua;
//# sourceMappingURL=index.js.map