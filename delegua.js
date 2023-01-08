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

},{"@designliquido/delegua-matematica":8,"@designliquido/delegua/fontes/avaliador-sintatico":14,"@designliquido/delegua/fontes/estruturas":65,"@designliquido/delegua/fontes/interpretador":74,"@designliquido/delegua/fontes/lexador":78,"@designliquido/delegua/fontes/tipos-de-simbolos/delegua":83}],2:[function(require,module,exports){
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
        // TODO: `senãose` não existe na língua portuguesa, e a forma separada, `senão se`,
        // funciona do jeito que deveria.
        // Marcando este código para ser removido em versões futuras.
        /* while (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.SENAOSE, tiposDeSimbolos.SENÃOSE)) {
            this.consumir(tiposDeSimbolos.PARENTESE_ESQUERDO, "Esperado '(' após 'senaose' ou 'senãose'.");
            const condicaoSeSenao = this.expressao();
            this.consumir(tiposDeSimbolos.PARENTESE_DIREITO, "Esperado ')' após codição do 'senaose' ou 'senãose'.");

            const caminho = this.resolverDeclaracao();

            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        } */
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
                blocoPegue = this.corpoDaFuncao("bloco `pegue`");
            }
            else {
                // Caso 2: sem parâmetro de erro.
                const simboloBlocoPegue = this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
                blocoPegue = new construtos_1.FuncaoConstruto(this.hashArquivo, Number(simboloBlocoPegue.linha), null, this.blocoEscopo());
            }
        }
        let blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            blocoSenao = this.blocoEscopo();
        }
        let blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FINALMENTE)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
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

},{"../construtos":31,"../declaracoes":51,"../tipos-de-simbolos/delegua":83,"./erro-avaliador-sintatico":13,"browser-process-hrtime":84}],13:[function(require,module,exports){
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processoFilho = __importStar(require("child_process"));
const caminho = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
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
    let arquivoInicio = JSON.parse(fs_1.default.readFileSync(caminhoAbsoluto, 'utf-8')).main || 'index.js';
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
const verificaModulosDelegua = (nome) => {
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
    const nomeBibliotecaResolvido = verificaModulosDelegua(nome);
    return nomeBibliotecaResolvido
        ? carregarBibliotecaDelegua(String(nomeBibliotecaResolvido))
        : await carregarBiblioteca(nome, nome);
}
exports.default = default_1;

}).call(this)}).call(this,require('_process'))
},{"../estruturas/classe-padrao":61,"../estruturas/funcao-padrao":64,"../estruturas/modulo":67,"../excecoes":71,"_process":87,"child_process":85,"fs":85,"path":86}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    inclui: (texto, elemento) => texto.includes(elemento),
    minusculo: (texto) => texto.toLowerCase(),
    maiusculo: (texto) => texto.toUpperCase(),
    substituir: (texto, elemento, substituto) => texto.replace(elemento, substituto),
    subtexto: (texto, inicio, fim) => texto.slice(inicio, fim),
    fatiar: (texto, inicio, fim) => texto.slice(inicio, fim),
    dividir: (texto, divisor, limite) => [
        ...texto.split(divisor, limite),
    ],
    tamanho: (texto) => texto.length
};

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    inclui: (vetor, elemento) => vetor.includes(elemento),
    juntar: (vetor, separador) => vetor.join(separador),
    removerUltimo: (vetor) => {
        vetor.pop();
        return vetor;
    },
    removerPrimeiro: (vetor) => {
        vetor.shift();
        return vetor;
    },
    empilhar: (vetor, elemento) => {
        vetor.push(elemento);
        return vetor;
    },
    adicionar: (vetor, elemento) => {
        vetor.push(elemento);
        return vetor;
    },
    inverter: (vetor) => vetor.reverse(),
    fatiar: (vetor, inicio, fim) => vetor.slice(inicio, fim),
    ordenar: (vetor) => vetor.sort(),
    somar: (vetor) => vetor.reduce((a, b) => a + b),
    remover: (vetor, elemento) => {
        const index = vetor.indexOf(elemento);
        if (index !== -1)
            vetor.splice(index, 1);
        return vetor;
    },
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
        try {
            let sucesso = true;
            try {
                await this.executarBloco(declaracao.caminhoTente);
            }
            catch (erro) {
                sucesso = false;
                if (declaracao.caminhoPegue !== null) {
                    const literalErro = new construtos_1.Literal(declaracao.hashArquivo, Number(declaracao.linha), erro.mensagem);
                    const chamadaPegue = new construtos_1.Chamada(declaracao.caminhoPegue.hashArquivo, declaracao.caminhoPegue, null, [literalErro]);
                    await chamadaPegue.aceitar(this);
                }
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                await this.executarBloco(declaracao.caminhoFinalmente);
        }
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
            this.erros.push(erro);
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
},{"../bibliotecas/biblioteca-global":15,"../bibliotecas/importar-biblioteca":16,"../bibliotecas/primitivas-texto":17,"../bibliotecas/primitivas-vetor":18,"../construtos":31,"../espaco-variaveis":59,"../estruturas":65,"../estruturas/metodo-primitiva":66,"../excecoes":71,"../quebras":82,"../tipos-de-simbolos/delegua":83,"./inferenciador":75,"./pilha-escopos-execucao":77,"_process":87,"browser-process-hrtime":84,"path":86}],77:[function(require,module,exports){
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
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            // TODO: Testar se isso faz sentido.
            const vetorObjeto = Object.entries(ambiente).map((chave, valor) => ({ valor: valor, tipo: 'texto' }));
            todasVariaveis.concat(vetorObjeto);
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

},{"../tipos-de-simbolos/delegua":83,"./palavras-reservadas":80,"./simbolo":81,"browser-process-hrtime":84}],80:[function(require,module,exports){
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
},{"_process":87}],85:[function(require,module,exports){

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

},{}]},{},[1])(1)
});
