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
var DeleguaWeb = /** @class */ (function () {
    function DeleguaWeb(nomeArquivo, funcaoDeRetorno) {
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
        // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
        this.dialeto = "delegua";
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
        console.log(this.interpretador.pilhaEscoposExecucao);
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
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
        return "0.9";
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

},{"@designliquido/delegua-matematica":8,"@designliquido/delegua/fontes/avaliador-sintatico":14,"@designliquido/delegua/fontes/estruturas":63,"@designliquido/delegua/fontes/interpretador":72,"@designliquido/delegua/fontes/lexador":76,"@designliquido/delegua/fontes/tipos-de-simbolos/delegua":81}],2:[function(require,module,exports){
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
                return new construtos_1.DefinirValor(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoSobrescrita(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    };
    AvaliadorSintatico.prototype.expressao = function () {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.LEIA))
            return this.declaracaoLeia();
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
    AvaliadorSintatico.prototype.declaracaoLeia = function () {
        var simboloAtual = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em leia.");
        var argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em leia.");
        return new declaracoes_1.Leia(simboloAtual.hashArquivo, Number(simboloAtual.linha), argumentos);
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
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.LEIA))
            return this.declaracaoLeia();
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
        return new declaracoes_1.FuncaoDeclaracao(simbolo, this.corpoDaFuncao(tipo));
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
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo);
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

},{"../construtos":30,"../declaracoes":49,"../tipos-de-simbolos/delegua":81,"./erro-avaliador-sintatico":13,"browser-process-hrtime":82}],13:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var excecoes_1 = require("../excecoes");
var objeto_delegua_classe_1 = require("../estruturas/objeto-delegua-classe");
var funcao_padrao_1 = require("../estruturas/funcao-padrao");
var delegua_classe_1 = require("../estruturas/delegua-classe");
var estruturas_1 = require("../estruturas");
function default_1(interpretador, pilhaEscoposExecucao) {
    // Retorna um número aleatório entre 0 e 1.
    pilhaEscoposExecucao.definirVariavel('aleatorio', new funcao_padrao_1.FuncaoPadrao(1, function () {
        return Math.random();
    }));
    // Retorna um número aleatório de acordo com o parâmetro passado.
    // Mínimo(inclusivo) - Máximo(exclusivo)
    pilhaEscoposExecucao.definirVariavel('aleatorioEntre', new funcao_padrao_1.FuncaoPadrao(1, function (minimo, maximo) {
        return __awaiter(this, void 0, void 0, function () {
            var valorMinimo, valorMaximo;
            return __generator(this, function (_a) {
                valorMinimo = minimo.hasOwnProperty('valor')
                    ? minimo.valor
                    : minimo;
                valorMaximo = maximo.hasOwnProperty('valor')
                    ? maximo.valor
                    : maximo;
                if (typeof valorMinimo !== 'number' ||
                    typeof valorMaximo !== 'number') {
                    throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Os dois parâmetros devem ser do tipo número.');
                }
                return [2 /*return*/, Promise.resolve(Math.floor(Math.random() * (valorMaximo - valorMinimo)) +
                        valorMinimo)];
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('inteiro', new funcao_padrao_1.FuncaoPadrao(1, function (numero) {
        return __awaiter(this, void 0, void 0, function () {
            var valor;
            return __generator(this, function (_a) {
                if (numero === null || numero === undefined)
                    return [2 /*return*/, Promise.resolve(0)];
                valor = numero.hasOwnProperty('valor')
                    ? numero.valor
                    : numero;
                if (isNaN(valor)) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece ser um número. Somente números ou textos com números podem ser convertidos para inteiro.'))];
                }
                if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para inteiro.'))];
                }
                return [2 /*return*/, Promise.resolve(parseInt(valor))];
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('mapear', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoMapeamento) {
        return __awaiter(this, void 0, void 0, function () {
            var valorVetor, valorFuncaoMapeamento, resultados, indice, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (vetor === null || vetor === undefined)
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função mapear() não pode ser nulo.'))];
                        valorVetor = vetor.hasOwnProperty('valor')
                            ? vetor.valor
                            : vetor;
                        valorFuncaoMapeamento = funcaoMapeamento.hasOwnProperty('valor')
                            ? funcaoMapeamento.valor
                            : funcaoMapeamento;
                        if (!Array.isArray(valorVetor)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função mapear() deve ser um vetor.'))];
                        }
                        if (valorFuncaoMapeamento.constructor.name !== 'DeleguaFuncao') {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função mapear() deve ser uma função.'))];
                        }
                        resultados = [];
                        indice = 0;
                        _c.label = 1;
                    case 1:
                        if (!(indice < valorVetor.length)) return [3 /*break*/, 4];
                        _b = (_a = resultados).push;
                        return [4 /*yield*/, valorFuncaoMapeamento.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        ++indice;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, resultados];
                }
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('todosEmCondicao', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoCondicional) {
        return __awaiter(this, void 0, void 0, function () {
            var valorVetor, valorFuncaoCondicional, indice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (vetor === null || vetor === undefined)
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função todosEmCondicao() não pode ser nulo.'))];
                        valorVetor = vetor.hasOwnProperty('valor')
                            ? vetor.valor
                            : vetor;
                        valorFuncaoCondicional = funcaoCondicional.hasOwnProperty('valor')
                            ? funcaoCondicional.valor
                            : funcaoCondicional;
                        if (!Array.isArray(valorVetor)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função todosEmCondicao() deve ser um vetor.'))];
                        }
                        if (valorFuncaoCondicional.constructor.name !== 'DeleguaFuncao') {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função todosEmCondicao() deve ser uma função.'))];
                        }
                        indice = 0;
                        _a.label = 1;
                    case 1:
                        if (!(indice < valorVetor.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, valorFuncaoCondicional.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 2:
                        if (!(_a.sent()))
                            return [2 /*return*/, false];
                        _a.label = 3;
                    case 3:
                        ++indice;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('filtrarPor', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        return __awaiter(this, void 0, void 0, function () {
            var valorVetor, valorFuncaoFiltragem, resultados, indice, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (vetor === null || vetor === undefined)
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função filtrarPor() não pode ser nulo.'))];
                        valorVetor = vetor.hasOwnProperty('valor')
                            ? vetor.valor
                            : vetor;
                        valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
                            ? funcaoFiltragem.valor
                            : funcaoFiltragem;
                        if (!Array.isArray(valorVetor)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função filtrarPor() deve ser um vetor.'))];
                        }
                        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função filtrarPor() deve ser uma função.'))];
                        }
                        resultados = [];
                        indice = 0;
                        _d.label = 1;
                    case 1:
                        if (!(indice < valorVetor.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, valorFuncaoFiltragem.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 2:
                        _a = (_d.sent());
                        if (!_a) return [3 /*break*/, 4];
                        _c = (_b = resultados).push;
                        return [4 /*yield*/, valorFuncaoFiltragem.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 3:
                        _a = _c.apply(_b, [_d.sent()]);
                        _d.label = 4;
                    case 4:
                        _a;
                        _d.label = 5;
                    case 5:
                        ++indice;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, resultados];
                }
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('primeiroEmCondicao', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        return __awaiter(this, void 0, void 0, function () {
            var valorVetor, valorFuncaoFiltragem, resultados, indice, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (vetor === null || vetor === undefined)
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função primeiroEmCondicao() não pode ser nulo.'))];
                        valorVetor = vetor.hasOwnProperty('valor')
                            ? vetor.valor
                            : vetor;
                        valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
                            ? funcaoFiltragem.valor
                            : funcaoFiltragem;
                        if (!Array.isArray(valorVetor)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função primeiroEmCondicao() deve ser um vetor.'))];
                        }
                        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função primeiroEmCondicao() deve ser uma função.'))];
                        }
                        resultados = [];
                        indice = 0;
                        _d.label = 1;
                    case 1:
                        if (!(indice < valorVetor.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, valorFuncaoFiltragem.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 2:
                        _a = (_d.sent());
                        if (!_a) return [3 /*break*/, 4];
                        _c = (_b = resultados).push;
                        return [4 /*yield*/, valorFuncaoFiltragem.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 3:
                        _a = _c.apply(_b, [_d.sent()]);
                        _d.label = 4;
                    case 4:
                        _a;
                        _d.label = 5;
                    case 5:
                        ++indice;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, resultados[0]];
                }
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('paraCada', new funcao_padrao_1.FuncaoPadrao(1, function (vetor, funcaoFiltragem) {
        return __awaiter(this, void 0, void 0, function () {
            var valorVetor, valorFuncaoFiltragem, indice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (vetor === null || vetor === undefined)
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função paraCada() não pode ser nulo.'))];
                        valorVetor = vetor.hasOwnProperty('valor')
                            ? vetor.valor
                            : vetor;
                        valorFuncaoFiltragem = funcaoFiltragem.hasOwnProperty('valor')
                            ? funcaoFiltragem.valor
                            : funcaoFiltragem;
                        if (!Array.isArray(valorVetor)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função paraCada() deve ser um vetor.'))];
                        }
                        if (valorFuncaoFiltragem.constructor.name !== 'DeleguaFuncao') {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O segundo parâmetro da função paraCada() deve ser uma função.'))];
                        }
                        indice = 0;
                        _a.label = 1;
                    case 1:
                        if (!(indice < valorVetor.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, valorFuncaoFiltragem.chamar(interpretador, [
                                valorVetor[indice],
                            ])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++indice;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('ordenar', new funcao_padrao_1.FuncaoPadrao(1, function (vetor) {
        return __awaiter(this, void 0, void 0, function () {
            var objeto, trocado, tamanho, i;
            var _a;
            return __generator(this, function (_b) {
                if (vetor === null || vetor === undefined)
                    throw new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Parâmetro inválido. O primeiro parâmetro da função ordenar() não pode ser nulo.');
                objeto = vetor.hasOwnProperty('valor')
                    ? vetor.valor
                    : vetor;
                if (!Array.isArray(objeto)) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor inválido. Objeto inserido não é um vetor.'))];
                }
                tamanho = objeto.length;
                do {
                    trocado = false;
                    for (i = 0; i < tamanho - 1; i++) {
                        if (objeto[i] > objeto[i + 1]) {
                            _a = [objeto[i + 1], objeto[i]], objeto[i] = _a[0], objeto[i + 1] = _a[1];
                            trocado = true;
                        }
                    }
                } while (trocado);
                return [2 /*return*/, Promise.resolve(objeto)];
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('real', new funcao_padrao_1.FuncaoPadrao(1, function (numero) {
        return __awaiter(this, void 0, void 0, function () {
            var valor;
            return __generator(this, function (_a) {
                if (numero === null || numero === undefined)
                    return [2 /*return*/, Promise.resolve(parseFloat('0'))];
                valor = numero.hasOwnProperty('valor')
                    ? numero.valor
                    : numero;
                if (!/^(-)?\d+(\.\d+)?$/.test(valor)) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Valor não parece estar estruturado como um número (texto/valor vazio, falso ou não definido). Somente números ou textos com números podem ser convertidos para real.'))];
                }
                return [2 /*return*/, Promise.resolve(parseFloat(valor))];
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('tamanho', new funcao_padrao_1.FuncaoPadrao(1, function (objeto) {
        return __awaiter(this, void 0, void 0, function () {
            var valorObjeto, metodos, tamanho;
            return __generator(this, function (_a) {
                valorObjeto = objeto.hasOwnProperty('valor')
                    ? objeto.valor
                    : objeto;
                if (!isNaN(valorObjeto)) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Não é possível encontrar o tamanho de um número.'))];
                }
                if (valorObjeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) {
                    return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(this.simbolo, 'Você não pode encontrar o tamanho de uma declaração.'))];
                }
                if (valorObjeto instanceof estruturas_1.DeleguaFuncao) {
                    return [2 /*return*/, Promise.resolve(valorObjeto.declaracao.parametros.length)];
                }
                if (valorObjeto instanceof funcao_padrao_1.FuncaoPadrao) {
                    return [2 /*return*/, Promise.resolve(valorObjeto.valorAridade)];
                }
                if (valorObjeto instanceof delegua_classe_1.DeleguaClasse) {
                    metodos = valorObjeto.metodos;
                    tamanho = 0;
                    if (metodos.inicializacao &&
                        metodos.inicializacao.eInicializador) {
                        tamanho =
                            metodos.inicializacao.declaracao.parametros.length;
                    }
                    return [2 /*return*/, Promise.resolve(tamanho)];
                }
                return [2 /*return*/, Promise.resolve(valorObjeto.length)];
            });
        });
    }));
    pilhaEscoposExecucao.definirVariavel('texto', new funcao_padrao_1.FuncaoPadrao(1, function (valorOuVariavel) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve("".concat(valorOuVariavel.hasOwnProperty('valor')
                        ? valorOuVariavel.valor
                        : valorOuVariavel))];
            });
        });
    }));
    return pilhaEscoposExecucao;
}
exports.default = default_1;

},{"../estruturas":63,"../estruturas/delegua-classe":60,"../estruturas/funcao-padrao":62,"../estruturas/objeto-delegua-classe":66,"../excecoes":69}],16:[function(require,module,exports){
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
},{"../estruturas/classe-padrao":59,"../estruturas/funcao-padrao":62,"../estruturas/modulo":65,"../excecoes":69,"_process":85,"child_process":83,"path":84}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoAcessoIndiceVariavel(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AcessoIndiceVariavel;
}());
exports.AcessoIndiceVariavel = AcessoIndiceVariavel;

},{}],20:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoAcessoMetodo(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AcessoMetodo;
}());
exports.AcessoMetodo = AcessoMetodo;

},{}],21:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoAgrupamento(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Agrupamento;
}());
exports.Agrupamento = Agrupamento;

},{}],22:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoAtribuicaoSobrescrita(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AtribuicaoSobrescrita;
}());
exports.AtribuicaoSobrescrita = AtribuicaoSobrescrita;

},{}],23:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoDeAtribuicao(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Atribuir;
}());
exports.Atribuir = Atribuir;

},{}],24:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoBinaria(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Binario;
}());
exports.Binario = Binario;

},{}],25:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoDeChamada(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Chamada;
}());
exports.Chamada = Chamada;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinirValor = void 0;
var DefinirValor = /** @class */ (function () {
    function DefinirValor(hashArquivo, linha, objeto, nome, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.nome = nome;
        this.valor = valor;
    }
    DefinirValor.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoDefinirValor(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DefinirValor;
}());
exports.DefinirValor = DefinirValor;

},{}],28:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoDicionario(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Dicionario;
}());
exports.Dicionario = Dicionario;

},{}],29:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoConstruto = void 0;
var FuncaoConstruto = /** @class */ (function () {
    function FuncaoConstruto(hashArquivo, linha, parametros, corpo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.corpo = corpo;
    }
    FuncaoConstruto.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoDeleguaFuncao(this))];
            });
        });
    };
    return FuncaoConstruto;
}());
exports.FuncaoConstruto = FuncaoConstruto;

},{}],30:[function(require,module,exports){
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

},{"./acesso-indice-variavel":19,"./acesso-metodo":20,"./agrupamento":21,"./atribuicao-sobrescrita":22,"./atribuir":23,"./binario":24,"./chamada":25,"./construto":26,"./definir-valor":27,"./dicionario":28,"./funcao":29,"./isto":31,"./literal":32,"./logico":33,"./super":34,"./unario":35,"./variavel":36,"./vetor":37}],31:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
var Isto = /** @class */ (function () {
    function Isto(hashArquivo, linha, palavraChave) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.palavraChave = palavraChave;
    }
    Isto.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoIsto(this))];
            });
        });
    };
    return Isto;
}());
exports.Isto = Isto;

},{}],32:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(hashArquivo, linha, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
    }
    Literal.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoLiteral(this))];
            });
        });
    };
    return Literal;
}());
exports.Literal = Literal;

},{}],33:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoLogica(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Logico;
}());
exports.Logico = Logico;

},{}],34:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoSuper(this))];
            });
        });
    };
    return Super;
}());
exports.Super = Super;

},{}],35:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoUnaria(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Unario;
}());
exports.Unario = Unario;

},{}],36:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variavel = void 0;
var Variavel = /** @class */ (function () {
    function Variavel(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    Variavel.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoDeVariavel(this))];
            });
        });
    };
    return Variavel;
}());
exports.Variavel = Variavel;

},{}],37:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
var Vetor = /** @class */ (function () {
    function Vetor(hashArquivo, linha, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valores = valores;
    }
    Vetor.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoVetor(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Vetor;
}());
exports.Vetor = Vetor;

},{}],38:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoBloco(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Bloco;
}(declaracao_1.Declaracao));
exports.Bloco = Bloco;

},{"./declaracao":41}],39:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoClasse(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Classe;
}(declaracao_1.Declaracao));
exports.Classe = Classe;

},{"./declaracao":41}],40:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continua = void 0;
var declaracao_1 = require("./declaracao");
var Continua = /** @class */ (function (_super) {
    __extends(Continua, _super);
    function Continua(simbolo) {
        return _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
    }
    Continua.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoContinua(this))];
            });
        });
    };
    return Continua;
}(declaracao_1.Declaracao));
exports.Continua = Continua;

},{"./declaracao":41}],41:[function(require,module,exports){
"use strict";
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.reject(new Error('Este método não deveria ser chamado.'))];
            });
        });
    };
    return Declaracao;
}());
exports.Declaracao = Declaracao;

},{}],42:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoEnquanto(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Enquanto;
}(declaracao_1.Declaracao));
exports.Enquanto = Enquanto;

},{"./declaracao":41}],43:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoEscolha(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Escolha;
}(declaracao_1.Declaracao));
exports.Escolha = Escolha;

},{"./declaracao":41}],44:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoEscreva(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Escreva;
}(declaracao_1.Declaracao));
exports.Escreva = Escreva;

},{"./declaracao":41}],45:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarDeclaracaoDeExpressao(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Expressao;
}(declaracao_1.Declaracao));
exports.Expressao = Expressao;

},{"./declaracao":41}],46:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoFazer(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Fazer;
}(declaracao_1.Declaracao));
exports.Fazer = Fazer;

},{"./declaracao":41}],47:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoDeclaracao = void 0;
var declaracao_1 = require("./declaracao");
var FuncaoDeclaracao = /** @class */ (function (_super) {
    __extends(FuncaoDeclaracao, _super);
    function FuncaoDeclaracao(simbolo, funcao) {
        var _this = _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
        _this.simbolo = simbolo;
        _this.funcao = funcao;
        return _this;
    }
    FuncaoDeclaracao.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoFuncao(this))];
            });
        });
    };
    return FuncaoDeclaracao;
}(declaracao_1.Declaracao));
exports.FuncaoDeclaracao = FuncaoDeclaracao;

},{"./declaracao":41}],48:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoImportar(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Importar;
}(declaracao_1.Declaracao));
exports.Importar = Importar;

},{"./declaracao":41}],49:[function(require,module,exports){
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

},{"./bloco":38,"./classe":39,"./continua":40,"./declaracao":41,"./enquanto":42,"./escolha":43,"./escreva":44,"./expressao":45,"./fazer":46,"./funcao":47,"./importar":48,"./leia":50,"./para":51,"./retorna":52,"./se":53,"./sustar":54,"./tente":55,"./var":56}],50:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoLeia(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Leia;
}(declaracao_1.Declaracao));
exports.Leia = Leia;

},{"./declaracao":41}],51:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoPara(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Para;
}(declaracao_1.Declaracao));
exports.Para = Para;

},{"./declaracao":41}],52:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoRetornar(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Retorna;
}(declaracao_1.Declaracao));
exports.Retorna = Retorna;

},{"./declaracao":41}],53:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoSe(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Se;
}(declaracao_1.Declaracao));
exports.Se = Se;

},{"./declaracao":41}],54:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sustar = void 0;
var declaracao_1 = require("./declaracao");
var Sustar = /** @class */ (function (_super) {
    __extends(Sustar, _super);
    function Sustar(simbolo) {
        return _super.call(this, Number(simbolo.linha), simbolo.hashArquivo) || this;
    }
    Sustar.prototype.aceitar = function (visitante) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(visitante.visitarExpressaoSustar(this))];
            });
        });
    };
    return Sustar;
}(declaracao_1.Declaracao));
exports.Sustar = Sustar;

},{"./declaracao":41}],55:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoTente(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Tente;
}(declaracao_1.Declaracao));
exports.Tente = Tente;

},{"./declaracao":41}],56:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, visitante.visitarExpressaoVar(this)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Var;
}(declaracao_1.Declaracao));
exports.Var = Var;

},{"./declaracao":41}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./chamavel":58,"./objeto-padrao":67}],60:[function(require,module,exports){
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

},{"./chamavel":58,"./objeto-delegua-classe":66}],61:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            var ambiente, parametros, i, parametro, nome, valor, retornoBloco;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ambiente = new espaco_variaveis_1.EspacoVariaveis();
                        parametros = this.declaracao.parametros;
                        if (parametros && parametros.length) {
                            for (i = 0; i < parametros.length; i++) {
                                parametro = parametros[i];
                                nome = parametro['nome'].lexema;
                                valor = argumentos[i];
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
                        return [4 /*yield*/, interpretador.executarBloco(this.declaracao.corpo, ambiente)];
                    case 1:
                        retornoBloco = _a.sent();
                        if (retornoBloco instanceof quebras_1.RetornoQuebra) {
                            return [2 /*return*/, retornoBloco.valor];
                        }
                        if (this.eInicializador) {
                            return [2 /*return*/, this.instancia];
                        }
                        return [2 /*return*/, retornoBloco];
                }
            });
        });
    };
    DeleguaFuncao.prototype.definirInstancia = function (instancia) {
        return new DeleguaFuncao(this.nome, this.declaracao, instancia, this.eInicializador);
    };
    return DeleguaFuncao;
}(chamavel_1.Chamavel));
exports.DeleguaFuncao = DeleguaFuncao;

},{"../espaco-variaveis":57,"../quebras":80,"./chamavel":58}],62:[function(require,module,exports){
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.simbolo = simbolo;
                        return [4 /*yield*/, this.funcao.apply(this, argumentos)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FuncaoPadrao.prototype.paraTexto = function () {
        return '<função>';
    };
    return FuncaoPadrao;
}(chamavel_1.Chamavel));
exports.FuncaoPadrao = FuncaoPadrao;

},{"./chamavel":58}],63:[function(require,module,exports){
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

},{"./chamavel":58,"./classe-padrao":59,"./delegua-classe":60,"./delegua-funcao":61,"./funcao-padrao":62,"./metodo-primitiva":64,"./modulo":65,"./objeto-delegua-classe":66,"./objeto-padrao":67}],64:[function(require,module,exports){
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

},{"./chamavel":58}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{"../excecoes":69}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./erro-em-tempo-de-execucao":68}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],72:[function(require,module,exports){
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

},{"../interfaces/retornos/retorno-interpretador":70,"./erro-interpretador":71,"./interpretador":74}],73:[function(require,module,exports){
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
exports.Interpretador = void 0;
var caminho = __importStar(require("path"));
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var espaco_variaveis_1 = require("../espaco-variaveis");
var biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
var importar_biblioteca_1 = __importDefault(require("../bibliotecas/importar-biblioteca"));
var excecoes_1 = require("../excecoes");
var estruturas_1 = require("../estruturas");
var pilha_escopos_execucao_1 = require("./pilha-escopos-execucao");
var quebras_1 = require("../quebras");
var inferenciador_1 = require("./inferenciador");
var metodo_primitiva_1 = require("../estruturas/metodo-primitiva");
var primitivas_texto_1 = __importDefault(require("../bibliotecas/primitivas-texto"));
var primitivas_vetor_1 = __importDefault(require("../bibliotecas/primitivas-vetor"));
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * O Interpretador visita todos os elementos complexos gerados pelo avaliador sintático (_parser_),
 * e de fato executa a lógica de programação descrita no código.
 */
var Interpretador = /** @class */ (function () {
    function Interpretador(importador, diretorioBase, performance, funcaoDeRetorno) {
        if (performance === void 0) { performance = false; }
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
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
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    Interpretador.prototype.visitarExpressaoLeia = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var mensagem;
            var _this = this;
            return __generator(this, function (_a) {
                mensagem = expressao.argumentos && expressao.argumentos[0] ? expressao.argumentos[0].valor : '';
                return [2 /*return*/, new Promise(function (resolucao) {
                        return _this.interfaceEntradaSaida.question(mensagem, function (resposta) {
                            resolucao(resposta);
                        });
                    })];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expressao.aceitar(this)];
                    case 1: 
                    // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
                    // Por algum motivo o depurador do VSCode não funciona direito aqui
                    // com breakpoint condicional.
                    /* if (expressao === null || expressao === undefined) {
                        console.log('Aqui');
                    } */
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoAgrupamento = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.expressao)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Interpretador.prototype.eVerdadeiro = function (objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === 'boolean')
            return Boolean(objeto);
        return true;
    };
    Interpretador.prototype.verificarOperandoNumero = function (operador, operando) {
        if (typeof operando === 'number' || operando.tipo === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operando precisa ser um número.', Number(operador.linha));
    };
    Interpretador.prototype.visitarExpressaoUnaria = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var direita, valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.direita)];
                    case 1:
                        direita = _a.sent();
                        valor = direita.hasOwnProperty('valor') ?
                            direita.valor :
                            direita;
                        switch (expressao.operador.tipo) {
                            case delegua_1.default.SUBTRACAO:
                                this.verificarOperandoNumero(expressao.operador, valor);
                                return [2 /*return*/, -valor];
                            case delegua_1.default.NEGACAO:
                                return [2 /*return*/, !this.eVerdadeiro(valor)];
                            case delegua_1.default.BIT_NOT:
                                return [2 /*return*/, ~valor];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var esquerda, direita, valorEsquerdo, valorDireito, tipoEsquerdo, tipoDireito, erro_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.avaliar(expressao.esquerda)];
                    case 1:
                        esquerda = _a.sent();
                        return [4 /*yield*/, this.avaliar(expressao.direita)];
                    case 2:
                        direita = _a.sent();
                        valorEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('valor'))
                            ? esquerda.valor
                            : esquerda;
                        valorDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('valor'))
                            ? direita.valor
                            : direita;
                        tipoEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('tipo'))
                            ? esquerda.tipo
                            : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
                        tipoDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('tipo'))
                            ? direita.tipo
                            : (0, inferenciador_1.inferirTipoVariavel)(direita);
                        switch (expressao.operador.tipo) {
                            case delegua_1.default.EXPONENCIACAO:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Math.pow(valorEsquerdo, valorDireito)];
                            case delegua_1.default.MAIOR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) > Number(valorDireito)];
                            case delegua_1.default.MAIOR_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) >= Number(valorDireito)];
                            case delegua_1.default.MENOR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) < Number(valorDireito)];
                            case delegua_1.default.MENOR_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) <= Number(valorDireito)];
                            case delegua_1.default.SUBTRACAO:
                            case delegua_1.default.MENOS_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) - Number(valorDireito)];
                            case delegua_1.default.ADICAO:
                            case delegua_1.default.MAIS_IGUAL:
                                if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                                    return [2 /*return*/, Number(valorEsquerdo) + Number(valorDireito)];
                                }
                                else {
                                    return [2 /*return*/, String(valorEsquerdo) + String(valorDireito)];
                                }
                            case delegua_1.default.DIVISAO:
                            case delegua_1.default.DIVISAO_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) / Number(valorDireito)];
                            case delegua_1.default.MULTIPLICACAO:
                            case delegua_1.default.MULTIPLICACAO_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) * Number(valorDireito)];
                            case delegua_1.default.MODULO:
                            case delegua_1.default.MODULO_IGUAL:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) % Number(valorDireito)];
                            case delegua_1.default.BIT_AND:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) & Number(valorDireito)];
                            case delegua_1.default.BIT_XOR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) ^ Number(valorDireito)];
                            case delegua_1.default.BIT_OR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) | Number(valorDireito)];
                            case delegua_1.default.MENOR_MENOR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) << Number(valorDireito)];
                            case delegua_1.default.MAIOR_MAIOR:
                                this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                                return [2 /*return*/, Number(valorEsquerdo) >> Number(valorDireito)];
                            case delegua_1.default.DIFERENTE:
                                return [2 /*return*/, !this.eIgual(valorEsquerdo, valorDireito)];
                            case delegua_1.default.IGUAL_IGUAL:
                                return [2 /*return*/, this.eIgual(valorEsquerdo, valorDireito)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        erro_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(erro_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    Interpretador.prototype.visitarExpressaoDeChamada = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var variavelEntidadeChamada, entidadeChamada, argumentos, i, _a, _b, argumentosResolvidos, _i, _c, argumento, valorResolvido, parametros, diferenca, i, novosArgumentos, erro_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.avaliar(expressao.entidadeChamada)];
                    case 1:
                        variavelEntidadeChamada = _d.sent();
                        entidadeChamada = variavelEntidadeChamada.hasOwnProperty('valor')
                            ? variavelEntidadeChamada.valor
                            : variavelEntidadeChamada;
                        argumentos = [];
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < expressao.argumentos.length)) return [3 /*break*/, 5];
                        _b = (_a = argumentos).push;
                        return [4 /*yield*/, this.avaliar(expressao.argumentos[i])];
                    case 3:
                        _b.apply(_a, [_d.sent()]);
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!(entidadeChamada instanceof estruturas_1.Chamavel)) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha))];
                        }
                        if (!(entidadeChamada instanceof metodo_primitiva_1.MetodoPrimitiva)) return [3 /*break*/, 10];
                        argumentosResolvidos = [];
                        _i = 0, _c = expressao.argumentos;
                        _d.label = 6;
                    case 6:
                        if (!(_i < _c.length)) return [3 /*break*/, 9];
                        argumento = _c[_i];
                        return [4 /*yield*/, this.avaliar(argumento)];
                    case 7:
                        valorResolvido = _d.sent();
                        argumentosResolvidos.push(valorResolvido.hasOwnProperty('valor')
                            ? valorResolvido.valor
                            : valorResolvido);
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, entidadeChamada.chamar(argumentosResolvidos)];
                    case 10:
                        parametros = void 0;
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
                            diferenca = entidadeChamada.aridade() - argumentos.length;
                            for (i = 0; i < diferenca; i++) {
                                argumentos.push(null);
                            }
                        }
                        else {
                            if (parametros &&
                                parametros.length > 0 &&
                                parametros[parametros.length - 1].tipo === 'estrela') {
                                novosArgumentos = argumentos.slice(0, parametros.length - 1);
                                novosArgumentos.push(argumentos.slice(parametros.length - 1, argumentos.length));
                                argumentos = novosArgumentos;
                            }
                        }
                        if (entidadeChamada instanceof estruturas_1.FuncaoPadrao) {
                            try {
                                return [2 /*return*/, entidadeChamada.chamar(argumentos, expressao.entidadeChamada.nome)];
                            }
                            catch (erro) {
                                this.erros.push(erro);
                            }
                        }
                        return [2 /*return*/, entidadeChamada.chamar(this, argumentos)];
                    case 11:
                        erro_2 = _d.sent();
                        console.log(erro_2);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Execução de uma expressão de atribuição.
     * @param expressao A expressão.
     * @returns O valor atribuído.
     */
    Interpretador.prototype.visitarExpressaoDeAtribuicao = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.valor)];
                    case 1:
                        valor = _a.sent();
                        this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
                        return [2 /*return*/, valor];
                }
            });
        });
    };
    Interpretador.prototype.procurarVariavel = function (simbolo) {
        return this.pilhaEscoposExecucao.obterVariavel(simbolo);
    };
    Interpretador.prototype.visitarExpressaoDeVariavel = function (expressao) {
        return this.procurarVariavel(expressao.simbolo);
    };
    Interpretador.prototype.visitarDeclaracaoDeExpressao = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(declaracao.expressao)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoLogica = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var esquerda, direita;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.esquerda)];
                    case 1:
                        esquerda = _a.sent();
                        if (!(expressao.operador.tipo === delegua_1.default.EM)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.avaliar(expressao.direita)];
                    case 2:
                        direita = _a.sent();
                        if (Array.isArray(direita) || typeof direita === 'string') {
                            return [2 /*return*/, direita.includes(esquerda)];
                        }
                        else if (direita.constructor === Object) {
                            return [2 /*return*/, esquerda in direita];
                        }
                        else {
                            throw new excecoes_1.ErroEmTempoDeExecucao(esquerda, "Tipo de chamada inválida com 'em'.", expressao.linha);
                        }
                        _a.label = 3;
                    case 3:
                        // se um estado for verdadeiro, retorna verdadeiro
                        if (expressao.operador.tipo === delegua_1.default.OU) {
                            if (this.eVerdadeiro(esquerda))
                                return [2 /*return*/, esquerda];
                        }
                        // se um estado for falso, retorna falso
                        if (expressao.operador.tipo === delegua_1.default.E) {
                            if (!this.eVerdadeiro(esquerda))
                                return [2 /*return*/, esquerda];
                        }
                        return [4 /*yield*/, this.avaliar(expressao.direita)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    Interpretador.prototype.visitarExpressaoSe = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, atual, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.eVerdadeiro;
                        return [4 /*yield*/, this.avaliar(declaracao.condicao)];
                    case 1:
                        if (!_a.apply(this, [_c.sent()])) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.executar(declaracao.caminhoEntao)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3:
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < declaracao.caminhosSeSenao.length)) return [3 /*break*/, 8];
                        atual = declaracao.caminhosSeSenao[i];
                        _b = this.eVerdadeiro;
                        return [4 /*yield*/, this.avaliar(atual.condicao)];
                    case 5:
                        if (!_b.apply(this, [_c.sent()])) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.executar(atual.caminho)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        i++;
                        return [3 /*break*/, 4];
                    case 8:
                        if (!(declaracao.caminhoSenao !== null)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.executar(declaracao.caminhoSenao)];
                    case 9: return [2 /*return*/, _c.sent()];
                    case 10: return [2 /*return*/, null];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoPara = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var retornoExecucao, _a, _b, erro_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(declaracao.inicializador !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.avaliar(declaracao.inicializador)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!!(retornoExecucao instanceof quebras_1.Quebra)) return [3 /*break*/, 11];
                        _a = declaracao.condicao !== null;
                        if (!_a) return [3 /*break*/, 4];
                        _b = this.eVerdadeiro;
                        return [4 /*yield*/, this.avaliar(declaracao.condicao)];
                    case 3:
                        _a = !_b.apply(this, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        if (_a) {
                            return [3 /*break*/, 11];
                        }
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.executar(declaracao.corpo)];
                    case 6:
                        retornoExecucao = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        erro_3 = _c.sent();
                        return [2 /*return*/, Promise.reject(erro_3)];
                    case 8:
                        if (!(declaracao.incrementar !== null)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.avaliar(declaracao.incrementar)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [3 /*break*/, 2];
                    case 11: return [2 /*return*/, null];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoFazer = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var retornoExecucao, erro_4, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.executar(declaracao.caminhoFazer)];
                    case 1:
                        retornoExecucao = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        erro_4 = _c.sent();
                        return [2 /*return*/, Promise.reject(erro_4)];
                    case 3:
                        _a = !(retornoExecucao instanceof quebras_1.Quebra);
                        if (!_a) return [3 /*break*/, 5];
                        _b = this.eVerdadeiro;
                        return [4 /*yield*/, this.avaliar(declaracao.condicaoEnquanto)];
                    case 4:
                        _a = _b.apply(this, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        if (_a) return [3 /*break*/, 0];
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoEscolha = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var condicaoEscolha, caminhos, caminhoPadrao, encontrado, i, caminho_1, j, erro_5, erro_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(declaracao.identificadorOuLiteral)];
                    case 1:
                        condicaoEscolha = _a.sent();
                        caminhos = declaracao.caminhos;
                        caminhoPadrao = declaracao.caminhoPadrao;
                        encontrado = false;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 14, , 15]);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < caminhos.length)) return [3 /*break*/, 11];
                        caminho_1 = caminhos[i];
                        j = 0;
                        _a.label = 4;
                    case 4:
                        if (!(j < caminho_1.condicoes.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.avaliar(caminho_1.condicoes[j])];
                    case 5:
                        if (!((_a.sent()) === condicaoEscolha)) return [3 /*break*/, 9];
                        encontrado = true;
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.executarBloco(caminho_1.declaracoes)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        erro_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(erro_5)];
                    case 9:
                        j++;
                        return [3 /*break*/, 4];
                    case 10:
                        i++;
                        return [3 /*break*/, 3];
                    case 11:
                        if (!(caminhoPadrao !== null && encontrado === false)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.executarBloco(caminhoPadrao.declaracoes)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        erro_6 = _a.sent();
                        throw erro_6;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoTente = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var sucesso, erro_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 10, 13]);
                        sucesso = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        return [4 /*yield*/, this.executarBloco(declaracao.caminhoTente)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        erro_7 = _a.sent();
                        sucesso = false;
                        if (!(declaracao.caminhoPegue !== null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.executarBloco(declaracao.caminhoPegue)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.erros.push(erro_7);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        if (!(sucesso && declaracao.caminhoSenao !== null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.executarBloco(declaracao.caminhoSenao)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        if (!(declaracao.caminhoFinalmente !== null)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.executarBloco(declaracao.caminhoFinalmente)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoEnquanto = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var retornoExecucao, _a, _b, erro_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = !(retornoExecucao instanceof quebras_1.Quebra);
                        if (!_a) return [3 /*break*/, 2];
                        _b = this.eVerdadeiro;
                        return [4 /*yield*/, this.avaliar(declaracao.condicao)];
                    case 1:
                        _a = _b.apply(this, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 7];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.executar(declaracao.corpo)];
                    case 4:
                        retornoExecucao = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        erro_8 = _c.sent();
                        throw erro_8;
                    case 6: return [3 /*break*/, 0];
                    case 7: return [2 /*return*/, null];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoImportar = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var caminhoRelativo, caminhoTotal, nomeArquivo, conteudoImportacao, retornoInterpretador, funcoesChamaveis, eDicionario, novoModulo, chaves, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(declaracao.caminho)];
                    case 1:
                        caminhoRelativo = _a.sent();
                        caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
                        nomeArquivo = caminho.basename(caminhoTotal);
                        if (!caminhoTotal.endsWith('.egua') &&
                            !caminhoTotal.endsWith('.delegua')) {
                            try {
                                return [2 /*return*/, (0, importar_biblioteca_1.default)(caminhoRelativo)];
                            }
                            catch (erro) {
                                this.erros.push(erro);
                                return [2 /*return*/, null];
                            }
                        }
                        conteudoImportacao = this.importador.importar(caminhoRelativo);
                        retornoInterpretador = this.interpretar(conteudoImportacao.retornoAvaliadorSintatico.declaracoes, true);
                        funcoesChamaveis = this.pilhaEscoposExecucao.obterTodasDeleguaFuncao();
                        eDicionario = function (objeto) { return objeto.constructor === Object; };
                        if (eDicionario(funcoesChamaveis)) {
                            novoModulo = new estruturas_1.DeleguaModulo();
                            chaves = Object.keys(funcoesChamaveis);
                            for (i = 0; i < chaves.length; i++) {
                                novoModulo.componentes[chaves[i]] = funcoesChamaveis[chaves[i]];
                            }
                            return [2 /*return*/, novoModulo];
                        }
                        return [2 /*return*/, funcoesChamaveis];
                }
            });
        });
    };
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    Interpretador.prototype.visitarExpressaoEscreva = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var valor, _i, _a, argumento, resultadoAvaliacao, formatoTexto, erro_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        valor = void 0;
                        _i = 0, _a = declaracao.argumentos;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        argumento = _a[_i];
                        return [4 /*yield*/, this.avaliar(argumento)];
                    case 2:
                        resultadoAvaliacao = _b.sent();
                        valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor'))
                            ? resultadoAvaliacao.valor
                            : resultadoAvaliacao;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        formatoTexto = this.paraTexto(valor);
                        // Por enquanto `escreva` não devolve resultado no interpretador.
                        // this.resultadoInterpretador.push(formatoTexto);
                        this.funcaoDeRetorno(formatoTexto);
                        return [2 /*return*/, null];
                    case 5:
                        erro_9 = _b.sent();
                        this.erros.push(erro_9);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var escopoExecucao, retornoUltimoEscopo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        escopoExecucao = {
                            declaracoes: declaracoes,
                            declaracaoAtual: 0,
                            ambiente: ambiente || new espaco_variaveis_1.EspacoVariaveis(),
                        };
                        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
                        return [4 /*yield*/, this.executarUltimoEscopo()];
                    case 1:
                        retornoUltimoEscopo = _a.sent();
                        if (retornoUltimoEscopo instanceof excecoes_1.ErroEmTempoDeExecucao) {
                            return [2 /*return*/, Promise.reject(retornoUltimoEscopo)];
                        }
                        return [2 /*return*/, retornoUltimoEscopo];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoBloco = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executarBloco(declaracao.declaracoes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    Interpretador.prototype.visitarExpressaoVar = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var valorOuOutraVariavel, valorFinal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valorOuOutraVariavel = null;
                        if (!(declaracao.inicializador !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.avaliar(declaracao.inicializador)];
                    case 1:
                        valorOuOutraVariavel = _a.sent();
                        _a.label = 2;
                    case 2:
                        valorFinal = null;
                        if (valorOuOutraVariavel !== null && valorOuOutraVariavel !== undefined) {
                            valorFinal = valorOuOutraVariavel.hasOwnProperty('valor')
                                ? valorOuOutraVariavel.valor
                                : valorOuOutraVariavel;
                        }
                        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorFinal);
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoContinua = function (declaracao) {
        return new quebras_1.ContinuarQuebra();
    };
    Interpretador.prototype.visitarExpressaoSustar = function (declaracao) {
        return new quebras_1.SustarQuebra();
    };
    Interpretador.prototype.visitarExpressaoRetornar = function (declaracao) {
        return __awaiter(this, void 0, void 0, function () {
            var valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valor = null;
                        if (!(declaracao.valor != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.avaliar(declaracao.valor)];
                    case 1:
                        valor = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new quebras_1.RetornoQuebra(valor)];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoDeleguaFuncao = function (expressao) {
        return new estruturas_1.DeleguaFuncao(null, expressao);
    };
    Interpretador.prototype.visitarExpressaoAtribuicaoSobrescrita = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, objeto, indice, valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.avaliar(expressao.objeto),
                            this.avaliar(expressao.indice),
                            this.avaliar(expressao.valor)
                        ])];
                    case 1:
                        promises = _a.sent();
                        objeto = promises[0];
                        indice = promises[1];
                        valor = promises[2];
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
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoAcessoIndiceVariavel = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var variavelObjeto, objeto, indice, valorIndice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.entidadeChamada)];
                    case 1:
                        variavelObjeto = _a.sent();
                        objeto = variavelObjeto.hasOwnProperty('valor')
                            ? variavelObjeto.valor
                            : variavelObjeto;
                        return [4 /*yield*/, this.avaliar(expressao.indice)];
                    case 2:
                        indice = _a.sent();
                        valorIndice = indice.hasOwnProperty('valor') ? indice.valor : indice;
                        if (Array.isArray(objeto)) {
                            if (!Number.isInteger(valorIndice)) {
                                return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha))];
                            }
                            if (valorIndice < 0 && objeto.length !== 0) {
                                while (valorIndice < 0) {
                                    valorIndice += objeto.length;
                                }
                            }
                            if (valorIndice >= objeto.length) {
                                return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha))];
                            }
                            return [2 /*return*/, objeto[valorIndice]];
                        }
                        else if (objeto.constructor === Object ||
                            objeto instanceof estruturas_1.ObjetoDeleguaClasse ||
                            objeto instanceof estruturas_1.DeleguaFuncao ||
                            objeto instanceof estruturas_1.DeleguaClasse ||
                            objeto instanceof estruturas_1.DeleguaModulo) {
                            return [2 /*return*/, objeto[valorIndice] || null];
                        }
                        else if (typeof objeto === 'string') {
                            if (!Number.isInteger(valorIndice)) {
                                return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha))];
                            }
                            if (valorIndice < 0 && objeto.length !== 0) {
                                while (valorIndice < 0) {
                                    valorIndice += objeto.length;
                                }
                            }
                            if (valorIndice >= objeto.length) {
                                return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha))];
                            }
                            return [2 /*return*/, objeto.charAt(valorIndice)];
                        }
                        else {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoDefinirValor = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var objeto, valor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.objeto)];
                    case 1:
                        objeto = _a.sent();
                        if (!(objeto instanceof estruturas_1.ObjetoDeleguaClasse) &&
                            objeto.constructor !== Object) {
                            return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha))];
                        }
                        return [4 /*yield*/, this.avaliar(expressao.valor)];
                    case 2:
                        valor = _a.sent();
                        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
                            objeto.set(expressao.nome, valor);
                            return [2 /*return*/, valor];
                        }
                        else if (objeto.constructor === Object) {
                            objeto[expressao.simbolo.lexema] = valor;
                        }
                        return [2 /*return*/];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var superClasse, variavelSuperClasse, metodos, definirMetodos, i, metodoAtual, eInicializador, funcao, deleguaClasse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        superClasse = null;
                        if (!(declaracao.superClasse !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.avaliar(declaracao.superClasse)];
                    case 1:
                        variavelSuperClasse = _a.sent();
                        superClasse = variavelSuperClasse.valor;
                        if (!(superClasse instanceof estruturas_1.DeleguaClasse)) {
                            throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'SuperClasse precisa ser uma classe.', declaracao.linha);
                        }
                        _a.label = 2;
                    case 2:
                        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, null);
                        if (declaracao.superClasse !== null) {
                            this.pilhaEscoposExecucao.definirVariavel('super', superClasse);
                        }
                        metodos = {};
                        definirMetodos = declaracao.metodos;
                        for (i = 0; i < declaracao.metodos.length; i++) {
                            metodoAtual = definirMetodos[i];
                            eInicializador = metodoAtual.simbolo.lexema === 'construtor';
                            funcao = new estruturas_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, undefined, eInicializador);
                            metodos[metodoAtual.simbolo.lexema] = funcao;
                        }
                        deleguaClasse = new estruturas_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
                        // TODO: Recolocar isso se for necessário.
                        /* if (superClasse !== null) {
                            this.ambiente = this.ambiente.enclosing;
                        } */
                        this.pilhaEscoposExecucao.atribuirVariavel(declaracao.simbolo, deleguaClasse);
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Executa um acesso a método, normalmente de um objeto de classe.
     * @param expressao A expressão de acesso.
     * @returns O resultado da execução.
     */
    Interpretador.prototype.visitarExpressaoAcessoMetodo = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var variavelObjeto, objeto, metodoDePrimitivaTexto, metodoDePrimitivaVetor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.avaliar(expressao.objeto)];
                    case 1:
                        variavelObjeto = _a.sent();
                        objeto = variavelObjeto === null || variavelObjeto === void 0 ? void 0 : variavelObjeto.valor;
                        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
                            return [2 /*return*/, objeto.get(expressao.simbolo) || null];
                        }
                        if (objeto.constructor === Object) {
                            return [2 /*return*/, objeto[expressao.simbolo.lexema] || null];
                        }
                        if (objeto instanceof estruturas_1.DeleguaModulo) {
                            return [2 /*return*/, objeto.componentes[expressao.simbolo.lexema] || null];
                        }
                        switch (variavelObjeto.tipo) {
                            case 'texto':
                                metodoDePrimitivaTexto = primitivas_texto_1.default[expressao.simbolo.lexema];
                                if (metodoDePrimitivaTexto) {
                                    return [2 /*return*/, new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaTexto)];
                                }
                                break;
                            case 'vetor':
                                metodoDePrimitivaVetor = primitivas_vetor_1.default[expressao.simbolo.lexema];
                                if (metodoDePrimitivaVetor) {
                                    return [2 /*return*/, new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaVetor)];
                                }
                                break;
                        }
                        return [2 /*return*/, Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha))];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoIsto = function (expressao) {
        return this.procurarVariavel(expressao.palavraChave);
    };
    Interpretador.prototype.visitarExpressaoDicionario = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var dicionario, i, promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dicionario = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < expressao.chaves.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all([
                                this.avaliar(expressao.chaves[i]),
                                this.avaliar(expressao.valores[i])
                            ])];
                    case 2:
                        promises = _a.sent();
                        dicionario[promises[0]] = promises[1];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, dicionario];
                }
            });
        });
    };
    Interpretador.prototype.visitarExpressaoVetor = function (expressao) {
        return __awaiter(this, void 0, void 0, function () {
            var valores, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        valores = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < expressao.valores.length)) return [3 /*break*/, 4];
                        _b = (_a = valores).push;
                        return [4 /*yield*/, this.avaliar(expressao.valores[i])];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, valores];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, declaracao.aceitar(this)];
                    case 1:
                        resultado = _a.sent();
                        if (mostrarResultado) {
                            this.funcaoDeRetorno(this.paraTexto(resultado));
                        }
                        if (resultado || typeof resultado === 'boolean') {
                            this.resultadoInterpretador.push(this.paraTexto(resultado));
                        }
                        return [2 /*return*/, resultado];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var ultimoEscopo, retornoExecucao, erro_10, escopoAnterior;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 8]);
                        retornoExecucao = void 0;
                        _a.label = 2;
                    case 2:
                        if (!(!(retornoExecucao instanceof quebras_1.Quebra) &&
                            ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual])];
                    case 3:
                        retornoExecucao = _a.sent();
                        _a.label = 4;
                    case 4:
                        ultimoEscopo.declaracaoAtual++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, retornoExecucao];
                    case 6:
                        erro_10 = _a.sent();
                        return [2 /*return*/, Promise.reject(erro_10)];
                    case 7:
                        this.pilhaEscoposExecucao.removerUltimo();
                        if (manterAmbiente) {
                            escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                            escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
                        }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var escopoExecucao, inicioInterpretacao, retornoOuErro, erro_11, deltaInterpretacao, retorno;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.erros = [];
                        escopoExecucao = {
                            declaracoes: declaracoes,
                            declaracaoAtual: 0,
                            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
                        };
                        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
                        inicioInterpretacao = (0, browser_process_hrtime_1.default)();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.executarUltimoEscopo(manterAmbiente)];
                    case 2:
                        retornoOuErro = _a.sent();
                        if (retornoOuErro instanceof excecoes_1.ErroEmTempoDeExecucao) {
                            this.erros.push(retornoOuErro);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        erro_11 = _a.sent();
                        this.erros.push(erro_11);
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.performance) {
                            deltaInterpretacao = (0, browser_process_hrtime_1.default)(inicioInterpretacao);
                            console.log("[Interpretador] Tempo para interpreta\u00E7ao: ".concat(deltaInterpretacao[0] * 1e9 + deltaInterpretacao[1], "ns"));
                        }
                        retorno = {
                            erros: this.erros,
                            resultado: this.resultadoInterpretador,
                        };
                        this.resultadoInterpretador = [];
                        return [2 /*return*/, retorno];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Interpretador;
}());
exports.Interpretador = Interpretador;

},{"../bibliotecas/biblioteca-global":15,"../bibliotecas/importar-biblioteca":16,"../bibliotecas/primitivas-texto":17,"../bibliotecas/primitivas-vetor":18,"../espaco-variaveis":57,"../estruturas":63,"../estruturas/metodo-primitiva":64,"../excecoes":69,"../quebras":80,"../tipos-de-simbolos/delegua":81,"./inferenciador":73,"./pilha-escopos-execucao":75,"browser-process-hrtime":82,"path":84}],75:[function(require,module,exports){
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

},{"../estruturas":63,"../excecoes":69,"../lexador":76,"./inferenciador":73}],76:[function(require,module,exports){
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

},{"./lexador":77,"./simbolo":79}],77:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexador = void 0;
var browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
var simbolo_1 = require("./simbolo");
var palavras_reservadas_1 = __importDefault(require("./palavras-reservadas"));
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
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

},{"../tipos-de-simbolos/delegua":81,"./palavras-reservadas":78,"./simbolo":79,"browser-process-hrtime":82}],78:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
exports.default = {
    e: delegua_1.default.E,
    em: delegua_1.default.EM,
    caso: delegua_1.default.CASO,
    classe: delegua_1.default.CLASSE,
    continua: delegua_1.default.CONTINUA,
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
    senaose: delegua_1.default.SENAOSE,
    senãose: delegua_1.default.SENÃOSE,
    senao: delegua_1.default.SENAO,
    senão: delegua_1.default.SENÃO,
    super: delegua_1.default.SUPER,
    tente: delegua_1.default.TENTE,
    var: delegua_1.default.VARIAVEL,
    verdadeiro: delegua_1.default.VERDADEIRO
};

},{"../tipos-de-simbolos/delegua":81}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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
    SENAOSE: 'SENAOSE',
    SENÃOSE: 'SENÃOSE',
    SUPER: 'SUPER',
    SUSTAR: 'SUSTAR',
    TENTE: 'TENTE',
    TEXTO: 'TEXTO',
    VARIAVEL: 'VARIAVEL',
    VERDADEIRO: 'VERDADEIRO',
    VIRGULA: 'VIRGULA',
};

},{}],82:[function(require,module,exports){
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
},{"_process":85}],83:[function(require,module,exports){

},{}],84:[function(require,module,exports){
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
},{"_process":85}],85:[function(require,module,exports){
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
