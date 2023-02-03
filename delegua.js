(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Delegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaWeb = void 0;
var lexador_1 = require("@designliquido/delegua/fontes/lexador");
var avaliador_sintatico_1 = require("@designliquido/delegua/fontes/avaliador-sintatico");
var interpretador_1 = require("@designliquido/delegua/fontes/interpretador");
var delegua_1 = __importDefault(require("@designliquido/delegua/fontes/tipos-de-simbolos/delegua"));
var matematica = __importStar(require("@designliquido/delegua-matematica"));
var estruturas_1 = require("@designliquido/delegua/fontes/estruturas");
var tradutores_1 = require("@designliquido/delegua/fontes/tradutores");
var DeleguaWeb = /** @class */ (function () {
    function DeleguaWeb(nomeArquivo, funcaoDeRetorno) {
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
        // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
        this.dialeto = "delegua";
        this.tradutorJavascript = new tradutores_1.TradutorJavaScript();
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.lexador = new lexador_1.Lexador();
        this.avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico();
        this.interpretador = new interpretador_1.Interpretador(null, "", false, this.funcaoDeRetorno);
        this.interpretador.interfaceEntradaSaida = {
            question: function (mensagem, callback) {
                var resposta = window.prompt(mensagem);
                callback(resposta);
            }
        };
        var moduloMatematica = new estruturas_1.DeleguaModulo("matematica");
        var chaves = Object.keys(matematica);
        for (var i = 0; i < chaves.length; i++) {
            var funcao = matematica[chaves[i]];
            moduloMatematica.componentes[chaves[i]] = new estruturas_1.FuncaoPadrao(funcao.length, funcao);
        }
        this.interpretador.pilhaEscoposExecucao.definirVariavel("matematica", moduloMatematica);
    }
    DeleguaWeb.prototype.executar = function (retornoImportador, manterAmbiente) {
        if (manterAmbiente === void 0) { manterAmbiente = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, erroLexador, _b, _c, erroAvaliadorSintatico, retornoInterpretador, _d, _e, erroInterpretador, erroEmJavaScript;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (retornoImportador.retornoLexador.erros.length > 0) {
                            for (_i = 0, _a = retornoImportador.retornoLexador.erros; _i < _a.length; _i++) {
                                erroLexador = _a[_i];
                                this.reportar(erroLexador.linha, " no '".concat(erroLexador.caractere, "'"), erroLexador.mensagem);
                            }
                            return [2 /*return*/];
                        }
                        if (retornoImportador.retornoAvaliadorSintatico.erros.length > 0) {
                            for (_b = 0, _c = retornoImportador
                                .retornoAvaliadorSintatico.erros; _b < _c.length; _b++) {
                                erroAvaliadorSintatico = _c[_b];
                                this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.interpretador.interpretar(retornoImportador.retornoAvaliadorSintatico.declaracoes, manterAmbiente)];
                    case 1:
                        retornoInterpretador = _f.sent();
                        if (retornoInterpretador.erros.length > 0) {
                            for (_d = 0, _e = retornoInterpretador.erros; _d < _e.length; _d++) {
                                erroInterpretador = _e[_d];
                                if (erroInterpretador.simbolo) {
                                    this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
                                }
                                else {
                                    erroEmJavaScript = erroInterpretador;
                                    console.error("Erro em JavaScript: " + "".concat(erroEmJavaScript.message));
                                    console.error("Pilha de execu\u00E7\u00E3o: " + "".concat(erroEmJavaScript.stack));
                                }
                            }
                        }
                        return [2 /*return*/, {
                                erros: retornoInterpretador.erros,
                                resultado: retornoInterpretador.resultado,
                            }];
                }
            });
        });
    };
    DeleguaWeb.prototype.versao = function () {
        return "0.11";
    };
    DeleguaWeb.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "]") +
                " Erro".concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    DeleguaWeb.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === delegua_1.default.EOF) {
            this.reportar(Number(simbolo.linha), " no final", mensagemDeErro);
        }
        else {
            this.reportar(Number(simbolo.linha), " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    DeleguaWeb.prototype.erroEmTempoDeExecucao = function (erro) {
        if (erro && erro.simbolo && erro.simbolo.linha) {
            if (this.nomeArquivo)
                console.error("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "]") +
                    " ".concat(erro.mensagem));
            else
                console.error("Erro: [Linha: ".concat(erro.simbolo.linha, "]") + " ".concat(erro.mensagem));
        }
        else {
            console.error("Erro: [Linha: ".concat(erro.linha || 0, "]") + " ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return DeleguaWeb;
}());
exports.DeleguaWeb = DeleguaWeb;

},{"@designliquido/delegua-matematica":8,"@designliquido/delegua/fontes/avaliador-sintatico":14,"@designliquido/delegua/fontes/estruturas":65,"@designliquido/delegua/fontes/interpretador":74,"@designliquido/delegua/fontes/lexador":78,"@designliquido/delegua/fontes/tipos-de-simbolos/delegua":83,"@designliquido/delegua/fontes/tradutores":84}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPontosAbscissa = exports.somaElementosMatriz = void 0;
/**
 * Calcula a soma de todos os elementos da matriz
 * @param {numero[]} matriz Matriz de N dimensões
 * @returns {numero} Retorna o valor da soma dos elementos da matriz
 */
function somaElementosMatriz(matriz) {
    const vetor = matriz.flatMap((n) => n);
    const soma = vetor.reduce((acc, curr) => acc + curr);
    return soma;
}
exports.somaElementosMatriz = somaElementosMatriz;
//FUNÇÃO AFIM E QUADRÁTICA
/**
 * Gera valores para abscissa.
 * @param {inteiro} distancia A distância entra dois pontos.
 * @param {inteiro} valorPontoCentral O ponto central na abscissa.
 * @param {inteiro} numeroPontos Número de pontos a serem gerados (padrão: 7).
 * @returns Um vetor, contendo o número de pontos informado ou definido por padrão em uma abscissa.
 *          Se o número informado é par, um ponto negativo a mais é gerado.
 */
function gerarPontosAbscissa(distancia, valorPontoCentral, numeroPontos) {
    if (!numeroPontos) {
        numeroPontos = 7;
    }
    const elementoInicial = valorPontoCentral - (((numeroPontos / 2) >> 0) * distancia);
    const vetor = [];
    for (let i = 0; i < numeroPontos; i++) {
        vetor.push(elementoInicial + (i * distancia));
    }
    return vetor;
}
exports.gerarPontosAbscissa = gerarPontosAbscissa;
;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limite = void 0;
/**
 * Calcula o limite.
 * @param {numero} valor Valor numérico.
 * @param {numero} min Valor mínimo.
 * @param {numero} max Valor máximo.
 * @returns O cálculo do limite.
 */
function limite(valor, min, max) {
    return valor < min ? min : (valor > max ? max : valor);
}
exports.limite = limite;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jurosCompostos = exports.jurosSimples = void 0;
/**
 * Calcula o juros simples
 * @param {numero} capital Capital inicial.
 * @param {numero} taxaDeJuros Taxa de juros.
 * @param {numero} tempo Tempo da aplicação em meses.
 * @returns O valor do juros.
 */
function jurosSimples(capital, taxaDeJuros, tempo) {
    taxaDeJuros = taxaDeJuros / 100;
    const juros = (capital * taxaDeJuros * tempo);
    // const montante = capital + juros;
    return juros;
}
exports.jurosSimples = jurosSimples;
/**
 * Calcula o juros composto
 * @param {numero} capital Capital inicial.
 * @param {numero} taxaDeJuros Taxa de juros.
 * @param {numero} tempo Tempo da aplicação em meses.
 * @returns O valor do juros.
 */
function jurosCompostos(capital, taxaDeJuros, tempo) {
    taxaDeJuros = taxaDeJuros / 100;
    const montante = capital * ((1 + taxaDeJuros) ** tempo);
    const juros = montante - capital;
    return juros;
}
exports.jurosCompostos = jurosCompostos;
;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linspace = exports.fun2R = exports.yVertice = exports.xVertice = exports.fun2 = exports.fun1R = exports.fun1 = void 0;
const funcoes_algebricas_1 = require("./funcoes-algebricas");
/**
 * Retorna o desenho da função afim.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @returns O desenho da função afim.
 */
function fun1(a, b) {
    const x = [b - 4, b - 3, b - 2, b - 1, b, b + 1, b + 2, b + 3, b + 4];
    const f = x.map(function (x) { return ((x * a) + b); });
    return ['f(x) =' + f];
}
exports.fun1 = fun1;
/**
 * Calcula a raíz da função afim.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @returns A raiz da função afim.
 */
function fun1R(a, b) {
    return (-1 * b) / a;
}
exports.fun1R = fun1R;
;
/**
 * Retorna o desenho da função quadrática.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @param {number} c O valor de c.
 * @returns O desenho da função quadrática.
 */
function fun2(a, b, c) {
    const n = 2.5;
    var arr = [];
    var step = (n - (-n)) / (n - 1);
    for (var i = 0; i < n; i = i + 0.01) {
        arr.push(((-n - 1.945) + (step * i)));
    }
    const x = arr;
    const f = x.map(function (x) { return ((x * x * a) + (b * x) + c); });
    return f;
}
exports.fun2 = fun2;
/**
 * Calcula x do vértice.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @param {number} c O valor de c.
 * @returns As raizes da função quadrática.
 */
function xVertice(a, b, c) {
    const xv = (-1 * b) / (2 * a);
    return xv;
}
exports.xVertice = xVertice;
;
/**
 * Calcula y do vértice.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @param {number} c O valor de c.
 * @returns As raizes da função quadrática.
 */
function yVertice(a, b, c) {
    const yv = (-1 * (Math.pow(b, 2) - (4 * a * c))) / 4 * a;
    return yv;
}
exports.yVertice = yVertice;
;
/**
 * Calcula as raízes da função quadrática.
 * @param {number} a O valor de a.
 * @param {number} b O valor de b.
 * @param {number} c O valor de c.
 * @returns As raizes da função quadrática.
 */
function fun2R(a, b, c) {
    const r1 = ((-1 * b) + (0, funcoes_algebricas_1.raizQuadrada)((b ** 2) - (4 * a * c))) / (2 * a);
    const r2 = ((-1 * b) - (0, funcoes_algebricas_1.raizQuadrada)((b ** 2) - (4 * a * c))) / (2 * a);
    return [r1, r2];
}
exports.fun2R = fun2R;
;
/**
 * Preenche um intervalo entre dois números dada uma cardinalidade.
 * @param {numero} valorInicial O valor inicial.
 * @param {numero} valorDeParada O valor de parada.
 * @param {numero} cardinalidade A cardinalidade.
 * @returns
 */
function linspace(valorInicial, valorDeParada, cardinalidade) {
    const lista = [];
    const passo = (valorDeParada - valorInicial) / (cardinalidade - 1);
    for (var i = 0; i < cardinalidade; i++) {
        lista.push(valorInicial + (passo * i));
    }
    return lista;
}
exports.linspace = linspace;
;

},{"./funcoes-algebricas":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raizQuadrada = exports.aleatorio = exports.potencia = exports.logaritmo = exports.exp = void 0;
/**
 * Retorna a constante de Euler elevada ao valor passado por parâmetro
 * @param {numero} valor A potência a elevar a constante e
 * @returns Valor da constante e elevado à potência
 */
function exp(valor) {
    return Math.exp(valor);
}
exports.exp = exp;
/**
 * Calcula o logarítimo natural.
 * @param {number} valor Número a ser calculado.
 * @returns O logarítimo do número.
 */
function logaritmo(valor) {
    return Math.log(valor);
}
exports.logaritmo = logaritmo;
/**
 * Faz a exponenciação de uma base a determinado expoente.
 * @param {number} base O valor da base.
 * @param {number} expoente O valor do expoente.
 * @returns O cálculo da exponenciação.
 */
function potencia(base, expoente) {
    return Math.pow(base, expoente);
}
exports.potencia = potencia;
/**
 * Gera e retorna um valor aleatório.
 * @returns Valor aleatório
 */
//Funçao que gera um valor aleatório
function aleatorio() {
    return Math.random();
}
exports.aleatorio = aleatorio;
/**
 * Calcula a raíz quadrada.
 * @param {number} valor Um número para aplicar a radiciação.
 * @returns O valor da radiciação.
 */
function raizQuadrada(valor) {
    return Math.sqrt(valor);
}
exports.raizQuadrada = raizQuadrada;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pontoMedio = exports.distanciaDoisPontos = exports.areaTriangulo = exports.areaTrapezio = exports.areaLosango = exports.areaRetangulo = exports.areaQuadrado = exports.areaCirculo = void 0;
const funcoes_algebricas_1 = require("./funcoes-algebricas");
/**
 * Função da área do círculo.
 * @param {numero} raio Raio do circulo.
 * @returns A área do círculo.
 */
function areaCirculo(raio) {
    return ((Math.PI * raio * raio * 100) / 100);
}
exports.areaCirculo = areaCirculo;
/**
 * Função da área do quadrado.
 * @param {numero} lado Lado do quadrado.
 * @returns A área do quadrado.
 */
function areaQuadrado(lado) {
    return lado * lado;
}
exports.areaQuadrado = areaQuadrado;
/**
 * Função da área do retângulo.
 * @param {numero} ladoX Lado eixo x do retângulo.
 * @param {numero} ladoY Lado eixo y do retângulo.
 * @returns A área do retângulo.
 */
function areaRetangulo(ladoX, ladoY) {
    return ladoX * ladoY;
}
exports.areaRetangulo = areaRetangulo;
/**
 * Função da área do losango.
 * @param {numero} diagonalMaior Lado eixo x do losango.
 * @param {numero} diagonalMenor Lado eixo y do losango.
 * @returns A área do losango.
 */
function areaLosango(diagonalMaior, diagonalMenor) {
    return (diagonalMaior * diagonalMenor) / 2;
}
exports.areaLosango = areaLosango;
/**
 * Função da área do trapézio.
 * @param {numero} baseMaior Base maior do trapézio.
 * @param {numero} baseMenor Base menor do trapézio.
 * @param {numero} altura Altura do trapézio.
 * @returns A área do trapézio.
 */
function areaTrapezio(baseMaior, baseMenor, altura) {
    return ((baseMaior + baseMenor) * altura) / 2;
}
exports.areaTrapezio = areaTrapezio;
/**
 * Função da área do triângulo.
 * @param {numero} base Base do triângulo.
 * @param {numero} altura Altura do triângulo.
 * @returns A área do triângulo.
 */
function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}
exports.areaTriangulo = areaTriangulo;
/**
 * Função distância entre 2 pontos.
 * @param {numero} x1 x inicial.
 * @param {numero} x2 x final.
 * @param {numero} y1 y inicial.
 * @param {numero} y2 y final.
 * @returns A distância entre os dois pontos.
 */
function distanciaDoisPontos(x1, x2, y1, y2) {
    const x = ((0, funcoes_algebricas_1.potencia)(x2, 2)) - 2 * x2 * x1 + ((0, funcoes_algebricas_1.potencia)(x1, 2));
    const y = ((0, funcoes_algebricas_1.potencia)(y2, 2)) - 2 * y2 * y1 + ((0, funcoes_algebricas_1.potencia)(y1, 2));
    return (0, funcoes_algebricas_1.raizQuadrada)((x + y));
}
exports.distanciaDoisPontos = distanciaDoisPontos;
/**
 * Função do ponto médio.
 * @param {numero} x1 x inicial.
 * @param {numero} x2 x final.
 * @param {numero} y1 y inicial.
 * @param {numero} y2 y final.
 * @returns Uma lista contendo o ponto médio de x e y respectivamente.
 */
