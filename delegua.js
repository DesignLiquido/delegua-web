(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Delegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){(function (){
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

}).call(this)}).call(this,require('_process'))
},{"@designliquido/delegua/fontes/avaliador-sintatico":8,"@designliquido/delegua/fontes/interpretador":62,"@designliquido/delegua/fontes/lexador":66,"@designliquido/delegua/fontes/resolvedor":73,"@designliquido/delegua/fontes/tipos-de-simbolos":75,"_process":87}],2:[function(require,module,exports){
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

},{"./estruturas":53,"./excecoes":60}],3:[function(require,module,exports){
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
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(tipo, "."));
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
        return new construtos_1.Funcao(0, parametros, corpo);
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

},{"../construtos":22,"../declaracoes":41,"../tipos-de-simbolos":75,"./erro-avaliador-sintatico":7,"browser-process-hrtime":77}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoEguaClassico = void 0;
var tipos_de_simbolos_1 = __importDefault(require("../../lexador/tipos-de-simbolos"));
var construtos_1 = require("../../construtos");
var erro_avaliador_sintatico_1 = require("../erro-avaliador-sintatico");
var declaracoes_1 = require("../../declaracoes");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 */
var AvaliadorSintaticoEguaClassico = /** @class */ (function () {
    function AvaliadorSintaticoEguaClassico(simbolos) {
        this.simbolos = simbolos;
        this.atual = 0;
        this.ciclos = 0;
    }
    AvaliadorSintaticoEguaClassico.prototype.sincronizar = function () {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            if (this.simboloAnterior().tipo === tipos_de_simbolos_1.default.PONTO_E_VIRGULA)
                return;
            switch (this.simboloAtual().tipo) {
                case tipos_de_simbolos_1.default.CLASSE:
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
    AvaliadorSintaticoEguaClassico.prototype.erro = function (simbolo, mensagemDeErro) {
        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    };
    AvaliadorSintaticoEguaClassico.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        else
            throw this.erro(this.simboloAtual(), mensagemDeErro);
    };
    AvaliadorSintaticoEguaClassico.prototype.verificarTipoSimboloAtual = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    };
    AvaliadorSintaticoEguaClassico.prototype.verificarTipoProximoSimbolo = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    AvaliadorSintaticoEguaClassico.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    AvaliadorSintaticoEguaClassico.prototype.simboloAnterior = function () {
        return this.simbolos[this.atual - 1];
    };
    AvaliadorSintaticoEguaClassico.prototype.simboloNaPosicao = function (posicao) {
        return this.simbolos[this.atual + posicao];
    };
    AvaliadorSintaticoEguaClassico.prototype.estaNoFinal = function () {
        return this.simboloAtual().tipo === tipos_de_simbolos_1.default.EOF;
    };
    AvaliadorSintaticoEguaClassico.prototype.avancarEDevolverAnterior = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simboloAnterior();
    };
    AvaliadorSintaticoEguaClassico.prototype.verificarSeSimboloAtualEIgualA = function () {
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
    AvaliadorSintaticoEguaClassico.prototype.primario = function () {
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
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FALSO))
            return new construtos_1.Literal(0, false);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.VERDADEIRO))
            return new construtos_1.Literal(0, true);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NULO))
            return new construtos_1.Literal(0, null);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.ISTO))
            return new construtos_1.Isto(this.simboloAnterior());
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NUMERO, tipos_de_simbolos_1.default.TEXTO)) {
            return new construtos_1.Literal(0, this.simboloAnterior().literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.simboloAnterior());
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO)) {
            var expressao = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(0, expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), 'Esperado expressão.');
    };
    AvaliadorSintaticoEguaClassico.prototype.finalizarChamada = function (entidadeChamada) {
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
    AvaliadorSintaticoEguaClassico.prototype.chamar = function () {
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
    AvaliadorSintaticoEguaClassico.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.NEGACAO, tipos_de_simbolos_1.default.SUBTRACAO, tipos_de_simbolos_1.default.BIT_NOT)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            return new construtos_1.Unario(operador, direito);
        }
        return this.chamar();
    };
    AvaliadorSintaticoEguaClassico.prototype.exponenciacao = function () {
        var expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.EXPONENCIACAO)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.multiplicar = function () {
        var expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.DIVISAO, tipos_de_simbolos_1.default.MULTIPLICACAO, tipos_de_simbolos_1.default.MODULO)) {
            var operador = this.simboloAnterior();
            var direito = this.exponenciacao();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.adicionar = function () {
        var expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SUBTRACAO, tipos_de_simbolos_1.default.ADICAO)) {
            var operador = this.simboloAnterior();
            var direito = this.multiplicar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.bitFill = function () {
        var expressao = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MENOR_MENOR, tipos_de_simbolos_1.default.MAIOR_MAIOR)) {
            var operador = this.simboloAnterior();
            var direito = this.adicionar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.bitE = function () {
        var expressao = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.BIT_AND)) {
            var operador = this.simboloAnterior();
            var direito = this.bitFill();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.bitOu = function () {
        var expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.BIT_OR, tipos_de_simbolos_1.default.BIT_XOR)) {
            var operador = this.simboloAnterior();
            var direito = this.bitE();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.comparar = function () {
        var expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.MAIOR, tipos_de_simbolos_1.default.MAIOR_IGUAL, tipos_de_simbolos_1.default.MENOR, tipos_de_simbolos_1.default.MENOR_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.bitOu();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.comparacaoIgualdade = function () {
        var expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.DIFERENTE, tipos_de_simbolos_1.default.IGUAL_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.comparar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.em = function () {
        var expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.EM)) {
            var operador = this.simboloAnterior();
            var direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.e = function () {
        var expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.E)) {
            var operador = this.simboloAnterior();
            var direito = this.em();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.ou = function () {
        var expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.OU)) {
            var operador = this.simboloAnterior();
            var direito = this.e();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaClassico.prototype.atribuir = function () {
        var expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IGUAL)) {
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
    AvaliadorSintaticoEguaClassico.prototype.expressao = function () {
        return this.atribuir();
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoEscreva = function () {
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var valor = this.expressao();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após o valor.");
        return new declaracoes_1.Escreva(valor);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoExpressao = function () {
        var expressao = this.expressao();
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após expressão.");
        return new declaracoes_1.Expressao(expressao);
    };
    AvaliadorSintaticoEguaClassico.prototype.blocoEscopo = function () {
        var declaracoes = [];
        while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(tipos_de_simbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoSe = function () {
        var simboloSe = this.simboloAnterior();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var caminhoEntao = this.resolverDeclaracao();
        var caminhosSeSenao = [];
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENÃOSE)) {
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senãose'.");
            var condicaoSeSenao = this.expressao();
            this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' apóes codição do 'senãose.");
            var caminho = this.resolverDeclaracao();
            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        var caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(Number(simboloSe.linha), condicao, caminhoEntao, caminhosSeSenao, caminhoSenao);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoEnquanto = function () {
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
    AvaliadorSintaticoEguaClassico.prototype.declaracaoPara = function () {
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
            this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após valores da condicional");
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
    AvaliadorSintaticoEguaClassico.prototype.declaracaoSustar = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'pausa' deve estar dentro de um loop.");
        }
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'pausa'.");
        return new declaracoes_1.Sustar();
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'continua' precisa estar em um laço de repetição.");
        }
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'continua'.");
        return new declaracoes_1.Continua();
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoRetorna = function () {
        var palavraChave = this.simboloAnterior();
        var valor = null;
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após o retorno.");
        return new declaracoes_1.Retorna(palavraChave, valor);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoEscolha = function () {
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
                    var caminhoCondicoes = [this.expressao()];
                    this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CASO)) {
                        this.consumir(tipos_de_simbolos_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(tipos_de_simbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
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
    AvaliadorSintaticoEguaClassico.prototype.declaracaoImportar = function () {
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var simboloFechamento = this.consumir(tipos_de_simbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoTente = function () {
        this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        var tryBlock = this.blocoEscopo();
        var catchBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.PEGUE)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            catchBlock = this.blocoEscopo();
        }
        var elseBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.SENÃO)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            elseBlock = this.blocoEscopo();
        }
        var finallyBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.FINALMENTE)) {
            this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            finallyBlock = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(tryBlock, catchBlock, elseBlock, finallyBlock);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoFazer = function () {
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
    AvaliadorSintaticoEguaClassico.prototype.resolverDeclaracao = function () {
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
    AvaliadorSintaticoEguaClassico.prototype.declaracaoDeVariavel = function () {
        var nome = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_1.default.IGUAL)) {
            inicializador = this.expressao();
        }
        this.consumir(tipos_de_simbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após a declaração da variável.");
        return new declaracoes_1.Var(nome, inicializador);
    };
    AvaliadorSintaticoEguaClassico.prototype.funcao = function (kind) {
        var nome = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, "Esperado nome ".concat(kind, "."));
        return new declaracoes_1.Funcao(nome, this.corpoDaFuncao(kind));
    };
    AvaliadorSintaticoEguaClassico.prototype.corpoDaFuncao = function (kind) {
        this.consumir(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(kind, "."));
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
        this.consumir(tipos_de_simbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do ".concat(kind, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(0, parametros, corpo);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracaoDeClasse = function () {
        var nome = this.consumir(tipos_de_simbolos_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
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
        return new declaracoes_1.Classe(nome, superClasse, metodos);
    };
    AvaliadorSintaticoEguaClassico.prototype.declaracao = function () {
        try {
            if (this.verificarTipoSimboloAtual(tipos_de_simbolos_1.default.FUNÇÃO) &&
                this.verificarTipoProximoSimbolo(tipos_de_simbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tipos_de_simbolos_1.default.FUNÇÃO, null);
                return this.funcao('função');
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
    AvaliadorSintaticoEguaClassico.prototype.analisar = function (retornoLexador) {
        this.erros = [];
        this.atual = 0;
        this.ciclos = 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        var declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros
        };
    };
    return AvaliadorSintaticoEguaClassico;
}());
exports.AvaliadorSintaticoEguaClassico = AvaliadorSintaticoEguaClassico;

},{"../../construtos":22,"../../declaracoes":41,"../../lexador/tipos-de-simbolos":70,"../erro-avaliador-sintatico":7}],5:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoEguaP = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var construtos_1 = require("../../construtos");
var declaracoes_1 = require("../../declaracoes");
var tipos_de_simbolos_eguap_1 = __importDefault(require("../../lexador/dialetos/tipos-de-simbolos-eguap"));
var erro_avaliador_sintatico_1 = require("../erro-avaliador-sintatico");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 *
 * A grande diferença entre este avaliador e os demais é a forma como são entendidos os blocos de escopo.
 * Este avaliador espera uma estrutura de pragmas, que explica quantos espaços há na frente de cada linha.
 */
var AvaliadorSintaticoEguaP = /** @class */ (function () {
    function AvaliadorSintaticoEguaP(performance) {
        if (performance === void 0) { performance = false; }
        this.atual = 0;
        this.ciclos = 0;
        this.performance = performance;
        this.escopos = [];
    }
    AvaliadorSintaticoEguaP.prototype.sincronizar = function () {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            switch (this.simboloAtual().tipo) {
                case tipos_de_simbolos_eguap_1.default.CLASSE:
                case tipos_de_simbolos_eguap_1.default.FUNCAO:
                case tipos_de_simbolos_eguap_1.default.FUNÇÃO:
                case tipos_de_simbolos_eguap_1.default.VARIAVEL:
                case tipos_de_simbolos_eguap_1.default.PARA:
                case tipos_de_simbolos_eguap_1.default.SE:
                case tipos_de_simbolos_eguap_1.default.ENQUANTO:
                case tipos_de_simbolos_eguap_1.default.ESCREVA:
                case tipos_de_simbolos_eguap_1.default.RETORNA:
                    return;
            }
            this.avancarEDevolverAnterior();
        }
    };
    AvaliadorSintaticoEguaP.prototype.erro = function (simbolo, mensagemDeErro) {
        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    };
    AvaliadorSintaticoEguaP.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simboloAtual(), mensagemDeErro);
    };
    AvaliadorSintaticoEguaP.prototype.verificarTipoSimboloAtual = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    };
    AvaliadorSintaticoEguaP.prototype.verificarTipoProximoSimbolo = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    AvaliadorSintaticoEguaP.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    AvaliadorSintaticoEguaP.prototype.simboloAnterior = function () {
        return this.simbolos[this.atual - 1];
    };
    AvaliadorSintaticoEguaP.prototype.simboloNaPosicao = function (posicao) {
        return this.simbolos[this.atual + posicao];
    };
    AvaliadorSintaticoEguaP.prototype.estaNoFinal = function () {
        return this.atual >= this.simbolos.length;
    };
    AvaliadorSintaticoEguaP.prototype.avancarEDevolverAnterior = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simboloAnterior();
    };
    AvaliadorSintaticoEguaP.prototype.verificarSeSimboloAtualEIgualA = function () {
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
    AvaliadorSintaticoEguaP.prototype.primario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SUPER)) {
            var palavraChave = this.simboloAnterior();
            this.consumir(tipos_de_simbolos_eguap_1.default.PONTO, "Esperado '.' após 'super'.");
            var metodo = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, 'Esperado nome do método da SuperClasse.');
            return new construtos_1.Super(0, palavraChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.COLCHETE_ESQUERDO)) {
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(0, []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.COLCHETE_DIREITO)) {
                var valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !==
                    tipos_de_simbolos_eguap_1.default.COLCHETE_DIREITO) {
                    this.consumir(tipos_de_simbolos_eguap_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(0, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CHAVE_ESQUERDA)) {
            var chaves = [];
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(0, [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA)) {
                var chave = this.atribuir();
                this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                var valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA) {
                    this.consumir(tipos_de_simbolos_eguap_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Dicionario(0, chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.FUNÇÃO))
            return this.corpoDaFuncao('função');
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.FUNCAO))
            return this.corpoDaFuncao('funcao');
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.FALSO))
            return new construtos_1.Literal(0, false);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.VERDADEIRO))
            return new construtos_1.Literal(0, true);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.NULO))
            return new construtos_1.Literal(0, null);
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.ISTO))
            return new construtos_1.Isto(0, this.simboloAnterior());
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.NUMERO, tipos_de_simbolos_eguap_1.default.TEXTO)) {
            var simboloAnterior = this.simboloAnterior();
            return new construtos_1.Literal(Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.simboloAnterior());
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO)) {
            var expressao = this.expressao();
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(0, expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), 'Esperado expressão.');
    };
    AvaliadorSintaticoEguaP.prototype.finalizarChamada = function (entidadeChamada) {
        var argumentos = [];
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.VIRGULA));
        }
        var parenteseDireito = this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(entidadeChamada, parenteseDireito, argumentos);
    };
    AvaliadorSintaticoEguaP.prototype.chamar = function () {
        var expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PONTO)) {
                var nome = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.COLCHETE_ESQUERDO)) {
                var indice = this.expressao();
                var simboloFechamento = this.consumir(tipos_de_simbolos_eguap_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.NEGACAO, tipos_de_simbolos_eguap_1.default.SUBTRACAO, tipos_de_simbolos_eguap_1.default.BIT_NOT)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            return new construtos_1.Unario(operador, direito);
        }
        return this.chamar();
    };
    AvaliadorSintaticoEguaP.prototype.exponenciacao = function () {
        var expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.EXPONENCIACAO)) {
            var operador = this.simboloAnterior();
            var direito = this.unario();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.multiplicar = function () {
        var expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.DIVISAO, tipos_de_simbolos_eguap_1.default.MULTIPLICACAO, tipos_de_simbolos_eguap_1.default.MODULO)) {
            var operador = this.simboloAnterior();
            var direito = this.exponenciacao();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.adicionar = function () {
        var expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SUBTRACAO, tipos_de_simbolos_eguap_1.default.ADICAO)) {
            var operador = this.simboloAnterior();
            var direito = this.multiplicar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.bitFill = function () {
        var expressao = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.MENOR_MENOR, tipos_de_simbolos_eguap_1.default.MAIOR_MAIOR)) {
            var operador = this.simboloAnterior();
            var direito = this.adicionar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.bitE = function () {
        var expressao = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.BIT_AND)) {
            var operador = this.simboloAnterior();
            var direito = this.bitFill();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.bitOu = function () {
        var expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.BIT_OR, tipos_de_simbolos_eguap_1.default.BIT_XOR)) {
            var operador = this.simboloAnterior();
            var direito = this.bitE();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.comparar = function () {
        var expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.MAIOR, tipos_de_simbolos_eguap_1.default.MAIOR_IGUAL, tipos_de_simbolos_eguap_1.default.MENOR, tipos_de_simbolos_eguap_1.default.MENOR_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.bitOu();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.comparacaoIgualdade = function () {
        var expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.DIFERENTE, tipos_de_simbolos_eguap_1.default.IGUAL_IGUAL)) {
            var operador = this.simboloAnterior();
            var direito = this.comparar();
            expressao = new construtos_1.Binario(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.em = function () {
        var expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.EM)) {
            var operador = this.simboloAnterior();
            var direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.e = function () {
        var expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.E)) {
            var operador = this.simboloAnterior();
            var direito = this.em();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.ou = function () {
        var expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.OU)) {
            var operador = this.simboloAnterior();
            var direito = this.e();
            expressao = new construtos_1.Logico(expressao, operador, direito);
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.atribuir = function () {
        var expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.MAIS_IGUAL)) {
            var igual = this.simboloAnterior();
            var valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                var simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                return new construtos_1.Conjunto(0, expressao.objeto, expressao.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoSobrescrita(0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    };
    AvaliadorSintaticoEguaP.prototype.expressao = function () {
        return this.atribuir();
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoEscreva = function () {
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var simbolo = this.expressao();
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(simbolo);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoExpressao = function () {
        var expressao = this.expressao();
        return new declaracoes_1.Expressao(expressao);
    };
    AvaliadorSintaticoEguaP.prototype.blocoEscopo = function () {
        var declaracoes = [];
        var simboloAtual = this.simboloAtual();
        var simboloAnterior = this.simboloAnterior();
        // Situação 1: não tem bloco de escopo.
        // 
        // Exemplo: `se verdadeiro: escreva('Alguma coisa')`.
        // Neste caso, linha do símbolo atual é igual à linha do símbolo anterior.
        if (simboloAtual.linha === simboloAnterior.linha) {
            declaracoes.push(this.declaracao());
        }
        else {
            // Situação 2: símbolo atual fica na próxima linha.
            // 
            // Verifica-se o número de espaços à esquerda da linha através dos pragmas. 
            // Se número de espaços da linha do símbolo atual é menor ou igual ao número de espaços
            // da linha anterior, e bloco ainda não começou, é uma situação de erro. 
            var espacosIndentacaoLinhaAtual = this.pragmas[simboloAtual.linha].espacosIndentacao;
            var espacosIndentacaoLinhaAnterior = this.pragmas[simboloAnterior.linha].espacosIndentacao;
            if (espacosIndentacaoLinhaAtual <= espacosIndentacaoLinhaAnterior) {
                this.erro(simboloAtual, "Indenta\u00E7\u00E3o inconsistente na linha ".concat(simboloAtual.linha, ". ") +
                    "Esperado: >= ".concat(espacosIndentacaoLinhaAnterior, ". ") +
                    "Atual: ".concat(espacosIndentacaoLinhaAtual));
            }
            else {
                // Indentação ok, é um bloco de escopo. 
                // Inclui todas as declarações cujas linhas tenham o mesmo número de espaços
                // de indentação do bloco.
                // Se `simboloAtual` for definido em algum momento como indefinido,
                // Significa que o código acabou, então o bloco também acabou.
                var espacosIndentacaoBloco = espacosIndentacaoLinhaAtual;
                while (espacosIndentacaoLinhaAtual === espacosIndentacaoBloco) {
                    declaracoes.push(this.declaracao());
                    simboloAtual = this.simboloAtual();
                    if (!simboloAtual)
                        break;
                    espacosIndentacaoLinhaAtual = this.pragmas[simboloAtual.linha].espacosIndentacao;
                }
            }
        }
        return declaracoes;
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoSe = function () {
        var simboloSe = this.simboloAnterior();
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var caminhoEntao = this.resolverDeclaracao();
        var caminhosSeSenao = [];
        while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SENAOSE, tipos_de_simbolos_eguap_1.default.SENÃOSE)) {
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senaose' ou 'senãose'.");
            var condicaoSeSenao = this.expressao();
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após codição do 'senaose' ou 'senãose'.");
            var caminho = this.resolverDeclaracao();
            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        // Se há algum escopo aberto, conferir antes do senão se símbolo 
        // atual é um espaço de indentação
        /* if (this.escopos.length > 0) {
            this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ESPACO_INDENTACAO);
        } */
        var caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SENAO, tipos_de_simbolos_eguap_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(Number(simboloSe.linha), condicao, caminhoEntao, caminhosSeSenao, caminhoSenao);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoEnquanto = function () {
        try {
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            var condicao = this.expressao();
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoPara = function () {
        try {
            var simboloPara = this.simboloAnterior();
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            var inicializador = void 0;
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            var condicao = null;
            if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            var incrementar = null;
            if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        catch (erro) {
            throw erro;
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoSustar = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'sustar' deve estar dentro de um laço de repetição.");
        }
        return new declaracoes_1.Sustar();
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.simboloAnterior(), "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua();
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoRetorna = function () {
        var palavraChave = this.simboloAnterior();
        var valor = null;
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(palavraChave, valor);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoEscolha = function () {
        try {
            this.ciclos += 1;
            this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após 'escolha'.");
            var condicao = this.expressao();
            var caminhos = [];
            var caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA) &&
                !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CASO)) {
                    var caminhoCondicoes = [this.expressao()];
                    this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CASO)) {
                        this.consumir(tipos_de_simbolos_eguap_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes: declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        var excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simboloAtual(), "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    var declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA));
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
    AvaliadorSintaticoEguaP.prototype.declaracaoImportar = function () {
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var simboloFechamento = this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoTente = function () {
        this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'tente'.");
        var blocoTente = this.blocoEscopo();
        var blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PEGUE)) {
            this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'pegue'.");
            blocoPegue = this.blocoEscopo();
        }
        var blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SENAO, tipos_de_simbolos_eguap_1.default.SENÃO)) {
            this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'pegue'.");
            blocoSenao = this.blocoEscopo();
        }
        var blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.FINALMENTE)) {
            this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'pegue'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(blocoTente, blocoPegue, blocoSenao, blocoFinalmente);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoFazer = function () {
        try {
            this.ciclos += 1;
            var caminhoFazer = this.resolverDeclaracao();
            this.consumir(tipos_de_simbolos_eguap_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            var condicaoEnquanto = this.expressao();
            this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    AvaliadorSintaticoEguaP.prototype.resolverDeclaracao = function () {
        /* if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ESPACO_INDENTACAO)) {
            const espacoIndentacao = this.avancarEDevolverAnterior();
            this.tamanhoIndentacaoAnterior = Number(espacoIndentacao.literal);
            return null;
        } */
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.TENTE))
            return this.declaracaoTente();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SUSTAR) || this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PAUSA))
            return this.declaracaoSustar();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.ESCREVA))
            return this.declaracaoEscreva();
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS))
            return new declaracoes_1.Bloco(this.blocoEscopo());
        return this.declaracaoExpressao();
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoDeVariavel = function () {
        var simbolo = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.MAIS_IGUAL)) {
            inicializador = this.expressao();
        }
        return new declaracoes_1.Var(simbolo, inicializador);
    };
    AvaliadorSintaticoEguaP.prototype.funcao = function (tipo) {
        var simbolo = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, "Esperado nome ".concat(tipo, "."));
        return new declaracoes_1.Funcao(simbolo, this.corpoDaFuncao(tipo));
    };
    AvaliadorSintaticoEguaP.prototype.corpoDaFuncao = function (tipo) {
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(tipo, "."));
        var parametros = [];
        if (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO)) {
            do {
                if (parametros.length >= 255) {
                    this.erro(this.simboloAtual(), 'Não pode haver mais de 255 parâmetros');
                }
                var paramObj = {};
                if (this.simboloAtual().tipo === tipos_de_simbolos_eguap_1.default.MULTIPLICACAO) {
                    this.consumir(tipos_de_simbolos_eguap_1.default.MULTIPLICACAO, null);
                    paramObj['tipo'] = 'wildcard';
                }
                else {
                    paramObj['tipo'] = 'standard';
                }
                paramObj['nome'] = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
                if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.IGUAL)) {
                    paramObj['default'] = this.primario();
                }
                parametros.push(paramObj);
                if (paramObj['tipo'] === 'wildcard')
                    break;
            } while (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.VIRGULA));
        }
        this.consumir(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' antes do escopo do ".concat(tipo, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(0, parametros, corpo);
    };
    AvaliadorSintaticoEguaP.prototype.declaracaoDeClasse = function () {
        var simbolo = this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        var superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.HERDA)) {
            this.consumir(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR, 'Esperado nome da SuperClasse.');
            superClasse = new construtos_1.Variavel(this.simboloAnterior());
        }
        this.consumir(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS, "Esperado ':' antes do escopo da classe.");
        var metodos = [];
        while (!this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    };
    /**
     * Consome o símbolo atual, verificando se é uma declaração de função, variável, classe
     * ou uma expressão.
     * @returns Objeto do tipo `Declaracao`.
     */
    AvaliadorSintaticoEguaP.prototype.declaracao = function () {
        try {
            if (this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.FUNÇÃO) &&
                this.verificarTipoProximoSimbolo(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR)) {
                this.consumir(tipos_de_simbolos_eguap_1.default.FUNÇÃO, null);
                return this.funcao('função');
            }
            if (this.verificarTipoSimboloAtual(tipos_de_simbolos_eguap_1.default.FUNCAO) &&
                this.verificarTipoProximoSimbolo(tipos_de_simbolos_eguap_1.default.IDENTIFICADOR)) {
                this.consumir(tipos_de_simbolos_eguap_1.default.FUNCAO, null);
                return this.funcao('funcao');
            }
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(tipos_de_simbolos_eguap_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    };
    AvaliadorSintaticoEguaP.prototype.analisar = function (retornoLexador) {
        var inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.ciclos = 0;
        this.escopos = [];
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        this.pragmas = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.pragmas) || {};
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
    return AvaliadorSintaticoEguaP;
}());
exports.AvaliadorSintaticoEguaP = AvaliadorSintaticoEguaP;

},{"../../construtos":22,"../../declaracoes":41,"../../lexador/dialetos/tipos-de-simbolos-eguap":65,"../erro-avaliador-sintatico":7,"browser-process-hrtime":77}],6:[function(require,module,exports){
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
__exportStar(require("./avaliador-sintatico-egua-classico"), exports);

},{"./avaliador-sintatico-egua-classico":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./avaliador-sintatico":3,"./erro-avaliador-sintatico":7}],9:[function(require,module,exports){
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

},{"../estruturas/classe":50,"../estruturas/funcao":52,"../estruturas/funcao-padrao":51,"../estruturas/instancia":54,"../excecoes":60}],10:[function(require,module,exports){
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

},{"../estruturas/funcao-padrao":51,"../estruturas/modulo":55,"../excecoes":60}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./acesso-indice-variavel":11,"./acesso-metodo":12,"./agrupamento":13,"./atribuicao-sobrescrita":14,"./atribuir":15,"./binario":16,"./chamada":17,"./conjunto":18,"./construto":19,"./dicionario":20,"./funcao":21,"./isto":23,"./literal":24,"./logico":25,"./super":26,"./unario":27,"./variavel":28,"./vetor":29}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"./declaracao":33}],31:[function(require,module,exports){
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

},{"./declaracao":33}],32:[function(require,module,exports){
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

},{"./declaracao":33}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./declaracao":33}],35:[function(require,module,exports){
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

},{"./declaracao":33}],36:[function(require,module,exports){
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

},{"./declaracao":33}],37:[function(require,module,exports){
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

},{"./declaracao":33}],38:[function(require,module,exports){
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

},{"./declaracao":33}],39:[function(require,module,exports){
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

},{"./declaracao":33}],40:[function(require,module,exports){
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

},{"./declaracao":33}],41:[function(require,module,exports){
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

},{"./bloco":30,"./classe":31,"./continua":32,"./declaracao":33,"./enquanto":34,"./escolha":35,"./escreva":36,"./expressao":37,"./fazer":38,"./funcao":39,"./importar":40,"./para":42,"./retorna":43,"./se":44,"./sustar":45,"./tente":46,"./var":47}],42:[function(require,module,exports){
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

},{"./declaracao":33}],43:[function(require,module,exports){
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

},{"./declaracao":33}],44:[function(require,module,exports){
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

},{"./declaracao":33}],45:[function(require,module,exports){
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

},{"./declaracao":33}],46:[function(require,module,exports){
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

},{"./declaracao":33}],47:[function(require,module,exports){
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

},{"./declaracao":33}],48:[function(require,module,exports){
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegua = void 0;
var fs = __importStar(require("fs"));
var caminho = __importStar(require("path"));
var readline = __importStar(require("readline"));
var chalk_1 = __importDefault(require("chalk"));
var lexador_1 = require("./lexador/lexador");
var avaliador_sintatico_1 = require("./avaliador-sintatico/avaliador-sintatico");
var resolvedor_1 = require("./resolvedor");
var interpretador_1 = require("./interpretador");
var tipos_de_simbolos_1 = __importDefault(require("./lexador/tipos-de-simbolos"));
var excecoes_1 = require("./excecoes");
var egua_classico_1 = require("./interpretador/dialetos/egua-classico");
var lexador_egua_classico_1 = require("./lexador/dialetos/lexador-egua-classico");
var lexador_eguap_1 = require("./lexador/dialetos/lexador-eguap");
var avaliador_sintatico_eguap_1 = require("./avaliador-sintatico/dialetos/avaliador-sintatico-eguap");
var egua_classico_2 = require("./resolvedor/dialetos/egua-classico");
var dialetos_1 = require("./avaliador-sintatico/dialetos");
var Delegua = /** @class */ (function () {
    function Delegua(dialeto, performance, nomeArquivo) {
        if (dialeto === void 0) { dialeto = 'delegua'; }
        if (performance === void 0) { performance = false; }
        this.nomeArquivo = nomeArquivo;
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
        this.dialeto = dialeto;
        switch (this.dialeto) {
            case 'egua':
                this.interpretador = new egua_classico_1.InterpretadorEguaClassico(this, process.cwd());
                this.lexador = new lexador_egua_classico_1.LexadorEguaClassico();
                this.avaliadorSintatico = new dialetos_1.AvaliadorSintaticoEguaClassico();
                this.resolvedor = new egua_classico_2.ResolvedorEguaClassico();
                console.log('Usando dialeto: Égua');
                break;
            case 'eguap':
                this.interpretador = new interpretador_1.Interpretador(this, process.cwd());
                this.lexador = new lexador_eguap_1.LexadorEguaP();
                this.avaliadorSintatico = new avaliador_sintatico_eguap_1.AvaliadorSintaticoEguaP();
                this.resolvedor = new resolvedor_1.Resolvedor();
                console.log('Usando dialeto: ÉguaP');
                break;
            default:
                this.interpretador = new interpretador_1.Interpretador(this, process.cwd(), performance);
                this.lexador = new lexador_1.Lexador(performance);
                this.avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico(performance);
                this.resolvedor = new resolvedor_1.Resolvedor();
                console.log('Usando dialeto: padrão');
                break;
        }
    }
    Delegua.prototype.versao = function () {
        try {
            var manifesto = caminho.resolve('package.json');
            return (JSON.parse(fs.readFileSync(manifesto, { encoding: 'utf8' }))
                .version || '0.2');
        }
        catch (error) {
            return '0.2 (desenvolvimento)';
        }
    };
    Delegua.prototype.iniciarDelegua = function () {
        var _this = this;
        console.log("Console da Linguagem Del\u00E9gua v".concat(this.versao()));
        console.log('Pressione Ctrl + C para sair');
        var leiaLinha = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '\ndelegua> ',
        });
        leiaLinha.prompt();
        leiaLinha.on('line', function (linha) {
            _this.teveErro = false;
            _this.teveErroEmTempoDeExecucao = false;
            _this.executar([linha]);
            leiaLinha.prompt();
        });
    };
    Delegua.prototype.carregarArquivo = function (caminhoRelativoArquivo) {
        this.nomeArquivo = caminho.basename(caminhoRelativoArquivo);
        var dadosDoArquivo = fs.readFileSync(caminhoRelativoArquivo);
        var conteudoDoArquivo = dadosDoArquivo
            .toString()
            .split('\n');
        this.executar(conteudoDoArquivo);
        if (this.teveErro)
            process.exit(65);
        if (this.teveErroEmTempoDeExecucao)
            process.exit(70);
    };
    Delegua.prototype.executar = function (codigo, nomeArquivo) {
        if (nomeArquivo === void 0) { nomeArquivo = ''; }
        var retornoLexador = this.lexador.mapear(codigo);
        if (retornoLexador.erros.length > 0) {
            for (var _i = 0, _a = retornoLexador.erros; _i < _a.length; _i++) {
                var erroLexador = _a[_i];
                this.reportar(erroLexador.linha, " no '".concat(erroLexador.caractere, "'"), erroLexador.mensagem);
            }
            return;
        }
        var retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            for (var _b = 0, _c = retornoAvaliadorSintatico.erros; _b < _c.length; _b++) {
                var erroAvaliadorSintatico = _c[_b];
                this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
            }
            return;
        }
        var retornoResolvedor = this.resolvedor.resolver(retornoAvaliadorSintatico.declaracoes);
        if (retornoResolvedor.erros.length > 0) {
            for (var _d = 0, _e = retornoResolvedor.erros; _d < _e.length; _d++) {
                var erroResolvedor = _e[_d];
                this.erro(erroResolvedor.simbolo, erroResolvedor.message);
            }
            return;
        }
        var retornoInterpretador = this.interpretador.interpretar(retornoAvaliadorSintatico.declaracoes, retornoResolvedor.locais);
        if (retornoInterpretador.erros.length > 0) {
            for (var _f = 0, _g = retornoInterpretador.erros; _f < _g.length; _f++) {
                var erroInterpretador = _g[_f];
                if (erroInterpretador.simbolo) {
                    this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
                }
                else {
                    var erroEmJavaScript = erroInterpretador;
                    console.error(chalk_1.default.red("Erro em JavaScript: ") + "".concat(erroEmJavaScript.message));
                    console.error(chalk_1.default.red("Pilha de execu\u00E7\u00E3o: ") + "".concat(erroEmJavaScript.stack));
                }
            }
        }
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error(chalk_1.default.red("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "]")) + " Erro".concat(onde, ": ").concat(mensagem));
        else
            console.error(chalk_1.default.red("[Linha: ".concat(linha, "]")) + " Erro".concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === tipos_de_simbolos_1.default.EOF) {
            this.reportar(Number(simbolo.linha), ' no final', mensagemDeErro);
        }
        else {
            this.reportar(Number(simbolo.linha), " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    Delegua.prototype.erroEmTempoDeExecucao = function (erro) {
        if (erro && erro.simbolo && erro.simbolo.linha) {
            if (this.nomeArquivo)
                console.error(chalk_1.default.red("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "]")) + " ".concat(erro.mensagem));
            else
                console.error(chalk_1.default.red("Erro: [Linha: ".concat(erro.simbolo.linha, "]")) + " ".concat(erro.mensagem));
        }
        else if (!(erro instanceof excecoes_1.ExcecaoRetornar)) { // TODO: Se livrar de ExcecaoRetornar.
            console.error(chalk_1.default.red("Erro: [Linha: ".concat(erro.linha || 0, "]")) + " ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return Delegua;
}());
exports.Delegua = Delegua;

}).call(this)}).call(this,require('_process'))
},{"./avaliador-sintatico/avaliador-sintatico":3,"./avaliador-sintatico/dialetos":6,"./avaliador-sintatico/dialetos/avaliador-sintatico-eguap":5,"./excecoes":60,"./interpretador":62,"./interpretador/dialetos/egua-classico":61,"./lexador/dialetos/lexador-egua-classico":63,"./lexador/dialetos/lexador-eguap":64,"./lexador/lexador":67,"./lexador/tipos-de-simbolos":70,"./resolvedor":73,"./resolvedor/dialetos/egua-classico":71,"_process":87,"chalk":79,"fs":78,"path":86,"readline":78}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"./chamavel":49,"./instancia":54}],51:[function(require,module,exports){
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

},{"./chamavel":49}],52:[function(require,module,exports){
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

},{"../ambiente":2,"../excecoes":60,"./chamavel":49}],53:[function(require,module,exports){
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

},{"./chamavel":49,"./classe":50,"./funcao":52,"./funcao-padrao":51,"./instancia":54,"./modulo":55}],54:[function(require,module,exports){
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

},{"../excecoes":60}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./erro-em-tempo-de-execucao":56,"./excecao-continuar":57,"./excecao-retornar":58,"./excecao-sustar":59}],61:[function(require,module,exports){
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
exports.InterpretadorEguaClassico = void 0;
var caminho = __importStar(require("path"));
var fs = __importStar(require("fs"));
var tipos_de_simbolos_1 = __importDefault(require("../../lexador/tipos-de-simbolos"));
var ambiente_1 = require("../../ambiente");
var delegua_1 = require("../../delegua");
var biblioteca_global_1 = __importDefault(require("../../bibliotecas/biblioteca-global"));
var importar_biblioteca_1 = __importDefault(require("../../bibliotecas/importar-biblioteca"));
var chamavel_1 = require("../../estruturas/chamavel");
var funcao_padrao_1 = require("../../estruturas/funcao-padrao");
var classe_1 = require("../../estruturas/classe");
var funcao_1 = require("../../estruturas/funcao");
var instancia_1 = require("../../estruturas/instancia");
var modulo_1 = require("../../estruturas/modulo");
var excecoes_1 = require("../../excecoes");
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser)
 * e de fato executa a lógica de programação descrita no código.
 */
