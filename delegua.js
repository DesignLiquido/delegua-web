(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Delegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){(function (){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Delegua = void 0;
var lexador_1 = require("@designliquido/delegua/src/lexador");
var avaliador_sintatico_1 = require("@designliquido/delegua/src/avaliador-sintatico");
var resolvedor_1 = require("@designliquido/delegua/src/resolvedor");
var interpretador_1 = require("@designliquido/delegua/src/interpretador");
var tiposDeSimbolos_1 = __importDefault(require("@designliquido/delegua/src/tiposDeSimbolos"));
var Delegua = /** @class */ (function () {
    function Delegua(nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
    }
    Delegua.prototype.runBlock = function (codigo) {
        var interpretador = new interpretador_1.Interpretador(this, process.cwd());
        var lexer = new lexador_1.Lexer(this);
        var simbolos = lexer.mapear(codigo);
        if (this.teveErro)
            return;
        var analisar = new avaliador_sintatico_1.Parser(this);
        var declaracoes = analisar.analisar(simbolos);
        if (this.teveErro)
            return;
        var resolver = new resolvedor_1.Resolver(this, interpretador);
        resolver.resolver(declaracoes);
        if (this.teveErro)
            return;
        interpretador.interpretar(declaracoes);
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === tiposDeSimbolos_1["default"].EOF) {
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
},{"@designliquido/delegua/src/avaliador-sintatico":5,"@designliquido/delegua/src/interpretador":58,"@designliquido/delegua/src/lexador":60,"@designliquido/delegua/src/resolvedor":63,"@designliquido/delegua/src/tiposDeSimbolos":65,"_process":68}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambiente = void 0;
var excecoes_1 = require("./excecoes");
var Ambiente = /** @class */ (function () {
    function Ambiente(enclosing) {
        this.enclosing = enclosing || null;
        this.valores = {};
    }
    Ambiente.prototype.definirVariavel = function (nomeVariavel, valor) {
        this.valores[nomeVariavel] = valor;
    };
    Ambiente.prototype.atribuirVariavelEm = function (distancia, nome, valor) {
        this.ancestor(distancia).valores[nome.lexema] = valor;
    };
    Ambiente.prototype.atribuirVariavel = function (nome, valor) {
        if (this.valores[nome.lexema] !== undefined) {
            this.valores[nome.lexema] = valor;
            return;
        }
        if (this.enclosing != null) {
            this.enclosing.atribuirVariavel(nome, valor);
            return;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(nome, "Variável não definida '" + nome.lexema + "'.");
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
    return Ambiente;
}());
exports.Ambiente = Ambiente;
;

},{"./excecoes":55}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserEguaClassico = void 0;
var tiposDeSimbolos_1 = require("../../tiposDeSimbolos");
var construtos_1 = require("../../construtos");
var erros_avaliador_1 = require("../erros-avaliador");
var declaracoes_1 = require("../../declaracoes");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 */
var ParserEguaClassico = /** @class */ (function () {
    function ParserEguaClassico(Delegua, simbolos) {
        this.simbolos = simbolos;
        this.Delegua = Delegua;
        this.atual = 0;
        this.ciclos = 0;
    }
    ParserEguaClassico.prototype.sincronizar = function () {
        this.avancar();
        while (!this.estaNoFinal()) {
            if (this.voltar().tipo === tiposDeSimbolos_1.default.PONTO_E_VIRGULA)
                return;
            switch (this.simboloAtual().tipo) {
                case tiposDeSimbolos_1.default.CLASSE:
                case tiposDeSimbolos_1.default.FUNÇÃO:
                case tiposDeSimbolos_1.default.VARIAVEL:
                case tiposDeSimbolos_1.default.PARA:
                case tiposDeSimbolos_1.default.SE:
                case tiposDeSimbolos_1.default.ENQUANTO:
                case tiposDeSimbolos_1.default.ESCREVA:
                case tiposDeSimbolos_1.default.RETORNA:
                    return;
            }
            this.avancar();
        }
    };
    ParserEguaClassico.prototype.erro = function (simbolo, mensagemDeErro) {
        this.Delegua.erro(simbolo, mensagemDeErro);
        return new erros_avaliador_1.ErroAvaliador();
    };
    ParserEguaClassico.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificar(tipo))
            return this.avancar();
        else
            throw this.erro(this.simboloAtual(), mensagemDeErro);
    };
    ParserEguaClassico.prototype.verificar = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    };
    ParserEguaClassico.prototype.verificarProximo = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    ParserEguaClassico.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    ParserEguaClassico.prototype.voltar = function () {
        return this.simbolos[this.atual - 1];
    };
    ParserEguaClassico.prototype.procurar = function (posicao) {
        return this.simbolos[this.atual + posicao];
    };
    ParserEguaClassico.prototype.estaNoFinal = function () {
        return this.simboloAtual().tipo === tiposDeSimbolos_1.default.EOF;
    };
    ParserEguaClassico.prototype.avancar = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.voltar();
    };
    ParserEguaClassico.prototype.verificarSeSimboloAtualEIgualA = function () {
        var argumentos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argumentos[_i] = arguments[_i];
        }
        for (var i = 0; i < argumentos.length; i++) {
            var tipoAtual = argumentos[i];
            if (this.verificar(tipoAtual)) {
                this.avancar();
                return true;
            }
        }
        return false;
    };
    ParserEguaClassico.prototype.primario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SUPER)) {
            var palavraChave = this.voltar();
            this.consumir(tiposDeSimbolos_1.default.PONTO, "Esperado '.' após 'super'.");
            var metodo = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do método da SuperClasse.");
            return new construtos_1.Super(palavraChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO)) {
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor([]);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_DIREITO)) {
                var valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !== tiposDeSimbolos_1.default.COLCHETE_DIREITO) {
                    this.consumir(tiposDeSimbolos_1.default.VIRGULA, "Esperado vírgula antes da próxima expressão.");
                }
            }
            return new construtos_1.Vetor(valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_ESQUERDA)) {
            var chaves = [];
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario([], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA)) {
                var chave = this.atribuir();
                this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                var valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== tiposDeSimbolos_1.default.CHAVE_DIREITA) {
                    this.consumir(tiposDeSimbolos_1.default.VIRGULA, "Esperado vírgula antes da próxima expressão.");
                }
            }
            return new construtos_1.Dicionario(chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FUNÇÃO))
            return this.corpoDaFuncao("função");
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FALSO))
            return new construtos_1.Literal(false);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VERDADEIRO))
            return new construtos_1.Literal(true);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NULO))
            return new construtos_1.Literal(null);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ISTO))
            return new construtos_1.Isto(this.voltar());
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NUMERO, tiposDeSimbolos_1.default.TEXTO)) {
            return new construtos_1.Literal(this.voltar().literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.voltar());
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO)) {
            var expr = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Grouping(expr);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), "Esperado expressão.");
    };
    ParserEguaClassico.prototype.finalizarChamada = function (callee) {
        var argumentos = [];
        if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), "Não pode haver mais de 255 argumentos.");
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VIRGULA));
        }
        var parenteseDireito = this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Call(callee, parenteseDireito, argumentos);
    };
    ParserEguaClassico.prototype.chamar = function () {
        var expr = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO)) {
                expr = this.finalizarChamada(expr);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PONTO)) {
                var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expr = new construtos_1.Get(expr, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO)) {
                var indice = this.expressao();
                var closeBracket = this.consumir(tiposDeSimbolos_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expr = new construtos_1.Subscript(expr, indice, closeBracket);
            }
            else {
                break;
            }
        }
        return expr;
    };
    ParserEguaClassico.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NEGACAO, tiposDeSimbolos_1.default.SUBTRACAO, tiposDeSimbolos_1.default.BIT_NOT)) {
            var operador = this.voltar();
            var direito = this.unario();
            return new construtos_1.Unario(operador, direito);
        }
        return this.chamar();
    };
    ParserEguaClassico.prototype.exponenciacao = function () {
        var expr = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.EXPONENCIACAO)) {
            var operador = this.voltar();
            var direito = this.unario();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.multiplicar = function () {
        var expr = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.DIVISAO, tiposDeSimbolos_1.default.MULTIPLICACAO, tiposDeSimbolos_1.default.MODULO)) {
            var operador = this.voltar();
            var direito = this.exponenciacao();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.adicionar = function () {
        var expr = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SUBTRACAO, tiposDeSimbolos_1.default.ADICAO)) {
            var operador = this.voltar();
            var direito = this.multiplicar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.bitFill = function () {
        var expr = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MENOR_MENOR, tiposDeSimbolos_1.default.MAIOR_MAIOR)) {
            var operador = this.voltar();
            var direito = this.adicionar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.bitE = function () {
        var expr = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.BIT_AND)) {
            var operador = this.voltar();
            var direito = this.bitFill();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.bitOu = function () {
        var expr = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.BIT_OR, tiposDeSimbolos_1.default.BIT_XOR)) {
            var operador = this.voltar();
            var direito = this.bitE();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.comparar = function () {
        var expr = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MAIOR, tiposDeSimbolos_1.default.MAIOR_IGUAL, tiposDeSimbolos_1.default.MENOR, tiposDeSimbolos_1.default.MENOR_IGUAL)) {
            var operador = this.voltar();
            var direito = this.bitOu();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.comparacaoIgualdade = function () {
        var expr = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.DIFERENTE, tiposDeSimbolos_1.default.IGUAL_IGUAL)) {
            var operador = this.voltar();
            var direito = this.comparar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.em = function () {
        var expr = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.EM)) {
            var operador = this.voltar();
            var direito = this.comparacaoIgualdade();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.e = function () {
        var expr = this.em();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.E)) {
            var operador = this.voltar();
            var direito = this.em();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.ou = function () {
        var expr = this.e();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.OU)) {
            var operador = this.voltar();
            var direito = this.e();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    ParserEguaClassico.prototype.atribuir = function () {
        var expr = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL)) {
            var igual = this.voltar();
            var valor = this.atribuir();
            if (expr instanceof construtos_1.Variavel) {
                var nome = expr.nome;
                return new construtos_1.Atribuir(nome, valor);
            }
            else if (expr instanceof construtos_1.Get) {
                var get = expr;
                return new construtos_1.Conjunto(get.objeto, get.nome, valor);
            }
            else if (expr instanceof construtos_1.Subscript) {
                return new construtos_1.AtribuicaoSobrescrita(expr.callee, expr.indice, valor);
            }
            this.erro(igual, "Tarefa de atribuição inválida");
        }
        return expr;
    };
    ParserEguaClassico.prototype.expressao = function () {
        return this.atribuir();
    };
    ParserEguaClassico.prototype.declaracaoMostrar = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var valor = this.expressao();
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após o valor.");
        return new declaracoes_1.Escreva(valor);
    };
    ParserEguaClassico.prototype.declaracaoExpressao = function () {
        var expr = this.expressao();
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após expressão.");
        return new declaracoes_1.Expressao(expr);
    };
    ParserEguaClassico.prototype.blocoEscopo = function () {
        var declaracoes = [];
        while (!this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    };
    ParserEguaClassico.prototype.declaracaoSe = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var thenBranch = this.resolverDeclaracao();
        var elifBranches = [];
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENÃOSE)) {
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senãose'.");
            var elifCondition = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' apóes codição do 'senãose.");
            var branch = this.resolverDeclaracao();
            elifBranches.push({
                condition: elifCondition,
                branch: branch,
            });
        }
        var elseBranch = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENÃO)) {
            elseBranch = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, thenBranch, elifBranches, elseBranch);
    };
    ParserEguaClassico.prototype.declaracaoEnquanto = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            var condicao = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    ParserEguaClassico.prototype.declaracaoPara = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            var inicializador = void 0;
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            var condicao = null;
            if (!this.verificar(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após valores da condicional");
            var incrementar = null;
            if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    ParserEguaClassico.prototype.declaracaoInterromper = function () {
        if (this.ciclos < 1) {
            this.erro(this.voltar(), "'pausa' deve estar dentro de um loop.");
        }
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'pausa'.");
        return new declaracoes_1.Pausa();
    };
    ParserEguaClassico.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.voltar(), "'continua' precisa estar em um laço de repetição.");
        }
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'continua'.");
        return new declaracoes_1.Continua();
    };
    ParserEguaClassico.prototype.declaracaoRetorna = function () {
        var palavraChave = this.voltar();
        var valor = null;
        if (!this.verificar(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após o retorno.");
        return new declaracoes_1.Retorna(palavraChave, valor);
    };
    ParserEguaClassico.prototype.declaracaoEscolha = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            var condicao = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            var branches = [];
            var defaultBranch = null;
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
                !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CASO)) {
                    var branchConditions = [this.expressao()];
                    this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificar(tiposDeSimbolos_1.default.CASO)) {
                        this.consumir(tiposDeSimbolos_1.default.CASO, null);
                        branchConditions.push(this.expressao());
                        this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var stmts = [];
                    do {
                        stmts.push(this.resolverDeclaracao());
                    } while (!this.verificar(tiposDeSimbolos_1.default.CASO) &&
                        !this.verificar(tiposDeSimbolos_1.default.PADRAO) &&
                        !this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA));
                    branches.push({
                        conditions: branchConditions,
                        stmts: stmts,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PADRAO)) {
                    if (defaultBranch !== null)
                        throw new erros_avaliador_1.ErroAvaliador("Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                    this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    var stmts = [];
                    do {
                        stmts.push(this.resolverDeclaracao());
                    } while (!this.verificar(tiposDeSimbolos_1.default.CASO) &&
                        !this.verificar(tiposDeSimbolos_1.default.PADRAO) &&
                        !this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA));
                    defaultBranch = {
                        stmts: stmts,
                    };
                }
            }
            return new declaracoes_1.Escolha(condicao, branches, defaultBranch);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    ParserEguaClassico.prototype.declaracaoImportar = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var closeBracket = this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, closeBracket);
    };
    ParserEguaClassico.prototype.declaracaoTentar = function () {
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        var tryBlock = this.blocoEscopo();
        var catchBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PEGUE)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            catchBlock = this.blocoEscopo();
        }
        var elseBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENÃO)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            elseBlock = this.blocoEscopo();
        }
        var finallyBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FINALMENTE)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            finallyBlock = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(tryBlock, catchBlock, elseBlock, finallyBlock);
    };
    ParserEguaClassico.prototype.declaracaoFazer = function () {
        try {
            this.ciclos += 1;
            var doBranch = this.resolverDeclaracao();
            this.consumir(tiposDeSimbolos_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            var whileCondition = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(doBranch, whileCondition);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    ParserEguaClassico.prototype.resolverDeclaracao = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.TENTE))
            return this.declaracaoTentar();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PAUSA))
            return this.declaracaoInterromper();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ESCREVA))
            return this.declaracaoMostrar();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_ESQUERDA))
            return new declaracoes_1.Bloco(this.blocoEscopo());
        return this.declaracaoExpressao();
    };
    ParserEguaClassico.prototype.declaracaoDeVariavel = function () {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome de variável.");
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL)) {
            inicializador = this.expressao();
        }
        this.consumir(tiposDeSimbolos_1.default.PONTO_E_VIRGULA, "Esperado ';' após a declaração da variável.");
        return new declaracoes_1.Var(nome, inicializador);
    };
    ParserEguaClassico.prototype.funcao = function (kind) {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome ".concat(kind, "."));
        return new declaracoes_1.Funcao(nome, this.corpoDaFuncao(kind));
    };
    ParserEguaClassico.prototype.corpoDaFuncao = function (kind) {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(kind, "."));
        var parametros = [];
        if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (parametros.length >= 255) {
                    this.erro(this.simboloAtual(), "Não pode haver mais de 255 parâmetros");
                }
                var paramObj = {};
                if (this.simboloAtual().tipo === tiposDeSimbolos_1.default.MULTIPLICACAO) {
                    this.consumir(tiposDeSimbolos_1.default.MULTIPLICACAO, null);
                    paramObj["tipo"] = "wildcard";
                }
                else {
                    paramObj["tipo"] = "standard";
                }
                paramObj["nome"] = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do parâmetro.");
                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL)) {
                    paramObj["default"] = this.primario();
                }
                parametros.push(paramObj);
                if (paramObj["tipo"] === "wildcard")
                    break;
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VIRGULA));
        }
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do ".concat(kind, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(parametros, corpo);
    };
    ParserEguaClassico.prototype.declaracaoDeClasse = function () {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome da classe.");
        var superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.HERDA)) {
            this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome da SuperClasse.");
            superClasse = new construtos_1.Variavel(this.voltar());
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        var metodos = [];
        while (!this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            metodos.push(this.funcao("método"));
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(nome, superClasse, metodos);
    };
    ParserEguaClassico.prototype.declaracao = function () {
        try {
            if (this.verificar(tiposDeSimbolos_1.default.FUNÇÃO) &&
                this.verificarProximo(tiposDeSimbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tiposDeSimbolos_1.default.FUNÇÃO, null);
                return this.funcao("função");
            }
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    };
    ParserEguaClassico.prototype.analisar = function (simbolos) {
        this.atual = 0;
        this.ciclos = 0;
        if (simbolos) {
            this.simbolos = simbolos;
        }
        var declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        return declaracoes;
    };
    return ParserEguaClassico;
}());
exports.ParserEguaClassico = ParserEguaClassico;

},{"../../construtos":18,"../../declaracoes":37,"../../tiposDeSimbolos":65,"../erros-avaliador":4}],4:[function(require,module,exports){
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
exports.ErroAvaliador = void 0;
var ErroAvaliador = /** @class */ (function (_super) {
    __extends(ErroAvaliador, _super);
    function ErroAvaliador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErroAvaliador;
}(Error));
exports.ErroAvaliador = ErroAvaliador;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var tiposDeSimbolos_1 = require("../tiposDeSimbolos");
var construtos_1 = require("../construtos");
var erros_avaliador_1 = require("./erros-avaliador");
var declaracoes_1 = require("../declaracoes");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 */
var Parser = /** @class */ (function () {
    function Parser(Delegua, simbolos) {
        this.simbolos = simbolos;
        this.Delegua = Delegua;
        this.atual = 0;
        this.ciclos = 0;
    }
    Parser.prototype.sincronizar = function () {
        this.avancar();
        while (!this.estaNoFinal()) {
            if (this.voltar().tipo === tiposDeSimbolos_1.default.PONTO_E_VIRGULA)
                return;
            switch (this.simboloAtual().tipo) {
                case tiposDeSimbolos_1.default.CLASSE:
                case tiposDeSimbolos_1.default.FUNCAO:
                case tiposDeSimbolos_1.default.FUNÇÃO:
                case tiposDeSimbolos_1.default.VARIAVEL:
                case tiposDeSimbolos_1.default.PARA:
                case tiposDeSimbolos_1.default.SE:
                case tiposDeSimbolos_1.default.ENQUANTO:
                case tiposDeSimbolos_1.default.ESCREVA:
                case tiposDeSimbolos_1.default.RETORNA:
                    return;
            }
            this.avancar();
        }
    };
    Parser.prototype.erro = function (simbolo, mensagemDeErro) {
        this.Delegua.erro(simbolo, mensagemDeErro);
        return new erros_avaliador_1.ErroAvaliador();
    };
    Parser.prototype.consumir = function (tipo, mensagemDeErro) {
        if (this.verificar(tipo))
            return this.avancar();
        throw this.erro(this.simboloAtual(), mensagemDeErro);
    };
    Parser.prototype.verificar = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    };
    Parser.prototype.verificarProximo = function (tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    };
    Parser.prototype.simboloAtual = function () {
        return this.simbolos[this.atual];
    };
    Parser.prototype.voltar = function () {
        return this.simbolos[this.atual - 1];
    };
    Parser.prototype.procurar = function (posicao) {
        return this.simbolos[this.atual + posicao];
    };
    Parser.prototype.estaNoFinal = function () {
        var simboloAtual = this.simboloAtual();
        if (simboloAtual && simboloAtual.tipo === tiposDeSimbolos_1.default.PONTO_E_VIRGULA) {
            return true;
        }
        return this.atual === this.simbolos.length;
    };
    Parser.prototype.avancar = function () {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.voltar();
    };
    Parser.prototype.verificarSeSimboloAtualEIgualA = function () {
        var argumentos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argumentos[_i] = arguments[_i];
        }
        for (var i = 0; i < argumentos.length; i++) {
            var tipoAtual = argumentos[i];
            if (this.verificar(tipoAtual)) {
                this.avancar();
                return true;
            }
        }
        return false;
    };
    Parser.prototype.primario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SUPER)) {
            var palavraChave = this.voltar();
            this.consumir(tiposDeSimbolos_1.default.PONTO, "Esperado '.' após 'super'.");
            var metodo = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do método da SuperClasse.");
            return new construtos_1.Super(palavraChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO)) {
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor([]);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_DIREITO)) {
                var valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !== tiposDeSimbolos_1.default.COLCHETE_DIREITO) {
                    this.consumir(tiposDeSimbolos_1.default.VIRGULA, "Esperado vírgula antes da próxima expressão.");
                }
            }
            return new construtos_1.Vetor(valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_ESQUERDA)) {
            var chaves = [];
            var valores = [];
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario([], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA)) {
                var chave = this.atribuir();
                this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                var valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== tiposDeSimbolos_1.default.CHAVE_DIREITA) {
                    this.consumir(tiposDeSimbolos_1.default.VIRGULA, "Esperado vírgula antes da próxima expressão.");
                }
            }
            return new construtos_1.Dicionario(chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FUNÇÃO))
            return this.corpoDaFuncao("função");
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FUNCAO))
            return this.corpoDaFuncao("funcao");
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FALSO))
            return new construtos_1.Literal(false);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VERDADEIRO))
            return new construtos_1.Literal(true);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NULO))
            return new construtos_1.Literal(null);
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ISTO))
            return new construtos_1.Isto(this.voltar());
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NUMERO, tiposDeSimbolos_1.default.TEXTO)) {
            return new construtos_1.Literal(this.voltar().literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.voltar());
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO)) {
            var expr = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Grouping(expr);
        }
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), "Esperado expressão.");
    };
    Parser.prototype.finalizarChamada = function (callee) {
        var argumentos = [];
        if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), "Não pode haver mais de 255 argumentos.");
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VIRGULA));
        }
        var parenteseDireito = this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Call(callee, parenteseDireito, argumentos);
    };
    Parser.prototype.chamar = function () {
        var expr = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO)) {
                expr = this.finalizarChamada(expr);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PONTO)) {
                var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expr = new construtos_1.Get(expr, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO)) {
                var indice = this.expressao();
                var closeBracket = this.consumir(tiposDeSimbolos_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expr = new construtos_1.Subscript(expr, indice, closeBracket);
            }
            else {
                break;
            }
        }
        return expr;
    };
    Parser.prototype.unario = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.NEGACAO, tiposDeSimbolos_1.default.SUBTRACAO, tiposDeSimbolos_1.default.BIT_NOT)) {
            var operador = this.voltar();
            var direito = this.unario();
            return new construtos_1.Unario(operador, direito);
        }
        return this.chamar();
    };
    Parser.prototype.exponenciacao = function () {
        var expr = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.EXPONENCIACAO)) {
            var operador = this.voltar();
            var direito = this.unario();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.multiplicar = function () {
        var expr = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.DIVISAO, tiposDeSimbolos_1.default.MULTIPLICACAO, tiposDeSimbolos_1.default.MODULO)) {
            var operador = this.voltar();
            var direito = this.exponenciacao();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.adicionar = function () {
        var expr = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SUBTRACAO, tiposDeSimbolos_1.default.ADICAO)) {
            var operador = this.voltar();
            var direito = this.multiplicar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.bitFill = function () {
        var expr = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MENOR_MENOR, tiposDeSimbolos_1.default.MAIOR_MAIOR)) {
            var operador = this.voltar();
            var direito = this.adicionar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.bitE = function () {
        var expr = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.BIT_AND)) {
            var operador = this.voltar();
            var direito = this.bitFill();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.bitOu = function () {
        var expr = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.BIT_OR, tiposDeSimbolos_1.default.BIT_XOR)) {
            var operador = this.voltar();
            var direito = this.bitE();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.comparar = function () {
        var expr = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MAIOR, tiposDeSimbolos_1.default.MAIOR_IGUAL, tiposDeSimbolos_1.default.MENOR, tiposDeSimbolos_1.default.MENOR_IGUAL)) {
            var operador = this.voltar();
            var direito = this.bitOu();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.comparacaoIgualdade = function () {
        var expr = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.DIFERENTE, tiposDeSimbolos_1.default.IGUAL_IGUAL)) {
            var operador = this.voltar();
            var direito = this.comparar();
            expr = new construtos_1.Binario(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.em = function () {
        var expr = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.EM)) {
            var operador = this.voltar();
            var direito = this.comparacaoIgualdade();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.e = function () {
        var expr = this.em();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.E)) {
            var operador = this.voltar();
            var direito = this.em();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.ou = function () {
        var expr = this.e();
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.OU)) {
            var operador = this.voltar();
            var direito = this.e();
            expr = new construtos_1.Logical(expr, operador, direito);
        }
        return expr;
    };
    Parser.prototype.atribuir = function () {
        var expr = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MAIS_IGUAL)) {
            var igual = this.voltar();
            var valor = this.atribuir();
            if (expr instanceof construtos_1.Variavel) {
                var nome = expr.nome;
                return new construtos_1.Atribuir(nome, valor);
            }
            else if (expr instanceof construtos_1.Get) {
                var get = expr;
                return new construtos_1.Conjunto(get.objeto, get.nome, valor);
            }
            else if (expr instanceof construtos_1.Subscript) {
                return new construtos_1.AtribuicaoSobrescrita(expr.callee, expr.indice, valor);
            }
            this.erro(igual, "Tarefa de atribuição inválida");
        }
        return expr;
    };
    Parser.prototype.expressao = function () {
        return this.atribuir();
    };
    Parser.prototype.declaracaoMostrar = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        var valor = this.expressao();
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(valor);
    };
    Parser.prototype.declaracaoExpressao = function () {
        var expr = this.expressao();
        return new declaracoes_1.Expressao(expr);
    };
    Parser.prototype.blocoEscopo = function () {
        var declaracoes = [];
        while (!this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    };
    Parser.prototype.declaracaoSe = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        var condicao = this.expressao();
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        var thenBranch = this.resolverDeclaracao();
        var elifBranches = [];
        while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENAOSE, tiposDeSimbolos_1.default.SENÃOSE)) {
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senaose' ou 'senãose'.");
            var elifCondition = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após codição do 'senaose' ou 'senãose'.");
            var branch = this.resolverDeclaracao();
            elifBranches.push({
                condition: elifCondition,
                branch: branch,
            });
        }
        var elseBranch = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENAO, tiposDeSimbolos_1.default.SENÃO)) {
            elseBranch = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, thenBranch, elifBranches, elseBranch);
    };
    Parser.prototype.declaracaoEnquanto = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            var condicao = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    Parser.prototype.declaracaoPara = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            var inicializador = void 0;
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            var condicao = null;
            if (!this.verificar(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            var incrementar = null;
            if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            var corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    Parser.prototype.declaracaoInterromper = function () {
        if (this.ciclos < 1) {
            this.erro(this.voltar(), "'pausa' deve estar dentro de um loop.");
        }
        return new declaracoes_1.Pausa();
    };
    Parser.prototype.declaracaoContinua = function () {
        if (this.ciclos < 1) {
            this.erro(this.voltar(), "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua();
    };
    Parser.prototype.declaracaoRetorna = function () {
        var palavraChave = this.voltar();
        var valor = null;
        if (!this.verificar(tiposDeSimbolos_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(palavraChave, valor);
    };
    Parser.prototype.declaracaoEscolha = function () {
        try {
            this.ciclos += 1;
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            var condicao = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            var branches = [];
            var defaultBranch = null;
            while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
                !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CASO)) {
                    var branchConditions = [this.expressao()];
                    this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificar(tiposDeSimbolos_1.default.CASO)) {
                        this.consumir(tiposDeSimbolos_1.default.CASO, null);
                        branchConditions.push(this.expressao());
                        this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    var stmts = [];
                    do {
                        stmts.push(this.resolverDeclaracao());
                    } while (!this.verificar(tiposDeSimbolos_1.default.CASO) &&
                        !this.verificar(tiposDeSimbolos_1.default.PADRAO) &&
                        !this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA));
                    branches.push({
                        conditions: branchConditions,
                        stmts: stmts,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PADRAO)) {
                    if (defaultBranch !== null)
                        throw new erros_avaliador_1.ErroAvaliador("Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                    this.consumir(tiposDeSimbolos_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    var stmts = [];
                    do {
                        stmts.push(this.resolverDeclaracao());
                    } while (!this.verificar(tiposDeSimbolos_1.default.CASO) &&
                        !this.verificar(tiposDeSimbolos_1.default.PADRAO) &&
                        !this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA));
                    defaultBranch = {
                        stmts: stmts,
                    };
                }
            }
            return new declaracoes_1.Escolha(condicao, branches, defaultBranch);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    Parser.prototype.declaracaoImportar = function () {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        var caminho = this.expressao();
        var closeBracket = this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, closeBracket);
    };
    Parser.prototype.declaracaoTentar = function () {
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        var tryBlock = this.blocoEscopo();
        var catchBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PEGUE)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            catchBlock = this.blocoEscopo();
        }
        var elseBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SENAO, tiposDeSimbolos_1.default.SENÃO)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            elseBlock = this.blocoEscopo();
        }
        var finallyBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FINALMENTE)) {
            this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            finallyBlock = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(tryBlock, catchBlock, elseBlock, finallyBlock);
    };
    Parser.prototype.declaracaoFazer = function () {
        try {
            this.ciclos += 1;
            var doBranch = this.resolverDeclaracao();
            this.consumir(tiposDeSimbolos_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            var whileCondition = this.expressao();
            this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(doBranch, whileCondition);
        }
        finally {
            this.ciclos -= 1;
        }
    };
    Parser.prototype.resolverDeclaracao = function () {
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.TENTE))
            return this.declaracaoTentar();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PAUSA))
            return this.declaracaoInterromper();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.ESCREVA))
            return this.declaracaoMostrar();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CHAVE_ESQUERDA))
            return new declaracoes_1.Bloco(this.blocoEscopo());
        return this.declaracaoExpressao();
    };
    Parser.prototype.declaracaoDeVariavel = function () {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome de variável.");
        var inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.MAIS_IGUAL)) {
            inicializador = this.expressao();
        }
        return new declaracoes_1.Var(nome, inicializador);
    };
    Parser.prototype.funcao = function (tipo) {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome ".concat(tipo, "."));
        return new declaracoes_1.Funcao(nome, this.corpoDaFuncao(tipo));
    };
    Parser.prototype.corpoDaFuncao = function (tipo) {
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO, "Esperado '(' ap\u00F3s o nome ".concat(tipo, "."));
        var parametros = [];
        if (!this.verificar(tiposDeSimbolos_1.default.PARENTESE_DIREITO)) {
            do {
                if (parametros.length >= 255) {
                    this.erro(this.simboloAtual(), "Não pode haver mais de 255 parâmetros");
                }
                var paramObj = {};
                if (this.simboloAtual().tipo === tiposDeSimbolos_1.default.MULTIPLICACAO) {
                    this.consumir(tiposDeSimbolos_1.default.MULTIPLICACAO, null);
                    paramObj["tipo"] = "wildcard";
                }
                else {
                    paramObj["tipo"] = "standard";
                }
                paramObj["nome"] = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome do parâmetro.");
                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.IGUAL)) {
                    paramObj["default"] = this.primario();
                }
                parametros.push(paramObj);
                if (paramObj["tipo"] === "wildcard")
                    break;
            } while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VIRGULA));
        }
        this.consumir(tiposDeSimbolos_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do ".concat(tipo, "."));
        var corpo = this.blocoEscopo();
        return new construtos_1.Funcao(parametros, corpo);
    };
    Parser.prototype.declaracaoDeClasse = function () {
        var nome = this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome da classe.");
        var superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.HERDA)) {
            this.consumir(tiposDeSimbolos_1.default.IDENTIFICADOR, "Esperado nome da SuperClasse.");
            superClasse = new construtos_1.Variavel(this.voltar());
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        var metodos = [];
        while (!this.verificar(tiposDeSimbolos_1.default.CHAVE_DIREITA) &&
            !this.estaNoFinal()) {
            metodos.push(this.funcao("método"));
        }
        this.consumir(tiposDeSimbolos_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(nome, superClasse, metodos);
    };
    Parser.prototype.declaracao = function () {
        try {
            if (this.verificar(tiposDeSimbolos_1.default.FUNÇÃO) &&
                this.verificarProximo(tiposDeSimbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tiposDeSimbolos_1.default.FUNÇÃO, null);
                return this.funcao("função");
            }
            if (this.verificar(tiposDeSimbolos_1.default.FUNCAO) &&
                this.verificarProximo(tiposDeSimbolos_1.default.IDENTIFICADOR)) {
                this.consumir(tiposDeSimbolos_1.default.FUNCAO, null);
                return this.funcao("funcao");
            }
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    };
    Parser.prototype.analisar = function (simbolos) {
        this.atual = 0;
        this.ciclos = 0;
        if (simbolos) {
            this.simbolos = simbolos;
        }
        var declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        return declaracoes;
    };
    return Parser;
}());
exports.Parser = Parser;

},{"../construtos":18,"../declaracoes":37,"../tiposDeSimbolos":65,"./erros-avaliador":4}],6:[function(require,module,exports){
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
        if (callback.constructor.nome !== 'DeleguaFuncao') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função, deve ser uma função.");
        }
        var provisorio = [];
        for (var indice = 0; indice < array.length; ++indice) {
            provisorio.push(callback.chamar(interpretador, [array[indice]]));
        }
        return provisorio;
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

},{"../estruturas/classe":47,"../estruturas/funcao":49,"../estruturas/funcao-padrao":48,"../estruturas/instancia":50,"../excecoes":55}],7:[function(require,module,exports){
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

},{"../estruturas/funcao-padrao":48,"../estruturas/modulo":51,"../excecoes":55}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoSobrescrita = void 0;
var AtribuicaoSobrescrita = /** @class */ (function () {
    function AtribuicaoSobrescrita(objeto, indice, valor) {
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
var Atribuir = /** @class */ (function () {
    function Atribuir(nome, valor) {
        this.nome = nome;
        this.valor = valor;
    }
    Atribuir.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeAtribuicao(this);
    };
    return Atribuir;
}());
exports.Atribuir = Atribuir;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binario = void 0;
var Binario = /** @class */ (function () {
    function Binario(esquerda, operador, direita) {
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = void 0;
var Call = /** @class */ (function () {
    function Call(callee, parentese, argumentos) {
        this.callee = callee;
        this.parentese = parentese;
        this.argumentos = argumentos;
    }
    Call.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeChamada(this);
    };
    return Call;
}());
exports.Call = Call;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conjunto = void 0;
var Conjunto = /** @class */ (function () {
    function Conjunto(objeto, nome, valor) {
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
var Dicionario = /** @class */ (function () {
    function Dicionario(chaves, valores) {
        this.chaves = chaves;
        this.valores = valores;
    }
    Dicionario.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDicionario(this);
    };
    return Dicionario;
}());
exports.Dicionario = Dicionario;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcao = void 0;
var Funcao = /** @class */ (function () {
    function Funcao(parametros, corpo) {
        this.parametros = parametros;
        this.corpo = corpo;
    }
    Funcao.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoDeleguaFuncao(this);
    };
    return Funcao;
}());
exports.Funcao = Funcao;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
var Get = /** @class */ (function () {
    function Get(objeto, nome) {
        this.objeto = objeto;
        this.nome = nome;
    }
    Get.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoObter(this);
    };
    return Get;
}());
exports.Get = Get;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grouping = void 0;
var Grouping = /** @class */ (function () {
    function Grouping(expressao) {
        this.expressao = expressao;
    }
    Grouping.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoAgrupamento(this);
    };
    return Grouping;
}());
exports.Grouping = Grouping;

},{}],18:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
__exportStar(require("./call"), exports);
__exportStar(require("./conjunto"), exports);
__exportStar(require("./dicionario"), exports);
__exportStar(require("./expr"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./get"), exports);
__exportStar(require("./grouping"), exports);
__exportStar(require("./isto"), exports);
__exportStar(require("./literal"), exports);
__exportStar(require("./logical"), exports);
__exportStar(require("./subscript"), exports);
__exportStar(require("./super"), exports);
__exportStar(require("./unario"), exports);
__exportStar(require("./variavel"), exports);
__exportStar(require("./vetor"), exports);

},{"./atribuicao-sobrescrita":8,"./atribuir":9,"./binario":10,"./call":11,"./conjunto":12,"./dicionario":13,"./expr":14,"./funcao":15,"./get":16,"./grouping":17,"./isto":19,"./literal":20,"./logical":21,"./subscript":22,"./super":23,"./unario":24,"./variavel":25,"./vetor":26}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
var Isto = /** @class */ (function () {
    function Isto(palavraChave) {
        this.palavraChave = palavraChave;
    }
    Isto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoIsto(this);
    };
    return Isto;
}());
exports.Isto = Isto;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(valor) {
        this.valor = valor;
    }
    Literal.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLiteral(this);
    };
    return Literal;
}());
exports.Literal = Literal;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logical = void 0;
var Logical = /** @class */ (function () {
    function Logical(esquerda, operador, direita) {
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    Logical.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoLogica(this);
    };
    return Logical;
}());
exports.Logical = Logical;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscript = void 0;
var Subscript = /** @class */ (function () {
    function Subscript(callee, indice, closeBracket) {
        this.callee = callee;
        this.indice = indice;
        this.closeBracket = closeBracket;
    }
    Subscript.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoVetorIndice(this);
    };
    return Subscript;
}());
exports.Subscript = Subscript;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
var Super = /** @class */ (function () {
    function Super(palavraChave, metodo) {
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
    function Variavel(nome) {
        this.nome = nome;
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
    function Vetor(valores) {
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
var stmt_1 = require("./stmt");
var Bloco = /** @class */ (function (_super) {
    __extends(Bloco, _super);
    function Bloco(declaracoes) {
        var _this = _super.call(this) || this;
        _this.declaracoes = declaracoes;
        return _this;
    }
    Bloco.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoBloco(this);
    };
    return Bloco;
}(stmt_1.Stmt));
exports.Bloco = Bloco;

},{"./stmt":42}],28:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Classe = /** @class */ (function (_super) {
    __extends(Classe, _super);
    function Classe(nome, superClasse, metodos) {
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.superClasse = superClasse;
        _this.metodos = metodos;
        return _this;
    }
    Classe.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoClasse(this);
    };
    return Classe;
}(stmt_1.Stmt));
exports.Classe = Classe;

},{"./stmt":42}],29:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Continua = /** @class */ (function (_super) {
    __extends(Continua, _super);
    function Continua() {
        return _super.call(this) || this;
    }
    Continua.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoContinua(this);
    };
    return Continua;
}(stmt_1.Stmt));
exports.Continua = Continua;

},{"./stmt":42}],30:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Enquanto = /** @class */ (function (_super) {
    __extends(Enquanto, _super);
    function Enquanto(condicao, corpo) {
        var _this = _super.call(this) || this;
        _this.condicao = condicao;
        _this.corpo = corpo;
        return _this;
    }
    Enquanto.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEnquanto(this);
    };
    return Enquanto;
}(stmt_1.Stmt));
exports.Enquanto = Enquanto;

},{"./stmt":42}],31:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Escolha = /** @class */ (function (_super) {
    __extends(Escolha, _super);
    function Escolha(condicao, branches, defaultBranch) {
        var _this = _super.call(this) || this;
        _this.condicao = condicao;
        _this.branches = branches;
        _this.defaultBranch = defaultBranch;
        return _this;
    }
    Escolha.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEscolha(this);
    };
    return Escolha;
}(stmt_1.Stmt));
exports.Escolha = Escolha;

},{"./stmt":42}],32:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Escreva = /** @class */ (function (_super) {
    __extends(Escreva, _super);
    function Escreva(expressao) {
        var _this = _super.call(this) || this;
        _this.expressao = expressao;
        return _this;
    }
    Escreva.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoEscreva(this);
    };
    return Escreva;
}(stmt_1.Stmt));
exports.Escreva = Escreva;

},{"./stmt":42}],33:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Expressao = /** @class */ (function (_super) {
    __extends(Expressao, _super);
    function Expressao(expressao) {
        var _this = _super.call(this) || this;
        _this.expressao = expressao;
        return _this;
    }
    Expressao.prototype.aceitar = function (visitante) {
        return visitante.visitarDeclaracaoDeExpressao(this);
    };
    return Expressao;
}(stmt_1.Stmt));
exports.Expressao = Expressao;

},{"./stmt":42}],34:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Fazer = /** @class */ (function (_super) {
    __extends(Fazer, _super);
    function Fazer(doBranch, whileCondition) {
        var _this = _super.call(this) || this;
        _this.doBranch = doBranch;
        _this.whileCondition = whileCondition;
        return _this;
    }
    Fazer.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoFazer(this);
    };
    return Fazer;
}(stmt_1.Stmt));
exports.Fazer = Fazer;

},{"./stmt":42}],35:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Funcao = /** @class */ (function (_super) {
    __extends(Funcao, _super);
    function Funcao(nome, funcao) {
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.funcao = funcao;
        return _this;
    }
    Funcao.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoFuncao(this);
    };
    return Funcao;
}(stmt_1.Stmt));
exports.Funcao = Funcao;

},{"./stmt":42}],36:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Importar = /** @class */ (function (_super) {
    __extends(Importar, _super);
    function Importar(caminho, closeBracket) {
        var _this = _super.call(this) || this;
        _this.caminho = caminho;
        _this.closeBracket = closeBracket;
        return _this;
    }
    Importar.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoImportar(this);
    };
    return Importar;
}(stmt_1.Stmt));
exports.Importar = Importar;

},{"./stmt":42}],37:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
__exportStar(require("./pausa"), exports);
__exportStar(require("./retorna"), exports);
__exportStar(require("./se"), exports);
__exportStar(require("./stmt"), exports);
__exportStar(require("./tente"), exports);
__exportStar(require("./var"), exports);

},{"./bloco":27,"./classe":28,"./continua":29,"./enquanto":30,"./escolha":31,"./escreva":32,"./expressao":33,"./fazer":34,"./funcao":35,"./importar":36,"./para":38,"./pausa":39,"./retorna":40,"./se":41,"./stmt":42,"./tente":43,"./var":44}],38:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Para = /** @class */ (function (_super) {
    __extends(Para, _super);
    function Para(inicializador, condicao, incrementar, corpo) {
        var _this = _super.call(this) || this;
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
}(stmt_1.Stmt));
exports.Para = Para;

},{"./stmt":42}],39:[function(require,module,exports){
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
exports.Pausa = void 0;
var stmt_1 = require("./stmt");
var Pausa = /** @class */ (function (_super) {
    __extends(Pausa, _super);
    function Pausa() {
        return _super.call(this) || this;
    }
    Pausa.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoPausa(this);
    };
    return Pausa;
}(stmt_1.Stmt));
exports.Pausa = Pausa;

},{"./stmt":42}],40:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Retorna = /** @class */ (function (_super) {
    __extends(Retorna, _super);
    function Retorna(palavraChave, valor) {
        var _this = _super.call(this) || this;
        _this.palavraChave = palavraChave;
        _this.valor = valor;
        return _this;
    }
    Retorna.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoRetornar(this);
    };
    return Retorna;
}(stmt_1.Stmt));
exports.Retorna = Retorna;

},{"./stmt":42}],41:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Se = /** @class */ (function (_super) {
    __extends(Se, _super);
    function Se(condicao, thenBranch, elifBranches, elseBranch) {
        var _this = _super.call(this) || this;
        _this.condicao = condicao;
        _this.thenBranch = thenBranch;
        _this.elifBranches = elifBranches;
        _this.elseBranch = elseBranch;
        return _this;
    }
    Se.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoSe(this);
    };
    return Se;
}(stmt_1.Stmt));
exports.Se = Se;

},{"./stmt":42}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stmt = void 0;
var Stmt = /** @class */ (function () {
    function Stmt() {
    }
    Stmt.prototype.aceitar = function (visitante) { };
    return Stmt;
}());
exports.Stmt = Stmt;

},{}],43:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Tente = /** @class */ (function (_super) {
    __extends(Tente, _super);
    function Tente(tryBranch, catchBranch, elseBranch, finallyBranch) {
        var _this = _super.call(this) || this;
        _this.tryBranch = tryBranch;
        _this.catchBranch = catchBranch;
        _this.elseBranch = elseBranch;
        _this.finallyBranch = finallyBranch;
        return _this;
    }
    Tente.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoTente(this);
    };
    return Tente;
}(stmt_1.Stmt));
exports.Tente = Tente;

},{"./stmt":42}],44:[function(require,module,exports){
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
var stmt_1 = require("./stmt");
var Var = /** @class */ (function (_super) {
    __extends(Var, _super);
    function Var(nome, inicializador) {
        var _this = _super.call(this) || this;
        _this.nome = nome;
        _this.inicializador = inicializador;
        return _this;
    }
    Var.prototype.aceitar = function (visitante) {
        return visitante.visitarExpressaoVar(this);
    };
    return Var;
}(stmt_1.Stmt));
exports.Var = Var;

},{"./stmt":42}],45:[function(require,module,exports){
(function (process){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegua = void 0;
var fs = require("fs");
var caminho = require("path");
var readline = require("readline");
var lexador_1 = require("./lexador");
var avaliador_sintatico_1 = require("./avaliador-sintatico");
var resolvedor_1 = require("./resolvedor");
var interpretador_1 = require("./interpretador");
var tiposDeSimbolos_1 = require("./tiposDeSimbolos");
var excecoes_1 = require("./excecoes");
var egua_classico_1 = require("./interpretador/dialetos/egua-classico");
var egua_classico_2 = require("./resolvedor/dialetos/egua-classico");
var egua_classico_3 = require("./avaliador-sintatico/dialetos/egua-classico");
var egua_classico_4 = require("./lexador/dialetos/egua-classico");
var Delegua = /** @class */ (function () {
    function Delegua(dialeto, nomeArquivo) {
        if (dialeto === void 0) { dialeto = 'delegua'; }
        this.nomeArquivo = nomeArquivo;
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
        this.dialeto = dialeto;
        switch (this.dialeto) {
            case 'egua':
                this.interpretador = new egua_classico_1.InterpretadorEguaClassico(this, process.cwd());
                this.lexador = new egua_classico_4.LexerEguaClassico(this);
                this.avaliadorSintatico = new egua_classico_3.ParserEguaClassico(this);
                this.resolvedor = new egua_classico_2.ResolverEguaClassico(this, this.interpretador);
                console.log('Usando dialeto: Égua');
                break;
            case 'eguac':
                this.interpretador = new interpretador_1.Interpretador(this, process.cwd());
                this.lexador = new lexador_1.Lexer(this);
                this.avaliadorSintatico = new avaliador_sintatico_1.Parser(this);
                this.resolvedor = new resolvedor_1.Resolver(this, this.interpretador);
                console.log('Usando dialeto: ÉguaC');
                break;
            case 'eguap':
                this.interpretador = new interpretador_1.Interpretador(this, process.cwd());
                this.lexador = new lexador_1.Lexer(this);
                this.avaliadorSintatico = new avaliador_sintatico_1.Parser(this);
                this.resolvedor = new resolvedor_1.Resolver(this, this.interpretador);
                console.log('Usando dialeto: ÉguaP');
                break;
            default:
                this.interpretador = new interpretador_1.Interpretador(this, process.cwd());
                this.lexador = new lexador_1.Lexer(this);
                this.avaliadorSintatico = new avaliador_sintatico_1.Parser(this);
                this.resolvedor = new resolvedor_1.Resolver(this, this.interpretador);
                console.log('Usando dialeto: padrão');
                break;
        }
    }
    Delegua.prototype.versao = function () {
        try {
            var manifesto = caminho.resolve('package.json');
            return JSON.parse(fs.readFileSync(manifesto, { encoding: 'utf8' })).version || '0.1';
        }
        catch (error) {
            return '0.1 (desenvolvimento)';
        }
    };
    Delegua.prototype.iniciarDelegua = function () {
        var _this = this;
        console.log("Console da Linguagem Del\u00E9gua v".concat(this.versao()));
        console.log('Pressione Ctrl + C para sair');
        var leiaLinha = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "\ndelegua> "
        });
        leiaLinha.prompt();
        leiaLinha.on("line", function (linha) {
            _this.teveErro = false;
            _this.teveErroEmTempoDeExecucao = false;
            _this.executar(linha);
            leiaLinha.prompt();
        });
    };
    Delegua.prototype.carregarArquivo = function (nomeArquivo) {
        this.nomeArquivo = caminho.basename(nomeArquivo);
        var dadosDoArquivo = fs.readFileSync(nomeArquivo).toString();
        this.executar(dadosDoArquivo);
        if (this.teveErro)
            process.exit(65);
        if (this.teveErroEmTempoDeExecucao)
            process.exit(70);
    };
    Delegua.prototype.executar = function (codigo) {
        var simbolos = this.lexador.mapear(codigo);
        if (this.teveErro)
            return;
        var declaracoes = this.avaliadorSintatico.analisar(simbolos);
        if (this.teveErro)
            return;
        this.resolvedor.resolver(declaracoes);
        if (this.teveErro)
            return;
        this.interpretador.interpretar(declaracoes);
    };
    Delegua.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "] Erro").concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    Delegua.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === tiposDeSimbolos_1.default.EOF) {
            this.reportar(simbolo.linha, " no final", mensagemDeErro);
        }
        else {
            this.reportar(simbolo.linha, " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    Delegua.prototype.erroNoLexador = function (linha, caractere, mensagem) {
        this.reportar(linha, " no '".concat(caractere, "'"), mensagem);
    };
    Delegua.prototype.erroEmTempoDeExecucao = function (erro) {
        if (erro & erro.simbolo && erro.simbolo.linha) {
            if (this.nomeArquivo)
                console.error("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "] ").concat(erro.mensagem));
            else
                console.error("Erro: [Linha: ".concat(erro.simbolo.linha, "] ").concat(erro.mensagem));
        }
        else if (!(erro instanceof excecoes_1.ReturnException)) { // TODO: Ao se livrar de ReturnException, remover isto.
            console.error("Erro: ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return Delegua;
}());
exports.Delegua = Delegua;

}).call(this)}).call(this,require('_process'))
},{"./avaliador-sintatico":5,"./avaliador-sintatico/dialetos/egua-classico":3,"./excecoes":55,"./interpretador":58,"./interpretador/dialetos/egua-classico":57,"./lexador":60,"./lexador/dialetos/egua-classico":59,"./resolvedor":63,"./resolvedor/dialetos/egua-classico":61,"./tiposDeSimbolos":65,"_process":68,"fs":66,"path":67,"readline":66}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callable = void 0;
var Callable = /** @class */ (function () {
    function Callable() {
    }
    Callable.prototype.aridade = function () {
        return this.valorAridade;
    };
    Callable.prototype.chamar = function (interpretador, argumentos, simbolo) {
        throw new Error("Este método não deveria ser chamado.");
    };
    return Callable;
}());
exports.Callable = Callable;

},{}],47:[function(require,module,exports){
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
var callable_1 = require("./callable");
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
}(callable_1.Callable));
exports.DeleguaClasse = DeleguaClasse;

},{"./callable":46,"./instancia":50}],48:[function(require,module,exports){
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
var callable_1 = require("./callable");
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
}(callable_1.Callable));
exports.FuncaoPadrao = FuncaoPadrao;

},{"./callable":46}],49:[function(require,module,exports){
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
var callable_1 = require("./callable");
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
            if (erro instanceof excecoes_1.ReturnException) {
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
}(callable_1.Callable));
exports.DeleguaFuncao = DeleguaFuncao;

},{"../ambiente":2,"../excecoes":55,"./callable":46}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaInstancia = void 0;
var excecoes_1 = require("../excecoes");
var DeleguaInstancia = /** @class */ (function () {
    function DeleguaInstancia(criarClasse) {
        this.criarClasse = criarClasse;
        this.campos = {};
    }
    DeleguaInstancia.prototype.get = function (nome) {
        if (this.campos.hasOwnProperty(nome.lexema)) {
            return this.campos[nome.lexema];
        }
        var metodo = this.criarClasse.encontrarMetodo(nome.lexema);
        if (metodo)
            return metodo.definirEscopo(this);
        throw new excecoes_1.ErroEmTempoDeExecucao(nome, "Método indefinido não recuperado.");
    };
    DeleguaInstancia.prototype.set = function (nome, valor) {
        this.campos[nome.lexema] = valor;
    };
    DeleguaInstancia.prototype.toString = function () {
        return "<Objeto " + this.criarClasse.nome + ">";
    };
    return DeleguaInstancia;
}());
exports.DeleguaInstancia = DeleguaInstancia;

},{"../excecoes":55}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaModulo = void 0;
var DeleguaModulo = /** @class */ (function () {
    function DeleguaModulo(nome) {
        if (nome)
            this.nome = nome;
    }
    DeleguaModulo.prototype.toString = function () {
        return this.nome ? "<modulo ".concat(this.nome, ">") : "<modulo>";
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
exports.BreakException = void 0;
var BreakException = /** @class */ (function (_super) {
    __extends(BreakException, _super);
    function BreakException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BreakException;
}(Error));
exports.BreakException = BreakException;

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
exports.ContinueException = void 0;
var ContinueException = /** @class */ (function (_super) {
    __extends(ContinueException, _super);
    function ContinueException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContinueException;
}(Error));
exports.ContinueException = ContinueException;

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
exports.ErroEmTempoDeExecucao = void 0;
var ErroEmTempoDeExecucao = /** @class */ (function (_super) {
    __extends(ErroEmTempoDeExecucao, _super);
    function ErroEmTempoDeExecucao(simbolo, mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.simbolo = simbolo;
        _this.mensagem = mensagem;
        Object.setPrototypeOf(_this, ErroEmTempoDeExecucao.prototype);
        return _this;
    }
    return ErroEmTempoDeExecucao;
}(Error));
exports.ErroEmTempoDeExecucao = ErroEmTempoDeExecucao;

},{}],55:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./break-exception"), exports);
__exportStar(require("./continue-exception"), exports);
__exportStar(require("./erro-em-tempo-de-execucao"), exports);
__exportStar(require("./return-exception"), exports);

},{"./break-exception":52,"./continue-exception":53,"./erro-em-tempo-de-execucao":54,"./return-exception":56}],56:[function(require,module,exports){
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
exports.ReturnException = void 0;
var ReturnException = /** @class */ (function (_super) {
    __extends(ReturnException, _super);
    function ReturnException(valor) {
        var _this = _super.call(this, valor) || this;
        _this.valor = valor;
        Object.setPrototypeOf(_this, ReturnException.prototype);
        return _this;
    }
    return ReturnException;
}(Error));
exports.ReturnException = ReturnException;

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorEguaClassico = void 0;
var tiposDeSimbolos_1 = require("../../tiposDeSimbolos");
var ambiente_1 = require("../../ambiente");
var delegua_1 = require("../../delegua");
var biblioteca_global_1 = require("../../bibliotecas/biblioteca-global");
var caminho = require("path");
var fs = require("fs");
var importar_biblioteca_1 = require("../../bibliotecas/importar-biblioteca");
var callable_1 = require("../../estruturas/callable");
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
        this.global = (0, biblioteca_global_1.default)(this, this.global);
    }
    InterpretadorEguaClassico.prototype.resolver = function (expr, depth) {
        this.locais.set(expr, depth);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoLiteral = function (expr) {
        return expr.valor;
    };
    InterpretadorEguaClassico.prototype.avaliar = function (expr) {
        if (expr.aceitar) {
            return expr.aceitar(this);
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAgrupamento = function (expr) {
        return this.avaliar(expr.expressao);
    };
    InterpretadorEguaClassico.prototype.eVerdadeiro = function (objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === "boolean")
            return Boolean(objeto);
        return true;
    };
    InterpretadorEguaClassico.prototype.verificarOperandoNumero = function (operador, operand) {
        if (typeof operand === "number")
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, "Operador precisa ser um número.");
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoUnaria = function (expr) {
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tiposDeSimbolos_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expr.operador, direita);
                return -direita;
            case tiposDeSimbolos_1.default.NEGACAO:
                return !this.eVerdadeiro(direita);
            case tiposDeSimbolos_1.default.BIT_NOT:
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
        if (typeof direita === "number" && typeof esquerda === "number")
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, "Operadores precisam ser números.");
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoBinaria = function (expr) {
        var esquerda = this.avaliar(expr.esquerda);
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tiposDeSimbolos_1.default.EXPONENCIACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Math.pow(esquerda, direita);
            case tiposDeSimbolos_1.default.MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) > Number(direita);
            case tiposDeSimbolos_1.default.MAIOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >= Number(direita);
            case tiposDeSimbolos_1.default.MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) < Number(direita);
            case tiposDeSimbolos_1.default.MENOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) <= Number(direita);
            case tiposDeSimbolos_1.default.SUBTRACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) - Number(direita);
            case tiposDeSimbolos_1.default.ADICAO:
                if (typeof esquerda === "number" && typeof direita === "number") {
                    return Number(esquerda) + Number(direita);
                }
                else if (typeof esquerda === "string" &&
                    typeof direita === "string") {
                    return String(esquerda) + String(direita);
                }
                throw new excecoes_1.ErroEmTempoDeExecucao(expr.operador, "Operadores precisam ser dois números ou duas strings.");
            case tiposDeSimbolos_1.default.DIVISAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) / Number(direita);
            case tiposDeSimbolos_1.default.MULTIPLICACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) * Number(direita);
            case tiposDeSimbolos_1.default.MODULO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) % Number(direita);
            case tiposDeSimbolos_1.default.BIT_AND:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) & Number(direita);
            case tiposDeSimbolos_1.default.BIT_XOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) ^ Number(direita);
            case tiposDeSimbolos_1.default.BIT_OR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) | Number(direita);
            case tiposDeSimbolos_1.default.MENOR_MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) << Number(direita);
            case tiposDeSimbolos_1.default.MAIOR_MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >> Number(direita);
            case tiposDeSimbolos_1.default.DIFERENTE:
                return !this.eIgual(esquerda, direita);
            case tiposDeSimbolos_1.default.IGUAL_IGUAL:
                return this.eIgual(esquerda, direita);
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeChamada = function (expr) {
        var callee = this.avaliar(expr.callee);
        var argumentos = [];
        for (var i = 0; i < expr.argumentos.length; i++) {
            argumentos.push(this.avaliar(expr.argumentos[i]));
        }
        if (!(callee instanceof callable_1.Callable)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.parentese, "Só pode chamar função ou classe.");
        }
        var parametros;
        if (callee instanceof funcao_1.DeleguaFuncao) {
            parametros = callee.declaracao.parametros;
        }
        else if (callee instanceof classe_1.DeleguaClasse) {
            parametros = callee.metodos.init
                ? callee.metodos.init.declaracao.parametros
                : [];
        }
        else {
            parametros = [];
        }
        // Isso aqui completa os parâmetros não preenchidos com nulos.
        if (argumentos.length < callee.aridade()) {
            var diferenca = callee.aridade() - argumentos.length;
            for (var i = 0; i < diferenca; i++) {
                argumentos.push(null);
            }
        }
        else {
            if (parametros &&
                parametros.length > 0 &&
                parametros[parametros.length - 1]["tipo"] === "wildcard") {
                var novosArgumentos = argumentos.slice(0, parametros.length - 1);
                novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                argumentos = novosArgumentos;
            }
        }
        if (callee instanceof funcao_padrao_1.FuncaoPadrao) {
            return callee.chamar(this, argumentos, expr.callee.nome);
        }
        return callee.chamar(this, argumentos);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeAtribuicao = function (expr) {
        var valor = this.avaliar(expr.valor);
        var distancia = this.locais.get(expr);
        if (distancia !== undefined) {
            this.ambiente.atribuirVariavelEm(distancia, expr.nome, valor);
        }
        else {
            this.ambiente.atribuirVariavel(expr.nome, valor);
        }
        return valor;
    };
    InterpretadorEguaClassico.prototype.procurarVariavel = function (nome, expr) {
        var distancia = this.locais.get(expr);
        if (distancia !== undefined) {
            return this.ambiente.obterVariavelEm(distancia, nome.lexema);
        }
        else {
            return this.global.obterVariavel(nome);
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeVariavel = function (expr) {
        return this.procurarVariavel(expr.nome, expr);
    };
    InterpretadorEguaClassico.prototype.visitarDeclaracaoDeExpressao = function (stmt) {
        return this.avaliar(stmt.expressao);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoLogica = function (expr) {
        var esquerda = this.avaliar(expr.esquerda);
        if (expr.operador.tipo === tiposDeSimbolos_1.default.EM) {
            var direita = this.avaliar(expr.direita);
            if (Array.isArray(direita) || typeof direita === "string") {
                return direita.includes(esquerda);
            }
            else if (direita.constructor === Object) {
                return esquerda in direita;
            }
            else {
                throw new excecoes_1.ErroEmTempoDeExecucao("Tipo de chamada inválida com 'em'.");
            }
        }
        // se um estado for verdadeiro, retorna verdadeiro
        if (expr.operador.tipo === tiposDeSimbolos_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expr.operador.tipo === tiposDeSimbolos_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return this.avaliar(expr.direita);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoSe = function (stmt) {
        if (this.eVerdadeiro(this.avaliar(stmt.condicao))) {
            this.executar(stmt.thenBranch);
            return null;
        }
        for (var i = 0; i < stmt.elifBranches.length; i++) {
            var atual = stmt.elifBranches[i];
            if (this.eVerdadeiro(this.avaliar(atual.condicao))) {
                this.executar(atual.branch);
                return null;
            }
        }
        if (stmt.elseBranch !== null) {
            this.executar(stmt.elseBranch);
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoPara = function (stmt) {
        if (stmt.inicializador !== null) {
            this.avaliar(stmt.inicializador);
        }
        while (true) {
            if (stmt.condicao !== null) {
                if (!this.eVerdadeiro(this.avaliar(stmt.condicao))) {
                    break;
                }
            }
            try {
                this.executar(stmt.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
            if (stmt.incrementar !== null) {
                this.avaliar(stmt.incrementar);
            }
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoFazer = function (stmt) {
        do {
            try {
                this.executar(stmt.doBranch);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
        } while (this.eVerdadeiro(this.avaliar(stmt.whileCondition)));
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoEscolha = function (stmt) {
        var switchCondition = this.avaliar(stmt.condicao);
        var branches = stmt.branches;
        var defaultBranch = stmt.defaultBranch;
        var matched = false;
        try {
            for (var i = 0; i < branches.length; i++) {
                var branch = branches[i];
                for (var j = 0; j < branch.conditions.length; j++) {
                    if (this.avaliar(branch.conditions[j]) === switchCondition) {
                        matched = true;
                        try {
                            for (var k = 0; k < branch.stmts.length; k++) {
                                this.executar(branch.stmts[k]);
                            }
                        }
                        catch (erro) {
                            if (erro instanceof excecoes_1.ContinueException) {
                            }
                            else {
                                throw erro;
                            }
                        }
                    }
                }
            }
            if (defaultBranch !== null && matched === false) {
                for (var i = 0; i < defaultBranch.stmts.length; i++) {
                    this.executar(defaultBranch["stmts"][i]);
                }
            }
        }
        catch (erro) {
            if (erro instanceof excecoes_1.BreakException) {
            }
            else {
                throw erro;
            }
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoTente = function (stmt) {
        try {
            var sucesso = true;
            try {
                this.executarBloco(stmt.tryBranch, new ambiente_1.Ambiente(this.ambiente));
            }
            catch (erro) {
                sucesso = false;
                if (stmt.catchBranch !== null) {
                    this.executarBloco(stmt.catchBranch, new ambiente_1.Ambiente(this.ambiente));
                }
            }
            if (sucesso && stmt.elseBranch !== null) {
                this.executarBloco(stmt.elseBranch, new ambiente_1.Ambiente(this.ambiente));
            }
        }
        finally {
            if (stmt.finallyBranch !== null)
                this.executarBloco(stmt.finallyBranch, new ambiente_1.Ambiente(this.ambiente));
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoEnquanto = function (stmt) {
        while (this.eVerdadeiro(this.avaliar(stmt.condicao))) {
            try {
                this.executar(stmt.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
        }
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoImportar = function (stmt) {
        var caminhoRelativo = this.avaliar(stmt.caminho);
        var caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        // const pastaTotal = caminho.dirname(caminhoTotal);
        var nomeArquivo = caminho.basename(caminhoTotal);
        var dados = (0, importar_biblioteca_1.default)(caminhoRelativo);
        if (dados)
            return dados;
        try {
            if (!fs.existsSync(caminhoTotal)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(stmt.closeBracket, "Não foi possível encontrar arquivo importado.");
            }
        }
        catch (erro) {
            throw new excecoes_1.ErroEmTempoDeExecucao(stmt.closeBracket, "Não foi possível ler o arquivo.");
        }
        dados = fs.readFileSync(caminhoTotal).toString();
        var delegua = new delegua_1.Delegua(this.Delegua.dialeto, nomeArquivo);
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
    InterpretadorEguaClassico.prototype.visitarExpressaoEscreva = function (stmt) {
        var valor = this.avaliar(stmt.expressao);
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
    InterpretadorEguaClassico.prototype.visitarExpressaoBloco = function (stmt) {
        this.executarBloco(stmt.declaracoes, new ambiente_1.Ambiente(this.ambiente));
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoVar = function (stmt) {
        var valor = null;
        if (stmt.inicializador !== null) {
            valor = this.avaliar(stmt.inicializador);
        }
        this.ambiente.definirVariavel(stmt.nome.lexema, valor);
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoContinua = function (stmt) {
        throw new excecoes_1.ContinueException();
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoPausa = function (stmt) {
        throw new excecoes_1.BreakException();
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoRetornar = function (stmt) {
        var valor = null;
        if (stmt.valor != null)
            valor = this.avaliar(stmt.valor);
        throw new excecoes_1.ReturnException(valor);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDeleguaFuncao = function (expr) {
        return new funcao_1.DeleguaFuncao(null, expr, this.ambiente, false);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        var indice = this.avaliar(expr.indice);
        var valor = this.avaliar(expr.valor);
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
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.objeto.nome, "Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.");
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoVetorIndice = function (expressao) {
        var objeto = this.avaliar(expressao.callee);
        var indice = this.avaliar(expressao.indice);
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Somente inteiros podem ser usados para indexar um vetor.");
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Índice do vetor fora do intervalo.");
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
        else if (typeof objeto === "string") {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Somente inteiros podem ser usados para indexar um vetor.");
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Índice fora do tamanho.");
            }
            return objeto.charAt(indice);
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.callee.nome, "Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.");
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDefinir = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        if (!(objeto instanceof instancia_1.DeleguaInstancia) &&
            objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.objeto.nome, "Somente instâncias e dicionários podem possuir campos.");
        }
        var valor = this.avaliar(expr.valor);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            objeto.set(expr.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expr.nome.lexema] = valor;
        }
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoFuncao = function (stmt) {
        var funcao = new funcao_1.DeleguaFuncao(stmt.nome.lexema, stmt.funcao, this.ambiente, false);
        this.ambiente.definirVariavel(stmt.nome.lexema, funcao);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoClasse = function (stmt) {
        var superClasse = null;
        if (stmt.superClasse !== null) {
            superClasse = this.avaliar(stmt.superClasse);
            if (!(superClasse instanceof classe_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(stmt.superClasse.nome, "SuperClasse precisa ser uma classe.");
            }
        }
        this.ambiente.definirVariavel(stmt.nome.lexema, null);
        if (stmt.superClasse !== null) {
            this.ambiente = new ambiente_1.Ambiente(this.ambiente);
            this.ambiente.definirVariavel("super", superClasse);
        }
        var metodos = {};
        var definirMetodos = stmt.metodos;
        for (var i = 0; i < stmt.metodos.length; i++) {
            var metodoAtual = definirMetodos[i];
            var eInicializado = metodoAtual.nome.lexema === "construtor";
            var funcao = new funcao_1.DeleguaFuncao(metodoAtual.nome.lexema, metodoAtual.funcao, this.ambiente, eInicializado);
            metodos[metodoAtual.nome.lexema] = funcao;
        }
        var criado = new classe_1.DeleguaClasse(stmt.nome.lexema, superClasse, metodos);
        if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        }
        this.ambiente.atribuirVariavel(stmt.nome, criado);
        return null;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoObter = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            return objeto.get(expr.nome) || null;
        }
        else if (objeto.constructor === Object) {
            return objeto[expr.nome.lexema] || null;
        }
        else if (objeto instanceof modulo_1.DeleguaModulo) {
            return objeto[expr.nome.lexema] || null;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expr.nome, "Você só pode acessar métodos do objeto e dicionários.");
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoIsto = function (expr) {
        return this.procurarVariavel(expr.palavraChave, expr);
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoDicionario = function (expr) {
        var dicionario = {};
        for (var i = 0; i < expr.chaves.length; i++) {
            dicionario[this.avaliar(expr.chaves[i])] = this.avaliar(expr.valores[i]);
        }
        return dicionario;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoVetor = function (expr) {
        var valores = [];
        for (var i = 0; i < expr.valores.length; i++) {
            valores.push(this.avaliar(expr.valores[i]));
        }
        return valores;
    };
    InterpretadorEguaClassico.prototype.visitarExpressaoSuper = function (expr) {
        var distancia = this.locais.get(expr);
        var superClasse = this.ambiente.obterVariavelEm(distancia, "super");
        var objeto = this.ambiente.obterVariavelEm(distancia - 1, "isto");
        var metodo = superClasse.encontrarMetodo(expr.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.metodo, "Método chamado indefinido.");
        }
        return metodo.definirEscopo(objeto);
    };
    InterpretadorEguaClassico.prototype.paraTexto = function (objeto) {
        if (objeto === null)
            return "nulo";
        if (typeof objeto === "boolean") {
            return objeto ? "verdadeiro" : "falso";
        }
        if (objeto instanceof Date) {
            var formato = Intl.DateTimeFormat("pt", {
                dateStyle: "full",
                timeStyle: "full",
            });
            return formato.format(objeto);
        }
        if (Array.isArray(objeto))
            return objeto;
        if (typeof objeto === "object")
            return JSON.stringify(objeto);
        return objeto.toString();
    };
    InterpretadorEguaClassico.prototype.executar = function (stmt, mostrarResultado) {
        if (mostrarResultado === void 0) { mostrarResultado = false; }
        stmt.aceitar(this);
    };
    InterpretadorEguaClassico.prototype.interpretar = function (declaracoes) {
        try {
            for (var i = 0; i < declaracoes.length; i++) {
                this.executar(declaracoes[i], false);
            }
        }
        catch (erro) {
            this.Delegua.erroEmTempoDeExecucao(erro);
        }
    };
    return InterpretadorEguaClassico;
}());
exports.InterpretadorEguaClassico = InterpretadorEguaClassico;

},{"../../ambiente":2,"../../bibliotecas/biblioteca-global":6,"../../bibliotecas/importar-biblioteca":7,"../../delegua":45,"../../estruturas/callable":46,"../../estruturas/classe":47,"../../estruturas/funcao":49,"../../estruturas/funcao-padrao":48,"../../estruturas/instancia":50,"../../estruturas/modulo":51,"../../excecoes":55,"../../tiposDeSimbolos":65,"fs":66,"path":67}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpretador = void 0;
var tiposDeSimbolos_1 = require("../tiposDeSimbolos");
var ambiente_1 = require("../ambiente");
var delegua_1 = require("../delegua");
var biblioteca_global_1 = require("../bibliotecas/biblioteca-global");
var caminho = require("path");
var fs = require("fs");
var importar_biblioteca_1 = require("../bibliotecas/importar-biblioteca");
var callable_1 = require("../estruturas/callable");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var classe_1 = require("../estruturas/classe");
var funcao_1 = require("../estruturas/funcao");
var instancia_1 = require("../estruturas/instancia");
var modulo_1 = require("../estruturas/modulo");
var excecoes_1 = require("../excecoes");
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser)
 * e de fato executa a lógica de programação descrita no código.
 */
var Interpretador = /** @class */ (function () {
    function Interpretador(Delegua, diretorioBase) {
        this.Delegua = Delegua;
        this.diretorioBase = diretorioBase;
        this.global = new ambiente_1.Ambiente();
        this.ambiente = this.global;
        this.locais = new Map();
        this.global = (0, biblioteca_global_1.default)(this, this.global);
    }
    Interpretador.prototype.resolver = function (expr, depth) {
        this.locais.set(expr, depth);
    };
    Interpretador.prototype.visitarExpressaoLiteral = function (expr) {
        return expr.valor;
    };
    Interpretador.prototype.avaliar = function (expr) {
        if (expr.aceitar) {
            return expr.aceitar(this);
        }
    };
    Interpretador.prototype.visitarExpressaoAgrupamento = function (expr) {
        return this.avaliar(expr.expressao);
    };
    Interpretador.prototype.eVerdadeiro = function (objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === "boolean")
            return Boolean(objeto);
        return true;
    };
    Interpretador.prototype.verificarOperandoNumero = function (operador, operando) {
        if (typeof operando === "number")
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, "Operando precisa ser um número.");
    };
    Interpretador.prototype.visitarExpressaoUnaria = function (expr) {
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tiposDeSimbolos_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expr.operador, direita);
                return -direita;
            case tiposDeSimbolos_1.default.NEGACAO:
                return !this.eVerdadeiro(direita);
            case tiposDeSimbolos_1.default.BIT_NOT:
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
        if (typeof direita === "number" && typeof esquerda === "number")
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, "Operandos precisam ser números.");
    };
    Interpretador.prototype.visitarExpressaoBinaria = function (expr) {
        var esquerda = this.avaliar(expr.esquerda);
        var direita = this.avaliar(expr.direita);
        switch (expr.operador.tipo) {
            case tiposDeSimbolos_1.default.EXPONENCIACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Math.pow(esquerda, direita);
            case tiposDeSimbolos_1.default.MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) > Number(direita);
            case tiposDeSimbolos_1.default.MAIOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >= Number(direita);
            case tiposDeSimbolos_1.default.MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) < Number(direita);
            case tiposDeSimbolos_1.default.MENOR_IGUAL:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) <= Number(direita);
            case tiposDeSimbolos_1.default.SUBTRACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) - Number(direita);
            case tiposDeSimbolos_1.default.ADICAO:
                if (typeof esquerda === "number" && typeof direita === "number") {
                    return Number(esquerda) + Number(direita);
                }
                else {
                    return String(esquerda) + String(direita);
                }
            case tiposDeSimbolos_1.default.DIVISAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) / Number(direita);
            case tiposDeSimbolos_1.default.MULTIPLICACAO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) * Number(direita);
            case tiposDeSimbolos_1.default.MODULO:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) % Number(direita);
            case tiposDeSimbolos_1.default.BIT_AND:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) & Number(direita);
            case tiposDeSimbolos_1.default.BIT_XOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) ^ Number(direita);
            case tiposDeSimbolos_1.default.BIT_OR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) | Number(direita);
            case tiposDeSimbolos_1.default.MENOR_MENOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) << Number(direita);
            case tiposDeSimbolos_1.default.MAIOR_MAIOR:
                this.verificarOperandosNumeros(expr.operador, esquerda, direita);
                return Number(esquerda) >> Number(direita);
            case tiposDeSimbolos_1.default.DIFERENTE:
                return !this.eIgual(esquerda, direita);
            case tiposDeSimbolos_1.default.IGUAL_IGUAL:
                return this.eIgual(esquerda, direita);
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoDeChamada = function (expr) {
        var callee = this.avaliar(expr.callee);
        var argumentos = [];
        for (var i = 0; i < expr.argumentos.length; i++) {
            argumentos.push(this.avaliar(expr.argumentos[i]));
        }
        if (!(callee instanceof callable_1.Callable)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.parentese, "Só pode chamar função ou classe.");
        }
        var parametros;
        if (callee instanceof funcao_1.DeleguaFuncao) {
            parametros = callee.declaracao.parametros;
        }
        else if (callee instanceof classe_1.DeleguaClasse) {
            parametros = callee.metodos.init
                ? callee.metodos.init.declaracao.parametros
                : [];
        }
        else {
            parametros = [];
        }
        // Isso aqui completa os parâmetros não preenchidos com nulos.
        if (argumentos.length < callee.aridade()) {
            var diferenca = callee.aridade() - argumentos.length;
            for (var i = 0; i < diferenca; i++) {
                argumentos.push(null);
            }
        }
        else {
            if (parametros &&
                parametros.length > 0 &&
                parametros[parametros.length - 1]["tipo"] === "wildcard") {
                var novosArgumentos = argumentos.slice(0, parametros.length - 1);
                novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                argumentos = novosArgumentos;
            }
        }
        if (callee instanceof funcao_padrao_1.FuncaoPadrao) {
            return callee.chamar(this, argumentos, expr.callee.nome);
        }
        return callee.chamar(this, argumentos);
    };
    Interpretador.prototype.visitarExpressaoDeAtribuicao = function (expr) {
        var valor = this.avaliar(expr.valor);
        var distancia = this.locais.get(expr);
        if (distancia !== undefined) {
            this.ambiente.atribuirVariavelEm(distancia, expr.nome, valor);
        }
        else {
            this.ambiente.atribuirVariavel(expr.nome, valor);
        }
        return valor;
    };
    Interpretador.prototype.procurarVariavel = function (nome, expr) {
        var distancia = this.locais.get(expr);
        if (distancia !== undefined) {
            return this.ambiente.obterVariavelEm(distancia, nome.lexema);
        }
        else {
            return this.global.obterVariavel(nome);
        }
    };
    Interpretador.prototype.visitarExpressaoDeVariavel = function (expr) {
        return this.procurarVariavel(expr.nome, expr);
    };
    Interpretador.prototype.visitarDeclaracaoDeExpressao = function (stmt) {
        return this.avaliar(stmt.expressao);
    };
    Interpretador.prototype.visitarExpressaoLogica = function (expr) {
        var esquerda = this.avaliar(expr.esquerda);
        if (expr.operador.tipo === tiposDeSimbolos_1.default.EM) {
            var direita = this.avaliar(expr.direita);
            if (Array.isArray(direita) || typeof direita === "string") {
                return direita.includes(esquerda);
            }
            else if (direita.constructor === Object) {
                return esquerda in direita;
            }
            else {
                throw new excecoes_1.ErroEmTempoDeExecucao("Tipo de chamada inválida com 'em'.");
            }
        }
        // se um estado for verdadeiro, retorna verdadeiro
        if (expr.operador.tipo === tiposDeSimbolos_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expr.operador.tipo === tiposDeSimbolos_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return this.avaliar(expr.direita);
    };
    Interpretador.prototype.visitarExpressaoSe = function (stmt) {
        if (this.eVerdadeiro(this.avaliar(stmt.condicao))) {
            this.executar(stmt.thenBranch);
            return null;
        }
        for (var i = 0; i < stmt.elifBranches.length; i++) {
            var atual = stmt.elifBranches[i];
            if (this.eVerdadeiro(this.avaliar(atual.condicao))) {
                this.executar(atual.branch);
                return null;
            }
        }
        if (stmt.elseBranch !== null) {
            this.executar(stmt.elseBranch);
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoPara = function (stmt) {
        if (stmt.inicializador !== null) {
            this.avaliar(stmt.inicializador);
        }
        while (true) {
            if (stmt.condicao !== null) {
                if (!this.eVerdadeiro(this.avaliar(stmt.condicao))) {
                    break;
                }
            }
            try {
                this.executar(stmt.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
            if (stmt.incrementar !== null) {
                this.avaliar(stmt.incrementar);
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoFazer = function (stmt) {
        do {
            try {
                this.executar(stmt.doBranch);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
        } while (this.eVerdadeiro(this.avaliar(stmt.whileCondition)));
    };
    Interpretador.prototype.visitarExpressaoEscolha = function (stmt) {
        var switchCondition = this.avaliar(stmt.condicao);
        var branches = stmt.branches;
        var defaultBranch = stmt.defaultBranch;
        var matched = false;
        try {
            for (var i = 0; i < branches.length; i++) {
                var branch = branches[i];
                for (var j = 0; j < branch.conditions.length; j++) {
                    if (this.avaliar(branch.conditions[j]) === switchCondition) {
                        matched = true;
                        try {
                            for (var k = 0; k < branch.stmts.length; k++) {
                                this.executar(branch.stmts[k]);
                            }
                        }
                        catch (erro) {
                            if (erro instanceof excecoes_1.ContinueException) {
                            }
                            else {
                                throw erro;
                            }
                        }
                    }
                }
            }
            if (defaultBranch !== null && matched === false) {
                for (var i = 0; i < defaultBranch.stmts.length; i++) {
                    this.executar(defaultBranch["stmts"][i]);
                }
            }
        }
        catch (erro) {
            if (erro instanceof excecoes_1.BreakException) {
            }
            else {
                throw erro;
            }
        }
    };
    Interpretador.prototype.visitarExpressaoTente = function (stmt) {
        try {
            var sucesso = true;
            try {
                this.executarBloco(stmt.tryBranch, new ambiente_1.Ambiente(this.ambiente));
            }
            catch (erro) {
                sucesso = false;
                if (stmt.catchBranch !== null) {
                    this.executarBloco(stmt.catchBranch, new ambiente_1.Ambiente(this.ambiente));
                }
            }
            if (sucesso && stmt.elseBranch !== null) {
                this.executarBloco(stmt.elseBranch, new ambiente_1.Ambiente(this.ambiente));
            }
        }
        finally {
            if (stmt.finallyBranch !== null)
                this.executarBloco(stmt.finallyBranch, new ambiente_1.Ambiente(this.ambiente));
        }
    };
    Interpretador.prototype.visitarExpressaoEnquanto = function (stmt) {
        while (this.eVerdadeiro(this.avaliar(stmt.condicao))) {
            try {
                this.executar(stmt.corpo);
            }
            catch (erro) {
                if (erro instanceof excecoes_1.BreakException) {
                    break;
                }
                else if (erro instanceof excecoes_1.ContinueException) {
                }
                else {
                    throw erro;
                }
            }
        }
        return null;
    };
    Interpretador.prototype.visitarExpressaoImportar = function (stmt) {
        var caminhoRelativo = this.avaliar(stmt.caminho);
        var caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        // const pastaTotal = caminho.dirname(caminhoTotal);
        var nomeArquivo = caminho.basename(caminhoTotal);
        var dados;
        if (!caminhoTotal.endsWith('.egua')) {
            dados = (0, importar_biblioteca_1.default)(caminhoRelativo);
            if (dados)
                return dados;
        }
        try {
            if (!fs.existsSync(caminhoTotal)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(stmt.closeBracket, "Não foi possível encontrar arquivo importado.");
            }
        }
        catch (erro) {
            throw new excecoes_1.ErroEmTempoDeExecucao(stmt.closeBracket, "Não foi possível ler o arquivo.");
        }
        dados = fs.readFileSync(caminhoTotal).toString();
        var delegua = new delegua_1.Delegua(this.Delegua.dialeto, nomeArquivo);
        // const interpretador = new Interpretador(delegua, pastaTotal);
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
    Interpretador.prototype.visitarExpressaoEscreva = function (stmt) {
        var valor = this.avaliar(stmt.expressao);
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
    Interpretador.prototype.visitarExpressaoBloco = function (stmt) {
        this.executarBloco(stmt.declaracoes, new ambiente_1.Ambiente(this.ambiente));
        return null;
    };
    Interpretador.prototype.visitarExpressaoVar = function (stmt) {
        var valor = null;
        if (stmt.inicializador !== null) {
            valor = this.avaliar(stmt.inicializador);
        }
        this.ambiente.definirVariavel(stmt.nome.lexema, valor);
        return null;
    };
    Interpretador.prototype.visitarExpressaoContinua = function (stmt) {
        throw new excecoes_1.ContinueException();
    };
    Interpretador.prototype.visitarExpressaoPausa = function (stmt) {
        throw new excecoes_1.BreakException();
    };
    Interpretador.prototype.visitarExpressaoRetornar = function (stmt) {
        var valor = null;
        if (stmt.valor != null)
            valor = this.avaliar(stmt.valor);
        throw new excecoes_1.ReturnException(valor);
    };
    Interpretador.prototype.visitarExpressaoDeleguaFuncao = function (expr) {
        return new funcao_1.DeleguaFuncao(null, expr, this.ambiente, false);
    };
    Interpretador.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        var indice = this.avaliar(expr.indice);
        var valor = this.avaliar(expr.valor);
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
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.objeto.nome, "Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.");
        }
    };
    Interpretador.prototype.visitarExpressaoVetorIndice = function (expressao) {
        var objeto = this.avaliar(expressao.callee);
        var indice = this.avaliar(expressao.indice);
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Somente inteiros podem ser usados para indexar um vetor.");
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Índice do vetor fora do intervalo.");
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
        else if (typeof objeto === "string") {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Somente inteiros podem ser usados para indexar um vetor.");
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.closeBracket, "Índice fora do tamanho.");
            }
            return objeto.charAt(indice);
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.callee.nome, "Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.");
        }
    };
    Interpretador.prototype.visitarExpressaoDefinir = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        if (!(objeto instanceof instancia_1.DeleguaInstancia) &&
            objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.objeto.nome, "Somente instâncias e dicionários podem possuir campos.");
        }
        var valor = this.avaliar(expr.valor);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            objeto.set(expr.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expr.nome.lexema] = valor;
        }
    };
    Interpretador.prototype.visitarExpressaoFuncao = function (stmt) {
        var funcao = new funcao_1.DeleguaFuncao(stmt.nome.lexema, stmt.funcao, this.ambiente, false);
        this.ambiente.definirVariavel(stmt.nome.lexema, funcao);
    };
    Interpretador.prototype.visitarExpressaoClasse = function (stmt) {
        var superClasse = null;
        if (stmt.superClasse !== null) {
            superClasse = this.avaliar(stmt.superClasse);
            if (!(superClasse instanceof classe_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(stmt.superClasse.nome, "SuperClasse precisa ser uma classe.");
            }
        }
        this.ambiente.definirVariavel(stmt.nome.lexema, null);
        if (stmt.superClasse !== null) {
            this.ambiente = new ambiente_1.Ambiente(this.ambiente);
            this.ambiente.definirVariavel("super", superClasse);
        }
        var metodos = {};
        var definirMetodos = stmt.metodos;
        for (var i = 0; i < stmt.metodos.length; i++) {
            var metodoAtual = definirMetodos[i];
            var eInicializado = metodoAtual.nome.lexema === "construtor";
            var funcao = new funcao_1.DeleguaFuncao(metodoAtual.nome.lexema, metodoAtual.funcao, this.ambiente, eInicializado);
            metodos[metodoAtual.nome.lexema] = funcao;
        }
        var criado = new classe_1.DeleguaClasse(stmt.nome.lexema, superClasse, metodos);
        if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        }
        this.ambiente.atribuirVariavel(stmt.nome, criado);
        return null;
    };
    Interpretador.prototype.visitarExpressaoObter = function (expr) {
        var objeto = this.avaliar(expr.objeto);
        if (objeto instanceof instancia_1.DeleguaInstancia) {
            return objeto.get(expr.nome) || null;
        }
        else if (objeto.constructor === Object) {
            return objeto[expr.nome.lexema] || null;
        }
        else if (objeto instanceof modulo_1.DeleguaModulo) {
            return objeto[expr.nome.lexema] || null;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expr.nome, "Você só pode acessar métodos do objeto e dicionários.");
    };
    Interpretador.prototype.visitarExpressaoIsto = function (expr) {
        return this.procurarVariavel(expr.palavraChave, expr);
    };
    Interpretador.prototype.visitarExpressaoDicionario = function (expr) {
        var dicionario = {};
        for (var i = 0; i < expr.chaves.length; i++) {
            dicionario[this.avaliar(expr.chaves[i])] = this.avaliar(expr.valores[i]);
        }
        return dicionario;
    };
    Interpretador.prototype.visitarExpressaoVetor = function (expr) {
        var valores = [];
        for (var i = 0; i < expr.valores.length; i++) {
            valores.push(this.avaliar(expr.valores[i]));
        }
        return valores;
    };
    Interpretador.prototype.visitarExpressaoSuper = function (expr) {
        var distancia = this.locais.get(expr);
        var superClasse = this.ambiente.obterVariavelEm(distancia, "super");
        var objeto = this.ambiente.obterVariavelEm(distancia - 1, "isto");
        var metodo = superClasse.encontrarMetodo(expr.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expr.metodo, "Método chamado indefinido.");
        }
        return metodo.definirEscopo(objeto);
    };
    Interpretador.prototype.paraTexto = function (objeto) {
        if (objeto === null)
            return "nulo";
        if (typeof objeto === "boolean") {
            return objeto ? "verdadeiro" : "falso";
        }
        if (objeto instanceof Date) {
            var formato = Intl.DateTimeFormat("pt", {
                dateStyle: "full",
                timeStyle: "full",
            });
            return formato.format(objeto);
        }
        if (Array.isArray(objeto))
            return objeto;
        if (typeof objeto === "object")
            return JSON.stringify(objeto);
        return objeto.toString();
    };
    Interpretador.prototype.executar = function (stmt, mostrarResultado) {
        if (mostrarResultado === void 0) { mostrarResultado = false; }
        var resultado = stmt.aceitar(this);
        if (mostrarResultado) {
            console.log(this.paraTexto(resultado));
        }
    };
    Interpretador.prototype.interpretar = function (declaracoes) {
        try {
            if (declaracoes.length === 1) {
                var eObjetoExpressao = declaracoes[0].constructor.name === "Expressao";
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
            this.Delegua.erroEmTempoDeExecucao(erro);
        }
    };
    return Interpretador;
}());
exports.Interpretador = Interpretador;

},{"../ambiente":2,"../bibliotecas/biblioteca-global":6,"../bibliotecas/importar-biblioteca":7,"../delegua":45,"../estruturas/callable":46,"../estruturas/classe":47,"../estruturas/funcao":49,"../estruturas/funcao-padrao":48,"../estruturas/instancia":50,"../estruturas/modulo":51,"../excecoes":55,"../tiposDeSimbolos":65,"fs":66,"path":67}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexerEguaClassico = void 0;
var tiposDeSimbolos_1 = require("../../tiposDeSimbolos");
var palavrasReservadas = {
    e: tiposDeSimbolos_1.default.E,
    em: tiposDeSimbolos_1.default.EM,
    classe: tiposDeSimbolos_1.default.CLASSE,
    senão: tiposDeSimbolos_1.default.SENÃO,
    falso: tiposDeSimbolos_1.default.FALSO,
    para: tiposDeSimbolos_1.default.PARA,
    função: tiposDeSimbolos_1.default.FUNÇÃO,
    se: tiposDeSimbolos_1.default.SE,
    senãose: tiposDeSimbolos_1.default.SENÃOSE,
    nulo: tiposDeSimbolos_1.default.NULO,
    ou: tiposDeSimbolos_1.default.OU,
    escreva: tiposDeSimbolos_1.default.ESCREVA,
    retorna: tiposDeSimbolos_1.default.RETORNA,
    super: tiposDeSimbolos_1.default.SUPER,
    isto: tiposDeSimbolos_1.default.ISTO,
    verdadeiro: tiposDeSimbolos_1.default.VERDADEIRO,
    var: tiposDeSimbolos_1.default.VARIAVEL,
    fazer: tiposDeSimbolos_1.default.FAZER,
    enquanto: tiposDeSimbolos_1.default.ENQUANTO,
    pausa: tiposDeSimbolos_1.default.PAUSA,
    continua: tiposDeSimbolos_1.default.CONTINUA,
    escolha: tiposDeSimbolos_1.default.ESCOLHA,
    caso: tiposDeSimbolos_1.default.CASO,
    padrao: tiposDeSimbolos_1.default.PADRAO,
    importar: tiposDeSimbolos_1.default.IMPORTAR,
    tente: tiposDeSimbolos_1.default.TENTE,
    pegue: tiposDeSimbolos_1.default.PEGUE,
    finalmente: tiposDeSimbolos_1.default.FINALMENTE,
    herda: tiposDeSimbolos_1.default.HERDA
};
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
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
var LexerEguaClassico = /** @class */ (function () {
    function LexerEguaClassico(Delegua, codigo) {
        this.Delegua = Delegua;
        this.codigo = codigo;
        this.simbolos = [];
        this.inicio = 0;
        this.atual = 0;
        this.linha = 1;
    }
    LexerEguaClassico.prototype.eDigito = function (caractere) {
        return caractere >= "0" && caractere <= "9";
    };
    LexerEguaClassico.prototype.eAlfabeto = function (caractere) {
        var acentuacoes = ["á", "Á", "ã", "Ã", "â", "Â", "à", "À", "é", "É", "ê", "Ê", "í", "Í", "ó", "Ó", "õ", "Õ", "ô", "Ô", "ú", "Ú", "ç", "Ç", "_"];
        return (caractere >= "a" && caractere <= "z") || (caractere >= "A" && caractere <= "Z") || acentuacoes.includes(caractere);
    };
    LexerEguaClassico.prototype.eAlfabetoOuDigito = function (caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    };
    LexerEguaClassico.prototype.eFinalDoCodigo = function () {
        return this.atual >= this.codigo.length;
    };
    LexerEguaClassico.prototype.avancar = function () {
        this.atual += 1;
        return this.codigo[this.atual - 1];
    };
    LexerEguaClassico.prototype.adicionarSimbolo = function (tipo, literal) {
        if (literal === void 0) { literal = null; }
        var texto = this.codigo.substring(this.inicio, this.atual);
        this.simbolos.push(new Simbolo(tipo, texto, literal, this.linha));
    };
    LexerEguaClassico.prototype.match = function (esperado) {
        if (this.eFinalDoCodigo()) {
            return false;
        }
        if (this.codigo[this.atual] !== esperado) {
            return false;
        }
        this.atual += 1;
        return true;
    };
    LexerEguaClassico.prototype.peek = function () {
        if (this.eFinalDoCodigo())
            return "\0";
        return this.codigo.charAt(this.atual);
    };
    LexerEguaClassico.prototype.peekNext = function () {
        if (this.atual + 1 >= this.codigo.length)
            return "\0";
        return this.codigo.charAt(this.atual + 1);
    };
    LexerEguaClassico.prototype.voltar = function () {
        return this.codigo.charAt(this.atual - 1);
    };
    LexerEguaClassico.prototype.analisarTexto = function (texto) {
        if (texto === void 0) { texto = '"'; }
        while (this.peek() !== texto && !this.eFinalDoCodigo()) {
            if (this.peek() === "\n")
                this.linha = +1;
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.Delegua.erroNoLexador(this.linha, this.voltar(), "Texto não finalizado.");
            return;
        }
        this.avancar();
        var valor = this.codigo.substring(this.inicio + 1, this.atual - 1);
        this.adicionarSimbolo(tiposDeSimbolos_1.default.TEXTO, valor);
    };
    LexerEguaClassico.prototype.analisarNumero = function () {
        while (this.eDigito(this.peek())) {
            this.avancar();
        }
        if (this.peek() == "." && this.eDigito(this.peekNext())) {
            this.avancar();
            while (this.eDigito(this.peek())) {
                this.avancar();
            }
        }
        var numeroCompleto = this.codigo.substring(this.inicio, this.atual);
        this.adicionarSimbolo(tiposDeSimbolos_1.default.NUMERO, parseFloat(numeroCompleto));
    };
    LexerEguaClassico.prototype.identificarPalavraChave = function () {
        while (this.eAlfabetoOuDigito(this.peek())) {
            this.avancar();
        }
        var codigo = this.codigo.substring(this.inicio, this.atual);
        var tipo = codigo in palavrasReservadas ? palavrasReservadas[codigo] : tiposDeSimbolos_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    };
    LexerEguaClassico.prototype.scanToken = function () {
        var caractere = this.avancar();
        switch (caractere) {
            case "[":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO);
                break;
            case "]":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.COLCHETE_DIREITO);
                break;
            case "(":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO);
                break;
            case ")":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PARENTESE_DIREITO);
                break;
            case "{":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.CHAVE_ESQUERDA);
                break;
            case "}":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.CHAVE_DIREITA);
                break;
            case ",":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.VIRGULA);
                break;
            case ".":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PONTO);
                break;
            case "-":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.SUBTRACAO);
                break;
            case "+":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.ADICAO);
                break;
            case ":":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.DOIS_PONTOS);
                break;
            case ";":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PONTO_E_VIRGULA);
                break;
            case "%":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.MODULO);
                break;
            case "*":
                if (this.peek() === "*") {
                    this.avancar();
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.EXPONENCIACAO);
                    break;
                }
                this.adicionarSimbolo(tiposDeSimbolos_1.default.MULTIPLICACAO);
                break;
            case "!":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.DIFERENTE : tiposDeSimbolos_1.default.NEGACAO);
                break;
            case "=":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.IGUAL_IGUAL : tiposDeSimbolos_1.default.IGUAL);
                break;
            case "&":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_AND);
                break;
            case "~":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_NOT);
                break;
            case "|":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_OR);
                break;
            case "^":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_XOR);
                break;
            case "<":
                if (this.match("=")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR_IGUAL);
                }
                else if (this.match("<")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR_MENOR);
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR);
                }
                break;
            case ">":
                if (this.match("=")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR_IGUAL);
                }
                else if (this.match(">")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR_MAIOR);
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR);
                }
                break;
            case "/":
                if (this.match("/")) {
                    while (this.peek() != "\n" && !this.eFinalDoCodigo())
                        this.avancar();
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.DIVISAO);
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização
            case " ":
            case "\r":
            case "\t":
                break;
            // tentativa de pulhar linha com \n que ainda não funciona
            case "\n":
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
                    this.Delegua.erroNoLexador(this.linha, caractere, "Caractere inesperado.");
        }
    };
    LexerEguaClassico.prototype.mapear = function (codigo) {
        this.simbolos = [];
        this.inicio = 0;
        this.atual = 0;
        this.linha = 1;
        if (codigo) {
            this.codigo = codigo;
        }
        while (!this.eFinalDoCodigo()) {
            this.inicio = this.atual;
            this.scanToken();
        }
        this.simbolos.push(new Simbolo(tiposDeSimbolos_1.default.EOF, "", null, this.linha));
        return this.simbolos;
    };
    return LexerEguaClassico;
}());
exports.LexerEguaClassico = LexerEguaClassico;
;

},{"../../tiposDeSimbolos":65}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
var tiposDeSimbolos_1 = require("../tiposDeSimbolos");
var palavrasReservadas = {
    e: tiposDeSimbolos_1.default.E,
    em: tiposDeSimbolos_1.default.EM,
    classe: tiposDeSimbolos_1.default.CLASSE,
    senao: tiposDeSimbolos_1.default.SENAO,
    senão: tiposDeSimbolos_1.default.SENÃO,
    falso: tiposDeSimbolos_1.default.FALSO,
    para: tiposDeSimbolos_1.default.PARA,
    funcao: tiposDeSimbolos_1.default.FUNCAO,
    função: tiposDeSimbolos_1.default.FUNÇÃO,
    se: tiposDeSimbolos_1.default.SE,
    senaose: tiposDeSimbolos_1.default.SENAOSE,
    senãose: tiposDeSimbolos_1.default.SENÃOSE,
    nulo: tiposDeSimbolos_1.default.NULO,
    ou: tiposDeSimbolos_1.default.OU,
    escreva: tiposDeSimbolos_1.default.ESCREVA,
    retorna: tiposDeSimbolos_1.default.RETORNA,
    super: tiposDeSimbolos_1.default.SUPER,
    isto: tiposDeSimbolos_1.default.ISTO,
    verdadeiro: tiposDeSimbolos_1.default.VERDADEIRO,
    var: tiposDeSimbolos_1.default.VARIAVEL,
    fazer: tiposDeSimbolos_1.default.FAZER,
    enquanto: tiposDeSimbolos_1.default.ENQUANTO,
    pausa: tiposDeSimbolos_1.default.PAUSA,
    continua: tiposDeSimbolos_1.default.CONTINUA,
    escolha: tiposDeSimbolos_1.default.ESCOLHA,
    caso: tiposDeSimbolos_1.default.CASO,
    padrao: tiposDeSimbolos_1.default.PADRAO,
    importar: tiposDeSimbolos_1.default.IMPORTAR,
    tente: tiposDeSimbolos_1.default.TENTE,
    pegue: tiposDeSimbolos_1.default.PEGUE,
    finalmente: tiposDeSimbolos_1.default.FINALMENTE,
    herda: tiposDeSimbolos_1.default.HERDA
};
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
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
var Lexer = /** @class */ (function () {
    function Lexer(Delegua, codigo) {
        this.Delegua = Delegua;
        this.codigo = codigo;
        this.simbolos = [];
        this.inicio = 0;
        this.atual = 0;
        this.linha = 1;
    }
    Lexer.prototype.eDigito = function (caractere) {
        return caractere >= "0" && caractere <= "9";
    };
    Lexer.prototype.eAlfabeto = function (caractere) {
        var acentuacoes = ["á", "Á", "ã", "Ã", "â", "Â", "à", "À", "é", "É", "ê", "Ê", "í", "Í", "ó", "Ó", "õ", "Õ", "ô", "Ô", "ú", "Ú", "ç", "Ç", "_"];
        return (caractere >= "a" && caractere <= "z") || (caractere >= "A" && caractere <= "Z") || acentuacoes.includes(caractere);
    };
    Lexer.prototype.eAlfabetoOuDigito = function (caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    };
    Lexer.prototype.eFinalDoCodigo = function () {
        return this.atual >= this.codigo.length;
    };
    Lexer.prototype.avancar = function () {
        this.atual += 1;
        return this.codigo[this.atual - 1];
    };
    Lexer.prototype.adicionarSimbolo = function (tipo, literal) {
        if (literal === void 0) { literal = null; }
        var texto = this.codigo.substring(this.inicio, this.atual);
        this.simbolos.push(new Simbolo(tipo, texto, literal, this.linha));
    };
    Lexer.prototype.match = function (esperado) {
        if (this.eFinalDoCodigo()) {
            return false;
        }
        if (this.codigo[this.atual] !== esperado) {
            return false;
        }
        this.atual += 1;
        return true;
    };
    Lexer.prototype.peek = function () {
        if (this.eFinalDoCodigo())
            return "\0";
        return this.codigo.charAt(this.atual);
    };
    Lexer.prototype.peekNext = function () {
        if (this.atual + 1 >= this.codigo.length)
            return "\0";
        return this.codigo.charAt(this.atual + 1);
    };
    Lexer.prototype.voltar = function () {
        return this.codigo.charAt(this.atual - 1);
    };
    Lexer.prototype.analisarTexto = function (texto) {
        if (texto === void 0) { texto = '"'; }
        while (this.peek() !== texto && !this.eFinalDoCodigo()) {
            if (this.peek() === "\n")
                this.linha = +1;
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.Delegua.erroNoLexador(this.linha, this.voltar(), "Texto não finalizado.");
            return;
        }
        this.avancar();
        var valor = this.codigo.substring(this.inicio + 1, this.atual - 1);
        this.adicionarSimbolo(tiposDeSimbolos_1.default.TEXTO, valor);
    };
    Lexer.prototype.analisarNumero = function () {
        while (this.eDigito(this.peek())) {
            this.avancar();
        }
        if (this.peek() == "." && this.eDigito(this.peekNext())) {
            this.avancar();
            while (this.eDigito(this.peek())) {
                this.avancar();
            }
        }
        var numeroCompleto = this.codigo.substring(this.inicio, this.atual);
        this.adicionarSimbolo(tiposDeSimbolos_1.default.NUMERO, parseFloat(numeroCompleto));
    };
    Lexer.prototype.identificarPalavraChave = function () {
        while (this.eAlfabetoOuDigito(this.peek())) {
            this.avancar();
        }
        var codigo = this.codigo.substring(this.inicio, this.atual);
        var tipo = codigo in palavrasReservadas ? palavrasReservadas[codigo] : tiposDeSimbolos_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    };
    Lexer.prototype.scanToken = function () {
        var caractere = this.avancar();
        switch (caractere) {
            case "[":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.COLCHETE_ESQUERDO);
                break;
            case "]":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.COLCHETE_DIREITO);
                break;
            case "(":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PARENTESE_ESQUERDO);
                break;
            case ")":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PARENTESE_DIREITO);
                break;
            case "{":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.CHAVE_ESQUERDA);
                break;
            case "}":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.CHAVE_DIREITA);
                break;
            case ",":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.VIRGULA);
                break;
            case ".":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.PONTO);
                break;
            case "-":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.MENOS_IGUAL : tiposDeSimbolos_1.default.SUBTRACAO);
                break;
            case "+":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.MAIS_IGUAL : tiposDeSimbolos_1.default.ADICAO);
                break;
            case ":":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.DOIS_PONTOS);
                break;
            case ";":
                // Ponto-e-vírgula é opcional em Delégua, então nem precisa ser considerado
                // nas etapas seguintes.
                break;
            case "%":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.MODULO);
                break;
            case "*":
                if (this.peek() === "*") {
                    this.avancar();
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.EXPONENCIACAO);
                    break;
                }
                else if (this.match("/")) {
                    while (!this.eFinalDoCodigo())
                        this.avancar();
                    break;
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MULTIPLICACAO);
                    break;
                }
            case "!":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.DIFERENTE : tiposDeSimbolos_1.default.NEGACAO);
                break;
            case "=":
                this.adicionarSimbolo(this.match("=") ? tiposDeSimbolos_1.default.IGUAL_IGUAL : tiposDeSimbolos_1.default.IGUAL);
                break;
            case "&":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_AND);
                break;
            case "~":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_NOT);
                break;
            case "|":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_OR);
                break;
            case "^":
                this.adicionarSimbolo(tiposDeSimbolos_1.default.BIT_XOR);
                break;
            case "<":
                if (this.match("=")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR_IGUAL);
                }
                else if (this.match("<")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR_MENOR);
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MENOR);
                }
                break;
            case ">":
                if (this.match("=")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR_IGUAL);
                }
                else if (this.match(">")) {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR_MAIOR);
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.MAIOR);
                }
                break;
            case "/":
                if (this.match("/")) {
                    while (this.peek() !== "\n" && !this.eFinalDoCodigo())
                        this.avancar();
                }
                else if (this.match("*")) {
                    while (!this.eFinalDoCodigo())
                        this.avancar();
                }
                else {
                    this.adicionarSimbolo(tiposDeSimbolos_1.default.DIVISAO);
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização
            case " ":
            case "\r":
            case "\t":
                break;
            // tentativa de pulhar linha com \n que ainda não funciona
            case "\n":
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
                    this.Delegua.erroNoLexador(this.linha, caractere, "Caractere inesperado.");
        }
    };
    Lexer.prototype.mapear = function (codigo) {
        this.simbolos = [];
        this.inicio = 0;
        this.atual = 0;
        this.linha = 1;
        if (codigo) {
            this.codigo = codigo;
        }
        while (!this.eFinalDoCodigo()) {
            this.inicio = this.atual;
            this.scanToken();
        }
        return this.simbolos;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
;

},{"../tiposDeSimbolos":65}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverEguaClassico = void 0;
var pilha_escopos_1 = require("../pilha-escopos");
var erro_resolvedor_1 = require("../erro-resolvedor");
var TipoFuncao = {
    NENHUM: "NENHUM",
    FUNÇÃO: "FUNÇÃO",
    CONSTRUTOR: "CONSTRUTOR",
    METODO: "METODO"
};
var TipoClasse = {
    NENHUM: "NENHUM",
    CLASSE: "CLASSE",
    SUBCLASSE: "SUBCLASSE"
};
var LoopType = {
    NENHUM: "NENHUM",
    ENQUANTO: "ENQUANTO",
    ESCOLHA: "ESCOLHA",
    PARA: "PARA",
    FAZER: "FAZER"
};
/**
 * O Resolvedor (Resolver) é responsável por catalogar todos os identificadores complexos, como por exemplo: funções, classes, variáveis,
 * e delimitar os escopos onde esses identificadores existem.
 * Exemplo: uma classe A declara dois métodos chamados M e N. Todas as variáveis declaradas dentro de M não podem ser vistas por N, e vice-versa.
 * No entanto, todas as variáveis declaradas dentro da classe A podem ser vistas tanto por M quanto por N.
 */