function pontoMedio(x1, x2, y1, y2) {
    const xm = (x2 + x1) / 2;
    const ym = (y2 + y1) / 2;
    return [xm, ym];
}
exports.pontoMedio = pontoMedio;

},{"./funcoes-algebricas":6}],8:[function(require,module,exports){
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
__exportStar(require("./algebra-linear"), exports);
__exportStar(require("./calculo-diferencial-integral"), exports);
__exportStar(require("./financeira"), exports);
__exportStar(require("./funcao-primeiro-grau"), exports);
__exportStar(require("./funcoes-algebricas"), exports);
__exportStar(require("./geometria-plana"), exports);
__exportStar(require("./miscelanea"), exports);
__exportStar(require("./trigonometria"), exports);
__exportStar(require("./vetores"), exports);

},{"./algebra-linear":2,"./calculo-diferencial-integral":3,"./financeira":4,"./funcao-primeiro-grau":5,"./funcoes-algebricas":6,"./geometria-plana":7,"./miscelanea":9,"./trigonometria":10,"./vetores":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arredondarParaBaixo = exports.pontosAleatorios = exports.aprox = void 0;
/**
 * Aproximação de valores.
 * @param {number} x Um valor a ser arredondado.
 * @param {number} casasDecimais O número de casas decimais.
 * @returns O arredondamento do valor.
 */
function aprox(x, casasDecimais) {
    if (casasDecimais == undefined) {
        casasDecimais = 2;
    }
    if (typeof x == "number") {
        return x.toFixed(casasDecimais);
    }
    if (x[0].length == undefined) {
        // Vetor de 1 dimensão
        for (let i = 0; i < x.length; i++) {
            x[i] = parseFloat(x[i].toFixed(casasDecimais));
        }
        return x;
    }
    for (let i = 0; i < x.length; i++) {
        // Vetor de 2 dimensões
        for (let j = 0; j < x[0].length; j++) {
            x[i][j] = parseFloat(x[i][j].toFixed(casasDecimais));
        }
    }
    return x;
}
exports.aprox = aprox;
/**
 * Cria um vetor de números aleatórios.
 * @param {numero} numeroPontos O número de pontos aleatórios a ser gerado.
 * @returns O vetor de números aleatórios.
 */
function pontosAleatorios(numeroPontos) {
    let ex = 0;
    const x = [];
    x[0] = 100;
    for (let i = 1; i < numeroPontos; i++) {
        x[i] = ex + x[i - 1] + Math.random() * 2 - 1;
    }
    return aprox(x, 2);
}
exports.pontosAleatorios = pontosAleatorios;
//
/**
 * Arredonda o número passado por parâmetro para baixo.
 * @param {numero} valor O valor a ser arredondado.
 * @returns O valor arredondado para baixo, como um número inteiro.
 */
function arredondarParaBaixo(valor) {
    return Math.floor(valor);
}
exports.arredondarParaBaixo = arredondarParaBaixo;

},{}],10:[function(require,module,exports){
"use strict";
/*TRIGONOMETRIA*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiano = exports.arcoTangente = exports.arcoSeno = exports.arcoCosseno = exports.tangente = exports.cosseno = exports.seno = exports.graus = exports.pi = void 0;
/**
 * Constante pi.
 * @see https://pt.wikipedia.org/wiki/Pi
 */
function pi() { return Math.PI; }
exports.pi = pi;
/**
 * Converte radiano para graus.
 * @param {numero} angulo Ângulo em radianos
 * @returns O ângulo em graus
 */
function graus(angulo) {
    return angulo * (180 / Math.PI);
}
exports.graus = graus;
/**
 * Calcula o valor do seno de um ângulo.
 * @param {numero} angulo Ângulo em radiano.
 * @returns O seno do ângulo.
 */
function seno(angulo) {
    return Math.sin(angulo);
}
exports.seno = seno;
/**
 * Calcula o valor do cosseno de um ângulo.
 * @param {numero} angulo Ângulo em radiano.
 * @returns O cosseno do ângulo.
 */
function cosseno(angulo) {
    return Math.cos(angulo);
}
exports.cosseno = cosseno;
/**
 * Calcula o valor da tangente de um ângulo.
 * @param {numero} angulo Ângulo em radiano.
 * @returns A tangente do ângulo.
 */
function tangente(angulo) {
    return Math.tan(angulo);
}
exports.tangente = tangente;
/**
 * Calcula o arco cosseno de um número.
 * @param {numero} valor Um valor.
 * @returns O arco cosseno.
 */
function arcoCosseno(valor) {
    return Math.acos(valor);
}
exports.arcoCosseno = arcoCosseno;
/**
 * Calcula o arco seno de um número.
 * @param {numero} valor Um valor.
 * @returns O arco seno.
 */
function arcoSeno(valor) {
    return Math.asin(valor);
}
exports.arcoSeno = arcoSeno;
/**
 * Calcula o arco tangente de um número.
 * @param {numero} valor Um valor.
 * @returns O arco tangente.
 */
function arcoTangente(valor) {
    return Math.atan(valor);
}
exports.arcoTangente = arcoTangente;
/**
 * Calcula o valor radiano de um ângulo. O radiano é o comprimento do arco formado
 * por um ângulo em uma circunferência.
 * @param {inteiro} angulo O ângulo, em graus, do valor radiano desejado.
 * @returns O valor, em radianos, do arco formado pelo ângulo.
 * @see https://pt.wikipedia.org/wiki/Radiano
 */
function radiano(angulo) {
    return angulo * (Math.PI / 180);
}
exports.radiano = radiano;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeroOcorrencias = exports.comprimentoVetor = void 0;
/**
 * Retorna o comprimento de um vetor.
 * @param {any[]} vetor Um vetor de itens quaisquer.
 * @returns O comprimento do vetor.
 */
function comprimentoVetor(vetor) {
    return vetor.length;
}
exports.comprimentoVetor = comprimentoVetor;
;
/**
 * Conta quantas vezes um determinado valor aparece em um vetor.
 * @param {qualquer[]} vetor Vetor de elementos
 * @param {qualquer} valor Valor a ser encontrado no vetor
 * @returns Valor inteiro, com o número de vezes que `valor` foi encontrado em `vetor`.
 */
function numeroOcorrencias(vetor, valor) {
    return vetor.filter((v) => (v === valor)).length;
}
exports.numeroOcorrencias = numeroOcorrencias;
;

},{}],12:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintatico = void 0;
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const construtos_1 = require("../construtos");
const erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
const declaracoes_1 = require("../declaracoes");
/**
 * O avaliador sintático (Parser) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
class AvaliadorSintatico {
    constructor(performance = false) {
        this.hashArquivo = 0;
        this.atual = 0;
        this.blocos = 0;
        this.erros = [];
        this.performance = performance;
    }
    erro(simbolo, mensagemDeErro) {
        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }
    consumir(tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual].tipo === tipo;
    }
    verificarTipoProximoSimbolo(tipo) {
        return this.simbolos[this.atual + 1].tipo === tipo;
    }
    simboloAtual() {
        return this.simbolos[this.atual];
    }
    simboloAnterior() {
        return this.simbolos[this.atual - 1];
    }
    estaNoFinal() {
        return this.atual === this.simbolos.length;
    }
    avancarEDevolverAnterior() {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simbolos[this.atual - 1];
    }
    verificarSeSimboloAtualEIgualA(...argumentos) {
        for (let i = 0; i < argumentos.length; i++) {
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }
        return false;
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUPER)) {
            const simboloChave = this.simbolos[this.atual - 1];
            this.consumir(delegua_1.default.PONTO, "Esperado '.' após 'super'.");
            const metodo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome do método da Superclasse.');
            return new construtos_1.Super(this.hashArquivo, simboloChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                const valor = this.atribuir();
                valores.push(valor);
                if (this.simbolos[this.atual].tipo !== delegua_1.default.COLCHETE_DIREITO) {
                    this.consumir(delegua_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_ESQUERDA)) {
            const chaves = [];
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(this.hashArquivo, Number(simboloAtual.linha), [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                const chave = this.atribuir();
                this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                const valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simbolos[this.atual].tipo !== delegua_1.default.CHAVE_DIREITA) {
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
            const simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    finalizarChamada(entidadeChamada) {
        const argumentos = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO)) {
                const nome = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(delegua_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.NEGACAO, delegua_1.default.SUBTRACAO, delegua_1.default.BIT_NOT)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito);
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EXPONENCIACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIVISAO, delegua_1.default.DIVISAO_IGUAL, delegua_1.default.DIVISAO_INTEIRA, delegua_1.default.DIVISAO_INTEIRA_IGUAL, delegua_1.default.MODULO, delegua_1.default.MODULO_IGUAL, delegua_1.default.MULTIPLICACAO, delegua_1.default.MULTIPLICACAO_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    /**
     * Se símbolo de operação é `+`, `-`, `+=` ou `-=`, monta objeto `Binario` para
     * ser avaliado pelo Interpretador.
     * @returns Um Construto, normalmente um `Binario`, ou `Unario` se houver alguma operação unária para ser avaliada.
     */
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUBTRACAO, delegua_1.default.ADICAO, delegua_1.default.MAIS_IGUAL, delegua_1.default.MENOS_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitFill() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MENOR_MENOR, delegua_1.default.MAIOR_MAIOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitE() {
        let expressao = this.bitFill();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_AND)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitFill();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitOu() {
        let expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_OR, delegua_1.default.BIT_XOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitE();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MAIOR, delegua_1.default.MAIOR_IGUAL, delegua_1.default.MENOR, delegua_1.default.MENOR_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitOu();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIFERENTE, delegua_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EM)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.E)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.em();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.OU)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    /**
     * Método que resolve atribuições.
     * @returns Um construto do tipo `Atribuir`, `Conjunto` ou `AtribuicaoSobrescrita`.
     */
    atribuir() {
        const expressao = this.ou();
        if (expressao instanceof construtos_1.Binario &&
            [
                delegua_1.default.MAIS_IGUAL,
                delegua_1.default.MENOS_IGUAL,
                delegua_1.default.MULTIPLICACAO_IGUAL,
                delegua_1.default.DIVISAO_IGUAL,
                delegua_1.default.DIVISAO_INTEIRA_IGUAL,
                delegua_1.default.MODULO_IGUAL,
            ].includes(expressao.operador.tipo)) {
            return new construtos_1.Atribuir(this.hashArquivo, expressao.esquerda.simbolo, expressao);
        }
        else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            const igual = this.simbolos[this.atual - 1];
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                const get = expressao;
                // return new Conjunto(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
                return new construtos_1.DefinirValor(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoSobrescrita(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    expressao() {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.LEIA))
            return this.declaracaoLeia();
        return this.atribuir();
    }
    declaracaoEscreva() {
        const simboloAtual = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        return new declaracoes_1.Expressao(expressao);
    }
    /**
     * Declaração para comando `leia`, para ler dados de entrada do usuário.
     * @returns Um objeto da classe `Leia`.
     */
    declaracaoLeia() {
        const simboloAtual = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos argumentos em instrução `leia`.");
        const argumentos = [];
        if (this.simbolos[this.atual].tipo !== delegua_1.default.PARENTESE_DIREITO) {
            do {
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos em instrução `leia`.");
        return new declaracoes_1.Leia(simboloAtual.hashArquivo, Number(simboloAtual.linha), argumentos);
    }
    blocoEscopo() {
        const declaracoes = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    }
    declaracaoSe() {
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        const condicao = this.expressao();
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        const caminhoEntao = this.resolverDeclaracao();
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, [], caminhoSenao);
    }
    declaracaoEnquanto() {
        try {
            this.blocos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            const condicao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoPara() {
        try {
            const simboloPara = this.simbolos[this.atual - 1];
            this.blocos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            let inicializador;
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            let condicao = null;
            if (!this.verificarTipoSimboloAtual(delegua_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            let incrementar = null;
            if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoSustar() {
        if (this.blocos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'sustar' ou 'pausa' deve estar dentro de um laço de repetição.");
        }
        return new declaracoes_1.Sustar(this.simbolos[this.atual]);
    }
    declaracaoContinua() {
        if (this.blocos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua(this.simbolos[this.atual]);
    }
    declaracaoRetorna() {
        const simboloChave = this.simbolos[this.atual - 1];
        let valor = null;
        if ([delegua_1.default.VARIAVEL,
            delegua_1.default.ISTO,
            delegua_1.default.TEXTO,
            delegua_1.default.NUMERO,
            delegua_1.default.NULO,
            delegua_1.default.VERDADEIRO,
            delegua_1.default.NEGACAO,
            delegua_1.default.FALSO,
            delegua_1.default.PARENTESE_ESQUERDO,
            delegua_1.default.SUPER
        ]) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(simboloChave, valor);
    }
    declaracaoEscolha() {
        try {
            this.blocos += 1;
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            const condicao = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            const caminhos = [];
            let caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CASO)) {
                    const caminhoCondicoes = [this.expressao()];
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(delegua_1.default.CASO)) {
                        this.consumir(delegua_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    const declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simbolos[this.atual], "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    const declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
                    caminhoPadrao = {
                        declaracoes,
                    };
                }
            }
            return new declaracoes_1.Escolha(condicao, caminhos, caminhoPadrao);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoImportar() {
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        const caminho = this.expressao();
        const simboloFechamento = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    }
    declaracaoTente() {
        const simboloTente = this.simbolos[this.atual - 1];
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        const blocoTente = this.blocoEscopo();
        let blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PEGUE)) {
            if (this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_ESQUERDO)) {
                // Caso 1: com parâmetro de erro.
                // `pegue` recebe um `FuncaoConstruto`.
                blocoPegue = this.corpoDaFuncao("bloco `pegue`");
            }
            else {
                // Caso 2: sem parâmetro de erro.
                // `pegue` recebe um bloco.
                this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
                blocoPegue = this.blocoEscopo();
            }
        }
        let blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'senão'.");
            blocoSenao = this.blocoEscopo();
        }
        let blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FINALMENTE)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'finalmente'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(simboloTente.hashArquivo, Number(simboloTente.linha), blocoTente, blocoPegue, null, blocoFinalmente);
    }
    declaracaoFazer() {
        const simboloFazer = this.simbolos[this.atual - 1];
        try {
            this.blocos += 1;
            const caminhoFazer = this.resolverDeclaracao();
            this.consumir(delegua_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            const condicaoEnquanto = this.expressao();
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(simboloFazer.hashArquivo, Number(simboloFazer.linha), caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.blocos -= 1;
        }
    }
    resolverDeclaracao() {
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
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PAUSA, delegua_1.default.SUSTAR))
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
            const simboloInicioBloco = this.simbolos[this.atual - 1];
            return new declaracoes_1.Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
        }
        const simboloAtual = this.simbolos[this.atual];
        if (simboloAtual.tipo === delegua_1.default.IDENTIFICADOR) {
            // Pela gramática, a seguinte situação não pode ocorrer:
            // 1. O símbolo anterior ser um identificador; e
            // 2. O símbolo anterior estar na mesma linha do identificador atual.
            const simboloAnterior = this.simbolos[this.atual - 1];
            if (!!simboloAnterior &&
                simboloAnterior.tipo === delegua_1.default.IDENTIFICADOR &&
                simboloAnterior.linha === simboloAtual.linha) {
                this.erro(this.simbolos[this.atual], 'Não é permitido ter dois identificadores seguidos na mesma linha.');
            }
        }
        return this.declaracaoExpressao();
    }
    /**
     * Caso símbolo atual seja `var`, devolve uma declaração de variável.
     * @returns Um Construto do tipo Var.
     */
    declaracaoDeVariavel() {
        const simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        let inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            inicializador = this.expressao();
        }
        return new declaracoes_1.Var(simbolo, inicializador);
    }
    funcao(tipo) {
        let simbolo;
        switch (this.simbolos[this.atual].tipo) {
            case delegua_1.default.CONSTRUTOR:
                simbolo = this.avancarEDevolverAnterior();
                break;
            default:
                simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, `Esperado nome de ${tipo}.`);
                break;
        }
        return new declaracoes_1.FuncaoDeclaracao(simbolo, this.corpoDaFuncao(tipo));
    }
    logicaComumParametros() {
        const parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {};
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
    }
    corpoDaFuncao(tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        const parenteseEsquerdo = this.consumir(delegua_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}.`);
        let parametros = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, `Esperado '{' antes do escopo do ${tipo}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo);
    }
    declaracaoDeClasse() {
        const simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        let superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.HERDA)) {
            this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da Superclasse.');
            superClasse = new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        const metodos = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    }
    declaracao() {
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
    }
    /**
     * Usado quando há erros na avaliação sintática.
     * Garante que o código não entre em loop infinito.
     * @returns Sempre retorna `void`.
     */
    sincronizar() {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            const tipoSimboloAtual = this.simbolos[this.atual - 1].tipo;
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
    }
    analisar(retornoLexador, hashArquivo) {
        const inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.declaracao());
        }
        if (this.performance) {
            const deltaAnalise = (0, browser_process_hrtime_1.default)(inicioAnalise);
            console.log(`[Avaliador Sintático] Tempo para análise: ${deltaAnalise[0] * 1e9 + deltaAnalise[1]}ns`);
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintatico = AvaliadorSintatico;

},{"../construtos":31,"../declaracoes":51,"../tipos-de-simbolos/delegua":83,"./erro-avaliador-sintatico":13,"browser-process-hrtime":87}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroAvaliadorSintatico = void 0;
class ErroAvaliadorSintatico extends Error {
    constructor(simbolo, mensagem) {
        super(mensagem);
        this.simbolo = simbolo;
        Object.setPrototypeOf(this, ErroAvaliadorSintatico.prototype);
    }
}
exports.ErroAvaliadorSintatico = ErroAvaliadorSintatico;

},{}],14:[function(require,module,exports){
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

},{"./avaliador-sintatico":12,"./erro-avaliador-sintatico":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excecoes_1 = require("../excecoes");
const objeto_delegua_classe_1 = require("../estruturas/objeto-delegua-classe");
const funcao_padrao_1 = require("../estruturas/funcao-padrao");
const delegua_classe_1 = require("../estruturas/delegua-classe");
const estruturas_1 = require("../estruturas");
function default_1(interpretador, pilhaEscoposExecucao) {
    const todosEmCondicao = async function (vetor, funcaoCondicional) {
        if (vetor === null || vetor === undefined)
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função todosEmCondicao() não pode ser nulo.'));
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoCondicional = funcaoCondicional.hasOwnProperty('valor')
            ? funcaoCondicional.valor
            : funcaoCondicional;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função todosEmCondicao() deve ser um vetor.'));
        }
        if (valorFuncaoCondicional.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função todosEmCondicao() deve ser uma função.'));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            if (!await valorFuncaoCondicional.chamar(interpretador, [
                valorVetor[indice],
            ]))
                return false;
        }
        return true;
    };
    // Retorna um número aleatório entre 0 e 1.
    pilhaEscoposExecucao.definirVariavel('aleatorio', new funcao_padrao_1.FuncaoPadrao(1, function () {
        return Math.random();
    }));
    // Retorna um número aleatório de acordo com o parâmetro passado.
    // Mínimo(inclusivo) - Máximo(exclusivo)
    pilhaEscoposExecucao.definirVariavel('aleatorioEntre', new funcao_padrao_1.FuncaoPadrao(1, async function (minimo, maximo) {
        // eslint-disable-next-line prefer-rest-params
        if (!arguments[0]) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "A função recebe ao menos um parâmetro."));
        }
        const valorMinimo = minimo.hasOwnProperty('valor')
            ? minimo.valor
            : minimo;
        if (arguments.length === 1) {
            if (typeof valorMinimo !== 'number') {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "O parâmetro deve ser um número."));
            }
            ;
            return Math.floor(Math.random() * (0 - valorMinimo)) + valorMinimo;
        }
        if (arguments.length > 2) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "A quantidade de parâmetros máxima para esta função é 2."));
        }
        const valorMaximo = maximo.hasOwnProperty('valor')
            ? maximo.valor
            : maximo;
        if (typeof valorMinimo !== 'number' ||
            typeof valorMaximo !== 'number') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Os dois parâmetros devem ser do tipo número.'));
        }
        return Promise.resolve(Math.floor(Math.random() * (valorMaximo - valorMinimo)) +
            valorMinimo);
    }));
    pilhaEscoposExecucao.definirVariavel('algum', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, funcaoPesquisa) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoPesquisa = funcaoPesquisa.hasOwnProperty('valor')
            ? funcaoPesquisa.valor
            : funcaoPesquisa;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoPesquisa.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            if (await valorFuncaoPesquisa.chamar(interpretador, [valorVetor[indice]])) {
                return true;
            }
        }
        return false;
    }));
    pilhaEscoposExecucao.definirVariavel('encontrar', new funcao_padrao_1.FuncaoPadrao(1, async function (vetor, funcaoPesquisa) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoPesquisa = funcaoPesquisa.hasOwnProperty('valor')
            ? funcaoPesquisa.valor
            : funcaoPesquisa;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoPesquisa.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            if (await valorFuncaoPesquisa.chamar(interpretador, [valorVetor[indice]])) {
                return valorVetor[indice];
            }
        }
        return null;
    }));
    pilhaEscoposExecucao.definirVariavel('encontrarUltimo', new funcao_padrao_1.FuncaoPadrao(1, async function (vetor, funcaoPesquisa) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoPesquisa = funcaoPesquisa.hasOwnProperty('valor')
            ? funcaoPesquisa.valor
            : funcaoPesquisa;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoPesquisa.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        for (let indice = valorVetor.length - 1; indice >= 0; --indice) {
            if (await valorFuncaoPesquisa.chamar(interpretador, [valorVetor[indice]])) {
                return valorVetor[indice];
            }
        }
    }));
    pilhaEscoposExecucao.definirVariavel('encontrarIndice', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, funcaoPesquisa) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoPesquisa = funcaoPesquisa.hasOwnProperty('valor')
            ? funcaoPesquisa.valor
            : funcaoPesquisa;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoPesquisa.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            if (await valorFuncaoPesquisa.chamar(interpretador, [valorVetor[indice]])) {
                return indice;
            }
        }
        return -1;
    }));
    pilhaEscoposExecucao.definirVariavel('encontrarUltimoIndice', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, funcaoPesquisa) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoPesquisa = funcaoPesquisa.hasOwnProperty('valor')
            ? funcaoPesquisa.valor
            : funcaoPesquisa;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoPesquisa.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        for (let indice = valorVetor.length - 1; indice >= 0; --indice) {
            if (await valorFuncaoPesquisa.chamar(interpretador, [valorVetor[indice]])) {
                return indice;
            }
        }
    }));
    pilhaEscoposExecucao.definirVariavel('incluido', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, valor) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorValor = valor.hasOwnProperty('valor')
            ? valor.valor
            : valor;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            if (valorVetor[indice] == valorValor) {
                return true;
            }
        }
        return false;
    }));
    pilhaEscoposExecucao.definirVariavel('inteiro', new funcao_padrao_1.FuncaoPadrao(1, async function (numero) {
        if (numero === null || numero === undefined)
            return Promise.resolve(0);
        const valor = numero.hasOwnProperty('valor')
            ? numero.valor
            : numero;
        if (isNaN(valor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece ser um número. Somente números ou textos com números podem ser convertidos para inteiro.'));
        }
        if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para inteiro.'));
        }
        return Promise.resolve(parseInt(valor));
    }));
    pilhaEscoposExecucao.definirVariavel('mapear', new funcao_padrao_1.FuncaoPadrao(1, async function (vetor, funcaoMapeamento) {
        if (vetor === null || vetor === undefined)
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função mapear() não pode ser nulo.'));
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoMapeamento = funcaoMapeamento.hasOwnProperty('valor')
            ? funcaoMapeamento.valor
            : funcaoMapeamento;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função mapear() deve ser um vetor.'));
        }
        if (valorFuncaoMapeamento.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função mapear() deve ser uma função.'));
        }
        const resultados = [];
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            resultados.push(await valorFuncaoMapeamento.chamar(interpretador, [
                valorVetor[indice],
            ]));
        }
        return resultados;
    }));
    pilhaEscoposExecucao.definirVariavel('todos', new funcao_padrao_1.FuncaoPadrao(2, todosEmCondicao));
    pilhaEscoposExecucao.definirVariavel('todosEmCondicao', new funcao_padrao_1.FuncaoPadrao(2, todosEmCondicao));
    pilhaEscoposExecucao.definirVariavel('filtrarPor', new funcao_padrao_1.FuncaoPadrao(1, async function (vetor, funcaoFiltragem) {
        if (vetor === null || vetor === undefined)
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função filtrarPor() não pode ser nulo.'));
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função filtrarPor() deve ser um vetor.'));
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função filtrarPor() deve ser uma função.'));
        }
        const resultados = [];
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            await valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]) &&
                resultados.push(await valorFuncaoFiltragem.chamar(interpretador, [
                    valorVetor[indice],
                ]));
        }
        return resultados;
    }));
    pilhaEscoposExecucao.definirVariavel('primeiroEmCondicao', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, funcaoFiltragem) {
        if (vetor === null || vetor === undefined)
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função primeiroEmCondicao() não pode ser nulo.'));
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função primeiroEmCondicao() deve ser um vetor.'));
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função primeiroEmCondicao() deve ser uma função.'));
        }
        const resultados = [];
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            await valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]) &&
                resultados.push(await valorFuncaoFiltragem.chamar(interpretador, [
                    valorVetor[indice],
                ]));
        }
        return resultados[0];
    }));
    pilhaEscoposExecucao.definirVariavel('paraCada', new funcao_padrao_1.FuncaoPadrao(2, async function (vetor, funcaoFiltragem) {
        if (vetor === null || vetor === undefined)
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função paraCada() não pode ser nulo.'));
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
            ? funcaoFiltragem.valor
            : funcaoFiltragem;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função paraCada() deve ser um vetor.'));
        }
        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função paraCada() deve ser uma função.'));
        }
        for (let indice = 0; indice < valorVetor.length; ++indice) {
            await valorFuncaoFiltragem.chamar(interpretador, [
                valorVetor[indice],
            ]);
        }
    }));
    pilhaEscoposExecucao.definirVariavel('ordenar', new funcao_padrao_1.FuncaoPadrao(1, async function (vetor) {
        if (vetor === null || vetor === undefined)
            throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função ordenar() não pode ser nulo.');
        const objeto = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        if (!Array.isArray(objeto)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor inválido. Objeto inserido não é um vetor.'));
        }
        let trocado;
        const tamanho = objeto.length;
        do {
            trocado = false;
            for (let i = 0; i < tamanho - 1; i++) {
                if (objeto[i] > objeto[i + 1]) {
                    [objeto[i], objeto[i + 1]] = [objeto[i + 1], objeto[i]];
                    trocado = true;
                }
            }
        } while (trocado);
        return Promise.resolve(objeto);
    }));
    pilhaEscoposExecucao.definirVariavel('real', new funcao_padrao_1.FuncaoPadrao(1, async function (numero) {
        if (numero === null || numero === undefined)
            return Promise.resolve(parseFloat('0'));
        const valor = numero.hasOwnProperty('valor')
            ? numero.valor
            : numero;
        if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto/valor vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para real.'));
        }
        return Promise.resolve(parseFloat(valor));
    }));
    pilhaEscoposExecucao.definirVariavel('reduzir', new funcao_padrao_1.FuncaoPadrao(3, async function (vetor, funcaoReducao, padrao = null) {
        const valorVetor = vetor.hasOwnProperty('valor')
            ? vetor.valor
            : vetor;
        const valorFuncaoReducao = funcaoReducao.hasOwnProperty('valor')
            ? funcaoReducao.valor
            : funcaoReducao;
        const valorPadrao = padrao.hasOwnProperty('valor')
            ? padrao.valor
            : padrao;
        if (!Array.isArray(valorVetor)) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O primeiro parâmetro da função deve ser um vetor."));
        }
        if (valorFuncaoReducao.constructor.name !== 'DeleguaFuncao') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, "Parâmetro inválido. O segundo parâmetro da função deve ser uma função."));
        }
        let resultado = valorPadrao;
        let inicio = 0;
        if (!resultado) {
            resultado = vetor[0];
            inicio = 1;
        }
        for (let index = inicio; index < vetor.length; ++index) {
            resultado = await valorFuncaoReducao.chamar(interpretador, [resultado, vetor[index]]);
        }
        return resultado;
    }));
    pilhaEscoposExecucao.definirVariavel('tamanho', new funcao_padrao_1.FuncaoPadrao(1, async function (objeto) {
        const valorObjeto = objeto.hasOwnProperty('valor')
            ? objeto.valor
            : objeto;
        if (typeof valorObjeto === 'number') {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Função global tamanho() não funciona com números.'));
        }
        if (valorObjeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Função global tamanho não funciona com objetos complexos.'));
        }
        if (valorObjeto instanceof estruturas_1.DeleguaFuncao) {
            return Promise.resolve(valorObjeto.declaracao.parametros.length);
        }
        if (valorObjeto instanceof funcao_padrao_1.FuncaoPadrao) {
            return Promise.resolve(valorObjeto.valorAridade);
        }
        if (valorObjeto instanceof delegua_classe_1.DeleguaClasse) {
            const metodos = valorObjeto.metodos;
            let tamanho = 0;
            if (metodos.inicializacao &&
                metodos.inicializacao.eInicializador) {
                tamanho =
                    metodos.inicializacao.declaracao.parametros.length;
            }
            return Promise.resolve(tamanho);
        }
        return Promise.resolve(valorObjeto.length);
    }));
    pilhaEscoposExecucao.definirVariavel('texto', new funcao_padrao_1.FuncaoPadrao(1, async function (valorOuVariavel) {
        return Promise.resolve(`${valorOuVariavel.hasOwnProperty('valor')
            ? valorOuVariavel.valor
            : valorOuVariavel}`);
    }));
    return pilhaEscoposExecucao;
}
exports.default = default_1;

},{"../estruturas":65,"../estruturas/delegua-classe":62,"../estruturas/funcao-padrao":64,"../estruturas/objeto-delegua-classe":68,"../excecoes":71}],16:[function(require,module,exports){
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
const processoFilho = __importStar(require("child_process"));
const caminho = __importStar(require("path"));
const sistemaArquivos = __importStar(require("fs"));
const excecoes_1 = require("../excecoes");
const funcao_padrao_1 = require("../estruturas/funcao-padrao");
const modulo_1 = require("../estruturas/modulo");
const classe_padrao_1 = require("../estruturas/classe-padrao");
const carregarBibliotecaDelegua = (nome) => {
    let dadosDoModulo;
    try {
        dadosDoModulo = require(nome);
    }
    catch (erro) {
        // Biblioteca não existe localmente. Tentar importação global
        try {
            dadosDoModulo = importarPacoteDeleguaCompleto(nome);
        }
        catch (erro2) {
            throw new excecoes_1.ErroEmTempoDeExecucao(null, `Biblioteca ${nome} não encontrada para importação.`);
        }
    }
    return modularizarBiblioteca(dadosDoModulo, nome);
};
const carregarBiblioteca = async (nomeDaBiblioteca, caminhoDaBiblioteca) => {
    let dadosDoModulo;
    try {
        dadosDoModulo = require(caminhoDaBiblioteca);
    }
    catch (erro) {
        try {
            dadosDoModulo = await importarPacoteExternoCompleto(nomeDaBiblioteca);
        }
        catch (erro2) {
            throw new excecoes_1.ErroEmTempoDeExecucao(null, `Biblioteca ${nomeDaBiblioteca} não encontrada para importação. Informações adicionais: ${(erro2 === null || erro2 === void 0 ? void 0 : erro2.message) || "(nenhuma)"}`);
        }
    }
    return modularizarBiblioteca(dadosDoModulo, nomeDaBiblioteca);
};
const modularizarBiblioteca = (dadosDoModulo, nome) => {
    const novoModulo = new modulo_1.DeleguaModulo(nome);
    const chaves = Object.keys(dadosDoModulo);
    for (let i = 0; i < chaves.length; i++) {
        const moduloAtual = dadosDoModulo[chaves[i]];
        if (typeof moduloAtual === 'function') {
            // Por definição, funções tradicionais e classes são identificadas em JavaScript como "functions".
            // A primeira heurística era verificando a propriedade `prototype`, mas isso não funciona bem
            // porque classes e funções avulsas todas possuem prototype.
            // Uma heurística nova é converter `moduloAtual` para `string` e verificar se a declaração começa com `class`.
            // Se sim, podemos dizer que a "function" é uma classe padrão.
            // Caso contrário, é uma função (`FuncaoPadrao`).
            if (String(moduloAtual).startsWith('class')) {
                const classePadrao = new classe_padrao_1.ClassePadrao(chaves[i], moduloAtual);
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
const importarPacoteCaminhoBase = async (caminhoRelativo) => {
    var _a;
    let resultado = null;
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const global = processoFilho.spawnSync(npm, ['root', '--location=global']);
    const caminhoAbsoluto = caminho.join((global.output[1]).toString().trim()) + `\\${caminhoRelativo}\\package.json`;
    let arquivoInicio = JSON.parse(sistemaArquivos.readFileSync(caminhoAbsoluto, 'utf-8')).main || 'index.js';
    await (_a = caminho.join('file:///' + (global.output[1]).toString().trim()) + `\\${caminhoRelativo}\\${arquivoInicio.replace('./', '')}`, Promise.resolve().then(() => __importStar(require(_a)))).then(resposta => {
        resultado = resposta;
    });
    return resultado;
};
const importarPacoteDeleguaCompleto = async (nome) => {
    return await importarPacoteCaminhoBase(`delegua\\node_modules\\${nome}`);
};
const importarPacoteExternoCompleto = async (nome) => {
    return await importarPacoteCaminhoBase(nome);
};
const verificarModulosDelegua = (nome) => {
    const modulos = {
        estatistica: '@designliquido/delegua-estatistica',
        estatística: '@designliquido/delegua-estatistica',
        fisica: '@designliquido/delegua-fisica',
        física: '@designliquido/delegua-fisica',
        json: '@designliquido/delegua-json',
        matematica: '@designliquido/delegua-matematica',
        matemática: '@designliquido/delegua-matematica',
        tempo: '@designliquido/delegua-tempo',
    };
    if (Object.keys(modulos).includes(nome)) {
        return modulos[nome].toString();
    }
    return false;
};
async function default_1(nome) {
    const nomeBibliotecaResolvido = verificarModulosDelegua(nome);
    return nomeBibliotecaResolvido
        ? carregarBibliotecaDelegua(String(nomeBibliotecaResolvido))
        : await carregarBiblioteca(nome, nome);
}
exports.default = default_1;

}).call(this)}).call(this,require('_process'))
},{"../estruturas/classe-padrao":61,"../estruturas/funcao-padrao":64,"../estruturas/modulo":67,"../excecoes":71,"_process":91,"child_process":88,"fs":88,"path":90}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dividir: (texto, divisor, limite) => [
        ...texto.split(divisor, limite),
    ],
    fatiar: (texto, inicio, fim) => texto.slice(inicio, fim),
    inclui: (texto, elemento) => texto.includes(elemento),
    maiusculo: (texto) => texto.toUpperCase(),
    minusculo: (texto) => texto.toLowerCase(),
    substituir: (texto, elemento, substituto) => texto.replace(elemento, substituto),
    subtexto: (texto, inicio, fim) => texto.slice(inicio, fim),
    tamanho: (texto) => texto.length
};

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    adicionar: (vetor, elemento) => {
        vetor.push(elemento);
        return vetor;
    },
    empilhar: (vetor, elemento) => {
        vetor.push(elemento);
        return vetor;
    },
    fatiar: (vetor, inicio, fim) => vetor.slice(inicio, fim),
    inclui: (vetor, elemento) => vetor.includes(elemento),
    inverter: (vetor) => vetor.reverse(),
    juntar: (vetor, separador) => vetor.join(separador),
    ordenar: (vetor) => vetor.sort(),
    remover: (vetor, elemento) => {
        const index = vetor.indexOf(elemento);
        if (index !== -1)
            vetor.splice(index, 1);
        return vetor;
    },
    removerPrimeiro: (vetor) => {
        vetor.shift();
        return vetor;
    },
    removerUltimo: (vetor) => {
        vetor.pop();
        return vetor;
    },
    somar: (vetor) => vetor.reduce((a, b) => a + b),
    tamanho: (vetor) => vetor.length
};

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoIndiceVariavel = void 0;
/**
 * Definido como `Subscript` em Égua Clássico, esse construto serve para acessar índices de
 * vetores e dicionários.
 */
class AcessoIndiceVariavel {
    constructor(hashArquivo, entidadeChamada, indice, simboloFechamento) {
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.indice = indice;
        this.simboloFechamento = simboloFechamento;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoIndiceVariavel(this);
    }
}
exports.AcessoIndiceVariavel = AcessoIndiceVariavel;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoMetodo = void 0;
/**
 * Chamado de `Get` em Égua Clássico, é o construto de acesso a métodos ou membros de
 * classe.
 */
class AcessoMetodo {
    constructor(hashArquivo, objeto, simbolo) {
        this.linha = objeto.linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoMetodo(this);
    }
}
exports.AcessoMetodo = AcessoMetodo;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agrupamento = void 0;
/**
 * Um agrupamento é essencialmente uma expressão qualquer dentro de parênteses.
 * Usado para resolver precedência de operadores. Por exemplo:
 * `(2 + 2) * 5`, `(2 + 2)` é um agrupamento cuja expressão é `2 + 2`.
 */
class Agrupamento {
    constructor(hashArquivo, linha, expressao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.expressao = expressao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAgrupamento(this);
    }
}
exports.Agrupamento = Agrupamento;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoSobrescrita = void 0;
class AtribuicaoSobrescrita {
    constructor(hashArquivo, linha, objeto, indice, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.indice = indice;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAtribuicaoSobrescrita(this);
    }
}
exports.AtribuicaoSobrescrita = AtribuicaoSobrescrita;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
class Atribuir {
    constructor(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDeAtribuicao(this);
    }
}
exports.Atribuir = Atribuir;

},{}],24:[function(require,module,exports){
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
class Binario {
    constructor(hashArquivo, esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoBinaria(this);
    }
}
exports.Binario = Binario;

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamada = void 0;
class Chamada {
    constructor(hashArquivo, entidadeChamada, parentese, argumentos) {
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.parentese = parentese;
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDeChamada(this);
    }
}
exports.Chamada = Chamada;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinirValor = void 0;
class DefinirValor {
    constructor(hashArquivo, linha, objeto, nome, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.nome = nome;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDefinirValor(this);
    }
}
exports.DefinirValor = DefinirValor;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
class Dicionario {
    constructor(hashArquivo, linha, chaves, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.chaves = chaves;
        this.valores = valores;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDicionario(this);
    }
}
exports.Dicionario = Dicionario;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatacaoEscrita = void 0;
/**
 * Um construto de formatação de escrita é utilizado por instruções `escreva`
 * e derivadas para adição de espaços e casas decimais, este último para quando
 * o conteúdo da escrita é um número.
 */
class FormatacaoEscrita {
    constructor(hashArquivo, linha, expressao, espacos, casasDecimais) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.expressao = expressao;
        this.espacos = espacos || -1;
        this.casasDecimais = casasDecimais || -1;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoFormatacaoEscrita(this);
    }
}
exports.FormatacaoEscrita = FormatacaoEscrita;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoConstruto = void 0;
class FuncaoConstruto {
    constructor(hashArquivo, linha, parametros, corpo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeleguaFuncao(this));
    }
}
exports.FuncaoConstruto = FuncaoConstruto;

},{}],31:[function(require,module,exports){
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
__exportStar(require("./definir-valor"), exports);
__exportStar(require("./dicionario"), exports);
__exportStar(require("./construto"), exports);
__exportStar(require("./formatacao-escrita"), exports);
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

},{"./acesso-indice-variavel":19,"./acesso-metodo":20,"./agrupamento":21,"./atribuicao-sobrescrita":22,"./atribuir":23,"./binario":24,"./chamada":25,"./construto":26,"./definir-valor":27,"./dicionario":28,"./formatacao-escrita":29,"./funcao":30,"./isto":32,"./literal":33,"./logico":34,"./super":35,"./unario":36,"./variavel":37,"./vetor":38}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
class Isto {
    constructor(hashArquivo, linha, palavraChave) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.palavraChave = palavraChave;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoIsto(this));
    }
}
exports.Isto = Isto;

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
class Literal {
    constructor(hashArquivo, linha, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoLiteral(this));
    }
}
exports.Literal = Literal;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
class Logico {
    constructor(hashArquivo, esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLogica(this);
    }
}
exports.Logico = Logico;

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
class Super {
    constructor(hashArquivo, simboloChave, metodo) {
        this.linha = Number(simboloChave.linha);
        this.hashArquivo = hashArquivo;
        this.simboloChave = simboloChave;
        this.metodo = metodo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSuper(this));
    }
}
exports.Super = Super;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
class Unario {
    constructor(hashArquivo, operador, direita) {
        this.linha = operador.linha;
        this.hashArquivo = hashArquivo;
        this.operador = operador;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoUnaria(this);
    }
}
exports.Unario = Unario;

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variavel = void 0;
class Variavel {
    constructor(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeVariavel(this));
    }
}
exports.Variavel = Variavel;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
class Vetor {
    constructor(hashArquivo, linha, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valores = valores;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoVetor(this);
    }
}
exports.Vetor = Vetor;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloco = void 0;
const declaracao_1 = require("./declaracao");
class Bloco extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, declaracoes) {
        super(linha, hashArquivo);
        this.declaracoes = declaracoes;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoBloco(this);
    }
}
exports.Bloco = Bloco;

},{"./declaracao":42}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classe = void 0;
const declaracao_1 = require("./declaracao");
class Classe extends declaracao_1.Declaracao {
    constructor(simbolo, superClasse, metodos) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.superClasse = superClasse;
        this.metodos = metodos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoClasse(this);
    }
}
exports.Classe = Classe;

},{"./declaracao":42}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continua = void 0;
const declaracao_1 = require("./declaracao");
class Continua extends declaracao_1.Declaracao {
    constructor(simbolo) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoContinua(this));
    }
}
exports.Continua = Continua;

},{"./declaracao":42}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracao = void 0;
class Declaracao {
    constructor(linha, hashArquivo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        // TODO: Por ora, todos os testes são feitos num script só.
        // Quando iniciarem os testes em múltiplos arquivos e módulos,
        // pensar numa forma melhor de preencher isso.
        this.assinaturaMetodo = '<principal>';
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Este método não deveria ser chamado.'));
    }
}
exports.Declaracao = Declaracao;

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquanto = void 0;
const declaracao_1 = require("./declaracao");
class Enquanto extends declaracao_1.Declaracao {
    constructor(condicao, corpo) {
        super(condicao.linha, condicao.hashArquivo);
        this.condicao = condicao;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEnquanto(this);
    }
}
exports.Enquanto = Enquanto;

},{"./declaracao":42}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escolha = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Declaração de escolha de caminho a executar de acordo com literal ou identificador.
 */
class Escolha extends declaracao_1.Declaracao {
    constructor(identificadorOuLiteral, caminhos, caminhoPadrao) {
        super(identificadorOuLiteral.linha, identificadorOuLiteral.hashArquivo);
        this.identificadorOuLiteral = identificadorOuLiteral;
        this.caminhos = caminhos;
        this.caminhoPadrao = caminhoPadrao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEscolha(this);
    }
}
exports.Escolha = Escolha;

},{"./declaracao":42}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrevaMesmaLinha = void 0;
const declaracao_1 = require("./declaracao");
class EscrevaMesmaLinha extends declaracao_1.Declaracao {
    constructor(linha, hashArquivo, argumentos) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEscrevaMesmaLinha(this);
    }
}
exports.EscrevaMesmaLinha = EscrevaMesmaLinha;

},{"./declaracao":42}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escreva = void 0;
const declaracao_1 = require("./declaracao");
class Escreva extends declaracao_1.Declaracao {
    constructor(linha, hashArquivo, argumentos) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEscreva(this);
    }
}
exports.Escreva = Escreva;

},{"./declaracao":42}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressao = void 0;
const declaracao_1 = require("./declaracao");
class Expressao extends declaracao_1.Declaracao {
    constructor(expressao) {
        super(expressao.linha, expressao.hashArquivo);
        this.expressao = expressao;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoDeExpressao(this);
    }
}
exports.Expressao = Expressao;

},{"./declaracao":42}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fazer = void 0;
const declaracao_1 = require("./declaracao");
class Fazer extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, caminhoFazer, condicaoEnquanto) {
        super(linha, hashArquivo);
        this.caminhoFazer = caminhoFazer;
        this.condicaoEnquanto = condicaoEnquanto;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoFazer(this);
    }
}
exports.Fazer = Fazer;

},{"./declaracao":42}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoDeclaracao = void 0;
const declaracao_1 = require("./declaracao");
class FuncaoDeclaracao extends declaracao_1.Declaracao {
    constructor(simbolo, funcao) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.funcao = funcao;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoFuncao(this));
    }
}
exports.FuncaoDeclaracao = FuncaoDeclaracao;

},{"./declaracao":42}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importar = void 0;
const declaracao_1 = require("./declaracao");
class Importar extends declaracao_1.Declaracao {
    constructor(caminho, simboloFechamento) {
        super(caminho.linha, caminho.hashArquivo);
        this.caminho = caminho;
        this.simboloFechamento = simboloFechamento;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoImportar(this);
    }
}
exports.Importar = Importar;

},{"./declaracao":42}],51:[function(require,module,exports){
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
__exportStar(require("./declaracao"), exports);
__exportStar(require("./enquanto"), exports);
__exportStar(require("./escolha"), exports);
__exportStar(require("./escreva"), exports);
__exportStar(require("./escreva-mesma-linha"), exports);
__exportStar(require("./expressao"), exports);
__exportStar(require("./fazer"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./importar"), exports);
__exportStar(require("./leia"), exports);
__exportStar(require("./para"), exports);
__exportStar(require("./sustar"), exports);
__exportStar(require("./retorna"), exports);
__exportStar(require("./se"), exports);
__exportStar(require("./tente"), exports);
__exportStar(require("./var"), exports);

},{"./bloco":39,"./classe":40,"./continua":41,"./declaracao":42,"./enquanto":43,"./escolha":44,"./escreva":46,"./escreva-mesma-linha":45,"./expressao":47,"./fazer":48,"./funcao":49,"./importar":50,"./leia":52,"./para":53,"./retorna":54,"./se":55,"./sustar":56,"./tente":57,"./var":58}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leia = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Declaração que pede a leitura de uma informação da entrada
 * configurada no início da aplicação.
 */
class Leia extends declaracao_1.Declaracao {
    constructor(linha, hashArquivo, argumentos) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLeia(this);
    }
}
exports.Leia = Leia;

},{"./declaracao":42}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Para = void 0;
const declaracao_1 = require("./declaracao");
class Para extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, inicializador, condicao, incrementar, corpo) {
        super(linha, hashArquivo);
        this.inicializador = inicializador;
        this.condicao = condicao;
        this.incrementar = incrementar;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoPara(this);
    }
}
exports.Para = Para;

},{"./declaracao":42}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorna = void 0;
const declaracao_1 = require("./declaracao");
class Retorna extends declaracao_1.Declaracao {
    constructor(simboloChave, valor) {
        super(Number(simboloChave.linha), simboloChave.hashArquivo);
        this.simboloChave = simboloChave;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoRetornar(this);
    }
}
exports.Retorna = Retorna;

},{"./declaracao":42}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Se = void 0;
const declaracao_1 = require("./declaracao");
class Se extends declaracao_1.Declaracao {
    constructor(condicao, caminhoEntao, caminhosSeSenao, caminhoSenao) {
        super(condicao.linha, condicao.hashArquivo);
        this.condicao = condicao;
        this.caminhoEntao = caminhoEntao;
        this.caminhosSeSenao = caminhosSeSenao;
        this.caminhoSenao = caminhoSenao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoSe(this);
    }
}
exports.Se = Se;

},{"./declaracao":42}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sustar = void 0;
const declaracao_1 = require("./declaracao");
class Sustar extends declaracao_1.Declaracao {
    constructor(simbolo) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSustar(this));
    }
}
exports.Sustar = Sustar;

},{"./declaracao":42}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tente = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Declaração `tente`.
 */
class Tente extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, caminhoTente, caminhoPegue, caminhoSenao, caminhoFinalmente) {
        super(linha, hashArquivo);
        this.caminhoTente = caminhoTente;
        this.caminhoPegue = caminhoPegue;
        this.caminhoSenao = caminhoSenao;
        this.caminhoFinalmente = caminhoFinalmente;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoTente(this);
    }
}
exports.Tente = Tente;

},{"./declaracao":42}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Var = void 0;
const declaracao_1 = require("./declaracao");
class Var extends declaracao_1.Declaracao {
    constructor(simbolo, inicializador) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.inicializador = inicializador;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoVar(this);
    }
}
exports.Var = Var;

},{"./declaracao":42}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspacoVariaveis = void 0;
class EspacoVariaveis {
    constructor() {
        this.valores = {};
    }
}
exports.EspacoVariaveis = EspacoVariaveis;

},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamavel = void 0;
class Chamavel {
    aridade() {
        return this.valorAridade;
    }
    chamar(interpretador, argumentos, simbolo) {
        throw new Error('Este método não deveria ser chamado.');
    }
}
exports.Chamavel = Chamavel;

},{}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassePadrao = void 0;
const chamavel_1 = require("./chamavel");
/**
 * Classe de importação de classes de bibliotecas do JavaScript.
 */
