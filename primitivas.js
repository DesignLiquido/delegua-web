(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PrimitivasDelegua = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metodos_biblioteca_global_1 = require("./metodos-biblioteca-global");
const primitivas_dicionario_1 = require("./primitivas-dicionario");
const primitivas_numero_1 = require("./primitivas-numero");
const primitivas_texto_1 = require("./primitivas-texto");
const primitivas_vetor_1 = require("./primitivas-vetor");
const ordenarPrimitivaPorNome = (a, b) => {
    const nome1 = a.nome.toUpperCase();
    const nome2 = b.nome.toUpperCase();
    if (nome1 > nome2)
        return 1;
    else if (nome1 < nome2)
        return -1;
    return 0;
};
const primitivas = [
    ...primitivas_dicionario_1.primitivasDicionario,
    ...primitivas_numero_1.primitivasNumero,
    ...primitivas_texto_1.primitivasTexto,
    ...primitivas_vetor_1.primitivasVetor,
    ...metodos_biblioteca_global_1.metodosBibliotecaGlobal
].sort(ordenarPrimitivaPorNome);
// Registro global
globalThis.primitivas = primitivas;

},{"./metodos-biblioteca-global":2,"./primitivas-dicionario":3,"./primitivas-numero":4,"./primitivas-texto":5,"./primitivas-vetor":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodosBibliotecaGlobal = void 0;
exports.metodosBibliotecaGlobal = [
    {
        nome: 'aleatorio',
        documentacao: '### Descrição \n \n' +
            'Retorna um número aleatório entre 0 e 1.' +
            '\n\n ### Exemplo de Códig  o ' +
            '\n    var numeroAleatorio = aleatorio();    ' +
            '\n    escreva(numeroAleatorio);    ' +
            '\n    // 0.8540051495195808    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'aleatorio()'
    },
    {
        nome: 'aleatorioEntre',
        documentacao: '### Descrição \n \n' +
            'Retorna um número inteiro aleatório entre os valores passados para a função.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var numeroAleatorio = aleatorioEntre(1, 9);    ' +
            '\n    escreva(numeroAleatorio); // Retornará um valor entre 1 e 8.    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'aleatorioEntre(numero minimo, numero maximo)'
    },
    {
        nome: 'escreva',
        documentacao: 'Escreve um ou mais argumentos na saída padrão da aplicação. \n' +
            '## Interpolação \n' +
            'Delégua suporta interpolação de variáveis: \n \n' +
            '    var comidaFavorita = \'strogonoff\'     \n' +
            '    escreva("Minha comida favorita é ${comidaFavorita}")     ',
        exemploCodigo: 'função escreva(...argumentos)'
    },
    {
        nome: 'filtrarPor',
        documentacao: '### Descrição \n \n' +
            'Retorna uma lista de elementos filtrados de um vetor.' +
            '\n\n ### Exemplo de Código ' +
            '\n    javascript var listaDeIdades = [91, 32, 15, 44, 12, 18, 101];     ' +
            '\n    funcao checarIdade(idade) { retorna(idade >= 18); }    ' +
            '\n    escreva(filtrarPor(listaDeIdades, checarIdade)); // [91, 32, 44, 18, 101]     ' +
            +'\n\n     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'filtrarPor(meuVetor, minhaFuncaoParaValidar)'
    },
    {
        nome: 'inteiro',
        documentacao: '### Descrição \n \n' +
            'Converte um número flutuante ou texto, que não apresente letras, em um número inteiro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var testeTexto = "111";    ' +
            '\n    escreva(111 + inteiro(testeTexto));    ' +
            '\n    // 222    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'inteiro("123")'
    },
    {
        nome: 'numero',
        assinaturas: [
            {
                formato: 'numero(valor: inteiro ou texto)',
                parametros: [
                    {
                        nome: 'valor',
                        documentacao: 'O valor a ser convertido em número (real, ou com porção decimal).'
                    }
                ]
            }
        ],
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro, ou texto, que não apresente letras, em um número com porção decimal.' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar testeTexto = "111.11";' +
            '\n\nescreva(111 + numero(testeTexto)); // 222.11\n```' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'função numero("123.45")',
    },
    {
        nome: 'número',
        assinaturas: [
            {
                formato: 'número(valor: inteiro ou texto)',
                parametros: [
                    {
                        nome: 'valor',
                        documentacao: 'O valor a ser convertido em número (real, ou com porção decimal).'
                    }
                ]
            }
        ],
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro, ou texto, que não apresente letras, em um número com porção decimal.' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar testeTexto = "111.11";' +
            '\n\nescreva(111 + número(testeTexto)); // 222.11\n```' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'função número("123.45")',
    },
    {
        nome: 'real',
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro ou texto, que não apresente letras, em um número flutuante.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var testeTexto = "504.69";    ' +
            '\n    escreva(0.01 + real(testeTexto));    ' +
            '\n    // 504.7    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'real(texto)'
    },
    {
        nome: 'texto',
        documentacao: '### Descrição \n \n' +
            'Transforma números flutuantes ou inteiros em texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    texto(7)    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto(1234)'
    },
];

},{}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasDicionario = void 0;
const primitivas_dicionario_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-dicionario"));
exports.primitivasDicionario = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_dicionario_1.default)) {
    exports.primitivasDicionario.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}

},{"@designliquido/delegua/bibliotecas/primitivas-dicionario":7}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasNumero = void 0;
const primitivas_numero_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-numero"));
exports.primitivasNumero = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_numero_1.default)) {
    exports.primitivasNumero.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}

},{"@designliquido/delegua/bibliotecas/primitivas-numero":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasTexto = void 0;
exports.primitivasTexto = [
    {
        nome: 'aparar',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.aparar() + "|") // "|meu texto com espaços no início e no fim|"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.aparar()'
    },
    {
        nome: 'apararFim',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.apararFim() + "|") // "|   meu texto com espaços no início e no fim|"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.apararFim()'
    },
    {
        nome: 'apararInicio',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.apararInicio() + "|") // "|meu texto com espaços no início e no fim       |"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.apararInicio()'
    },
    {
        nome: 'concatenar',
        documentacao: '### Descrição \n \n' +
            'Realiza a junção de palavras/textos.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t1 = "um"     ' +
            '\n    var t2 = "dois três"    ' +
            '\n    escreva(t1.concatenar(t2)) // "umdois três"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.concatenar(Outro texto)'
    },
    {
        nome: 'dividir',
        documentacao: '### Descrição \n \n' +
            'Divide o texto pelo separador passado como parâmetro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "um dois três"    ' +
            '\n    t.dividir(\' \') // [\'um\',\'dois\',\'três\']    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.dividir(\'<delimitador (, ; \' \')>\')'
    },
    {
        nome: 'fatiar',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ### Exemplo de Código ' +
            '    var t = "Um dois três quatro"    ' +
            '\n    t.fatiar() // "um dois três quatro", ou seja, não faz coisa alguma.    ' +
            '\n    t.fatiar(2, 7) // "dois"    ' +
            '\n    t.fatiar(8, 12) // "três"    ' +
            '\n    t.fatiar(8) // "três quatro", ou seja, seleciona tudo da posição 8 até o final do texto.    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.fatiar(início,final)' +
            '\n    texto.fatiar(a partir da posicao)    '
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição \n \n' +
            'Devolve verdadeiro se elemento passado por parâmetro está contido no texto, e falso em caso contrário.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "um dois três"    ' +
            '\n    t.inclui("dois") // verdadeiro    ' +
            '\n    t.inclui("quatro") // falso    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.inclui(\'palavra\')'
    },
    {
        nome: 'maiusculo',
        documentacao: '### Descrição \n \n' +
            'Converte todos os caracteres alfabéticos para maiúsculas.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "tudo em minúsculo"    ' +
            '\n    escreva(t.maiusculo()) // "TUDO EM MINÚSCULO"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.maiusculo()'
    },
    {
        nome: 'minusculo',
        documentacao: '### Descrição \n \n' +
            'Converte todos os caracteres alfabéticos para minúsculas.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "TUDO EM MAIÚSCULO"    ' +
            '\n    escreva(t.minusculo()) // "tudo em maiúsculo"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.minusculo()'
    },
    {
        nome: 'substituir',
        documentacao: '### Descrição \n \n' +
            'Substitui a primeira ocorrência no texto do primeiro parâmetro pelo segundo parâmetro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Eu gosto de caju"    ' +
            '\n    t.substituir("caju", "graviola") // Resultado será "Eu gosto de graviola"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.substituir(\'palavra a ser substituída\', \'nova palavra\')'
    },
    {
        nome: 'subtexto',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Eu gosto de caju e de graviola"    ' +
            '\n    t.subtexto(3, 16) // Resultado será "gosto de caju"    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.subtexto(posição inicial, posição final)'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição \n \n' +
            'Devolve um número inteiro com o número de caracteres do texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Um dois três quatro"    ' +
            '\n    t.tamanho() // 19    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto.tamanho()'
    },
];

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasVetor = void 0;
exports.primitivasVetor = [
    {
        nome: 'mapear',
        documentacao: 'Percorre um vetor executando uma função para cada item desse mesmo vetor.',
        exemploCodigo: null
    },
    {
        nome: 'adicionar',
        documentacao: '### Descrição \n \n' +
            'Escreve um ou mais argumentos na saída padrão da aplicação.' +
            '\n\n ### Exemplo de Código ' +
            '\n    v.adicionar(7)    ' +
            '\n    v.adicionar(5)    ' +
            '\n    v.adicionar(3)    ' +
            '\n    escreva(v) // [7, 5, 3]    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.adicionar(elemento)'
    },
    {
        nome: 'concatenar',
        documentacao: '### Descrição \n \n' +
            'Adiciona ao conteúdo do vetor um ou mais elementos' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [7, 5, 3]    ' +
            '\n    escreva(v.concatenar([1, 2, 4])) // [7, 5, 3, 1, 2, 4]    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.concatenar(...argumentos)'
    },
    {
        nome: 'empilhar',
        documentacao: '### Descrição \n \n' +
            'Adiciona um elemento ao final do vetor.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = []     ' +
            '\n    v.empilhar(7)    ' +
            '\n    v.empilhar(5)    ' +
            '\n    v.empilhar(3)    ' +
            '\n    escreva(v) // [7, 5, 3]     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.empilhar(conteúdo)'
    },
    {
        nome: 'fatiar',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do vetor, dadas posições de início e fim. \n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3, 4, 5]     ' +
            '\n    escreva(v.fatiar()) // "[1, 2, 3, 4, 5]", ou seja, não faz coisa alguma.     ' +
            '\n    escreva(v.fatiar(2, 4)) // "[3, 4]"    ' +
            '\n    escreva(v.fatiar(2)) // "[3, 4, 5]", ou seja, seleciona tudo da posição 3 até o final do vetor.     ' +
            '\n \n ### Formas de uso  \n' +
            'Fatiar suporta sobrecarga do método\n \n',
        exemploCodigo: 'vetor.fatiar(a partir desta posicao)\n\n' +
            '    vetor.fatiar(a partir desta posicao, ate esta posicao)    '
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do vetor, dadas posições de início e fim. \n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3]    ' +
            '\n    escreva(v.inclui(2)) // verdadeiro    ' +
            '\n    escreva(v.inclui(4)) // falso    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.inclui(elemento)'
    },
    {
        nome: 'inverter',
        documentacao: '### Descrição \n \n' +
            'Inverte a ordem dos elementos de um vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3]     ' +
            '\n    escreva(v.inverter()) // [3, 2, 1]     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.inverter()'
    },
    {
        nome: 'ordenar',
        documentacao: '### Descrição \n \n' +
            'Ordena valores em ordem crescente. Esta função só aceita vetores.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    // A ordenação padrão é ascendente, ou seja, para o caso de números, a ordem fica do menor para o maior.    ' +
            '\n    var v = [4, 2, 12, 5]     ' +
            '\n    escreva(v.ordenar()) // [2, 4, 5, 12]     ' +
            '\n    // Para o caso de textos, a ordenação é feita em ordem alfabética, caractere a caractere.    ' +
            '\n    var v = ["aaa", "a", "aba", "abb", "abc"]    ' +
            '\n    escreva(v.ordenar()) // ["a", "aaa", "aba", "abb", "abc"]    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.ordenar()'
    },
    {
        nome: 'remover',
        documentacao: '### Descrição \n \n' +
            'Remove um elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]     ' +
            '\n    vetor.remover(2)     ' +
            '\n    escreva(vetor) // [1, 3]     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.remover(elemento)'
    },
    {
        nome: 'removerPrimeiro',
        documentacao: '### Descrição \n \n' +
            'Remove o primeiro elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]    ' +
            '\n    var primeiroElemento = vetor.removerPrimeiro()    ' +
            '\n    escreva(primeiroElemento) // 1    ' +
            '\n    escreva(vetor) // [2, 3]    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.removerPrimeiro()'
    },
    {
        nome: 'removerUltimo',
        documentacao: '### Descrição \n \n' +
            'Remove o último elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]    ' +
            '\n    var ultimoElemento = vetor.removerUltimo()    ' +
            '\n    escreva(ultimoElemento) // 3    ' +
            '\n    escreva(vetor) // [1, 2]    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.removerUltimo()'
    },
    {
        nome: 'somar',
        documentacao: '### Descrição \n \n' +
            'Soma ou concatena todos os elementos do vetor (de acordo com o tipo de dados desses elementos) e retorna o resultado.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3, 4, 5]    ' +
            '\n    escreva(vetor.somar()) // 15      ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.somar()'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição \n \n' +
            'Retorna o número de elementos que compõem o vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [0, 1, 2, 3, 4]     ' +
            '\n    escreva(vetor.tamanho()) // 5     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.tamanho()'
    },
    {
        nome: 'juntar',
        documentacao: '### Descrição \n \n' +
            'Junta os elementos de um vetor em um literal de texto, separando os elementos pelo separados passado como parâmetro.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [\'maçã\', \'laranja\', \'banana\', \'morango\']     ' +
            '\n    escreva(vetor.juntar(\', \')) // maçã, laranja, banana, morango      ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'vetor.juntar(separador)'
    },
];

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const construtos_1 = require("../construtos");
const informacao_elemento_sintatico_1 = require("../informacao-elemento-sintatico");
const contemComum = (nome) => {
    return {
        tipoRetorno: 'lógico',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('chave', 'qualquer', true, [], 'O elemento como chave do dicionário.'),
        ],
        implementacao: (interpretador, nomePrimitiva, valor, chave) => Promise.resolve(chave in valor),
        assinaturaFormato: `dicionário.${nome}(chave: qualquer)`,
        documentacao: `# \`dicionário.${nome}(chave)\`\n\n` +
            'Retorna verdadeiro se o elemento passado como parâmetro existe como chave do dicionário. Devolve falso em caso contrário.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var d = {"a": 1, "b": 2, "c": 3}\n' +
            `escreva(d.${nome}("a")) // verdadeiro\n` +
            `escreva(d.${nome}("f")) // falso\n\`\`\`` +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'dicionário.contem("minhaChave")',
    };
};
exports.default = {
    chaves: {
        tipoRetorno: 'texto[]',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Object.keys(valor));
        },
        assinaturaFormato: 'dicionário.chaves()',
        documentacao: '# `dicionário.chaves()`\n\n' +
            'Retorna um vetor de texto com todas as chaves de um dicionário.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var d = {"a": 1, "b": 2, "c": 3}\n' +
            'escreva(d.chaves()) // ["a", "b", "c"]\n```' +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'dicionário.chaves()',
    },
    contem: contemComum('contem'),
    contém: contemComum('contém'),
    itens: {
        tipoRetorno: 'Dupla[]',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            const hashArquivo = interpretador.hashArquivoDeclaracaoAtual;
            const linha = interpretador.linhaDeclaracaoAtual;
            const pares = Object.entries(valor).map(([chave, valor]) => {
                return new construtos_1.Dupla(new construtos_1.Literal(hashArquivo, linha, chave, 'texto'), new construtos_1.Literal(hashArquivo, linha, valor, 'qualquer'));
            });
            return Promise.resolve(pares);
        },
        assinaturaFormato: 'dicionário.itens()',
        documentacao: '# `dicionário.itens()`\n\n' +
            'Retorna um vetor contendo tuplas, sendo o primeiro valor a chave do dicionário, e o segundo valor o valor correspondente no dicionário. ' +
            'Funciona de maneira semelhante às funções `entries()` de JavaScript, e `items()` da linguagem Python.\n' +
            '\n\n## Exemplo de Código\n' +
            '\n```delegua\n' +
            'var d = {"a": 1, "b": 2, "c": 3}\n' +
            'escreva(d.itens())\n' +
            '// [[("a", 1)], [("b", 2)], [("c", 3)]]\n' +
            '```\n\n' +
            '## Formas de uso\n',
        exemploCodigo: 'dicionário.itens()',
    },
    remover: {
        tipoRetorno: 'lógico',
        argumentos: [new informacao_elemento_sintatico_1.InformacaoElementoSintatico('chave', 'texto')],
        implementacao: (interpretador, nomePrimitiva, valor, chave) => Promise.resolve(delete valor[chave]),
        assinaturaFormato: `dicionário.remover(chave: qualquer)`,
    },
    valores: {
        tipoRetorno: '<T>[]',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Object.values(valor));
        },
    }
};

},{"../construtos":36,"../informacao-elemento-sintatico":65}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const informacao_elemento_sintatico_1 = require("../informacao-elemento-sintatico");
exports.default = {
    absoluto: {
        tipoRetorno: 'número',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Math.abs(valor));
        },
        assinaturaFormato: 'número.absoluto()',
        documentacao: '# `número.absoluto()`\n\n' +
            'Retorna a versão absoluta de um número, ou seja, seu valor sem sinal.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var n = -5\n' +
            'escreva(n.absoluto()) // 5\n```' +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'numero.absoluto()',
    },
    arredondarParaBaixo: {
        tipoRetorno: 'número',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Math.floor(valor));
        },
        assinaturaFormato: 'número.arredondarParaBaixo()',
        documentacao: '# `número.arredondarParaBaixo()`\n\n' +
            'Retira as partes decimais de um número com partes decimais e retorna sua parte inteira. Se o número já é inteiro, devolve apenas o próprio número.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var n = 2.5\n' +
            'escreva(n.arredondarParaBaixo()) // 2\n```' +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'numero.arredondarParaBaixo()',
    },
    arredondarParaCima: {
        tipoRetorno: 'número',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Math.ceil(valor));
        },
        assinaturaFormato: 'número.arredondarParaCima()',
        documentacao: '# `número.arredondarParaCima()`\n\n' +
            'Arredonda um número com partes decimais para cima, ou seja, para o próximo número inteiro.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var n = 2.5\n' +
            'escreva(n.arredondarParaCima()) // 3\n```' +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'numero.arredondarParaCima()',
    },
    formatar: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('opcoesFormatacao', 'dicionário', false, [], 'Dicionário com opções de formatação, como número de casas decimais.'),
        ],
        implementacao: (interpretador, nomePrimitiva, valor, opcoes) => {
            let minimoCasasDecimais = 2;
            if (opcoes && opcoes.casasDecimais !== undefined) {
                minimoCasasDecimais = opcoes.casasDecimais;
            }
            let maximoCasasDecimais = 2;
            if (opcoes && opcoes.maximoCasasDecimais !== undefined) {
                maximoCasasDecimais = opcoes.maximoCasasDecimais;
            }
            return Promise.resolve(valor.toLocaleString('pt-BR', {
                minimumFractionDigits: minimoCasasDecimais,
                maximumFractionDigits: maximoCasasDecimais,
            }));
        },
        assinaturaFormato: 'número.formatar(opcoesFormatacao)',
        documentacao: '# `número.formatar(opcoesFormatacao)`\n\n' +
            'Formata um número para o padrão brasileiro, com separador de milhar e vírgula como separador decimal.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n' +
            'var n = 1234.56\n' +
            'escreva(n.formatar()) // 1.234,56\n' +
            'escreva(n.formatar({ minimoCasasDecimais: 2, maximoCasasDecimais: 3 })) // 1.234,568\n```' +
            '\n\n## Formas de uso\n',
        exemploCodigo: 'numero.formatar({ maximoCasasDecimais: 2 })',
    },
};

},{"../informacao-elemento-sintatico":65}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoElementoMatriz = void 0;
class AcessoElementoMatriz {
    constructor(hashArquivo, entidadeChamada, indicePrimario, indiceSegundario, simboloFechamento) {
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.indicePrimario = indicePrimario;
        this.indiceSecundario = indiceSegundario;
        this.simboloFechamento = simboloFechamento;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoElementoMatriz(this);
    }
    paraTexto() {
        return (`<acesso-elemento-matriz entidadeChamada=${this.entidadeChamada.paraTexto()} ` +
            `indicePrimário=${this.indicePrimario.paraTexto()} ` +
            `indiceSecundário=${this.indiceSecundario.paraTexto()} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoElementoMatriz = AcessoElementoMatriz;

},{}],10:[function(require,module,exports){
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
    paraTexto() {
        return (`<acesso-índice-variável entidadeChamada=${this.entidadeChamada.paraTexto()} ` +
            `índice=${this.indice.paraTexto()} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoIndiceVariavel = AcessoIndiceVariavel;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoMetodoOuPropriedade = void 0;
/**
 * Chamado de `Get` em Égua Clássico, é o construto de acesso a métodos ou membros de
 * classe. Foi usado por Delégua até a versão 0.38.4, em que uma especialização maior
 * de tipos é necessária para o correto funcionamento da compilação por LLVM. Os demais
 * dialetos ainda a usam sem problemas.
 */
class AcessoMetodoOuPropriedade {
    constructor(hashArquivo, objeto, simbolo, tipo = 'qualquer') {
        this.linha = objeto.linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.simbolo = simbolo;
        this.tipo = tipo || objeto.tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoMetodoOuPropriedade(this);
    }
    paraTexto() {
        return (`<acesso-método-ou-propriedade objeto=${this.objeto.paraTexto()} ` +
            `métodoOuPropriedade=${this.simbolo.lexema} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoMetodoOuPropriedade = AcessoMetodoOuPropriedade;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoMetodo = void 0;
class AcessoMetodo {
    constructor(hashArquivo, objeto, nomeMetodo, tipoRetornoMetodo = 'qualquer') {
        this.tipoRetornoMetodo = 'qualquer';
        this.linha = objeto.linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.nomeMetodo = nomeMetodo;
        this.tipoRetornoMetodo = tipoRetornoMetodo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoMetodo(this);
    }
    paraTexto() {
        return `<acesso-método objeto=${this.objeto.paraTexto()} método=${this.nomeMetodo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoMetodo = AcessoMetodo;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoPropriedade = void 0;
class AcessoPropriedade {
    constructor(hashArquivo, objeto, nomePropriedade, tipoRetornoPropriedade = 'qualquer') {
        this.linha = objeto.linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.nomePropriedade = nomePropriedade;
        this.tipoRetornoPropriedade = tipoRetornoPropriedade;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoPropriedade(this);
    }
    paraTexto() {
        return `<acesso-propriedade objeto=${this.objeto.paraTexto()} propriedade=${this.nomePropriedade} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoPropriedade = AcessoPropriedade;

},{}],14:[function(require,module,exports){
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
        this.tipo = expressao.tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAgrupamento(this);
    }
    paraTexto() {
        return `<agrupamento subExpressão=${this.expressao.paraTexto()} tipo=${this.tipo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Agrupamento = Agrupamento;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentoReferenciaFuncao = void 0;
/**
 * Este construto é emitido pelo Avaliador Sintático, e indica para as
 * próximas etapas que este elemento é uma referência de função, mas
 * que não pode ser resolvido em tempo de avaliação sintática.
 */
class ArgumentoReferenciaFuncao {
    constructor(hashArquivo, linha, simboloFuncao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.simboloFuncao = simboloFuncao;
    }
    async aceitar(visitante) {
        return visitante.visitarExpressaoArgumentoReferenciaFuncao(this);
    }
    paraTexto() {
        return `<argumento-referência-função nomeFunção=${this.simboloFuncao.lexema} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ArgumentoReferenciaFuncao = ArgumentoReferenciaFuncao;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoPorIndice = void 0;
class AtribuicaoPorIndice {
    constructor(hashArquivo, linha, objeto, indice, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.indice = indice;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAtribuicaoPorIndice(this);
    }
    paraTexto() {
        return (`<atribuição-por-índice objeto=${this.objeto.paraTexto()} ` +
            `índice=${this.indice.paraTexto()} ` +
            `valor=${this.valor.paraTexto()} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AtribuicaoPorIndice = AtribuicaoPorIndice;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoPorIndicesMatriz = void 0;
class AtribuicaoPorIndicesMatriz {
    constructor(hashArquivo, linha, objeto, indicePrimario, indiceSecundario, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.indicePrimario = indicePrimario;
        this.indiceSecundario = indiceSecundario;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAtribuicaoPorIndicesMatriz(this);
    }
    paraTexto() {
        return (`<atribuição-por-índices-matriz objeto=${this.objeto.paraTexto()} ` +
            `índice-primário=${this.indicePrimario.paraTexto()} ` +
            `índice-secundário=${this.indiceSecundario.paraTexto()} ` +
            `valor=${this.valor.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AtribuicaoPorIndicesMatriz = AtribuicaoPorIndicesMatriz;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
/**
 * Construto de atribuição de um valor a um símbolo.
 */
class Atribuir {
    constructor(hashArquivo, alvo, valor, 
    // indice so é usado para variaveis de vetores
    // TODO: criar alguma validaçao para garantir que `indice` só seja passado para variáveis de vetores
    indice, simboloOperador) {
        this.linha = Number(alvo.linha);
        this.hashArquivo = hashArquivo;
        this.alvo = alvo;
        this.valor = valor;
        if (indice !== undefined) {
            this.indice = indice;
        }
        if (simboloOperador !== undefined) {
            this.simboloOperador = simboloOperador;
        }
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDeAtribuicao(this);
    }
    paraTexto() {
        let indiceResolvido = 'índice=(não definido)';
        if (this.indice) {
            indiceResolvido = `índice=${this.indice.paraTexto()}`;
        }
        return `<atribuir alvo=${this.alvo.paraTexto()} ${indiceResolvido} valor=${this.valor.paraTexto()} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Atribuir = Atribuir;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binario = void 0;
/**
 * Binário é uma estrutura com um operador e dois operandos: esquerda e direita.
 * Implementa as seguintes operações para Delégua e todos os dialetos:
 *
 * - `+` (Adição);
 * - `-` (Subtração);
 * - `*` (Multiplicação);
 * - `/` (Divisão);
 * - `%` (Módulo);
 *
 * Algumas outras operações podem ser suportadas de dialeto para dialeto,
 * como por exemplo:
 *
 * - `+=` (Adição com Atribuição);
 * - `-=` (Subtração com Atribuição);
 * - `*=` (Multiplicação com Atribuição);
 * - `/=` (Divisão com Atribuição);
 * - `%=` (Módulo com Atribuição);
 * - `**` (Exponenciação);
 * - `::` (Concatenação);
 * - `\` (Divisão inteira).
 */
class Binario {
    constructor(hashArquivo, esquerda, operador, direita) {
        this.tipo = 'qualquer';
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
        this.tipo = this.deduzirTipo();
    }
    deduzirTipo() {
        if (['logico', 'lógico'].includes(this.esquerda.tipo) ||
            ['logico', 'lógico'].includes(this.direita.tipo)) {
            return 'lógico';
        }
        if (this.esquerda.tipo === 'texto' || this.direita.tipo === 'texto') {
            return 'texto';
        }
        if (this.esquerda.tipo === 'inteiro' && this.direita.tipo === 'inteiro') {
            return 'inteiro';
        }
        if (['numero', 'número'].includes(this.esquerda.tipo) ||
            ['numero', 'número'].includes(this.direita.tipo)) {
            return 'número';
        }
        return 'qualquer';
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoBinaria(this);
    }
    paraTexto() {
        return (`<binário esquerda=${this.esquerda.paraTexto()} operador=${this.operador.lexema} ` +
            `direita=${this.direita.paraTexto()} ` +
            `tipo=${this.tipo} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Binario = Binario;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamada = void 0;
const geracao_identificadores_1 = require("../geracao-identificadores");
/**
 * Chamada de funções, métodos, etc.
 */
class Chamada {
    constructor(hashArquivo, entidadeChamada, argumentos) {
        this.id = (0, geracao_identificadores_1.uuidv4)();
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDeChamada(this);
    }
    paraTexto() {
        // TODO: Argumentos
        return `<chamada entidadeChamada=${this.entidadeChamada.paraTexto()} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Chamada = Chamada;

},{"../geracao-identificadores":64}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioComoConstruto = void 0;
/**
 * Diferentemente da declaração de comentário, este construto ocorre
 * dentro de expressões, como por exemplo, em especificação de elementos de um vetor.
 */
class ComentarioComoConstruto {
    constructor(simboloComentario) {
        this.linha = simboloComentario.linha;
        this.hashArquivo = simboloComentario.hashArquivo;
        this.conteudo = simboloComentario.lexema || simboloComentario.literal || '';
        this.multilinha = simboloComentario.tipo === 'COMENTARIO_MULTILINHA';
    }
    aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoComentario(this));
    }
    paraTexto() {
        return `<comentário-como-construto conteúdo=${this.conteudo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ComentarioComoConstruto = ComentarioComoConstruto;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteLinguagem = void 0;
/**
 * Construto especial utilizado para especificar o tipo de
 * estruturas reservadas da linguagem.
 */
class ComponenteLinguagem {
    constructor(hashArquivo, simbolo) {
        this.hashArquivo = hashArquivo;
        this.linha = simbolo.linha;
        this.valor = simbolo.lexema;
    }
    aceitar(visitante) {
        throw new Error('Um componente de linguagem não tem método de visita.');
    }
    paraTexto() {
        return `<componente-linguagem valor=${this.valor} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ComponenteLinguagem = ComponenteLinguagem;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constante = void 0;
/**
 * O construto de constante.
 */
class Constante {
    constructor(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeVariavel(this));
    }
    paraTexto() {
        return `<constante nome=${this.simbolo.lexema} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Constante = Constante;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decorador = void 0;
/**
 * Um decorador é um construto especial que, em código, existe antes de uma declaração, e
 * na avaliação sintática, é colocado juntamente com a próxima declaração.
 */
class Decorador {
    constructor(hashArquivo, linha, nome, atributos) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.nome = nome;
        this.atributos = atributos;
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Este método não deveria ser chamado.'));
    }
    paraTexto() {
        // TODO: Atributos
        return `<decorador nome=${this.nome} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Decorador = Decorador;

},{}],26:[function(require,module,exports){
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
    paraTexto() {
        return `<definir-valor objeto=${this.objeto.paraTexto()} nome=${this.nome.lexema} valor=${this.valor} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.DefinirValor = DefinirValor;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
class Dicionario {
    constructor(hashArquivo, linha, chaves, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.chaves = chaves;
        this.valores = valores;
        this.tipo = 'dicionário';
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDicionario(this);
    }
    paraTexto() {
        return `<dicionário chaves=${this.chaves} valores=${this.valores} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Dicionario = Dicionario;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elvis = void 0;
class Elvis {
    constructor(hashArquivo, esquerda, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoElvis(this);
    }
    paraTexto() {
        return (`<elvis esquerda=${this.esquerda.paraTexto()} ` +
            `direita=${this.direita.paraTexto()} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Elvis = Elvis;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquantoComoConstruto = void 0;
class EnquantoComoConstruto {
    constructor(condicao, corpo) {
        this.hashArquivo = condicao.hashArquivo;
        this.linha = condicao.linha;
        this.condicao = condicao;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEnquanto(this);
    }
    paraTexto() {
        return `<enquanto-como-construto />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.EnquantoComoConstruto = EnquantoComoConstruto;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressaoRegular = void 0;
class ExpressaoRegular {
    constructor(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.valor = valor;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoExpressaoRegular(this));
    }
    paraTexto() {
        return `<expressão-regular valor=${this.valor} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ExpressaoRegular = ExpressaoRegular;

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FazerComoConstruto = void 0;
class FazerComoConstruto {
    constructor(hashArquivo, linha, caminhoFazer, condicaoEnquanto) {
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.caminhoFazer = caminhoFazer;
        this.condicaoEnquanto = condicaoEnquanto;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoFazer(this);
    }
    paraTexto() {
        return `<fazer-como-construto />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.FazerComoConstruto = FazerComoConstruto;

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FimPara = void 0;
/**
 * Construto especial para algumas linguagens como VisuAlg, que combina a
 * avaliação da condição de continuação com o incremento.
 *
 * No caso específico do VisuAlg, ao final da última execução do bloco `para`,
 * o incremento não deve acontecer.
 *
 * Considerando como o depurador executa, o efeito visualnusando apenas as
 * declarações já existentes causava umansérie de comportamentos estranhos.
 */
class FimPara {
    constructor(hashArquivo, linha, condicaoPara, blocoIncremento) {
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.condicaoPara = condicaoPara;
        this.incremento = blocoIncremento;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoFimPara(this);
    }
    paraTexto() {
        return `<fim-para condiçãoPara=${this.condicaoPara.paraTexto()} incremento=${this.incremento.paraTexto()} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.FimPara = FimPara;

},{}],33:[function(require,module,exports){
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
    paraTexto() {
        return `<formatação-escrita expressão=${this.expressao.paraTexto()} espaços=${this.espacos} casasDecimais=${this.casasDecimais} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.FormatacaoEscrita = FormatacaoEscrita;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoConstruto = void 0;
class FuncaoConstruto {
    constructor(hashArquivo, linha, parametros, corpo, tipoRetorno, tipoExplicito) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.corpo = corpo;
        this.tipo = tipoRetorno;
        this.tipoExplicito = tipoExplicito || false;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoFuncaoConstruto(this));
    }
    paraTexto() {
        // TODO: Corpo.
        return `<construto-função parâmetros=${this.parametros} tipoRetorno=${this.tipo} tipoExplícito=${this.tipoExplicito ? 'Sim' : 'Não'} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.FuncaoConstruto = FuncaoConstruto;

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportarComoConstruto = void 0;
/**
 * Expressão usada para importação resolvida em tempo de execução.
 * Implementa a primeira forma de importação, também conhecida como importação dinâmica.
 */
class ImportarComoConstruto {
    constructor(caminho) {
        this.hashArquivo = caminho.hashArquivo;
        this.linha = caminho.linha;
        this.caminho = caminho;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoImportar(this);
    }
    paraTexto() {
        return `<importar-como-construto caminho=${this.caminho.valor} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ImportarComoConstruto = ImportarComoConstruto;

},{}],36:[function(require,module,exports){
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
__exportStar(require("./acesso-elemento-matriz"), exports);
__exportStar(require("./acesso-indice-variavel"), exports);
__exportStar(require("./acesso-metodo"), exports);
__exportStar(require("./acesso-metodo-ou-propriedade"), exports);
__exportStar(require("./acesso-propriedade"), exports);
__exportStar(require("./agrupamento"), exports);
__exportStar(require("./argumento-referencia-funcao"), exports);
__exportStar(require("./atribuicao-por-indice"), exports);
__exportStar(require("./atribuicao-por-indices-matriz"), exports);
__exportStar(require("./atribuir"), exports);
__exportStar(require("./binario"), exports);
__exportStar(require("./chamada"), exports);
__exportStar(require("./comentario-como-construto"), exports);
__exportStar(require("./componente-linguagem"), exports);
__exportStar(require("./constante"), exports);
__exportStar(require("./construto"), exports);
__exportStar(require("./decorador"), exports);
__exportStar(require("./definir-valor"), exports);
__exportStar(require("./dicionario"), exports);
__exportStar(require("./elvis"), exports);
__exportStar(require("./enquanto-como-construto"), exports);
__exportStar(require("./expressao-regular"), exports);
__exportStar(require("./fazer-como-construto"), exports);
__exportStar(require("./fim-para"), exports);
__exportStar(require("./formatacao-escrita"), exports);
__exportStar(require("./funcao"), exports);
__exportStar(require("./importar-como-construto"), exports);
__exportStar(require("./isto"), exports);
__exportStar(require("./leia"), exports);
__exportStar(require("./lista-compreensao"), exports);
__exportStar(require("./literal"), exports);
__exportStar(require("./logico"), exports);
__exportStar(require("./para-cada-como-construto"), exports);
__exportStar(require("./para-como-construto"), exports);
__exportStar(require("./referencia-biblioteca-global"), exports);
__exportStar(require("./referencia-funcao"), exports);
__exportStar(require("./se-ternario"), exports);
__exportStar(require("./separador"), exports);
__exportStar(require("./super"), exports);
__exportStar(require("./tipo-de"), exports);
__exportStar(require("./tupla"), exports);
__exportStar(require("./tuplas"), exports);
__exportStar(require("./unario"), exports);
__exportStar(require("./variavel"), exports);
__exportStar(require("./vetor"), exports);

},{"./acesso-elemento-matriz":9,"./acesso-indice-variavel":10,"./acesso-metodo":12,"./acesso-metodo-ou-propriedade":11,"./acesso-propriedade":13,"./agrupamento":14,"./argumento-referencia-funcao":15,"./atribuicao-por-indice":16,"./atribuicao-por-indices-matriz":17,"./atribuir":18,"./binario":19,"./chamada":20,"./comentario-como-construto":21,"./componente-linguagem":22,"./constante":23,"./construto":24,"./decorador":25,"./definir-valor":26,"./dicionario":27,"./elvis":28,"./enquanto-como-construto":29,"./expressao-regular":30,"./fazer-como-construto":31,"./fim-para":32,"./formatacao-escrita":33,"./funcao":34,"./importar-como-construto":35,"./isto":37,"./leia":38,"./lista-compreensao":39,"./literal":40,"./logico":41,"./para-cada-como-construto":42,"./para-como-construto":43,"./referencia-biblioteca-global":44,"./referencia-funcao":45,"./se-ternario":46,"./separador":47,"./super":48,"./tipo-de":49,"./tupla":50,"./tuplas":53,"./unario":61,"./variavel":62,"./vetor":63}],37:[function(require,module,exports){
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
    paraTexto() {
        return `<isto />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Isto = Isto;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leia = void 0;
const geracao_identificadores_1 = require("../geracao-identificadores");
/**
 * Declaração que pede a leitura de uma informação pela entrada
 * configurada no início da aplicação (por exemplo, o console).
 */
class Leia {
    constructor(simbolo, argumentos) {
        this.linha = simbolo.linha;
        this.hashArquivo = simbolo.hashArquivo;
        this.simbolo = simbolo;
        this.id = (0, geracao_identificadores_1.uuidv4)();
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLeia(this);
    }
    paraTexto() {
        return `<leia argumentos=[${this.argumentos.reduce((anterior, atual) => (anterior += atual.paraTexto()), '')}] />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Leia = Leia;

},{"../geracao-identificadores":64}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaCompreensao = void 0;
class ListaCompreensao {
    constructor(hashArquivo, linha, expressaoRetorno, referenciaVariavelIteracao, paraCada, tipo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.expressaoRetorno = expressaoRetorno;
        this.referenciaVariavelIteracao = referenciaVariavelIteracao;
        this.paraCada = paraCada;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoListaCompreensao(this);
    }
    paraTexto() {
        return `<lista-compreensão />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ListaCompreensao = ListaCompreensao;

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
class Literal {
    constructor(hashArquivo, linha, valor, tipo = 'qualquer') {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLiteral(this);
    }
    paraTexto() {
        return `<literal valor=${this.valor} tipo=${this.tipo} />`;
    }
    paraTextoSaida() {
        if (this.tipo === 'texto') {
            return `"${this.valor}"`;
        }
        return `${this.valor}`;
    }
}
exports.Literal = Literal;

},{}],41:[function(require,module,exports){
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
    paraTexto() {
        return (`<lógico esquerda=${this.esquerda.paraTexto()} operador=${this.operador.lexema} ` +
            `direita=${this.direita.paraTexto()} ` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Logico = Logico;

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParaCadaComoConstruto = void 0;
class ParaCadaComoConstruto {
    constructor(hashArquivo, linha, variavelIteracao, vetorOuDicionario, corpo) {
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.variavelIteracao = variavelIteracao;
        this.vetorOuDicionario = vetorOuDicionario;
        this.corpo = corpo;
        this.posicaoAtual = 0;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoParaCada(this);
    }
    paraTexto() {
        return `<para-cada-como-construto />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ParaCadaComoConstruto = ParaCadaComoConstruto;

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParaComoConstruto = void 0;
class ParaComoConstruto {
    constructor(hashArquivo, linha, inicializador, condicao, incrementar, corpo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.inicializador = inicializador;
        this.condicao = condicao;
        this.incrementar = incrementar;
        this.corpo = corpo;
        this.inicializada = false;
        this.blocoPosExecucao = undefined;
        this.resolverIncrementoEmExecucao = false;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoPara(this);
    }
    paraTexto() {
        return `<para-como-construto />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ParaComoConstruto = ParaComoConstruto;

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenciaBibliotecaGlobal = void 0;
/**
 * Um decorador é um construto especial que, em código, existe antes de uma declaração, e
 * na avaliação sintática, é colocado juntamente com a próxima declaração.
 */
class ReferenciaBibliotecaGlobal {
    constructor(hashArquivo, linha, nome) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.nome = nome;
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Este método não deveria ser chamado.'));
    }
    paraTexto() {
        return `<referência-biblioteca-global nome=${this.nome} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ReferenciaBibliotecaGlobal = ReferenciaBibliotecaGlobal;

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenciaFuncao = void 0;
class ReferenciaFuncao {
    constructor(hashArquivo, linha, simboloFuncao, tipo, idfuncao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.simboloFuncao = simboloFuncao;
        this.tipo = tipo;
        this.idFuncao = idfuncao;
    }
    async aceitar(visitante) {
        return visitante.visitarExpressaoReferenciaFuncao(this);
    }
    paraTexto() {
        return `<referência-função nome=${this.simboloFuncao.lexema} tipo=${this.tipo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.ReferenciaFuncao = ReferenciaFuncao;

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeTernario = void 0;
class SeTernario {
    constructor(hashArquivo, condicao, expressaoSe, operador, expressaoSenao) {
        this.tipo = 'qualquer';
        this.linha = condicao.linha;
        this.hashArquivo = hashArquivo;
        this.condicao = condicao;
        this.expressaoSe = expressaoSe;
        this.expressaoSenao = expressaoSenao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoSeTernario(this);
    }
    paraTexto() {
        return `<se-ternário condicao=${this.condicao.paraTexto()} expressaoSe=${this.expressaoSe.paraTexto()} expressaoSenao=${this.expressaoSenao.paraTexto()} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.SeTernario = SeTernario;

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separador = void 0;
class Separador {
    constructor(simboloSeparador) {
        this.linha = simboloSeparador.linha;
        this.hashArquivo = simboloSeparador.hashArquivo;
        this.conteudo = simboloSeparador.lexema || simboloSeparador.literal || '';
    }
    aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSeparador(this));
    }
    paraTexto() {
        return `<separador símbolo=${this.conteudo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Separador = Separador;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
class Super {
    constructor(hashArquivo, simboloChave, superclasse) {
        this.linha = Number(simboloChave.linha);
        this.hashArquivo = hashArquivo;
        this.simboloChave = simboloChave;
        this.superclasse = superclasse;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSuper(this));
    }
    paraTexto() {
        return `<super superClasse=${this.superclasse} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Super = Super;

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDe = void 0;
/**
 * Construto que solicita o tipo do valor. Normalmente usado em operações de
 * reflexão e metaprogramação.
 */
class TipoDe {
    constructor(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.valor = valor;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoTipoDe(this));
    }
    paraTexto() {
        return `<tipo-de valor=${this.valor.paraTexto()} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.TipoDe = TipoDe;

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tupla = void 0;
class Tupla {
    async aceitar(visitante) {
        return await visitante.visitarExpressaoTupla(this);
    }
}
exports.Tupla = Tupla;

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deceto = void 0;
const tupla_1 = require("../tupla");
class Deceto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo, nono, decimo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
        this.oitavo = oitavo;
        this.nono = nono;
        this.decimo = decimo;
    }
    // Propriedades extras apenas de formas acentuadas.
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
    get décimo() {
        return this.decimo;
    }
    set décimo(valor) {
        this.decimo = valor;
    }
    paraTexto() {
        return (`<deceto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            `sexto=${this.sexto.paraTexto()} ` +
            `sétimo=${this.setimo.paraTexto()} ` +
            `oitavo=${this.oitavo.paraTexto()} ` +
            `nono=${this.nono.paraTexto()} ` +
            `décimo=${this.decimo.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()}, ${this.nono.paraTextoSaida()}, ${this.decimo.paraTextoSaida()})]`;
    }
}
exports.Deceto = Deceto;

},{"../tupla":50}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dupla = void 0;
const tupla_1 = require("../tupla");
class Dupla extends tupla_1.Tupla {
    constructor(primeiro, segundo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
    }
    paraTexto() {
        return (`<dupla primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()})]`;
    }
}
exports.Dupla = Dupla;

},{"../tupla":50}],53:[function(require,module,exports){
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
exports.SeletorTuplas = void 0;
const deceto_1 = require("./deceto");
const dupla_1 = require("./dupla");
const noneto_1 = require("./noneto");
const octeto_1 = require("./octeto");
const quarteto_1 = require("./quarteto");
const quinteto_1 = require("./quinteto");
const septeto_1 = require("./septeto");
const sexteto_1 = require("./sexteto");
const trio_1 = require("./trio");
__exportStar(require("./deceto"), exports);
__exportStar(require("./dupla"), exports);
__exportStar(require("./noneto"), exports);
__exportStar(require("./octeto"), exports);
__exportStar(require("./quarteto"), exports);
__exportStar(require("./quinteto"), exports);
__exportStar(require("./septeto"), exports);
__exportStar(require("./sexteto"), exports);
__exportStar(require("./trio"), exports);
class SeletorTuplas {
    constructor(...argumentos) {
        if (argumentos.length > 10) {
            throw new Error('Tuplas com mais de 10 elementos não são suportadas.');
        }
        if (argumentos.length < 2) {
            throw new Error('Tuplas devem ter no mínimo 2 elementos.');
        }
        switch (argumentos.length) {
            case 2:
                return new dupla_1.Dupla(argumentos[0], argumentos[1]);
            case 3:
                return new trio_1.Trio(argumentos[0], argumentos[1], argumentos[2]);
            case 4:
                return new quarteto_1.Quarteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3]);
            case 5:
                return new quinteto_1.Quinteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4]);
            case 6:
                return new sexteto_1.Sexteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5]);
            case 7:
                return new septeto_1.Septeto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6]);
            case 8:
                return new octeto_1.Octeto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7]);
            case 9:
                return new noneto_1.Noneto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7], argumentos[8]);
            case 10:
                return new deceto_1.Deceto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7], argumentos[8], argumentos[9]);
        }
    }
}
exports.SeletorTuplas = SeletorTuplas;

},{"./deceto":51,"./dupla":52,"./noneto":54,"./octeto":55,"./quarteto":56,"./quinteto":57,"./septeto":58,"./sexteto":59,"./trio":60}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noneto = void 0;
const tupla_1 = require("../tupla");
class Noneto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo, nono) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
        this.oitavo = oitavo;
        this.nono = nono;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
    paraTexto() {
        return (`<noneto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            `sexto=${this.sexto.paraTexto()} ` +
            `sétimo=${this.setimo.paraTexto()} ` +
            `oitavo=${this.oitavo.paraTexto()} ` +
            `nono=${this.nono.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()}, ${this.nono.paraTextoSaida()})]`;
    }
}
exports.Noneto = Noneto;

},{"../tupla":50}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Octeto = void 0;
const tupla_1 = require("../tupla");
class Octeto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
        this.oitavo = oitavo;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
    paraTexto() {
        return (`<octeto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            `sexto=${this.sexto.paraTexto()} ` +
            `sétimo=${this.setimo.paraTexto()} ` +
            `oitavo=${this.oitavo.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()})]`;
    }
}
exports.Octeto = Octeto;

},{"../tupla":50}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quarteto = void 0;
const tupla_1 = require("../tupla");
class Quarteto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
    }
    paraTexto() {
        return (`<quarteto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()})]`;
    }
}
exports.Quarteto = Quarteto;

},{"../tupla":50}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quinteto = void 0;
const tupla_1 = require("../tupla");
class Quinteto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
    }
    paraTexto() {
        return (`<quinteto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, , ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()})]`;
    }
}
exports.Quinteto = Quinteto;

},{"../tupla":50}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Septeto = void 0;
const tupla_1 = require("../tupla");
class Septeto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
    paraTexto() {
        return (`<septeto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            `sexto=${this.sexto.paraTexto()} ` +
            `sétimo=${this.setimo.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()})]`;
    }
}
exports.Septeto = Septeto;

},{"../tupla":50}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sexteto = void 0;
const tupla_1 = require("../tupla");
class Sexteto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
    }
    paraTexto() {
        return (`<sexteto primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            `quarto=${this.quarto.paraTexto()} ` +
            `quinto=${this.quinto.paraTexto()} ` +
            `sexto=${this.sexto.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()})]`;
    }
}
exports.Sexteto = Sexteto;

},{"../tupla":50}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trio = void 0;
const tupla_1 = require("../tupla");
class Trio extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
    }
    paraTexto() {
        return (`<trio primeiro=${this.primeiro.paraTexto()} ` +
            `segundo=${this.segundo.paraTexto()} ` +
            `terceiro=${this.terceiro.paraTexto()} ` +
            ` />`);
    }
    paraTextoSaida() {
        return `[(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()})]`;
    }
}
exports.Trio = Trio;

},{"../tupla":50}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
class Unario {
    constructor(hashArquivo, operador, operando, incidenciaOperador = 'ANTES') {
        this.linha = operador.linha;
        this.hashArquivo = hashArquivo;
        this.operador = operador;
        this.operando = operando;
        this.incidenciaOperador = incidenciaOperador;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoUnaria(this);
    }
    paraTexto() {
        return `<unário operando=${this.operando.paraTexto()} operador=${this.operador.lexema} incidênciaOperador=${this.incidenciaOperador} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Unario = Unario;

},{}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variavel = void 0;
class Variavel {
    constructor(hashArquivo, simbolo, tipo = 'qualquer') {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeVariavel(this));
    }
    paraTexto() {
        return `<variável nome=${this.simbolo.lexema} tipo=${this.tipo} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Variavel = Variavel;

},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
class Vetor {
    constructor(hashArquivo, linha, valores, tamanho, tipo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.tipo = tipo;
        this.valores = valores;
        if (tamanho) {
            this.tamanho = tamanho;
        }
        else {
            this.tamanho = this.valores.length;
        }
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoVetor(this);
    }
    paraTexto() {
        return `<vetor tipo=${this.tipo} valores=${this.valores.reduce((anterior, atual) => (anterior += atual.paraTexto()), '')} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Vetor = Vetor;

},{}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyrb53 = cyrb53;
exports.uuidv4 = uuidv4;
/**
 * Função de geração de hashes copiada de https://stackoverflow.com/a/52171480/1314276.
 * A ideia é gerar _hashes_ únicos para nomes de arquivos importados e usar o _hash_ para os
 * pragmas de elementos catalogados pelo lexador e usados pelo interpretador.
 * @param {string} nomeArquivo Nome do arquivo
 * @param {number} semente Uma semente de dispersão, padrão: 0
 * @returns {number} Número inteiro com o hash correspondente ao nome do arquivo
 */
function cyrb53(nomeArquivo, semente = 0) {
    let h1 = 0xdeadbeef ^ semente, h2 = 0x41c6ce57 ^ semente;
    for (let i = 0, ch; i < nomeArquivo.length; i++) {
        ch = nomeArquivo.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
function uuidv4() {
    // Public Domain/MIT
    let d = new Date().getTime(); // Timestamp
    let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {
            // Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            // Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

},{}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformacaoElementoSintatico = void 0;
class InformacaoElementoSintatico {
    constructor(nome, tipo, obrigatorio = true, subElementos = [], documentacao = '') {
        this.subElementos = [];
        this.nome = nome;
        this.tipo = tipo;
        this.obrigatorio = obrigatorio;
        this.subElementos = subElementos;
        this.documentacao = documentacao;
    }
    toString() {
        return `<informação-elemento-sintático nome=${this.nome}, tipo=${this.tipo}, obrigatório=${this.obrigatorio ? 'verdadeiro' : 'falso'} sub-elementos=${this.subElementos.map((el) => el.toString()).join(', ')}>`;
    }
}
exports.InformacaoElementoSintatico = InformacaoElementoSintatico;

},{}]},{},[1])(1)
});
