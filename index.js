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
    function Delegua(nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
    }
    Delegua.prototype.executar = function (codigo, nomeArquivo) {
        var interpretador = new interpretador_1.Interpretador(this, process.cwd());
        var lexador = new lexador_1.Lexador(false);
        var retornoLexador = lexador.mapear(codigo);
        if (this.teveErro)
            return;
        var avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico(false);
        var retornoAvaliadorSintatico = avaliadorSintatico.analisar(retornoLexador);
        if (this.teveErro)
            return;
        var resolvedor = new resolvedor_1.Resolvedor();
        var retornoResolvedor = resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
        if (this.teveErro)
            return;
        interpretador.interpretar(retornoAvaliadorSintatico.declaracoes, retornoResolvedor.locais);
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === tipos_de_simbolos_1["default"].EOF) {
            this.reportar(simbolo.line, " no final", mensagemDeErro);
        }
        else {
            this.reportar(simbolo.line, " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    Delegua.prototype.lexerError = function (linha, caractere, mensagem) {
        this.reportar(linha, " no '".concat(caractere, "'"), mensagem);
    };
    Delegua.prototype.erroEmTempoDeExecucao = function (erro) {
        var linha = erro.simbolo.linha;
        if (erro.simbolo && linha) {
            if (this.nomeArquivo)
                console.error("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "] ").concat(erro.mensagem));
            else
                console.error("Erro: [Linha: ".concat(erro.simbolo.linha, "] ").concat(erro.mensagem));
        }
        else {
            console.error("Erro: ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return Delegua;
}());
exports.Delegua = Delegua;
//# sourceMappingURL=index.js.map