class ClassePadrao extends chamavel_1.Chamavel {
    constructor(nome, funcaoDeClasse) {
        super();
        this.nome = nome;
        this.funcaoDeClasse = funcaoDeClasse;
    }
    paraTexto() {
        return `<classe-padrão ${this.nome}>`;
    }
    /**
     * Para o caso de uma classe padrão, instanciá-la é chamá-la
     * como função tendo a palavra 'new' na frente.
     * @param argumentos
     * @param simbolo
     */
    chamar(argumentos, simbolo) {
        const novoObjeto = new this.funcaoDeClasse();
        return novoObjeto;
    }
}
exports.ClassePadrao = ClassePadrao;

},{"./chamavel":60}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaClasse = void 0;
const chamavel_1 = require("./chamavel");
const objeto_delegua_classe_1 = require("./objeto-delegua-classe");
class DeleguaClasse extends chamavel_1.Chamavel {
    constructor(nome, superClasse, metodos) {
        super();
        this.nome = nome;
        this.superClasse = superClasse;
        this.metodos = metodos;
    }
    encontrarMetodo(nome) {
        if (this.metodos.hasOwnProperty(nome)) {
            return this.metodos[nome];
        }
        if (this.superClasse !== null) {
            return this.superClasse.encontrarMetodo(nome);
        }
        return undefined;
    }
    paraTexto() {
        return `<classe ${this.nome}>`;
    }
    aridade() {
        const inicializador = this.encontrarMetodo('construtor');
        return inicializador ? inicializador.aridade() : 0;
    }
    chamar(interpretador, argumentos) {
        const instancia = new objeto_delegua_classe_1.ObjetoDeleguaClasse(this);
        const inicializador = this.encontrarMetodo('construtor');
        if (inicializador) {
            inicializador
                .definirInstancia(instancia)
                .chamar(interpretador, argumentos);
        }
        return instancia;
    }
}
exports.DeleguaClasse = DeleguaClasse;

},{"./chamavel":60,"./objeto-delegua-classe":68}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaFuncao = void 0;
const chamavel_1 = require("./chamavel");
const espaco_variaveis_1 = require("../espaco-variaveis");
const quebras_1 = require("../quebras");
class DeleguaFuncao extends chamavel_1.Chamavel {
    constructor(nome, declaracao, instancia = undefined, eInicializador = false) {
        super();
        this.nome = nome;
        this.declaracao = declaracao;
        this.instancia = instancia;
        this.eInicializador = eInicializador;
    }
    aridade() {
        var _a, _b;
        return ((_b = (_a = this.declaracao) === null || _a === void 0 ? void 0 : _a.parametros) === null || _b === void 0 ? void 0 : _b.length) || 0;
    }
    paraTexto() {
        if (this.nome === null)
            return '<função>';
        return `<função ${this.nome}>`;
    }
    async chamar(interpretador, argumentos) {
        const ambiente = new espaco_variaveis_1.EspacoVariaveis();
        const parametros = this.declaracao.parametros;
        if (parametros && parametros.length) {
            for (let i = 0; i < parametros.length; i++) {
                const parametro = parametros[i];
                const nome = parametro['nome'].lexema;
                let valor = argumentos[i];
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
        const retornoBloco = await interpretador.executarBloco(this.declaracao.corpo, ambiente);
        if (retornoBloco instanceof quebras_1.RetornoQuebra) {
            return retornoBloco.valor;
        }
        if (this.eInicializador) {
            return this.instancia;
        }
        return retornoBloco;
    }
    definirInstancia(instancia) {
        return new DeleguaFuncao(this.nome, this.declaracao, instancia, this.eInicializador);
    }
}
exports.DeleguaFuncao = DeleguaFuncao;

},{"../espaco-variaveis":59,"../quebras":82,"./chamavel":60}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoPadrao = void 0;
const chamavel_1 = require("./chamavel");
/**
 * Uma `FuncaoPadrao` normalmente é uma função em JavaScript.
 */
class FuncaoPadrao extends chamavel_1.Chamavel {
    constructor(valorAridade, funcao) {
        super();
        this.valorAridade = valorAridade;
        this.funcao = funcao;
    }
    async chamar(argumentos, simbolo) {
        this.simbolo = simbolo;
        return await this.funcao.apply(this, argumentos);
    }
    paraTexto() {
        return '<função>';
    }
}
exports.FuncaoPadrao = FuncaoPadrao;

},{"./chamavel":60}],65:[function(require,module,exports){
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
__exportStar(require("./delegua-funcao"), exports);
__exportStar(require("./metodo-primitiva"), exports);
__exportStar(require("./modulo"), exports);
__exportStar(require("./objeto-delegua-classe"), exports);
__exportStar(require("./objeto-padrao"), exports);

},{"./chamavel":60,"./classe-padrao":61,"./delegua-classe":62,"./delegua-funcao":63,"./funcao-padrao":64,"./metodo-primitiva":66,"./modulo":67,"./objeto-delegua-classe":68,"./objeto-padrao":69}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPrimitiva = void 0;
const chamavel_1 = require("./chamavel");
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
class MetodoPrimitiva extends chamavel_1.Chamavel {
    constructor(primitiva, metodo) {
        super();
        this.primitiva = primitiva;
        this.metodo = metodo;
        this.valorAridade = metodo.length - 1;
    }
    chamar(argumentos = []) {
        return this.metodo(this.primitiva, ...argumentos);
    }
}
exports.MetodoPrimitiva = MetodoPrimitiva;

},{"./chamavel":60}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaModulo = void 0;
class DeleguaModulo {
    constructor(nome) {
        this.nome = nome || '';
        this.componentes = {};
    }
    toString() {
        return this.nome ? `<modulo ${this.nome}>` : '<modulo>';
    }
}
exports.DeleguaModulo = DeleguaModulo;

},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoDeleguaClasse = void 0;
const excecoes_1 = require("../excecoes");
class ObjetoDeleguaClasse {
    constructor(classe) {
        this.classe = classe;
        this.campos = {};
    }
    obter(simbolo) {
        if (this.campos.hasOwnProperty(simbolo.lexema)) {
            return this.campos[simbolo.lexema];
        }
        const metodo = this.classe.encontrarMetodo(simbolo.lexema);
        if (metodo)
            return metodo.definirInstancia(this);
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, 'Método indefinido não recuperado.');
    }
    definir(simbolo, valor) {
        this.campos[simbolo.lexema] = valor;
    }
    toString() {
        return '<Objeto ' + this.classe.nome + '>';
    }
}
exports.ObjetoDeleguaClasse = ObjetoDeleguaClasse;

},{"../excecoes":71}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoPadrao = void 0;
/**
 * Um objeto padrão é uma instância de uma Classe Padrão (JavaScript).
 * TODO: Marcado para depreciação na próxima versão.
 */
class ObjetoPadrao {
    constructor(classePadrao) {
        this.classePadrao = classePadrao;
    }
    paraTexto() {
        let retornoTexto = `<objeto-padrão da classe ${this.classePadrao}>\n`;
        for (const [nome, valor] of Object.entries(this)) {
            retornoTexto += `    - ${nome}: ${valor}\n`;
        }
        retornoTexto += `</objeto-padrão>`;
        return retornoTexto;
    }
}
exports.ObjetoPadrao = ObjetoPadrao;

},{}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroEmTempoDeExecucao = void 0;
class ErroEmTempoDeExecucao extends Error {
    constructor(simbolo, mensagem, linha) {
        super(mensagem);
        this.simbolo = simbolo;
        this.mensagem = mensagem;
        this.linha = linha;
        Object.setPrototypeOf(this, ErroEmTempoDeExecucao.prototype);
    }
}
exports.ErroEmTempoDeExecucao = ErroEmTempoDeExecucao;

},{}],71:[function(require,module,exports){
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

},{"./erro-em-tempo-de-execucao":70}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],74:[function(require,module,exports){
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

},{"../interfaces/retornos/retorno-interpretador":72,"./erro-interpretador":73,"./interpretador":76}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferirTipoVariavel = void 0;
function inferirTipoVariavel(variavel) {
    const tipo = typeof variavel;
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
            if (variavel.constructor.name === 'DeleguaModulo')
                return 'módulo';
            return 'dicionário';
        case 'function':
            return 'função';
        case 'symbol':
            return 'símbolo';
    }
}
exports.inferirTipoVariavel = inferirTipoVariavel;

},{}],76:[function(require,module,exports){
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
exports.Interpretador = void 0;
const caminho = __importStar(require("path"));
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const espaco_variaveis_1 = require("../espaco-variaveis");
const biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
const importar_biblioteca_1 = __importDefault(require("../bibliotecas/importar-biblioteca"));
const excecoes_1 = require("../excecoes");
const estruturas_1 = require("../estruturas");
const construtos_1 = require("../construtos");
const pilha_escopos_execucao_1 = require("./pilha-escopos-execucao");
const quebras_1 = require("../quebras");
const inferenciador_1 = require("./inferenciador");
const metodo_primitiva_1 = require("../estruturas/metodo-primitiva");
const primitivas_texto_1 = __importDefault(require("../bibliotecas/primitivas-texto"));
const primitivas_vetor_1 = __importDefault(require("../bibliotecas/primitivas-vetor"));
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * O Interpretador visita todos os elementos complexos gerados pelo avaliador sintático (_parser_),
 * e de fato executa a lógica de programação descrita no código.
 */
class Interpretador {
    constructor(importador, diretorioBase, performance = false, funcaoDeRetorno = null) {
        this.funcaoDeRetorno = null;
        this.interfaceDeEntrada = null;
        this.resultadoInterpretador = [];
        this.interfaceEntradaSaida = null;
        this.regexInterpolacao = /\$\{([a-z_][\w]*)\}/gi;
        this.importador = importador;
        this.diretorioBase = diretorioBase;
        this.performance = performance;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.erros = [];
        this.declaracoes = [];
        this.pilhaEscoposExecucao = new pilha_escopos_execucao_1.PilhaEscoposExecucao();
        const escopoExecucao = {
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
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        const mensagem = expressao.argumentos && expressao.argumentos[0] ? expressao.argumentos[0].valor : '> ';
        return new Promise(resolucao => this.interfaceEntradaSaida.question(mensagem, (resposta) => {
            resolucao(resposta);
        }));
    }
    /**
     * Retira a interpolação de um texto.
     * @param {texto} texto O texto
     * @param {any[]} variaveis A lista de variaveis interpoladas
     * @returns O texto com o valor das variaveis.
     */
    retirarInterpolacao(texto, variaveis) {
        const valoresVariaveis = variaveis.map((v) => ({
            valorResolvido: this.pilhaEscoposExecucao.obterVariavelPorNome(v.variavel),
            variavel: v.variavel,
        }));
        let textoFinal = texto;
        valoresVariaveis.forEach((elemento) => {
            const valorFinal = elemento.valorResolvido.hasOwnProperty('valor')
                ? elemento.valorResolvido.valor
                : elemento.valorResolvido;
            textoFinal = textoFinal.replace('${' + elemento.variavel + '}', valorFinal);
        });
        return textoFinal;
    }
    /**
     * Busca variáveis interpoladas.
     * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
     * @returns Uma lista de variáveis interpoladas.
     */
    buscarVariaveisInterpolacao(textoOriginal) {
        const variaveis = textoOriginal.match(this.regexInterpolacao);
        return variaveis.map((s) => {
            const nomeVariavel = s.replace(/[\$\{\}]*/g, '');
            return {
                variavel: nomeVariavel,
                valor: this.pilhaEscoposExecucao.obterVariavelPorNome(nomeVariavel),
            };
        });
    }
    visitarExpressaoLiteral(expressao) {
        if (this.regexInterpolacao.test(expressao.valor)) {
            const variaveis = this.buscarVariaveisInterpolacao(expressao.valor);
            return this.retirarInterpolacao(expressao.valor, variaveis);
        }
        return expressao.valor;
    }
    async avaliar(expressao) {
        // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
        // Por algum motivo o depurador do VSCode não funciona direito aqui
        // com breakpoint condicional.
        /* if (expressao === null || expressao === undefined) {
            console.log('Aqui');
        } */
        return await expressao.aceitar(this);
    }
    async visitarExpressaoAgrupamento(expressao) {
        return await this.avaliar(expressao.expressao);
    }
    eVerdadeiro(objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === 'boolean')
            return Boolean(objeto);
        if (objeto.hasOwnProperty('valor')) {
            return Boolean(objeto.valor);
        }
        return true;
    }
    verificarOperandoNumero(operador, operando) {
        if (typeof operando === 'number' || operando.tipo === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operando precisa ser um número.', Number(operador.linha));
    }
    async visitarExpressaoUnaria(expressao) {
        const direita = await this.avaliar(expressao.direita);
        const valor = direita.hasOwnProperty('valor') ?
            direita.valor :
            direita;
        switch (expressao.operador.tipo) {
            case delegua_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expressao.operador, valor);
                return -valor;
            case delegua_1.default.NEGACAO:
                return !this.eVerdadeiro(valor);
            case delegua_1.default.BIT_NOT:
                return ~valor;
        }
        return null;
    }
    async visitarExpressaoFormatacaoEscrita(declaracao) {
        let resultado = "";
        const conteudo = await this.avaliar(declaracao.expressao);
        const valorConteudo = (conteudo === null || conteudo === void 0 ? void 0 : conteudo.hasOwnProperty('valor'))
            ? conteudo.valor
            : conteudo;
        const tipoConteudo = conteudo.hasOwnProperty('tipo')
            ? conteudo.tipo
            : typeof conteudo;
        resultado = valorConteudo;
        if (['número', 'number'].includes(tipoConteudo) && declaracao.casasDecimais > 0) {
            resultado = valorConteudo.toLocaleString('pt', { maximumFractionDigits: declaracao.casasDecimais });
        }
        if (declaracao.espacos > 0) {
            resultado += ' '.repeat(declaracao.espacos);
        }
        return resultado;
    }
    eIgual(esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
    }
    /**
     * Verifica se operandos são números, que podem ser tanto variáveis puras do JavaScript
     * (neste caso, `number`), ou podem ser variáveis de Delégua com inferência (`VariavelInterface`).
     * @param operador O símbolo do operador.
     * @param direita O operando direito.
     * @param esquerda O operando esquerdo.
     * @returns Se ambos os operandos são números ou não.
     */
    verificarOperandosNumeros(operador, direita, esquerda) {
        const tipoDireita = direita.tipo
            ? direita.tipo
            : typeof direita === 'number'
                ? 'número'
                : String(NaN);
        const tipoEsquerda = esquerda.tipo
            ? esquerda.tipo
            : typeof esquerda === 'number'
                ? 'número'
                : String(NaN);
        if (tipoDireita === 'número' && tipoEsquerda === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operadores precisam ser números.', operador.linha);
    }
    async visitarExpressaoBinaria(expressao) {
        try {
            const esquerda = await this.avaliar(expressao.esquerda);
            const direita = await this.avaliar(expressao.direita);
            const valorEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('valor'))
                ? esquerda.valor
                : esquerda;
            const valorDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('valor'))
                ? direita.valor
                : direita;
            const tipoEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('tipo'))
                ? esquerda.tipo
                : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
            const tipoDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('tipo'))
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
                case delegua_1.default.DIVISAO_INTEIRA:
                case delegua_1.default.DIVISAO_INTEIRA_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
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
        }
        catch (erro) {
            return Promise.reject(erro);
        }
    }
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    async visitarExpressaoDeChamada(expressao) {
        try {
            const variavelEntidadeChamada = await this.avaliar(expressao.entidadeChamada);
            if (variavelEntidadeChamada === null) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Chamada de função ou método inexistente: ' + String(expressao.entidadeChamada), expressao.linha));
            }
            const entidadeChamada = variavelEntidadeChamada.hasOwnProperty('valor')
                ? variavelEntidadeChamada.valor
                : variavelEntidadeChamada;
            let argumentos = [];
            for (let i = 0; i < expressao.argumentos.length; i++) {
                argumentos.push(await this.avaliar(expressao.argumentos[i]));
            }
            if (entidadeChamada instanceof estruturas_1.DeleguaModulo) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Entidade chamada é um módulo de Delégua. Provavelmente você quer chamar um de seus componentes?', expressao.linha));
            }
            if (entidadeChamada instanceof metodo_primitiva_1.MetodoPrimitiva) {
                const argumentosResolvidos = [];
                for (const argumento of expressao.argumentos) {
                    const valorResolvido = await this.avaliar(argumento);
                    argumentosResolvidos.push(valorResolvido.hasOwnProperty('valor')
                        ? valorResolvido.valor
                        : valorResolvido);
                }
                return entidadeChamada.chamar(argumentosResolvidos);
            }
            let parametros;
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
            const aridade = entidadeChamada.aridade ?
                entidadeChamada.aridade() : entidadeChamada.length;
            // Completar os parâmetros não preenchidos com nulos.
            if (argumentos.length < aridade) {
                const diferenca = aridade - argumentos.length;
                for (let i = 0; i < diferenca; i++) {
                    argumentos.push(null);
                }
            }
            else {
                if (parametros &&
                    parametros.length > 0 &&
                    parametros[parametros.length - 1].tipo === 'estrela') {
                    const novosArgumentos = argumentos.slice(0, parametros.length - 1);
                    novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                    argumentos = novosArgumentos;
                }
            }
            if (entidadeChamada instanceof estruturas_1.FuncaoPadrao) {
                try {
                    return entidadeChamada.chamar(argumentos.map(a => a !== null && a.hasOwnProperty('valor') ? a.valor : a), expressao.entidadeChamada.nome);
                }
                catch (erro) {
                    this.erros.push(erro);
                }
            }
            if ((entidadeChamada instanceof estruturas_1.Chamavel)) {
                return entidadeChamada.chamar(this, argumentos);
            }
            // A função chamada pode ser de uma biblioteca JavaScript.
            // Neste caso apenas testamos se o tipo é uma função.
            if (typeof entidadeChamada === 'function') {
                let objeto = null;
                if (expressao.entidadeChamada.objeto) {
                    objeto = await this.avaliar(expressao.entidadeChamada.objeto);
                }
                return entidadeChamada.apply(objeto.hasOwnProperty('valor') ? objeto.valor : objeto, argumentos);
            }
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha));
        }
        catch (erro) {
            console.log(erro);
        }
    }
    /**
     * Execução de uma expressão de atribuição.
     * @param expressao A expressão.
     * @returns O valor atribuído.
     */
    async visitarExpressaoDeAtribuicao(expressao) {
        const valor = await this.avaliar(expressao.valor);
        this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
        return valor;
    }
    procurarVariavel(simbolo) {
        return this.pilhaEscoposExecucao.obterVariavel(simbolo);
    }
    visitarExpressaoDeVariavel(expressao) {
        return this.procurarVariavel(expressao.simbolo);
    }
    async visitarDeclaracaoDeExpressao(declaracao) {
        return await this.avaliar(declaracao.expressao);
    }
    async visitarExpressaoLogica(expressao) {
        const esquerda = await this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === delegua_1.default.EM) {
            const direita = await this.avaliar(expressao.direita);
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
        return await this.avaliar(expressao.direita);
    }
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    async visitarExpressaoSe(declaracao) {
        if (this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
            return await this.executar(declaracao.caminhoEntao);
        }
        for (let i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            const atual = declaracao.caminhosSeSenao[i];
            if (this.eVerdadeiro(await this.avaliar(atual.condicao))) {
                return await this.executar(atual.caminho);
            }
        }
        if (declaracao.caminhoSenao !== null) {
            return await this.executar(declaracao.caminhoSenao);
        }
        return null;
    }
    async visitarExpressaoPara(declaracao) {
        if (declaracao.inicializador !== null) {
            await this.avaliar(declaracao.inicializador);
        }
        let retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra)) {
            if (declaracao.condicao !== null &&
                !this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                break;
            }
            try {
                retornoExecucao = await this.executar(declaracao.corpo);
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
            }
            catch (erro) {
                return Promise.reject(erro);
            }
            if (declaracao.incrementar !== null) {
                await this.avaliar(declaracao.incrementar);
            }
        }
        return null;
    }
    async visitarExpressaoFazer(declaracao) {
        let retornoExecucao;
        do {
            try {
                retornoExecucao = await this.executar(declaracao.caminhoFazer);
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
            }
            catch (erro) {
                return Promise.reject(erro);
            }
        } while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            this.eVerdadeiro(await this.avaliar(declaracao.condicaoEnquanto)));
    }
    async visitarExpressaoEscolha(declaracao) {
        const condicaoEscolha = await this.avaliar(declaracao.identificadorOuLiteral);
        const caminhos = declaracao.caminhos;
        const caminhoPadrao = declaracao.caminhoPadrao;
        let encontrado = false;
        try {
            for (let i = 0; i < caminhos.length; i++) {
                const caminho = caminhos[i];
                for (let j = 0; j < caminho.condicoes.length; j++) {
                    if (await this.avaliar(caminho.condicoes[j]) === condicaoEscolha) {
                        encontrado = true;
                        try {
                            await this.executarBloco(caminho.declaracoes);
                        }
                        catch (erro) {
                            return Promise.reject(erro);
                        }
                    }
                }
            }
            if (caminhoPadrao !== null && !encontrado) {
                await this.executarBloco(caminhoPadrao.declaracoes);
            }
        }
        catch (erro) {
            throw erro;
        }
    }
    /**
     * Interpretação de uma declaração `tente`.
     * @param declaracao O objeto da declaração.
     */
    async visitarExpressaoTente(declaracao) {
        let valorRetorno;
        try {
            let sucesso = true;
            try {
                valorRetorno = await this.executarBloco(declaracao.caminhoTente);
            }
            catch (erro) {
                sucesso = false;
                if (declaracao.caminhoPegue !== null) {
                    // `caminhoPegue` aqui pode ser um construto de função (se `pegue` tem parâmetros)
                    // ou um vetor de `Declaracao` (`pegue` sem parâmetros).
                    // As execuções, portanto, são diferentes.
                    if (Array.isArray(declaracao.caminhoPegue)) {
                        valorRetorno = await this.executarBloco(declaracao.caminhoPegue);
                    }
                    else {
                        const literalErro = new construtos_1.Literal(declaracao.hashArquivo, Number(declaracao.linha), erro.mensagem);
                        const chamadaPegue = new construtos_1.Chamada(declaracao.caminhoPegue.hashArquivo, declaracao.caminhoPegue, null, [literalErro]);
                        valorRetorno = await chamadaPegue.aceitar(this);
                    }
                }
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                valorRetorno = await this.executarBloco(declaracao.caminhoFinalmente);
        }
        return valorRetorno;
    }
    async visitarExpressaoEnquanto(declaracao) {
        let retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
            try {
                retornoExecucao = await this.executar(declaracao.corpo);
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
            }
            catch (erro) {
                throw erro;
            }
        }
        return null;
    }
    async visitarExpressaoImportar(declaracao) {
        const caminhoRelativo = await this.avaliar(declaracao.caminho);
        const caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        const nomeArquivo = caminho.basename(caminhoTotal);
        if (!caminhoTotal.endsWith('.egua') &&
            !caminhoTotal.endsWith('.delegua')) {
            try {
                return await (0, importar_biblioteca_1.default)(caminhoRelativo);
            }
            catch (erro) {
                this.erros.push(erro);
                return null;
            }
        }
        const conteudoImportacao = this.importador.importar(caminhoRelativo, false, false);
        const retornoInterpretador = await this.interpretar(conteudoImportacao.retornoAvaliadorSintatico.declaracoes, true);
        const funcoesChamaveis = this.pilhaEscoposExecucao.obterTodasDeleguaFuncao();
        const eDicionario = (objeto) => objeto.constructor === Object;
        if (eDicionario(funcoesChamaveis)) {
            const novoModulo = new estruturas_1.DeleguaModulo();
            const chaves = Object.keys(funcoesChamaveis);
            for (let i = 0; i < chaves.length; i++) {
                novoModulo.componentes[chaves[i]] = funcoesChamaveis[chaves[i]];
            }
            return novoModulo;
        }
        return funcoesChamaveis;
    }
    async avaliarArgumentosEscreva(argumentos) {
        let formatoTexto = '';
        for (const argumento of argumentos) {
            const resultadoAvaliacao = await this.avaliar(argumento);
            let valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor'))
                ? resultadoAvaliacao.valor
                : resultadoAvaliacao;
            formatoTexto += `${this.paraTexto(valor)} `;
        }
        return formatoTexto;
    }
    /**
     * Execução de uma escrita na saída padrão, sem quebras de linha.
     * Implementada para alguns dialetos, como VisuAlg.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarExpressaoEscrevaMesmaLinha(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            process.stdout.write(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: declaracao.linha,
                hashArquivo: declaracao.hashArquivo
            });
        }
    }
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarExpressaoEscreva(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push(erro);
        }
    }
    /**
     * Empilha declarações na pilha de escopos de execução, cria um novo ambiente e
     * executa as declarações empilhadas.
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos tente ... pegue ... finalmente.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    async executarBloco(declaracoes, ambiente) {
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: ambiente || new espaco_variaveis_1.EspacoVariaveis(),
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        const retornoUltimoEscopo = await this.executarUltimoEscopo();
        if (retornoUltimoEscopo instanceof excecoes_1.ErroEmTempoDeExecucao) {
            return Promise.reject(retornoUltimoEscopo);
        }
        return retornoUltimoEscopo;
    }
    async visitarExpressaoBloco(declaracao) {
        return await this.executarBloco(declaracao.declaracoes);
    }
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    async visitarExpressaoVar(declaracao) {
        let valorOuOutraVariavel = null;
        if (declaracao.inicializador !== null) {
            valorOuOutraVariavel = await this.avaliar(declaracao.inicializador);
        }
        let valorFinal = null;
        if (valorOuOutraVariavel !== null && valorOuOutraVariavel !== undefined) {
            valorFinal = valorOuOutraVariavel.hasOwnProperty('valor')
                ? valorOuOutraVariavel.valor
                : valorOuOutraVariavel;
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorFinal);
        return null;
    }
    visitarExpressaoContinua(declaracao) {
        return new quebras_1.ContinuarQuebra();
    }
    visitarExpressaoSustar(declaracao) {
        return new quebras_1.SustarQuebra();
    }
    async visitarExpressaoRetornar(declaracao) {
        let valor = null;
        if (declaracao.valor != null)
            valor = await this.avaliar(declaracao.valor);
        return new quebras_1.RetornoQuebra(valor);
    }
    visitarExpressaoDeleguaFuncao(expressao) {
        return new estruturas_1.DeleguaFuncao(null, expressao);
    }
    async visitarExpressaoAtribuicaoSobrescrita(expressao) {
        const promises = await Promise.all([
            this.avaliar(expressao.objeto),
            this.avaliar(expressao.indice),
            this.avaliar(expressao.valor)
        ]);
        let objeto = promises[0];
        let indice = promises[1];
        const valor = promises[2];
        objeto = objeto.hasOwnProperty('valor') ? objeto.valor : objeto;
        indice = indice.hasOwnProperty('valor') ? indice.valor : indice;
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
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha));
        }
    }
    async visitarExpressaoAcessoIndiceVariavel(expressao) {
        const variavelObjeto = await this.avaliar(expressao.entidadeChamada);
        const objeto = variavelObjeto.hasOwnProperty('valor')
            ? variavelObjeto.valor
            : variavelObjeto;
        const indice = await this.avaliar(expressao.indice);
        let valorIndice = indice.hasOwnProperty('valor') ? indice.valor : indice;
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(valorIndice)) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha));
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha));
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
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha));
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha));
            }
            return objeto.charAt(valorIndice);
        }
        else {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha));
        }
    }
    async visitarExpressaoDefinirValor(expressao) {
        const variavelObjeto = await this.avaliar(expressao.objeto);
        const objeto = variavelObjeto.hasOwnProperty('valor')
            ? variavelObjeto.valor
            : variavelObjeto;
        if (!(objeto instanceof estruturas_1.ObjetoDeleguaClasse) &&
            objeto.constructor !== Object) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha));
        }
        const valor = await this.avaliar(expressao.valor);
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            objeto.definir(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    }
    visitarExpressaoFuncao(declaracao) {
        const funcao = new estruturas_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao);
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, funcao);
    }
    /**
     * Executa uma declaração de classe.
     * @param declaracao A declaração de classe.
     * @returns Sempre retorna nulo, por ser requerido pelo contrato de visita.
     */
    async visitarExpressaoClasse(declaracao) {
        let superClasse = null;
        if (declaracao.superClasse !== null) {
            const variavelSuperClasse = await this.avaliar(declaracao.superClasse);
            superClasse = variavelSuperClasse.valor;
            if (!(superClasse instanceof estruturas_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'Superclasse precisa ser uma classe.', declaracao.linha);
            }
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, null);
        if (declaracao.superClasse !== null) {
            this.pilhaEscoposExecucao.definirVariavel('super', superClasse);
        }
        const metodos = {};
        const definirMetodos = declaracao.metodos;
        for (let i = 0; i < declaracao.metodos.length; i++) {
            const metodoAtual = definirMetodos[i];
            const eInicializador = metodoAtual.simbolo.lexema === 'construtor';
            const funcao = new estruturas_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, undefined, eInicializador);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        const deleguaClasse = new estruturas_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
        // TODO: Recolocar isso se for necessário.
        /* if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        } */
        this.pilhaEscoposExecucao.atribuirVariavel(declaracao.simbolo, deleguaClasse);
        return null;
    }
    /**
     * Executa um acesso a método, normalmente de um objeto de classe.
     * @param expressao A expressão de acesso.
     * @returns O resultado da execução.
     */
    async visitarExpressaoAcessoMetodo(expressao) {
        const variavelObjeto = await this.avaliar(expressao.objeto);
        const objeto = variavelObjeto.hasOwnProperty('valor')
            ? variavelObjeto.valor
            : variavelObjeto;
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            return objeto.obter(expressao.simbolo) || null;
        }
        // TODO: Possivelmente depreciar esta forma. 
        // Não parece funcionar em momento algum.
        if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        // Função tradicional do JavaScript.
        // Normalmente executa quando uma biblioteca é importada.
        if (typeof objeto[expressao.simbolo.lexema] === 'function') {
            return objeto[expressao.simbolo.lexema];
        }
        // Objeto tradicional do JavaScript.
        // Normalmente executa quando uma biblioteca é importada.
        if (typeof objeto[expressao.simbolo.lexema] === 'object') {
            return objeto[expressao.simbolo.lexema];
        }
        if (objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto.componentes[expressao.simbolo.lexema] || null;
        }
        switch (variavelObjeto.tipo) {
            case 'texto':
                const metodoDePrimitivaTexto = primitivas_texto_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaTexto) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaTexto);
                }
                break;
            case 'vetor':
                const metodoDePrimitivaVetor = primitivas_vetor_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaVetor) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaVetor);
                }
                break;
        }
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha));
    }
    visitarExpressaoIsto(expressao) {
        return this.procurarVariavel(expressao.palavraChave);
    }
    async visitarExpressaoDicionario(expressao) {
        const dicionario = {};
        for (let i = 0; i < expressao.chaves.length; i++) {
            const promises = await Promise.all([
                this.avaliar(expressao.chaves[i]),
                this.avaliar(expressao.valores[i])
            ]);
            dicionario[promises[0]] = promises[1];
        }
        return dicionario;
    }
    async visitarExpressaoVetor(expressao) {
        const valores = [];
        for (let i = 0; i < expressao.valores.length; i++) {
            valores.push(await this.avaliar(expressao.valores[i]));
        }
        return valores;
    }
    // TODO: Após remoção do Resolvedor, simular casos que usem 'super' e 'isto'.
    visitarExpressaoSuper(expressao) {
        const superClasse = this.pilhaEscoposExecucao.obterVariavelPorNome('super');
        const objeto = this.pilhaEscoposExecucao.obterVariavelPorNome('isto');
        const metodo = superClasse.valor.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        return metodo.definirInstancia(objeto.valor);
    }
    paraTexto(objeto) {
        if (objeto === null || objeto === undefined)
            return 'nulo';
        if (typeof objeto === 'boolean') {
            return objeto ? 'verdadeiro' : 'falso';
        }
        if (objeto instanceof Date) {
            const formato = Intl.DateTimeFormat('pt', {
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
    }
    /**
     * Efetivamente executa uma declaração.
     * @param declaracao A declaração a ser executada.
     * @param mostrarResultado Se resultado deve ser mostrado ou não. Normalmente usado
     *                         pelo modo LAIR.
     */
    async executar(declaracao, mostrarResultado = false) {
        const resultado = await declaracao.aceitar(this);
        if (mostrarResultado) {
            this.funcaoDeRetorno(this.paraTexto(resultado));
        }
        if (resultado || typeof resultado === 'boolean') {
            this.resultadoInterpretador.push(this.paraTexto(resultado));
        }
        return resultado;
    }
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
    async executarUltimoEscopo(manterAmbiente = false) {
        const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        try {
            let retornoExecucao;
            for (; !(retornoExecucao instanceof quebras_1.Quebra) &&
                ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length; ultimoEscopo.declaracaoAtual++) {
                retornoExecucao = await this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
            }
            return retornoExecucao;
        }
        catch (erro) {
            return Promise.reject(erro);
        }
        finally {
            this.pilhaEscoposExecucao.removerUltimo();
            if (manterAmbiente) {
                const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
            }
        }
    }
    /**
     * Interpretação sem depurador, com medição de performance.
     * Método que efetivamente inicia o processo de interpretação.
     * @param declaracoes Um vetor de declarações gerado pelo Avaliador Sintático.
     * @param manterAmbiente Se ambiente de execução (variáveis, classes, etc.) deve ser mantido. Normalmente usado
     *                       pelo modo REPL (LEIA).
     * @returns Um objeto com o resultado da interpretação.
     */
    async interpretar(declaracoes, manterAmbiente = false) {
        this.erros = [];
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        const inicioInterpretacao = (0, browser_process_hrtime_1.default)();
        try {
            const retornoOuErro = await this.executarUltimoEscopo(manterAmbiente);
            if (retornoOuErro instanceof excecoes_1.ErroEmTempoDeExecucao) {
                this.erros.push(retornoOuErro);
            }
        }
        catch (erro) {
            this.erros.push(erro);
        }
        finally {
            if (this.performance) {
                const deltaInterpretacao = (0, browser_process_hrtime_1.default)(inicioInterpretacao);
                console.log(`[Interpretador] Tempo para interpretaçao: ${deltaInterpretacao[0] * 1e9 + deltaInterpretacao[1]}ns`);
            }
            const retorno = {
                erros: this.erros,
                resultado: this.resultadoInterpretador,
            };
            this.resultadoInterpretador = [];
            return retorno;
        }
    }
}
exports.Interpretador = Interpretador;

}).call(this)}).call(this,require('_process'))
},{"../bibliotecas/biblioteca-global":15,"../bibliotecas/importar-biblioteca":16,"../bibliotecas/primitivas-texto":17,"../bibliotecas/primitivas-vetor":18,"../construtos":31,"../espaco-variaveis":59,"../estruturas":65,"../estruturas/metodo-primitiva":66,"../excecoes":71,"../quebras":82,"../tipos-de-simbolos/delegua":83,"./inferenciador":75,"./pilha-escopos-execucao":77,"_process":91,"browser-process-hrtime":87,"path":90}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaEscoposExecucao = void 0;
const estruturas_1 = require("../estruturas");
const excecoes_1 = require("../excecoes");
const lexador_1 = require("../lexador");
const inferenciador_1 = require("./inferenciador");
class PilhaEscoposExecucao {
    constructor() {
        this.pilha = [];
    }
    empilhar(item) {
        this.pilha.push(item);
    }
    eVazio() {
        return this.pilha.length === 0;
    }
    elementos() {
        return this.pilha.length;
    }
    naPosicao(posicao) {
        return this.pilha[posicao];
    }
    topoDaPilha() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha[this.pilha.length - 1];
    }
    removerUltimo() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha.pop();
    }
    definirVariavel(nomeVariavel, valor) {
        this.pilha[this.pilha.length - 1].ambiente.valores[nomeVariavel] = {
            valor,
            tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
        };
    }
    atribuirVariavelEm(distancia, simbolo, valor) {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        ambienteAncestral.valores[simbolo.lexema] = {
            valor,
            tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
        };
    }
    atribuirVariavel(simbolo, valor) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                ambiente.valores[simbolo.lexema] = {
                    valor,
                    tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
                };
                return;
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    }
    obterVariavelEm(distancia, nome) {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        return ambienteAncestral.valores[nome];
    }
    obterVariavel(simbolo) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                return ambiente.valores[simbolo.lexema];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida: '" + simbolo.lexema + "'.");
    }
    obterVariavelPorNome(nome) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[nome] !== undefined) {
                return ambiente.valores[nome];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(new lexador_1.Simbolo('especial', nome, nome, -1, -1), "Variável não definida: '" + nome + "'.");
    }
    /**
     * Método usado pelo depurador para obter todas as variáveis definidas.
     */
    obterTodasVariaveis(todasVariaveis = []) {
        for (let i = 1; i <= this.pilha.length - 1; i++) {
            const valoresAmbiente = this.pilha[this.pilha.length - i].ambiente.valores;
            const vetorObjeto = Object.entries(valoresAmbiente).map((chaveEValor, indice) => ({ nome: chaveEValor[0], valor: chaveEValor[1].valor, tipo: chaveEValor[1].tipo }));
            todasVariaveis = todasVariaveis.concat(vetorObjeto);
        }
        return todasVariaveis;
    }
    /**
     * Obtém todas as funções declaradas ou por código-fonte, ou pelo desenvolvedor
     * em console.
     */
    obterTodasDeleguaFuncao() {
        const retorno = {};
        const ambiente = this.pilha[this.pilha.length - 1].ambiente;
        for (const [nome, corpo] of Object.entries(ambiente.valores)) {
            const corpoValor = corpo.hasOwnProperty('valor') ? corpo.valor : corpo;
            if (corpoValor instanceof estruturas_1.DeleguaFuncao) {
                retorno[nome] = corpoValor;
            }
        }
        return retorno;
    }
}
exports.PilhaEscoposExecucao = PilhaEscoposExecucao;

},{"../estruturas":65,"../excecoes":71,"../lexador":78,"./inferenciador":75}],78:[function(require,module,exports){
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

},{"./lexador":79,"./simbolo":81}],79:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexador = void 0;
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const simbolo_1 = require("./simbolo");
const palavras_reservadas_1 = __importDefault(require("./palavras-reservadas"));
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
class Lexador {
    constructor(performance = false) {
        this.performance = performance;
        this.simbolos = [];
        this.erros = [];
        this.hashArquivo = -1;
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
    }
    eDigito(caractere) {
        return caractere >= '0' && caractere <= '9';
    }
    eAlfabeto(caractere) {
        const acentuacoes = [
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
    }
    eAlfabetoOuDigito(caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    }
    eFinalDaLinha() {
        if (this.codigo.length === this.linha) {
            return true;
        }
        return this.atual >= this.codigo[this.linha].length;
    }
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha() {
        return this.linha >= this.codigo.length - 1;
    }
    eFinalDoCodigo() {
        return (this.eUltimaLinha() &&
            this.codigo[this.codigo.length - 1].length <= this.atual);
    }
    avancar() {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    }
    adicionarSimbolo(tipo, literal = null) {
        const texto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, literal || texto, literal, this.linha + 1, this.hashArquivo));
    }
    simboloAtual() {
        if (this.eFinalDaLinha())
            return '\0';
        return this.codigo[this.linha].charAt(this.atual);
    }
    avancarParaProximaLinha() {
        this.linha++;
        this.atual = 0;
    }
    proximoSimbolo() {
        return this.codigo[this.linha].charAt(this.atual + 1);
    }
    simboloAnterior() {
        return this.codigo[this.linha].charAt(this.atual - 1);
    }
    analisarTexto(delimitador = '"') {
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
        const valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(delegua_1.default.TEXTO, valor);
    }
    analisarNumero() {
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        const numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(delegua_1.default.NUMERO, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        const tipo = codigo in palavras_reservadas_1.default
            ? palavras_reservadas_1.default[codigo]
            : delegua_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    encontrarFimComentarioAsterisco() {
        while (!this.eFinalDoCodigo()) {
            this.avancar();
            if (this.simboloAtual() === '*' && this.proximoSimbolo() === '/') {
                this.avancar();
                this.avancar();
                break;
            }
        }
    }
    analisarToken() {
        const caractere = this.simboloAtual();
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
                else if (this.simboloAtual() === '-') {
                    this.adicionarSimbolo(delegua_1.default.DECREMENTAR);
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
                else if (this.simboloAtual() === '+') {
                    this.adicionarSimbolo(delegua_1.default.INCREMENTAR);
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
            case '\\':
                this.inicioSimbolo = this.atual;
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.adicionarSimbolo(delegua_1.default.DIVISAO_INTEIRA_IGUAL);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(delegua_1.default.DIVISAO_INTEIRA);
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
    }
    mapear(codigo, hashArquivo) {
        const inicioMapeamento = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.hashArquivo = hashArquivo;
        for (let iterador = 0; iterador < this.codigo.length; iterador++) {
            this.codigo[iterador] += '\0';
        }
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        if (this.performance) {
            const deltaMapeamento = (0, browser_process_hrtime_1.default)(inicioMapeamento);
            console.log(`[Lexador] Tempo para mapeamento: ${deltaMapeamento[0] * 1e9 + deltaMapeamento[1]}ns`);
        }
        return {
            simbolos: this.simbolos,
            erros: this.erros,
        };
    }
}
exports.Lexador = Lexador;

},{"../tipos-de-simbolos/delegua":83,"./palavras-reservadas":80,"./simbolo":81,"browser-process-hrtime":87}],80:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
exports.default = {
    e: delegua_1.default.E,
    em: delegua_1.default.EM,
    caso: delegua_1.default.CASO,
    classe: delegua_1.default.CLASSE,
    continua: delegua_1.default.CONTINUA,
    construtor: delegua_1.default.CONSTRUTOR,
    enquanto: delegua_1.default.ENQUANTO,
    escolha: delegua_1.default.ESCOLHA,
    escreva: delegua_1.default.ESCREVA,
    falso: delegua_1.default.FALSO,
    fazer: delegua_1.default.FAZER,
    finalmente: delegua_1.default.FINALMENTE,
    funcao: delegua_1.default.FUNCAO,
    função: delegua_1.default.FUNÇÃO,
    herda: delegua_1.default.HERDA,
    importar: delegua_1.default.IMPORTAR,
    isto: delegua_1.default.ISTO,
    leia: delegua_1.default.LEIA,
    nulo: delegua_1.default.NULO,
    ou: delegua_1.default.OU,
    para: delegua_1.default.PARA,
    padrao: delegua_1.default.PADRAO,
    pausa: delegua_1.default.PAUSA,
    pegue: delegua_1.default.PEGUE,
    retorna: delegua_1.default.RETORNA,
    se: delegua_1.default.SE,
    senao: delegua_1.default.SENAO,
    senão: delegua_1.default.SENÃO,
    super: delegua_1.default.SUPER,
    sustar: delegua_1.default.SUSTAR,
    tente: delegua_1.default.TENTE,
    var: delegua_1.default.VARIAVEL,
    verdadeiro: delegua_1.default.VERDADEIRO
};

},{"../tipos-de-simbolos/delegua":83}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, lexema, literal, linha, hashArquivo) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.literal = literal;
        this.linha = linha;
        this.hashArquivo = hashArquivo;
    }
    paraTexto() {
        return this.tipo + ' ' + this.lexema + ' ' + this.literal;
    }
}
exports.Simbolo = Simbolo;

},{}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinuarQuebra = exports.SustarQuebra = exports.RetornoQuebra = exports.Quebra = void 0;
class Quebra {
}
exports.Quebra = Quebra;
class RetornoQuebra extends Quebra {
    constructor(valor) {
        super();
        this.valor = valor;
    }
}
exports.RetornoQuebra = RetornoQuebra;
class SustarQuebra extends Quebra {
}
exports.SustarQuebra = SustarQuebra;
class ContinuarQuebra extends Quebra {
}
exports.ContinuarQuebra = ContinuarQuebra;

},{}],83:[function(require,module,exports){
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
    CONTINUA: 'CONTINUA',
    CONSTRUTOR: 'CONSTRUTOR',
    DECREMENTAR: 'DECREMENTAR',
    DIFERENTE: 'DIFERENTE',
    DIVISAO: 'DIVISAO',
    DIVISAO_IGUAL: 'DIVISAO_IGUAL',
    DIVISAO_INTEIRA: 'DIVISAO_INTEIRA',
    DIVISAO_INTEIRA_IGUAL: 'DIVISAO_INTEIRA_IGUAL',
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
    INCREMENTAR: 'INCREMENTAR',
    ISTO: 'ISTO',
    LEIA: 'LEIA',
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
    SUPER: 'SUPER',
    SUSTAR: 'SUSTAR',
    TENTE: 'TENTE',
    TEXTO: 'TEXTO',
    VARIAVEL: 'VARIAVEL',
    VERDADEIRO: 'VERDADEIRO',
    VIRGULA: 'VIRGULA',
};

},{}],84:[function(require,module,exports){
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
__exportStar(require("./tradutor-javascript"), exports);
__exportStar(require("./tradutor-reverso-javascript"), exports);

},{"./tradutor-javascript":85,"./tradutor-reverso-javascript":86}],85:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorJavaScript = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * Esse tradutor traduz para JavaScript sem módulos, o que significa que
 * instruções em Delégua como `leia()` e `importar()` não são suportadas.
 * O tradutor levantará erro toda vez que essas instruções são encontradas.
 */
