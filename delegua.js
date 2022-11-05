(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Delegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delegua = void 0;
var lexador_1 = require("@designliquido/delegua/fontes/lexador");
var avaliador_sintatico_1 = require("@designliquido/delegua/fontes/avaliador-sintatico");
var interpretador_1 = require("@designliquido/delegua/fontes/interpretador");
var delegua_1 = __importDefault(require("@designliquido/delegua/fontes/tipos-de-simbolos/delegua"));
var Delegua = /** @class */ (function () {
    function Delegua(nomeArquivo, funcaoDeRetorno) {
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
        // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
        this.dialeto = 'delegua';
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.lexador = new lexador_1.Lexador();
        this.avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico();
        this.interpretador = new interpretador_1.Interpretador(null, '', false, this.funcaoDeRetorno);
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
            erros: retornoInterpretador.erros,
            resultado: retornoInterpretador.resultado
        };
    };
    Delegua.prototype.versao = function () {
        return '0.8';
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === delegua_1["default"].EOF) {
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

},{"@designliquido/delegua/fontes/avaliador-sintatico":4,"@designliquido/delegua/fontes/interpretador":62,"@designliquido/delegua/fontes/lexador":66,"@designliquido/delegua/fontes/tipos-de-simbolos/delegua":71}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintatico = void 0;
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
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
        this.hashArquivo = 0;
        this.atual = 0;
        this.ciclos = 0;
        this.erros = [];
        this.performance = performance;
    }
    AvaliadorSintatico.prototype.erro = function (simbolo, mensagemDeErro) {
        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    };
    AvaliadorSintatico.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    };
    AvaliadorSintatico.prototype.verificarTipoSimboloAtual = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual].tipo === tipo;
    };
    AvaliadorSintatico.prototype.verificarTipoProximoSimbolo = function (tipo) {
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    AvaliadorSintatico.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    AvaliadorSintatico.prototype.simboloAnterior = function () {
        return this.simbolos[this.atual - 1];
    };
    AvaliadorSintatico.prototype.estaNoFinal = function () {
        return this.atual === this.simbolos.length;
    };
    AvaliadorSintatico.prototype.avancarEDevolverAnterior = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simbolos[this.atual - 1];
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
        var simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUPER)) {
            var simboloChave = this.simbolos[this.atual - 1];
            this.consumir(delegua_1.default.PONTO, "Esperado '.' após 'super'.");
            var metodo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome do método da SuperClasse.');
            return new construtos_1.Super(this.hashArquivo, simboloChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                var valor = this.atribuir();
                valores.push(valor);
                if (this.simbolos[this.atual].tipo !==
                    delegua_1.default.COLCHETE_DIREITO) {
                    this.consumir(delegua_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_ESQUERDA)) {
            var chaves = [];
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(this.hashArquivo, Number(simboloAtual.linha), [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                var chave = this.atribuir();
                this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                var valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simbolos[this.atual].tipo !==
                    delegua_1.default.CHAVE_DIREITA) {
                    this.consumir(delegua_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Dicionario(this.hashArquivo, Number(simboloAtual.linha), chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FUNÇÃO, delegua_1.default.FUNCAO))
            return this.corpoDaFuncao(this.simbolos[this.atual - 1].lexema);
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FALSO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), false);
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VERDADEIRO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), true);
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.NULO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), null);
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.ISTO))
            return new construtos_1.Isto(this.hashArquivo, Number(simboloAtual.linha), this.simbolos[this.atual - 1]);
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.NUMERO, delegua_1.default.TEXTO)) {
            var simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
            var expressao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    };
    AvaliadorSintatico.prototype.finalizarChamada = function (entidadeChamada) {
        var argumentos = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        var parenteseDireito = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    };
    AvaliadorSintatico.prototype.chamar = function () {
        var expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO)) {
                var nome = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
                var indice = this.expressao();
                var simboloFechamento = this.consumir(delegua_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.NEGACAO, delegua_1.default.SUBTRACAO, delegua_1.default.BIT_NOT)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito);
        }
        return this.chamar();
    };
    AvaliadorSintatico.prototype.exponenciacao = function () {
        var expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EXPONENCIACAO)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.multiplicar = function () {
        var expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIVISAO, delegua_1.default.MULTIPLICACAO, delegua_1.default.MODULO, delegua_1.default.DIVISAO_IGUAL, delegua_1.default.MULTIPLICACAO_IGUAL, delegua_1.default.MODULO_IGUAL)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    /**
     * Se símbolo de operação é `+`, `-`, `+=` ou `-=`, monta objeto `Binario` para
     * ser avaliado pelo Interpretador.
     * @returns Um Construto, normalmente um `Binario`, ou `Unario` se houver alguma operação unária para ser avaliada.
     */
    AvaliadorSintatico.prototype.adicaoOuSubtracao = function () {
        var expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUBTRACAO, delegua_1.default.ADICAO, delegua_1.default.MAIS_IGUAL, delegua_1.default.MENOS_IGUAL)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitFill = function () {
        var expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MENOR_MENOR, delegua_1.default.MAIOR_MAIOR)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitE = function () {
        var expressao = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_AND)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.bitFill();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.bitOu = function () {
        var expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_OR, delegua_1.default.BIT_XOR)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.bitE();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.comparar = function () {
        var expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MAIOR, delegua_1.default.MAIOR_IGUAL, delegua_1.default.MENOR, delegua_1.default.MENOR_IGUAL)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.bitOu();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.comparacaoIgualdade = function () {
        var expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIFERENTE, delegua_1.default.IGUAL_IGUAL)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.em = function () {
        var expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EM)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.e = function () {
        var expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.E)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.em();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.ou = function () {
        var expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.OU)) {
            var operador = this.simbolos[this.atual - 1];
            var direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    };
    /**
     * Método que resolve atribuições.
     * @returns Um construto do tipo `Atribuir`, `Conjunto` ou `AtribuicaoSobrescrita`.
     */
    AvaliadorSintatico.prototype.atribuir = function () {
        var expressao = this.ou();
        if (expressao instanceof construtos_1.Binario &&
            [
                delegua_1.default.MAIS_IGUAL,
                delegua_1.default.MENOS_IGUAL,
                delegua_1.default.MULTIPLICACAO_IGUAL,
                delegua_1.default.DIVISAO_IGUAL,
                delegua_1.default.MODULO_IGUAL,
            ].includes(expressao.operador.tipo)) {
            return new construtos_1.Atribuir(this.hashArquivo, expressao.esquerda.simbolo, expressao);
        }
        else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            var igual = this.simbolos[this.atual - 1];
            var valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                var simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                var get = expressao;
                return new construtos_1.Conjunto(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoSobrescrita(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.expressao = function () {
        return this.atribuir();
    };
    AvaliadorSintatico.prototype.declaracaoEscreva = function () {
        var simboloAtual = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    };
    AvaliadorSintatico.prototype.declaracaoExpressao = function () {
        var expressao = this.expressao();
        return new declaracoes_1.Expressao(expressao);
    };
    AvaliadorSintatico.prototype.blocoEscopo = function () {
        var declaracoes = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    };
    AvaliadorSintatico.prototype.declaracaoSe = function () {
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var caminhoEntao = this.resolverDeclaracao();
        var caminhosSeSenao = [];
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAOSE, delegua_1.default.SENÃOSE)) {
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senaose' ou 'senãose'.");
            var condicaoSeSenao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após codição do 'senaose' ou 'senãose'.");
            var caminho = this.resolverDeclaracao();
            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        var caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, caminhosSeSenao, caminhoSenao);
    };
    AvaliadorSintatico.prototype.declaracaoEnquanto = function () {
        try {
            this.ciclos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            var condicao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.declaracaoPara = function () {
        try {
            var simboloPara = this.simbolos[this.atual - 1];
            this.ciclos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            var inicializador = void 0;
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            var condicao = null;
            if (!this.verificarTipoSimboloAtual(delegua_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            var incrementar = null;
            if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.declaracaoSustar = function () {
        if (this.ciclos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'sustar' ou 'pausa' deve estar dentro de um laço de repetição.");
        }
        return new declaracoes_1.Sustar(this.simbolos[this.atual]);
    };
    AvaliadorSintatico.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua(this.simbolos[this.atual]);
    };
    AvaliadorSintatico.prototype.declaracaoRetorna = function () {
        var simboloChave = this.simbolos[this.atual - 1];
        var valor = null;
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(simboloChave, valor);
    };
    AvaliadorSintatico.prototype.declaracaoEscolha = function () {
        try {
            this.ciclos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            var condicao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            var caminhos = [];
            var caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA) &&
                !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CASO)) {
                    var caminhoCondicoes = [this.expressao()];
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(delegua_1.default.CASO)) {
                        this.consumir(delegua_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes: declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simbolos[this.atual], "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
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
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var simboloFechamento = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    };
    AvaliadorSintatico.prototype.declaracaoTente = function () {
        var simboloTente = this.simbolos[this.atual - 1];
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        var blocoTente = this.blocoEscopo();
        var blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PEGUE)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoPegue = this.blocoEscopo();
        }
        var blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoSenao = this.blocoEscopo();
        }
        var blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FINALMENTE)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(simboloTente.hashArquivo, Number(simboloTente.linha), blocoTente, blocoPegue, blocoSenao, blocoFinalmente);
    };
    AvaliadorSintatico.prototype.declaracaoFazer = function () {
        var simboloFazer = this.simbolos[this.atual - 1];
        try {
            this.ciclos += 1;
            var caminhoFazer = this.resolverDeclaracao();
            this.consumir(delegua_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            var condicaoEnquanto = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(simboloFazer.hashArquivo, Number(simboloFazer.linha), caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintatico.prototype.resolverDeclaracao = function () {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.TENTE))
            return this.declaracaoTente();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PAUSA))
            return this.declaracaoSustar();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.ESCREVA))
            return this.declaracaoEscreva();
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_ESQUERDA)) {
            var simboloInicioBloco = this.simbolos[this.atual - 1];
            return new declaracoes_1.Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
        }
        var simboloAtual = this.simbolos[this.atual];
        if (simboloAtual.tipo === delegua_1.default.IDENTIFICADOR) {
            // Pela gramática, a seguinte situação não pode ocorrer:
            // 1. O símbolo anterior ser um identificador; e
            // 2. O símbolo anterior estar na mesma linha do identificador atual.
            var simboloAnterior = this.simbolos[this.atual - 1];
            if (!!simboloAnterior &&
                simboloAnterior.tipo === delegua_1.default.IDENTIFICADOR &&
                simboloAnterior.linha === simboloAtual.linha) {
                this.erro(this.simbolos[this.atual], 'Não é permitido ter dois identificadores seguidos na mesma linha.');
            }
        }
        return this.declaracaoExpressao();
    };
    /**
     * Caso símbolo atual seja `var`, devolve uma declaração de variável.
     * @returns Um Construto do tipo Var.
     */
    AvaliadorSintatico.prototype.declaracaoDeVariavel = function () {
        var simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            inicializador = this.expressao();
        }
        return new declaracoes_1.Var(simbolo, inicializador);
    };
    AvaliadorSintatico.prototype.funcao = function (tipo) {
        var simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado nome ".concat(tipo, "."));
        return new declaracoes_1.Funcao(simbolo, this.corpoDaFuncao(tipo));
    };
    AvaliadorSintatico.prototype.logicaComumParametros = function () {
        var parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 parâmetros');
            }
            var parametro = {};
            if (this.simbolos[this.atual].tipo === delegua_1.default.MULTIPLICACAO) {
                this.consumir(delegua_1.default.MULTIPLICACAO, null);
                parametro.tipo = 'estrela';
            }
            else {
                parametro.tipo = 'padrao';
            }
            parametro.nome = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
                parametro.valorPadrao = this.primario();
            }
            parametros.push(parametro);
            if (parametro.tipo === 'estrela')
                break;
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        return parametros;
    };
    AvaliadorSintatico.prototype.corpoDaFuncao = function (tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        var parenteseEsquerdo = this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(tipo, "."));
        var parametros = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do ".concat(tipo, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo);
    };
    AvaliadorSintatico.prototype.declaracaoDeClasse = function () {
        var simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        var superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.HERDA)) {
            this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da SuperClasse.');
            superClasse = new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        var metodos = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    };
    AvaliadorSintatico.prototype.declaracao = function () {
        try {
            if ((this.verificarTipoSimboloAtual(delegua_1.default.FUNCAO) ||
                this.verificarTipoSimboloAtual(delegua_1.default.FUNÇÃO)) &&
                this.verificarTipoProximoSimbolo(delegua_1.default.IDENTIFICADOR)) {
                this.avancarEDevolverAnterior();
                return this.funcao('funcao');
            }
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    };
    /**
     * Usado quando há erros na avaliação sintática.
     * Garante que o código não entre em loop infinito.
     * @returns Sempre retorna `void`.
     */
    AvaliadorSintatico.prototype.sincronizar = function () {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            var tipoSimboloAtual = this.simbolos[this.atual - 1].tipo;
            if (tipoSimboloAtual === delegua_1.default.PONTO_E_VIRGULA)
                return;
            switch (tipoSimboloAtual) {
                case delegua_1.default.CLASSE:
                case delegua_1.default.FUNCAO:
                case delegua_1.default.FUNÇÃO:
                case delegua_1.default.VARIAVEL:
                case delegua_1.default.PARA:
                case delegua_1.default.SE:
                case delegua_1.default.ENQUANTO:
                case delegua_1.default.ESCREVA:
                case delegua_1.default.RETORNA:
                    return;
            }
            this.avancarEDevolverAnterior();
        }
    };
    AvaliadorSintatico.prototype.analisar = function (retornoLexador, hashArquivo) {
        var inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.ciclos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        var declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        if (this.performance) {
            var deltaAnalise = (0, browser_process_hrtime_1.default)(inicioAnalise);
            console.log("[Avaliador Sint\u00E1tico] Tempo para an\u00E1lise: ".concat(deltaAnalise[0] * 1e9 + deltaAnalise[1], "ns"));
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    };
    return AvaliadorSintatico;
}());
exports.AvaliadorSintatico = AvaliadorSintatico;

},{"../construtos":20,"../declaracoes":39,"../tipos-de-simbolos/delegua":71,"./erro-avaliador-sintatico":3,"browser-process-hrtime":72}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./avaliador-sintatico":2,"./erro-avaliador-sintatico":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excecoes_1 = require("../excecoes");
var funcao_1 = require("../estruturas/funcao");
var objeto_delegua_classe_1 = require("../estruturas/objeto-delegua-classe");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var delegua_classe_1 = require("../estruturas/delegua-classe");
function default_1(interpretador, pilhaEscoposExecucao) {
    // Retorna um número aleatório entre 0 e 1.
    pilhaEscoposExecucao.definirVariavel('aleatorio', new funcao_padrao_1.FuncaoPadrao(1, function () {
        return Math.random();
    }));
    // Retorna um número aleatório de acordo com o parâmetro passado.
    // Mínimo(inclusivo) - Máximo(exclusivo)
    pilhaEscoposExecucao.definirVariavel('aleatorioEntre', new funcao_padrao_1.FuncaoPadrao(1, function (minimo, maximo) {
        var valorMinimo = minimo.hasOwnProperty('valor')
            ? minimo.valor
            : minimo;
        var valorMaximo = maximo.hasOwnProperty('valor')
            ? maximo.valor
            : maximo;
        if (typeof valorMinimo !== 'number' ||
            typeof valorMaximo !== 'number') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Os dois parâmetros devem ser do tipo número.');
        }
        return (Math.floor(Math.random() * (valorMaximo - valorMinimo)) +
            valorMinimo);
    }));
    pilhaEscoposExecucao.definirVariavel('inteiro', new funcao_padrao_1.FuncaoPadrao(1, function (numero) {
        if (numero === null || numero === undefined)
            return 0;
        var valor = numero.hasOwnProperty('valor')
            ? numero.valor
            : numero;
        if (isNaN(valor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece ser um número. Somente números ou textos com números podem ser convertidos para inteiro.');
        }
        if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para inteiro.');
        }
        return parseInt(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('mapear', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoMapeamento) {
        var valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        var valorFuncaoMapeamento = funcaoMapeamento.hasOwnProperty('valor')
            ? funcaoMapeamento.valor
            : funcaoMapeamento;
        if (!Array.isArray(valorVetor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função mapear() deve ser um vetor.');
        }
        if (valorFuncaoMapeamento.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função mapear() deve ser uma função.');
        }
        var resultados = [];
        for (var indice = 0; indice < valorVetor.length; ++indice) {
            resultados.push(valorFuncaoMapeamento.chamar(interpretador, [
                valorVetor[indice],
            ]));
        }
        return resultados;
    }));
    pilhaEscoposExecucao.definirVariavel('todosEmCondicao', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoCondicional) {
        var valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        var valorFuncaoCondicional = funcaoCondicional.hasOwnProperty('valor')
            ? funcaoCondicional.valor
            : funcaoCondicional;
        if (!Array.isArray(valorVetor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função todosEmCondicao() deve ser um vetor.');
        }
        if (valorFuncaoCondicional.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função todosEmCondicao() deve ser uma função.');
        }
        for (var indice = 0; indice < valorVetor.length; ++indice) {
            if (!valorFuncaoCondicional.chamar(interpretador, [
                valorVetor[indice],
            ]))
                false;
        }
        return true;
    }));
    pilhaEscoposExecucao.definirVariavel('filtrarPor', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        var valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        var valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função filtrarPor() deve ser um vetor.');
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função filtrarPor() deve ser uma função.');
        }
        var resultados = [];
        for (var indice = 0; indice < valorVetor.length; ++indice) {
            valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]) &&
                resultados.push(valorFuncaoFiltragem.chamar(interpretador, [
                    valorVetor[indice],
                ]));
        }
        return resultados;
    }));
    pilhaEscoposExecucao.definirVariavel('primeiroEmCondicao', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        var valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        var valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função primeiroEmCondicao() deve ser um vetor.');
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função primeiroEmCondicao() deve ser uma função.');
        }
        var resultados = [];
        for (var indice = 0; indice < valorVetor.length; ++indice) {
            valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]) &&
                resultados.push(valorFuncaoFiltragem.chamar(interpretador, [
                    valorVetor[indice],
                ]));
        }
        return resultados[0];
    }));
    pilhaEscoposExecucao.definirVariavel('paraCada', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        var valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        var valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função paraCada() deve ser um vetor.');
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função paraCada() deve ser uma função.');
        }
        for (var indice = 0; indice < valorVetor.length; ++indice) {
            valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]);
        }
    }));
    pilhaEscoposExecucao.definirVariavel('ordenar', new funcao_padrao_1.FuncaoPadrao(1, function (vetor) {
        var _a;
        var objeto = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        if (!Array.isArray(objeto)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor inválido. Objeto inserido não é um vetor.');
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
    pilhaEscoposExecucao.definirVariavel('real', new funcao_padrao_1.FuncaoPadrao(1, function (numero) {
        var valor = numero.hasOwnProperty('valor')
            ? numero.valor
            : numero;
        if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto/valor vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para real.');
        }
        return parseFloat(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('tamanho', new funcao_padrao_1.FuncaoPadrao(1, function (objeto) {
        var valorObjeto = objeto.hasOwnProperty('valor')
            ? objeto.valor
            : objeto;
        if (!isNaN(valorObjeto)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Não é possível encontrar o tamanho de um número.');
        }
        if (valorObjeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Você não pode encontrar o tamanho de uma declaração.');
        }
        if (valorObjeto instanceof funcao_1.DeleguaFuncao) {
            return valorObjeto.declaracao.parametros.length;
        }
        if (valorObjeto instanceof funcao_padrao_1.FuncaoPadrao) {
            return valorObjeto.valorAridade;
        }
        if (valorObjeto instanceof delegua_classe_1.DeleguaClasse) {
            var metodos = valorObjeto.metodos;
            var tamanho = 0;
            if (metodos.inicializacao &&
                metodos.inicializacao.eInicializador) {
                tamanho =
                    metodos.inicializacao.declaracao.parametros.length;
            }
            return tamanho;
        }
        return valorObjeto.length;
    }));
    pilhaEscoposExecucao.definirVariavel('texto', new funcao_padrao_1.FuncaoPadrao(1, function (valorOuVariavel) {
        return "".concat(valorOuVariavel.hasOwnProperty('valor')
            ? valorOuVariavel.valor
            : valorOuVariavel);
    }));
    return pilhaEscoposExecucao;
}
exports.default = default_1;

},{"../estruturas/delegua-classe":50,"../estruturas/funcao":52,"../estruturas/funcao-padrao":51,"../estruturas/objeto-delegua-classe":56,"../excecoes":59}],6:[function(require,module,exports){
(function (process){(function (){
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
Object.defineProperty(exports, "__esModule", { value: true });
var processoFilho = __importStar(require("child_process"));
var caminho = __importStar(require("path"));
var excecoes_1 = require("../excecoes");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var modulo_1 = require("../estruturas/modulo");
var classe_padrao_1 = require("../estruturas/classe-padrao");
var carregarBibliotecaDelegua = function (nome) {
    var dadosDoModulo;
    try {
        dadosDoModulo = require(nome);
    }
    catch (erro) {
        // Biblioteca não existe localmente. Tentar importação global
        try {
            dadosDoModulo = importarPacoteDeleguaCompleto(nome);
        }
        catch (erro2) {
            throw new excecoes_1.ErroEmTempoDeExecucao(null, "Biblioteca ".concat(nome, " n\u00E3o encontrada para importa\u00E7\u00E3o."));
        }
    }
    return modularizarBiblioteca(dadosDoModulo, nome);
};
var carregarBiblioteca = function (nomeDaBiblioteca, caminhoDaBiblioteca) {
    var dadosDoModulo;
    try {
        dadosDoModulo = require(caminhoDaBiblioteca);
    }
    catch (erro) {
        throw new excecoes_1.ErroEmTempoDeExecucao(null, "Biblioteca ".concat(nomeDaBiblioteca, " n\u00E3o encontrada para importa\u00E7\u00E3o."));
    }
    return modularizarBiblioteca(dadosDoModulo, nomeDaBiblioteca);
};
var modularizarBiblioteca = function (dadosDoModulo, nome) {
    var novoModulo = new modulo_1.DeleguaModulo(nome);
    var chaves = Object.keys(dadosDoModulo);
    for (var i = 0; i < chaves.length; i++) {
        var moduloAtual = dadosDoModulo[chaves[i]];
        if (typeof moduloAtual === 'function') {
            // Por definição, funções tradicionais e classes são identificadas em JavaScript como "functions".
            // A forma de diferenciar é verificando a propriedade `prototype`.
            // Se dentro dessa propriedade temos outras propriedades cujo tipo também seja `function`,
            // podemos dizer que a "function" é uma classe.
            // Caso contrário, é uma função (`FuncaoPadrao`).
            if (Object.entries(moduloAtual.prototype).some(function (f) { return typeof f[1] === 'function'; })) {
                var classePadrao = new classe_padrao_1.ClassePadrao(chaves[i], moduloAtual);
                for (var _i = 0, _a = Object.entries(moduloAtual.prototype); _i < _a.length; _i++) {
                    var _b = _a[_i], nome_1 = _b[0], corpoMetodo = _b[1];
                    classePadrao.metodos[nome_1] = corpoMetodo;
                }
                novoModulo.componentes[chaves[i]] = classePadrao;
            }
            else {
                novoModulo.componentes[chaves[i]] = new funcao_padrao_1.FuncaoPadrao(moduloAtual.length, moduloAtual);
            }
        }
        else {
            novoModulo.componentes[chaves[i]] = moduloAtual;
        }
    }
    return novoModulo;
};
var importarPacoteDeleguaCompleto = function (nome) {
    var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    var global = processoFilho.spawnSync(npm, ['root', '--location=global']);
    return require(caminho.join(global.output[1].toString().trim(), "/delegua/node_modules/".concat(nome)));
};
var verificaModulosDelegua = function (nome) {
    var modulos = {
        estatistica: '@designliquido/delegua-estatistica',
        estatística: '@designliquido/delegua-estatistica',
        fisica: '@designliquido/delegua-fisica',
        física: '@designliquido/delegua-fisica',
        matematica: '@designliquido/delegua-matematica',
        matemática: '@designliquido/delegua-matematica',
        tempo: '@designliquido/delegua-tempo',
    };
    if (Object.keys(modulos).includes(nome)) {
        return modulos[nome].toString();
    }
    return false;
};
function default_1(nome) {
    var nomeBibliotecaResolvido = verificaModulosDelegua(nome);
    return nomeBibliotecaResolvido
        ? carregarBibliotecaDelegua(String(nomeBibliotecaResolvido))
        : carregarBiblioteca(nome, nome);
}
exports.default = default_1;

}).call(this)}).call(this,require('_process'))
},{"../estruturas/classe-padrao":49,"../estruturas/funcao-padrao":51,"../estruturas/modulo":55,"../excecoes":59,"_process":75,"child_process":73,"path":74}],7:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    inclui: function (texto, elemento) { return texto.includes(elemento); },
    minusculo: function (texto) { return texto.toLowerCase(); },
    maiusculo: function (texto) { return texto.toUpperCase(); },
    substituir: function (texto, elemento, substituto) {
        return texto.replace(elemento, substituto);
    },
    subtexto: function (texto, inicio, fim) {
        return texto.slice(inicio, fim);
    },
    fatiar: function (texto, inicio, fim) {
        return texto.slice(inicio, fim);
    },
    dividir: function (texto, divisor, limite) { return __spreadArray([], texto.split(divisor, limite), true); },
};

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    inclui: function (vetor, elemento) { return vetor.includes(elemento); },
    juntar: function (vetor, separador) { return vetor.join(separador); },
    removerUltimo: function (vetor) {
        vetor.pop();
        return vetor;
    },
    removerPrimeiro: function (vetor) {
        vetor.shift();
        return vetor;
    },
    empilhar: function (vetor, elemento) {
        vetor.push(elemento);
        return vetor;
    },
    adicionar: function (vetor, elemento) {
        vetor.push(elemento);
        return vetor;
    },
    inverter: function (vetor) { return vetor.reverse(); },
    fatiar: function (vetor, inicio, fim) {
        return vetor.slice(inicio, fim);
    },
    ordenar: function (vetor) { return vetor.sort(); },
    somar: function (vetor) { return vetor.reduce(function (a, b) { return a + b; }); },
    remover: function (vetor, elemento) {
        var index = vetor.indexOf(elemento);
        if (index !== -1)
            vetor.splice(index, 1);
        return vetor;
    },
};

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoIndiceVariavel = void 0;
/**
 * Definido como `Subscript` em Égua Clássico, esse construto serve para acessar índices de
 * vetores e dicionários.
 */
var AcessoIndiceVariavel = /** @class */ (function () {
    function AcessoIndiceVariavel(hashArquivo, entidadeChamada, indice, simboloFechamento) {
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
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

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoMetodo = void 0;
/**
 * Chamado de `Get` em Égua Clássico, é o construto de acesso a métodos ou membros de
 * classe.
 */
var AcessoMetodo = /** @class */ (function () {
    function AcessoMetodo(hashArquivo, objeto, simbolo) {
        this.linha = objeto.linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.simbolo = simbolo;
    }
    AcessoMetodo.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAcessoMetodo(this);
    };
    return AcessoMetodo;
}());
exports.AcessoMetodo = AcessoMetodo;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agrupamento = void 0;
/**
 * Um agrupamento é essencialmente uma expressão qualquer dentro de parênteses.
 * Usado para resolver precedência de operadores. Por exemplo:
 * `(2 + 2) * 5`, `(2 + 2)` é um agrupamento cuja expressão é `2 + 2`.
 */
var Agrupamento = /** @class */ (function () {
    function Agrupamento(hashArquivo, linha, expressao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.expressao = expressao;
    }
    Agrupamento.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAgrupamento(this);
    };
    return Agrupamento;
}());
exports.Agrupamento = Agrupamento;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoSobrescrita = void 0;
var AtribuicaoSobrescrita = /** @class */ (function () {
    function AtribuicaoSobrescrita(hashArquivo, linha, objeto, indice, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
var Atribuir = /** @class */ (function () {
    function Atribuir(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
        this.valor = valor;
    }
    Atribuir.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeAtribuicao(this);
    };
    return Atribuir;
}());
exports.Atribuir = Atribuir;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binario = void 0;
/**
 * Binário é uma estrutura com um operador e dois operandos: esquerda e direita.
 * Implementa as seguintes operações:
 *
 * - `+` (Adição) e `+=` (Adição com Atribuição)
 * - `-` (Subtração) e `-=` (Subtração com Atribuição)
 * - `*` (Multiplicação) e `*=` (Multiplicação com Atribuição)
 * - `/` (Divisão) e `/=` (Divisão com Atribuição)
 * - `%` (Módulo) e `%=` (Módulo com Atribuição)
 * - `**` (Exponenciação)
 */
var Binario = /** @class */ (function () {
    function Binario(hashArquivo, esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
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

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamada = void 0;
var Chamada = /** @class */ (function () {
    function Chamada(hashArquivo, entidadeChamada, parentese, argumentos) {
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
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

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conjunto = void 0;
var Conjunto = /** @class */ (function () {
    function Conjunto(hashArquivo, linha, objeto, nome, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
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

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
var Dicionario = /** @class */ (function () {
    function Dicionario(hashArquivo, linha, chaves, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.chaves = chaves;
        this.valores = valores;
    }
    Dicionario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDicionario(this);
    };
    return Dicionario;
}());
exports.Dicionario = Dicionario;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcao = void 0;
var Funcao = /** @class */ (function () {
    function Funcao(hashArquivo, linha, parametros, corpo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.corpo = corpo;
    }
    Funcao.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeleguaFuncao(this);
    };
    return Funcao;
}());
exports.Funcao = Funcao;

},{}],20:[function(require,module,exports){
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

},{"./acesso-indice-variavel":9,"./acesso-metodo":10,"./agrupamento":11,"./atribuicao-sobrescrita":12,"./atribuir":13,"./binario":14,"./chamada":15,"./conjunto":16,"./construto":17,"./dicionario":18,"./funcao":19,"./isto":21,"./literal":22,"./logico":23,"./super":24,"./unario":25,"./variavel":26,"./vetor":27}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
var Isto = /** @class */ (function () {
    function Isto(hashArquivo, linha, palavraChave) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.palavraChave = palavraChave;
    }
    Isto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoIsto(this);
    };
    return Isto;
}());
exports.Isto = Isto;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(hashArquivo, linha, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
    }
    Literal.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLiteral(this);
    };
    return Literal;
}());
exports.Literal = Literal;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
var Logico = /** @class */ (function () {
    function Logico(hashArquivo, esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
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

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
var Super = /** @class */ (function () {
    function Super(hashArquivo, simboloChave, metodo) {
        this.linha = Number(simboloChave.linha);
        this.hashArquivo = hashArquivo;
        this.simboloChave = simboloChave;
        this.metodo = metodo;
    }
    Super.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSuper(this);
    };
    return Super;
}());
exports.Super = Super;

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
var Unario = /** @class */ (function () {
    function Unario(hashArquivo, operador, direita) {
        this.linha = operador.linha;
        this.hashArquivo = hashArquivo;
        this.operador = operador;
        this.direita = direita;
    }
    Unario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoUnaria(this);
    };
    return Unario;
}());
exports.Unario = Unario;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variavel = void 0;
var Variavel = /** @class */ (function () {
    function Variavel(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    Variavel.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeVariavel(this);
    };
    return Variavel;
}());
exports.Variavel = Variavel;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
var Vetor = /** @class */ (function () {
    function Vetor(hashArquivo, linha, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valores = valores;
    }
    Vetor.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoVetor(this);
    };
    return Vetor;
}());
exports.Vetor = Vetor;

},{}],28:[function(require,module,exports){
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
    function Bloco(hashArquivo, linha, declaracoes) {
        var _this = _super.call(this, linha, hashArquivo) || this;
        _this.declaracoes = declaracoes;
        return _this;
    }
    Bloco.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoBloco(this);
    };
    return Bloco;
}(declaracao_1.Declaracao));
exports.Bloco = Bloco;

},{"./declaracao":31}],29:[function(require,module,exports){
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
        var _this = _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
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

},{"./declaracao":31}],30:[function(require,module,exports){
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
    function Continua(simbolo) {
        return _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
    }
    Continua.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoContinua(this);
    };
    return Continua;
}(declaracao_1.Declaracao));
exports.Continua = Continua;

},{"./declaracao":31}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracao = void 0;
var Declaracao = /** @class */ (function () {
    function Declaracao(linha, hashArquivo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        // TODO: Por ora, todos os testes são feitos num script só.
        // Quando iniciarem os testes em múltiplos arquivos e módulos,
        // pensar numa forma melhor de preencher isso.
        this.assinaturaMetodo = '<principal>';
    }
    Declaracao.prototype.aceitar = function (visitante) {
        throw new Error('Este método não deveria ser chamado.');
    };
    return Declaracao;
}());
exports.Declaracao = Declaracao;

},{}],32:[function(require,module,exports){
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
        var _this = _super.call(this, condicao.linha, condicao.hashArquivo) || this;
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

},{"./declaracao":31}],33:[function(require,module,exports){
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
/**
 * Declaração de escolha de caminho a executar de acordo com literal ou identificador.
 */
var Escolha = /** @class */ (function (_super) {
    __extends(Escolha, _super);
    function Escolha(identificadorOuLiteral, caminhos, caminhoPadrao) {
        var _this = _super.call(this, identificadorOuLiteral.linha, identificadorOuLiteral.hashArquivo) || this;
        _this.identificadorOuLiteral = identificadorOuLiteral;
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

},{"./declaracao":31}],34:[function(require,module,exports){
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
    function Escreva(linha, hashArquivo, argumentos) {
        var _this = _super.call(this, linha, hashArquivo) || this;
        _this.argumentos = argumentos;
        return _this;
    }
    Escreva.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEscreva(this);
    };
    return Escreva;
}(declaracao_1.Declaracao));
exports.Escreva = Escreva;

},{"./declaracao":31}],35:[function(require,module,exports){
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
        var _this = _super.call(this, expressao.linha, expressao.hashArquivo) || this;
        _this.expressao = expressao;
        return _this;
    }
    Expressao.prototype.aceitar = function (visitante) {
        return visitante.visitarDeclaracaoDeExpressao(this);
    };
    return Expressao;
}(declaracao_1.Declaracao));
exports.Expressao = Expressao;

},{"./declaracao":31}],36:[function(require,module,exports){
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
    function Fazer(hashArquivo, linha, caminhoFazer, condicaoEnquanto) {
        var _this = _super.call(this, linha, hashArquivo) || this;
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

},{"./declaracao":31}],37:[function(require,module,exports){
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
        var _this = _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
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

},{"./declaracao":31}],38:[function(require,module,exports){
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
        var _this = _super.call(this, caminho.linha, caminho.hashArquivo) || this;
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

},{"./declaracao":31}],39:[function(require,module,exports){
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
__exportStar(require("./leia"), exports);
__exportStar(require("./para"), exports);
__exportStar(require("./sustar"), exports);
__exportStar(require("./retorna"), exports);
__exportStar(require("./se"), exports);
__exportStar(require("./declaracao"), exports);
__exportStar(require("./tente"), exports);
__exportStar(require("./var"), exports);

},{"./bloco":28,"./classe":29,"./continua":30,"./declaracao":31,"./enquanto":32,"./escolha":33,"./escreva":34,"./expressao":35,"./fazer":36,"./funcao":37,"./importar":38,"./leia":40,"./para":41,"./retorna":42,"./se":43,"./sustar":44,"./tente":45,"./var":46}],40:[function(require,module,exports){
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
exports.Leia = void 0;
var declaracao_1 = require("./declaracao");
/**
 * Declaração que pede a leitura de uma informação da entrada
 * configurada no início da aplicação.
 */
var Leia = /** @class */ (function (_super) {
    __extends(Leia, _super);
    function Leia(linha, hashArquivo, argumentos) {
        var _this = _super.call(this, linha, hashArquivo) || this;
        _this.argumentos = argumentos;
        return _this;
    }
    Leia.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLeia(this);
    };
    return Leia;
}(declaracao_1.Declaracao));
exports.Leia = Leia;

},{"./declaracao":31}],41:[function(require,module,exports){
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
    function Para(hashArquivo, linha, inicializador, condicao, incrementar, corpo) {
        var _this = _super.call(this, linha, hashArquivo) || this;
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

},{"./declaracao":31}],42:[function(require,module,exports){
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
    function Retorna(simboloChave, valor) {
        var _this = _super.call(this, Number(simboloChave.linha), simboloChave.hashArquivo) || this;
        _this.simboloChave = simboloChave;
        _this.valor = valor;
        return _this;
    }
    Retorna.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoRetornar(this);
    };
    return Retorna;
}(declaracao_1.Declaracao));
exports.Retorna = Retorna;

},{"./declaracao":31}],43:[function(require,module,exports){
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
    function Se(condicao, caminhoEntao, caminhosSeSenao, caminhoSenao) {
        var _this = _super.call(this, condicao.linha, condicao.hashArquivo) || this;
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

},{"./declaracao":31}],44:[function(require,module,exports){
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
    function Sustar(simbolo) {
        return _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
    }
    Sustar.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSustar(this);
    };
    return Sustar;
}(declaracao_1.Declaracao));
exports.Sustar = Sustar;

},{"./declaracao":31}],45:[function(require,module,exports){
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
    function Tente(hashArquivo, linha, caminhoTente, caminhoPegue, caminhoSenao, caminhoFinalmente) {
        var _this = _super.call(this, linha, hashArquivo) || this;
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

},{"./declaracao":31}],46:[function(require,module,exports){
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
        var _this = _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
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

},{"./declaracao":31}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspacoVariaveis = void 0;
var EspacoVariaveis = /** @class */ (function () {
    function EspacoVariaveis() {
        this.valores = {};
    }
    return EspacoVariaveis;
}());
exports.EspacoVariaveis = EspacoVariaveis;

},{}],48:[function(require,module,exports){
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
        throw new Error('Este método não deveria ser chamado.');
    };
    return Chamavel;
}());
exports.Chamavel = Chamavel;

},{}],49:[function(require,module,exports){
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
exports.ClassePadrao = void 0;
var chamavel_1 = require("./chamavel");
var objeto_padrao_1 = require("./objeto-padrao");
/**
 * Classe de importação de classes de bibliotecas do JavaScript.
 */
var ClassePadrao = /** @class */ (function (_super) {
    __extends(ClassePadrao, _super);
    function ClassePadrao(nome, funcaoDeClasse) {
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.funcaoDeClasse = funcaoDeClasse;
        _this.metodos = {};
        return _this;
    }
    ClassePadrao.prototype.encontrarMetodo = function (nome) {
        if (this.metodos.hasOwnProperty(nome)) {
            return this.metodos[nome];
        }
        return undefined;
    };
    ClassePadrao.prototype.paraTexto = function () {
        return "<classe-padr\u00E3o ".concat(this.nome, ">");
    };
    /**
     * Para o caso de uma classe padrão, chamá-la na verdade é
     * invocar o construtor e adicionar no corpo de propriedades
     * os métodos implementados para a classe original.
     * @param argumentos
     * @param simbolo
     */
    ClassePadrao.prototype.chamar = function (argumentos, simbolo) {
        var novoObjeto = new objeto_padrao_1.ObjetoPadrao(this.nome);
        this.funcaoDeClasse.apply(novoObjeto, argumentos);
        Object.assign(novoObjeto, this.metodos);
        return novoObjeto;
    };
    return ClassePadrao;
}(chamavel_1.Chamavel));
exports.ClassePadrao = ClassePadrao;

},{"./chamavel":48,"./objeto-padrao":57}],50:[function(require,module,exports){
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
var objeto_delegua_classe_1 = require("./objeto-delegua-classe");
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
        var inicializador = this.encontrarMetodo('construtor');
        return inicializador ? inicializador.aridade() : 0;
    };
    DeleguaClasse.prototype.chamar = function (interpretador, argumentos) {
        var instancia = new objeto_delegua_classe_1.ObjetoDeleguaClasse(this);
        var inicializador = this.encontrarMetodo('construtor');
        if (inicializador) {
            inicializador
                .definirInstancia(instancia)
                .chamar(interpretador, argumentos);
        }
        return instancia;
    };
    return DeleguaClasse;
}(chamavel_1.Chamavel));
exports.DeleguaClasse = DeleguaClasse;

},{"./chamavel":48,"./objeto-delegua-classe":56}],51:[function(require,module,exports){
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
/**
 * Uma `FuncaoPadrao` normalmente é uma função em JavaScript.
 */
var FuncaoPadrao = /** @class */ (function (_super) {
    __extends(FuncaoPadrao, _super);
    function FuncaoPadrao(valorAridade, funcao) {
        var _this = _super.call(this) || this;
        _this.valorAridade = valorAridade;
        _this.funcao = funcao;
        return _this;
    }
    FuncaoPadrao.prototype.chamar = function (argumentos, simbolo) {
        this.simbolo = simbolo;
        return this.funcao.apply(this, argumentos);
    };
    FuncaoPadrao.prototype.paraTexto = function () {
        return '<função>';
    };
    return FuncaoPadrao;
}(chamavel_1.Chamavel));
exports.FuncaoPadrao = FuncaoPadrao;

},{"./chamavel":48}],52:[function(require,module,exports){
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
var espaco_variaveis_1 = require("../espaco-variaveis");
var quebras_1 = require("../quebras");
var DeleguaFuncao = /** @class */ (function (_super) {
    __extends(DeleguaFuncao, _super);
    function DeleguaFuncao(nome, declaracao, instancia, eInicializador) {
        if (instancia === void 0) { instancia = undefined; }
        if (eInicializador === void 0) { eInicializador = false; }
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.declaracao = declaracao;
        _this.instancia = instancia;
        _this.eInicializador = eInicializador;
        return _this;
    }
    DeleguaFuncao.prototype.aridade = function () {
        var _a, _b;
        return ((_b = (_a = this.declaracao) === null || _a === void 0 ? void 0 : _a.parametros) === null || _b === void 0 ? void 0 : _b.length) || 0;
    };
    DeleguaFuncao.prototype.paraTexto = function () {
        if (this.nome === null)
            return '<função>';
        return "<fun\u00E7\u00E3o ".concat(this.nome, ">");
    };
    DeleguaFuncao.prototype.chamar = function (interpretador, argumentos) {
        var ambiente = new espaco_variaveis_1.EspacoVariaveis();
        var parametros = this.declaracao.parametros;
        if (parametros && parametros.length) {
            for (var i = 0; i < parametros.length; i++) {
                var parametro = parametros[i];
                var nome = parametro['nome'].lexema;
                var valor = argumentos[i];
                if (argumentos[i] === null) {
                    valor = parametro['padrao']
                        ? parametro['padrao'].valor
                        : null;
                }
                ambiente.valores[nome] = valor;
            }
        }
        if (this.instancia !== undefined) {
            ambiente.valores['isto'] = {
                valor: this.instancia,
                tipo: 'objeto',
            };
        }
        var retornoBloco = interpretador.executarBloco(this.declaracao.corpo, ambiente);
        if (retornoBloco instanceof quebras_1.RetornoQuebra) {
            return retornoBloco.valor;
        }
        if (this.eInicializador) {
            return this.instancia;
        }
        return retornoBloco;
    };
    DeleguaFuncao.prototype.definirInstancia = function (instancia) {
        return new DeleguaFuncao(this.nome, this.declaracao, instancia, this.eInicializador);
    };
    return DeleguaFuncao;
}(chamavel_1.Chamavel));
exports.DeleguaFuncao = DeleguaFuncao;

},{"../espaco-variaveis":47,"../quebras":70,"./chamavel":48}],53:[function(require,module,exports){
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
__exportStar(require("./classe-padrao"), exports);
__exportStar(require("./delegua-classe"), exports);
__exportStar(require("./funcao-padrao"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./metodo-primitiva"), exports);
__exportStar(require("./modulo"), exports);
__exportStar(require("./objeto-delegua-classe"), exports);
__exportStar(require("./objeto-padrao"), exports);

},{"./chamavel":48,"./classe-padrao":49,"./delegua-classe":50,"./funcao":52,"./funcao-padrao":51,"./metodo-primitiva":54,"./modulo":55,"./objeto-delegua-classe":56,"./objeto-padrao":57}],54:[function(require,module,exports){
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPrimitiva = void 0;
var chamavel_1 = require("./chamavel");
/**
 * Classe de método de primitiva.
 * Exemplos:
 *
 * - `v.inclui(1)` (`v` é um vetor)
 * - `t.minusculo()` (`t` é um texto)
 *
 * A aridade é sempre a quantidade de argumentos do método menos um porque o
 * primeiro parâmetro é sempre a referência para a primitiva.
 */
var MetodoPrimitiva = /** @class */ (function (_super) {
    __extends(MetodoPrimitiva, _super);
    function MetodoPrimitiva(primitiva, metodo) {
        var _this = _super.call(this) || this;
        _this.primitiva = primitiva;
        _this.metodo = metodo;
        _this.valorAridade = metodo.length - 1;
        return _this;
    }
    MetodoPrimitiva.prototype.chamar = function (argumentos) {
        if (argumentos === void 0) { argumentos = []; }
        return this.metodo.apply(this, __spreadArray([this.primitiva], argumentos, false));
    };
    return MetodoPrimitiva;
}(chamavel_1.Chamavel));
exports.MetodoPrimitiva = MetodoPrimitiva;

},{"./chamavel":48}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaModulo = void 0;
var DeleguaModulo = /** @class */ (function () {
    function DeleguaModulo(nome) {
        this.nome = nome || '';
        this.componentes = {};
    }
    DeleguaModulo.prototype.toString = function () {
        return this.nome ? "<modulo ".concat(this.nome, ">") : '<modulo>';
    };
    return DeleguaModulo;
}());
exports.DeleguaModulo = DeleguaModulo;

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoDeleguaClasse = void 0;
var excecoes_1 = require("../excecoes");
var ObjetoDeleguaClasse = /** @class */ (function () {
    function ObjetoDeleguaClasse(criarClasse) {
        this.classe = criarClasse;
        this.campos = {};
    }
    ObjetoDeleguaClasse.prototype.get = function (simbolo) {
        if (this.campos.hasOwnProperty(simbolo.lexema)) {
            return this.campos[simbolo.lexema];
        }
        var metodo = this.classe.encontrarMetodo(simbolo.lexema);
        if (metodo)
            return metodo.definirInstancia(this);
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, 'Método indefinido não recuperado.');
    };
    ObjetoDeleguaClasse.prototype.set = function (simbolo, valor) {
        this.campos[simbolo.lexema] = valor;
    };
    ObjetoDeleguaClasse.prototype.toString = function () {
        return '<Objeto ' + this.classe.nome + '>';
    };
    return ObjetoDeleguaClasse;
}());
exports.ObjetoDeleguaClasse = ObjetoDeleguaClasse;

},{"../excecoes":59}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoPadrao = void 0;
/**
 * Um objeto padrão é uma instância de uma Classe Padrão (JavaScript).
 */
var ObjetoPadrao = /** @class */ (function () {
    function ObjetoPadrao(classePadrao) {
        this.classePadrao = classePadrao;
    }
    ObjetoPadrao.prototype.paraTexto = function () {
        var retornoTexto = "<objeto-padr\u00E3o da classe ".concat(this.classePadrao, ">\n");
        for (var _i = 0, _a = Object.entries(this); _i < _a.length; _i++) {
            var _b = _a[_i], nome = _b[0], valor = _b[1];
            retornoTexto += "    - ".concat(nome, ": ").concat(valor, "\n");
        }
        retornoTexto += "</objeto-padr\u00E3o>";
        return retornoTexto;
    };
    return ObjetoPadrao;
}());
exports.ObjetoPadrao = ObjetoPadrao;

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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
__exportStar(require("./erro-em-tempo-de-execucao"), exports);

},{"./erro-em-tempo-de-execucao":58}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],62:[function(require,module,exports){
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
__exportStar(require("../interfaces/retornos/retorno-interpretador"), exports);

},{"../interfaces/retornos/retorno-interpretador":60,"./erro-interpretador":61,"./interpretador":64}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferirTipoVariavel = void 0;
function inferirTipoVariavel(variavel) {
    var tipo = typeof variavel;
    switch (tipo) {
        case 'string':
            return 'texto';
        case 'number':
            return 'número';
        case 'bigint':
            return 'longo';
        case 'boolean':
            return 'lógico';
        case 'undefined':
            return 'nulo';
        case 'object':
            if (Array.isArray(variavel))
                return 'vetor';
            if (variavel === null)
                return 'nulo';
            return 'dicionário';
        case 'function':
            return 'função';
        case 'symbol':
            return 'símbolo';
    }
}
exports.inferirTipoVariavel = inferirTipoVariavel;

},{}],64:[function(require,module,exports){
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
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
var espaco_variaveis_1 = require("../espaco-variaveis");
var biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
var importar_biblioteca_1 = __importDefault(require("../bibliotecas/importar-biblioteca"));
var excecoes_1 = require("../excecoes");
var estruturas_1 = require("../estruturas");
var pilha_escopos_execucao_1 = require("./pilha-escopos-execucao");
var quebras_1 = require("../quebras");
var inferenciador_1 = require("./inferenciador");
var primitivas_texto_1 = __importDefault(require("../bibliotecas/primitivas-texto"));
var metodo_primitiva_1 = require("../estruturas/metodo-primitiva");
var primitivas_vetor_1 = __importDefault(require("../bibliotecas/primitivas-vetor"));
/**
 * O Interpretador visita todos os elementos complexos gerados pelo avaliador sintático (_parser_),
 * e de fato executa a lógica de programação descrita no código.
 */
var Interpretador = /** @class */ (function () {
    function Interpretador(importador, diretorioBase, performance, funcaoDeRetorno) {
        if (performance === void 0) { performance = false; }
        this.funcaoDeRetorno = null;
        this.resultadoInterpretador = [];
        this.regexInterpolacao = /\$\{([a-z_][\w]*)\}/gi;
        this.importador = importador;
        this.diretorioBase = diretorioBase;
        this.performance = performance;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.erros = [];
        this.declaracoes = [];
        this.pilhaEscoposExecucao = new pilha_escopos_execucao_1.PilhaEscoposExecucao();
        var escopoExecucao = {
            declaracoes: [],
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        (0, biblioteca_global_1.default)(this, this.pilhaEscoposExecucao);
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao
     */
    Interpretador.prototype.visitarExpressaoLeia = function (expressao) {
        throw new Error('Método não implementado.');
    };
    /**
     * Retira a interpolação de um texto.
     * @param {texto} texto O texto
     * @param {any[]} variaveis A lista de variaveis interpoladas
     * @returns O texto com o valor das variaveis.
     */
    Interpretador.prototype.retirarInterpolacao = function (texto, variaveis) {
        var _this = this;
        var valoresVariaveis = variaveis.map(function (v) { return ({
            valorResolvido: _this.pilhaEscoposExecucao.obterVariavelPorNome(v.variavel),
            variavel: v.variavel,
        }); });
        var textoFinal = texto;
        valoresVariaveis.forEach(function (elemento) {
            var valorFinal = elemento.valorResolvido.hasOwnProperty('valor')
                ? elemento.valorResolvido.valor
                : elemento.valorResolvido;
            textoFinal = textoFinal.replace('${' + elemento.variavel + '}', valorFinal);
        });
        return textoFinal;
    };
    /**
     * Busca variáveis interpoladas.
     * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
     * @returns Uma lista de variáveis interpoladas.
     */
    Interpretador.prototype.buscarVariaveisInterpolacao = function (textoOriginal) {
        var _this = this;
        var variaveis = textoOriginal.match(this.regexInterpolacao);
        return variaveis.map(function (s) {
            var nomeVariavel = s.replace(/[\$\{\}]*/g, '');
            return {
                variavel: nomeVariavel,
                valor: _this.pilhaEscoposExecucao.obterVariavelPorNome(nomeVariavel),
            };
        });
    };
    Interpretador.prototype.visitarExpressaoLiteral = function (expressao) {
        if (this.regexInterpolacao.test(expressao.valor)) {
            var variaveis = this.buscarVariaveisInterpolacao(expressao.valor);
            return this.retirarInterpolacao(expressao.valor, variaveis);
        }
        return expressao.valor;
    };
    Interpretador.prototype.avaliar = function (expressao) {
        return expressao.aceitar(this);
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
            case delegua_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expressao.operador, direita);
                return -direita;
            case delegua_1.default.NEGACAO:
                return !this.eVerdadeiro(direita);
            case delegua_1.default.BIT_NOT:
                return ~direita;
        }
        return null;
    };
    Interpretador.prototype.eIgual = function (esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        if (esquerda.tipo) {
            if (esquerda.tipo === 'nulo' &&
                direita.tipo &&
                direita.tipo === 'nulo')
                return true;
            if (esquerda.tipo === 'nulo')
                return false;
            return esquerda.valor === direita.valor;
        }
        return esquerda === direita;
    };
    /**
     * Verifica se operandos são números, que podem ser tanto variáveis puras do JavaScript
     * (neste caso, `number`), ou podem ser variáveis de Delégua com inferência (`VariavelInterface`).
     * @param operador O símbolo do operador.
     * @param direita O operando direito.
     * @param esquerda O operando esquerdo.
     * @returns Se ambos os operandos são números ou não.
     */
    Interpretador.prototype.verificarOperandosNumeros = function (operador, direita, esquerda) {
        var tipoDireita = direita.tipo
            ? direita.tipo
            : typeof direita === 'number'
                ? 'número'
                : String(NaN);
        var tipoEsquerda = esquerda.tipo
            ? esquerda.tipo
            : typeof esquerda === 'number'
                ? 'número'
                : String(NaN);
        if (tipoDireita === 'número' && tipoEsquerda === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operadores precisam ser números.', operador.linha);
    };
    Interpretador.prototype.visitarExpressaoBinaria = function (expressao) {
        var esquerda = this.avaliar(expressao.esquerda);
        var direita = this.avaliar(expressao.direita);
        var valorEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('valor'))
            ? esquerda.valor
            : esquerda;
        var valorDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('valor'))
            ? direita.valor
            : direita;
        var tipoEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('tipo'))
            ? esquerda.tipo
            : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
        var tipoDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('tipo'))
            ? direita.tipo
            : (0, inferenciador_1.inferirTipoVariavel)(direita);
        switch (expressao.operador.tipo) {
            case delegua_1.default.EXPONENCIACAO:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Math.pow(valorEsquerdo, valorDireito);
            case delegua_1.default.MAIOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) > Number(valorDireito);
            case delegua_1.default.MAIOR_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) >= Number(valorDireito);
            case delegua_1.default.MENOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) < Number(valorDireito);
            case delegua_1.default.MENOR_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) <= Number(valorDireito);
            case delegua_1.default.SUBTRACAO:
            case delegua_1.default.MENOS_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) - Number(valorDireito);
            case delegua_1.default.ADICAO:
            case delegua_1.default.MAIS_IGUAL:
                if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                    return Number(valorEsquerdo) + Number(valorDireito);
                }
                else {
                    return String(valorEsquerdo) + String(valorDireito);
                }
            case delegua_1.default.DIVISAO:
            case delegua_1.default.DIVISAO_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) / Number(valorDireito);
            case delegua_1.default.MULTIPLICACAO:
            case delegua_1.default.MULTIPLICACAO_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) * Number(valorDireito);
            case delegua_1.default.MODULO:
            case delegua_1.default.MODULO_IGUAL:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) % Number(valorDireito);
            case delegua_1.default.BIT_AND:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) & Number(valorDireito);
            case delegua_1.default.BIT_XOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) ^ Number(valorDireito);
            case delegua_1.default.BIT_OR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) | Number(valorDireito);
            case delegua_1.default.MENOR_MENOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) << Number(valorDireito);
            case delegua_1.default.MAIOR_MAIOR:
                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) >> Number(valorDireito);
            case delegua_1.default.DIFERENTE:
                return !this.eIgual(valorEsquerdo, valorDireito);
            case delegua_1.default.IGUAL_IGUAL:
                return this.eIgual(valorEsquerdo, valorDireito);
        }
    };
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    Interpretador.prototype.visitarExpressaoDeChamada = function (expressao) {
        var variavelEntidadeChamada = this.avaliar(expressao.entidadeChamada);
        var entidadeChamada = variavelEntidadeChamada.hasOwnProperty('valor')
            ? variavelEntidadeChamada.valor
            : variavelEntidadeChamada;
        var argumentos = [];
        for (var i = 0; i < expressao.argumentos.length; i++) {
            argumentos.push(this.avaliar(expressao.argumentos[i]));
        }
        if (!(entidadeChamada instanceof estruturas_1.Chamavel)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha);
        }
        if (entidadeChamada instanceof metodo_primitiva_1.MetodoPrimitiva) {
            var argumentosResolvidos = [];
            for (var _i = 0, _a = expressao.argumentos; _i < _a.length; _i++) {
                var argumento = _a[_i];
                var valorResolvido = this.avaliar(argumento);
                argumentosResolvidos.push(valorResolvido.hasOwnProperty('valor')
                    ? valorResolvido.valor
                    : valorResolvido);
            }
            return entidadeChamada.chamar(argumentosResolvidos);
        }
        var parametros;
        if (entidadeChamada instanceof estruturas_1.DeleguaFuncao) {
            parametros = entidadeChamada.declaracao.parametros;
        }
        else if (entidadeChamada instanceof estruturas_1.DeleguaClasse) {
            parametros = entidadeChamada.metodos.inicializacao
                ? entidadeChamada.metodos.inicializacao.declaracao.parametros
                : [];
        }
        else {
            parametros = [];
        }
        // Completar os parâmetros não preenchidos com nulos.
        if (argumentos.length < entidadeChamada.aridade()) {
            var diferenca = entidadeChamada.aridade() - argumentos.length;
            for (var i = 0; i < diferenca; i++) {
                argumentos.push(null);
            }
        }
        else {
            if (parametros &&
                parametros.length > 0 &&
                parametros[parametros.length - 1].tipo === 'estrela') {
                var novosArgumentos = argumentos.slice(0, parametros.length - 1);
                novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                argumentos = novosArgumentos;
            }
        }
        if (entidadeChamada instanceof estruturas_1.FuncaoPadrao) {
            try {
                return entidadeChamada.chamar(argumentos, expressao.entidadeChamada.nome);
            }
            catch (erro) {
                this.erros.push(erro);
            }
        }
        return entidadeChamada.chamar(this, argumentos);
    };
    /**
     * Execução de uma expressão de atribuição.
     * @param expressao A expressão.
     * @returns O valor atribuído.
     */
    Interpretador.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
        var valor = this.avaliar(expressao.valor);
        this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
        return valor;
    };
    Interpretador.prototype.procurarVariavel = function (simbolo) {
        return this.pilhaEscoposExecucao.obterVariavel(simbolo);
    };
    Interpretador.prototype.visitarExpressaoDeVariavel = function (expressao) {
        return this.procurarVariavel(expressao.simbolo);
    };
    Interpretador.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        return this.avaliar(declaracao.expressao);
    };
    Interpretador.prototype.visitarExpressaoLogica = function (expressao) {
        var esquerda = this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === delegua_1.default.EM) {
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
        if (expressao.operador.tipo === delegua_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expressao.operador.tipo === delegua_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return this.avaliar(expressao.direita);
    };
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    Interpretador.prototype.visitarExpressaoSe = function (declaracao) {
        if (this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
            return this.executar(declaracao.caminhoEntao);
        }
        for (var i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            var atual = declaracao.caminhosSeSenao[i];
            if (this.eVerdadeiro(this.avaliar(atual.condicao))) {
                return this.executar(atual.caminho);
            }
        }
        if (declaracao.caminhoSenao !== null) {
            return this.executar(declaracao.caminhoSenao);
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoPara = function (declaracao) {
        if (declaracao.inicializador !== null) {
            this.avaliar(declaracao.inicializador);
        }
        var retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra)) {
            if (declaracao.condicao !== null &&
                !this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
                break;
            }
            try {
                retornoExecucao = this.executar(declaracao.corpo);
            }
            catch (erro) {
                throw erro;
            }
            if (declaracao.incrementar !== null) {
                this.avaliar(declaracao.incrementar);
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoFazer = function (declaracao) {
        var retornoExecucao;
        do {
            try {
                retornoExecucao = this.executar(declaracao.caminhoFazer);
            }
            catch (erro) {
                throw erro;
            }
        } while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            this.eVerdadeiro(this.avaliar(declaracao.condicaoEnquanto)));
    };
    Interpretador.prototype.visitarExpressaoEscolha = function (declaracao) {
        var condicaoEscolha = this.avaliar(declaracao.identificadorOuLiteral);
        var caminhos = declaracao.caminhos;
        var caminhoPadrao = declaracao.caminhoPadrao;
        var encontrado = false;
        try {
            for (var i = 0; i < caminhos.length; i++) {
                var caminho_1 = caminhos[i];
                for (var j = 0; j < caminho_1.condicoes.length; j++) {
                    if (this.avaliar(caminho_1.condicoes[j]) === condicaoEscolha) {
                        encontrado = true;
                        try {
                            this.executarBloco(caminho_1.declaracoes);
                        }
                        catch (erro) {
                            throw erro;
                        }
                    }
                }
            }
            if (caminhoPadrao !== null && encontrado === false) {
                this.executarBloco(caminhoPadrao.declaracoes);
            }
        }
        catch (erro) {
            throw erro;
        }
    };
    Interpretador.prototype.visitarExpressaoTente = function (declaracao) {
        try {
            var sucesso = true;
            try {
                this.executarBloco(declaracao.caminhoTente);
            }
            catch (erro) {
                sucesso = false;
                if (declaracao.caminhoPegue !== null) {
                    this.executarBloco(declaracao.caminhoPegue);
                }
                else {
                    this.erros.push(erro);
                }
            }
            if (sucesso && declaracao.caminhoSenao !== null) {
                this.executarBloco(declaracao.caminhoSenao);
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                this.executarBloco(declaracao.caminhoFinalmente);
        }
    };
    Interpretador.prototype.visitarExpressaoEnquanto = function (declaracao) {
        var retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            this.eVerdadeiro(this.avaliar(declaracao.condicao))) {
            try {
                retornoExecucao = this.executar(declaracao.corpo);
            }
            catch (erro) {
                throw erro;
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoImportar = function (declaracao) {
        var caminhoRelativo = this.avaliar(declaracao.caminho);
        var caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        var nomeArquivo = caminho.basename(caminhoTotal);
        if (!caminhoTotal.endsWith('.egua') &&
            !caminhoTotal.endsWith('.delegua')) {
            try {
                return (0, importar_biblioteca_1.default)(caminhoRelativo);
            }
            catch (erro) {
                this.erros.push(erro);
                return null;
            }
        }
        var conteudoImportacao = this.importador.importar(caminhoRelativo);
        var retornoInterpretador = this.interpretar(conteudoImportacao.retornoAvaliadorSintatico.declaracoes, true);
        var funcoesChamaveis = this.pilhaEscoposExecucao.obterTodasDeleguaFuncao();
        var eDicionario = function (objeto) { return objeto.constructor === Object; };
        if (eDicionario(funcoesChamaveis)) {
            var novoModulo = new estruturas_1.DeleguaModulo();
            var chaves = Object.keys(funcoesChamaveis);
            for (var i = 0; i < chaves.length; i++) {
                novoModulo.componentes[chaves[i]] = funcoesChamaveis[chaves[i]];
            }
            return novoModulo;
        }
        return funcoesChamaveis;
    };
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    Interpretador.prototype.visitarExpressaoEscreva = function (declaracao) {
        try {
            var valor = void 0;
            for (var _i = 0, _a = declaracao.argumentos; _i < _a.length; _i++) {
                var argumento = _a[_i];
                var resultadoAvaliacao = this.avaliar(argumento);
                valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor'))
                    ? resultadoAvaliacao.valor
                    : resultadoAvaliacao;
            }
            var formatoTexto = this.paraTexto(valor);
            // Por enquanto `escreva` não devolve resultado no interpretador.
            // this.resultadoInterpretador.push(formatoTexto);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push(erro);
        }
    };
    /**
     * Empilha declarações na pilha de escopos de execução, cria um novo ambiente e
     * executa as declarações empilhadas.
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos tente ... pegue ... finalmente.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    Interpretador.prototype.executarBloco = function (declaracoes, ambiente) {
        var escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: ambiente || new espaco_variaveis_1.EspacoVariaveis(),
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        var retornoUltimoEscopo = this.executarUltimoEscopo();
        if (retornoUltimoEscopo instanceof excecoes_1.ErroEmTempoDeExecucao) {
            throw retornoUltimoEscopo;
        }
        return retornoUltimoEscopo;
    };
    Interpretador.prototype.visitarExpressaoBloco = function (declaracao) {
        return this.executarBloco(declaracao.declaracoes);
    };
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    Interpretador.prototype.visitarExpressaoVar = function (declaracao) {
        var valorOuOutraVariavel = null;
        if (declaracao.inicializador !== null) {
            valorOuOutraVariavel = this.avaliar(declaracao.inicializador);
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorOuOutraVariavel.hasOwnProperty('valor')
            ? valorOuOutraVariavel.valor
            : valorOuOutraVariavel);
        return null;
    };
    Interpretador.prototype.visitarExpressaoContinua = function (declaracao) {
        return new quebras_1.ContinuarQuebra();
    };
    Interpretador.prototype.visitarExpressaoSustar = function (declaracao) {
        return new quebras_1.SustarQuebra();
    };
    Interpretador.prototype.visitarExpressaoRetornar = function (declaracao) {
        var valor = null;
        if (declaracao.valor != null)
            valor = this.avaliar(declaracao.valor);
        return new quebras_1.RetornoQuebra(valor);
    };
    Interpretador.prototype.visitarExpressaoDeleguaFuncao = function (expressao) {
        return new estruturas_1.DeleguaFuncao(null, expressao);
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
            objeto instanceof estruturas_1.ObjetoDeleguaClasse ||
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
        var variavelObjeto = this.avaliar(expressao.entidadeChamada);
        var objeto = variavelObjeto.hasOwnProperty('valor')
            ? variavelObjeto.valor
            : variavelObjeto;
        var indice = this.avaliar(expressao.indice);
        var valorIndice = indice.hasOwnProperty('valor') ? indice.valor : indice;
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(valorIndice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha);
            }
            return objeto[valorIndice];
        }
        else if (objeto.constructor === Object ||
            objeto instanceof estruturas_1.ObjetoDeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaFuncao ||
            objeto instanceof estruturas_1.DeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto[valorIndice] || null;
        }
        else if (typeof objeto === 'string') {
            if (!Number.isInteger(valorIndice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha);
            }
            return objeto.charAt(valorIndice);
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    };
    Interpretador.prototype.visitarExpressaoDefinir = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        if (!(objeto instanceof estruturas_1.ObjetoDeleguaClasse) &&
            objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha);
        }
        var valor = this.avaliar(expressao.valor);
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            objeto.set(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    };
    Interpretador.prototype.visitarExpressaoFuncao = function (declaracao) {
        var funcao = new estruturas_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao);
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, funcao);
    };
    /**
     * Executa uma declaração de classe.
     * @param declaracao A declaração de classe.
     * @returns Sempre retorna nulo, por ser requerido pelo contrato de visita.
     */
    Interpretador.prototype.visitarExpressaoClasse = function (declaracao) {
        var superClasse = null;
        if (declaracao.superClasse !== null) {
            var variavelSuperClasse = this.avaliar(declaracao.superClasse);
            superClasse = variavelSuperClasse.valor;
            if (!(superClasse instanceof estruturas_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'SuperClasse precisa ser uma classe.', declaracao.linha);
            }
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, null);
        if (declaracao.superClasse !== null) {
            this.pilhaEscoposExecucao.definirVariavel('super', superClasse);
        }
        var metodos = {};
        var definirMetodos = declaracao.metodos;
        for (var i = 0; i < declaracao.metodos.length; i++) {
            var metodoAtual = definirMetodos[i];
            var eInicializador = metodoAtual.simbolo.lexema === 'construtor';
            var funcao = new estruturas_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, undefined, eInicializador);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        var deleguaClasse = new estruturas_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
        // TODO: Recolocar isso se for necessário.
        /* if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        } */
        this.pilhaEscoposExecucao.atribuirVariavel(declaracao.simbolo, deleguaClasse);
        return null;
    };
    /**
     * Executa um acesso a método, normalmente de um objeto de classe.
     * @param expressao A expressão de acesso.
     * @returns O resultado da execução.
     */
    Interpretador.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        var variavelObjeto = this.avaliar(expressao.objeto);
        var objeto = variavelObjeto === null || variavelObjeto === void 0 ? void 0 : variavelObjeto.valor;
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            return objeto.get(expressao.simbolo) || null;
        }
        if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        if (objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto.componentes[expressao.simbolo.lexema] || null;
        }
        switch (variavelObjeto.tipo) {
            case 'texto':
                var metodoDePrimitivaTexto = primitivas_texto_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaTexto) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaTexto);
                }
                break;
            case 'vetor':
                var metodoDePrimitivaVetor = primitivas_vetor_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaVetor) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaVetor);
                }
                break;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha);
    };
    Interpretador.prototype.visitarExpressaoIsto = function (expressao) {
        return this.procurarVariavel(expressao.palavraChave);
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
    // TODO: Após remoção do Resolvedor, simular casos que usem 'super' e 'isto'.
    Interpretador.prototype.visitarExpressaoSuper = function (expressao) {
        var superClasse = this.pilhaEscoposExecucao.obterVariavelPorNome('super');
        var objeto = this.pilhaEscoposExecucao.obterVariavelPorNome('isto');
        var metodo = superClasse.valor.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        return metodo.definirInstancia(objeto.valor);
    };
    Interpretador.prototype.paraTexto = function (objeto) {
        if (objeto === null || objeto === undefined)
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
        if (objeto.valor instanceof estruturas_1.ObjetoPadrao)
            return objeto.valor.paraTexto();
        if (typeof objeto === 'object')
            return JSON.stringify(objeto);
        return objeto.toString();
    };
    /**
     * Efetivamente executa uma declaração.
     * @param declaracao A declaração a ser executada.
     * @param mostrarResultado Se resultado deve ser mostrado ou não. Normalmente usado
     *                         pelo modo LAIR.
     */
    Interpretador.prototype.executar = function (declaracao, mostrarResultado) {
        if (mostrarResultado === void 0) { mostrarResultado = false; }
        var resultado = declaracao.aceitar(this);
        if (mostrarResultado) {
            this.funcaoDeRetorno(this.paraTexto(resultado));
        }
        if (resultado || typeof resultado === 'boolean') {
            this.resultadoInterpretador.push(this.paraTexto(resultado));
        }
        return resultado;
    };
    /**
     * Executa o último escopo empilhado no topo na pilha de escopos do interpretador.
     * Esse método pega exceções, mas apenas as devolve.
     *
     * O tratamento das exceções é feito de acordo com o bloco chamador.
     * Por exemplo, em `tente ... pegue ... finalmente`, a exceção é capturada e tratada.
     * Em outros blocos, pode ser desejável ter o erro em tela.
     * @param manterAmbiente Se verdadeiro, ambiente do topo da pilha de escopo é copiado para o ambiente imediatamente abaixo.
     * @returns O resultado da execução do escopo, se houver.
     */
    Interpretador.prototype.executarUltimoEscopo = function (manterAmbiente) {
        if (manterAmbiente === void 0) { manterAmbiente = false; }
        var ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        try {
            var retornoExecucao = void 0;
            for (; !(retornoExecucao instanceof quebras_1.Quebra) &&
                ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length; ultimoEscopo.declaracaoAtual++) {
                retornoExecucao = this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
            }
            return retornoExecucao;
        }
        catch (erro) {
            return erro;
        }
        finally {
            this.pilhaEscoposExecucao.removerUltimo();
            if (manterAmbiente) {
                var escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
            }
        }
    };
    /**
     * Interpretação sem depurador, com medição de performance.
     * Método que efetivamente inicia o processo de interpretação.
     * @param declaracoes Um vetor de declarações gerado pelo Avaliador Sintático.
     * @param manterAmbiente Se ambiente de execução (variáveis, classes, etc.) deve ser mantido. Normalmente usado
     *                       pelo modo REPL (LEIA).
     * @returns Um objeto com o resultado da interpretação.
     */
    Interpretador.prototype.interpretar = function (declaracoes, manterAmbiente) {
        if (manterAmbiente === void 0) { manterAmbiente = false; }
        this.erros = [];
        var escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        var inicioInterpretacao = (0, browser_process_hrtime_1.default)();
        try {
            this.executarUltimoEscopo(manterAmbiente);
        }
        finally {
            if (this.performance) {
                var deltaInterpretacao = (0, browser_process_hrtime_1.default)(inicioInterpretacao);
                console.log("[Interpretador] Tempo para interpreta\u00E7ao: ".concat(deltaInterpretacao[0] * 1e9 + deltaInterpretacao[1], "ns"));
            }
            var retorno = {
                erros: this.erros,
                resultado: this.resultadoInterpretador,
            };
            this.resultadoInterpretador = [];
            return retorno;
        }
    };
    return Interpretador;
}());
exports.Interpretador = Interpretador;

},{"../bibliotecas/biblioteca-global":5,"../bibliotecas/importar-biblioteca":6,"../bibliotecas/primitivas-texto":7,"../bibliotecas/primitivas-vetor":8,"../espaco-variaveis":47,"../estruturas":53,"../estruturas/metodo-primitiva":54,"../excecoes":59,"../quebras":70,"../tipos-de-simbolos/delegua":71,"./inferenciador":63,"./pilha-escopos-execucao":65,"browser-process-hrtime":72,"path":74}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaEscoposExecucao = void 0;
var estruturas_1 = require("../estruturas");
var excecoes_1 = require("../excecoes");
var lexador_1 = require("../lexador");
var inferenciador_1 = require("./inferenciador");
var PilhaEscoposExecucao = /** @class */ (function () {
    function PilhaEscoposExecucao() {
        this.pilha = [];
    }
    PilhaEscoposExecucao.prototype.empilhar = function (item) {
        this.pilha.push(item);
    };
    PilhaEscoposExecucao.prototype.eVazio = function () {
        return this.pilha.length === 0;
    };
    PilhaEscoposExecucao.prototype.elementos = function () {
        return this.pilha.length;
    };
    PilhaEscoposExecucao.prototype.naPosicao = function (posicao) {
        return this.pilha[posicao];
    };
    PilhaEscoposExecucao.prototype.topoDaPilha = function () {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha[this.pilha.length - 1];
    };
    PilhaEscoposExecucao.prototype.removerUltimo = function () {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha.pop();
    };
    PilhaEscoposExecucao.prototype.definirVariavel = function (nomeVariavel, valor) {
        this.pilha[this.pilha.length - 1].ambiente.valores[nomeVariavel] = {
            valor: valor,
            tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
        };
    };
    PilhaEscoposExecucao.prototype.atribuirVariavelEm = function (distancia, simbolo, valor) {
        var ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        ambienteAncestral.valores[simbolo.lexema] = {
            valor: valor,
            tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
        };
    };
    PilhaEscoposExecucao.prototype.atribuirVariavel = function (simbolo, valor) {
        for (var i = 1; i <= this.pilha.length; i++) {
            var ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                ambiente.valores[simbolo.lexema] = {
                    valor: valor,
                    tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
                };
                return;
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    };
    PilhaEscoposExecucao.prototype.obterVariavelEm = function (distancia, nome) {
        var ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        return ambienteAncestral.valores[nome];
    };
    PilhaEscoposExecucao.prototype.obterVariavel = function (simbolo) {
        for (var i = 1; i <= this.pilha.length; i++) {
            var ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                return ambiente.valores[simbolo.lexema];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida: '" + simbolo.lexema + "'.");
    };
    PilhaEscoposExecucao.prototype.obterVariavelPorNome = function (nome) {
        for (var i = 1; i <= this.pilha.length; i++) {
            var ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[nome] !== undefined) {
                return ambiente.valores[nome];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(new lexador_1.Simbolo('especial', nome, nome, -1, -1), "Variável não definida: '" + nome + "'.");
    };
    /**
     * Método usado pelo depurador para obter todas as variáveis definidas.
     */
    PilhaEscoposExecucao.prototype.obterTodasVariaveis = function (todasVariaveis) {
        if (todasVariaveis === void 0) { todasVariaveis = []; }
        for (var i = 1; i <= this.pilha.length; i++) {
            var ambiente = this.pilha[this.pilha.length - i].ambiente;
            // TODO: Testar se isso faz sentido.
            var vetorObjeto = Object.entries(ambiente).map(function (chave, valor) {
                return ({ valor: valor, tipo: 'texto' });
            });
            todasVariaveis.concat(vetorObjeto);
        }
        return todasVariaveis;
    };
    /**
     * Obtém todas as funções declaradas ou por código-fonte, ou pelo desenvolvedor
     * em console.
     */
    PilhaEscoposExecucao.prototype.obterTodasDeleguaFuncao = function () {
        var retorno = {};
        var ambiente = this.pilha[this.pilha.length - 1].ambiente;
        for (var _i = 0, _a = Object.entries(ambiente.valores); _i < _a.length; _i++) {
            var _b = _a[_i], nome = _b[0], corpo = _b[1];
            if (corpo instanceof estruturas_1.DeleguaFuncao) {
                retorno[nome] = corpo;
            }
        }
        return retorno;
    };
    return PilhaEscoposExecucao;
}());
exports.PilhaEscoposExecucao = PilhaEscoposExecucao;

},{"../estruturas":53,"../excecoes":59,"../lexador":66,"./inferenciador":63}],66:[function(require,module,exports){
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

},{"./lexador":67,"./simbolo":69}],67:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexador = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
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
        this.hashArquivo = -1;
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
        if (this.codigo.length === this.linha) {
            return true;
        }
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
        return (this.eUltimaLinha() &&
            this.codigo[this.codigo.length - 1].length <= this.atual);
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
        this.simbolos.push(new simbolo_1.Simbolo(tipo, literal || texto, literal, this.linha + 1, this.hashArquivo));
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
                mensagem: 'Texto não finalizado.',
            });
            return;
        }
        var valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(delegua_1.default.TEXTO, valor);
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
        this.adicionarSimbolo(delegua_1.default.NUMERO, parseFloat(numeroCompleto));
    };
    Lexador.prototype.identificarPalavraChave = function () {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        var codigo = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        var tipo = codigo in palavras_reservadas_1.default
            ? palavras_reservadas_1.default[codigo]
            : delegua_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    };
    Lexador.prototype.encontrarFimComentarioAsterisco = function () {
        while (!this.eFinalDoCodigo()) {
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
                this.adicionarSimbolo(delegua_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(delegua_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(delegua_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(delegua_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '{':
                this.adicionarSimbolo(delegua_1.default.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(delegua_1.default.CHAVE_DIREITA);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(delegua_1.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(delegua_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.MENOS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.SUBTRACAO);
                }
                break;
            case '+':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.MAIS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.ADICAO);
                }
                break;
            case ':':
                this.adicionarSimbolo(delegua_1.default.DOIS_PONTOS);
                this.avancar();
                break;
            case '%':
                this.inicioSimbolo = this.atual;
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.avancar();
                        this.adicionarSimbolo(delegua_1.default.MODULO_IGUAL);
                        break;
                    default:
                        this.adicionarSimbolo(delegua_1.default.MODULO);
                        break;
                }
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                switch (this.simboloAtual()) {
                    case '*':
                        this.avancar();
                        this.adicionarSimbolo(delegua_1.default.EXPONENCIACAO);
                        break;
                    case '=':
                        this.avancar();
                        this.adicionarSimbolo(delegua_1.default.MULTIPLICACAO_IGUAL);
                        break;
                    default:
                        this.adicionarSimbolo(delegua_1.default.MULTIPLICACAO);
                        break;
                }
                break;
            case '!':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.DIFERENTE);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.NEGACAO);
                }
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.IGUAL);
                }
                break;
            case '&':
                this.adicionarSimbolo(delegua_1.default.BIT_AND);
                this.avancar();
                break;
            case '~':
                this.adicionarSimbolo(delegua_1.default.BIT_NOT);
                this.avancar();
                break;
            case '|':
                this.adicionarSimbolo(delegua_1.default.BIT_OR);
                this.avancar();
                break;
            case '^':
                this.adicionarSimbolo(delegua_1.default.BIT_XOR);
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.MENOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '<') {
                    this.adicionarSimbolo(delegua_1.default.MENOR_MENOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(delegua_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '>') {
                    this.adicionarSimbolo(delegua_1.default.MAIOR_MAIOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.MAIOR);
                }
                break;
            case '/':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '/':
                        this.avancarParaProximaLinha();
                        break;
                    case '*':
                        this.encontrarFimComentarioAsterisco();
                        break;
                    case '=':
                        this.adicionarSimbolo(delegua_1.default.DIVISAO_IGUAL);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(delegua_1.default.DIVISAO);
                        break;
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
                        mensagem: 'Caractere inesperado.',
                    });
                    this.avancar();
                }
        }
    };
    Lexador.prototype.mapear = function (codigo, hashArquivo) {
        var inicioMapeamento = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.hashArquivo = hashArquivo;
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        if (this.performance) {
            var deltaMapeamento = (0, browser_process_hrtime_1.default)(inicioMapeamento);
            console.log("[Lexador] Tempo para mapeamento: ".concat(deltaMapeamento[0] * 1e9 + deltaMapeamento[1], "ns"));
        }
        return {
            simbolos: this.simbolos,
            erros: this.erros,
        };
    };
    return Lexador;
}());
exports.Lexador = Lexador;

},{"../tipos-de-simbolos/delegua":71,"./palavras-reservadas":68,"./simbolo":69,"browser-process-hrtime":72}],68:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
exports.default = {
    e: delegua_1.default.E,
    em: delegua_1.default.EM,
    classe: delegua_1.default.CLASSE,
    senao: delegua_1.default.SENAO,
    senão: delegua_1.default.SENÃO,
    falso: delegua_1.default.FALSO,
    para: delegua_1.default.PARA,
    funcao: delegua_1.default.FUNCAO,
    função: delegua_1.default.FUNÇÃO,
    se: delegua_1.default.SE,
    senaose: delegua_1.default.SENAOSE,
    senãose: delegua_1.default.SENÃOSE,
    nulo: delegua_1.default.NULO,
    ou: delegua_1.default.OU,
    escreva: delegua_1.default.ESCREVA,
    retorna: delegua_1.default.RETORNA,
    super: delegua_1.default.SUPER,
    isto: delegua_1.default.ISTO,
    verdadeiro: delegua_1.default.VERDADEIRO,
    var: delegua_1.default.VARIAVEL,
    fazer: delegua_1.default.FAZER,
    enquanto: delegua_1.default.ENQUANTO,
    pausa: delegua_1.default.PAUSA,
    continua: delegua_1.default.CONTINUA,
    escolha: delegua_1.default.ESCOLHA,
    caso: delegua_1.default.CASO,
    padrao: delegua_1.default.PADRAO,
    importar: delegua_1.default.IMPORTAR,
    tente: delegua_1.default.TENTE,
    pegue: delegua_1.default.PEGUE,
    finalmente: delegua_1.default.FINALMENTE,
    herda: delegua_1.default.HERDA,
};

},{"../tipos-de-simbolos/delegua":71}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, lexema, literal, linha, hashArquivo) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.literal = literal;
        this.linha = linha;
        this.hashArquivo = hashArquivo;
    }
    Simbolo.prototype.paraTexto = function () {
        return this.tipo + ' ' + this.lexema + ' ' + this.literal;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;

},{}],70:[function(require,module,exports){
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
exports.ContinuarQuebra = exports.SustarQuebra = exports.RetornoQuebra = exports.Quebra = void 0;
var Quebra = /** @class */ (function () {
    function Quebra() {
    }
    return Quebra;
}());
exports.Quebra = Quebra;
var RetornoQuebra = /** @class */ (function (_super) {
    __extends(RetornoQuebra, _super);
    function RetornoQuebra(valor) {
        var _this = _super.call(this) || this;
        _this.valor = valor;
        return _this;
    }
    return RetornoQuebra;
}(Quebra));
exports.RetornoQuebra = RetornoQuebra;
var SustarQuebra = /** @class */ (function (_super) {
    __extends(SustarQuebra, _super);
    function SustarQuebra() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SustarQuebra;
}(Quebra));
exports.SustarQuebra = SustarQuebra;
var ContinuarQuebra = /** @class */ (function (_super) {
    __extends(ContinuarQuebra, _super);
    function ContinuarQuebra() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContinuarQuebra;
}(Quebra));
exports.ContinuarQuebra = ContinuarQuebra;

},{}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ADICAO: 'ADICAO',
    BIT_AND: 'BIT_AND',
    BIT_OR: 'BIT_OR',
    BIT_XOR: 'BIT_XOR',
    BIT_NOT: 'BIT_NOT',
    CASO: 'CASO',
    CHAVE_DIREITA: 'CHAVE_DIREITA',
    CHAVE_ESQUERDA: 'CHAVE_ESQUERDA',
    CLASSE: 'CLASSE',
    COLCHETE_DIREITO: 'COLCHETE_DIREITO',
    COLCHETE_ESQUERDO: 'COLCHETE_ESQUERDO',
    VIRGULA: 'VIRGULA',
    CONTINUA: 'CONTINUA',
    DIFERENTE: 'DIFERENTE',
    DIVISAO: 'DIVISAO',
    DIVISAO_IGUAL: 'DIVISAO_IGUAL',
    DOIS_PONTOS: 'DOIS_PONTOS',
    E: 'E',
    EM: 'EM',
    ENQUANTO: 'ENQUANTO',
    EOF: 'EOF',
    ESCOLHA: 'ESCOLHA',
    ESCREVA: 'ESCREVA',
    EXPONENCIACAO: 'EXPONENCIACAO',
    IGUAL: 'IGUAL',
    IGUAL_IGUAL: 'IGUAL_IGUAL',
    FALSO: 'FALSO',
    FAZER: 'FAZER',
    FINALMENTE: 'FINALMENTE',
    FUNCAO: 'FUNCAO',
    FUNÇÃO: 'FUNÇÃO',
    HERDA: 'HERDA',
    IDENTIFICADOR: 'IDENTIFICADOR',
    IMPORTAR: 'IMPORTAR',
    ISTO: 'ISTO',
    MAIOR: 'MAIOR',
    MAIOR_IGUAL: 'MAIOR_IGUAL',
    MAIOR_MAIOR: 'MAIOR_MAIOR',
    MAIS_IGUAL: 'MAIS_IGUAL',
    MENOR: 'MENOR',
    MENOS_IGUAL: 'MENOS_IGUAL',
    MENOR_IGUAL: 'MENOR_IGUAL',
    MENOR_MENOR: 'MENOR_MENOR',
    MODULO: 'MODULO',
    MODULO_IGUAL: 'MODULO_IGUAL',
    MULTIPLICACAO: 'MULTIPLICACAO',
    MULTIPLICACAO_IGUAL: 'MULTIPLICACAO_IGUAL',
    NEGACAO: 'NEGACAO',
    NULO: 'NULO',
    NUMERO: 'NUMERO',
    OU: 'OU',
    PADRAO: 'PADRAO',
    PADRÃO: 'PADRÃO',
    PARA: 'PARA',
    PARENTESE_DIREITO: 'PARENTESE_DIREITO',
    PARENTESE_ESQUERDO: 'PARENTESE_ESQUERDO',
    PAUSA: 'PAUSA',
    PEGUE: 'PEGUE',
    PONTO: 'PONTO',
    PONTO_E_VIRGULA: 'PONTO_E_VIRGULA',
    RETORNA: 'RETORNA',
    SUBTRACAO: 'SUBTRACAO',
    SE: 'SE',
    SENAO: 'SENAO',
    SENÃO: 'SENÃO',
    SENAOSE: 'SENAOSE',
    SENÃOSE: 'SENÃOSE',
    SUPER: 'SUPER',
    SUSTAR: 'SUSTAR',
    TENTE: 'TENTE',
    TEXTO: 'TEXTO',
    VARIAVEL: 'VARIAVEL',
    VERDADEIRO: 'VERDADEIRO',
};

},{}],72:[function(require,module,exports){
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
},{"_process":75}],73:[function(require,module,exports){

},{}],74:[function(require,module,exports){
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
},{"_process":75}],75:[function(require,module,exports){
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
