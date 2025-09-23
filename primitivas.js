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
    remover: {
        tipoRetorno: 'lógico',
        argumentos: [new informacao_elemento_sintatico_1.InformacaoElementoSintatico('chave', 'texto')],
        implementacao: (interpretador, nomePrimitiva, valor, chave) => Promise.resolve(delete valor[chave]),
        assinaturaFormato: `dicionário.remover(chave: qualquer)`,
    },
    valores: {
        tipoRetorno: 'qualquer[]',
        argumentos: [],
        implementacao: (interpretador, nomePrimitiva, valor) => {
            return Promise.resolve(Object.values(valor));
        },
    },
};

},{"../informacao-elemento-sintatico":9}],8:[function(require,module,exports){
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

},{"../informacao-elemento-sintatico":9}],9:[function(require,module,exports){
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