var ResolverEguaClassico = /** @class */ (function () {
    function ResolverEguaClassico(Delegua, interpretador) {
        this.interpretador = interpretador;
        this.Delegua = Delegua;
        this.escopos = new pilha_escopos_1.PilhaEscopos();
        this.FuncaoAtual = TipoFuncao.NENHUM;
        this.ClasseAtual = TipoClasse.NENHUM;
        this.cicloAtual = TipoClasse.NENHUM;
    }
    ResolverEguaClassico.prototype.definir = function (nome) {
        if (this.escopos.eVazio())
            return;
        this.escopos.topoDaPilha()[nome.lexema] = true;
    };
    ResolverEguaClassico.prototype.declarar = function (nome) {
        if (this.escopos.eVazio())
            return;
        var escopo = this.escopos.topoDaPilha();
        if (escopo.hasOwnProperty(nome.lexema))
            this.Delegua.erro(nome, "Variável com esse nome já declarada neste escopo.");
        escopo[nome.lexema] = false;
    };
    ResolverEguaClassico.prototype.inicioDoEscopo = function () {
        this.escopos.empilhar({});
    };
    ResolverEguaClassico.prototype.finalDoEscopo = function () {
        this.escopos.removerUltimo();
    };
    ResolverEguaClassico.prototype.resolver = function (declaracoes) {
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
    };
    ResolverEguaClassico.prototype.resolverLocal = function (expr, nome) {
        for (var i = this.escopos.pilha.length - 1; i >= 0; i--) {
            if (this.escopos.pilha[i].hasOwnProperty(nome.lexema)) {
                this.interpretador.resolver(expr, this.escopos.pilha.length - 1 - i);
            }
        }
    };
    ResolverEguaClassico.prototype.visitarExpressaoBloco = function (stmt) {
        this.inicioDoEscopo();
        this.resolver(stmt.declaracoes);
        this.finalDoEscopo();
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDeVariavel = function (expr) {
        if (!this.escopos.eVazio() &&
            this.escopos.topoDaPilha()[expr.nome.lexema] === false) {
            throw new erro_resolvedor_1.ErroResolvedor("Não é possível ler a variável local em seu próprio inicializador.");
        }
        this.resolverLocal(expr, expr.nome);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoVar = function (stmt) {
        this.declarar(stmt.nome);
        if (stmt.inicializador !== null) {
            this.resolver(stmt.inicializador);
        }
        this.definir(stmt.nome);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDeAtribuicao = function (expr) {
        this.resolver(expr.valor);
        this.resolverLocal(expr, expr.nome);
        return null;
    };
    ResolverEguaClassico.prototype.resolverFuncao = function (funcao, funcType) {
        var enclosingFunc = this.FuncaoAtual;
        this.FuncaoAtual = funcType;
        this.inicioDoEscopo();
        var parametros = funcao.parametros;
        if (parametros && parametros.length > 0) {
            for (var i = 0; i < parametros.length; i++) {
                this.declarar(parametros[i]["nome"]);
                this.definir(parametros[i]["nome"]);
            }
        }
        this.resolver(funcao.funcao);
        this.finalDoEscopo();
        this.FuncaoAtual = enclosingFunc;
    };
    ResolverEguaClassico.prototype.visitarExpressaoFuncao = function (stmt) {
        this.declarar(stmt.nome);
        this.definir(stmt.nome);
        this.resolverFuncao(stmt.funcao, TipoFuncao.FUNÇÃO);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDeleguaFuncao = function (stmt) {
        this.resolverFuncao(stmt, TipoFuncao.FUNÇÃO);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoTente = function (stmt) {
        this.resolver(stmt.tryBranch);
        if (stmt.catchBranch !== null)
            this.resolver(stmt.catchBranch);
        if (stmt.elseBranch !== null)
            this.resolver(stmt.elseBranch);
        if (stmt.finallyBranch !== null)
            this.resolver(stmt.finallyBranch);
    };
    ResolverEguaClassico.prototype.visitarExpressaoClasse = function (stmt) {
        var enclosingClass = this.ClasseAtual;
        this.ClasseAtual = TipoClasse.CLASSE;
        this.declarar(stmt.nome);
        this.definir(stmt.nome);
        if (stmt.superClasse !== null &&
            stmt.nome.lexema === stmt.superClasse.nome.lexema) {
            this.Delegua.erro("Uma classe não pode herdar de si mesma.");
        }
        if (stmt.superClasse !== null) {
            this.ClasseAtual = TipoClasse.SUBCLASSE;
            this.resolver(stmt.superClasse);
        }
        if (stmt.superClasse !== null) {
            this.inicioDoEscopo();
            this.escopos.topoDaPilha()["super"] = true;
        }
        this.inicioDoEscopo();
        this.escopos.topoDaPilha()["isto"] = true;
        var metodos = stmt.metodos;
        for (var i = 0; i < metodos.length; i++) {
            var declaracao = TipoFuncao.METODO;
            if (metodos[i].nome.lexema === "isto") {
                declaracao = TipoFuncao.CONSTRUTOR;
            }
            this.resolverFuncao(metodos[i].funcao, declaracao);
        }
        this.finalDoEscopo();
        if (stmt.superClasse !== null)
            this.finalDoEscopo();
        this.ClasseAtual = enclosingClass;
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoSuper = function (expr) {
        if (this.ClasseAtual === TipoClasse.NENHUM) {
            this.Delegua.erro(expr.palavraChave, "Não pode usar 'super' fora de uma classe.");
        }
        else if (this.ClasseAtual !== TipoClasse.SUBCLASSE) {
            this.Delegua.erro(expr.palavraChave, "Não se usa 'super' numa classe sem SuperClasse.");
        }
        this.resolverLocal(expr, expr.palavraChave);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoObter = function (expr) {
        this.resolver(expr.objeto);
        return null;
    };
    ResolverEguaClassico.prototype.visitarDeclaracaoDeExpressao = function (stmt) {
        this.resolver(stmt.expressao);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoSe = function (stmt) {
        this.resolver(stmt.condicao);
        this.resolver(stmt.thenBranch);
        for (var i = 0; i < stmt.elifBranches.length; i++) {
            this.resolver(stmt.elifBranches[i].condicao);
            this.resolver(stmt.elifBranches[i].branch);
        }
        if (stmt.elseBranch !== null)
            this.resolver(stmt.elseBranch);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoImportar = function (stmt) {
        this.resolver(stmt.caminho);
    };
    ResolverEguaClassico.prototype.visitarExpressaoEscreva = function (stmt) {
        this.resolver(stmt.expressao);
    };
    ResolverEguaClassico.prototype.visitarExpressaoRetornar = function (stmt) {
        if (this.FuncaoAtual === TipoFuncao.NENHUM) {
            this.Delegua.erro(stmt.palavraChave, "Não é possível retornar do código do escopo superior.");
        }
        if (stmt.valor !== null) {
            if (this.FuncaoAtual === TipoFuncao.CONSTRUTOR) {
                this.Delegua.erro(stmt.palavraChave, "Não pode retornar o valor do construtor.");
            }
            this.resolver(stmt.valor);
        }
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoEscolha = function (stmt) {
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ESCOLHA;
        var branches = stmt.branches;
        var defaultBranch = stmt.defaultBranch;
        for (var i = 0; i < branches.length; i++) {
            this.resolver(branches[i]["stmts"]);
        }
        if (defaultBranch !== null)
            this.resolver(defaultBranch["stmts"]);
        this.cicloAtual = enclosingType;
    };
    ResolverEguaClassico.prototype.visitarExpressaoEnquanto = function (stmt) {
        this.resolver(stmt.condicao);
        this.resolver(stmt.corpo);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoPara = function (stmt) {
        if (stmt.inicializador !== null) {
            this.resolver(stmt.inicializador);
        }
        if (stmt.condicao !== null) {
            this.resolver(stmt.condicao);
        }
        if (stmt.incrementar !== null) {
            this.resolver(stmt.incrementar);
        }
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ENQUANTO;
        this.resolver(stmt.corpo);
        this.cicloAtual = enclosingType;
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoFazer = function (stmt) {
        this.resolver(stmt.whileCondition);
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.FAZER;
        this.resolver(stmt.doBranch);
        this.cicloAtual = enclosingType;
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoBinaria = function (expr) {
        this.resolver(expr.esquerda);
        this.resolver(expr.direita);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDeChamada = function (expr) {
        this.resolver(expr.callee);
        var argumentos = expr.argumentos;
        for (var i = 0; i < argumentos.length; i++) {
            this.resolver(argumentos[i]);
        }
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoAgrupamento = function (expr) {
        this.resolver(expr.expressao);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDicionario = function (expr) {
        for (var i = 0; i < expr.chaves.length; i++) {
            this.resolver(expr.chaves[i]);
            this.resolver(expr.valores[i]);
        }
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoVetor = function (expr) {
        for (var i = 0; i < expr.valores.length; i++) {
            this.resolver(expr.valores[i]);
        }
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoVetorIndice = function (expr) {
        this.resolver(expr.callee);
        this.resolver(expr.indice);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoContinua = function (stmt) {
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoPausa = function (stmt) {
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expr) {
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoLiteral = function (expr) {
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoLogica = function (expr) {
        this.resolver(expr.esquerda);
        this.resolver(expr.direita);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoUnaria = function (expr) {
        this.resolver(expr.direita);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoDefinir = function (expr) {
        this.resolver(expr.valor);
        this.resolver(expr.objeto);
        return null;
    };
    ResolverEguaClassico.prototype.visitarExpressaoIsto = function (expr) {
        if (this.ClasseAtual == TipoClasse.NENHUM) {
            this.Delegua.erro(expr.palavraChave, "Não pode usar 'isto' fora da classe.");
        }
        this.resolverLocal(expr, expr.palavraChave);
        return null;
    };
    return ResolverEguaClassico;
}());
exports.ResolverEguaClassico = ResolverEguaClassico;
;

},{"../erro-resolvedor":62,"../pilha-escopos":64}],62:[function(require,module,exports){
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
    function ErroResolvedor(mensagem) {
        var _this = _super.call(this, mensagem) || this;
        _this.mensagem = mensagem;
        return _this;
    }
    return ErroResolvedor;
}(Error));
exports.ErroResolvedor = ErroResolvedor;

},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
var pilha_escopos_1 = require("./pilha-escopos");
var erro_resolvedor_1 = require("./erro-resolvedor");
var TipoFuncao = {
    NENHUM: "NENHUM",
    FUNCAO: "FUNCAO",
    CONSTRUTOR: "CONSTRUTOR",
    METODO: "METODO"
};
var TipoClasse = {
    NENHUM: "NENHUM",
    CLASSE: "CLASSE",
    SUBCLASSE: "SUBCLASSE"
};
var LoopType = {
    NENHUM: "NENHUM",
    ENQUANTO: "ENQUANTO",
    ESCOLHA: "ESCOLHA",
    PARA: "PARA",
    FAZER: "FAZER"
};
/**
 * O Resolvedor (Resolver) é responsável por catalogar todos os identificadores complexos, como por exemplo: funções, classes, variáveis,
 * e delimitar os escopos onde esses identificadores existem.
 * Exemplo: uma classe A declara dois métodos chamados M e N. Todas as variáveis declaradas dentro de M não podem ser vistas por N, e vice-versa.
 * No entanto, todas as variáveis declaradas dentro da classe A podem ser vistas tanto por M quanto por N.
 */
var Resolver = /** @class */ (function () {
    function Resolver(Delegua, interpretador) {
        this.interpretador = interpretador;
        this.Delegua = Delegua;
        this.escopos = new pilha_escopos_1.PilhaEscopos();
        this.FuncaoAtual = TipoFuncao.NENHUM;
        this.ClasseAtual = TipoClasse.NENHUM;
        this.cicloAtual = TipoClasse.NENHUM;
    }
    Resolver.prototype.definir = function (nome) {
        if (this.escopos.eVazio())
            return;
        this.escopos.topoDaPilha()[nome.lexema] = true;
    };
    Resolver.prototype.declarar = function (nome) {
        if (this.escopos.eVazio())
            return;
        var escopo = this.escopos.topoDaPilha();
        if (escopo.hasOwnProperty(nome.lexema))
            this.Delegua.erro(nome, "Variável com esse nome já declarada neste escopo.");
        escopo[nome.lexema] = false;
    };
    Resolver.prototype.inicioDoEscopo = function () {
        this.escopos.empilhar({});
    };
    Resolver.prototype.finalDoEscopo = function () {
        this.escopos.removerUltimo();
    };
    Resolver.prototype.resolver = function (declaracoes) {
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
    };
    Resolver.prototype.resolverLocal = function (expr, nome) {
        for (var i = this.escopos.pilha.length - 1; i >= 0; i--) {
            if (this.escopos.pilha[i].hasOwnProperty(nome.lexema)) {
                this.interpretador.resolver(expr, this.escopos.pilha.length - 1 - i);
            }
        }
    };
    Resolver.prototype.visitarExpressaoBloco = function (stmt) {
        this.inicioDoEscopo();
        this.resolver(stmt.declaracoes);
        this.finalDoEscopo();
        return null;
    };
    Resolver.prototype.visitarExpressaoDeVariavel = function (expr) {
        if (!this.escopos.eVazio() &&
            this.escopos.topoDaPilha()[expr.nome.lexema] === false) {
            throw new erro_resolvedor_1.ErroResolvedor("Não é possível ler a variável local em seu próprio inicializador.");
        }
        this.resolverLocal(expr, expr.nome);
        return null;
    };
    Resolver.prototype.visitarExpressaoVar = function (stmt) {
        this.declarar(stmt.nome);
        if (stmt.inicializador !== null) {
            this.resolver(stmt.inicializador);
        }
        this.definir(stmt.nome);
        return null;
    };
    Resolver.prototype.visitarExpressaoDeAtribuicao = function (expr) {
        this.resolver(expr.valor);
        this.resolverLocal(expr, expr.nome);
        return null;
    };
    Resolver.prototype.resolverFuncao = function (funcao, funcType) {
        var enclosingFunc = this.FuncaoAtual;
        this.FuncaoAtual = funcType;
        this.inicioDoEscopo();
        var parametros = funcao.parametros;
        if (parametros && parametros.length > 0) {
            for (var i = 0; i < parametros.length; i++) {
                this.declarar(parametros[i]["nome"]);
                this.definir(parametros[i]["nome"]);
            }
        }
        this.resolver(funcao.corpo);
        this.finalDoEscopo();
        this.FuncaoAtual = enclosingFunc;
    };
    Resolver.prototype.visitarExpressaoFuncao = function (stmt) {
        this.declarar(stmt.nome);
        this.definir(stmt.nome);
        this.resolverFuncao(stmt.funcao, TipoFuncao.FUNCAO);
        return null;
    };
    Resolver.prototype.visitarExpressaoDeleguaFuncao = function (stmt) {
        this.resolverFuncao(stmt, TipoFuncao.FUNCAO);
        return null;
    };
    Resolver.prototype.visitarExpressaoTente = function (stmt) {
        this.resolver(stmt.tryBranch);
        if (stmt.catchBranch !== null)
            this.resolver(stmt.catchBranch);
        if (stmt.elseBranch !== null)
            this.resolver(stmt.elseBranch);
        if (stmt.finallyBranch !== null)
            this.resolver(stmt.finallyBranch);
    };
    Resolver.prototype.visitarExpressaoClasse = function (stmt) {
        var enclosingClass = this.ClasseAtual;
        this.ClasseAtual = TipoClasse.CLASSE;
        this.declarar(stmt.nome);
        this.definir(stmt.nome);
        if (stmt.superClasse !== null &&
            stmt.nome.lexema === stmt.superClasse.nome.lexema) {
            this.Delegua.erro("Uma classe não pode herdar de si mesma.");
        }
        if (stmt.superClasse !== null) {
            this.ClasseAtual = TipoClasse.SUBCLASSE;
            this.resolver(stmt.superClasse);
        }
        if (stmt.superClasse !== null) {
            this.inicioDoEscopo();
            this.escopos.topoDaPilha()["super"] = true;
        }
        this.inicioDoEscopo();
        this.escopos.topoDaPilha()["isto"] = true;
        var metodos = stmt.metodos;
        for (var i = 0; i < metodos.length; i++) {
            var declaracao = TipoFuncao.METODO;
            if (metodos[i].nome.lexema === "isto") {
                declaracao = TipoFuncao.CONSTRUTOR;
            }
            this.resolverFuncao(metodos[i].funcao, declaracao);
        }
        this.finalDoEscopo();
        if (stmt.superClasse !== null)
            this.finalDoEscopo();
        this.ClasseAtual = enclosingClass;
        return null;
    };
    Resolver.prototype.visitarExpressaoSuper = function (expr) {
        if (this.ClasseAtual === TipoClasse.NENHUM) {
            this.Delegua.erro(expr.palavraChave, "Não pode usar 'super' fora de uma classe.");
        }
        else if (this.ClasseAtual !== TipoClasse.SUBCLASSE) {
            this.Delegua.erro(expr.palavraChave, "Não se usa 'super' numa classe sem SuperClasse.");
        }
        this.resolverLocal(expr, expr.palavraChave);
        return null;
    };
    Resolver.prototype.visitarExpressaoObter = function (expr) {
        this.resolver(expr.objeto);
        return null;
    };
    Resolver.prototype.visitarDeclaracaoDeExpressao = function (stmt) {
        this.resolver(stmt.expressao);
        return null;
    };
    Resolver.prototype.visitarExpressaoSe = function (stmt) {
        this.resolver(stmt.condicao);
        this.resolver(stmt.thenBranch);
        for (var i = 0; i < stmt.elifBranches.length; i++) {
            this.resolver(stmt.elifBranches[i].condicao);
            this.resolver(stmt.elifBranches[i].branch);
        }
        if (stmt.elseBranch !== null)
            this.resolver(stmt.elseBranch);
        return null;
    };
    Resolver.prototype.visitarExpressaoImportar = function (stmt) {
        this.resolver(stmt.caminho);
    };
    Resolver.prototype.visitarExpressaoEscreva = function (stmt) {
        this.resolver(stmt.expressao);
    };
    Resolver.prototype.visitarExpressaoRetornar = function (stmt) {
        if (this.FuncaoAtual === TipoFuncao.NENHUM) {
            this.Delegua.erro(stmt.palavraChave, "Não é possível retornar do código do escopo superior.");
        }
        if (stmt.valor !== null) {
            if (this.FuncaoAtual === TipoFuncao.CONSTRUTOR) {
                this.Delegua.erro(stmt.palavraChave, "Não pode retornar o valor do construtor.");
            }
            this.resolver(stmt.valor);
        }
        return null;
    };
    Resolver.prototype.visitarExpressaoEscolha = function (stmt) {
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ESCOLHA;
        var branches = stmt.branches;
        var defaultBranch = stmt.defaultBranch;
        for (var i = 0; i < branches.length; i++) {
            this.resolver(branches[i]["stmts"]);
        }
        if (defaultBranch !== null)
            this.resolver(defaultBranch["stmts"]);
        this.cicloAtual = enclosingType;
    };
    Resolver.prototype.visitarExpressaoEnquanto = function (stmt) {
        this.resolver(stmt.condicao);
        this.resolver(stmt.corpo);
        return null;
    };
    Resolver.prototype.visitarExpressaoPara = function (stmt) {
        if (stmt.inicializador !== null) {
            this.resolver(stmt.inicializador);
        }
        if (stmt.condicao !== null) {
            this.resolver(stmt.condicao);
        }
        if (stmt.incrementar !== null) {
            this.resolver(stmt.incrementar);
        }
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ENQUANTO;
        this.resolver(stmt.corpo);
        this.cicloAtual = enclosingType;
        return null;
    };
    Resolver.prototype.visitarExpressaoFazer = function (stmt) {
        this.resolver(stmt.whileCondition);
        var enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.FAZER;
        this.resolver(stmt.doBranch);
        this.cicloAtual = enclosingType;
        return null;
    };
    Resolver.prototype.visitarExpressaoBinaria = function (expr) {
        this.resolver(expr.esquerda);
        this.resolver(expr.direita);
        return null;
    };
    Resolver.prototype.visitarExpressaoDeChamada = function (expr) {
        this.resolver(expr.callee);
        var argumentos = expr.argumentos;
        for (var i = 0; i < argumentos.length; i++) {
            this.resolver(argumentos[i]);
        }
        return null;
    };
    Resolver.prototype.visitarExpressaoAgrupamento = function (expr) {
        this.resolver(expr.expressao);
        return null;
    };
    Resolver.prototype.visitarExpressaoDicionario = function (expr) {
        for (var i = 0; i < expr.chaves.length; i++) {
            this.resolver(expr.chaves[i]);
            this.resolver(expr.valores[i]);
        }
        return null;
    };
    Resolver.prototype.visitarExpressaoVetor = function (expr) {
        for (var i = 0; i < expr.valores.length; i++) {
            this.resolver(expr.valores[i]);
        }
        return null;
    };
    Resolver.prototype.visitarExpressaoVetorIndice = function (expr) {
        this.resolver(expr.callee);
        this.resolver(expr.indice);
        return null;
    };
    Resolver.prototype.visitarExpressaoContinua = function (stmt) {
        return null;
    };
    Resolver.prototype.visitarExpressaoPausa = function (stmt) {
        return null;
    };
    Resolver.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expr) {
        return null;
    };
    Resolver.prototype.visitarExpressaoLiteral = function (expr) {
        return null;
    };
    Resolver.prototype.visitarExpressaoLogica = function (expr) {
        this.resolver(expr.esquerda);
        this.resolver(expr.direita);
        return null;
    };
    Resolver.prototype.visitarExpressaoUnaria = function (expr) {
        this.resolver(expr.direita);
        return null;
    };
    Resolver.prototype.visitarExpressaoDefinir = function (expr) {
        this.resolver(expr.valor);
        this.resolver(expr.objeto);
        return null;
    };
    Resolver.prototype.visitarExpressaoIsto = function (expr) {
        if (this.ClasseAtual == TipoClasse.NENHUM) {
            this.Delegua.erro(expr.palavraChave, "Não pode usar 'isto' fora da classe.");
        }
        this.resolverLocal(expr, expr.palavraChave);
        return null;
    };
    return Resolver;
}());
exports.Resolver = Resolver;
;

},{"./erro-resolvedor":62,"./pilha-escopos":64}],64:[function(require,module,exports){
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
    TENTE: "TENTE",
    TEXTO: "TEXTO",
    VARIAVEL: "VARIAVEL",
    VERDADEIRO: "VERDADEIRO"
};

},{}],66:[function(require,module,exports){

},{}],67:[function(require,module,exports){
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
},{"_process":68}],68:[function(require,module,exports){
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