var InterpretadorEguaClassico = /** @class */ (function () {
    function InterpretadorEguaClassico(Delegua, diretorioBase) {
        this.Delegua = Delegua;
        this.diretorioBase = diretorioBase;
        this.global = new ambiente_1.Ambiente();
        this.ambiente = this.global;
        this.locais = new Map();
        this.erros = [];
        this.global = (0, biblioteca_global_1.default)(this, this.global);
    }
    InterpretadorEguaClassico.prototype.visitarExpressaoLiteral = function (expressao) {
        return expressao.valor;
    };
    InterpretadorEguaClassico.prototype.avaliar = function (expressao) {
        if (expressao.aceitar) {
            return expressao.aceitar(this);
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAgrupamento = function (expressao) {
        return this.avaliar(expressao.expressao);
    };
    InterpretadorEguaClassico.prototype.eVerdadeiro = function (objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === 'boolean')
            return Boolean(objeto);
        return true;
    };
    InterpretadorEguaClassico.prototype.verificarOperandoNumero = function (operador, operand) {
        if (typeof operand === 'number')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operador precisa ser um número.', operador.linha);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoUnaria = function (expr) {
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tipos_de_simbolos_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expr.operador, direita);
                return -direita;
            case tipos_de_simbolos_1.default.NEGACAO:
                return !this.eVerdadeiro(direita);
            case tipos_de_simbolos_1.default.BIT_NOT:
                return ~direita;
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.eIgual = function (esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
    };
    InterpretadorEguaClassico.prototype.verificarOperandosNumeros = function (operador, direita, esquerda) {
        if (typeof direita === 'number' && typeof esquerda === 'number')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operadores precisam ser números.', operador.linha);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoBinaria = function (expr) {
        var esquerda = this.avaliar(expr.esquerda);
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tipos_de_simbolos_1.default.EXPONENCIACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Math.pow(esquerda, direita);
            case tipos_de_simbolos_1.default.MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) > Number(direita);
            case tipos_de_simbolos_1.default.MAIOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >= Number(direita);
            case tipos_de_simbolos_1.default.MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) < Number(direita);
            case tipos_de_simbolos_1.default.MENOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) <= Number(direita);
            case tipos_de_simbolos_1.default.SUBTRACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) - Number(direita);
            case tipos_de_simbolos_1.default.ADICAO:
                if (typeof esquerda === 'number' &&
                    typeof direita === 'number') {
                    return Number(esquerda) + Number(direita);
                }
                else if (typeof esquerda === 'string' &&
                    typeof direita === 'string') {
                    return String(esquerda) + String(direita);
                }
                throw new excecoes_1.ErroEmTempoDeExecucao(expr.operador, 'Operadores precisam ser dois números ou duas strings.');
            case tipos_de_simbolos_1.default.DIVISAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) / Number(direita);
            case tipos_de_simbolos_1.default.MULTIPLICACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) * Number(direita);
            case tipos_de_simbolos_1.default.MODULO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) % Number(direita);
            case tipos_de_simbolos_1.default.BIT_AND:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) & Number(direita);
            case tipos_de_simbolos_1.default.BIT_XOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) ^ Number(direita);
            case tipos_de_simbolos_1.default.BIT_OR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) | Number(direita);
            case tipos_de_simbolos_1.default.MENOR_MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) << Number(direita);
            case tipos_de_simbolos_1.default.MAIOR_MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >> Number(direita);
            case tipos_de_simbolos_1.default.DIFERENTE:
                return !this.eIgual(esquerda, direita);
            case tipos_de_simbolos_1.default.IGUAL_IGUAL:
                return this.eIgual(esquerda, direita);
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeChamada = function (expressao) {
        var entidadeChamada = this.avaliar(expressao.entidadeChamada);
        var argumentos = [];
        for (var i = 0; i < expressao.argumentos.length; i++) {
            argumentos.push(this.avaliar(expressao.argumentos[i]));
        }
        if (!(entidadeChamada instanceof chamavel_1.Chamavel)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha);
        }
        var parametros;
        if (entidadeChamada instanceof funcao_1.DeleguaFuncao) {
            parametros = entidadeChamada.declaracao.parametros;
        }
        else if (entidadeChamada instanceof classe_1.DeleguaClasse) {
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
        if (entidadeChamada instanceof funcao_padrao_1.FuncaoPadrao) {
            return entidadeChamada.chamar(this, argumentos, expressao.entidadeChamada.nome);
        }
        return entidadeChamada.chamar(this, argumentos);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
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
    InterpretadorEguaClassico.prototype.procurarVariavel = function (simbolo, expr) {
        var distancia = this.locais.get(expr);
        if (distancia !== undefined) {
            return this.ambiente.obterVariavelEm(distancia, simbolo.lexema);
        }
        else {
            return this.global.obterVariavel(simbolo);
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeVariavel = function (expressao) {
        return this.procurarVariavel(expressao.simbolo, expressao);
    };
    InterpretadorEguaClassico.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        return this.avaliar(declaracao.expressao);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoLogica = function (expressao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoSe = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoPara = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoFazer = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoEscolha = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoTente = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoEnquanto = function (declaracao) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoImportar = function (declaracao) {
        var caminhoRelativo = this.avaliar(declaracao.caminho);
        var caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        var nomeArquivo = caminho.basename(caminhoTotal);
        var dados = (0, importar_biblioteca_1.default)(caminhoRelativo);
        if (dados)
            return dados;
        try {
            if (!fs.existsSync(caminhoTotal)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.simboloFechamento, 'Não foi possível encontrar arquivo importado.', declaracao.linha);
            }
        }
        catch (erro) {
            throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.simboloFechamento, 'Não foi possível ler o arquivo.', declaracao.linha);
        }
        dados = fs.readFileSync(caminhoTotal).toString();
        var delegua = new delegua_1.Delegua(this.Delegua.dialeto, false, nomeArquivo);
        delegua.executar(dados);
        var exportar = delegua.interpretador.global.valores.exports;
        var eDicionario = function (objeto) { return objeto.constructor === Object; };
        if (eDicionario(exportar)) {
            var novoModulo = new modulo_1.DeleguaModulo();
            var chaves = Object.keys(exportar);
            for (var i = 0; i < chaves.length; i++) {
                novoModulo[chaves[i]] = exportar[chaves[i]];
            }
            return novoModulo;
        }
        return exportar;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoEscreva = function (declaracao) {
        var valor = this.avaliar(declaracao.expressao);
        console.log(this.paraTexto(valor));
        return null;
    };
    InterpretadorEguaClassico.prototype.executarBloco = function (declaracoes, ambiente) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoBloco = function (declaracao) {
        this.executarBloco(declaracao.declaracoes, new ambiente_1.Ambiente(this.ambiente));
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoVar = function (declaracao) {
        var valor = null;
        if (declaracao.inicializador !== null) {
            valor = this.avaliar(declaracao.inicializador);
        }
        this.ambiente.definirVariavel(declaracao.simbolo.lexema, valor);
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoContinua = function (declaracao) {
        throw new excecoes_1.ExcecaoContinuar();
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoSustar = function (declaracao) {
        throw new excecoes_1.ExcecaoSustar();
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoRetornar = function (declaracao) {
        var valor = null;
        if (declaracao.valor != null)
            valor = this.avaliar(declaracao.valor);
        throw new excecoes_1.ExcecaoRetornar(valor);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeleguaFuncao = function (expressao) {
        return new funcao_1.DeleguaFuncao(null, expressao, this.ambiente, false);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expressao) {
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
            objeto instanceof instancia_1.DeleguaInstancia ||
            objeto instanceof funcao_1.DeleguaFuncao ||
            objeto instanceof classe_1.DeleguaClasse ||
            objeto instanceof modulo_1.DeleguaModulo) {
            objeto[indice] = valor;
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAcessoIndiceVariavel = function (expressao) {
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
            objeto instanceof instancia_1.DeleguaInstancia ||
            objeto instanceof funcao_1.DeleguaFuncao ||
            objeto instanceof classe_1.DeleguaClasse ||
            objeto instanceof modulo_1.DeleguaModulo) {
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
    InterpretadorEguaClassico.prototype.visitarExpressaoDefinir = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        if (!(objeto instanceof instancia_1.DeleguaInstancia) &&
            objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha);
        }
        var valor = this.avaliar(expressao.valor);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            objeto.set(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoFuncao = function (declaracao) {
        var funcao = new funcao_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao, this.ambiente, false);
        this.ambiente.definirVariavel(declaracao.simbolo.lexema, funcao);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoClasse = function (declaracao) {
        var superClasse = null;
        if (declaracao.superClasse !== null) {
            superClasse = this.avaliar(declaracao.superClasse);
            if (!(superClasse instanceof classe_1.DeleguaClasse)) {
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
            var funcao = new funcao_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, this.ambiente, eInicializado);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        var criado = new classe_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
        if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        }
        this.ambiente.atribuirVariavel(declaracao.simbolo, criado);
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        var objeto = this.avaliar(expressao.objeto);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            return objeto.get(expressao.simbolo) || null;
        }
        else if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        else if (objeto instanceof modulo_1.DeleguaModulo) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoIsto = function (expressao) {
        return this.procurarVariavel(expressao.palavraChave, expressao);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDicionario = function (expressao) {
        var dicionario = {};
        for (var i = 0; i < expressao.chaves.length; i++) {
            dicionario[this.avaliar(expressao.chaves[i])] = this.avaliar(expressao.valores[i]);
        }
        return dicionario;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoVetor = function (expressao) {
        var valores = [];
        for (var i = 0; i < expressao.valores.length; i++) {
            valores.push(this.avaliar(expressao.valores[i]));
        }
        return valores;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoSuper = function (expressao) {
        var distancia = this.locais.get(expressao);
        var superClasse = this.ambiente.obterVariavelEm(distancia, 'super');
        var objeto = this.ambiente.obterVariavelEm(distancia - 1, 'isto');
        var metodo = superClasse.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        return metodo.definirEscopo(objeto);
    };
    InterpretadorEguaClassico.prototype.paraTexto = function (objeto) {
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
    InterpretadorEguaClassico.prototype.executar = function (declaracao, mostrarResultado) {
        if (mostrarResultado === void 0) { mostrarResultado = false; }
        declaracao.aceitar(this);
    };
    InterpretadorEguaClassico.prototype.interpretar = function (declaracoes, locais) {
        this.locais = locais;
        this.erros = [];
        try {
            for (var i = 0; i < declaracoes.length; i++) {
                this.executar(declaracoes[i], false);
            }
        }
        catch (erro) {
            this.erros.push(erro);
        }
        return {
            erros: this.erros
        };
    };
    return InterpretadorEguaClassico;
}());
exports.InterpretadorEguaClassico = InterpretadorEguaClassico;

},{"../../ambiente":2,"../../bibliotecas/biblioteca-global":9,"../../bibliotecas/importar-biblioteca":10,"../../delegua":48,"../../estruturas/chamavel":49,"../../estruturas/classe":50,"../../estruturas/funcao":52,"../../estruturas/funcao-padrao":51,"../../estruturas/instancia":54,"../../estruturas/modulo":55,"../../excecoes":60,"../../lexador/tipos-de-simbolos":70,"fs":78,"path":86}],62:[function(require,module,exports){
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
var fs = __importStar(require("fs"));
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var tipos_de_simbolos_1 = __importDefault(require("../lexador/tipos-de-simbolos"));
var ambiente_1 = require("../ambiente");
var delegua_1 = require("../delegua");
var biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
var importar_biblioteca_1 = __importDefault(require("../bibliotecas/importar-biblioteca"));
var excecoes_1 = require("../excecoes");
var estruturas_1 = require("../estruturas");
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser),
 * e de fato executa a lógica de programação descrita no código.
 */
var Interpretador = /** @class */ (function () {
    function Interpretador(Delegua, diretorioBase, performance) {
        if (performance === void 0) { performance = false; }
        this.Delegua = Delegua;
        this.diretorioBase = diretorioBase;
        this.performance = performance;
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
        try {
            if (!fs.existsSync(caminhoTotal)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.simboloFechamento, 'Não foi possível encontrar arquivo importado.', declaracao.linha);
            }
        }
        catch (erro) {
            throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.simboloFechamento, 'Não foi possível ler o arquivo.', declaracao.linha);
        }
        var conteudoImportacao = fs.readFileSync(caminhoTotal)
            .toString()
            .split('\n');
        var delegua = new delegua_1.Delegua(this.Delegua.dialeto, this.performance, nomeArquivo);
        delegua.executar(conteudoImportacao);
        var funcoesDeclaradas = delegua.interpretador.global.obterTodasDeleguaFuncao();
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
        console.log(this.paraTexto(valor));
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
            console.log(this.paraTexto(resultado));
        }
    };
    Interpretador.prototype.interpretar = function (objeto, locais) {
        this.locais = locais;
        this.erros = [];
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
        }
        return {
            erros: this.erros
        };
    };
    return Interpretador;
}());
exports.Interpretador = Interpretador;

},{"../ambiente":2,"../bibliotecas/biblioteca-global":9,"../bibliotecas/importar-biblioteca":10,"../delegua":48,"../estruturas":53,"../excecoes":60,"../lexador/tipos-de-simbolos":70,"browser-process-hrtime":77,"fs":78,"path":86}],63:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorEguaClassico = void 0;
var tipos_de_simbolos_1 = __importDefault(require("../tipos-de-simbolos"));
var simbolo_1 = require("../simbolo");
var palavras_reservadas_1 = __importDefault(require("../palavras-reservadas"));
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
var LexadorEguaClassico = /** @class */ (function () {
    function LexadorEguaClassico(codigo) {
        this.codigo = codigo;
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 1;
    }
    LexadorEguaClassico.prototype.eDigito = function (caractere) {
        return caractere >= '0' && caractere <= '9';
    };
    LexadorEguaClassico.prototype.eAlfabeto = function (caractere) {
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
    LexadorEguaClassico.prototype.eAlfabetoOuDigito = function (caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    };
    LexadorEguaClassico.prototype.eFinalDoCodigo = function () {
        return this.atual >= this.codigo.length;
    };
    LexadorEguaClassico.prototype.avancar = function () {
        this.atual += 1;
        return this.codigo[this.atual - 1];
    };
    LexadorEguaClassico.prototype.adicionarSimbolo = function (tipo, literal) {
        if (literal === void 0) { literal = null; }
        var texto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, texto, literal, this.linha));
    };
    LexadorEguaClassico.prototype.proximoIgualA = function (esperado) {
        if (this.eFinalDoCodigo()) {
            return false;
        }
        if (this.codigo[this.atual] !== esperado) {
            return false;
        }
        this.atual += 1;
        return true;
    };
    LexadorEguaClassico.prototype.simboloAtual = function () {
        if (this.eFinalDoCodigo())
            return '\0';
        return this.codigo.charAt(this.atual);
    };
    LexadorEguaClassico.prototype.proximoSimbolo = function () {
        if (this.atual + 1 >= this.codigo.length)
            return '\0';
        return this.codigo.charAt(this.atual + 1);
    };
    LexadorEguaClassico.prototype.simboloAnterior = function () {
        return this.codigo.charAt(this.atual - 1);
    };
    LexadorEguaClassico.prototype.analisarTexto = function (texto) {
        if (texto === void 0) { texto = '"'; }
        while (this.simboloAtual() !== texto && !this.eFinalDoCodigo()) {
            if (this.simboloAtual() === '\n')
                this.linha = +1;
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha,
                caractere: this.simboloAnterior(),
                mensagem: 'Texto não finalizado.'
            });
            return;
        }
        this.avancar();
        var valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual - 1);
        this.adicionarSimbolo(tipos_de_simbolos_1.default.TEXTO, valor);
    };
    LexadorEguaClassico.prototype.analisarNumero = function () {
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        var numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(tipos_de_simbolos_1.default.NUMERO, parseFloat(numeroCompleto));
    };
    LexadorEguaClassico.prototype.identificarPalavraChave = function () {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        var codigo = this.codigo.substring(this.inicioSimbolo, this.atual);
        var tipo = codigo in palavras_reservadas_1.default
            ? palavras_reservadas_1.default[codigo]
            : tipos_de_simbolos_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    };
    LexadorEguaClassico.prototype.analisarToken = function () {
        var caractere = this.avancar();
        switch (caractere) {
            case '[':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.COLCHETE_ESQUERDO);
                break;
            case ']':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.COLCHETE_DIREITO);
                break;
            case '(':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PARENTESE_ESQUERDO);
                break;
            case ')':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PARENTESE_DIREITO);
                break;
            case '{':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.CHAVE_ESQUERDA);
                break;
            case '}':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.CHAVE_DIREITA);
                break;
            case ',':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.VIRGULA);
                break;
            case '.':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PONTO);
                break;
            case '-':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.SUBTRACAO);
                break;
            case '+':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.ADICAO);
                break;
            case ':':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.DOIS_PONTOS);
                break;
            case ';':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.PONTO_E_VIRGULA);
                break;
            case '%':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.MODULO);
                break;
            case '*':
                if (this.simboloAtual() === '*') {
                    this.avancar();
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.EXPONENCIACAO);
                    break;
                }
                this.adicionarSimbolo(tipos_de_simbolos_1.default.MULTIPLICACAO);
                break;
            case '!':
                this.adicionarSimbolo(this.proximoIgualA('=')
                    ? tipos_de_simbolos_1.default.DIFERENTE
                    : tipos_de_simbolos_1.default.NEGACAO);
                break;
            case '=':
                this.adicionarSimbolo(this.proximoIgualA('=')
                    ? tipos_de_simbolos_1.default.IGUAL_IGUAL
                    : tipos_de_simbolos_1.default.IGUAL);
                break;
            case '&':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_AND);
                break;
            case '~':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_NOT);
                break;
            case '|':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_OR);
                break;
            case '^':
                this.adicionarSimbolo(tipos_de_simbolos_1.default.BIT_XOR);
                break;
            case '<':
                if (this.proximoIgualA('=')) {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR_IGUAL);
                }
                else if (this.proximoIgualA('<')) {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR_MENOR);
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MENOR);
                }
                break;
            case '>':
                if (this.proximoIgualA('=')) {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR_IGUAL);
                }
                else if (this.proximoIgualA('>')) {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR_MAIOR);
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.MAIOR);
                }
                break;
            case '/':
                if (this.proximoIgualA('/')) {
                    while (this.simboloAtual() != '\n' &&
                        !this.eFinalDoCodigo())
                        this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_1.default.DIVISAO);
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização
            case ' ':
            case '\r':
            case '\t':
                break;
            // tentativa de pulhar linha com \n que ainda não funciona
            case '\n':
                this.linha += 1;
                break;
            case '"':
                this.analisarTexto('"');
                break;
            case "'":
                this.analisarTexto("'");
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else
                    this.erros.push({
                        linha: this.linha,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.'
                    });
        }
    };
    LexadorEguaClassico.prototype.mapear = function (codigo) {
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 1;
        // Por enquanto, o Lexador de Égua Clássico vai ter uma linha só.
        this.codigo = codigo.join('\n') || '';
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        this.simbolos.push(new simbolo_1.Simbolo(tipos_de_simbolos_1.default.EOF, '', null, this.linha));
        return {
            simbolos: this.simbolos,
            erros: this.erros
        };
    };
    return LexadorEguaClassico;
}());
exports.LexadorEguaClassico = LexadorEguaClassico;

},{"../palavras-reservadas":68,"../simbolo":69,"../tipos-de-simbolos":70}],64:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorEguaP = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var tipos_de_simbolos_eguap_1 = __importDefault(require("./tipos-de-simbolos-eguap"));
var simbolo_1 = require("../simbolo");
var palavras_reservadas_1 = __importDefault(require("../palavras-reservadas"));
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * Este lexador é diferente dos demais, porque também produz uma estrutura de dados de pragmas, que explica,
 * por exemplo quantos espaços há na frente de cada linha. Assim como a linguagem Python, os blocos de
 * escopo são definidos pelo número de espaços à frente do código.
 */