class TradutorJavaScript {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            AcessoIndiceVariavel: this.traduzirAcessoIndiceVariavel.bind(this),
            AcessoMetodo: this.trazudirConstrutoAcessoMetodo.bind(this),
            Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            AtribuicaoSobrescrita: this.traduzirConstrutoAtribuicaoSobrescrita.bind(this),
            Atribuir: this.traduzirConstrutoAtribuir.bind(this),
            Binario: this.traduzirConstrutoBinario.bind(this),
            Chamada: this.traduzirConstrutoChamada.bind(this),
            DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
            FuncaoConstruto: this.traduzirFuncaoConstruto.bind(this),
            Isto: () => 'this',
            Literal: this.traduzirConstrutoLiteral.bind(this),
            Logico: this.traduzirConstrutoLogico.bind(this),
            Unario: this.traduzirConstrutoUnario.bind(this),
            Variavel: this.traduzirConstrutoVariavel.bind(this),
            Vetor: this.traduzirConstrutoVetor.bind(this),
        };
        this.dicionarioDeclaracoes = {
            Bloco: this.traduzirDeclaracaoBloco.bind(this),
            Classe: this.traduzirDeclaracaoClasse.bind(this),
            Continua: () => 'continue',
            Enquanto: this.traduzirDeclaracaoEnquanto.bind(this),
            Escolha: this.traduzirDeclaracaoEscolha.bind(this),
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
            Expressao: this.traduzirDeclaracaoExpressao.bind(this),
            Fazer: this.traduzirDeclaracaoFazer.bind(this),
            FuncaoDeclaracao: this.traduzirDeclaracaoFuncao.bind(this),
            Importar: this.traduzirDeclaracaoImportar.bind(this),
            Leia: this.traduzirDeclaracaoLeia.bind(this),
            Para: this.traduzirDeclaracaoPara.bind(this),
            Sustar: () => 'break',
            Retorna: this.traduzirDeclaracaoRetorna.bind(this),
            Se: this.traduzirDeclaracaoSe.bind(this),
            Tente: this.traduzirDeclaracaoTente.bind(this),
            Var: this.traduzirDeclaracaoVar.bind(this),
        };
    }
    traduzirSimboloOperador(operador) {
        switch (operador.tipo) {
            case delegua_1.default.ADICAO:
                return '+';
            case delegua_1.default.BIT_AND:
                return '&';
            case delegua_1.default.BIT_OR:
                return '|';
            case delegua_1.default.BIT_XOR:
                return '^';
            case delegua_1.default.BIT_NOT:
                return '~';
            case delegua_1.default.DIFERENTE:
                return '!==';
            case delegua_1.default.DIVISAO:
                return '/';
            case delegua_1.default.E:
                return '&&';
            case delegua_1.default.EXPONENCIACAO:
                return '**';
            case delegua_1.default.IGUAL:
                return '=';
            case delegua_1.default.IGUAL_IGUAL:
                return '===';
            case delegua_1.default.MAIOR:
                return '>';
            case delegua_1.default.MAIOR_IGUAL:
                return '>=';
            case delegua_1.default.MENOR:
                return '<';
            case delegua_1.default.MENOR_IGUAL:
                return '<=';
            case delegua_1.default.MODULO:
                return '%';
            case delegua_1.default.MULTIPLICACAO:
                return '*';
            case delegua_1.default.OU:
                return '||';
            case delegua_1.default.SUBTRACAO:
                return '-';
        }
    }
    traduzirConstrutoAgrupamento(agrupamento) {
        return this.dicionarioConstrutos[agrupamento.constructor.name](agrupamento.expressao || agrupamento);
    }
    traduzirConstrutoAtribuir(atribuir) {
        let resultado = atribuir.simbolo.lexema;
        resultado += ' = ' + this.dicionarioConstrutos[atribuir.valor.constructor.name](atribuir.valor);
        return resultado;
    }
    traduzirConstrutoBinario(binario) {
        let resultado = '';
        if (binario.esquerda.constructor.name === 'Agrupamento')
            resultado += '(' + this.dicionarioConstrutos[binario.esquerda.constructor.name](binario.esquerda) + ')';
        else
            resultado += this.dicionarioConstrutos[binario.esquerda.constructor.name](binario.esquerda);
        let operador = this.traduzirSimboloOperador(binario.operador);
        resultado += ` ${operador} `;
        if (binario.direita.constructor.name === 'Agrupamento')
            resultado += '(' + this.dicionarioConstrutos[binario.direita.constructor.name](binario.direita) + ')';
        else
            resultado += this.dicionarioConstrutos[binario.direita.constructor.name](binario.direita);
        return resultado;
    }
    traduzirConstrutoDefinirValor(definirValor) {
        let resultado = '';
        if (definirValor.objeto instanceof construtos_1.Isto) {
            resultado = 'this.' + definirValor.nome.lexema + ' = ';
        }
        resultado += definirValor.valor.simbolo.lexema;
        return resultado;
    }
    traduzirConstrutoLiteral(literal) {
        if (typeof literal.valor === 'string')
            return `'${literal.valor}'`;
        return literal.valor;
    }
    traduzirConstrutoVariavel(variavel) {
        return variavel.simbolo.lexema;
    }
    traduzirConstrutoChamada(chamada) {
        let resultado = '';
        const retorno = `${this.dicionarioConstrutos[chamada.entidadeChamada.constructor.name](chamada.entidadeChamada)}`;
        const instanciaClasse = this.declaracoesDeClasses.some(declaracao => { var _a; return ((_a = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simbolo) === null || _a === void 0 ? void 0 : _a.lexema) === retorno; });
        if (instanciaClasse) {
            const classe = this.declaracoesDeClasses.find(declaracao => { var _a; return ((_a = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simbolo) === null || _a === void 0 ? void 0 : _a.lexema) === retorno; });
            if (classe.simbolo.lexema === retorno)
                resultado += `new ${retorno}`;
        }
        else {
            resultado += retorno;
        }
        resultado += '(';
        for (let parametro of chamada.argumentos) {
            resultado += this.dicionarioConstrutos[parametro.constructor.name](parametro) + ', ';
        }
        if (chamada.argumentos.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ')';
        return resultado;
    }
    logicaComumBlocoEscopo(declaracoes) {
        let resultado = '{\n';
        this.indentacao += 4;
        if (typeof declaracoes[Symbol.iterator] === 'function') {
            for (const declaracaoOuConstruto of declaracoes) {
                resultado += ' '.repeat(this.indentacao);
                const nomeConstrutor = declaracaoOuConstruto.constructor.name;
                if (this.dicionarioConstrutos.hasOwnProperty(nomeConstrutor)) {
                    resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoOuConstruto);
                }
                else {
                    resultado += this.dicionarioDeclaracoes[nomeConstrutor](declaracaoOuConstruto);
                }
                resultado += '\n';
            }
        }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracaoBloco(declaracaoBloco) {
        return this.logicaComumBlocoEscopo(declaracaoBloco.declaracoes);
    }
    logicaTraducaoMetodoClasse(metodoClasse) {
        this.indentacao += 4;
        let resultado = ' '.repeat(this.indentacao);
        resultado += metodoClasse.simbolo.lexema === 'construtor' ? 'constructor(' : metodoClasse.simbolo.lexema + '(';
        for (let parametro of metodoClasse.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (metodoClasse.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(metodoClasse.funcao.corpo);
        resultado += ' '.repeat(this.indentacao) + '\n';
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoClasse(declaracaoClasse) {
        let resultado = 'export class ';
        if (declaracaoClasse.superClasse)
            resultado += `${declaracaoClasse.simbolo.lexema} extends ${declaracaoClasse.superClasse.simbolo.lexema} {\n`;
        else
            resultado += declaracaoClasse.simbolo.lexema + ' {\n';
        for (let metodo of declaracaoClasse.metodos) {
            resultado += this.logicaTraducaoMetodoClasse(metodo);
        }
        resultado += '}';
        return resultado;
    }
    traduzirDeclaracaoEnquanto(declaracaoEnquanto) {
        let resultado = 'while (';
        resultado +=
            this.dicionarioConstrutos[declaracaoEnquanto.condicao.constructor.name](declaracaoEnquanto.condicao) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoEnquanto.corpo.constructor.name](declaracaoEnquanto.corpo);
        return resultado;
    }
    logicaComumCaminhosEscolha(caminho) {
        var _a, _b, _c;
        let resultado = '';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        if ((_a = caminho === null || caminho === void 0 ? void 0 : caminho.condicoes) === null || _a === void 0 ? void 0 : _a.length) {
            for (let condicao of caminho.condicoes) {
                resultado += 'case ' + this.dicionarioConstrutos[condicao.constructor.name](condicao) + ':\n';
                resultado += ' '.repeat(this.indentacao);
            }
        }
        if ((_b = caminho === null || caminho === void 0 ? void 0 : caminho.declaracoes) === null || _b === void 0 ? void 0 : _b.length) {
            for (let declaracao of caminho.declaracoes) {
                resultado += ' '.repeat(this.indentacao + 4);
                if (((_c = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simboloChave) === null || _c === void 0 ? void 0 : _c.lexema) === 'retorna') {
                    resultado +=
                        'return ' + this.dicionarioConstrutos[declaracao.valor.constructor.name](declaracao.valor);
                }
                resultado += this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao) + '\n';
            }
            resultado += ' '.repeat(this.indentacao + 4);
            resultado += 'break' + '\n';
        }
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoEscolha(declaracaoEscolha) {
        let resultado = 'switch (';
        resultado +=
            this.dicionarioConstrutos[declaracaoEscolha.identificadorOuLiteral.constructor.name](declaracaoEscolha.identificadorOuLiteral) + ') {\n';
        for (let caminho of declaracaoEscolha.caminhos) {
            resultado += this.logicaComumCaminhosEscolha(caminho);
        }
        if (declaracaoEscolha.caminhoPadrao) {
            resultado += ' '.repeat(4);
            resultado += 'default:\n';
            resultado += this.logicaComumCaminhosEscolha(declaracaoEscolha.caminhoPadrao);
        }
        resultado += '}\n';
        return resultado;
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let resultado = 'console.log(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.constructor.name](argumento);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoExpressao(declaracaoExpressao) {
        return this.dicionarioConstrutos[declaracaoExpressao.expressao.constructor.name](declaracaoExpressao.expressao);
    }
    traduzirDeclaracaoFazer(declaracaoFazer) {
        let resultado = 'do ';
        resultado += this.dicionarioDeclaracoes[declaracaoFazer.caminhoFazer.constructor.name](declaracaoFazer.caminhoFazer);
        resultado +=
            'while (' +
                this.dicionarioConstrutos[declaracaoFazer.condicaoEnquanto.constructor.name](declaracaoFazer.condicaoEnquanto) +
                ') ';
        return resultado;
    }
    traduzirDeclaracaoFuncao(declaracaoFuncao) {
        let resultado = 'function ';
        resultado += declaracaoFuncao.simbolo.lexema + ' (';
        for (const parametro of declaracaoFuncao.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (declaracaoFuncao.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(declaracaoFuncao.funcao.corpo);
        return resultado;
    }
    traduzirDeclaracaoImportar(declaracaoImportar) {
        throw new Error('`importar()` não é suportado por este padrão de JavaScript.');
    }
    traduzirDeclaracaoLeia(declaracaoImportar) {
        throw new Error('`leia()` não é suportado por este padrão de JavaScript.');
    }
    traduzirDeclaracaoPara(declaracaoPara) {
        let resultado = 'for (';
        resultado +=
            this.dicionarioDeclaracoes[declaracaoPara.inicializador.constructor.name](declaracaoPara.inicializador) + ' ';
        resultado += !resultado.includes(';') ? ';' : '';
        resultado +=
            this.dicionarioConstrutos[declaracaoPara.condicao.constructor.name](declaracaoPara.condicao) + '; ';
        resultado +=
            this.dicionarioConstrutos[declaracaoPara.incrementar.constructor.name](declaracaoPara.incrementar) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoPara.corpo.constructor.name](declaracaoPara.corpo);
        return resultado;
    }
    traduzirDeclaracaoRetorna(declaracaoRetorna) {
        let resultado = 'return ';
        const nomeConstrutor = declaracaoRetorna.valor.constructor.name;
        return (resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoRetorna === null || declaracaoRetorna === void 0 ? void 0 : declaracaoRetorna.valor));
    }
    traduzirDeclaracaoSe(declaracaoSe) {
        let resultado = 'if (';
        const condicao = this.dicionarioConstrutos[declaracaoSe.condicao.constructor.name](declaracaoSe.condicao);
        resultado += condicao;
        resultado += ')';
        resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoEntao.constructor.name](declaracaoSe.caminhoEntao);
        if (declaracaoSe.caminhoSenao !== null) {
            resultado += '\nelse ';
            const se = declaracaoSe === null || declaracaoSe === void 0 ? void 0 : declaracaoSe.caminhoSenao;
            if (se === null || se === void 0 ? void 0 : se.caminhoEntao) {
                resultado += 'if (';
                resultado += this.dicionarioConstrutos[se.condicao.constructor.name](se.condicao);
                resultado += ')';
                resultado += this.dicionarioDeclaracoes[se.caminhoEntao.constructor.name](se.caminhoEntao);
                if (se === null || se === void 0 ? void 0 : se.caminhoSenao) {
                    resultado += 'else ';
                    resultado += this.dicionarioDeclaracoes[se.caminhoSenao.constructor.name](se.caminhoSenao);
                    return resultado;
                }
            }
            resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoSenao.constructor.name](declaracaoSe.caminhoSenao);
        }
        return resultado;
    }
    traduzirDeclaracaoTente(declaracaoTente) {
        let resultado = 'try {\n';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        for (let condicao of declaracaoTente.caminhoTente) {
            resultado += this.dicionarioDeclaracoes[condicao.constructor.name](condicao) + '\n';
            resultado += ' '.repeat(this.indentacao);
        }
        resultado += '}';
        if (declaracaoTente.caminhoPegue !== null) {
            resultado += '\ncatch {\n';
            resultado += ' '.repeat(this.indentacao);
            if (Array.isArray(declaracaoTente.caminhoPegue)) {
                for (let declaracao of declaracaoTente.caminhoPegue) {
                    resultado += this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao) + '\n';
                }
            }
            else {
                for (let corpo of declaracaoTente.caminhoPegue.corpo) {
                    resultado += this.dicionarioDeclaracoes[corpo.constructor.name](corpo) + '\n';
                }
            }
            resultado += ' '.repeat(this.indentacao);
            resultado += '}';
        }
        if (declaracaoTente.caminhoFinalmente !== null) {
            resultado += '\nfinally {\n';
            for (let finalmente of declaracaoTente.caminhoFinalmente) {
                resultado += this.dicionarioDeclaracoes[finalmente.constructor.name](finalmente) + '\n';
            }
            resultado += ' '.repeat(this.indentacao);
            resultado += '}';
        }
        return resultado;
    }
    traduzirDeclaracaoVar(declaracaoVar) {
        let resultado = 'let ';
        resultado += declaracaoVar.simbolo.lexema;
        if (!(declaracaoVar === null || declaracaoVar === void 0 ? void 0 : declaracaoVar.inicializador))
            resultado += ';';
        else {
            resultado += ' = ';
            resultado += this.dicionarioConstrutos[declaracaoVar.inicializador.constructor.name](declaracaoVar.inicializador);
            resultado += ";";
        }
        return resultado;
    }
    trazudirConstrutoAcessoMetodo(acessoMetodo) {
        if (acessoMetodo.objeto instanceof construtos_1.Variavel) {
            let objetoVariavel = acessoMetodo.objeto;
            return `${objetoVariavel.simbolo.lexema}.${acessoMetodo.simbolo.lexema}`;
        }
        return `this.${acessoMetodo.simbolo.lexema}`;
    }
    traduzirFuncaoConstruto(funcaoConstruto) {
        let resultado = 'function(';
        for (const parametro of funcaoConstruto.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (funcaoConstruto.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(funcaoConstruto.corpo);
        return resultado;
    }
    traduzirConstrutoLogico(logico) {
        let direita = this.dicionarioConstrutos[logico.direita.constructor.name](logico.direita);
        let operador = this.traduzirSimboloOperador(logico.operador);
        let esquerda = this.dicionarioConstrutos[logico.esquerda.constructor.name](logico.esquerda);
        return `${direita} ${operador} ${esquerda}`;
    }
    traduzirConstrutoAtribuicaoSobrescrita(atribuicaoSobrescrita) {
        var _a, _b;
        let resultado = '';
        resultado += atribuicaoSobrescrita.objeto.simbolo.lexema + '[';
        resultado += this.dicionarioConstrutos[atribuicaoSobrescrita.indice.constructor.name](atribuicaoSobrescrita.indice) + ']';
        resultado += ' = ';
        if ((_b = (_a = atribuicaoSobrescrita === null || atribuicaoSobrescrita === void 0 ? void 0 : atribuicaoSobrescrita.valor) === null || _a === void 0 ? void 0 : _a.simbolo) === null || _b === void 0 ? void 0 : _b.lexema) {
            resultado += `${atribuicaoSobrescrita.valor.simbolo.lexema}`;
        }
        else {
            resultado += this.dicionarioConstrutos[atribuicaoSobrescrita.valor.constructor.name](atribuicaoSobrescrita.valor);
        }
        return resultado;
    }
    traduzirAcessoIndiceVariavel(acessoIndiceVariavel) {
        let resultado = '';
        resultado += this.dicionarioConstrutos[acessoIndiceVariavel.entidadeChamada.constructor.name](acessoIndiceVariavel.entidadeChamada);
        resultado += `[${this.dicionarioConstrutos[acessoIndiceVariavel.indice.constructor.name](acessoIndiceVariavel.indice)}]`;
        return resultado;
    }
    traduzirConstrutoVetor(vetor) {
        if (!vetor.valores.length) {
            return '[]';
        }
        let resultado = '[';
        for (let valor of vetor.valores) {
            resultado += `${this.dicionarioConstrutos[valor.constructor.name](valor)}, `;
        }
        if (vetor.valores.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ']';
        return resultado;
    }
    traduzirConstrutoUnario(unario) {
        var _a;
        let resultado = '';
        resultado += this.traduzirSimboloOperador(unario.operador);
        resultado += (_a = unario.direita.valor) !== null && _a !== void 0 ? _a : unario.direita.simbolo.lexema;
        return resultado;
    }
    traduzir(declaracoes) {
        let resultado = '';
        this.declaracoesDeClasses = declaracoes.filter(declaracao => declaracao instanceof declaracoes_1.Classe);
        for (const declaracao of declaracoes) {
            resultado += `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        return resultado;
    }
}
exports.TradutorJavaScript = TradutorJavaScript;

},{"../construtos":31,"../declaracoes":51,"../tipos-de-simbolos/delegua":83}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorReversoJavaScript = void 0;
const esprima_1 = require("esprima");
/**
 * Esse tradutor traduz de JavaScript para Delégua.
 */
class TradutorReversoJavaScript {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            ArrowFunctionExpression: this.traduzirDeclaracaoFuncao.bind(this),
            // Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            // Atribuir: this.traduzirConstrutoAtribuir.bind(this),
            BinaryExpression: this.traduzirConstrutoBinario.bind(this),
            // Chamada: this.traduzirConstrutoChamada.bind(this),
            // DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
            // Isto: this.traduzirConstrutoIsto.bind(this),
            Literal: this.traduzirConstrutoLiteral.bind(this),
            // Variavel: this.traduzirConstrutoVariavel.bind(this),
        };
        this.dicionarioDeclaracoes = {
            ExpressionStatement: this.traduzirExpressaoDeclaracao.bind(this),
            // traduzirDeclaracaoEscreva
        };
        // Qualquer coisa pro ESLint ficar feliz.
    }
    traduzirSimboloOperador(operador) {
        switch (operador) {
            case '==':
            case '===':
                return '==';
        }
    }
    traduzirExpressaoDeclaracao(declaracao) {
        var _a, _b;
        let resultado = '';
        let informacoesExpressao = declaracao.expression.callee;
        if (informacoesExpressao.type === 'MemberExpression') {
            if (((_a = informacoesExpressao === null || informacoesExpressao === void 0 ? void 0 : informacoesExpressao.object) === null || _a === void 0 ? void 0 : _a.name) === 'console' && ((_b = informacoesExpressao === null || informacoesExpressao === void 0 ? void 0 : informacoesExpressao.property) === null || _b === void 0 ? void 0 : _b.name) === 'log') {
                for (let argumento of declaracao.expression.arguments) {
                    resultado += `escreva(${this.dicionarioConstrutos[argumento.type](argumento)})`;
                }
            }
        }
        return resultado;
    }
    traduzirDeclaracaoFuncao(funcao) {
        console.log(funcao);
        return '';
    }
    traduzirConstrutoLiteral(literal) {
        let resultado = '';
        if (typeof literal.value === 'string')
            resultado += `'${literal.value}'`;
        else
            resultado += `${literal.value}`;
        return resultado;
    }
    traduzirConstrutoBinario(binario) {
        let resultado = '';
        let direita = typeof binario.right.value === 'string' ? `'${binario.right.value}'` : binario.right.value;
        let esquerda = typeof binario.left.value === 'string' ? `'${binario.left.value}'` : binario.left.value;
        resultado += `${esquerda} ${this.traduzirSimboloOperador(binario.operator)} ${direita}`;
        return resultado;
    }
    traduzirDeclaracaoDeVariavel(declaracao) {
        let informacoesDaVariavel = declaracao.declarations[0];
        let resultado = `var ${informacoesDaVariavel.id.name} = ${this.dicionarioConstrutos[informacoesDaVariavel.init.type](informacoesDaVariavel.init)}`;
        return resultado;
    }
    logicaComumBlocoEscopo(declaracoes) {
        let resultado = '{\n';
        this.indentacao += 4;
        // if (typeof declaracoes[Symbol.iterator] === 'function') {
        for (const declaracaoOuConstruto of declaracoes.body.body) {
            resultado += ' '.repeat(this.indentacao);
            const nomeConstrutor = declaracaoOuConstruto.constructor.name;
            if (this.dicionarioConstrutos.hasOwnProperty(nomeConstrutor)) {
                resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoOuConstruto);
            }
            else {
                resultado += this.dicionarioDeclaracoes[nomeConstrutor](declaracaoOuConstruto);
            }
            resultado += '\n';
        }
        // }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracaoDeFuncao(declaracao) {
        let resultado = '';
        resultado += `funcao ${declaracao.id.name}(`;
        for (let parametro of declaracao.params) {
            resultado += parametro.name + ', ';
        }
        if (declaracao.params.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(declaracao);
        return resultado;
    }
    traduzirClasseDeclaracao(declaracao) {
        let resultado = '';
        console.log(declaracao);
        return '';
    }
    traduzirDeclaracao(declaracao) {
        switch (declaracao.type) {
            case 'ClassDeclaration':
                return this.traduzirClasseDeclaracao(declaracao);
            case 'ExpressionStatement':
                return this.traduzirExpressaoDeclaracao(declaracao);
            case 'FunctionDeclaration':
                return this.traduzirDeclaracaoDeFuncao(declaracao);
            case 'VariableDeclaration':
                return this.traduzirDeclaracaoDeVariavel(declaracao);
        }
    }
    traduzir(codigo) {
        let resultado = '';
        const declaracoes = (0, esprima_1.parseScript)(codigo);
        for (let declaracao of declaracoes.body) {
            resultado += `${this.traduzirDeclaracao(declaracao)} \n`;
        }
        console.log(resultado);
        return resultado;
    }
}
exports.TradutorReversoJavaScript = TradutorReversoJavaScript;
//cd ./fontes/tradutores
//ts-node -T tradutor-reverso-javascript.ts
// var tjs = new TradutorReversoJavaScript();
// tjs.traduzir();

},{"esprima":89}],87:[function(require,module,exports){
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
},{"_process":91}],88:[function(require,module,exports){

},{}],89:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
/* istanbul ignore next */
	else if(typeof exports === 'object')
		exports["esprima"] = factory();
	else
		root["esprima"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/* istanbul ignore if */
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	  Copyright JS Foundation and other contributors, https://js.foundation/

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var comment_handler_1 = __webpack_require__(1);
	var jsx_parser_1 = __webpack_require__(3);
	var parser_1 = __webpack_require__(8);
	var tokenizer_1 = __webpack_require__(15);
	function parse(code, options, delegate) {
	    var commentHandler = null;
	    var proxyDelegate = function (node, metadata) {
	        if (delegate) {
	            delegate(node, metadata);
	        }
	        if (commentHandler) {
	            commentHandler.visit(node, metadata);
	        }
	    };
	    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
	    var collectComment = false;
	    if (options) {
	        collectComment = (typeof options.comment === 'boolean' && options.comment);
	        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
	        if (collectComment || attachComment) {
	            commentHandler = new comment_handler_1.CommentHandler();
	            commentHandler.attach = attachComment;
	            options.comment = true;
	            parserDelegate = proxyDelegate;
	        }
	    }
	    var isModule = false;
	    if (options && typeof options.sourceType === 'string') {
	        isModule = (options.sourceType === 'module');
	    }
	    var parser;
	    if (options && typeof options.jsx === 'boolean' && options.jsx) {
	        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
	    }
	    else {
	        parser = new parser_1.Parser(code, options, parserDelegate);
	    }
	    var program = isModule ? parser.parseModule() : parser.parseScript();
	    var ast = program;
	    if (collectComment && commentHandler) {
	        ast.comments = commentHandler.comments;
	    }
	    if (parser.config.tokens) {
	        ast.tokens = parser.tokens;
	    }
	    if (parser.config.tolerant) {
	        ast.errors = parser.errorHandler.errors;
	    }
	    return ast;
	}
	exports.parse = parse;
	function parseModule(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'module';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseModule = parseModule;
	function parseScript(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'script';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseScript = parseScript;
	function tokenize(code, options, delegate) {
	    var tokenizer = new tokenizer_1.Tokenizer(code, options);
	    var tokens;
	    tokens = [];
	    try {
	        while (true) {
	            var token = tokenizer.getNextToken();
	            if (!token) {
	                break;
	            }
	            if (delegate) {
	                token = delegate(token);
	            }
	            tokens.push(token);
	        }
	    }
	    catch (e) {
	        tokenizer.errorHandler.tolerate(e);
	    }
	    if (tokenizer.errorHandler.tolerant) {
	        tokens.errors = tokenizer.errors();
	    }
	    return tokens;
	}
	exports.tokenize = tokenize;
	var syntax_1 = __webpack_require__(2);
	exports.Syntax = syntax_1.Syntax;
	// Sync with *.json manifests.
	exports.version = '4.0.1';


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	var CommentHandler = (function () {
	    function CommentHandler() {
	        this.attach = false;
	        this.comments = [];
	        this.stack = [];
	        this.leading = [];
	        this.trailing = [];
	    }
	    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
	        //  innnerComments for properties empty block
	        //  `function a() {/** comments **\/}`
	        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
	            var innerComments = [];
	            for (var i = this.leading.length - 1; i >= 0; --i) {
	                var entry = this.leading[i];
	                if (metadata.end.offset >= entry.start) {
	                    innerComments.unshift(entry.comment);
	                    this.leading.splice(i, 1);
	                    this.trailing.splice(i, 1);
	                }
	            }
	            if (innerComments.length) {
	                node.innerComments = innerComments;
	            }
	        }
	    };
	    CommentHandler.prototype.findTrailingComments = function (metadata) {
	        var trailingComments = [];
	        if (this.trailing.length > 0) {
	            for (var i = this.trailing.length - 1; i >= 0; --i) {
	                var entry_1 = this.trailing[i];
	                if (entry_1.start >= metadata.end.offset) {
	                    trailingComments.unshift(entry_1.comment);
	                }
	            }
	            this.trailing.length = 0;
	            return trailingComments;
	        }
	        var entry = this.stack[this.stack.length - 1];
	        if (entry && entry.node.trailingComments) {
	            var firstComment = entry.node.trailingComments[0];
	            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
	                trailingComments = entry.node.trailingComments;
	                delete entry.node.trailingComments;
	            }
	        }
	        return trailingComments;
	    };
	    CommentHandler.prototype.findLeadingComments = function (metadata) {
	        var leadingComments = [];
	        var target;
	        while (this.stack.length > 0) {
	            var entry = this.stack[this.stack.length - 1];
	            if (entry && entry.start >= metadata.start.offset) {
	                target = entry.node;
	                this.stack.pop();
	            }
	            else {
	                break;
	            }
	        }
	        if (target) {
	            var count = target.leadingComments ? target.leadingComments.length : 0;
	            for (var i = count - 1; i >= 0; --i) {
	                var comment = target.leadingComments[i];
	                if (comment.range[1] <= metadata.start.offset) {
	                    leadingComments.unshift(comment);
	                    target.leadingComments.splice(i, 1);
	                }
	            }
	            if (target.leadingComments && target.leadingComments.length === 0) {
	                delete target.leadingComments;
	            }
	            return leadingComments;
	        }
	        for (var i = this.leading.length - 1; i >= 0; --i) {
	            var entry = this.leading[i];
	            if (entry.start <= metadata.start.offset) {
	                leadingComments.unshift(entry.comment);
	                this.leading.splice(i, 1);
	            }
	        }
	        return leadingComments;
	    };
	    CommentHandler.prototype.visitNode = function (node, metadata) {
	        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
	            return;
	        }
	        this.insertInnerComments(node, metadata);
	        var trailingComments = this.findTrailingComments(metadata);
	        var leadingComments = this.findLeadingComments(metadata);
	        if (leadingComments.length > 0) {
	            node.leadingComments = leadingComments;
	        }
	        if (trailingComments.length > 0) {
	            node.trailingComments = trailingComments;
	        }
	        this.stack.push({
	            node: node,
	            start: metadata.start.offset
	        });
	    };
	    CommentHandler.prototype.visitComment = function (node, metadata) {
	        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
	        var comment = {
	            type: type,
	            value: node.value
	        };
	        if (node.range) {
	            comment.range = node.range;
	        }
	        if (node.loc) {
	            comment.loc = node.loc;
	        }
	        this.comments.push(comment);
	        if (this.attach) {
	            var entry = {
	                comment: {
	                    type: type,
	                    value: node.value,
	                    range: [metadata.start.offset, metadata.end.offset]
	                },
	                start: metadata.start.offset
	            };
	            if (node.loc) {
	                entry.comment.loc = node.loc;
	            }
	            node.type = type;
	            this.leading.push(entry);
	            this.trailing.push(entry);
	        }
	    };
	    CommentHandler.prototype.visit = function (node, metadata) {
	        if (node.type === 'LineComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (node.type === 'BlockComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (this.attach) {
	            this.visitNode(node, metadata);
	        }
	    };
	    return CommentHandler;
	}());
	exports.CommentHandler = CommentHandler;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Syntax = {
	    AssignmentExpression: 'AssignmentExpression',
	    AssignmentPattern: 'AssignmentPattern',
	    ArrayExpression: 'ArrayExpression',
	    ArrayPattern: 'ArrayPattern',
	    ArrowFunctionExpression: 'ArrowFunctionExpression',
	    AwaitExpression: 'AwaitExpression',
	    BlockStatement: 'BlockStatement',
	    BinaryExpression: 'BinaryExpression',
	    BreakStatement: 'BreakStatement',
	    CallExpression: 'CallExpression',
	    CatchClause: 'CatchClause',
	    ClassBody: 'ClassBody',
	    ClassDeclaration: 'ClassDeclaration',
	    ClassExpression: 'ClassExpression',
	    ConditionalExpression: 'ConditionalExpression',
	    ContinueStatement: 'ContinueStatement',
	    DoWhileStatement: 'DoWhileStatement',
	    DebuggerStatement: 'DebuggerStatement',
	    EmptyStatement: 'EmptyStatement',
	    ExportAllDeclaration: 'ExportAllDeclaration',
	    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	    ExportNamedDeclaration: 'ExportNamedDeclaration',
	    ExportSpecifier: 'ExportSpecifier',
	    ExpressionStatement: 'ExpressionStatement',
	    ForStatement: 'ForStatement',
	    ForOfStatement: 'ForOfStatement',
	    ForInStatement: 'ForInStatement',
	    FunctionDeclaration: 'FunctionDeclaration',
	    FunctionExpression: 'FunctionExpression',
	    Identifier: 'Identifier',
	    IfStatement: 'IfStatement',
	    ImportDeclaration: 'ImportDeclaration',
	    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	    ImportSpecifier: 'ImportSpecifier',
	    Literal: 'Literal',
	    LabeledStatement: 'LabeledStatement',
	    LogicalExpression: 'LogicalExpression',
	    MemberExpression: 'MemberExpression',
	    MetaProperty: 'MetaProperty',
	    MethodDefinition: 'MethodDefinition',
	    NewExpression: 'NewExpression',
	    ObjectExpression: 'ObjectExpression',
	    ObjectPattern: 'ObjectPattern',
	    Program: 'Program',
	    Property: 'Property',
	    RestElement: 'RestElement',
	    ReturnStatement: 'ReturnStatement',
	    SequenceExpression: 'SequenceExpression',
	    SpreadElement: 'SpreadElement',
	    Super: 'Super',
	    SwitchCase: 'SwitchCase',
	    SwitchStatement: 'SwitchStatement',
	    TaggedTemplateExpression: 'TaggedTemplateExpression',
	    TemplateElement: 'TemplateElement',
	    TemplateLiteral: 'TemplateLiteral',
	    ThisExpression: 'ThisExpression',
	    ThrowStatement: 'ThrowStatement',
	    TryStatement: 'TryStatement',
	    UnaryExpression: 'UnaryExpression',
	    UpdateExpression: 'UpdateExpression',
	    VariableDeclaration: 'VariableDeclaration',
	    VariableDeclarator: 'VariableDeclarator',
	    WhileStatement: 'WhileStatement',
	    WithStatement: 'WithStatement',
	    YieldExpression: 'YieldExpression'
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
/* istanbul ignore next */
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var character_1 = __webpack_require__(4);
	var JSXNode = __webpack_require__(5);
	var jsx_syntax_1 = __webpack_require__(6);
	var Node = __webpack_require__(7);
	var parser_1 = __webpack_require__(8);
	var token_1 = __webpack_require__(13);
	var xhtml_entities_1 = __webpack_require__(14);
	token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
	token_1.TokenName[101 /* Text */] = 'JSXText';
	// Fully qualified element name, e.g. <svg:path> returns "svg:path"
	function getQualifiedElementName(elementName) {
	    var qualifiedName;
	    switch (elementName.type) {
	        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
	            var id = elementName;
	            qualifiedName = id.name;
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
	            var ns = elementName;
	            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
	                getQualifiedElementName(ns.name);
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
	            var expr = elementName;
	            qualifiedName = getQualifiedElementName(expr.object) + '.' +
	                getQualifiedElementName(expr.property);
	            break;
	        /* istanbul ignore next */
	        default:
	            break;
	    }
	    return qualifiedName;
	}
	var JSXParser = (function (_super) {
	    __extends(JSXParser, _super);
	    function JSXParser(code, options, delegate) {
	        return _super.call(this, code, options, delegate) || this;
	    }
	    JSXParser.prototype.parsePrimaryExpression = function () {
	        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
	    };
	    JSXParser.prototype.startJSX = function () {
	        // Unwind the scanner before the lookahead token.
	        this.scanner.index = this.startMarker.index;
	        this.scanner.lineNumber = this.startMarker.line;
	        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
	    };
	    JSXParser.prototype.finishJSX = function () {
	        // Prime the next lookahead.
	        this.nextToken();
	    };
	    JSXParser.prototype.reenterJSX = function () {
	        this.startJSX();
	        this.expectJSX('}');
	        // Pop the closing '}' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	    };
	    JSXParser.prototype.createJSXNode = function () {
	        this.collectComments();
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.createJSXChildNode = function () {
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.scanXHTMLEntity = function (quote) {
	        var result = '&';
	        var valid = true;
	        var terminated = false;
	        var numeric = false;
	        var hex = false;
	        while (!this.scanner.eof() && valid && !terminated) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === quote) {
	                break;
	            }
	            terminated = (ch === ';');
	            result += ch;
	            ++this.scanner.index;
	            if (!terminated) {
	                switch (result.length) {
	                    case 2:
	                        // e.g. '&#123;'
	                        numeric = (ch === '#');
	                        break;
	                    case 3:
	                        if (numeric) {
	                            // e.g. '&#x41;'
	                            hex = (ch === 'x');
	                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
	                            numeric = numeric && !hex;
	                        }
	                        break;
	                    default:
	                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
	                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
	                        break;
	                }
	            }
	        }
	        if (valid && terminated && result.length > 2) {
	            // e.g. '&#x41;' becomes just '#x41'
	            var str = result.substr(1, result.length - 2);
	            if (numeric && str.length > 1) {
	                result = String.fromCharCode(parseInt(str.substr(1), 10));
	            }
	            else if (hex && str.length > 2) {
	                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
	            }
	            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
	                result = xhtml_entities_1.XHTMLEntities[str];
	            }
	        }
	        return result;
	    };
	    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
	    JSXParser.prototype.lexJSX = function () {
	        var cp = this.scanner.source.charCodeAt(this.scanner.index);
	        // < > / : = { }
	        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
	            var value = this.scanner.source[this.scanner.index++];
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index - 1,
	                end: this.scanner.index
	            };
	        }
	        // " '
	        if (cp === 34 || cp === 39) {
	            var start = this.scanner.index;
	            var quote = this.scanner.source[this.scanner.index++];
	            var str = '';
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source[this.scanner.index++];
	                if (ch === quote) {
	                    break;
	                }
	                else if (ch === '&') {
	                    str += this.scanXHTMLEntity(quote);
	                }
	                else {
	                    str += ch;
	                }
	            }
	            return {
	                type: 8 /* StringLiteral */,
	                value: str,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // ... or .
	        if (cp === 46) {
	            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
	            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
	            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
	            var start = this.scanner.index;
	            this.scanner.index += value.length;
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // `
	        if (cp === 96) {
	            // Only placeholder, since it will be rescanned as a real assignment expression.
	            return {
	                type: 10 /* Template */,
	                value: '',
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index,
	                end: this.scanner.index
	            };
	        }
	        // Identifer can not contain backslash (char code 92).
	        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
	            var start = this.scanner.index;
	            ++this.scanner.index;
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source.charCodeAt(this.scanner.index);
	                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
	                    ++this.scanner.index;
	                }
	                else if (ch === 45) {
	                    // Hyphen (char code 45) can be part of an identifier.
	                    ++this.scanner.index;
	                }
	                else {
	                    break;
	                }
	            }
	            var id = this.scanner.source.slice(start, this.scanner.index);
	            return {
	                type: 100 /* Identifier */,
	                value: id,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        return this.scanner.lex();
	    };
	    JSXParser.prototype.nextJSXToken = function () {
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = this.lexJSX();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        if (this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.nextJSXText = function () {
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var start = this.scanner.index;
	        var text = '';
	        while (!this.scanner.eof()) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === '{' || ch === '<') {
	                break;
	            }
	            ++this.scanner.index;
	            text += ch;
	            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.scanner.lineNumber;
	                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
	                    ++this.scanner.index;
	                }
	                this.scanner.lineStart = this.scanner.index;
	            }
	        }
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = {
	            type: 101 /* Text */,
	            value: text,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart,
	            start: start,
	            end: this.scanner.index
	        };
	        if ((text.length > 0) && this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.peekJSXToken = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.lexJSX();
	        this.scanner.restoreState(state);
	        return next;
	    };
	    // Expect the next JSX token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    JSXParser.prototype.expectJSX = function (value) {
	        var token = this.nextJSXToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next JSX token matches the specified punctuator.
	    JSXParser.prototype.matchJSX = function (value) {
	        var next = this.peekJSXToken();
	        return next.type === 7 /* Punctuator */ && next.value === value;
	    };
	    JSXParser.prototype.parseJSXIdentifier = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 100 /* Identifier */) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
	    };
	    JSXParser.prototype.parseJSXElementName = function () {
	        var node = this.createJSXNode();
	        var elementName = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = elementName;
	            this.expectJSX(':');
	            var name_1 = this.parseJSXIdentifier();
	            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
	        }
	        else if (this.matchJSX('.')) {
	            while (this.matchJSX('.')) {
	                var object = elementName;
	                this.expectJSX('.');
	                var property = this.parseJSXIdentifier();
	                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
	            }
	        }
	        return elementName;
	    };
	    JSXParser.prototype.parseJSXAttributeName = function () {
	        var node = this.createJSXNode();
	        var attributeName;
	        var identifier = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = identifier;
	            this.expectJSX(':');
	            var name_2 = this.parseJSXIdentifier();
	            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
	        }
	        else {
	            attributeName = identifier;
	        }
	        return attributeName;
	    };
	    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 8 /* StringLiteral */) {
	            this.throwUnexpectedToken(token);
	        }
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    JSXParser.prototype.parseJSXExpressionAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.finishJSX();
	        if (this.match('}')) {
	            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
	        }
	        var expression = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXAttributeValue = function () {
	        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
	            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
	    };
	    JSXParser.prototype.parseJSXNameValueAttribute = function () {
	        var node = this.createJSXNode();
	        var name = this.parseJSXAttributeName();
	        var value = null;
	        if (this.matchJSX('=')) {
	            this.expectJSX('=');
	            value = this.parseJSXAttributeValue();
	        }
	        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
	    };
	    JSXParser.prototype.parseJSXSpreadAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.expectJSX('...');
	        this.finishJSX();
	        var argument = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
	    };
	    JSXParser.prototype.parseJSXAttributes = function () {
	        var attributes = [];
	        while (!this.matchJSX('/') && !this.matchJSX('>')) {
	            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
	                this.parseJSXNameValueAttribute();
	            attributes.push(attribute);
	        }
	        return attributes;
	    };
	    JSXParser.prototype.parseJSXOpeningElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXBoundaryElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        if (this.matchJSX('/')) {
	            this.expectJSX('/');
	            var name_3 = this.parseJSXElementName();
	            this.expectJSX('>');
	            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
	        }
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXEmptyExpression = function () {
	        var node = this.createJSXChildNode();
	        this.collectComments();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        return this.finalize(node, new JSXNode.JSXEmptyExpression());
	    };
	    JSXParser.prototype.parseJSXExpressionContainer = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        var expression;
	        if (this.matchJSX('}')) {
	            expression = this.parseJSXEmptyExpression();
	            this.expectJSX('}');
	        }
	        else {
	            this.finishJSX();
	            expression = this.parseAssignmentExpression();
	            this.reenterJSX();
	        }
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXChildren = function () {
	        var children = [];
	        while (!this.scanner.eof()) {
	            var node = this.createJSXChildNode();
	            var token = this.nextJSXText();
	            if (token.start < token.end) {
	                var raw = this.getTokenRaw(token);
	                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
	                children.push(child);
	            }
	            if (this.scanner.source[this.scanner.index] === '{') {
	                var container = this.parseJSXExpressionContainer();
	                children.push(container);
	            }
	            else {
	                break;
	            }
	        }
	        return children;
	    };
	    JSXParser.prototype.parseComplexJSXElement = function (el) {
	        var stack = [];
	        while (!this.scanner.eof()) {
	            el.children = el.children.concat(this.parseJSXChildren());
	            var node = this.createJSXChildNode();
	            var element = this.parseJSXBoundaryElement();
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
	                var opening = element;
	                if (opening.selfClosing) {
	                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
	                    el.children.push(child);
	                }
	                else {
	                    stack.push(el);
	                    el = { node: node, opening: opening, closing: null, children: [] };
	                }
	            }
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
	                el.closing = element;
	                var open_1 = getQualifiedElementName(el.opening.name);
	                var close_1 = getQualifiedElementName(el.closing.name);
	                if (open_1 !== close_1) {
	                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
	                }
	                if (stack.length > 0) {
	                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
	                    el = stack[stack.length - 1];
	                    el.children.push(child);
	                    stack.pop();
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return el;
	    };
	    JSXParser.prototype.parseJSXElement = function () {
	        var node = this.createJSXNode();
	        var opening = this.parseJSXOpeningElement();
	        var children = [];
	        var closing = null;
	        if (!opening.selfClosing) {
	            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
	            children = el.children;
	            closing = el.closing;
	        }
	        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
	    };
	    JSXParser.prototype.parseJSXRoot = function () {
	        // Pop the opening '<' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	        this.startJSX();
	        var element = this.parseJSXElement();
	        this.finishJSX();
	        return element;
	    };
	    JSXParser.prototype.isStartOfExpression = function () {
	        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
	    };
	    return JSXParser;
	}(parser_1.Parser));
	exports.JSXParser = JSXParser;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// See also tools/generate-unicode-regex.js.
	var Regex = {
	    // Unicode v8.0.0 NonAsciiIdentifierStart:
	    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	    // Unicode v8.0.0 NonAsciiIdentifierPart:
	    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	};
	exports.Character = {
	    /* tslint:disable:no-bitwise */
	    fromCodePoint: function (cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    },
	    // https://tc39.github.io/ecma262/#sec-white-space
	    isWhiteSpace: function (cp) {
	        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
	            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
	    },
	    // https://tc39.github.io/ecma262/#sec-line-terminators
	    isLineTerminator: function (cp) {
	        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
	    },
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    isIdentifierStart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
	    },
	    isIdentifierPart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp >= 0x30 && cp <= 0x39) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
	    },
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    isDecimalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39); // 0..9
	    },
	    isHexDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39) ||
	            (cp >= 0x41 && cp <= 0x46) ||
	            (cp >= 0x61 && cp <= 0x66); // a..f
	    },
	    isOctalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x37); // 0..7
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var jsx_syntax_1 = __webpack_require__(6);
	/* tslint:disable:max-classes-per-file */
	var JSXClosingElement = (function () {
	    function JSXClosingElement(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
	        this.name = name;
	    }
	    return JSXClosingElement;
	}());
	exports.JSXClosingElement = JSXClosingElement;
	var JSXElement = (function () {
	    function JSXElement(openingElement, children, closingElement) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
	        this.openingElement = openingElement;
	        this.children = children;
	        this.closingElement = closingElement;
	    }
	    return JSXElement;
	}());
	exports.JSXElement = JSXElement;
	var JSXEmptyExpression = (function () {
	    function JSXEmptyExpression() {
	        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
	    }
	    return JSXEmptyExpression;
	}());
	exports.JSXEmptyExpression = JSXEmptyExpression;
	var JSXExpressionContainer = (function () {
	    function JSXExpressionContainer(expression) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
	        this.expression = expression;
	    }
	    return JSXExpressionContainer;
	}());
	exports.JSXExpressionContainer = JSXExpressionContainer;
	var JSXIdentifier = (function () {
	    function JSXIdentifier(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
	        this.name = name;
	    }
	    return JSXIdentifier;
	}());
	exports.JSXIdentifier = JSXIdentifier;
	var JSXMemberExpression = (function () {
	    function JSXMemberExpression(object, property) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
	        this.object = object;
	        this.property = property;
	    }
	    return JSXMemberExpression;
	}());
	exports.JSXMemberExpression = JSXMemberExpression;
	var JSXAttribute = (function () {
	    function JSXAttribute(name, value) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
	        this.name = name;
	        this.value = value;
	    }
	    return JSXAttribute;
	}());
	exports.JSXAttribute = JSXAttribute;
	var JSXNamespacedName = (function () {
	    function JSXNamespacedName(namespace, name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
	        this.namespace = namespace;
	        this.name = name;
	    }
	    return JSXNamespacedName;
	}());
	exports.JSXNamespacedName = JSXNamespacedName;
	var JSXOpeningElement = (function () {
	    function JSXOpeningElement(name, selfClosing, attributes) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
	        this.name = name;
	        this.selfClosing = selfClosing;
	        this.attributes = attributes;
	    }
	    return JSXOpeningElement;
	}());
	exports.JSXOpeningElement = JSXOpeningElement;
	var JSXSpreadAttribute = (function () {
	    function JSXSpreadAttribute(argument) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
	        this.argument = argument;
	    }
	    return JSXSpreadAttribute;
	}());
	exports.JSXSpreadAttribute = JSXSpreadAttribute;
	var JSXText = (function () {
	    function JSXText(value, raw) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXText;
	        this.value = value;
	        this.raw = raw;
	    }
	    return JSXText;
	}());
	exports.JSXText = JSXText;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSXSyntax = {
	    JSXAttribute: 'JSXAttribute',
	    JSXClosingElement: 'JSXClosingElement',
	    JSXElement: 'JSXElement',
	    JSXEmptyExpression: 'JSXEmptyExpression',
	    JSXExpressionContainer: 'JSXExpressionContainer',
	    JSXIdentifier: 'JSXIdentifier',
	    JSXMemberExpression: 'JSXMemberExpression',
	    JSXNamespacedName: 'JSXNamespacedName',
	    JSXOpeningElement: 'JSXOpeningElement',
	    JSXSpreadAttribute: 'JSXSpreadAttribute',
	    JSXText: 'JSXText'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	/* tslint:disable:max-classes-per-file */
	var ArrayExpression = (function () {
	    function ArrayExpression(elements) {
	        this.type = syntax_1.Syntax.ArrayExpression;
	        this.elements = elements;
	    }
	    return ArrayExpression;
	}());
	exports.ArrayExpression = ArrayExpression;
	var ArrayPattern = (function () {
	    function ArrayPattern(elements) {
	        this.type = syntax_1.Syntax.ArrayPattern;
	        this.elements = elements;
	    }
	    return ArrayPattern;
	}());
	exports.ArrayPattern = ArrayPattern;
	var ArrowFunctionExpression = (function () {
	    function ArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = false;
	    }
	    return ArrowFunctionExpression;
	}());
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	var AssignmentExpression = (function () {
	    function AssignmentExpression(operator, left, right) {
	        this.type = syntax_1.Syntax.AssignmentExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentExpression;
	}());
	exports.AssignmentExpression = AssignmentExpression;
	var AssignmentPattern = (function () {
	    function AssignmentPattern(left, right) {
	        this.type = syntax_1.Syntax.AssignmentPattern;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentPattern;
	}());
	exports.AssignmentPattern = AssignmentPattern;
	var AsyncArrowFunctionExpression = (function () {
	    function AsyncArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = true;
	    }
	    return AsyncArrowFunctionExpression;
	}());
	exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
	var AsyncFunctionDeclaration = (function () {
	    function AsyncFunctionDeclaration(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionDeclaration;
	}());
	exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
	var AsyncFunctionExpression = (function () {
	    function AsyncFunctionExpression(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionExpression;
	}());
	exports.AsyncFunctionExpression = AsyncFunctionExpression;
	var AwaitExpression = (function () {
	    function AwaitExpression(argument) {
	        this.type = syntax_1.Syntax.AwaitExpression;
	        this.argument = argument;
	    }
	    return AwaitExpression;
	}());
	exports.AwaitExpression = AwaitExpression;
	var BinaryExpression = (function () {
	    function BinaryExpression(operator, left, right) {
	        var logical = (operator === '||' || operator === '&&');
	        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return BinaryExpression;
	}());
	exports.BinaryExpression = BinaryExpression;
	var BlockStatement = (function () {
	    function BlockStatement(body) {
	        this.type = syntax_1.Syntax.BlockStatement;
	        this.body = body;
	    }
	    return BlockStatement;
	}());
	exports.BlockStatement = BlockStatement;
	var BreakStatement = (function () {
	    function BreakStatement(label) {
	        this.type = syntax_1.Syntax.BreakStatement;
	        this.label = label;
	    }
	    return BreakStatement;
	}());
	exports.BreakStatement = BreakStatement;
	var CallExpression = (function () {
	    function CallExpression(callee, args) {
	        this.type = syntax_1.Syntax.CallExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return CallExpression;
	}());
	exports.CallExpression = CallExpression;
	var CatchClause = (function () {
	    function CatchClause(param, body) {
	        this.type = syntax_1.Syntax.CatchClause;
	        this.param = param;
	        this.body = body;
	    }
	    return CatchClause;
	}());
	exports.CatchClause = CatchClause;
	var ClassBody = (function () {
	    function ClassBody(body) {
	        this.type = syntax_1.Syntax.ClassBody;
	        this.body = body;
	    }
	    return ClassBody;
	}());
	exports.ClassBody = ClassBody;
	var ClassDeclaration = (function () {
	    function ClassDeclaration(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassDeclaration;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassDeclaration;
	}());
	exports.ClassDeclaration = ClassDeclaration;
	var ClassExpression = (function () {
	    function ClassExpression(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassExpression;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassExpression;
	}());
	exports.ClassExpression = ClassExpression;
	var ComputedMemberExpression = (function () {
	    function ComputedMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = true;
	        this.object = object;
	        this.property = property;
	    }
	    return ComputedMemberExpression;
	}());
	exports.ComputedMemberExpression = ComputedMemberExpression;
	var ConditionalExpression = (function () {
	    function ConditionalExpression(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.ConditionalExpression;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return ConditionalExpression;
	}());
	exports.ConditionalExpression = ConditionalExpression;
	var ContinueStatement = (function () {
	    function ContinueStatement(label) {
	        this.type = syntax_1.Syntax.ContinueStatement;
	        this.label = label;
	    }
	    return ContinueStatement;
	}());
	exports.ContinueStatement = ContinueStatement;
	var DebuggerStatement = (function () {
	    function DebuggerStatement() {
	        this.type = syntax_1.Syntax.DebuggerStatement;
	    }
	    return DebuggerStatement;
	}());
	exports.DebuggerStatement = DebuggerStatement;
	var Directive = (function () {
	    function Directive(expression, directive) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	        this.directive = directive;
	    }
	    return Directive;
	}());
	exports.Directive = Directive;
	var DoWhileStatement = (function () {
	    function DoWhileStatement(body, test) {
	        this.type = syntax_1.Syntax.DoWhileStatement;
	        this.body = body;
	        this.test = test;
	    }
	    return DoWhileStatement;
	}());
	exports.DoWhileStatement = DoWhileStatement;
	var EmptyStatement = (function () {
	    function EmptyStatement() {
	        this.type = syntax_1.Syntax.EmptyStatement;
	    }
	    return EmptyStatement;
	}());
	exports.EmptyStatement = EmptyStatement;
	var ExportAllDeclaration = (function () {
	    function ExportAllDeclaration(source) {
	        this.type = syntax_1.Syntax.ExportAllDeclaration;
	        this.source = source;
	    }
	    return ExportAllDeclaration;
	}());
	exports.ExportAllDeclaration = ExportAllDeclaration;
	var ExportDefaultDeclaration = (function () {
	    function ExportDefaultDeclaration(declaration) {
	        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
	        this.declaration = declaration;
	    }
	    return ExportDefaultDeclaration;
	}());
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	var ExportNamedDeclaration = (function () {
	    function ExportNamedDeclaration(declaration, specifiers, source) {
	        this.type = syntax_1.Syntax.ExportNamedDeclaration;
	        this.declaration = declaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ExportNamedDeclaration;
	}());
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	var ExportSpecifier = (function () {
	    function ExportSpecifier(local, exported) {
	        this.type = syntax_1.Syntax.ExportSpecifier;
	        this.exported = exported;
	        this.local = local;
	    }
	    return ExportSpecifier;
	}());
	exports.ExportSpecifier = ExportSpecifier;
	var ExpressionStatement = (function () {
	    function ExpressionStatement(expression) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	    }
	    return ExpressionStatement;
	}());
	exports.ExpressionStatement = ExpressionStatement;
	var ForInStatement = (function () {
	    function ForInStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForInStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	        this.each = false;
	    }
	    return ForInStatement;
	}());
	exports.ForInStatement = ForInStatement;
	var ForOfStatement = (function () {
	    function ForOfStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForOfStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	    }
	    return ForOfStatement;
	}());
	exports.ForOfStatement = ForOfStatement;
	var ForStatement = (function () {
	    function ForStatement(init, test, update, body) {
	        this.type = syntax_1.Syntax.ForStatement;
	        this.init = init;
	        this.test = test;
	        this.update = update;
	        this.body = body;
	    }
	    return ForStatement;
	}());
	exports.ForStatement = ForStatement;
	var FunctionDeclaration = (function () {
	    function FunctionDeclaration(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionDeclaration;
	}());
	exports.FunctionDeclaration = FunctionDeclaration;
	var FunctionExpression = (function () {
	    function FunctionExpression(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	var Identifier = (function () {
	    function Identifier(name) {
	        this.type = syntax_1.Syntax.Identifier;
	        this.name = name;
	    }
	    return Identifier;
	}());
	exports.Identifier = Identifier;
	var IfStatement = (function () {
	    function IfStatement(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.IfStatement;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return IfStatement;
	}());
	exports.IfStatement = IfStatement;
	var ImportDeclaration = (function () {
	    function ImportDeclaration(specifiers, source) {
	        this.type = syntax_1.Syntax.ImportDeclaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ImportDeclaration;
	}());
	exports.ImportDeclaration = ImportDeclaration;
	var ImportDefaultSpecifier = (function () {
	    function ImportDefaultSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
	        this.local = local;
	    }
	    return ImportDefaultSpecifier;
	}());
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	var ImportNamespaceSpecifier = (function () {
	    function ImportNamespaceSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
	        this.local = local;
	    }
	    return ImportNamespaceSpecifier;
	}());
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	var ImportSpecifier = (function () {
	    function ImportSpecifier(local, imported) {
	        this.type = syntax_1.Syntax.ImportSpecifier;
	        this.local = local;
	        this.imported = imported;
	    }
	    return ImportSpecifier;
	}());
	exports.ImportSpecifier = ImportSpecifier;
	var LabeledStatement = (function () {
	    function LabeledStatement(label, body) {
	        this.type = syntax_1.Syntax.LabeledStatement;
	        this.label = label;
	        this.body = body;
	    }
	    return LabeledStatement;
	}());
	exports.LabeledStatement = LabeledStatement;
	var Literal = (function () {
	    function Literal(value, raw) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	    }
	    return Literal;
	}());
	exports.Literal = Literal;
	var MetaProperty = (function () {
	    function MetaProperty(meta, property) {
	        this.type = syntax_1.Syntax.MetaProperty;
	        this.meta = meta;
	        this.property = property;
	    }
	    return MetaProperty;
	}());
	exports.MetaProperty = MetaProperty;
	var MethodDefinition = (function () {
	    function MethodDefinition(key, computed, value, kind, isStatic) {
	        this.type = syntax_1.Syntax.MethodDefinition;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.static = isStatic;
	    }
	    return MethodDefinition;
	}());
	exports.MethodDefinition = MethodDefinition;
	var Module = (function () {
	    function Module(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'module';
	    }
	    return Module;
	}());
	exports.Module = Module;
	var NewExpression = (function () {
	    function NewExpression(callee, args) {
	        this.type = syntax_1.Syntax.NewExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return NewExpression;
	}());
	exports.NewExpression = NewExpression;
	var ObjectExpression = (function () {
	    function ObjectExpression(properties) {
	        this.type = syntax_1.Syntax.ObjectExpression;
	        this.properties = properties;
	    }
	    return ObjectExpression;
	}());
	exports.ObjectExpression = ObjectExpression;
	var ObjectPattern = (function () {
	    function ObjectPattern(properties) {
	        this.type = syntax_1.Syntax.ObjectPattern;
	        this.properties = properties;
	    }
	    return ObjectPattern;
	}());
	exports.ObjectPattern = ObjectPattern;
	var Property = (function () {
	    function Property(kind, key, computed, value, method, shorthand) {
	        this.type = syntax_1.Syntax.Property;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.method = method;
	        this.shorthand = shorthand;
	    }
	    return Property;
	}());
	exports.Property = Property;
	var RegexLiteral = (function () {
	    function RegexLiteral(value, raw, pattern, flags) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	        this.regex = { pattern: pattern, flags: flags };
	    }
	    return RegexLiteral;
	}());
	exports.RegexLiteral = RegexLiteral;
	var RestElement = (function () {
	    function RestElement(argument) {
	        this.type = syntax_1.Syntax.RestElement;
	        this.argument = argument;
	    }
	    return RestElement;
	}());
	exports.RestElement = RestElement;
	var ReturnStatement = (function () {
	    function ReturnStatement(argument) {
	        this.type = syntax_1.Syntax.ReturnStatement;
	        this.argument = argument;
	    }
	    return ReturnStatement;
	}());
	exports.ReturnStatement = ReturnStatement;
	var Script = (function () {
	    function Script(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'script';
	    }
	    return Script;
	}());
	exports.Script = Script;
	var SequenceExpression = (function () {
	    function SequenceExpression(expressions) {
	        this.type = syntax_1.Syntax.SequenceExpression;
	        this.expressions = expressions;
	    }
	    return SequenceExpression;
	}());
	exports.SequenceExpression = SequenceExpression;
	var SpreadElement = (function () {
	    function SpreadElement(argument) {
	        this.type = syntax_1.Syntax.SpreadElement;
	        this.argument = argument;
	    }
	    return SpreadElement;
	}());
	exports.SpreadElement = SpreadElement;
	var StaticMemberExpression = (function () {
	    function StaticMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = false;
	        this.object = object;
	        this.property = property;
	    }
	    return StaticMemberExpression;
	}());
	exports.StaticMemberExpression = StaticMemberExpression;
	var Super = (function () {
	    function Super() {
	        this.type = syntax_1.Syntax.Super;
	    }
	    return Super;
	}());
	exports.Super = Super;
	var SwitchCase = (function () {
	    function SwitchCase(test, consequent) {
	        this.type = syntax_1.Syntax.SwitchCase;
	        this.test = test;
	        this.consequent = consequent;
	    }
	    return SwitchCase;
	}());
	exports.SwitchCase = SwitchCase;
	var SwitchStatement = (function () {
	    function SwitchStatement(discriminant, cases) {
	        this.type = syntax_1.Syntax.SwitchStatement;
	        this.discriminant = discriminant;
	        this.cases = cases;
	    }
	    return SwitchStatement;
	}());
	exports.SwitchStatement = SwitchStatement;
	var TaggedTemplateExpression = (function () {
	    function TaggedTemplateExpression(tag, quasi) {
	        this.type = syntax_1.Syntax.TaggedTemplateExpression;
	        this.tag = tag;
	        this.quasi = quasi;
	    }
	    return TaggedTemplateExpression;
	}());
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	var TemplateElement = (function () {
	    function TemplateElement(value, tail) {
	        this.type = syntax_1.Syntax.TemplateElement;
	        this.value = value;
	        this.tail = tail;
	    }
	    return TemplateElement;
	}());
	exports.TemplateElement = TemplateElement;
	var TemplateLiteral = (function () {
	    function TemplateLiteral(quasis, expressions) {
	        this.type = syntax_1.Syntax.TemplateLiteral;
	        this.quasis = quasis;
	        this.expressions = expressions;
	    }
	    return TemplateLiteral;
	}());
	exports.TemplateLiteral = TemplateLiteral;
	var ThisExpression = (function () {
	    function ThisExpression() {
	        this.type = syntax_1.Syntax.ThisExpression;
	    }
	    return ThisExpression;
	}());
	exports.ThisExpression = ThisExpression;
	var ThrowStatement = (function () {
	    function ThrowStatement(argument) {
	        this.type = syntax_1.Syntax.ThrowStatement;
	        this.argument = argument;
	    }
	    return ThrowStatement;
	}());
	exports.ThrowStatement = ThrowStatement;
	var TryStatement = (function () {
	    function TryStatement(block, handler, finalizer) {
	        this.type = syntax_1.Syntax.TryStatement;
	        this.block = block;
	        this.handler = handler;
	        this.finalizer = finalizer;
	    }
	    return TryStatement;
	}());
	exports.TryStatement = TryStatement;
	var UnaryExpression = (function () {
	    function UnaryExpression(operator, argument) {
	        this.type = syntax_1.Syntax.UnaryExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = true;
	    }
	    return UnaryExpression;
	}());
	exports.UnaryExpression = UnaryExpression;
	var UpdateExpression = (function () {
	    function UpdateExpression(operator, argument, prefix) {
	        this.type = syntax_1.Syntax.UpdateExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = prefix;
	    }
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	var VariableDeclaration = (function () {
	    function VariableDeclaration(declarations, kind) {
	        this.type = syntax_1.Syntax.VariableDeclaration;
	        this.declarations = declarations;
	        this.kind = kind;
	    }
	    return VariableDeclaration;
	}());
	exports.VariableDeclaration = VariableDeclaration;
	var VariableDeclarator = (function () {
	    function VariableDeclarator(id, init) {
	        this.type = syntax_1.Syntax.VariableDeclarator;
	        this.id = id;
	        this.init = init;
	    }
	    return VariableDeclarator;
	}());
	exports.VariableDeclarator = VariableDeclarator;
	var WhileStatement = (function () {
	    function WhileStatement(test, body) {
	        this.type = syntax_1.Syntax.WhileStatement;
	        this.test = test;
	        this.body = body;
	    }
	    return WhileStatement;
	}());
	exports.WhileStatement = WhileStatement;
	var WithStatement = (function () {
	    function WithStatement(object, body) {
	        this.type = syntax_1.Syntax.WithStatement;
	        this.object = object;
	        this.body = body;
	    }
	    return WithStatement;
	}());
	exports.WithStatement = WithStatement;
	var YieldExpression = (function () {
	    function YieldExpression(argument, delegate) {
	        this.type = syntax_1.Syntax.YieldExpression;
	        this.argument = argument;
	        this.delegate = delegate;
	    }
	    return YieldExpression;
	}());
	exports.YieldExpression = YieldExpression;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var error_handler_1 = __webpack_require__(10);
	var messages_1 = __webpack_require__(11);
	var Node = __webpack_require__(7);
	var scanner_1 = __webpack_require__(12);
	var syntax_1 = __webpack_require__(2);
	var token_1 = __webpack_require__(13);
	var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
	var Parser = (function () {
	    function Parser(code, options, delegate) {
	        if (options === void 0) { options = {}; }
	        this.config = {
	            range: (typeof options.range === 'boolean') && options.range,
	            loc: (typeof options.loc === 'boolean') && options.loc,
	            source: null,
	            tokens: (typeof options.tokens === 'boolean') && options.tokens,
	            comment: (typeof options.comment === 'boolean') && options.comment,
	            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
	        };
	        if (this.config.loc && options.source && options.source !== null) {
	            this.config.source = String(options.source);
	        }
	        this.delegate = delegate;
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = this.config.tolerant;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = this.config.comment;
	        this.operatorPrecedence = {
	            ')': 0,
	            ';': 0,
	            ',': 0,
	            '=': 0,
	            ']': 0,
	            '||': 1,
	            '&&': 2,
	            '|': 3,
	            '^': 4,
	            '&': 5,
	            '==': 6,
	            '!=': 6,
	            '===': 6,
	            '!==': 6,
	            '<': 7,
	            '>': 7,
	            '<=': 7,
	            '>=': 7,
	            '<<': 8,
	            '>>': 8,
	            '>>>': 8,
	            '+': 9,
	            '-': 9,
	            '*': 11,
	            '/': 11,
	            '%': 11
	        };
	        this.lookahead = {
	            type: 2 /* EOF */,
	            value: '',
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0,
	            start: 0,
	            end: 0
	        };
	        this.hasLineTerminator = false;
	        this.context = {
	            isModule: false,
	            await: false,
	            allowIn: true,
	            allowStrictDirective: true,
	            allowYield: true,
	            firstCoverInitializedNameError: null,
	            isAssignmentTarget: false,
	            isBindingElement: false,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            labelSet: {},
	            strict: false
	        };
	        this.tokens = [];
	        this.startMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.lastMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.nextToken();
	        this.lastMarker = {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    }
	    Parser.prototype.throwError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.lastMarker.line;
	        var column = this.lastMarker.column + 1;
	        throw this.errorHandler.createError(index, line, column, msg);
	    };
	    Parser.prototype.tolerateError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.scanner.lineNumber;
	        var column = this.lastMarker.column + 1;
	        this.errorHandler.tolerateError(index, line, column, msg);
	    };
	    // Throw an exception because of the token.
	    Parser.prototype.unexpectedTokenError = function (token, message) {
	        var msg = message || messages_1.Messages.UnexpectedToken;
	        var value;
	        if (token) {
	            if (!message) {
	                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
	                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
	                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
	                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
	                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
	                                    messages_1.Messages.UnexpectedToken;
	                if (token.type === 4 /* Keyword */) {
	                    if (this.scanner.isFutureReservedWord(token.value)) {
	                        msg = messages_1.Messages.UnexpectedReserved;
	                    }
	                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
	                        msg = messages_1.Messages.StrictReservedWord;
	                    }
	                }
	            }
	            value = token.value;
	        }
	        else {
	            value = 'ILLEGAL';
	        }
	        msg = msg.replace('%0', value);
	        if (token && typeof token.lineNumber === 'number') {
	            var index = token.start;
	            var line = token.lineNumber;
	            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
	            var column = token.start - lastMarkerLineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	        else {
	            var index = this.lastMarker.index;
	            var line = this.lastMarker.line;
	            var column = this.lastMarker.column + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	    };
	    Parser.prototype.throwUnexpectedToken = function (token, message) {
	        throw this.unexpectedTokenError(token, message);
	    };
	    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
	        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	    };
	    Parser.prototype.collectComments = function () {
	        if (!this.config.comment) {
	            this.scanner.scanComments();
	        }
	        else {
	            var comments = this.scanner.scanComments();
	            if (comments.length > 0 && this.delegate) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var node = void 0;
	                    node = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
	                    };
	                    if (this.config.range) {
	                        node.range = e.range;
	                    }
	                    if (this.config.loc) {
	                        node.loc = e.loc;
	                    }
	                    var metadata = {
	                        start: {
	                            line: e.loc.start.line,
	                            column: e.loc.start.column,
	                            offset: e.range[0]
	                        },
	                        end: {
	                            line: e.loc.end.line,
	                            column: e.loc.end.column,
	                            offset: e.range[1]
	                        }
	                    };
	                    this.delegate(node, metadata);
	                }
	            }
	        }
	    };
	    // From internal representation to an external structure
	    Parser.prototype.getTokenRaw = function (token) {
	        return this.scanner.source.slice(token.start, token.end);
	    };
	    Parser.prototype.convertToken = function (token) {
	        var t = {
	            type: token_1.TokenName[token.type],
	            value: this.getTokenRaw(token)
	        };
	        if (this.config.range) {
	            t.range = [token.start, token.end];
	        }
	        if (this.config.loc) {
	            t.loc = {
	                start: {
	                    line: this.startMarker.line,
	                    column: this.startMarker.column
	                },
	                end: {
	                    line: this.scanner.lineNumber,
	                    column: this.scanner.index - this.scanner.lineStart
	                }
	            };
	        }
	        if (token.type === 9 /* RegularExpression */) {
	            var pattern = token.pattern;
	            var flags = token.flags;
	            t.regex = { pattern: pattern, flags: flags };
	        }
	        return t;
	    };
	    Parser.prototype.nextToken = function () {
	        var token = this.lookahead;
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        this.collectComments();
	        if (this.scanner.index !== this.startMarker.index) {
	            this.startMarker.index = this.scanner.index;
	            this.startMarker.line = this.scanner.lineNumber;
	            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        }
	        var next = this.scanner.lex();
	        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
	        if (next && this.context.strict && next.type === 3 /* Identifier */) {
	            if (this.scanner.isStrictModeReservedWord(next.value)) {
	                next.type = 4 /* Keyword */;
	            }
	        }
	        this.lookahead = next;
	        if (this.config.tokens && next.type !== 2 /* EOF */) {
	            this.tokens.push(this.convertToken(next));
	        }
	        return token;
	    };
	    Parser.prototype.nextRegexToken = function () {
	        this.collectComments();
	        var token = this.scanner.scanRegExp();
	        if (this.config.tokens) {
	            // Pop the previous token, '/' or '/='
	            // This is added from the lookahead token.
	            this.tokens.pop();
	            this.tokens.push(this.convertToken(token));
	        }
	        // Prime the next lookahead.
	        this.lookahead = token;
	        this.nextToken();
	        return token;
	    };
	    Parser.prototype.createNode = function () {
	        return {
	            index: this.startMarker.index,
	            line: this.startMarker.line,
	            column: this.startMarker.column
	        };
	    };
	    Parser.prototype.startNode = function (token, lastLineStart) {
	        if (lastLineStart === void 0) { lastLineStart = 0; }
	        var column = token.start - token.lineStart;
	        var line = token.lineNumber;
	        if (column < 0) {
	            column += lastLineStart;
	            line--;
	        }
	        return {
	            index: token.start,
	            line: line,
	            column: column
	        };
	    };
	    Parser.prototype.finalize = function (marker, node) {
	        if (this.config.range) {
	            node.range = [marker.index, this.lastMarker.index];
	        }
	        if (this.config.loc) {
	            node.loc = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column
	                }
	            };
	            if (this.config.source) {
	                node.loc.source = this.config.source;
	            }
	        }
	        if (this.delegate) {
	            var metadata = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                    offset: marker.index
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column,
	                    offset: this.lastMarker.index
	                }
	            };
	            this.delegate(node, metadata);
	        }
	        return node;
	    };
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    Parser.prototype.expect = function (value) {
	        var token = this.nextToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	    Parser.prototype.expectCommaSeparator = function () {
	        if (this.config.tolerant) {
	            var token = this.lookahead;
	            if (token.type === 7 /* Punctuator */ && token.value === ',') {
	                this.nextToken();
	            }
	            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
	                this.nextToken();
	                this.tolerateUnexpectedToken(token);
	            }
	            else {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
	            }
	        }
	        else {
	            this.expect(',');
	        }
	    };
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	    Parser.prototype.expectKeyword = function (keyword) {
	        var token = this.nextToken();
	        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next token matches the specified punctuator.
	    Parser.prototype.match = function (value) {
	        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
	    };
	    // Return true if the next token matches the specified keyword
	    Parser.prototype.matchKeyword = function (keyword) {
	        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	    Parser.prototype.matchContextualKeyword = function (keyword) {
	        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token is an assignment operator
	    Parser.prototype.matchAssign = function () {
	        if (this.lookahead.type !== 7 /* Punctuator */) {
	            return false;
	        }
	        var op = this.lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '**=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    };
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        if (this.context.firstCoverInitializedNameError !== null) {
	            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
	        }
	        this.context.isBindingElement = previousIsBindingElement;
	        this.context.isAssignmentTarget = previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
	        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.consumeSemicolon = function () {
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else if (!this.hasLineTerminator) {
	            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.lastMarker.index = this.startMarker.index;
	            this.lastMarker.line = this.startMarker.line;
	            this.lastMarker.column = this.startMarker.column;
	        }
	    };
	    // https://tc39.github.io/ecma262/#sec-primary-expression
	    Parser.prototype.parsePrimaryExpression = function () {
	        var node = this.createNode();
	        var expr;
	        var token, raw;
	        switch (this.lookahead.type) {
	            case 3 /* Identifier */:
	                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
	                    this.tolerateUnexpectedToken(this.lookahead);
	                }
	                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
	                break;
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	                if (this.context.strict && this.lookahead.octal) {
	                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
	                }
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 1 /* BooleanLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
	                break;
	            case 5 /* NullLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(null, raw));
	                break;
	            case 10 /* Template */:
	                expr = this.parseTemplateLiteral();
	                break;
	            case 7 /* Punctuator */:
	                switch (this.lookahead.value) {
	                    case '(':
	                        this.context.isBindingElement = false;
	                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
	                        break;
	                    case '[':
	                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
	                        break;
	                    case '{':
	                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
	                        break;
	                    case '/':
	                    case '/=':
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                        this.scanner.index = this.startMarker.index;
	                        token = this.nextRegexToken();
	                        raw = this.getTokenRaw(token);
	                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
	                        break;
	                    default:
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                }
	                break;
	            case 4 /* Keyword */:
	                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
	                    expr = this.parseIdentifierName();
	                }
	                else if (!this.context.strict && this.matchKeyword('let')) {
	                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                }
	                else {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    if (this.matchKeyword('function')) {
	                        expr = this.parseFunctionExpression();
	                    }
	                    else if (this.matchKeyword('this')) {
	                        this.nextToken();
	                        expr = this.finalize(node, new Node.ThisExpression());
	                    }
	                    else if (this.matchKeyword('class')) {
	                        expr = this.parseClassExpression();
	                    }
	                    else {
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                    }
	                }
	                break;
	            default:
	                expr = this.throwUnexpectedToken(this.nextToken());
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-array-initializer
	    Parser.prototype.parseSpreadElement = function () {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
	        return this.finalize(node, new Node.SpreadElement(arg));
	    };
	    Parser.prototype.parseArrayInitializer = function () {
	        var node = this.createNode();
	        var elements = [];
	        this.expect('[');
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else if (this.match('...')) {
	                var element = this.parseSpreadElement();
	                if (!this.match(']')) {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    this.expect(',');
	                }
	                elements.push(element);
	            }
	            else {
	                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayExpression(elements));
	    };
	    // https://tc39.github.io/ecma262/#sec-object-initializer
	    Parser.prototype.parsePropertyMethod = function (params) {
	        this.context.isAssignmentTarget = false;
	        this.context.isBindingElement = false;
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = params.simple;
	        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
	        if (this.context.strict && params.firstRestricted) {
	            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
	        }
	        if (this.context.strict && params.stricted) {
	            this.tolerateUnexpectedToken(params.stricted, params.message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        return body;
	    };
	    Parser.prototype.parsePropertyMethodFunction = function () {
	        var isGenerator = false;
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        var previousAwait = this.context.await;
	        this.context.allowYield = false;
	        this.context.await = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        this.context.await = previousAwait;
	        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
	    };
	    Parser.prototype.parseObjectPropertyKey = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        var key;
	        switch (token.type) {
	            case 8 /* StringLiteral */:
	            case 6 /* NumericLiteral */:
	                if (this.context.strict && token.octal) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
	                }
	                var raw = this.getTokenRaw(token);
	                key = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 3 /* Identifier */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 4 /* Keyword */:
	                key = this.finalize(node, new Node.Identifier(token.value));
	                break;
	            case 7 /* Punctuator */:
	                if (token.value === '[') {
	                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    this.expect(']');
	                }
	                else {
	                    key = this.throwUnexpectedToken(token);
	                }
	                break;
	            default:
	                key = this.throwUnexpectedToken(token);
	        }
	        return key;
	    };
	    Parser.prototype.isPropertyKey = function (key, value) {
	        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
	            (key.type === syntax_1.Syntax.Literal && key.value === value);
	    };
	    Parser.prototype.parseObjectProperty = function (hasProto) {
	        var node = this.createNode();
	        var token = this.lookahead;
	        var kind;
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var shorthand = false;
	        var isAsync = false;
	        if (token.type === 3 /* Identifier */) {
	            var id = token.value;
	            this.nextToken();
	            computed = this.match('[');
	            isAsync = !this.hasLineTerminator && (id === 'async') &&
	                !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
	            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
	        }
	        else if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
	            kind = 'get';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.context.allowYield = false;
	            value = this.parseGetterMethod();
	        }
	        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
	            kind = 'set';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseSetterMethod();
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        else {
	            if (!key) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            kind = 'init';
	            if (this.match(':') && !isAsync) {
	                if (!computed && this.isPropertyKey(key, '__proto__')) {
	                    if (hasProto.value) {
	                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
	                    }
	                    hasProto.value = true;
	                }
	                this.nextToken();
	                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
	            }
	            else if (this.match('(')) {
	                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	                method = true;
	            }
	            else if (token.type === 3 /* Identifier */) {
	                var id = this.finalize(node, new Node.Identifier(token.value));
	                if (this.match('=')) {
	                    this.context.firstCoverInitializedNameError = this.lookahead;
	                    this.nextToken();
	                    shorthand = true;
	                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
	                }
	                else {
	                    shorthand = true;
	                    value = id;
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectInitializer = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var properties = [];
	        var hasProto = { value: false };
	        while (!this.match('}')) {
	            properties.push(this.parseObjectProperty(hasProto));
	            if (!this.match('}')) {
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectExpression(properties));
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literals
	    Parser.prototype.parseTemplateHead = function () {
	        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateElement = function () {
	        if (this.lookahead.type !== 10 /* Template */) {
	            this.throwUnexpectedToken();
	        }
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateLiteral = function () {
	        var node = this.createNode();
	        var expressions = [];
	        var quasis = [];
	        var quasi = this.parseTemplateHead();
	        quasis.push(quasi);
	        while (!quasi.tail) {
	            expressions.push(this.parseExpression());
	            quasi = this.parseTemplateElement();
	            quasis.push(quasi);
	        }
	        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	    };
	    // https://tc39.github.io/ecma262/#sec-grouping-operator
	    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	            case syntax_1.Syntax.MemberExpression:
	            case syntax_1.Syntax.RestElement:
	            case syntax_1.Syntax.AssignmentPattern:
	                break;
	            case syntax_1.Syntax.SpreadElement:
	                expr.type = syntax_1.Syntax.RestElement;
	                this.reinterpretExpressionAsPattern(expr.argument);
	                break;
	            case syntax_1.Syntax.ArrayExpression:
	                expr.type = syntax_1.Syntax.ArrayPattern;
	                for (var i = 0; i < expr.elements.length; i++) {
	                    if (expr.elements[i] !== null) {
	                        this.reinterpretExpressionAsPattern(expr.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectExpression:
	                expr.type = syntax_1.Syntax.ObjectPattern;
	                for (var i = 0; i < expr.properties.length; i++) {
	                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
	                }
	                break;
	            case syntax_1.Syntax.AssignmentExpression:
	                expr.type = syntax_1.Syntax.AssignmentPattern;
	                delete expr.operator;
	                this.reinterpretExpressionAsPattern(expr.left);
	                break;
	            default:
	                // Allow other node type for tolerant parsing.
	                break;
	        }
	    };
	    Parser.prototype.parseGroupExpression = function () {
	        var expr;
	        this.expect('(');
	        if (this.match(')')) {
	            this.nextToken();
	            if (!this.match('=>')) {
	                this.expect('=>');
	            }
	            expr = {
	                type: ArrowParameterPlaceHolder,
	                params: [],
	                async: false
	            };
	        }
	        else {
	            var startToken = this.lookahead;
	            var params = [];
	            if (this.match('...')) {
	                expr = this.parseRestElement(params);
	                this.expect(')');
	                if (!this.match('=>')) {
	                    this.expect('=>');
	                }
	                expr = {
	                    type: ArrowParameterPlaceHolder,
	                    params: [expr],
	                    async: false
	                };
	            }
	            else {
	                var arrow = false;
	                this.context.isBindingElement = true;
	                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                if (this.match(',')) {
	                    var expressions = [];
	                    this.context.isAssignmentTarget = false;
	                    expressions.push(expr);
	                    while (this.lookahead.type !== 2 /* EOF */) {
	                        if (!this.match(',')) {
	                            break;
	                        }
	                        this.nextToken();
	                        if (this.match(')')) {
	                            this.nextToken();
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else if (this.match('...')) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            expressions.push(this.parseRestElement(params));
	                            this.expect(')');
	                            if (!this.match('=>')) {
	                                this.expect('=>');
	                            }
	                            this.context.isBindingElement = false;
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else {
	                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        if (arrow) {
	                            break;
	                        }
	                    }
	                    if (!arrow) {
	                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	                    }
	                }
	                if (!arrow) {
	                    this.expect(')');
	                    if (this.match('=>')) {
	                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: [expr],
	                                async: false
	                            };
	                        }
	                        if (!arrow) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
	                                for (var i = 0; i < expr.expressions.length; i++) {
	                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
	                                }
	                            }
	                            else {
	                                this.reinterpretExpressionAsPattern(expr);
	                            }
	                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: parameters,
	                                async: false
	                            };
	                        }
	                    }
	                    this.context.isBindingElement = false;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
	    Parser.prototype.parseArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAssignmentExpression);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.isIdentifierName = function (token) {
	        return token.type === 3 /* Identifier */ ||
	            token.type === 4 /* Keyword */ ||
	            token.type === 1 /* BooleanLiteral */ ||
	            token.type === 5 /* NullLiteral */;
	    };
	    Parser.prototype.parseIdentifierName = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (!this.isIdentifierName(token)) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseNewExpression = function () {
	        var node = this.createNode();
	        var id = this.parseIdentifierName();
	        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
	        var expr;
	        if (this.match('.')) {
	            this.nextToken();
	            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
	                var property = this.parseIdentifierName();
	                expr = new Node.MetaProperty(id, property);
	            }
	            else {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
	            var args = this.match('(') ? this.parseArguments() : [];
	            expr = new Node.NewExpression(callee, args);
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return this.finalize(node, expr);
	    };
	    Parser.prototype.parseAsyncArgument = function () {
	        var arg = this.parseAssignmentExpression();
	        this.context.firstCoverInitializedNameError = null;
	        return arg;
	    };
	    Parser.prototype.parseAsyncArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAsyncArgument);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
	        var startToken = this.lookahead;
	        var maybeAsync = this.matchContextualKeyword('async');
	        var previousAllowIn = this.context.allowIn;
	        this.context.allowIn = true;
	        var expr;
	        if (this.matchKeyword('super') && this.context.inFunctionBody) {
	            expr = this.createNode();
	            this.nextToken();
	            expr = this.finalize(expr, new Node.Super());
	            if (!this.match('(') && !this.match('.') && !this.match('[')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        }
	        while (true) {
	            if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.match('(')) {
	                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = false;
	                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
	                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
	                if (asyncArrow && this.match('=>')) {
	                    for (var i = 0; i < args.length; ++i) {
	                        this.reinterpretExpressionAsPattern(args[i]);
	                    }
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: args,
	                        async: true
	                    };
	                }
	            }
	            else if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        this.context.allowIn = previousAllowIn;
	        return expr;
	    };
	    Parser.prototype.parseSuper = function () {
	        var node = this.createNode();
	        this.expectKeyword('super');
	        if (!this.match('[') && !this.match('.')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        return this.finalize(node, new Node.Super());
	    };
	    Parser.prototype.parseLeftHandSideExpression = function () {
	        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
	        var node = this.startNode(this.lookahead);
	        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
	            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        while (true) {
	            if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-update-expressions
	    Parser.prototype.parseUpdateExpression = function () {
	        var expr;
	        var startToken = this.lookahead;
	        if (this.match('++') || this.match('--')) {
	            var node = this.startNode(startToken);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
	            }
	            if (!this.context.isAssignmentTarget) {
	                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	            }
	            var prefix = true;
	            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
	                if (this.match('++') || this.match('--')) {
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
	                    }
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    var operator = this.nextToken().value;
	                    var prefix = false;
	                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-unary-operators
	    Parser.prototype.parseAwaitExpression = function () {
	        var node = this.createNode();
	        this.nextToken();
	        var argument = this.parseUnaryExpression();
	        return this.finalize(node, new Node.AwaitExpression(argument));
	    };
	    Parser.prototype.parseUnaryExpression = function () {
	        var expr;
	        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
	            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
	            var node = this.startNode(this.lookahead);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
	            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
	                this.tolerateError(messages_1.Messages.StrictDelete);
	            }
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else if (this.context.await && this.matchContextualKeyword('await')) {
	            expr = this.parseAwaitExpression();
	        }
	        else {
	            expr = this.parseUpdateExpression();
	        }
	        return expr;
	    };
	    Parser.prototype.parseExponentiationExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-exp-operator
	    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
	    // https://tc39.github.io/ecma262/#sec-additive-operators
	    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
	    // https://tc39.github.io/ecma262/#sec-relational-operators
	    // https://tc39.github.io/ecma262/#sec-equality-operators
	    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
	    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
	    Parser.prototype.binaryPrecedence = function (token) {
	        var op = token.value;
	        var precedence;
	        if (token.type === 7 /* Punctuator */) {
	            precedence = this.operatorPrecedence[op] || 0;
	        }
	        else if (token.type === 4 /* Keyword */) {
	            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
	        }
	        else {
	            precedence = 0;
	        }
	        return precedence;
	    };
	    Parser.prototype.parseBinaryExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
	        var token = this.lookahead;
	        var prec = this.binaryPrecedence(token);
	        if (prec > 0) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var markers = [startToken, this.lookahead];
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            var stack = [left, token.value, right];
	            var precedences = [prec];
	            while (true) {
	                prec = this.binaryPrecedence(this.lookahead);
	                if (prec <= 0) {
	                    break;
	                }
	                // Reduce: make a binary expression from the three topmost entries.
	                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
	                    right = stack.pop();
	                    var operator = stack.pop();
	                    precedences.pop();
	                    left = stack.pop();
	                    markers.pop();
	                    var node = this.startNode(markers[markers.length - 1]);
	                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
	                }
	                // Shift.
	                stack.push(this.nextToken().value);
	                precedences.push(prec);
	                markers.push(this.lookahead);
	                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
	            }
	            // Final reduce to clean-up the stack.
	            var i = stack.length - 1;
	            expr = stack[i];
	            var lastMarker = markers.pop();
	            while (i > 1) {
	                var marker = markers.pop();
	                var lastLineStart = lastMarker && lastMarker.lineStart;
	                var node = this.startNode(marker, lastLineStart);
	                var operator = stack[i - 1];
	                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
	                i -= 2;
	                lastMarker = marker;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-conditional-operator
	    Parser.prototype.parseConditionalExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
	        if (this.match('?')) {
	            this.nextToken();
	            var previousAllowIn = this.context.allowIn;
	            this.context.allowIn = true;
	            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowIn = previousAllowIn;
	            this.expect(':');
	            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-assignment-operators
	    Parser.prototype.checkPatternParam = function (options, param) {
	        switch (param.type) {
	            case syntax_1.Syntax.Identifier:
	                this.validateParam(options, param, param.name);
	                break;
	            case syntax_1.Syntax.RestElement:
	                this.checkPatternParam(options, param.argument);
	                break;
	            case syntax_1.Syntax.AssignmentPattern:
	                this.checkPatternParam(options, param.left);
	                break;
	            case syntax_1.Syntax.ArrayPattern:
	                for (var i = 0; i < param.elements.length; i++) {
	                    if (param.elements[i] !== null) {
	                        this.checkPatternParam(options, param.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectPattern:
	                for (var i = 0; i < param.properties.length; i++) {
	                    this.checkPatternParam(options, param.properties[i].value);
	                }
	                break;
	            default:
	                break;
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	    };
	    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
	        var params = [expr];
	        var options;
	        var asyncArrow = false;
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	                break;
	            case ArrowParameterPlaceHolder:
	                params = expr.params;
	                asyncArrow = expr.async;
	                break;
	            default:
	                return null;
	        }
	        options = {
	            simple: true,
	            paramSet: {}
	        };
	        for (var i = 0; i < params.length; ++i) {
	            var param = params[i];
	            if (param.type === syntax_1.Syntax.AssignmentPattern) {
	                if (param.right.type === syntax_1.Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                    param.right.type = syntax_1.Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	            }
	            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.checkPatternParam(options, param);
	            params[i] = param;
	        }
	        if (this.context.strict || !this.context.allowYield) {
	            for (var i = 0; i < params.length; ++i) {
	                var param = params[i];
	                if (param.type === syntax_1.Syntax.YieldExpression) {
	                    this.throwUnexpectedToken(this.lookahead);
	                }
	            }
	        }
	        if (options.message === messages_1.Messages.StrictParamDupe) {
	            var token = this.context.strict ? options.stricted : options.firstRestricted;
	            this.throwUnexpectedToken(token, options.message);
	        }
	        return {
	            simple: options.simple,
	            params: params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseAssignmentExpression = function () {
	        var expr;
	        if (!this.context.allowYield && this.matchKeyword('yield')) {
	            expr = this.parseYieldExpression();
	        }
	        else {
	            var startToken = this.lookahead;
	            var token = startToken;
	            expr = this.parseConditionalExpression();
	            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
	                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
	                    var arg = this.parsePrimaryExpression();
	                    this.reinterpretExpressionAsPattern(arg);
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: [arg],
	                        async: true
	                    };
	                }
	            }
	            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
	                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                var isAsync = expr.async;
	                var list = this.reinterpretAsCoverFormalsList(expr);
	                if (list) {
	                    if (this.hasLineTerminator) {
	                        this.tolerateUnexpectedToken(this.lookahead);
	                    }
	                    this.context.firstCoverInitializedNameError = null;
	                    var previousStrict = this.context.strict;
	                    var previousAllowStrictDirective = this.context.allowStrictDirective;
	                    this.context.allowStrictDirective = list.simple;
	                    var previousAllowYield = this.context.allowYield;
	                    var previousAwait = this.context.await;
	                    this.context.allowYield = true;
	                    this.context.await = isAsync;
	                    var node = this.startNode(startToken);
	                    this.expect('=>');
	                    var body = void 0;
	                    if (this.match('{')) {
	                        var previousAllowIn = this.context.allowIn;
	                        this.context.allowIn = true;
	                        body = this.parseFunctionSourceElements();
	                        this.context.allowIn = previousAllowIn;
	                    }
	                    else {
	                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    }
	                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
	                    if (this.context.strict && list.firstRestricted) {
	                        this.throwUnexpectedToken(list.firstRestricted, list.message);
	                    }
	                    if (this.context.strict && list.stricted) {
	                        this.tolerateUnexpectedToken(list.stricted, list.message);
	                    }
	                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
	                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
	                    this.context.strict = previousStrict;
	                    this.context.allowStrictDirective = previousAllowStrictDirective;
	                    this.context.allowYield = previousAllowYield;
	                    this.context.await = previousAwait;
	                }
	            }
	            else {
	                if (this.matchAssign()) {
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
	                        var id = expr;
	                        if (this.scanner.isRestrictedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
	                        }
	                        if (this.scanner.isStrictModeReservedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	                        }
	                    }
	                    if (!this.match('=')) {
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                    }
	                    else {
	                        this.reinterpretExpressionAsPattern(expr);
	                    }
	                    token = this.nextToken();
	                    var operator = token.value;
	                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
	                    this.context.firstCoverInitializedNameError = null;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-comma-operator
	    Parser.prototype.parseExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        if (this.match(',')) {
	            var expressions = [];
	            expressions.push(expr);
	            while (this.lookahead.type !== 2 /* EOF */) {
	                if (!this.match(',')) {
	                    break;
	                }
	                this.nextToken();
	                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	            }
	            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-block
	    Parser.prototype.parseStatementListItem = function () {
	        var statement;
	        this.context.isAssignmentTarget = true;
	        this.context.isBindingElement = true;
	        if (this.lookahead.type === 4 /* Keyword */) {
	            switch (this.lookahead.value) {
	                case 'export':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
	                    }
	                    statement = this.parseExportDeclaration();
	                    break;
	                case 'import':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
	                    }
	                    statement = this.parseImportDeclaration();
	                    break;
	                case 'const':
	                    statement = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'function':
	                    statement = this.parseFunctionDeclaration();
	                    break;
	                case 'class':
	                    statement = this.parseClassDeclaration();
	                    break;
	                case 'let':
	                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
	                    break;
	                default:
	                    statement = this.parseStatement();
	                    break;
	            }
	        }
	        else {
	            statement = this.parseStatement();
	        }
	        return statement;
	    };
	    Parser.prototype.parseBlock = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var block = [];
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            block.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.BlockStatement(block));
	    };
	    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
	    Parser.prototype.parseLexicalBinding = function (kind, options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, kind);
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (kind === 'const') {
	            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
	                if (this.match('=')) {
	                    this.nextToken();
	                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                }
	                else {
	                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
	                }
	            }
	        }
	        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
	            this.expect('=');
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseBindingList = function (kind, options) {
	        var list = [this.parseLexicalBinding(kind, options)];
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseLexicalBinding(kind, options));
	        }
	        return list;
	    };
	    Parser.prototype.isLexicalDeclaration = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.scanner.lex();
	        this.scanner.restoreState(state);
	        return (next.type === 3 /* Identifier */) ||
	            (next.type === 7 /* Punctuator */ && next.value === '[') ||
	            (next.type === 7 /* Punctuator */ && next.value === '{') ||
	            (next.type === 4 /* Keyword */ && next.value === 'let') ||
	            (next.type === 4 /* Keyword */ && next.value === 'yield');
	    };
	    Parser.prototype.parseLexicalDeclaration = function (options) {
	        var node = this.createNode();
	        var kind = this.nextToken().value;
	        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	        var declarations = this.parseBindingList(kind, options);
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	    };
	    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
	    Parser.prototype.parseBindingRestElement = function (params, kind) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params, kind);
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseArrayPattern = function (params, kind) {
	        var node = this.createNode();
	        this.expect('[');
	        var elements = [];
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else {
	                if (this.match('...')) {
	                    elements.push(this.parseBindingRestElement(params, kind));
	                    break;
	                }
	                else {
	                    elements.push(this.parsePatternWithDefault(params, kind));
	                }
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayPattern(elements));
	    };
	    Parser.prototype.parsePropertyPattern = function (params, kind) {
	        var node = this.createNode();
	        var computed = false;
	        var shorthand = false;
	        var method = false;
	        var key;
	        var value;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            var keyToken = this.lookahead;
	            key = this.parseVariableIdentifier();
	            var init = this.finalize(node, new Node.Identifier(keyToken.value));
	            if (this.match('=')) {
	                params.push(keyToken);
	                shorthand = true;
	                this.nextToken();
	                var expr = this.parseAssignmentExpression();
	                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
	            }
	            else if (!this.match(':')) {
	                params.push(keyToken);
	                shorthand = true;
	                value = init;
	            }
	            else {
	                this.expect(':');
	                value = this.parsePatternWithDefault(params, kind);
	            }
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.expect(':');
	            value = this.parsePatternWithDefault(params, kind);
	        }
	        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectPattern = function (params, kind) {
	        var node = this.createNode();
	        var properties = [];
	        this.expect('{');
	        while (!this.match('}')) {
	            properties.push(this.parsePropertyPattern(params, kind));
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectPattern(properties));
	    };
	    Parser.prototype.parsePattern = function (params, kind) {
	        var pattern;
	        if (this.match('[')) {
	            pattern = this.parseArrayPattern(params, kind);
	        }
	        else if (this.match('{')) {
	            pattern = this.parseObjectPattern(params, kind);
	        }
	        else {
	            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
	                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
	            }
	            params.push(this.lookahead);
	            pattern = this.parseVariableIdentifier(kind);
	        }
	        return pattern;
	    };
	    Parser.prototype.parsePatternWithDefault = function (params, kind) {
	        var startToken = this.lookahead;
	        var pattern = this.parsePattern(params, kind);
	        if (this.match('=')) {
	            this.nextToken();
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = true;
	            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowYield = previousAllowYield;
	            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
	        }
	        return pattern;
	    };
	    // https://tc39.github.io/ecma262/#sec-variable-statement
	    Parser.prototype.parseVariableIdentifier = function (kind) {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
	            if (this.context.strict) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else if (!this.context.allowYield) {
	                this.throwUnexpectedToken(token);
	            }
	        }
	        else if (token.type !== 3 /* Identifier */) {
	            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else {
	                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
	                    this.throwUnexpectedToken(token);
	                }
	            }
	        }
	        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
	            this.tolerateUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseVariableDeclaration = function (options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, 'var');
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (this.match('=')) {
	            this.nextToken();
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
	            this.expect('=');
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseVariableDeclarationList = function (options) {
	        var opt = { inFor: options.inFor };
	        var list = [];
	        list.push(this.parseVariableDeclaration(opt));
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseVariableDeclaration(opt));
	        }
	        return list;
	    };
	    Parser.prototype.parseVariableStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('var');
	        var declarations = this.parseVariableDeclarationList({ inFor: false });
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	    };
	    // https://tc39.github.io/ecma262/#sec-empty-statement
	    Parser.prototype.parseEmptyStatement = function () {
	        var node = this.createNode();
	        this.expect(';');
	        return this.finalize(node, new Node.EmptyStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-expression-statement
	    Parser.prototype.parseExpressionStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ExpressionStatement(expr));
	    };
	    // https://tc39.github.io/ecma262/#sec-if-statement
	    Parser.prototype.parseIfClause = function () {
	        if (this.context.strict && this.matchKeyword('function')) {
	            this.tolerateError(messages_1.Messages.StrictFunction);
	        }
	        return this.parseStatement();
	    };
	    Parser.prototype.parseIfStatement = function () {
	        var node = this.createNode();
	        var consequent;
	        var alternate = null;
	        this.expectKeyword('if');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            consequent = this.parseIfClause();
	            if (this.matchKeyword('else')) {
	                this.nextToken();
	                alternate = this.parseIfClause();
	            }
	        }
	        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	    };
	    // https://tc39.github.io/ecma262/#sec-do-while-statement
	    Parser.prototype.parseDoWhileStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('do');
	        var previousInIteration = this.context.inIteration;
	        this.context.inIteration = true;
	        var body = this.parseStatement();
	        this.context.inIteration = previousInIteration;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	        }
	        else {
	            this.expect(')');
	            if (this.match(';')) {
	                this.nextToken();
	            }
	        }
	        return this.finalize(node, new Node.DoWhileStatement(body, test));
	    };
	    // https://tc39.github.io/ecma262/#sec-while-statement
	    Parser.prototype.parseWhileStatement = function () {
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.parseStatement();
	            this.context.inIteration = previousInIteration;
	        }
	        return this.finalize(node, new Node.WhileStatement(test, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-for-statement
	    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
	    Parser.prototype.parseForStatement = function () {
	        var init = null;
	        var test = null;
	        var update = null;
	        var forIn = true;
	        var left, right;
	        var node = this.createNode();
	        this.expectKeyword('for');
	        this.expect('(');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else {
	            if (this.matchKeyword('var')) {
	                init = this.createNode();
	                this.nextToken();
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                var declarations = this.parseVariableDeclarationList({ inFor: true });
	                this.context.allowIn = previousAllowIn;
	                if (declarations.length === 1 && this.matchKeyword('in')) {
	                    var decl = declarations[0];
	                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
	                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
	                    }
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.expect(';');
	                }
	            }
	            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
	                init = this.createNode();
	                var kind = this.nextToken().value;
	                if (!this.context.strict && this.lookahead.value === 'in') {
	                    init = this.finalize(init, new Node.Identifier(kind));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else {
	                    var previousAllowIn = this.context.allowIn;
	                    this.context.allowIn = false;
	                    var declarations = this.parseBindingList(kind, { inFor: true });
	                    this.context.allowIn = previousAllowIn;
	                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseExpression();
	                        init = null;
	                    }
	                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    }
	                    else {
	                        this.consumeSemicolon();
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                    }
	                }
	            }
	            else {
	                var initStartToken = this.lookahead;
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                this.context.allowIn = previousAllowIn;
	                if (this.matchKeyword('in')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (this.matchContextualKeyword('of')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    if (this.match(',')) {
	                        var initSeq = [init];
	                        while (this.match(',')) {
	                            this.nextToken();
	                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
	                    }
	                    this.expect(';');
	                }
	            }
	        }
	        if (typeof left === 'undefined') {
	            if (!this.match(';')) {
	                test = this.parseExpression();
	            }
	            this.expect(';');
	            if (!this.match(')')) {
	                update = this.parseExpression();
	            }
	        }
	        var body;
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.isolateCoverGrammar(this.parseStatement);
	            this.context.inIteration = previousInIteration;
	        }
	        return (typeof left === 'undefined') ?
	            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
	            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
	                this.finalize(node, new Node.ForOfStatement(left, right, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-continue-statement
	    Parser.prototype.parseContinueStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('continue');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            label = id;
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration) {
	            this.throwError(messages_1.Messages.IllegalContinue);
	        }
	        return this.finalize(node, new Node.ContinueStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-break-statement
	    Parser.prototype.parseBreakStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('break');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	            label = id;
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
	            this.throwError(messages_1.Messages.IllegalBreak);
	        }
	        return this.finalize(node, new Node.BreakStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-return-statement
	    Parser.prototype.parseReturnStatement = function () {
	        if (!this.context.inFunctionBody) {
	            this.tolerateError(messages_1.Messages.IllegalReturn);
	        }
	        var node = this.createNode();
	        this.expectKeyword('return');
	        var hasArgument = (!this.match(';') && !this.match('}') &&
	            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
	            this.lookahead.type === 8 /* StringLiteral */ ||
	            this.lookahead.type === 10 /* Template */;
	        var argument = hasArgument ? this.parseExpression() : null;
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ReturnStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-with-statement
	    Parser.prototype.parseWithStatement = function () {
	        if (this.context.strict) {
	            this.tolerateError(messages_1.Messages.StrictModeWith);
	        }
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('with');
	        this.expect('(');
	        var object = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            body = this.parseStatement();
	        }
	        return this.finalize(node, new Node.WithStatement(object, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-switch-statement
	    Parser.prototype.parseSwitchCase = function () {
	        var node = this.createNode();
	        var test;
	        if (this.matchKeyword('default')) {
	            this.nextToken();
	            test = null;
	        }
	        else {
	            this.expectKeyword('case');
	            test = this.parseExpression();
	        }
	        this.expect(':');
	        var consequent = [];
	        while (true) {
	            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
	                break;
	            }
	            consequent.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.SwitchCase(test, consequent));
	    };
	    Parser.prototype.parseSwitchStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('switch');
	        this.expect('(');
	        var discriminant = this.parseExpression();
	        this.expect(')');
	        var previousInSwitch = this.context.inSwitch;
	        this.context.inSwitch = true;
	        var cases = [];
	        var defaultFound = false;
	        this.expect('{');
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            var clause = this.parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	        this.expect('}');
	        this.context.inSwitch = previousInSwitch;
	        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	    };
	    // https://tc39.github.io/ecma262/#sec-labelled-statements
	    Parser.prototype.parseLabelledStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var statement;
	        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
	            this.nextToken();
	            var id = expr;
	            var key = '$' + id.name;
	            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
	            }
	            this.context.labelSet[key] = true;
	            var body = void 0;
	            if (this.matchKeyword('class')) {
	                this.tolerateUnexpectedToken(this.lookahead);
	                body = this.parseClassDeclaration();
	            }
	            else if (this.matchKeyword('function')) {
	                var token = this.lookahead;
	                var declaration = this.parseFunctionDeclaration();
	                if (this.context.strict) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
	                }
	                else if (declaration.generator) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
	                }
	                body = declaration;
	            }
	            else {
	                body = this.parseStatement();
	            }
	            delete this.context.labelSet[key];
	            statement = new Node.LabeledStatement(id, body);
	        }
	        else {
	            this.consumeSemicolon();
	            statement = new Node.ExpressionStatement(expr);
	        }
	        return this.finalize(node, statement);
	    };
	    // https://tc39.github.io/ecma262/#sec-throw-statement
	    Parser.prototype.parseThrowStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('throw');
	        if (this.hasLineTerminator) {
	            this.throwError(messages_1.Messages.NewlineAfterThrow);
	        }
	        var argument = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ThrowStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-try-statement
	    Parser.prototype.parseCatchClause = function () {
	        var node = this.createNode();
	        this.expectKeyword('catch');
	        this.expect('(');
	        if (this.match(')')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        var params = [];
	        var param = this.parsePattern(params);
	        var paramMap = {};
	        for (var i = 0; i < params.length; i++) {
	            var key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(param.name)) {
	                this.tolerateError(messages_1.Messages.StrictCatchVariable);
	            }
	        }
	        this.expect(')');
	        var body = this.parseBlock();
	        return this.finalize(node, new Node.CatchClause(param, body));
	    };
	    Parser.prototype.parseFinallyClause = function () {
	        this.expectKeyword('finally');
	        return this.parseBlock();
	    };
	    Parser.prototype.parseTryStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('try');
	        var block = this.parseBlock();
	        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
	        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
	        if (!handler && !finalizer) {
	            this.throwError(messages_1.Messages.NoCatchOrFinally);
	        }
	        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	    };
	    // https://tc39.github.io/ecma262/#sec-debugger-statement
	    Parser.prototype.parseDebuggerStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('debugger');
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.DebuggerStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
	    Parser.prototype.parseStatement = function () {
	        var statement;
	        switch (this.lookahead.type) {
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	            case 10 /* Template */:
	            case 9 /* RegularExpression */:
	                statement = this.parseExpressionStatement();
	                break;
	            case 7 /* Punctuator */:
	                var value = this.lookahead.value;
	                if (value === '{') {
	                    statement = this.parseBlock();
	                }
	                else if (value === '(') {
	                    statement = this.parseExpressionStatement();
	                }
	                else if (value === ';') {
	                    statement = this.parseEmptyStatement();
	                }
	                else {
	                    statement = this.parseExpressionStatement();
	                }
	                break;
	            case 3 /* Identifier */:
	                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
	                break;
	            case 4 /* Keyword */:
	                switch (this.lookahead.value) {
	                    case 'break':
	                        statement = this.parseBreakStatement();
	                        break;
	                    case 'continue':
	                        statement = this.parseContinueStatement();
	                        break;
	                    case 'debugger':
	                        statement = this.parseDebuggerStatement();
	                        break;
	                    case 'do':
	                        statement = this.parseDoWhileStatement();
	                        break;
	                    case 'for':
	                        statement = this.parseForStatement();
	                        break;
	                    case 'function':
	                        statement = this.parseFunctionDeclaration();
	                        break;
	                    case 'if':
	                        statement = this.parseIfStatement();
	                        break;
	                    case 'return':
	                        statement = this.parseReturnStatement();
	                        break;
	                    case 'switch':
	                        statement = this.parseSwitchStatement();
	                        break;
	                    case 'throw':
	                        statement = this.parseThrowStatement();
	                        break;
	                    case 'try':
	                        statement = this.parseTryStatement();
	                        break;
	                    case 'var':
	                        statement = this.parseVariableStatement();
	                        break;
	                    case 'while':
	                        statement = this.parseWhileStatement();
	                        break;
	                    case 'with':
	                        statement = this.parseWithStatement();
	                        break;
	                    default:
	                        statement = this.parseExpressionStatement();
	                        break;
	                }
	                break;
	            default:
	                statement = this.throwUnexpectedToken(this.lookahead);
	        }
	        return statement;
	    };
	    // https://tc39.github.io/ecma262/#sec-function-definitions
	    Parser.prototype.parseFunctionSourceElements = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var body = this.parseDirectivePrologues();
	        var previousLabelSet = this.context.labelSet;
	        var previousInIteration = this.context.inIteration;
	        var previousInSwitch = this.context.inSwitch;
	        var previousInFunctionBody = this.context.inFunctionBody;
	        this.context.labelSet = {};
	        this.context.inIteration = false;
	        this.context.inSwitch = false;
	        this.context.inFunctionBody = true;
	        while (this.lookahead.type !== 2 /* EOF */) {
	            if (this.match('}')) {
	                break;
	            }
	            body.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        this.context.labelSet = previousLabelSet;
	        this.context.inIteration = previousInIteration;
	        this.context.inSwitch = previousInSwitch;
	        this.context.inFunctionBody = previousInFunctionBody;
	        return this.finalize(node, new Node.BlockStatement(body));
	    };
	    Parser.prototype.validateParam = function (options, param, name) {
	        var key = '$' + name;
	        if (this.context.strict) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        else if (!options.firstRestricted) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            else if (this.scanner.isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictReservedWord;
	            }
	            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        /* istanbul ignore next */
	        if (typeof Object.defineProperty === 'function') {
	            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
	        }
	        else {
	            options.paramSet[key] = true;
	        }
	    };
	    Parser.prototype.parseRestElement = function (params) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params);
	        if (this.match('=')) {
	            this.throwError(messages_1.Messages.DefaultRestParameter);
	        }
	        if (!this.match(')')) {
	            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
	        }
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseFormalParameter = function (options) {
	        var params = [];
	        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
	        for (var i = 0; i < params.length; i++) {
	            this.validateParam(options, params[i], params[i].value);
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	        options.params.push(param);
	    };
	    Parser.prototype.parseFormalParameters = function (firstRestricted) {
	        var options;
	        options = {
	            simple: true,
	            params: [],
	            firstRestricted: firstRestricted
	        };
	        this.expect('(');
	        if (!this.match(')')) {
	            options.paramSet = {};
	            while (this.lookahead.type !== 2 /* EOF */) {
	                this.parseFormalParameter(options);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expect(',');
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return {
	            simple: options.simple,
	            params: options.params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.matchAsyncFunction = function () {
	        var match = this.matchContextualKeyword('async');
	        if (match) {
	            var state = this.scanner.saveState();
	            this.scanner.scanComments();
	            var next = this.scanner.lex();
	            this.scanner.restoreState(state);
	            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
	        }
	        return match;
	    };
	    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted = null;
	        if (!identifierIsOptional || !this.match('(')) {
	            var token = this.lookahead;
	            id = this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
	            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	    };
	    Parser.prototype.parseFunctionExpression = function () {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted;
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        if (!this.match('(')) {
	            var token = this.lookahead;
	            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
	            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
	    Parser.prototype.parseDirective = function () {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
	        this.consumeSemicolon();
	        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
	    };
	    Parser.prototype.parseDirectivePrologues = function () {
	        var firstRestricted = null;
	        var body = [];
	        while (true) {
	            var token = this.lookahead;
	            if (token.type !== 8 /* StringLiteral */) {
	                break;
	            }
	            var statement = this.parseDirective();
	            body.push(statement);
	            var directive = statement.directive;
	            if (typeof directive !== 'string') {
	                break;
	            }
	            if (directive === 'use strict') {
	                this.context.strict = true;
	                if (firstRestricted) {
	                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
	                }
	                if (!this.context.allowStrictDirective) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
	                }
	            }
	            else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	        return body;
	    };
	    // https://tc39.github.io/ecma262/#sec-method-definitions
	    Parser.prototype.qualifiedPropertyName = function (token) {
	        switch (token.type) {
	            case 3 /* Identifier */:
	            case 8 /* StringLiteral */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 4 /* Keyword */:
	                return true;
	            case 7 /* Punctuator */:
	                return token.value === '[';
	            default:
	                break;
	        }
	        return false;
	    };
	    Parser.prototype.parseGetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length > 0) {
	            this.tolerateError(messages_1.Messages.BadGetterArity);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseSetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length !== 1) {
	            this.tolerateError(messages_1.Messages.BadSetterArity);
	        }
	        else if (formalParameters.params[0] instanceof Node.RestElement) {
	            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseGeneratorMethod = function () {
	        var node = this.createNode();
	        var isGenerator = true;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
	    Parser.prototype.isStartOfExpression = function () {
	        var start = true;
	        var value = this.lookahead.value;
	        switch (this.lookahead.type) {
	            case 7 /* Punctuator */:
	                start = (value === '[') || (value === '(') || (value === '{') ||
	                    (value === '+') || (value === '-') ||
	                    (value === '!') || (value === '~') ||
	                    (value === '++') || (value === '--') ||
	                    (value === '/') || (value === '/='); // regular expression literal
	                break;
	            case 4 /* Keyword */:
	                start = (value === 'class') || (value === 'delete') ||
	                    (value === 'function') || (value === 'let') || (value === 'new') ||
	                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
	                    (value === 'void') || (value === 'yield');
	                break;
	            default:
	                break;
	        }
	        return start;
	    };
	    Parser.prototype.parseYieldExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('yield');
	        var argument = null;
	        var delegate = false;
	        if (!this.hasLineTerminator) {
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = false;
	            delegate = this.match('*');
	            if (delegate) {
	                this.nextToken();
	                argument = this.parseAssignmentExpression();
	            }
	            else if (this.isStartOfExpression()) {
	                argument = this.parseAssignmentExpression();
	            }
	            this.context.allowYield = previousAllowYield;
	        }
	        return this.finalize(node, new Node.YieldExpression(argument, delegate));
	    };
	    // https://tc39.github.io/ecma262/#sec-class-definitions
	    Parser.prototype.parseClassElement = function (hasConstructor) {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var kind = '';
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var isStatic = false;
	        var isAsync = false;
	        if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            var id = key;
	            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
	                token = this.lookahead;
	                isStatic = true;
	                computed = this.match('[');
	                if (this.match('*')) {
	                    this.nextToken();
	                }
	                else {
	                    key = this.parseObjectPropertyKey();
	                }
	            }
	            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
	                var punctuator = this.lookahead.value;
	                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
	                    isAsync = true;
	                    token = this.lookahead;
	                    key = this.parseObjectPropertyKey();
	                    if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
	                        this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
	                    }
	                }
	            }
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */) {
	            if (token.value === 'get' && lookaheadPropertyKey) {
	                kind = 'get';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                this.context.allowYield = false;
	                value = this.parseGetterMethod();
	            }
	            else if (token.value === 'set' && lookaheadPropertyKey) {
	                kind = 'set';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                value = this.parseSetterMethod();
	            }
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        if (!kind && key && this.match('(')) {
	            kind = 'init';
	            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	            method = true;
	        }
	        if (!kind) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        if (kind === 'init') {
	            kind = 'method';
	        }
	        if (!computed) {
	            if (isStatic && this.isPropertyKey(key, 'prototype')) {
	                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
	            }
	            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
	                if (kind !== 'method' || !method || (value && value.generator)) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
	                }
	                if (hasConstructor.value) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
	                }
	                else {
	                    hasConstructor.value = true;
	                }
	                kind = 'constructor';
	            }
	        }
	        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	    };
	    Parser.prototype.parseClassElementList = function () {
	        var body = [];
	        var hasConstructor = { value: false };
	        this.expect('{');
	        while (!this.match('}')) {
	            if (this.match(';')) {
	                this.nextToken();
	            }
	            else {
	                body.push(this.parseClassElement(hasConstructor));
	            }
	        }
	        this.expect('}');
	        return body;
	    };
	    Parser.prototype.parseClassBody = function () {
	        var node = this.createNode();
	        var elementList = this.parseClassElementList();
	        return this.finalize(node, new Node.ClassBody(elementList));
	    };
	    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	    };
	    Parser.prototype.parseClassExpression = function () {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	    };
	    // https://tc39.github.io/ecma262/#sec-scripts
	    // https://tc39.github.io/ecma262/#sec-modules
	    Parser.prototype.parseModule = function () {
	        this.context.strict = true;
	        this.context.isModule = true;
	        this.scanner.isModule = true;
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Module(body));
	    };
	    Parser.prototype.parseScript = function () {
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Script(body));
	    };
	    // https://tc39.github.io/ecma262/#sec-imports
	    Parser.prototype.parseModuleSpecifier = function () {
	        var node = this.createNode();
	        if (this.lookahead.type !== 8 /* StringLiteral */) {
	            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
	        }
	        var token = this.nextToken();
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    // import {<foo as bar>} ...;
	    Parser.prototype.parseImportSpecifier = function () {
	        var node = this.createNode();
	        var imported;
	        var local;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            imported = this.parseVariableIdentifier();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	        }
	        else {
	            imported = this.parseIdentifierName();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.ImportSpecifier(local, imported));
	    };
	    // {foo, bar as bas}
	    Parser.prototype.parseNamedImports = function () {
	        this.expect('{');
	        var specifiers = [];
	        while (!this.match('}')) {
	            specifiers.push(this.parseImportSpecifier());
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return specifiers;
	    };
	    // import <foo> ...;
	    Parser.prototype.parseImportDefaultSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	    };
	    // import <* as foo> ...;
	    Parser.prototype.parseImportNamespaceSpecifier = function () {
	        var node = this.createNode();
	        this.expect('*');
	        if (!this.matchContextualKeyword('as')) {
	            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
	        }
	        this.nextToken();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	    };
	    Parser.prototype.parseImportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalImportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('import');
	        var src;
	        var specifiers = [];
	        if (this.lookahead.type === 8 /* StringLiteral */) {
	            // import 'foo';
	            src = this.parseModuleSpecifier();
	        }
	        else {
	            if (this.match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(this.parseNamedImports());
	            }
	            else if (this.match('*')) {
	                // import * as foo
	                specifiers.push(this.parseImportNamespaceSpecifier());
	            }
	            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
	                // import foo
	                specifiers.push(this.parseImportDefaultSpecifier());
	                if (this.match(',')) {
	                    this.nextToken();
	                    if (this.match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(this.parseImportNamespaceSpecifier());
	                    }
	                    else if (this.match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(this.parseNamedImports());
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            src = this.parseModuleSpecifier();
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	    };
	    // https://tc39.github.io/ecma262/#sec-exports
	    Parser.prototype.parseExportSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        var exported = local;
	        if (this.matchContextualKeyword('as')) {
	            this.nextToken();
	            exported = this.parseIdentifierName();
	        }
	        return this.finalize(node, new Node.ExportSpecifier(local, exported));
	    };
	    Parser.prototype.parseExportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalExportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('export');
	        var exportDeclaration;
	        if (this.matchKeyword('default')) {
	            // export default ...
	            this.nextToken();
	            if (this.matchKeyword('function')) {
	                // export default function foo () {}
	                // export default function () {}
	                var declaration = this.parseFunctionDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchKeyword('class')) {
	                // export default class foo {}
	                var declaration = this.parseClassDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchContextualKeyword('async')) {
	                // export default async function f () {}
	                // export default async function () {}
	                // export default async x => x
	                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else {
	                if (this.matchContextualKeyword('from')) {
	                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
	                }
	                // export default {};
	                // export default [];
	                // export default (1 + 2);
	                var declaration = this.match('{') ? this.parseObjectInitializer() :
	                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
	                this.consumeSemicolon();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	        }
	        else if (this.match('*')) {
	            // export * from 'foo';
	            this.nextToken();
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            var src = this.parseModuleSpecifier();
	            this.consumeSemicolon();
	            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
	        }
	        else if (this.lookahead.type === 4 /* Keyword */) {
	            // export var f = 1;
	            var declaration = void 0;
	            switch (this.lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = this.parseStatementListItem();
	                    break;
	                default:
	                    this.throwUnexpectedToken(this.lookahead);
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else if (this.matchAsyncFunction()) {
	            var declaration = this.parseFunctionDeclaration();
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else {
	            var specifiers = [];
	            var source = null;
	            var isExportFromIdentifier = false;
	            this.expect('{');
	            while (!this.match('}')) {
	                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
	                specifiers.push(this.parseExportSpecifier());
	                if (!this.match('}')) {
	                    this.expect(',');
	                }
	            }
	            this.expect('}');
	            if (this.matchContextualKeyword('from')) {
	                // export {default} from 'foo';
	                // export {foo} from 'foo';
	                this.nextToken();
	                source = this.parseModuleSpecifier();
	                this.consumeSemicolon();
	            }
	            else if (isExportFromIdentifier) {
	                // export {default}; // missing fromClause
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            else {
	                // export {foo};
	                this.consumeSemicolon();
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
	        }
	        return exportDeclaration;
	    };
	    return Parser;
	}());
	exports.Parser = Parser;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.
	Object.defineProperty(exports, "__esModule", { value: true });
	function assert(condition, message) {
	    /* istanbul ignore if */
	    if (!condition) {
	        throw new Error('ASSERT: ' + message);
	    }
	}
	exports.assert = assert;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable:max-classes-per-file */
	Object.defineProperty(exports, "__esModule", { value: true });
	var ErrorHandler = (function () {
	    function ErrorHandler() {
	        this.errors = [];
	        this.tolerant = false;
	    }
	    ErrorHandler.prototype.recordError = function (error) {
	        this.errors.push(error);
	    };
	    ErrorHandler.prototype.tolerate = function (error) {
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ErrorHandler.prototype.constructError = function (msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        }
	        catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        }
	        /* istanbul ignore next */
	        return error;
	    };
	    ErrorHandler.prototype.createError = function (index, line, col, description) {
	        var msg = 'Line ' + line + ': ' + description;
	        var error = this.constructError(msg, col);
	        error.index = index;
	        error.lineNumber = line;
	        error.description = description;
	        return error;
	    };
	    ErrorHandler.prototype.throwError = function (index, line, col, description) {
	        throw this.createError(index, line, col, description);
	    };
	    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
	        var error = this.createError(index, line, col, description);
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    return ErrorHandler;
	}());
	exports.ErrorHandler = ErrorHandler;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Error messages should be identical to V8.
	exports.Messages = {
	    BadGetterArity: 'Getter must not have any formal parameters',
	    BadSetterArity: 'Setter must have exactly one formal parameter',
	    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
	    ConstructorIsAsync: 'Class constructor may not be an async method',
	    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
	    DefaultRestParameter: 'Unexpected token =',
	    DuplicateBinding: 'Duplicate binding %0',
	    DuplicateConstructor: 'A class may only have one constructor',
	    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
	    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
	    IllegalBreak: 'Illegal break statement',
	    IllegalContinue: 'Illegal continue statement',
	    IllegalExportDeclaration: 'Unexpected token',
	    IllegalImportDeclaration: 'Unexpected token',
	    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
	    IllegalReturn: 'Illegal return statement',
	    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
	    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
	    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	    InvalidModuleSpecifier: 'Unexpected token',
	    InvalidRegExp: 'Invalid regular expression',
	    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
	    MissingFromClause: 'Unexpected token',
	    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	    NewlineAfterThrow: 'Illegal newline after throw',
	    NoAsAfterImportNamespace: 'Unexpected token',
	    NoCatchOrFinally: 'Missing catch or finally after try',
	    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	    Redeclaration: '%0 \'%1\' has already been declared',
	    StaticPrototype: 'Classes may not have static property named prototype',
	    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
	    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictModeWith: 'Strict mode code may not include a with statement',
	    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	    StrictReservedWord: 'Use of future reserved word in strict mode',
	    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	    UnexpectedEOS: 'Unexpected end of input',
	    UnexpectedIdentifier: 'Unexpected identifier',
	    UnexpectedNumber: 'Unexpected number',
	    UnexpectedReserved: 'Unexpected reserved word',
	    UnexpectedString: 'Unexpected string',
	    UnexpectedTemplate: 'Unexpected quasi %0',
	    UnexpectedToken: 'Unexpected token %0',
	    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
	    UnknownLabel: 'Undefined label \'%0\'',
	    UnterminatedRegExp: 'Invalid regular expression: missing /'
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var character_1 = __webpack_require__(4);
	var messages_1 = __webpack_require__(11);
	function hexValue(ch) {
	    return '0123456789abcdef'.indexOf(ch.toLowerCase());
	}
	function octalValue(ch) {
	    return '01234567'.indexOf(ch);
	}
	var Scanner = (function () {
	    function Scanner(code, handler) {
	        this.source = code;
	        this.errorHandler = handler;
	        this.trackComment = false;
	        this.isModule = false;
	        this.length = code.length;
	        this.index = 0;
	        this.lineNumber = (code.length > 0) ? 1 : 0;
	        this.lineStart = 0;
	        this.curlyStack = [];
	    }
	    Scanner.prototype.saveState = function () {
	        return {
	            index: this.index,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart
	        };
	    };
	    Scanner.prototype.restoreState = function (state) {
	        this.index = state.index;
	        this.lineNumber = state.lineNumber;
	        this.lineStart = state.lineStart;
	    };
	    Scanner.prototype.eof = function () {
	        return this.index >= this.length;
	    };
	    Scanner.prototype.throwUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    Scanner.prototype.tolerateUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    // https://tc39.github.io/ecma262/#sec-comments
	    Scanner.prototype.skipSingleLineComment = function (offset) {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - offset;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - offset
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            ++this.index;
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (this.trackComment) {
	                    loc.end = {
	                        line: this.lineNumber,
	                        column: this.index - this.lineStart - 1
	                    };
	                    var entry = {
	                        multiLine: false,
	                        slice: [start + offset, this.index - 1],
	                        range: [start, this.index - 1],
	                        loc: loc
	                    };
	                    comments.push(entry);
	                }
	                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                return comments;
	            }
	        }
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: false,
	                slice: [start + offset, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        return comments;
	    };
	    Scanner.prototype.skipMultiLineComment = function () {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - 2;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - 2
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                ++this.index;
	                this.lineStart = this.index;
	            }
	            else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
	                    this.index += 2;
	                    if (this.trackComment) {
	                        loc.end = {
	                            line: this.lineNumber,
	                            column: this.index - this.lineStart
	                        };
	                        var entry = {
	                            multiLine: true,
	                            slice: [start + 2, this.index - 2],
	                            range: [start, this.index],
	                            loc: loc
	                        };
	                        comments.push(entry);
	                    }
	                    return comments;
	                }
	                ++this.index;
	            }
	            else {
	                ++this.index;
	            }
	        }
	        // Ran off the end of the file - the whole thing is a comment
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: true,
	                slice: [start + 2, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        this.tolerateUnexpectedToken();
	        return comments;
	    };
	    Scanner.prototype.scanComments = function () {
	        var comments;
	        if (this.trackComment) {
	            comments = [];
	        }
	        var start = (this.index === 0);
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isWhiteSpace(ch)) {
	                ++this.index;
	            }
	            else if (character_1.Character.isLineTerminator(ch)) {
	                ++this.index;
	                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                start = true;
	            }
	            else if (ch === 0x2F) {
	                ch = this.source.charCodeAt(this.index + 1);
	                if (ch === 0x2F) {
	                    this.index += 2;
	                    var comment = this.skipSingleLineComment(2);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                    start = true;
	                }
	                else if (ch === 0x2A) {
	                    this.index += 2;
	                    var comment = this.skipMultiLineComment();
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (start && ch === 0x2D) {
	                // U+003E is '>'
	                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    this.index += 3;
	                    var comment = this.skipSingleLineComment(3);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (ch === 0x3C && !this.isModule) {
	                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
	                    this.index += 4; // `<!--`
	                    var comment = this.skipSingleLineComment(4);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        return comments;
	    };
	    // https://tc39.github.io/ecma262/#sec-future-reserved-words
	    Scanner.prototype.isFutureReservedWord = function (id) {
	        switch (id) {
	            case 'enum':
	            case 'export':
	            case 'import':
	            case 'super':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isStrictModeReservedWord = function (id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'yield':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isRestrictedWord = function (id) {
	        return id === 'eval' || id === 'arguments';
	    };
	    // https://tc39.github.io/ecma262/#sec-keywords
	    Scanner.prototype.isKeyword = function (id) {
	        switch (id.length) {
	            case 2:
	                return (id === 'if') || (id === 'in') || (id === 'do');
	            case 3:
	                return (id === 'var') || (id === 'for') || (id === 'new') ||
	                    (id === 'try') || (id === 'let');
	            case 4:
	                return (id === 'this') || (id === 'else') || (id === 'case') ||
	                    (id === 'void') || (id === 'with') || (id === 'enum');
	            case 5:
	                return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                    (id === 'class') || (id === 'super');
	            case 6:
	                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                    (id === 'switch') || (id === 'export') || (id === 'import');
	            case 7:
	                return (id === 'default') || (id === 'finally') || (id === 'extends');
	            case 8:
	                return (id === 'function') || (id === 'continue') || (id === 'debugger');
	            case 10:
	                return (id === 'instanceof');
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.codePointAt = function (i) {
	        var cp = this.source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            var second = this.source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                var first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	        return cp;
	    };
	    Scanner.prototype.scanHexEscape = function (prefix) {
	        var len = (prefix === 'u') ? 4 : 2;
	        var code = 0;
	        for (var i = 0; i < len; ++i) {
	            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                code = code * 16 + hexValue(this.source[this.index++]);
	            }
	            else {
	                return null;
	            }
	        }
	        return String.fromCharCode(code);
	    };
	    Scanner.prototype.scanUnicodeCodePointEscape = function () {
	        var ch = this.source[this.index];
	        var code = 0;
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            this.throwUnexpectedToken();
	        }
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
	                break;
	            }
	            code = code * 16 + hexValue(ch);
	        }
	        if (code > 0x10FFFF || ch !== '}') {
	            this.throwUnexpectedToken();
	        }
	        return character_1.Character.fromCodePoint(code);
	    };
	    Scanner.prototype.getIdentifier = function () {
	        var start = this.index++;
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            if (character_1.Character.isIdentifierPart(ch)) {
	                ++this.index;
	            }
	            else {
	                break;
	            }
	        }
	        return this.source.slice(start, this.index);
	    };
	    Scanner.prototype.getComplexIdentifier = function () {
	        var cp = this.codePointAt(this.index);
	        var id = character_1.Character.fromCodePoint(cp);
	        this.index += id.length;
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        var ch;
	        if (cp === 0x5C) {
	            if (this.source.charCodeAt(this.index) !== 0x75) {
	                this.throwUnexpectedToken();
	            }
	            ++this.index;
	            if (this.source[this.index] === '{') {
	                ++this.index;
	                ch = this.scanUnicodeCodePointEscape();
	            }
	            else {
	                ch = this.scanHexEscape('u');
	                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	        while (!this.eof()) {
	            cp = this.codePointAt(this.index);
	            if (!character_1.Character.isIdentifierPart(cp)) {
	                break;
	            }
	            ch = character_1.Character.fromCodePoint(cp);
	            id += ch;
	            this.index += ch.length;
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (this.source.charCodeAt(this.index) !== 0x75) {
	                    this.throwUnexpectedToken();
	                }
	                ++this.index;
	                if (this.source[this.index] === '{') {
	                    ++this.index;
	                    ch = this.scanUnicodeCodePointEscape();
	                }
	                else {
	                    ch = this.scanHexEscape('u');
	                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                        this.throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	        return id;
	    };
	    Scanner.prototype.octalToDecimal = function (ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0');
	        var code = octalValue(ch);
	        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	            octal = true;
	            code = code * 8 + octalValue(this.source[this.index++]);
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                code = code * 8 + octalValue(this.source[this.index++]);
	            }
	        }
	        return {
	            code: code,
	            octal: octal
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    Scanner.prototype.scanIdentifier = function () {
	        var type;
	        var start = this.index;
	        // Backslash (U+005C) starts an escaped character.
	        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = 3 /* Identifier */;
	        }
	        else if (this.isKeyword(id)) {
	            type = 4 /* Keyword */;
	        }
	        else if (id === 'null') {
	            type = 5 /* NullLiteral */;
	        }
	        else if (id === 'true' || id === 'false') {
	            type = 1 /* BooleanLiteral */;
	        }
	        else {
	            type = 3 /* Identifier */;
	        }
	        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
	            var restore = this.index;
	            this.index = start;
	            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
	            this.index = restore;
	        }
	        return {
	            type: type,
	            value: id,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-punctuators
	    Scanner.prototype.scanPunctuator = function () {
	        var start = this.index;
	        // Check for most common single-character punctuators.
	        var str = this.source[this.index];
	        switch (str) {
	            case '(':
	            case '{':
	                if (str === '{') {
	                    this.curlyStack.push('{');
	                }
	                ++this.index;
	                break;
	            case '.':
	                ++this.index;
	                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
	                    // Spread operator: ...
	                    this.index += 2;
	                    str = '...';
	                }
	                break;
	            case '}':
	                ++this.index;
	                this.curlyStack.pop();
	                break;
	            case ')':
	            case ';':
	            case ',':
	            case '[':
	            case ']':
	            case ':':
	            case '?':
	            case '~':
	                ++this.index;
	                break;
	            default:
	                // 4-character punctuator.
	                str = this.source.substr(this.index, 4);
	                if (str === '>>>=') {
	                    this.index += 4;
	                }
	                else {
	                    // 3-character punctuators.
	                    str = str.substr(0, 3);
	                    if (str === '===' || str === '!==' || str === '>>>' ||
	                        str === '<<=' || str === '>>=' || str === '**=') {
	                        this.index += 3;
	                    }
	                    else {
	                        // 2-character punctuators.
	                        str = str.substr(0, 2);
	                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
	                            this.index += 2;
	                        }
	                        else {
	                            // 1-character punctuators.
	                            str = this.source[this.index];
	                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                                ++this.index;
	                            }
	                        }
	                    }
	                }
	        }
	        if (this.index === start) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 7 /* Punctuator */,
	            value: str,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    Scanner.prototype.scanHexLiteral = function (start) {
	        var num = '';
	        while (!this.eof()) {
	            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt('0x' + num, 16),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanBinaryLiteral = function (start) {
	        var num = '';
	        var ch;
	        while (!this.eof()) {
	            ch = this.source[this.index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            // only 0b or 0B
	            this.throwUnexpectedToken();
	        }
	        if (!this.eof()) {
	            ch = this.source.charCodeAt(this.index);
	            /* istanbul ignore else */
	            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
	                this.throwUnexpectedToken();
	            }
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 2),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
	        var num = '';
	        var octal = false;
	        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
	            octal = true;
	            num = '0' + this.source[this.index++];
	        }
	        else {
	            ++this.index;
	        }
	        while (!this.eof()) {
	            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (!octal && num.length === 0) {
	            // only 0o or 0O
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 8),
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.isImplicitOctalLiteral = function () {
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (var i = this.index + 1; i < this.length; ++i) {
	            var ch = this.source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                return true;
	            }
	        }
	        return true;
	    };
	    Scanner.prototype.scanNumericLiteral = function () {
	        var start = this.index;
	        var ch = this.source[start];
	        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
	        var num = '';
	        if (ch !== '.') {
	            num = this.source[this.index++];
	            ch = this.source[this.index];
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (num === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++this.index;
	                    return this.scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++this.index;
	                    return this.scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return this.scanOctalLiteral(ch, start);
	                }
	                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                    if (this.isImplicitOctalLiteral()) {
	                        return this.scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === '.') {
	            num += this.source[this.index++];
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === 'e' || ch === 'E') {
	            num += this.source[this.index++];
	            ch = this.source[this.index];
	            if (ch === '+' || ch === '-') {
	                num += this.source[this.index++];
	            }
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                    num += this.source[this.index++];
	                }
	            }
	            else {
	                this.throwUnexpectedToken();
	            }
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseFloat(num),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-string-literals
	    Scanner.prototype.scanStringLiteral = function () {
	        var start = this.index;
	        var quote = this.source[start];
	        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
	        ++this.index;
	        var octal = false;
	        var str = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === quote) {
	                quote = '';
	                break;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                str += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var unescaped_1 = this.scanHexEscape(ch);
	                                if (unescaped_1 === null) {
	                                    this.throwUnexpectedToken();
	                                }
	                                str += unescaped_1;
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            str += unescaped;
	                            break;
	                        case 'n':
	                            str += '\n';
	                            break;
	                        case 'r':
	                            str += '\r';
	                            break;
	                        case 't':
	                            str += '\t';
	                            break;
	                        case 'b':
	                            str += '\b';
	                            break;
	                        case 'f':
	                            str += '\f';
	                            break;
	                        case 'v':
	                            str += '\x0B';
	                            break;
	                        case '8':
	                        case '9':
	                            str += ch;
	                            this.tolerateUnexpectedToken();
	                            break;
	                        default:
	                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                var octToDec = this.octalToDecimal(ch);
	                                octal = octToDec.octal || octal;
	                                str += String.fromCharCode(octToDec.code);
	                            }
	                            else {
	                                str += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            }
	            else {
	                str += ch;
	            }
	        }
	        if (quote !== '') {
	            this.index = start;
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 8 /* StringLiteral */,
	            value: str,
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
	    Scanner.prototype.scanTemplate = function () {
	        var cooked = '';
	        var terminated = false;
	        var start = this.index;
	        var head = (this.source[start] === '`');
	        var tail = false;
	        var rawOffset = 2;
	        ++this.index;
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            }
	            else if (ch === '$') {
	                if (this.source[this.index] === '{') {
	                    this.curlyStack.push('${');
	                    ++this.index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'n':
	                            cooked += '\n';
	                            break;
	                        case 'r':
	                            cooked += '\r';
	                            break;
	                        case 't':
	                            cooked += '\t';
	                            break;
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                cooked += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var restore = this.index;
	                                var unescaped_2 = this.scanHexEscape(ch);
	                                if (unescaped_2 !== null) {
	                                    cooked += unescaped_2;
	                                }
	                                else {
	                                    this.index = restore;
	                                    cooked += ch;
	                                }
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            cooked += unescaped;
	                            break;
	                        case 'b':
	                            cooked += '\b';
	                            break;
	                        case 'f':
	                            cooked += '\f';
	                            break;
	                        case 'v':
	                            cooked += '\v';
	                            break;
	                        default:
	                            if (ch === '0') {
	                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                                    // Illegal: \01 \02 and so on
	                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                                }
	                                cooked += '\0';
	                            }
	                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                // Illegal: \1 \2
	                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                            }
	                            else {
	                                cooked += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.lineNumber;
	                if (ch === '\r' && this.source[this.index] === '\n') {
	                    ++this.index;
	                }
	                this.lineStart = this.index;
	                cooked += '\n';
	            }
	            else {
	                cooked += ch;
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken();
	        }
	        if (!head) {
	            this.curlyStack.pop();
	        }
	        return {
	            type: 10 /* Template */,
	            value: this.source.slice(start + 1, this.index - rawOffset),
	            cooked: cooked,
	            head: head,
	            tail: tail,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	    Scanner.prototype.testRegExp = function (pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF';
	        var tmp = pattern;
	        var self = this;
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                var codePoint = parseInt($1 || $2, 16);
	                if (codePoint > 0x10FFFF) {
	                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	                }
	                if (codePoint <= 0xFFFF) {
	                    return String.fromCharCode(codePoint);
	                }
	                return astralSubstitute;
	            })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
	        }
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        }
	        catch (e) {
	            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	        }
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        }
	        catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    };
	    Scanner.prototype.scanRegExpBody = function () {
	        var ch = this.source[this.index];
	        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
	        var str = this.source[this.index++];
	        var classMarker = false;
	        var terminated = false;
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = this.source[this.index++];
	                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	            }
	            else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            }
	            else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                }
	                else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	        }
	        // Exclude leading and trailing slash.
	        return str.substr(1, str.length - 2);
	    };
	    Scanner.prototype.scanRegExpFlags = function () {
	        var str = '';
	        var flags = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index];
	            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	            ++this.index;
	            if (ch === '\\' && !this.eof()) {
	                ch = this.source[this.index];
	                if (ch === 'u') {
	                    ++this.index;
	                    var restore = this.index;
	                    var char = this.scanHexEscape('u');
	                    if (char !== null) {
	                        flags += char;
	                        for (str += '\\u'; restore < this.index; ++restore) {
	                            str += this.source[restore];
	                        }
	                    }
	                    else {
	                        this.index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    this.tolerateUnexpectedToken();
	                }
	                else {
	                    str += '\\';
	                    this.tolerateUnexpectedToken();
	                }
	            }
	            else {
	                flags += ch;
	                str += ch;
	            }
	        }
	        return flags;
	    };
	    Scanner.prototype.scanRegExp = function () {
	        var start = this.index;
	        var pattern = this.scanRegExpBody();
	        var flags = this.scanRegExpFlags();
	        var value = this.testRegExp(pattern, flags);
	        return {
	            type: 9 /* RegularExpression */,
	            value: '',
	            pattern: pattern,
	            flags: flags,
	            regex: value,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.lex = function () {
	        if (this.eof()) {
	            return {
	                type: 2 /* EOF */,
	                value: '',
	                lineNumber: this.lineNumber,
	                lineStart: this.lineStart,
	                start: this.index,
	                end: this.index
	            };
	        }
	        var cp = this.source.charCodeAt(this.index);
	        if (character_1.Character.isIdentifierStart(cp)) {
	            return this.scanIdentifier();
	        }
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return this.scanPunctuator();
	        }
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return this.scanStringLiteral();
	        }
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
	                return this.scanNumericLiteral();
	            }
	            return this.scanPunctuator();
	        }
	        if (character_1.Character.isDecimalDigit(cp)) {
	            return this.scanNumericLiteral();
	        }
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
	            return this.scanTemplate();
	        }
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
	                return this.scanIdentifier();
	            }
	        }
	        return this.scanPunctuator();
	    };
	    return Scanner;
	}());
	exports.Scanner = Scanner;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TokenName = {};
	exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
	exports.TokenName[2 /* EOF */] = '<end>';
	exports.TokenName[3 /* Identifier */] = 'Identifier';
	exports.TokenName[4 /* Keyword */] = 'Keyword';
	exports.TokenName[5 /* NullLiteral */] = 'Null';
	exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
	exports.TokenName[7 /* Punctuator */] = 'Punctuator';
	exports.TokenName[8 /* StringLiteral */] = 'String';
	exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
	exports.TokenName[10 /* Template */] = 'Template';


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.XHTMLEntities = {
	    quot: '\u0022',
	    amp: '\u0026',
	    apos: '\u0027',
	    gt: '\u003E',
	    nbsp: '\u00A0',
	    iexcl: '\u00A1',
	    cent: '\u00A2',
	    pound: '\u00A3',
	    curren: '\u00A4',
	    yen: '\u00A5',
	    brvbar: '\u00A6',
	    sect: '\u00A7',
	    uml: '\u00A8',
	    copy: '\u00A9',
	    ordf: '\u00AA',
	    laquo: '\u00AB',
	    not: '\u00AC',
	    shy: '\u00AD',
	    reg: '\u00AE',
	    macr: '\u00AF',
	    deg: '\u00B0',
	    plusmn: '\u00B1',
	    sup2: '\u00B2',
	    sup3: '\u00B3',
	    acute: '\u00B4',
	    micro: '\u00B5',
	    para: '\u00B6',
	    middot: '\u00B7',
	    cedil: '\u00B8',
	    sup1: '\u00B9',
	    ordm: '\u00BA',
	    raquo: '\u00BB',
	    frac14: '\u00BC',
	    frac12: '\u00BD',
	    frac34: '\u00BE',
	    iquest: '\u00BF',
	    Agrave: '\u00C0',
	    Aacute: '\u00C1',
	    Acirc: '\u00C2',
	    Atilde: '\u00C3',
	    Auml: '\u00C4',
	    Aring: '\u00C5',
	    AElig: '\u00C6',
	    Ccedil: '\u00C7',
	    Egrave: '\u00C8',
	    Eacute: '\u00C9',
	    Ecirc: '\u00CA',
	    Euml: '\u00CB',
	    Igrave: '\u00CC',
	    Iacute: '\u00CD',
	    Icirc: '\u00CE',
	    Iuml: '\u00CF',
	    ETH: '\u00D0',
	    Ntilde: '\u00D1',
	    Ograve: '\u00D2',
	    Oacute: '\u00D3',
	    Ocirc: '\u00D4',
	    Otilde: '\u00D5',
	    Ouml: '\u00D6',
	    times: '\u00D7',
	    Oslash: '\u00D8',
	    Ugrave: '\u00D9',
	    Uacute: '\u00DA',
	    Ucirc: '\u00DB',
	    Uuml: '\u00DC',
	    Yacute: '\u00DD',
	    THORN: '\u00DE',
	    szlig: '\u00DF',
	    agrave: '\u00E0',
	    aacute: '\u00E1',
	    acirc: '\u00E2',
	    atilde: '\u00E3',
	    auml: '\u00E4',
	    aring: '\u00E5',
	    aelig: '\u00E6',
	    ccedil: '\u00E7',
	    egrave: '\u00E8',
	    eacute: '\u00E9',
	    ecirc: '\u00EA',
	    euml: '\u00EB',
	    igrave: '\u00EC',
	    iacute: '\u00ED',
	    icirc: '\u00EE',
	    iuml: '\u00EF',
	    eth: '\u00F0',
	    ntilde: '\u00F1',
	    ograve: '\u00F2',
	    oacute: '\u00F3',
	    ocirc: '\u00F4',
	    otilde: '\u00F5',
	    ouml: '\u00F6',
	    divide: '\u00F7',
	    oslash: '\u00F8',
	    ugrave: '\u00F9',
	    uacute: '\u00FA',
	    ucirc: '\u00FB',
	    uuml: '\u00FC',
	    yacute: '\u00FD',
	    thorn: '\u00FE',
	    yuml: '\u00FF',
	    OElig: '\u0152',
	    oelig: '\u0153',
	    Scaron: '\u0160',
	    scaron: '\u0161',
	    Yuml: '\u0178',
	    fnof: '\u0192',
	    circ: '\u02C6',
	    tilde: '\u02DC',
	    Alpha: '\u0391',
	    Beta: '\u0392',
	    Gamma: '\u0393',
	    Delta: '\u0394',
	    Epsilon: '\u0395',
	    Zeta: '\u0396',
	    Eta: '\u0397',
	    Theta: '\u0398',
	    Iota: '\u0399',
	    Kappa: '\u039A',
	    Lambda: '\u039B',
	    Mu: '\u039C',
	    Nu: '\u039D',
	    Xi: '\u039E',
	    Omicron: '\u039F',
	    Pi: '\u03A0',
	    Rho: '\u03A1',
	    Sigma: '\u03A3',
	    Tau: '\u03A4',
	    Upsilon: '\u03A5',
	    Phi: '\u03A6',
	    Chi: '\u03A7',
	    Psi: '\u03A8',
	    Omega: '\u03A9',
	    alpha: '\u03B1',
	    beta: '\u03B2',
	    gamma: '\u03B3',
	    delta: '\u03B4',
	    epsilon: '\u03B5',
	    zeta: '\u03B6',
	    eta: '\u03B7',
	    theta: '\u03B8',
	    iota: '\u03B9',
	    kappa: '\u03BA',
	    lambda: '\u03BB',
	    mu: '\u03BC',
	    nu: '\u03BD',
	    xi: '\u03BE',
	    omicron: '\u03BF',
	    pi: '\u03C0',
	    rho: '\u03C1',
	    sigmaf: '\u03C2',
	    sigma: '\u03C3',
	    tau: '\u03C4',
	    upsilon: '\u03C5',
	    phi: '\u03C6',
	    chi: '\u03C7',
	    psi: '\u03C8',
	    omega: '\u03C9',
	    thetasym: '\u03D1',
	    upsih: '\u03D2',
	    piv: '\u03D6',
	    ensp: '\u2002',
	    emsp: '\u2003',
	    thinsp: '\u2009',
	    zwnj: '\u200C',
	    zwj: '\u200D',
	    lrm: '\u200E',
	    rlm: '\u200F',
	    ndash: '\u2013',
	    mdash: '\u2014',
	    lsquo: '\u2018',
	    rsquo: '\u2019',
	    sbquo: '\u201A',
	    ldquo: '\u201C',
	    rdquo: '\u201D',
	    bdquo: '\u201E',
	    dagger: '\u2020',
	    Dagger: '\u2021',
	    bull: '\u2022',
	    hellip: '\u2026',
	    permil: '\u2030',
	    prime: '\u2032',
	    Prime: '\u2033',
	    lsaquo: '\u2039',
	    rsaquo: '\u203A',
	    oline: '\u203E',
	    frasl: '\u2044',
	    euro: '\u20AC',
	    image: '\u2111',
	    weierp: '\u2118',
	    real: '\u211C',
	    trade: '\u2122',
	    alefsym: '\u2135',
	    larr: '\u2190',
	    uarr: '\u2191',
	    rarr: '\u2192',
	    darr: '\u2193',
	    harr: '\u2194',
	    crarr: '\u21B5',
	    lArr: '\u21D0',
	    uArr: '\u21D1',
	    rArr: '\u21D2',
	    dArr: '\u21D3',
	    hArr: '\u21D4',
	    forall: '\u2200',
	    part: '\u2202',
	    exist: '\u2203',
	    empty: '\u2205',
	    nabla: '\u2207',
	    isin: '\u2208',
	    notin: '\u2209',
	    ni: '\u220B',
	    prod: '\u220F',
	    sum: '\u2211',
	    minus: '\u2212',
	    lowast: '\u2217',
	    radic: '\u221A',
	    prop: '\u221D',
	    infin: '\u221E',
	    ang: '\u2220',
	    and: '\u2227',
	    or: '\u2228',
	    cap: '\u2229',
	    cup: '\u222A',
	    int: '\u222B',
	    there4: '\u2234',
	    sim: '\u223C',
	    cong: '\u2245',
	    asymp: '\u2248',
	    ne: '\u2260',
	    equiv: '\u2261',
	    le: '\u2264',
	    ge: '\u2265',
	    sub: '\u2282',
	    sup: '\u2283',
	    nsub: '\u2284',
	    sube: '\u2286',
	    supe: '\u2287',
	    oplus: '\u2295',
	    otimes: '\u2297',
	    perp: '\u22A5',
	    sdot: '\u22C5',
	    lceil: '\u2308',
	    rceil: '\u2309',
	    lfloor: '\u230A',
	    rfloor: '\u230B',
	    loz: '\u25CA',
	    spades: '\u2660',
	    clubs: '\u2663',
	    hearts: '\u2665',
	    diams: '\u2666',
	    lang: '\u27E8',
	    rang: '\u27E9'
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_handler_1 = __webpack_require__(10);
	var scanner_1 = __webpack_require__(12);
	var token_1 = __webpack_require__(13);
	var Reader = (function () {
	    function Reader() {
	        this.values = [];
	        this.curly = this.paren = -1;
	    }
	    // A function following one of those tokens is an expression.
	    Reader.prototype.beforeFunctionExpression = function (t) {
	        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	            'return', 'case', 'delete', 'throw', 'void',
	            // assignment operators
	            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
	            '&=', '|=', '^=', ',',
	            // binary/unary operators
	            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
	    };
	    // Determine if forward slash (/) is an operator or part of a regular expression
	    // https://github.com/mozilla/sweet.js/wiki/design
	    Reader.prototype.isRegexStart = function () {
	        var previous = this.values[this.values.length - 1];
	        var regex = (previous !== null);
	        switch (previous) {
	            case 'this':
	            case ']':
	                regex = false;
	                break;
	            case ')':
	                var keyword = this.values[this.paren - 1];
	                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
	                break;
	            case '}':
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                regex = false;
	                if (this.values[this.curly - 3] === 'function') {
	                    // Anonymous function, e.g. function(){} /42
	                    var check = this.values[this.curly - 4];
	                    regex = check ? !this.beforeFunctionExpression(check) : false;
	                }
	                else if (this.values[this.curly - 4] === 'function') {
	                    // Named function, e.g. function f(){} /42/
	                    var check = this.values[this.curly - 5];
	                    regex = check ? !this.beforeFunctionExpression(check) : true;
	                }
	                break;
	            default:
	                break;
	        }
	        return regex;
	    };
	    Reader.prototype.push = function (token) {
	        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
	            if (token.value === '{') {
	                this.curly = this.values.length;
	            }
	            else if (token.value === '(') {
	                this.paren = this.values.length;
	            }
	            this.values.push(token.value);
	        }
	        else {
	            this.values.push(null);
	        }
	    };
	    return Reader;
	}());
	var Tokenizer = (function () {
	    function Tokenizer(code, config) {
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
	        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
	        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
	        this.buffer = [];
	        this.reader = new Reader();
	    }
	    Tokenizer.prototype.errors = function () {
	        return this.errorHandler.errors;
	    };
	    Tokenizer.prototype.getNextToken = function () {
	        if (this.buffer.length === 0) {
	            var comments = this.scanner.scanComments();
	            if (this.scanner.trackComment) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
	                    var comment = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: value
	                    };
	                    if (this.trackRange) {
	                        comment.range = e.range;
	                    }
	                    if (this.trackLoc) {
	                        comment.loc = e.loc;
	                    }
	                    this.buffer.push(comment);
	                }
	            }
	            if (!this.scanner.eof()) {
	                var loc = void 0;
	                if (this.trackLoc) {
	                    loc = {
	                        start: {
	                            line: this.scanner.lineNumber,
	                            column: this.scanner.index - this.scanner.lineStart
	                        },
	                        end: {}
	                    };
	                }
	                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
	                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
	                this.reader.push(token);
	                var entry = {
	                    type: token_1.TokenName[token.type],
	                    value: this.scanner.source.slice(token.start, token.end)
	                };
	                if (this.trackRange) {
	                    entry.range = [token.start, token.end];
	                }
	                if (this.trackLoc) {
	                    loc.end = {
	                        line: this.scanner.lineNumber,
	                        column: this.scanner.index - this.scanner.lineStart
	                    };
	                    entry.loc = loc;
	                }
	                if (token.type === 9 /* RegularExpression */) {
	                    var pattern = token.pattern;
	                    var flags = token.flags;
	                    entry.regex = { pattern: pattern, flags: flags };
	                }
	                this.buffer.push(entry);
	            }
	        }
	        return this.buffer.shift();
	    };
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;


/***/ }
/******/ ])
});
;
},{}],90:[function(require,module,exports){
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
},{"_process":91}],91:[function(require,module,exports){
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
