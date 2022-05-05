(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Delegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delegua = void 0;
var excecoes_1 = require("@designliquido/delegua/fontes/excecoes");
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
    Delegua.prototype.executar = function (retornoImportador) {
        var retornoLexador = this.lexador.mapear(retornoImportador.codigo);
        var retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador);
        if (retornoLexador.erros.length > 0) {
            for (var _i = 0, _a = retornoLexador.erros; _i < _a.length; _i++) {
                var erroLexador = _a[_i];
                this.reportar(erroLexador.linha, " no '".concat(erroLexador.caractere, "'"), erroLexador.mensagem);
            }
            return;
        }
        if (retornoAvaliadorSintatico.erros.length > 0) {
            for (var _b = 0, _c = retornoAvaliadorSintatico.erros; _b < _c.length; _b++) {
                var erroAvaliadorSintatico = _c[_b];
                this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
            }
            return;
        }
        var retornoInterpretador = this.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes);
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
    };
    Delegua.prototype.versao = function () {
        return '0.2';
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
        else if (!(erro instanceof excecoes_1.ExcecaoRetornar)) { // TODO: Se livrar de ExcecaoRetornar.
            console.error("Erro: [Linha: ".concat(erro.linha || 0, "]") + " ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return Delegua;
}());
exports.Delegua = Delegua;

},{"@designliquido/delegua/fontes/avaliador-sintatico":5,"@designliquido/delegua/fontes/excecoes":56,"@designliquido/delegua/fontes/interpretador":58,"@designliquido/delegua/fontes/lexador":61,"@designliquido/delegua/fontes/resolvedor":67,"@designliquido/delegua/fontes/tipos-de-simbolos":69}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambiente = void 0;
var estruturas_1 = require("./estruturas");
var excecoes_1 = require("./excecoes");
var Ambiente = /** @class */ (function () {
    function Ambiente(enclosing) {
        this.enclosing = enclosing || null;
        this.valores = {};
    }
    Ambiente.prototype.definirVariavel = function (nomeVariavel, valor) {
        this.valores[nomeVariavel] = valor;
    };
    Ambiente.prototype.atribuirVariavelEm = function (distancia, simbolo, valor) {
        this.ancestor(distancia).valores[simbolo.lexema] = valor;
    };
    Ambiente.prototype.atribuirVariavel = function (simbolo, valor) {
        if (this.valores[simbolo.lexema] !== undefined) {
            this.valores[simbolo.lexema] = valor;
            return;
        }
        if (this.enclosing != null) {
            this.enclosing.atribuirVariavel(simbolo, valor);
            return;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    };
    Ambiente.prototype.ancestor = function (distancia) {
        var ambiente = this;
        for (var i = 0; i < distancia; i++) {
            ambiente = ambiente.enclosing;
        }
        return ambiente;
    };
    Ambiente.prototype.obterVariavelEm = function (distancia, nome) {
        return this.ancestor(distancia).valores[nome];
    };
    Ambiente.prototype.obterVariavel = function (simbolo) {
        if (this.valores[simbolo.lexema] !== undefined) {
            return this.valores[simbolo.lexema];
        }
        if (this.enclosing !== null)
            return this.enclosing.obterVariavel(simbolo);
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    };
    /**
     * Obtém todas as definições de funções feitas ou por código-fonte, ou pelo desenvolvedor
     * em console.
     */
    Ambiente.prototype.obterTodasDeleguaFuncao = function () {
        var retorno = {};
        for (var _i = 0, _a = Object.entries(this.valores); _i < _a.length; _i++) {
            var _b = _a[_i], nome = _b[0], corpo = _b[1];
            if (corpo instanceof estruturas_1.DeleguaFuncao) {
                retorno[nome] = corpo;
            }
        }
        return retorno;
    };
    return Ambiente;
}());
exports.Ambiente = Ambiente;
;

},{"./estruturas":49,"./excecoes":56}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintatico = void 0;
var tipos_de_simbolos_1 = __importDefault(require("../tipos-de-simbolos"));
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var construtos_1 = require("../construtos");
var erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
var declaracoes_1 = require("../declaracoes");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
var AvaliadorSintatico = /** @class */ (function () {
    function AvaliadorSintatico(performance) {
        if (performance === void 0) { performance = false; }
        this.atual = 0;
        this.ciclos = 0;
        this.erros = [];
        this.performance = performance;
    }
    AvaliadorSintatico.prototype.sincronizar = function () {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            if (this.simboloAnterior().tipo === tipos_de_simbolos_1.default.PONTO_E_VIRGULA)
                return;
            switch (this.simboloAtual().tipo) {
                case tipos_de_simbolos_1.default.CLASSE:
                case tipos_de_simbolos_1.default.FUNCAO:
                case tipos_de_simbolos_1.default.FUNÇÃO:
                case tipos_de_simbolos_1.default.VARIAVEL:
                case tipos_de_simbolos_1.default.PARA:
                case tipos_de_simbolos_1.default.SE:
                case tipos_de_simbolos_1.default.ENQUANTO:
                case tipos_de_simbolos_1.default.ESCREVA:
                case tipos_de_simbolos_1.default.RETORNA:
                    return;
            }
            this.avancarEDevolverAnterior();
        }
    };
    AvaliadorSintatico.prototype.erro = function (simbolo, mensagemDeErro) {
        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    };
    AvaliadorSintatico.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simboloAtual(), mensagemDeErro);
    };
    AvaliadorSintatico.prototype.verificarTipoSimboloAtual = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    };
    AvaliadorSintatico.prototype.verificarTipoProximoSimbolo = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    AvaliadorSintatico.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    AvaliadorSintatico.prototype.simboloAnterior = function () {
        return this.simbolos[this.atual - 1];
    };
    AvaliadorSintatico.prototype.simboloNaPosicao = function (posicao) {
        return this.simbolos[this.atual + posicao];
    };
    AvaliadorSintatico.prototype.estaNoFinal = function () {
        var simboloAtual = this.simboloAtual();
        if (simboloAtual &&
            simboloAtual.tipo === tipos_de_simbolos_1.default.PONTO_E_VIRGULA) {
            return true;
        }
        return this.atual === this.simbolos.length;
    };
    AvaliadorSintatico.prototype.avancarEDevolverAnterior = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simboloAnterior();
    };
    AvaliadorSintatico.prototype.verificarSeSimboloAtualEIgualA = function () {
        var argumentos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argumentos[_i] = arguments[_i];
        }
        for (var i = 0; i < argumentos.length; i++) {
            var tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }
        return false;
    };
    AvaliadorSintatico.prototype.primario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SUPER)) {
            var palavraChave = this.simboloAnterior();
            this.consumir(tipos_de_simbolos_1.default.PONTO, "Esperado '.' após 'super'.");
            var metodo = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome do método da SuperClasse.');
            return new construtos_1.Super(0, palavraChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.COLCHETE_ESQUERDO)) {
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(0, []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.COLCHETE_DIREITO)) {
                var valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !==
                    tipos_de_simbolos_1.default.COLCHETE_DIREITO) {
                    this.consumir(tipos_de_simbolos_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(0, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CHAVE_ESQUERDA)) {
            var chaves = [];
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(0, [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CHAVE_DIREITA)) {
                var chave = this.atribuir();
                this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                var valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== tipos_de_simbolos_1.default.CHAVE_DIREITA) {
                    this.consumir(tipos_de_simbolos_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Dicionario(0, chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FUNÇÃO))
            return this.corpoDaFuncao('função');
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FUNCAO))
            return this.corpoDaFuncao('funcao');
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FALSO))
            return new construtos_1.Literal(0, false);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VERDADEIRO))
            return new construtos_1.Literal(0, true);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NULO))
            return new construtos_1.Literal(0, null);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.ISTO))
            return new construtos_1.Isto(0, this.simboloAnterior());
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NUMERO, tipos_de_simbolos_1.default.TEXTO)) {
            var simboloAnterior = this.simboloAnterior();
            return new construtos_1.Literal(Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.simboloAnterior());
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO)) {
            var expr = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(0, expr);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), 'Esperado expressão.');
    };
    AvaliadorSintatico.prototype.finalizarChamada = function (entidadeChamada) {
        var argumentos = [];
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VIRGULA));
        }
        var parenteseDireito = this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(entidadeChamada, parenteseDireito, argumentos);
    };
    AvaliadorSintatico.prototype.chamar = function () {
        var expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PONTO)) {
                var nome = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.COLCHETE_ESQUERDO)) {
                var indice = this.expressao();
                var simboloFechamento = this.consumir(tipos_de_simbolos_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NEGACAO, tipos_de_simbolos_1.default.SUBTRACAO, tipos_de_simbolos_1.default.BIT_NOT)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            return new construtos_1.Unario(operador, direito);
        }
        return this.chamar();
    };
    AvaliadorSintatico.prototype.exponenciacao = function () {
        var expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.EXPONENCIACAO)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.multiplicar = function () {
        var expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.DIVISAO, tipos_de_simbolos_1.default.MULTIPLICACAO, tipos_de_simbolos_1.default.MODULO)) {
            var operador = this.simboloAnterior();
            var direito = this.exponenciacao();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.adicionar = function () {
        var expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SUBTRACAO, tipos_de_simbolos_1.default.ADICAO)) {
            var operador = this.simboloAnterior();
            var direito = this.multiplicar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitFill = function () {
        var expressao = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MENOR_MENOR, tipos_de_simbolos_1.default.MAIOR_MAIOR)) {
            var operador = this.simboloAnterior();
            var direito = this.adicionar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitE = function () {
        var expressao = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.BIT_AND)) {
            var operador = this.simboloAnterior();
            var direito = this.bitFill();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitOu = function () {
        var expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.BIT_OR, tipos_de_simbolos_1.default.BIT_XOR)) {
            var operador = this.simboloAnterior();
            var direito = this.bitE();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.comparar = function () {
        var expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MAIOR, tipos_de_simbolos_1.default.MAIOR_IGUAL, tipos_de_simbolos_1.default.MENOR, tipos_de_simbolos_1.default.MENOR_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.bitOu();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.comparacaoIgualdade = function () {
        var expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.DIFERENTE, tipos_de_simbolos_1.default.IGUAL_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.comparar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.em = function () {
        var expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.EM)) {
            var operador = this.simboloAnterior();
            var direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.e = function () {
        var expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.E)) {
            var operador = this.simboloAnterior();
            var direito = this.em();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.ou = function () {
        var expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.OU)) {
            var operador = this.simboloAnterior();
            var direito = this.e();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.atribuir = function () {
        var expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MAIS_IGUAL)) {
            var igual = this.simboloAnterior();
            var valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                var simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                var get = expressao;
                return new construtos_1.Conjunto(0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoSobrescrita(0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.expressao = function () {
        return this.atribuir();
    };
    AvaliadorSintatico.prototype.declaracaoEscreva = function () {
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var simbolo = this.expressao();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(simbolo);
    };
    AvaliadorSintatico.prototype.declaracaoExpressao = function () {
        var expressao = this.expressao();
        return new declaracoes_1.Expressao(expressao);
    };
    AvaliadorSintatico.prototype.blocoEscopo = function () {
        var declaracoes = [];
        while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(tipos_de_simbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    };
    AvaliadorSintatico.prototype.declaracaoSe = function () {
        var simboloSe = this.simboloAnterior();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var caminhoEntao = this.resolverDeclaracao();
        var caminhosSeSenao = [];
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENAOSE, tipos_de_simbolos_1.default.SENÃOSE)) {
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senaose' ou 'senãose'.");
            var condicaoSeSenao = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após codição do 'senaose' ou 'senãose'.");
            var caminho = this.resolverDeclaracao();
            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        var caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENAO, tipos_de_simbolos_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(Number(simboloSe.linha), condicao, caminhoEntao, caminhosSeSenao, caminhoSenao);
    };
    AvaliadorSintatico.prototype.declaracaoEnquanto = function () {
        try {
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            var condicao = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.declaracaoPara = function () {
        try {
            var simboloPara = this.simboloAnterior();
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            var inicializador = void 0;
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            var condicao = null;
            if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            var incrementar = null;
            if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.declaracaoSustar = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'sustar' ou 'pausa' deve estar dentro de um loop.");
        }
        return new declaracoes_1.Sustar();
    };
    AvaliadorSintatico.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua();
    };
    AvaliadorSintatico.prototype.declaracaoRetorna = function () {
        var palavraChave = this.simboloAnterior();
        var valor = null;
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(palavraChave, valor);
    };
    AvaliadorSintatico.prototype.declaracaoEscolha = function () {
        try {
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            var condicao = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            var caminhos = [];
            var caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CHAVE_DIREITA) &&
                !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CASO)) {
                    var branchConditions = [this.expressao()];
                    this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CASO)) {
                        this.consumir(tipos_de_simbolos_1.default.CASO, null);
                        branchConditions.push(this.expressao());
                        this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        conditions: branchConditions,
                        declaracoes: declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simboloAtual(), "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA));
                    caminhoPadrao = {
                        declaracoes: declaracoes,
                    };
                }
            }
            return new declaracoes_1.Escolha(condicao, caminhos, caminhoPadrao);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.declaracaoImportar = function () {
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var simboloFechamento = this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    };
    AvaliadorSintatico.prototype.declaracaoTente = function () {
        this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        var blocoTente = this.blocoEscopo();
        var blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PEGUE)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoPegue = this.blocoEscopo();
        }
        var blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENAO, tipos_de_simbolos_1.default.SENÃO)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoSenao = this.blocoEscopo();
        }
        var blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FINALMENTE)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(blocoTente, blocoPegue, blocoSenao, blocoFinalmente);
    };
    AvaliadorSintatico.prototype.declaracaoFazer = function () {
        try {
            this.ciclos += 1;
            var caminhoFazer = this.resolverDeclaracao();
            this.consumir(tipos_de_simbolos_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            var condicaoEnquanto = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.resolverDeclaracao = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.TENTE))
            return this.declaracaoTente();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PAUSA))
            return this.declaracaoSustar();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.ESCREVA))
            return this.declaracaoEscreva();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CHAVE_ESQUERDA))
            return new declaracoes_1.Bloco(this.blocoEscopo());
        return this.declaracaoExpressao();
    };
    AvaliadorSintatico.prototype.declaracaoDeVariavel = function () {
        var simbolo = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MAIS_IGUAL)) {
            inicializador = this.expressao();
        }
        return new declaracoes_1.Var(simbolo, inicializador);
    };
    AvaliadorSintatico.prototype.funcao = function (tipo) {
        var simbolo = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, "Esperado nome ".concat(tipo, "."));
        return new declaracoes_1.Funcao(simbolo, this.corpoDaFuncao(tipo));
    };
    AvaliadorSintatico.prototype.corpoDaFuncao = function (tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        var parenteseEsquerdo = this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(tipo, "."));
        var parametros = [];
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (parametros.length >= 255) {
                    this.erro(this.simboloAtual(), 'Não pode haver mais de 255 parâmetros');
                }
                var paramObj = {};
                if (this.simboloAtual().tipo === tipos_de_simbolos_1.default.MULTIPLICACAO) {
                    this.consumir(tipos_de_simbolos_1.default.MULTIPLICACAO, null);
                    paramObj['tipo'] = 'wildcard';
                }
                else {
                    paramObj['tipo'] = 'standard';
                }
                paramObj['nome'] = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
                if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IGUAL)) {
                    paramObj['default'] = this.primario();
                }
                parametros.push(paramObj);
                if (paramObj['tipo'] === 'wildcard')
                    break;
            } while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VIRGULA));
        }
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do ".concat(tipo, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(Number(parenteseEsquerdo.linha), parametros, corpo);
    };
    AvaliadorSintatico.prototype.declaracaoDeClasse = function () {
        var simbolo = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        var superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.HERDA)) {
            this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome da SuperClasse.');
            superClasse = new construtos_1.Variavel(this.simboloAnterior());
        }
        this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        var metodos = [];
        while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        this.consumir(tipos_de_simbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    };
    AvaliadorSintatico.prototype.declaracao = function () {
        try {
            if (this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.FUNÇÃO) &&
                this.verificarTipoProximoSimbolo(tipos_de_simbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tipos_de_simbolos_1.default.FUNÇÃO, null);
                return this.funcao('função');
            }
            if (this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.FUNCAO) &&
                this.verificarTipoProximoSimbolo(tipos_de_simbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tipos_de_simbolos_1.default.FUNCAO, null);
                return this.funcao('funcao');
            }
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    };
    AvaliadorSintatico.prototype.analisar = function (retornoLexador) {
        var inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.ciclos = 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        var declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        var deltaAnalise = (0, browser_process_hrtime_1.default)(inicioAnalise);
        if (this.performance) {
            console.log("[Avaliador Sint\u00E1tico] Tempo para an\u00E1lise: ".concat(deltaAnalise[0] * 1e9 + deltaAnalise[1], "ns"));
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros
        };
    };
    return AvaliadorSintatico;
}());
exports.AvaliadorSintatico = AvaliadorSintatico;

},{"../construtos":19,"../declaracoes":38,"../tipos-de-simbolos":69,"./erro-avaliador-sintatico":4,"browser-process-hrtime":70}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroAvaliadorSintatico = void 0;
var ErroAvaliadorSintatico = /** @class */ (function (_super) {
    __extends(ErroAvaliadorSintatico, _super);
    function ErroAvaliadorSintatico(simbolo, mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.simbolo = simbolo;
        Object.setPrototypeOf(_this, ErroAvaliadorSintatico.prototype);
        return _this;
    }
    return ErroAvaliadorSintatico;
}(Error));
exports.ErroAvaliadorSintatico = ErroAvaliadorSintatico;

},{}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./avaliador-sintatico"), exports);
__exportStar(require("./erro-avaliador-sintatico"), exports);

},{"./avaliador-sintatico":3,"./erro-avaliador-sintatico":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excecoes_1 = require("../excecoes");
var funcao_1 = require("../estruturas/funcao");
var instancia_1 = require("../estruturas/instancia");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var classe_1 = require("../estruturas/classe");
function default_1(interpretador, global) {
    // Retorna um número aleatório entre 0 e 1.
    global.definirVariavel("aleatorio", new funcao_padrao_1.FuncaoPadrao(1, function () {
        return Math.random();
    }));
    // Retorna um número aleatório de acordo com o parâmetro passado.
    // Mínimo(inclusivo) - Máximo(exclusivo)
    global.definirVariavel("aleatorioEntre", new funcao_padrao_1.FuncaoPadrao(1, function (minimo, maximo) {
        if (typeof minimo !== 'number' || typeof maximo !== 'number') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Os dois parâmetros devem ser do tipo número.");
        }
        return Math.floor(Math.random() * (maximo - minimo)) + minimo;
    }));
    global.definirVariavel("inteiro", new funcao_padrao_1.FuncaoPadrao(1, function (valor) {
        if (!valor) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Somente números podem passar para inteiro.");
        }
        if (!/^-{0,1}\d+$/.test(valor) && !/^\d+\.\d+$/.test(valor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Somente números podem passar para inteiro.");
        }
        return parseInt(valor);
    }));
    global.definirVariavel("mapear", new funcao_padrao_1.FuncaoPadrao(1, function (array, callback) {
        if (!Array.isArray(array)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função, deve ser um array.");
        }
        if (callback.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função, deve ser uma função.");
        }
        var resultados = [];
        for (var indice = 0; indice < array.length; ++indice) {
            resultados.push(callback.chamar(interpretador, [array[indice]]));
        }
        return resultados;
    }));
    global.definirVariavel("ordenar", new funcao_padrao_1.FuncaoPadrao(1, function (objeto) {
        var _a;
        if (!Array.isArray(objeto)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Valor Inválido. Objeto inserido não é um vetor.");
        }
        var trocado;
        var tamanho = objeto.length;
        do {
            trocado = false;
            for (var i = 0; i < tamanho - 1; i++) {
                if (objeto[i] > objeto[i + 1]) {
                    _a = [objeto[i + 1], objeto[i]], objeto[i] = _a[0], objeto[i + 1] = _a[1];
                    trocado = true;
                }
            }
        } while (trocado);
        return objeto;
    }));
    global.definirVariavel("real", new funcao_padrao_1.FuncaoPadrao(1, function (valor) {
        if (!/^-{0,1}\d+$/.test(valor) && !/^\d+\.\d+$/.test(valor))
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Somente números podem passar para real.");
        return parseFloat(valor);
    }));
    global.definirVariavel("tamanho", new funcao_padrao_1.FuncaoPadrao(1, function (objeto) {
        if (!isNaN(objeto)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Não é possível encontrar o tamanho de um número.");
        }
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Você não pode encontrar o tamanho de uma declaração.");
        }
        if (objeto instanceof funcao_1.DeleguaFuncao) {
            return objeto.declaracao.parametros.length;
        }
        if (objeto instanceof funcao_padrao_1.FuncaoPadrao) {
            return objeto.valorAridade;
        }
        if (objeto instanceof classe_1.DeleguaClasse) {
            var metodos = objeto.metodos;
            var tamanho = 0;
            if (metodos.init && metodos.init.eInicializador) {
                tamanho = metodos.init.declaracao.parametros.length;
            }
            return tamanho;
        }
        return objeto.length;
    }));
    global.definirVariavel("texto", new funcao_padrao_1.FuncaoPadrao(1, function (valor) {
        return "".concat(valor);
    }));
    global.definirVariavel("exports", {});
    return global;
}
exports.default = default_1;
;

},{"../estruturas/classe":46,"../estruturas/funcao":48,"../estruturas/funcao-padrao":47,"../estruturas/instancia":50,"../excecoes":56}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excecoes_1 = require("../excecoes");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var modulo_1 = require("../estruturas/modulo");
var carregarBiblioteca = function (nomeDaBiblioteca, caminhoDaBiblioteca) {
    var dadosDoModulo;
    try {
        dadosDoModulo = require(caminhoDaBiblioteca);
    }
    catch (erro) {
        throw new excecoes_1.ErroEmTempoDeExecucao(nomeDaBiblioteca, "Biblioteca ".concat(nomeDaBiblioteca, " n\u00E3o encontrada para importa\u00E7\u00E3o."));
    }
    var novoModulo = new modulo_1.DeleguaModulo(nomeDaBiblioteca);
    var chaves = Object.keys(dadosDoModulo);
    for (var i = 0; i < chaves.length; i++) {
        var moduloAtual = dadosDoModulo[chaves[i]];
        if (typeof moduloAtual === "function") {
            novoModulo[chaves[i]] = new funcao_padrao_1.FuncaoPadrao(moduloAtual.length, moduloAtual);
        }
        else {
            novoModulo[chaves[i]] = moduloAtual;
        }
    }
    return novoModulo;
};
function default_1(nome) {
    return carregarBiblioteca(nome, nome);
}
exports.default = default_1;
;

},{"../estruturas/funcao-padrao":47,"../estruturas/modulo":51,"../excecoes":56}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoIndiceVariavel = void 0;
/**
 * Definido como `Subscript` em Égua Clássico, esse construto serve para acessar índices de
 * vetores e dicionários.
 */
