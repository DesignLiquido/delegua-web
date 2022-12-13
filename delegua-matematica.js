(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DeleguaMatematica = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
__exportStar(require("@designliquido/delegua-matematica/algebra-linear"), exports);
__exportStar(require("@designliquido/delegua-matematica/calculo-diferencial-integral"), exports);
__exportStar(require("@designliquido/delegua-matematica/financeira"), exports);
__exportStar(require("@designliquido/delegua-matematica/funcao-primeiro-grau"), exports);
__exportStar(require("@designliquido/delegua-matematica/funcoes-algebricas"), exports);
__exportStar(require("@designliquido/delegua-matematica/geometria-plana"), exports);
__exportStar(require("@designliquido/delegua-matematica/miscelanea"), exports);
__exportStar(require("@designliquido/delegua-matematica/trigonometria"), exports);

},{"@designliquido/delegua-matematica/algebra-linear":2,"@designliquido/delegua-matematica/calculo-diferencial-integral":3,"@designliquido/delegua-matematica/financeira":4,"@designliquido/delegua-matematica/funcao-primeiro-grau":5,"@designliquido/delegua-matematica/funcoes-algebricas":6,"@designliquido/delegua-matematica/geometria-plana":7,"@designliquido/delegua-matematica/miscelanea":8,"@designliquido/delegua-matematica/trigonometria":9}],2:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