var LexadorEguaP = /** @class */ (function () {
    function LexadorEguaP(performance) {
        if (performance === void 0) { performance = false; }
        this.performance = performance;
        this.simbolos = [];
        this.erros = [];
        this.pragmas = {};
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
    }
    LexadorEguaP.prototype.eDigito = function (caractere) {
        return caractere >= '0' && caractere <= '9';
    };
    LexadorEguaP.prototype.eAlfabeto = function (caractere) {
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
    LexadorEguaP.prototype.eAlfabetoOuDigito = function (caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    };
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    LexadorEguaP.prototype.eUltimaLinha = function () {
        return this.linha >= this.codigo.length - 1;
    };
    LexadorEguaP.prototype.eFinalDaLinha = function () {
        return this.atual >= this.codigo[this.linha].length;
    };
    LexadorEguaP.prototype.eFinalDoCodigo = function () {
        if (this.linha > this.codigo.length - 1)
            return true;
        return this.linha == this.codigo.length - 1 &&
            this.codigo[this.codigo.length - 1].length <= this.atual;
    };
    LexadorEguaP.prototype.avancar = function () {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
            // this.logicaEmLinhaIniciada = false;
            this.analisarIndentacao();
        }
    };
    LexadorEguaP.prototype.adicionarSimbolo = function (tipo, literal) {
        if (literal === void 0) { literal = null; }
        var texto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, texto, literal, this.linha + 1));
    };
    LexadorEguaP.prototype.proximoIgualA = function (esperado) {
        throw new Error("Method not implemented.");
    };
    LexadorEguaP.prototype.simboloAtual = function () {
        if (this.eFinalDaLinha())
            return '\0';
        if (this.linha > this.codigo.length - 1)
            return '\0';
        return this.codigo[this.linha].charAt(this.atual);
    };
    LexadorEguaP.prototype.proximoSimbolo = function () {
        if (this.atual + 1 >= this.codigo[this.linha].length)
            return '\0';
        return this.codigo[this.linha].charAt(this.atual + 1);
    };
    LexadorEguaP.prototype.simboloAnterior = function () {
        return this.codigo[this.linha].charAt(this.atual - 1);
    };
    LexadorEguaP.prototype.analisarTexto = function (delimitador) {
        if (delimitador === void 0) { delimitador = '"'; }
        var linhaPrimeiroCaracter = this.linha;
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
        var textoCompleto = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipos_de_simbolos_eguap_1.default.TEXTO, textoCompleto, textoCompleto, linhaPrimeiroCaracter + 1));
    };
    LexadorEguaP.prototype.analisarNumero = function () {
        var linhaPrimeiroDigito = this.linha;
        while (this.eDigito(this.simboloAtual()) && this.linha === linhaPrimeiroDigito) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        var numeroCompleto;
        if (linhaPrimeiroDigito < this.linha) {
            var linhaNumero = this.codigo[linhaPrimeiroDigito];
            numeroCompleto = linhaNumero.substring(this.inicioSimbolo, linhaNumero.length);
        }
        else {
            numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        }
        this.simbolos.push(new simbolo_1.Simbolo(tipos_de_simbolos_eguap_1.default.NUMERO, numeroCompleto, parseFloat(numeroCompleto), linhaPrimeiroDigito + 1));
    };
    LexadorEguaP.prototype.identificarPalavraChave = function () {
        var linhaPrimeiroCaracter = this.linha;
        while (this.eAlfabetoOuDigito(this.simboloAtual()) && this.linha === linhaPrimeiroCaracter) {
            this.avancar();
        }
        var textoPalavraChave;
        if (linhaPrimeiroCaracter < this.linha) {
            var linhaPalavraChave = this.codigo[linhaPrimeiroCaracter];
            textoPalavraChave = linhaPalavraChave.substring(this.inicioSimbolo, linhaPalavraChave.length);
        }
        else {
            textoPalavraChave = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        }
        var tipo = textoPalavraChave in palavras_reservadas_1.default
            ? palavras_reservadas_1.default[textoPalavraChave]
            : tipos_de_simbolos_eguap_1.default.IDENTIFICADOR;
        this.simbolos.push(new simbolo_1.Simbolo(tipo, textoPalavraChave, null, linhaPrimeiroCaracter + 1));
    };
    LexadorEguaP.prototype.analisarIndentacao = function () {
        var espacos = 0;
        while (['\t', ' '].includes(this.simboloAtual()) && !this.eFinalDoCodigo()) {
            espacos++;
            this.avancar();
        }
        this.pragmas[this.linha + 1] = { linha: this.linha + 1, espacosIndentacao: espacos };
    };
    LexadorEguaP.prototype.avancarParaProximaLinha = function () {
        this.linha++;
        this.atual = 0;
        this.analisarIndentacao();
    };
    LexadorEguaP.prototype.analisarToken = function () {
        var caractere = this.simboloAtual();
        switch (caractere) {
            case ' ':
            case '\t':
                this.avancar();
                break;
            case '\r':
            case '\n':
            case '\0':
            case ';':
                this.avancar();
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.IGUAL);
                }
                break;
            case '#':
                this.avancarParaProximaLinha();
                break;
            case '[':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '{':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.CHAVE_DIREITA);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MENOS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.SUBTRACAO);
                }
                break;
            case '+':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MAIS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.ADICAO);
                }
                break;
            case '/':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.DIVISAO);
                this.avancar();
                break;
            case ':':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.DOIS_PONTOS);
                this.avancar();
                break;
            case '%':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MODULO);
                this.avancar();
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '*') {
                    this.avancar();
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.EXPONENCIACAO);
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MULTIPLICACAO);
                }
                break;
            case '!':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.DIFERENTE);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.NEGACAO);
                }
            case '&':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.BIT_AND);
                this.avancar();
                break;
            case '~':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.BIT_NOT);
                this.avancar();
                break;
            case '|':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.BIT_OR);
                this.avancar();
                break;
            case '^':
                this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.BIT_XOR);
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MENOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '<') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MENOR_MENOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '>') {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MAIOR_MAIOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(tipos_de_simbolos_eguap_1.default.MAIOR);
                }
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
    LexadorEguaP.prototype.mapear = function (codigo) {
        var inicioMapeamento = (0, browser_process_hrtime_1.default)();
        this.simbolos = [];
        this.erros = [];
        this.pragmas = {};
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        // Análise de indentação da primeira linha.
        this.analisarIndentacao();
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
            erros: this.erros,
            pragmas: this.pragmas
        };
    };
    return LexadorEguaP;
}());
exports.LexadorEguaP = LexadorEguaP;

},{"../palavras-reservadas":68,"../simbolo":69,"./tipos-de-simbolos-eguap":65,"browser-process-hrtime":77}],65:[function(require,module,exports){
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
    VERDADEIRO: "VERDADEIRO",
    VIRGULA: "VIRGULA"
};

},{}],66:[function(require,module,exports){
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

},{"../tipos-de-simbolos":75,"./palavras-reservadas":68,"./simbolo":69,"browser-process-hrtime":77}],68:[function(require,module,exports){
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

},{"./tipos-de-simbolos":70}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedorEguaClassico = void 0;
var pilha_escopos_1 = require("../pilha-escopos");
var erro_resolvedor_1 = require("../erro-resolvedor");
var TipoFuncao = {
    NENHUM: 'NENHUM',
    FUNÇÃO: 'FUNÇÃO',
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
var ResolvedorEguaClassico = /** @class */ (function () {
    function ResolvedorEguaClassico() {
        this.erros = [];
        this.escopos = new pilha_escopos_1.PilhaEscopos();
        this.locais = new Map();
        this.funcaoAtual = TipoFuncao.NENHUM;
        this.classeAtual = TipoClasse.NENHUM;
        this.cicloAtual = TipoClasse.NENHUM;
    }
    ResolvedorEguaClassico.prototype.definir = function (simbolo) {
        if (this.escopos.eVazio())
            return;
        this.escopos.topoDaPilha()[simbolo.lexema] = true;
    };
    ResolvedorEguaClassico.prototype.declarar = function (simbolo) {
        if (this.escopos.eVazio())
            return;
        var escopo = this.escopos.topoDaPilha();
        if (escopo.hasOwnProperty(simbolo.lexema)) {
            var erro = new erro_resolvedor_1.ErroResolvedor(simbolo, 'Variável com esse nome já declarada neste escopo.');
            this.erros.push(erro);
        }
        escopo[simbolo.lexema] = false;
    };
    ResolvedorEguaClassico.prototype.inicioDoEscopo = function () {
        this.escopos.empilhar({});
    };
    ResolvedorEguaClassico.prototype.finalDoEscopo = function () {
        this.escopos.removerUltimo();
    };
    ResolvedorEguaClassico.prototype.resolverLocal = function (expressao, simbolo) {
        for (var i = this.escopos.pilha.length - 1; i >= 0; i--) {
            if (this.escopos.pilha[i].hasOwnProperty(simbolo.lexema)) {
                this.locais.set(expressao, this.escopos.pilha.length - 1 - i);
            }
        }
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoBloco = function (declaracao) {
        this.inicioDoEscopo();
        this.resolver(declaracao.declaracoes);
        this.finalDoEscopo();
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDeVariavel = function (expressao) {
        if (!this.escopos.eVazio() &&
            this.escopos.topoDaPilha()[expressao.simbolo.lexema] === false) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.simbolo, 'Não é possível ler a variável local em seu próprio inicializador.');
            this.erros.push(erro);
            throw erro;
        }
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoVar = function (declaracao) {
        this.declarar(declaracao.simbolo);
        if (declaracao.inicializador !== null) {
            this.resolver(declaracao.inicializador);
        }
        this.definir(declaracao.simbolo);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
        this.resolver(expressao.valor);
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    };
    ResolvedorEguaClassico.prototype.resolverFuncao = function (funcao, funcType) {
        var enclosingFunc = this.funcaoAtual;
        this.funcaoAtual = funcType;
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
    ResolvedorEguaClassico.prototype.visitarExpressaoFuncao = function (declaracao) {
        this.declarar(declaracao.simbolo);
        this.definir(declaracao.simbolo);
        this.resolverFuncao(declaracao.funcao, TipoFuncao.FUNÇÃO);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDeleguaFuncao = function (declaracao) {
        this.resolverFuncao(declaracao, TipoFuncao.FUNÇÃO);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoTente = function (declaracao) {
        this.resolver(declaracao.caminhoTente);
        if (declaracao.caminhoPegue !== null)
            this.resolver(declaracao.caminhoPegue);
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        if (declaracao.caminhoFinalmente !== null)
            this.resolver(declaracao.caminhoFinalmente);
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoClasse = function (declaracao) {
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
    ResolvedorEguaClassico.prototype.visitarExpressaoSuper = function (expressao) {
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
    ResolvedorEguaClassico.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        this.resolver(expressao.objeto);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        this.resolver(declaracao.expressao);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoSe = function (declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.caminhoEntao);
        for (var i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            this.resolver(declaracao.caminhosSeSenao[i].condicao);
            this.resolver(declaracao.caminhosSeSenao[i].branch);
        }
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoImportar = function (declaracao) {
        this.resolver(declaracao.caminho);
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoEscreva = function (declaracao) {
        this.resolver(declaracao.expressao);
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoRetornar = function (declaracao) {
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
    ResolvedorEguaClassico.prototype.visitarExpressaoEscolha = function (declaracao) {
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
    ResolvedorEguaClassico.prototype.visitarExpressaoEnquanto = function (declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.corpo);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoPara = function (declaracao) {
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
    ResolvedorEguaClassico.prototype.visitarExpressaoFazer = function (declaracao) {
        this.resolver(declaracao.condicaoEnquanto);
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.FAZER;
        this.resolver(declaracao.caminhoFazer);
        this.cicloAtual = enclosingType;
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoBinaria = function (expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDeChamada = function (expressao) {
        this.resolver(expressao.entidadeChamada);
        var argumentos = expressao.argumentos;
        for (var i = 0; i < argumentos.length; i++) {
            this.resolver(argumentos[i]);
        }
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoAgrupamento = function (expressao) {
        this.resolver(expressao.expressao);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDicionario = function (expressao) {
        for (var i = 0; i < expressao.chaves.length; i++) {
            this.resolver(expressao.chaves[i]);
            this.resolver(expressao.valores[i]);
        }
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoVetor = function (expressao) {
        for (var i = 0; i < expressao.valores.length; i++) {
            this.resolver(expressao.valores[i]);
        }
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoAcessoIndiceVariavel = function (expressao) {
        this.resolver(expressao.entidadeChamada);
        this.resolver(expressao.indice);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoContinua = function (declaracao) {
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoSustar = function (declaracao) {
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expressao) {
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoLiteral = function (expressao) {
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoLogica = function (expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoUnaria = function (expressao) {
        this.resolver(expressao.direita);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoDefinir = function (expressao) {
        this.resolver(expressao.valor);
        this.resolver(expressao.objeto);
        return null;
    };
    ResolvedorEguaClassico.prototype.visitarExpressaoIsto = function (expressao) {
        if (this.classeAtual == TipoClasse.NENHUM) {
            var erro = new erro_resolvedor_1.ErroResolvedor(expressao.palavraChave, "Não pode usar 'isto' fora da classe.");
            this.erros.push(erro);
        }
        this.resolverLocal(expressao, expressao.palavraChave);
        return null;
    };
    ResolvedorEguaClassico.prototype.resolver = function (declaracoes) {
        if (Array.isArray(declaracoes)) {
            for (var i = 0; i < declaracoes.length; i++) {
                if (declaracoes[i] && declaracoes[i].aceitar) {
                    declaracoes[i].aceitar(this);
                }
            }
        }
        else if (declaracoes) {
            declaracoes.aceitar(this);
        }
        return {
            erros: this.erros,
            locais: this.locais
        };
    };
    return ResolvedorEguaClassico;
}());
exports.ResolvedorEguaClassico = ResolvedorEguaClassico;

},{"../erro-resolvedor":72,"../pilha-escopos":74}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{"./erro-resolvedor":72,"./pilha-escopos":74}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"dup":70}],76:[function(require,module,exports){
'use strict';

const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = require('color-convert');
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

},{"color-convert":83}],77:[function(require,module,exports){
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
},{"_process":87}],78:[function(require,module,exports){

},{}],79:[function(require,module,exports){
'use strict';
const ansiStyles = require('ansi-styles');
const {stdout: stdoutColor, stderr: stderrColor} = require('supports-color');
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = require('./util');

const {isArray} = Array;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
			return applyStyle(builder, chalkTag(builder, ...arguments_));
		}

		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!isArray(firstString) || !isArray(firstString.raw)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = require('./templates');
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

module.exports = chalk;

},{"./templates":80,"./util":81,"ansi-styles":76,"supports-color":88}],80:[function(require,module,exports){
'use strict';
const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	const u = c[0] === 'u';
	const bracket = c[1] === '{';

	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	if (u && bracket) {
		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, arguments_) {
	const results = [];
	const chunks = arguments_.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		const number = Number(chunk);
		if (!Number.isNaN(number)) {
			results.push(number);
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const [styleName, styles] of Object.entries(enabled)) {
		if (!Array.isArray(styles)) {
			continue;
		}

		if (!(styleName in current)) {
			throw new Error(`Unknown Chalk style: ${styleName}`);
		}

		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
	}

	return current;
}

module.exports = (chalk, temporary) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
		if (escapeCharacter) {
			chunk.push(unescape(escapeCharacter));
		} else if (style) {
			const string = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(character);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMessage);
	}

	return chunks.join('');
};

},{}],81:[function(require,module,exports){
'use strict';

const stringReplaceAll = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

module.exports = {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
};

},{}],82:[function(require,module,exports){
/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

},{"color-name":85}],83:[function(require,module,exports){
const conversions = require('./conversions');
const route = require('./route');

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

},{"./conversions":82,"./route":84}],84:[function(require,module,exports){
const conversions = require('./conversions');

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};


},{"./conversions":82}],85:[function(require,module,exports){
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],86:[function(require,module,exports){
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
},{"_process":87}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
'use strict';
module.exports = {
	stdout: false,
	stderr: false
};

},{}]},{},[1])(1)
});