var AcessoIndiceVariavel = /** @class */ (function () {
    function AcessoIndiceVariavel(entidadeChamada, indice, simboloFechamento) {
        this.linha = entidadeChamada.linha;
        this.entidadeChamada = entidadeChamada;
        this.indice = indice;
        this.simboloFechamento = simboloFechamento;
    }
    AcessoIndiceVariavel.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAcessoIndiceVariavel(this);
    };
    return AcessoIndiceVariavel;
}());
exports.AcessoIndiceVariavel = AcessoIndiceVariavel;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoMetodo = void 0;
/**
 * Chamado de `Get` em Égua Clássico, é o construto de acesso a métodos ou membros de
 * classe.
 */
var AcessoMetodo = /** @class */ (function () {
    function AcessoMetodo(objeto, simbolo) {
        this.linha = objeto.linha;
        this.objeto = objeto;
        this.simbolo = simbolo;
    }
    AcessoMetodo.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAcessoMetodo(this);
    };
    return AcessoMetodo;
}());
exports.AcessoMetodo = AcessoMetodo;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agrupamento = void 0;
var Agrupamento = /** @class */ (function () {
    function Agrupamento(linha, expressao) {
        this.linha = linha;
        this.expressao = expressao;
    }
    Agrupamento.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAgrupamento(this);
    };
    return Agrupamento;
}());
exports.Agrupamento = Agrupamento;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoSobrescrita = void 0;
var AtribuicaoSobrescrita = /** @class */ (function () {
    function AtribuicaoSobrescrita(linha, objeto, indice, valor) {
        this.linha = linha;
        this.objeto = objeto;
        this.indice = indice;
        this.valor = valor;
    }
    AtribuicaoSobrescrita.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAtribuicaoSobrescrita(this);
    };
    return AtribuicaoSobrescrita;
}());
exports.AtribuicaoSobrescrita = AtribuicaoSobrescrita;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
var Atribuir = /** @class */ (function () {
    function Atribuir(simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.simbolo = simbolo;
        this.valor = valor;
    }
    Atribuir.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeAtribuicao(this);
    };
    return Atribuir;
}());
exports.Atribuir = Atribuir;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binario = void 0;
var Binario = /** @class */ (function () {
    function Binario(esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    Binario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoBinaria(this);
    };
    return Binario;
}());
exports.Binario = Binario;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamada = void 0;
var Chamada = /** @class */ (function () {
    function Chamada(entidadeChamada, parentese, argumentos) {
        this.linha = entidadeChamada.linha;
        this.entidadeChamada = entidadeChamada;
        this.parentese = parentese;
        this.argumentos = argumentos;
    }
    Chamada.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeChamada(this);
    };
    return Chamada;
}());
exports.Chamada = Chamada;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conjunto = void 0;
var Conjunto = /** @class */ (function () {
    function Conjunto(linha, objeto, nome, valor) {
        this.linha = linha;
        this.objeto = objeto;
        this.nome = nome;
        this.valor = valor;
    }
    Conjunto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDefinir(this);
    };
    return Conjunto;
}());
exports.Conjunto = Conjunto;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
var Dicionario = /** @class */ (function () {
    function Dicionario(linha, chaves, valores) {
        this.linha = linha;
        this.chaves = chaves;
        this.valores = valores;
    }
    Dicionario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDicionario(this);
    };
    return Dicionario;
}());
exports.Dicionario = Dicionario;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcao = void 0;
var Funcao = /** @class */ (function () {
    function Funcao(linha, parametros, corpo) {
        this.linha = linha;
        this.parametros = parametros;
        this.corpo = corpo;
    }
    Funcao.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeleguaFuncao(this);
    };
    return Funcao;
}());
exports.Funcao = Funcao;

},{}],19:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./atribuicao-sobrescrita"), exports);
__exportStar(require("./atribuir"), exports);
__exportStar(require("./binario"), exports);
__exportStar(require("./chamada"), exports);
__exportStar(require("./conjunto"), exports);
__exportStar(require("./dicionario"), exports);
__exportStar(require("./construto"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./acesso-metodo"), exports);
__exportStar(require("./agrupamento"), exports);
__exportStar(require("./isto"), exports);
__exportStar(require("./literal"), exports);
__exportStar(require("./logico"), exports);
__exportStar(require("./acesso-indice-variavel"), exports);
__exportStar(require("./super"), exports);
__exportStar(require("./unario"), exports);
__exportStar(require("./variavel"), exports);
__exportStar(require("./vetor"), exports);

},{"./acesso-indice-variavel":8,"./acesso-metodo":9,"./agrupamento":10,"./atribuicao-sobrescrita":11,"./atribuir":12,"./binario":13,"./chamada":14,"./conjunto":15,"./construto":16,"./dicionario":17,"./funcao":18,"./isto":20,"./literal":21,"./logico":22,"./super":23,"./unario":24,"./variavel":25,"./vetor":26}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
var Isto = /** @class */ (function () {
    function Isto(linha, palavraChave) {
        this.linha = linha;
        this.palavraChave = palavraChave;
    }
    Isto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoIsto(this);
    };
    return Isto;
}());
exports.Isto = Isto;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(linha, valor) {
        this.linha = linha;
        this.valor = valor;
    }
    Literal.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLiteral(this);
    };
    return Literal;
}());
exports.Literal = Literal;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
var Logico = /** @class */ (function () {
    function Logico(esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    Logico.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLogica(this);
    };
    return Logico;
}());
exports.Logico = Logico;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
var Super = /** @class */ (function () {
    function Super(linha, palavraChave, metodo) {
        this.linha = linha;
        this.palavraChave = palavraChave;
        this.metodo = metodo;
    }
    Super.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSuper(this);
    };
    return Super;
}());
exports.Super = Super;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
var Unario = /** @class */ (function () {
    function Unario(operador, direita) {
        this.linha = operador.linha;
        this.operador = operador;
        this.direita = direita;
    }
    Unario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoUnaria(this);
    };
    return Unario;
}());
exports.Unario = Unario;

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variavel = void 0;
var Variavel = /** @class */ (function () {
    function Variavel(simbolo) {
        this.linha = Number(simbolo.linha);
        this.simbolo = simbolo;
    }
    Variavel.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeVariavel(this);
    };
    return Variavel;
}());
exports.Variavel = Variavel;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
var Vetor = /** @class */ (function () {
    function Vetor(linha, valores) {
        this.linha = linha;
        this.valores = valores;
    }
    Vetor.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoVetor(this);
    };
    return Vetor;
}());
exports.Vetor = Vetor;

},{}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloco = void 0;
var declaracao_1 = require("./declaracao");
var Bloco = /** @class */ (function (_super) {
    __extends(Bloco, _super);
    function Bloco(declaracoes) {
        var _this = _super.call(this, 0) || this;
        _this.declaracoes = declaracoes;
        return _this;
    }
    Bloco.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoBloco(this);
    };
    return Bloco;
}(declaracao_1.Declaracao));
exports.Bloco = Bloco;

},{"./declaracao":30}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classe = void 0;
var declaracao_1 = require("./declaracao");
var Classe = /** @class */ (function (_super) {
    __extends(Classe, _super);
    function Classe(simbolo, superClasse, metodos) {
        var _this = _super.call(this, Number(simbolo.linha)) || this;
        _this.simbolo = simbolo;
        _this.superClasse = superClasse;
        _this.metodos = metodos;
        return _this;
    }
    Classe.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoClasse(this);
    };
    return Classe;
}(declaracao_1.Declaracao));
exports.Classe = Classe;

},{"./declaracao":30}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continua = void 0;
var declaracao_1 = require("./declaracao");
var Continua = /** @class */ (function (_super) {
    __extends(Continua, _super);
    function Continua() {
        return _super.call(this, 0) || this;
    }
    Continua.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoContinua(this);
    };
    return Continua;
}(declaracao_1.Declaracao));
exports.Continua = Continua;

},{"./declaracao":30}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracao = void 0;
var Declaracao = /** @class */ (function () {
    function Declaracao(linha) {
        this.linha = linha;
    }
    Declaracao.prototype.aceitar = function (visitante) { };
    return Declaracao;
}());
exports.Declaracao = Declaracao;

},{}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquanto = void 0;
var declaracao_1 = require("./declaracao");
var Enquanto = /** @class */ (function (_super) {
    __extends(Enquanto, _super);
    function Enquanto(condicao, corpo) {
        var _this = _super.call(this, 0) || this;
        _this.condicao = condicao;
        _this.corpo = corpo;
        return _this;
    }
    Enquanto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEnquanto(this);
    };
    return Enquanto;
}(declaracao_1.Declaracao));
exports.Enquanto = Enquanto;

},{"./declaracao":30}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escolha = void 0;
var declaracao_1 = require("./declaracao");
var Escolha = /** @class */ (function (_super) {
    __extends(Escolha, _super);
    function Escolha(condicao, caminhos, caminhoPadrao) {
        var _this = _super.call(this, 0) || this;
        _this.condicao = condicao;
        _this.caminhos = caminhos;
        _this.caminhoPadrao = caminhoPadrao;
        return _this;
    }
    Escolha.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEscolha(this);
    };
    return Escolha;
}(declaracao_1.Declaracao));
exports.Escolha = Escolha;

},{"./declaracao":30}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escreva = void 0;
var declaracao_1 = require("./declaracao");
var Escreva = /** @class */ (function (_super) {
    __extends(Escreva, _super);
    function Escreva(expressao) {
        var _this = _super.call(this, expressao.linha) || this;
        _this.expressao = expressao;
        return _this;
    }
    Escreva.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEscreva(this);
    };
    return Escreva;
}(declaracao_1.Declaracao));
exports.Escreva = Escreva;

},{"./declaracao":30}],34:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressao = void 0;
var declaracao_1 = require("./declaracao");
var Expressao = /** @class */ (function (_super) {
    __extends(Expressao, _super);
    function Expressao(expressao) {
        var _this = _super.call(this, expressao.linha) || this;
        _this.expressao = expressao;
        return _this;
    }
    Expressao.prototype.aceitar = function (visitante) {
        return visitante.visitarDeclaracaoDeExpressao(this);
    };
    return Expressao;
}(declaracao_1.Declaracao));
exports.Expressao = Expressao;

},{"./declaracao":30}],35:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fazer = void 0;
var declaracao_1 = require("./declaracao");
var Fazer = /** @class */ (function (_super) {
    __extends(Fazer, _super);
    function Fazer(caminhoFazer, condicaoEnquanto) {
        var _this = _super.call(this, 0) || this;
        _this.caminhoFazer = caminhoFazer;
        _this.condicaoEnquanto = condicaoEnquanto;
        return _this;
    }
    Fazer.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoFazer(this);
    };
    return Fazer;
}(declaracao_1.Declaracao));
exports.Fazer = Fazer;

},{"./declaracao":30}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcao = void 0;
var declaracao_1 = require("./declaracao");
var Funcao = /** @class */ (function (_super) {
    __extends(Funcao, _super);
    function Funcao(simbolo, funcao) {
        var _this = _super.call(this, Number(simbolo.linha)) || this;
        _this.simbolo = simbolo;
        _this.funcao = funcao;
        return _this;
    }
    Funcao.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoFuncao(this);
    };
    return Funcao;
}(declaracao_1.Declaracao));
exports.Funcao = Funcao;

},{"./declaracao":30}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importar = void 0;
var declaracao_1 = require("./declaracao");
var Importar = /** @class */ (function (_super) {
    __extends(Importar, _super);
    function Importar(caminho, simboloFechamento) {
        var _this = _super.call(this, 0) || this;
        _this.caminho = caminho;
        _this.simboloFechamento = simboloFechamento;
        return _this;
    }
    Importar.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoImportar(this);
    };
    return Importar;
}(declaracao_1.Declaracao));
exports.Importar = Importar;

},{"./declaracao":30}],38:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./bloco"), exports);
__exportStar(require("./classe"), exports);
__exportStar(require("./continua"), exports);
__exportStar(require("./enquanto"), exports);
__exportStar(require("./escolha"), exports);
__exportStar(require("./escreva"), exports);
__exportStar(require("./expressao"), exports);
__exportStar(require("./fazer"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./importar"), exports);
__exportStar(require("./para"), exports);
__exportStar(require("./sustar"), exports);
__exportStar(require("./retorna"), exports);
__exportStar(require("./se"), exports);
__exportStar(require("./declaracao"), exports);
__exportStar(require("./tente"), exports);
__exportStar(require("./var"), exports);

},{"./bloco":27,"./classe":28,"./continua":29,"./declaracao":30,"./enquanto":31,"./escolha":32,"./escreva":33,"./expressao":34,"./fazer":35,"./funcao":36,"./importar":37,"./para":39,"./retorna":40,"./se":41,"./sustar":42,"./tente":43,"./var":44}],39:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Para = void 0;
var declaracao_1 = require("./declaracao");
var Para = /** @class */ (function (_super) {
    __extends(Para, _super);
    function Para(linha, inicializador, condicao, incrementar, corpo) {
        var _this = _super.call(this, linha) || this;
        _this.inicializador = inicializador;
        _this.condicao = condicao;
        _this.incrementar = incrementar;
        _this.corpo = corpo;
        return _this;
    }
    Para.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoPara(this);
    };
    return Para;
}(declaracao_1.Declaracao));
exports.Para = Para;

},{"./declaracao":30}],40:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorna = void 0;
var declaracao_1 = require("./declaracao");
var Retorna = /** @class */ (function (_super) {
    __extends(Retorna, _super);
    function Retorna(palavraChave, valor) {
        var _this = _super.call(this, 0) || this;
        _this.palavraChave = palavraChave;
        _this.valor = valor;
        return _this;
    }
    Retorna.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoRetornar(this);
    };
    return Retorna;
}(declaracao_1.Declaracao));
exports.Retorna = Retorna;

},{"./declaracao":30}],41:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Se = void 0;
var declaracao_1 = require("./declaracao");
var Se = /** @class */ (function (_super) {
    __extends(Se, _super);
    function Se(linha, condicao, caminhoEntao, caminhosSeSenao, caminhoSenao) {
        var _this = _super.call(this, linha) || this;
        _this.condicao = condicao;
        _this.caminhoEntao = caminhoEntao;
        _this.caminhosSeSenao = caminhosSeSenao;
        _this.caminhoSenao = caminhoSenao;
        return _this;
    }
    Se.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSe(this);
    };
    return Se;
}(declaracao_1.Declaracao));
exports.Se = Se;

},{"./declaracao":30}],42:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sustar = void 0;
var declaracao_1 = require("./declaracao");
var Sustar = /** @class */ (function (_super) {
    __extends(Sustar, _super);
    function Sustar() {
        return _super.call(this, 0) || this;
    }
    Sustar.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSustar(this);
    };
    return Sustar;
}(declaracao_1.Declaracao));
exports.Sustar = Sustar;

},{"./declaracao":30}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tente = void 0;
var declaracao_1 = require("./declaracao");
var Tente = /** @class */ (function (_super) {
    __extends(Tente, _super);
    function Tente(caminhoTente, caminhoPegue, caminhoSenao, caminhoFinalmente) {
        var _this = _super.call(this, 0) || this;
        _this.caminhoTente = caminhoTente;
        _this.caminhoPegue = caminhoPegue;
        _this.caminhoSenao = caminhoSenao;
        _this.caminhoFinalmente = caminhoFinalmente;
        return _this;
    }
    Tente.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoTente(this);
    };
    return Tente;
}(declaracao_1.Declaracao));
exports.Tente = Tente;

},{"./declaracao":30}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Var = void 0;
var declaracao_1 = require("./declaracao");
var Var = /** @class */ (function (_super) {
    __extends(Var, _super);
    function Var(simbolo, inicializador) {
        var _this = _super.call(this, Number(simbolo.linha)) || this;
        _this.simbolo = simbolo;
        _this.inicializador = inicializador;
        return _this;
    }
    Var.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoVar(this);
    };
    return Var;
}(declaracao_1.Declaracao));
exports.Var = Var;

},{"./declaracao":30}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamavel = void 0;
var Chamavel = /** @class */ (function () {
    function Chamavel() {
    }
    Chamavel.prototype.aridade = function () {
        return this.valorAridade;
    };
    Chamavel.prototype.chamar = function (interpretador, argumentos, simbolo) {
        throw new Error("Este método não deveria ser chamado.");
    };
    return Chamavel;
}());
exports.Chamavel = Chamavel;

},{}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaClasse = void 0;
var chamavel_1 = require("./chamavel");
var instancia_1 = require("./instancia");
var DeleguaClasse = /** @class */ (function (_super) {
    __extends(DeleguaClasse, _super);
    function DeleguaClasse(nome, superClasse, metodos) {
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.superClasse = superClasse;
        _this.metodos = metodos;
        return _this;
    }
    DeleguaClasse.prototype.encontrarMetodo = function (nome) {
        if (this.metodos.hasOwnProperty(nome)) {
            return this.metodos[nome];
        }
        if (this.superClasse !== null) {
            return this.superClasse.encontrarMetodo(nome);
        }
        return undefined;
    };
    DeleguaClasse.prototype.paraTexto = function () {
        return "<classe ".concat(this.nome, ">");
    };
    DeleguaClasse.prototype.aridade = function () {
        var inicializador = this.encontrarMetodo("construtor");
        return inicializador ? inicializador.aridade() : 0;
    };
    DeleguaClasse.prototype.chamar = function (interpretador, argumentos) {
        var instancia = new instancia_1.DeleguaInstancia(this);
        var inicializador = this.encontrarMetodo("construtor");
        if (inicializador) {
            inicializador.definirEscopo(instancia).chamar(interpretador, argumentos);
        }
        return instancia;
    };
    return DeleguaClasse;
}(chamavel_1.Chamavel));
exports.DeleguaClasse = DeleguaClasse;

},{"./chamavel":45,"./instancia":50}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoPadrao = void 0;
var chamavel_1 = require("./chamavel");
var FuncaoPadrao = /** @class */ (function (_super) {
    __extends(FuncaoPadrao, _super);
    function FuncaoPadrao(valorAridade, funcao) {
        var _this = _super.call(this) || this;
        _this.valorAridade = valorAridade;
        _this.funcao = funcao;
        return _this;
    }
    FuncaoPadrao.prototype.chamar = function (interpretador, argumentos, simbolo) {
        this.simbolo = simbolo;
        return this.funcao.apply(this, argumentos);
    };
    FuncaoPadrao.prototype.paraTexto = function () {
        return "<função>";
    };
    return FuncaoPadrao;
}(chamavel_1.Chamavel));
exports.FuncaoPadrao = FuncaoPadrao;

},{"./chamavel":45}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaFuncao = void 0;
var chamavel_1 = require("./chamavel");
var ambiente_1 = require("../ambiente");
var excecoes_1 = require("../excecoes");
var DeleguaFuncao = /** @class */ (function (_super) {
    __extends(DeleguaFuncao, _super);
    function DeleguaFuncao(nome, declaracao, ambienteAnterior, eInicializador) {
        if (eInicializador === void 0) { eInicializador = false; }
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.declaracao = declaracao;
        _this.ambienteAnterior = ambienteAnterior;
        _this.eInicializador = eInicializador;
        return _this;
    }
    DeleguaFuncao.prototype.aridade = function () {
        var _a, _b;
        return ((_b = (_a = this.declaracao) === null || _a === void 0 ? void 0 : _a.parametros) === null || _b === void 0 ? void 0 : _b.length) || 0;
    };
    DeleguaFuncao.prototype.paraTexto = function () {
        if (this.nome === null)
            return "<função>";
        return "<fun\u00E7\u00E3o ".concat(this.nome, ">");
    };
    DeleguaFuncao.prototype.chamar = function (interpretador, argumentos) {
        var ambiente = new ambiente_1.Ambiente(this.ambienteAnterior);
        var parametros = this.declaracao.parametros;
        if (parametros && parametros.length) {
            for (var i = 0; i < parametros.length; i++) {
                var param = parametros[i];
                var nome = param["nome"].lexema;
                var valor = argumentos[i];
                if (argumentos[i] === null) {
                    valor = param["padrao"] ? param["padrao"].valor : null;
                }
                ambiente.definirVariavel(nome, valor);
            }
        }
        try {
            interpretador.executarBloco(this.declaracao.corpo, ambiente);
        }
        catch (erro) {
            if (erro instanceof excecoes_1.ExcecaoRetornar) {
                if (this.eInicializador)
                    return this.ambienteAnterior.obterVariavelEm(0, "isto");
                return erro.valor;
            }
            else {
                throw erro;
            }
        }
        if (this.eInicializador)
            return this.ambienteAnterior.obterVariavelEm(0, "isto");
        return null;
    };
    DeleguaFuncao.prototype.definirEscopo = function (instancia) {
        var ambiente = new ambiente_1.Ambiente(this.ambienteAnterior);
        ambiente.definirVariavel("isto", instancia);
        return new DeleguaFuncao(this.nome, this.declaracao, ambiente, this.eInicializador);
    };
    return DeleguaFuncao;
}(chamavel_1.Chamavel));
exports.DeleguaFuncao = DeleguaFuncao;

},{"../ambiente":2,"../excecoes":56,"./chamavel":45}],49:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./chamavel"), exports);
__exportStar(require("./classe"), exports);
__exportStar(require("./funcao-padrao"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./instancia"), exports);
__exportStar(require("./modulo"), exports);

},{"./chamavel":45,"./classe":46,"./funcao":48,"./funcao-padrao":47,"./instancia":50,"./modulo":51}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaInstancia = void 0;
var excecoes_1 = require("../excecoes");
var DeleguaInstancia = /** @class */ (function () {
    function DeleguaInstancia(criarClasse) {
        this.criarClasse = criarClasse;
        this.campos = {};
    }
    DeleguaInstancia.prototype.get = function (simbolo) {
        if (this.campos.hasOwnProperty(simbolo.lexema)) {
            return this.campos[simbolo.lexema];
        }
        var metodo = this.criarClasse.encontrarMetodo(simbolo.lexema);
        if (metodo)
            return metodo.definirEscopo(this);
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Método indefinido não recuperado.");
    };
    DeleguaInstancia.prototype.set = function (simbolo, valor) {
        this.campos[simbolo.lexema] = valor;
    };
    DeleguaInstancia.prototype.toString = function () {
        return "<Objeto " + this.criarClasse.nome + ">";
    };
    return DeleguaInstancia;
}());
exports.DeleguaInstancia = DeleguaInstancia;

},{"../excecoes":56}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaModulo = void 0;
var DeleguaModulo = /** @class */ (function () {
    function DeleguaModulo(nome) {
        this.nome = nome || "";
        this.componentes = {};
    }
    DeleguaModulo.prototype.toString = function () {
        return this.nome ? "<modulo ".concat(this.nome, ">") : '<modulo>';
    };
    return DeleguaModulo;
}());
exports.DeleguaModulo = DeleguaModulo;

},{}],52:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroEmTempoDeExecucao = void 0;
var ErroEmTempoDeExecucao = /** @class */ (function (_super) {
    __extends(ErroEmTempoDeExecucao, _super);
    function ErroEmTempoDeExecucao(simbolo, mensagem, linha) {
        var _this = _super.call(this, mensagem) || this;
        _this.simbolo = simbolo;
        _this.mensagem = mensagem;
        _this.linha = linha;
        Object.setPrototypeOf(_this, ErroEmTempoDeExecucao.prototype);
        return _this;
    }
    return ErroEmTempoDeExecucao;
}(Error));
exports.ErroEmTempoDeExecucao = ErroEmTempoDeExecucao;

},{}],53:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcecaoContinuar = void 0;
var ExcecaoContinuar = /** @class */ (function (_super) {
    __extends(ExcecaoContinuar, _super);
    function ExcecaoContinuar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExcecaoContinuar;
}(Error));
exports.ExcecaoContinuar = ExcecaoContinuar;

},{}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcecaoRetornar = void 0;
var ExcecaoRetornar = /** @class */ (function (_super) {
    __extends(ExcecaoRetornar, _super);
    function ExcecaoRetornar(valor) {
        var _this = _super.call(this, valor) || this;
        _this.valor = valor;
        Object.setPrototypeOf(_this, ExcecaoRetornar.prototype);
        return _this;
    }
    return ExcecaoRetornar;
}(Error));
exports.ExcecaoRetornar = ExcecaoRetornar;

},{}],55:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcecaoSustar = void 0;
var ExcecaoSustar = /** @class */ (function (_super) {
    __extends(ExcecaoSustar, _super);
    function ExcecaoSustar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExcecaoSustar;
}(Error));
exports.ExcecaoSustar = ExcecaoSustar;

},{}],56:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./excecao-sustar"), exports);
__exportStar(require("./excecao-continuar"), exports);
__exportStar(require("./erro-em-tempo-de-execucao"), exports);
__exportStar(require("./excecao-retornar"), exports);

},{"./erro-em-tempo-de-execucao":52,"./excecao-continuar":53,"./excecao-retornar":54,"./excecao-sustar":55}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./erro-interpretador"), exports);
__exportStar(require("./interpretador"), exports);
__exportStar(require("./retorno-interpretador"), exports);

},{"./erro-interpretador":57,"./interpretador":59,"./retorno-interpretador":60}],59:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpretador = void 0;
var caminho = __importStar(require("path"));
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var tipos_de_simbolos_1 = __importDefault(require("../lexador/tipos-de-simbolos"));
var ambiente_1 = require("../ambiente");
var biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
var importar_biblioteca_1 = __importDefault(require("../bibliotecas/importar-biblioteca"));
var excecoes_1 = require("../excecoes");
var estruturas_1 = require("../estruturas");
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser),
 * e de fato executa a lógica de programação descrita no código.
 */
var Interpretador = /** @class */ (function () {
    function Interpretador(importador, resolvedor, diretorioBase, performance, funcaoDeRetorno) {
        if (performance === void 0) { performance = false; }
        this.funcaoDeRetorno = null;
        this.importador = importador;
        this.resolvedor = resolvedor;
        this.diretorioBase = diretorioBase;
        this.performance = performance;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.global = new ambiente_1.Ambiente();
        this.ambiente = this.global;
        this.locais = new Map();
        this.erros = [];
        this.global = (0, biblioteca_global_1.default)(this, this.global);
    }
    Interpretador.prototype.resolver = function (expressao, profundidade) {
        this.locais.set(expressao, profundidade);
    };
    Interpretador.prototype.visitarExpressaoLiteral = function (expressao) {
        return expressao.valor;
    };
    Interpretador.prototype.avaliar = function (expressao) {
        if (expressao.aceitar) {
            return expressao.aceitar(this);
        }
    };
    Interpretador.prototype.visitarExpressaoAgrupamento = function (expressao) {
        return this.avaliar(expressao.expressao);
    };
    Interpretador.prototype.eVerdadeiro = function (objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === 'boolean')
            return Boolean(objeto);
        return true;
    };
    Interpretador.prototype.verificarOperandoNumero = function (operador, operando) {
        if (typeof operando === 'number')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operando precisa ser um número.', operador.linha);
    };
    Interpretador.prototype.visitarExpressaoUnaria = function (expressao) {
        var direita = this.avaliar(expressao.direita);
        switch (expressao.operador.tipo) {
            case tipos_de_simbolos_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expressao.operador, direita);
                return -direita;
            case tipos_de_simbolos_1.default.NEGACAO:
                return !this.eVerdadeiro(direita);
            case tipos_de_simbolos_1.default.BIT_NOT:
                return ~direita;
        }
        return null;
    };
    Interpretador.prototype.eIgual = function (esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
    };
    Interpretador.prototype.verificarOperandosNumeros = function (operador, direita, esquerda) {
        if (typeof direita === 'number' && typeof esquerda === 'number')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operandos precisam ser números.', operador.linha);
    };
    Interpretador.prototype.visitarExpressaoBinaria = function (expressao) {
        var esquerda = this.avaliar(expressao.esquerda);
        var direita = this.avaliar(expressao.direita);
        switch (expressao.operador.tipo) {
            case tipos_de_simbolos_1.default.EXPONENCIACAO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Math.pow(esquerda, direita);
            case tipos_de_simbolos_1.default.MAIOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) > Number(direita);
            case tipos_de_simbolos_1.default.MAIOR_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) >= Number(direita);
            case tipos_de_simbolos_1.default.MENOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) < Number(direita);
            case tipos_de_simbolos_1.default.MENOR_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) <= Number(direita);
            case tipos_de_simbolos_1.default.SUBTRACAO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) - Number(direita);
            case tipos_de_simbolos_1.default.ADICAO:
                if (typeof esquerda === 'number' &&
                    typeof direita === 'number') {
                    return Number(esquerda) + Number(direita);
                }
                else {
                    return String(esquerda) + String(direita);
                }
            case tipos_de_simbolos_1.default.DIVISAO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) / Number(direita);
            case tipos_de_simbolos_1.default.MULTIPLICACAO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) * Number(direita);
            case tipos_de_simbolos_1.default.MODULO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) % Number(direita);
            case tipos_de_simbolos_1.default.BIT_AND:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) & Number(direita);
            case tipos_de_simbolos_1.default.BIT_XOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) ^ Number(direita);
            case tipos_de_simbolos_1.default.BIT_OR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) | Number(direita);
            case tipos_de_simbolos_1.default.MENOR_MENOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) << Number(direita);
            case tipos_de_simbolos_1.default.MAIOR_MAIOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(esquerda) >> Number(direita);
            case tipos_de_simbolos_1.default.DIFERENTE:
                return !this.eIgual(esquerda, direita);
            case tipos_de_simbolos_1.default.IGUAL_IGUAL:
                return this.eIgual(esquerda, direita);
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoDeChamada = function (expressao) {
        var entidadeChamada = this.avaliar(expressao.entidadeChamada);
        var argumentos = [];
        for (var i = 0; i < expressao.argumentos.length; i++) {
            argumentos.push(this.avaliar(expressao.argumentos[i]));
        }
        if (!(entidadeChamada instanceof estruturas_1.Chamavel)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha);
        }
        var parametros;
        if (entidadeChamada instanceof estruturas_1.DeleguaFuncao) {
            parametros = entidadeChamada.declaracao.parametros;
        }
        else if (entidadeChamada instanceof estruturas_1.DeleguaClasse) {
            parametros = entidadeChamada.metodos.init
                ? entidadeChamada.metodos.init.declaracao.parametros
                : [];
        }
        else {
            parametros = [];
        }
        // Isso aqui completa os parâmetros não preenchidos com nulos.
        if (argumentos.length < entidadeChamada.aridade()) {
            var diferenca = entidadeChamada.aridade() - argumentos.length;
            for (var i = 0; i < diferenca; i++) {
                argumentos.push(null);
            }
        }
        else {
            if (parametros &&
                parametros.length > 0 &&
                parametros[parametros.length - 1]['tipo'] === 'wildcard') {
                var novosArgumentos = argumentos.slice(0, parametros.length - 1);
                novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                argumentos = novosArgumentos;
            }
        }
        if (entidadeChamada instanceof estruturas_1.FuncaoPadrao) {
            return entidadeChamada.chamar(this, argumentos, expressao.entidadeChamada.nome);
        }
        return entidadeChamada.chamar(this, argumentos);
    };
    Interpretador.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
        var valor = this.avaliar(expressao.valor);
        var distancia = this.locais.get(expressao);
        if (distancia !== undefined) {
            this.ambiente.atribuirVariavelEm(distancia, expressao.simbolo, valor);
        }
        else {
            this.ambiente.atribuirVariavel(expressao.simbolo, valor);
        }
        return valor;
    };
    Interpretador.prototype.procurarVariavel = function (simbolo, expressao) {
        var distancia = this.locais.get(expressao);
        if (distancia !== undefined) {
            return this.ambiente.obterVariavelEm(distancia, simbolo.lexema);
        }
        else {
            return this.global.obterVariavel(simbolo);
        }
    };
    Interpretador.prototype.visitarExpressaoDeVariavel = function (expressao) {
        return this.procurarVariavel(expressao.simbolo, expressao);
    };
    Interpretador.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        return this.avaliar(declaracao.expressao);
    };
    Interpretador.prototype.visitarExpressaoLogica = function (expressao) {
        var esquerda = this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === tipos_de_simbolos_1.default.EM) {
            var direita = this.avaliar(expressao.direita);
            if (Array.isArray(direita) || typeof direita === 'string') {
                return direita.includes(esquerda);
            }
            else if (direita.constructor === Object) {
                return esquerda in direita;
            }
            else {
                throw new excecoes_1.ErroEmTempoDeExecucao(esquerda, "Tipo de chamada inválida com 'em'.", expressao.linha);
            }
        }
        // se um estado for verdadeiro, retorna verdadeiro
        if (expressao.operador.tipo === tipos_de_simbolos_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expressao.operador.tipo === tipos_de_simbolos_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return this.avaliar(expressao.direita);
    };
    Interpretador.prototype.visitarExpressaoSe = function (declaracao) {
        if (this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
            this.executar(declaracao.caminhoEntao);
            return null;
        }
        for (var i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            var atual = declaracao.caminhosSeSenao[i];
            if (this.eVerdadeiro(this.avaliar(atual.condicao))) {
                this.executar(atual.caminho);
                return null;
            }
        }
        if (declaracao.caminhoSenao !== null) {
            this.executar(declaracao.caminhoSenao);
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoPara = function (declaracao) {
        if (declaracao.inicializador !== null) {
            this.avaliar(declaracao.inicializador);
        }
        while (true) {
            if (declaracao.condicao !== null) {
                if (!this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
                    break;
                }
            }
            try {
                this.executar(declaracao.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.ExcecaoSustar) {
                    break;
                }
                else if (erro instanceof excecoes_1.ExcecaoContinuar) {
                }
                else {
                    throw erro;
                }
            }
            if (declaracao.incrementar !== null) {
                this.avaliar(declaracao.incrementar);
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoFazer = function (declaracao) {
        do {
            try {
                this.executar(declaracao.caminhoFazer);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.ExcecaoSustar) {
                    break;
                }
                else if (erro instanceof excecoes_1.ExcecaoContinuar) {
                }
                else {
                    throw erro;
                }
            }
        } while (this.eVerdadeiro(this.avaliar(declaracao.condicaoEnquanto)));
    };
    Interpretador.prototype.visitarExpressaoEscolha = function (declaracao) {
        var condicaoEscolha = this.avaliar(declaracao.condicao);
        var caminhos = declaracao.caminhos;
        var caminhoPadrao = declaracao.caminhoPadrao;
        var encontrado = false;
        try {
            for (var i = 0; i < caminhos.length; i++) {
                var caminho_1 = caminhos[i];
                for (var j = 0; j < caminho_1.conditions.length; j++) {
                    if (this.avaliar(caminho_1.conditions[j]) === condicaoEscolha) {
                        encontrado = true;
                        try {
                            for (var k = 0; k < caminho_1.declaracoes.length; k++) {
                                this.executar(caminho_1.declaracoes[k]);
                            }
                        }
                        catch (erro) {
                            if (erro instanceof excecoes_1.ExcecaoContinuar) {
                            }
                            else {
                                throw erro;
                            }
                        }
                    }
                }
            }
            if (caminhoPadrao !== null && encontrado === false) {
                for (var i = 0; i < caminhoPadrao.declaracoes.length; i++) {
                    this.executar(caminhoPadrao['declaracoes'][i]);
                }
            }
        }
        catch (erro) {
            if (erro instanceof excecoes_1.ExcecaoSustar) {
            }
            else {
                throw erro;
            }
        }
    };
    Interpretador.prototype.visitarExpressaoTente = function (declaracao) {
        try {
            var sucesso = true;
            try {
                this.executarBloco(declaracao.caminhoTente, new ambiente_1.Ambiente(this.ambiente));
            }
            catch (erro) {
                sucesso = false;
                if (declaracao.caminhoPegue !== null) {
                    this.executarBloco(declaracao.caminhoPegue, new ambiente_1.Ambiente(this.ambiente));
                }
            }
            if (sucesso && declaracao.caminhoSenao !== null) {
                this.executarBloco(declaracao.caminhoSenao, new ambiente_1.Ambiente(this.ambiente));
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                this.executarBloco(declaracao.caminhoFinalmente, new ambiente_1.Ambiente(this.ambiente));
        }
    };
    Interpretador.prototype.visitarExpressaoEnquanto = function (declaracao) {
        while (this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
            try {
                this.executar(declaracao.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.ExcecaoSustar) {
                    break;
                }
                else if (erro instanceof excecoes_1.ExcecaoContinuar) {
                }
                else {
                    throw erro;
                }
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoImportar = function (declaracao) {
        var caminhoRelativo = this.avaliar(declaracao.caminho);
        var caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        var nomeArquivo = caminho.basename(caminhoTotal);
        if (!caminhoTotal.endsWith('.egua') && !caminhoTotal.endsWith('.delegua')) {
            return (0, importar_biblioteca_1.default)(caminhoRelativo);
        }
        var conteudoImportacao = this.importador.importar(caminhoRelativo);
        var retornoInterpretador = this.interpretar(conteudoImportacao.retornoAvaliadorSintatico);
        var funcoesDeclaradas = this.global.obterTodasDeleguaFuncao();
        var eDicionario = function (objeto) { return objeto.constructor === Object; };
        if (eDicionario(funcoesDeclaradas)) {
            var novoModulo = new estruturas_1.DeleguaModulo();
            var chaves = Object.keys(funcoesDeclaradas);
            for (var i = 0; i < chaves.length; i++) {
                novoModulo.componentes[chaves[i]] = funcoesDeclaradas[chaves[i]];
            }
            return novoModulo;
        }
        return funcoesDeclaradas;
    };
    Interpretador.prototype.visitarExpressaoEscreva = function (declaracao) {
        var valor = this.avaliar(declaracao.expressao);
        this.funcaoDeRetorno(this.paraTexto(valor));
        return null;
    };
    Interpretador.prototype.executarBloco = function (declaracoes, ambiente) {
        var anterior = this.ambiente;
        try {
            this.ambiente = ambiente;
            if (declaracoes && declaracoes.length) {
                for (var i = 0; i < declaracoes.length; i++) {
                    this.executar(declaracoes[i]);
                }
            }
        }
        catch (erro) {
            // TODO: try sem catch é uma roubada total. Implementar uma forma de quebra de fluxo sem exceção.
            throw erro;
        }
        finally {
            this.ambiente = anterior;
        }
    };
    Interpretador.prototype.visitarExpressaoBloco = function (declaracao) {
        this.executarBloco(declaracao.declaracoes, new ambiente_1.Ambiente(this.ambiente));
        return null;
    };
    Interpretador.prototype.visitarExpressaoVar = function (declaracao) {
        var valor = null;
        if (declaracao.inicializador !== null) {
            valor = this.avaliar(declaracao.inicializador);
        }
        this.ambiente.definirVariavel(declaracao.simbolo.lexema, valor);
        return null;
    };
    Interpretador.prototype.visitarExpressaoContinua = function (declaracao) {
        throw new excecoes_1.ExcecaoContinuar();
    };
    Interpretador.prototype.visitarExpressaoSustar = function (declaracao) {
        throw new excecoes_1.ExcecaoSustar();
    };
    Interpretador.prototype.visitarExpressaoRetornar = function (declaracao) {
        var valor = null;
        if (declaracao.valor != null)
            valor = this.avaliar(declaracao.valor);
        throw new excecoes_1.ExcecaoRetornar(valor);
    };
    Interpretador.prototype.visitarExpressaoDeleguaFuncao = function (expressao) {
        return new estruturas_1.DeleguaFuncao(null, expressao, this.ambiente, false);
    };
    Interpretador.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        var indice = this.avaliar(expressao.indice);
        var valor = this.avaliar(expressao.valor);
        if (Array.isArray(objeto)) {
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            while (objeto.length < indice) {
                objeto.push(null);
            }
            objeto[indice] = valor;
        }
        else if (objeto.constructor === Object ||
            objeto instanceof estruturas_1.DeleguaInstancia ||
            objeto instanceof estruturas_1.DeleguaFuncao ||
            objeto instanceof estruturas_1.DeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaModulo) {
            objeto[indice] = valor;
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    };
    Interpretador.prototype.visitarExpressaoAcessoIndiceVariavel = function (expressao) {
        var objeto = this.avaliar(expressao.entidadeChamada);
        var indice = this.avaliar(expressao.indice);
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha);
            }
            return objeto[indice];
        }
        else if (objeto.constructor === Object ||
            objeto instanceof estruturas_1.DeleguaInstancia ||
            objeto instanceof estruturas_1.DeleguaFuncao ||
            objeto instanceof estruturas_1.DeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto[indice] || null;
        }
        else if (typeof objeto === 'string') {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha);
            }
            return objeto.charAt(indice);
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    };
    Interpretador.prototype.visitarExpressaoDefinir = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        if (!(objeto instanceof estruturas_1.DeleguaInstancia) &&
            objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha);
        }
        var valor = this.avaliar(expressao.valor);
        if (objeto instanceof estruturas_1.DeleguaInstancia) {
            objeto.set(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    };
    Interpretador.prototype.visitarExpressaoFuncao = function (declaracao) {
        var funcao = new estruturas_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao, this.ambiente, false);
        this.ambiente.definirVariavel(declaracao.simbolo.lexema, funcao);
    };
    Interpretador.prototype.visitarExpressaoClasse = function (declaracao) {
        var superClasse = null;
        if (declaracao.superClasse !== null) {
            superClasse = this.avaliar(declaracao.superClasse);
            if (!(superClasse instanceof estruturas_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'SuperClasse precisa ser uma classe.', declaracao.linha);
            }
        }
        this.ambiente.definirVariavel(declaracao.simbolo.lexema, null);
        if (declaracao.superClasse !== null) {
            this.ambiente = new ambiente_1.Ambiente(this.ambiente);
            this.ambiente.definirVariavel('super', superClasse);
        }
        var metodos = {};
        var definirMetodos = declaracao.metodos;
        for (var i = 0; i < declaracao.metodos.length; i++) {
            var metodoAtual = definirMetodos[i];
            var eInicializado = metodoAtual.simbolo.lexema === 'construtor';
            var funcao = new estruturas_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, this.ambiente, eInicializado);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        var criado = new estruturas_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
        if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        }
        this.ambiente.atribuirVariavel(declaracao.simbolo, criado);
        return null;
    };
    Interpretador.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        if (objeto instanceof estruturas_1.DeleguaInstancia) {
            return objeto.get(expressao.simbolo) || null;
        }
        else if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        else if (objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto.componentes[expressao.simbolo.lexema] || null;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha);
    };
    Interpretador.prototype.visitarExpressaoIsto = function (expressao) {
        return this.procurarVariavel(expressao.palavraChave, expressao);
    };
    Interpretador.prototype.visitarExpressaoDicionario = function (expressao) {
        var dicionario = {};
        for (var i = 0; i < expressao.chaves.length; i++) {
            dicionario[this.avaliar(expressao.chaves[i])] = this.avaliar(expressao.valores[i]);
        }
        return dicionario;
    };
    Interpretador.prototype.visitarExpressaoVetor = function (expressao) {
        var valores = [];
        for (var i = 0; i < expressao.valores.length; i++) {
            valores.push(this.avaliar(expressao.valores[i]));
        }
        return valores;
    };
    Interpretador.prototype.visitarExpressaoSuper = function (expressao) {
        var distancia = this.locais.get(expressao);
        var superClasse = this.ambiente.obterVariavelEm(distancia, 'super');
        var objeto = this.ambiente.obterVariavelEm(distancia - 1, 'isto');
        var metodo = superClasse.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        return metodo.definirEscopo(objeto);
    };
    Interpretador.prototype.paraTexto = function (objeto) {
        if (objeto === null)
            return 'nulo';
        if (typeof objeto === 'boolean') {
            return objeto ? 'verdadeiro' : 'falso';
        }
        if (objeto instanceof Date) {
            var formato = Intl.DateTimeFormat('pt', {
                dateStyle: 'full',
                timeStyle: 'full',
            });
            return formato.format(objeto);
        }
        if (Array.isArray(objeto))
            return objeto;
        if (typeof objeto === 'object')
            return JSON.stringify(objeto);
        return objeto.toString();
    };
    Interpretador.prototype.executar = function (declaracao, mostrarResultado) {
        if (mostrarResultado === void 0) { mostrarResultado = false; }
        var resultado = declaracao.aceitar(this);
        if (mostrarResultado) {
            this.funcaoDeRetorno(this.paraTexto(resultado));
        }
    };
    Interpretador.prototype.interpretar = function (objeto) {
        this.erros = [];
        var retornoResolvedor = this.resolvedor.resolver(objeto);
        this.locais = retornoResolvedor.locais;
        var inicioInterpretacao = (0, browser_process_hrtime_1.default)();
        try {
            var declaracoes = objeto.declaracoes || objeto;
            if (declaracoes.length === 1) {
                var eObjetoExpressao = declaracoes[0].constructor.name === 'Expressao';
                if (eObjetoExpressao) {
                    this.executar(declaracoes[0], true);
                    return;
                }
            }
            for (var i = 0; i < declaracoes.length; i++) {
                this.executar(declaracoes[i]);
            }
        }
        catch (erro) {
            this.erros.push(erro);
        }
        finally {
            var deltaInterpretacao = (0, browser_process_hrtime_1.default)(inicioInterpretacao);
            if (this.performance) {
                console.log("[Interpretador] Tempo para interpreta\u00E7ao: ".concat(deltaInterpretacao[0] * 1e9 + deltaInterpretacao[1], "ns"));
            }
            return {
                erros: this.erros
            };
        }
    };
    return Interpretador;
}());
exports.Interpretador = Interpretador;

},{"../ambiente":2,"../bibliotecas/biblioteca-global":6,"../bibliotecas/importar-biblioteca":7,"../estruturas":49,"../excecoes":56,"../lexador/tipos-de-simbolos":65,"browser-process-hrtime":70,"path":71}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./lexador"), exports);
__exportStar(require("./simbolo"), exports);

},{"./lexador":62,"./simbolo":64}],62:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexador = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var tipos_de_simbolos_1 = __importDefault(require("../tipos-de-simbolos"));
var palavras_reservadas_1 = __importDefault(require("./palavras-reservadas"));
var simbolo_1 = require("./simbolo");
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
var Lexador = /** @class */ (function () {
    function Lexador(performance) {
        if (performance === void 0) { performance = false; }
        this.performance = performance;
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
    }
    Lexador.prototype.eDigito = function (caractere) {
        return caractere >= '0' && caractere <= '9';
    };
    Lexador.prototype.eAlfabeto = function (caractere) {
        var acentuacoes = [
            'á',
            'Á',
            'ã',
            'Ã',
            'â',
            'Â',
            'à',
            'À',
            'é',
            'É',
            'ê',
            'Ê',
            'í',
            'Í',
            'ó',
            'Ó',
            'õ',
            'Õ',
            'ô',
            'Ô',
            'ú',
            'Ú',
            'ç',
            'Ç',
            '_',
        ];
        return ((caractere >= 'a' && caractere <= 'z') ||
            (caractere >= 'A' && caractere <= 'Z') ||
            acentuacoes.includes(caractere));
    };
    Lexador.prototype.eAlfabetoOuDigito = function (caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    };
    Lexador.prototype.eFinalDaLinha = function () {
        return this.atual >= this.codigo[this.linha].length;
    };
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    Lexador.prototype.eUltimaLinha = function () {
        return this.linha >= this.codigo.length - 1;
    };
    Lexador.prototype.eFinalDoCodigo = function () {
        return this.eUltimaLinha() &&
            this.codigo[this.codigo.length - 1].length <= this.atual;
    };
    Lexador.prototype.avancar = function () {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    };
    Lexador.prototype.adicionarSimbolo = function (tipo, literal) {
        if (literal === void 0) { literal = null; }
        var texto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, texto, literal, this.linha + 1));
    };
    Lexador.prototype.proximoIgualA = function (esperado) {
        if (this.eFinalDaLinha()) {
            return false;
        }
        if (this.codigo[this.linha][this.atual + 1] !== esperado) {
            return false;
        }
        return true;
    };
    Lexador.prototype.simboloAtual = function () {
        if (this.eFinalDaLinha())
            return '\0';
        return this.codigo[this.linha].charAt(this.atual);
    };
    Lexador.prototype.avancarParaProximaLinha = function () {
        this.linha++;
        this.atual = 0;
    };
    Lexador.prototype.proximoSimbolo = function () {
        if (this.atual + 1 >= this.codigo[this.linha].length)
            return '\0';
        return this.codigo[this.linha].charAt(this.atual + 1);
    };
    Lexador.prototype.simboloAnterior = function () {
        return this.codigo[this.linha].charAt(this.atual - 1);
    };
    Lexador.prototype.analisarTexto = function (delimitador) {
        if (delimitador === void 0) { delimitador = '"'; }
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Texto não finalizado.'
            });
            return;
        }
        var valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(tipos_de_simbolos_1.default.TEXTO, valor);
    };
    Lexador.prototype.analisarNumero = function () {
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        var numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(tipos_de_simbolos_1.default.NUMERO, parseFloat(numeroCompleto));
    };
    Lexador.prototype.identificarPalavraChave = function () {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        var codigo = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        var tipo = codigo in palavras_reservadas_1.default
            ? palavras_reservadas_1.default[codigo]
            : tipos_de_simbolos_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    };
    Lexador.prototype.encontrarFimComentarioAsterisco = function () {
        while (!this.eUltimaLinha()) {
            this.avancar();
            if (this.simboloAtual() === '*' && this.proximoSimbolo() === '/') {
                this.avancar();
                this.avancar();
                break;
            }
        }
    };
    Lexador.prototype.analisarToken = function () {
        var caractere = this.simboloAtual();
        switch (caractere) {
            case '[':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '{':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.CHAVE_DIREITA);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.SUBTRACAO);
                }
                break;
            case '+':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.ADICAO);
                }
                break;
            case ':':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.DOIS_PONTOS);
                this.avancar();
                break;
            case '%':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.MODULO);
                this.avancar();
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '*') {
                    this.avancar();
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.EXPONENCIACAO);
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MULTIPLICACAO);
                }
                break;
            case '!':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.DIFERENTE);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.NEGACAO);
                }
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.IGUAL);
                }
                break;
            case '&':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_AND);
                this.avancar();
                break;
            case '~':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_NOT);
                this.avancar();
                break;
            case '|':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_OR);
                this.avancar();
                break;
            case '^':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_XOR);
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '<') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR_MENOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '>') {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR_MAIOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR);
                }
                break;
            case '/':
                this.avancar();
                if (this.simboloAtual() == '/') {
                    this.avancarParaProximaLinha();
                }
                else if (this.simboloAtual() === '*') {
                    this.encontrarFimComentarioAsterisco();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.DIVISAO);
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização.
            // Ponto-e-vírgula é opcional em Delégua, então pode apenas ser ignorado.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
            case ';':
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            case "'":
                this.avancar();
                this.analisarTexto("'");
                this.avancar();
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: this.linha + 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.'
                    });
                    this.avancar();
                }
        }
    };
    Lexador.prototype.mapear = function (codigo) {
        var inicioMapeamento = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        var deltaMapeamento = (0, browser_process_hrtime_1.default)(inicioMapeamento);
        if (this.performance) {
            console.log("[Lexador] Tempo para mapeamento: ".concat(deltaMapeamento[0] * 1e9 + deltaMapeamento[1], "ns"));
        }
        return {
            simbolos: this.simbolos,
            erros: this.erros
        };
    };
    return Lexador;
}());
exports.Lexador = Lexador;

},{"../tipos-de-simbolos":69,"./palavras-reservadas":63,"./simbolo":64,"browser-process-hrtime":70}],63:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tipos_de_simbolos_1 = __importDefault(require("./tipos-de-simbolos"));
exports.default = {
    e: tipos_de_simbolos_1.default.E,
    em: tipos_de_simbolos_1.default.EM,
    classe: tipos_de_simbolos_1.default.CLASSE,
    senao: tipos_de_simbolos_1.default.SENAO,
    senão: tipos_de_simbolos_1.default.SENÃO,
    falso: tipos_de_simbolos_1.default.FALSO,
    para: tipos_de_simbolos_1.default.PARA,
    funcao: tipos_de_simbolos_1.default.FUNCAO,
    função: tipos_de_simbolos_1.default.FUNÇÃO,
    se: tipos_de_simbolos_1.default.SE,
    senaose: tipos_de_simbolos_1.default.SENAOSE,
    senãose: tipos_de_simbolos_1.default.SENÃOSE,
    nulo: tipos_de_simbolos_1.default.NULO,
    ou: tipos_de_simbolos_1.default.OU,
    escreva: tipos_de_simbolos_1.default.ESCREVA,
    retorna: tipos_de_simbolos_1.default.RETORNA,
    super: tipos_de_simbolos_1.default.SUPER,
    isto: tipos_de_simbolos_1.default.ISTO,
    verdadeiro: tipos_de_simbolos_1.default.VERDADEIRO,
    var: tipos_de_simbolos_1.default.VARIAVEL,
    fazer: tipos_de_simbolos_1.default.FAZER,
    enquanto: tipos_de_simbolos_1.default.ENQUANTO,
    pausa: tipos_de_simbolos_1.default.PAUSA,
    continua: tipos_de_simbolos_1.default.CONTINUA,
    escolha: tipos_de_simbolos_1.default.ESCOLHA,
    caso: tipos_de_simbolos_1.default.CASO,
    padrao: tipos_de_simbolos_1.default.PADRAO,
    importar: tipos_de_simbolos_1.default.IMPORTAR,
    tente: tipos_de_simbolos_1.default.TENTE,
    pegue: tipos_de_simbolos_1.default.PEGUE,
    finalmente: tipos_de_simbolos_1.default.FINALMENTE,
    herda: tipos_de_simbolos_1.default.HERDA,
};

},{"./tipos-de-simbolos":65}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, lexema, literal, linha) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.literal = literal;
        this.linha = linha;
    }
    Simbolo.prototype.paraTexto = function () {
        return this.tipo + " " + this.lexema + " " + this.literal;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;

},{}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ADICAO: "ADICAO",
    BIT_AND: "BIT_AND",
    BIT_OR: "BIT_OR",
    BIT_XOR: "BIT_XOR",
    BIT_NOT: "BIT_NOT",
    CASO: "CASO",
    CHAVE_DIREITA: "CHAVE_DIREITA",
    CHAVE_ESQUERDA: "CHAVE_ESQUERDA",
    CLASSE: "CLASSE",
    COLCHETE_DIREITO: "COLCHETE_DIREITO",
    COLCHETE_ESQUERDO: "COLCHETE_ESQUERDO",
    VIRGULA: "VIRGULA",
    CONTINUA: "CONTINUA",
    DIFERENTE: "DIFERENTE",
    DIVISAO: "DIVISAO",
    DOIS_PONTOS: "DOIS_PONTOS",
    E: "E",
    EM: "EM",
    ENQUANTO: "ENQUANTO",
    EOF: "EOF",
    ESCOLHA: "ESCOLHA",
    ESCREVA: "ESCREVA",
    EXPONENCIACAO: "EXPONENCIACAO",
    IGUAL: "IGUAL",
    IGUAL_IGUAL: "IGUAL_IGUAL",
    FALSO: "FALSO",
    FAZER: "FAZER",
    FINALMENTE: "FINALMENTE",
    FUNCAO: "FUNCAO",
    FUNÇÃO: "FUNÇÃO",
    HERDA: "HERDA",
    IDENTIFICADOR: "IDENTIFICADOR",
    IMPORTAR: "IMPORTAR",
    ISTO: "ISTO",
    MAIOR: "MAIOR",
    MAIOR_IGUAL: "MAIOR_IGUAL",
    MAIOR_MAIOR: "MAIOR_MAIOR",
    MAIS_IGUAL: "MAIS_IGUAL",
    MENOR: "MENOR",
    MENOS_IGUAL: "MENOS_IGUAL",
    MENOR_IGUAL: "MENOR_IGUAL",
    MENOR_MENOR: "MENOR_MENOR",
    MODULO: "MODULO",
    MULTIPLICACAO: "MULTIPLICACAO",
    NEGACAO: "NEGACAO",
    NULO: "NULO",
    NUMERO: "NUMERO",
    OU: "OU",
    PADRAO: "PADRAO",
    PARA: "PARA",
    PARENTESE_DIREITO: "PARENTESE_DIREITO",
    PARENTESE_ESQUERDO: "PARENTESE_ESQUERDO",
    PAUSA: "PAUSA",
    PEGUE: "PEGUE",
    PONTO: "PONTO",
    PONTO_E_VIRGULA: "PONTO_E_VIRGULA",
    RETORNA: "RETORNA",
    SUBTRACAO: "SUBTRACAO",
    SE: "SE",
    SENAO: "SENAO",
    SENÃO: "SENÃO",
    SENAOSE: "SENAOSE",
    SENÃOSE: "SENÃOSE",
    SUPER: "SUPER",
    SUSTAR: "SUSTAR",
    TENTE: "TENTE",
    TEXTO: "TEXTO",
    VARIAVEL: "VARIAVEL",
    VERDADEIRO: "VERDADEIRO"
};

},{}],66:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroResolvedor = void 0;
var ErroResolvedor = /** @class */ (function (_super) {
    __extends(ErroResolvedor, _super);
    function ErroResolvedor(simbolo, mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.simbolo = simbolo;
        Object.setPrototypeOf(_this, ErroResolvedor.prototype);
        return _this;
    }
    return ErroResolvedor;
}(Error));
exports.ErroResolvedor = ErroResolvedor;

},{}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolvedor = void 0;
var pilha_escopos_1 = require("./pilha-escopos");
var erro_resolvedor_1 = require("./erro-resolvedor");
var TipoFuncao = {
    NENHUM: 'NENHUM',
    FUNCAO: 'FUNCAO',
    CONSTRUTOR: 'CONSTRUTOR',
    METODO: 'METODO',
};
var TipoClasse = {
    NENHUM: 'NENHUM',
    CLASSE: 'CLASSE',
    SUBCLASSE: 'SUBCLASSE',
};
var LoopType = {
    NENHUM: 'NENHUM',
    ENQUANTO: 'ENQUANTO',
    ESCOLHA: 'ESCOLHA',
    PARA: 'PARA',
    FAZER: 'FAZER',
};
/**
 * O Resolvedor (Resolver) é responsável por catalogar todos os identificadores complexos, como por exemplo: funções, classes, variáveis,
 * e delimitar os escopos onde esses identificadores existem.
 * Exemplo: uma classe A declara dois métodos chamados M e N. Todas as variáveis declaradas dentro de M não podem ser vistas por N, e vice-versa.
 * No entanto, todas as variáveis declaradas dentro da classe A podem ser vistas tanto por M quanto por N.
 */
var Resolvedor = /** @class */ (function () {
    function Resolvedor() {
        this.erros = [];
        this.escopos = new pilha_escopos_1.PilhaEscopos();
        this.locais = new Map();
        this.funcaoAtual = TipoFuncao.NENHUM;
        this.classeAtual = TipoClasse.NENHUM;
        this.cicloAtual = TipoClasse.NENHUM;
    }
    Resolvedor.prototype.definir = function (simbolo) {
        if (this.escopos.eVazio())
            return;
        this.escopos.topoDaPilha()[simbolo.lexema] = true;
    };
    Resolvedor.prototype.declarar = function (simbolo) {
        if (this.escopos.eVazio())
            return;
        var escopo = this.escopos.topoDaPilha();
        if (escopo.hasOwnProperty(simbolo.lexema)) {
            var erro = new erro_resolvedor_1.ErroResolvedor(simbolo, 'Variável com esse nome já declarada neste escopo.');
            this.erros.push(erro);
        }
        escopo[simbolo.lexema] = false;
    };
    Resolvedor.prototype.inicioDoEscopo = function () {
        this.escopos.empilhar({});
    };
    Resolvedor.prototype.finalDoEscopo = function () {
        this.escopos.removerUltimo();
    };
    Resolvedor.prototype.resolverLocal = function (expressao, simbolo) {
        for (var i = this.escopos.pilha.length - 1; i >= 0; i--) {
            if (this.escopos.pilha[i].hasOwnProperty(simbolo.lexema)) {
                this.locais.set(expressao, this.escopos.pilha.length - 1 - i);
            }
        }
    };
    Resolvedor.prototype.visitarExpressaoBloco = function (declaracao) {
        this.inicioDoEscopo();
        this.resolver(declaracao.declaracoes);
        this.finalDoEscopo();
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDeVariavel = function (expressao) {
        if (!this.escopos.eVazio() &&
            this.escopos.topoDaPilha()[expressao.simbolo.lexema] === false) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.simbolo, 'Não é possível ler a variável local em seu próprio inicializador.');
            this.erros.push(erro);
            throw erro;
        }
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoVar = function (declaracao) {
        this.declarar(declaracao.simbolo);
        if (declaracao.inicializador !== null) {
            this.resolver(declaracao.inicializador);
        }
        this.definir(declaracao.simbolo);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
        this.resolver(expressao.valor);
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    };
    Resolvedor.prototype.resolverFuncao = function (funcao, tipoFuncao) {
        var enclosingFunc = this.funcaoAtual;
        this.funcaoAtual = tipoFuncao;
        this.inicioDoEscopo();
        var parametros = funcao.parametros;
        if (parametros && parametros.length > 0) {
            for (var i = 0; i < parametros.length; i++) {
                this.declarar(parametros[i]['nome']);
                this.definir(parametros[i]['nome']);
            }
        }
        this.resolver(funcao.corpo);
        this.finalDoEscopo();
        this.funcaoAtual = enclosingFunc;
    };
    Resolvedor.prototype.visitarExpressaoFuncao = function (declaracao) {
        this.declarar(declaracao.simbolo);
        this.definir(declaracao.simbolo);
        this.resolverFuncao(declaracao.funcao, TipoFuncao.FUNCAO);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDeleguaFuncao = function (declaracao) {
        this.resolverFuncao(declaracao, TipoFuncao.FUNCAO);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoTente = function (declaracao) {
        this.resolver(declaracao.caminhoTente);
        if (declaracao.caminhoPegue !== null)
            this.resolver(declaracao.caminhoPegue);
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        if (declaracao.caminhoFinalmente !== null)
            this.resolver(declaracao.caminhoFinalmente);
    };
    Resolvedor.prototype.visitarExpressaoClasse = function (declaracao) {
        var enclosingClass = this.classeAtual;
        this.classeAtual = TipoClasse.CLASSE;
        this.declarar(declaracao.simbolo);
        this.definir(declaracao.simbolo);
        if (declaracao.superClasse !== null &&
            declaracao.simbolo.lexema === declaracao.superClasse.simbolo.lexema) {
            var erro = new erro_resolvedor_1.ErroResolvedor(declaracao.simbolo, 'Uma classe não pode herdar de si mesma.');
            this.erros.push(erro);
        }
        if (declaracao.superClasse !== null) {
            this.classeAtual = TipoClasse.SUBCLASSE;
            this.resolver(declaracao.superClasse);
        }
        if (declaracao.superClasse !== null) {
            this.inicioDoEscopo();
            this.escopos.topoDaPilha()['super'] = true;
        }
        this.inicioDoEscopo();
        this.escopos.topoDaPilha()['isto'] = true;
        var metodos = declaracao.metodos;
        for (var i = 0; i < metodos.length; i++) {
            var declaracao_1 = TipoFuncao.METODO;
            if (metodos[i].simbolo.lexema === 'isto') {
                declaracao_1 = TipoFuncao.CONSTRUTOR;
            }
            this.resolverFuncao(metodos[i].funcao, declaracao_1);
        }
        this.finalDoEscopo();
        if (declaracao.superClasse !== null)
            this.finalDoEscopo();
        this.classeAtual = enclosingClass;
        return null;
    };
    Resolvedor.prototype.visitarExpressaoSuper = function (expressao) {
        if (this.classeAtual === TipoClasse.NENHUM) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.palavraChave, "Não pode usar 'super' fora de uma classe.");
            this.erros.push(erro);
        }
        else if (this.classeAtual !== TipoClasse.SUBCLASSE) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.palavraChave, "Não se usa 'super' numa classe sem SuperClasse.");
            this.erros.push(erro);
        }
        this.resolverLocal(expressao, expressao.palavraChave);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        this.resolver(expressao.objeto);
        return null;
    };
    Resolvedor.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        this.resolver(declaracao.expressao);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoSe = function (declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.caminhoEntao);
        for (var i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            this.resolver(declaracao.caminhosSeSenao[i].condicao);
            this.resolver(declaracao.caminhosSeSenao[i].caminho);
        }
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoImportar = function (declaracao) {
        this.resolver(declaracao.caminho);
    };
    Resolvedor.prototype.visitarExpressaoEscreva = function (declaracao) {
        this.resolver(declaracao.expressao);
    };
    Resolvedor.prototype.visitarExpressaoRetornar = function (declaracao) {
        if (this.funcaoAtual === TipoFuncao.NENHUM) {
            var erro = new erro_resolvedor_1.ErroResolvedor(declaracao.palavraChave, 'Não é possível retornar do código do escopo superior.');
            this.erros.push(erro);
        }
        if (declaracao.valor !== null) {
            if (this.funcaoAtual === TipoFuncao.CONSTRUTOR) {
                var erro = new erro_resolvedor_1.ErroResolvedor(declaracao.palavraChave, 'Não pode retornar o valor do construtor.');
                this.erros.push(erro);
            }
            this.resolver(declaracao.valor);
        }
        return null;
    };
    Resolvedor.prototype.visitarExpressaoEscolha = function (declaracao) {
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ESCOLHA;
        var caminhos = declaracao.caminhos;
        var caminhoPadrao = declaracao.caminhoPadrao;
        for (var i = 0; i < caminhos.length; i++) {
            this.resolver(caminhos[i]['declaracoes']);
        }
        if (caminhoPadrao !== null)
            this.resolver(caminhoPadrao['declaracoes']);
        this.cicloAtual = enclosingType;
    };
    Resolvedor.prototype.visitarExpressaoEnquanto = function (declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.corpo);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoPara = function (declaracao) {
        if (declaracao.inicializador !== null) {
            this.resolver(declaracao.inicializador);
        }
        if (declaracao.condicao !== null) {
            this.resolver(declaracao.condicao);
        }
        if (declaracao.incrementar !== null) {
            this.resolver(declaracao.incrementar);
        }
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ENQUANTO;
        this.resolver(declaracao.corpo);
        this.cicloAtual = enclosingType;
        return null;
    };
    Resolvedor.prototype.visitarExpressaoFazer = function (declaracao) {
        this.resolver(declaracao.condicaoEnquanto);
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.FAZER;
        this.resolver(declaracao.caminhoFazer);
        this.cicloAtual = enclosingType;
        return null;
    };
    Resolvedor.prototype.visitarExpressaoBinaria = function (expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDeChamada = function (expressao) {
        this.resolver(expressao.entidadeChamada);
        var argumentos = expressao.argumentos;
        for (var i = 0; i < argumentos.length; i++) {
            this.resolver(argumentos[i]);
        }
        return null;
    };
    Resolvedor.prototype.visitarExpressaoAgrupamento = function (expressao) {
        this.resolver(expressao.expressao);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDicionario = function (expressao) {
        for (var i = 0; i < expressao.chaves.length; i++) {
            this.resolver(expressao.chaves[i]);
            this.resolver(expressao.valores[i]);
        }
        return null;
    };
    Resolvedor.prototype.visitarExpressaoVetor = function (expressao) {
        for (var i = 0; i < expressao.valores.length; i++) {
            this.resolver(expressao.valores[i]);
        }
        return null;
    };
    Resolvedor.prototype.visitarExpressaoAcessoIndiceVariavel = function (expressao) {
        this.resolver(expressao.entidadeChamada);
        this.resolver(expressao.indice);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoContinua = function (declaracao) {
        return null;
    };
    Resolvedor.prototype.visitarExpressaoSustar = function (declaracao) {
        return null;
    };
    Resolvedor.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expressao) {
        return null;
    };
    Resolvedor.prototype.visitarExpressaoLiteral = function (expressao) {
        return null;
    };
    Resolvedor.prototype.visitarExpressaoLogica = function (expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoUnaria = function (expressao) {
        this.resolver(expressao.direita);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoDefinir = function (expressao) {
        this.resolver(expressao.valor);
        this.resolver(expressao.objeto);
        return null;
    };
    Resolvedor.prototype.visitarExpressaoIsto = function (expressao) {
        if (this.classeAtual == TipoClasse.NENHUM) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.palavraChave, "Não pode usar 'isto' fora da classe.");
            this.erros.push(erro);
        }
        this.resolverLocal(expressao, expressao.palavraChave);
        return null;
    };
    Resolvedor.prototype.resolver = function (declaracoes) {
        if (Array.isArray(declaracoes)) {
            for (var i = 0; i < declaracoes.length; i++) {
                if (declaracoes[i] && declaracoes[i].aceitar)
                    declaracoes[i].aceitar(this);
            }
        }
        else if (declaracoes && declaracoes.aceitar) {
            declaracoes.aceitar(this);
        }
        return {
            erros: this.erros,
            locais: this.locais
        };
    };
    return Resolvedor;
}());
exports.Resolvedor = Resolvedor;

},{"./erro-resolvedor":66,"./pilha-escopos":68}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaEscopos = void 0;
var PilhaEscopos = /** @class */ (function () {
    function PilhaEscopos() {
        this.pilha = [];
    }
    PilhaEscopos.prototype.empilhar = function (item) {
        this.pilha.push(item);
    };
    PilhaEscopos.prototype.eVazio = function () {
        return this.pilha.length === 0;
    };
    PilhaEscopos.prototype.topoDaPilha = function () {
        if (this.eVazio())
            throw new Error("Pilha vazia.");
        return this.pilha[this.pilha.length - 1];
    };
    PilhaEscopos.prototype.removerUltimo = function () {
        if (this.eVazio())
            throw new Error("Pilha vazia.");
        return this.pilha.pop();
    };
    return PilhaEscopos;
}());
exports.PilhaEscopos = PilhaEscopos;

},{}],69:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],70:[function(require,module,exports){
(function (process,global){(function (){
module.exports = process.hrtime || hrtime

// polyfil for window.performance.now
var performance = global.performance || {}
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() }

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3
  var seconds = Math.floor(clocktime)
  var nanoseconds = Math.floor((clocktime%1)*1e9)
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0]
    nanoseconds = nanoseconds - previousTimestamp[1]
    if (nanoseconds<0) {
      seconds--
      nanoseconds += 1e9
    }
  }
  return [seconds,nanoseconds]
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":72}],71:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":72}],72:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});
