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
        documentacao: '### Descrição\n\n' +
            'Retorna um número aleatório entre 0 e 1.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeroAleatorio = aleatorio();\n' +
            'escreva(numeroAleatorio); // 0.8540051495195808\n' +
            '```',
        exemploCodigo: 'aleatorio()'
    },
    {
        nome: 'aleatorioEntre',
        documentacao: '### Descrição\n\n' +
            'Retorna um número inteiro aleatório entre os valores passados para a função. O primeiro parâmetro é o número mínimo e o segundo é o máximo. ' +
            'O valor gerado aleatoriamente nunca será igual ao número máximo passado para a função: sempre será uma unidade a menos que o máximo.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeroAleatorio = aleatorioEntre(1, 9);\n' +
            'escreva(numeroAleatorio); // Retorna um valor entre 1 e 8\n' +
            '```',
        exemploCodigo: 'aleatorioEntre(minimo, maximo)'
    },
    {
        nome: 'clonar',
        documentacao: '### Descrição\n\n' +
            'Cria uma cópia profunda de uma variável ou constante. Diferente de uma atribuição simples, a clonagem profunda garante que modificações na cópia não afetem o valor original, ' +
            'mesmo quando se trata de estruturas de dados aninhadas como vetores, dicionários ou objetos.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var original = [1, [2, 3], 4];\n' +
            'var copia = clonar(original);\n' +
            'var subVetor = copia[1];\n' +
            'subVetor[0] = 99;\n' +
            'escreva(original[1][0]); // 2\n' +
            'escreva(copia[1][0]); // 99\n' +
            '```',
        exemploCodigo: 'clonar(valor)'
    },
    {
        nome: 'algum',
        documentacao: '### Descrição\n\n' +
            'Verifica se pelo menos um elemento do vetor satisfaz a condição fornecida pela função de teste.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'funcao ehPar(valor) { retorna valor % 2 == 0; }\n' +
            'escreva(algum(numeros, ehPar)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'algum(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrar',
        documentacao: '### Descrição\n\n' +
            'Retorna o primeiro elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrar(numeros, maiorQue10)); // 12\n' +
            '```',
        exemploCodigo: 'encontrar(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarIndice',
        documentacao: '### Descrição\n\n' +
            'Retorna o índice do primeiro elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarIndice(numeros, maiorQue10)); // 1\n' +
            '```',
        exemploCodigo: 'encontrarIndice(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarUltimo',
        documentacao: '### Descrição\n\n' +
            'Retorna o último elemento do vetor que satisfaz a função de teste fornecida, percorrendo o vetor do fim para o início.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarUltimo(numeros, maiorQue10)); // 44\n' +
            '```',
        exemploCodigo: 'encontrarUltimo(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarUltimoIndice',
        documentacao: '### Descrição\n\n' +
            'Retorna o índice do último elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarUltimoIndice(numeros, maiorQue10)); // 4\n' +
            '```',
        exemploCodigo: 'encontrarUltimoIndice(vetor, funcaoTeste)'
    },
    {
        nome: 'escreva',
        documentacao: '### Descrição\n\n' +
            'Escreve um ou mais argumentos na saída padrão da aplicação.\n\n' +
            '### Interpolação\n\n' +
            'Delégua suporta interpolação de variáveis:\n' +
            '```delegua\n' +
            'var comidaFavorita = "strogonoff";\n' +
            'escreva("Minha comida favorita é ${comidaFavorita}");\n' +
            '```',
        exemploCodigo: 'escreva(...argumentos)'
    },
    {
        nome: 'filtrarPor',
        documentacao: '### Descrição\n\n' +
            'Percorre um vetor executando uma função para cada item. Se o valor retornado pela função é verdadeiro, o valor testado é acumulado em um novo vetor.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetor = [1, 2, 3, 4, 5, 6];\n' +
            'var fn = funcao(valor) { retorna valor % 2 == 0; };\n' +
            'escreva(filtrarPor(vetor, fn)); // [2, 4, 6]\n' +
            '```',
        exemploCodigo: 'filtrarPor(vetor, funcaoTeste)'
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição\n\n' +
            'Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var frutas = ["maçã", "banana", "laranja"];\n' +
            'escreva(inclui(frutas, "banana")); // verdadeiro\n' +
            'escreva(inclui("Olá Mundo", "Mundo")); // verdadeiro\n' +
            '```',
        exemploCodigo: 'inclui(vetor, elemento)'
    },
    {
        nome: 'incluido',
        documentacao: '### Descrição\n\n' +
            'Sinônimo de `inclui`. Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'escreva(incluido(numeros, 3)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'incluido(vetor, elemento)'
    },
    {
        nome: 'incluído',
        documentacao: '### Descrição\n\n' +
            'Sinônimo de `inclui`. Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'escreva(incluído(numeros, 3)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'incluído(vetor, elemento)'
    },
    {
        nome: 'inteiro',
        documentacao: '### Descrição\n\n' +
            'Converte um número flutuante ou texto em um número inteiro.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111";\n' +
            'escreva(111 + inteiro(testeTexto)); // 222\n' +
            'escreva(inteiro(3.7)); // 3\n' +
            '```',
        exemploCodigo: 'inteiro(valor)'
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
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número com porção decimal.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111.11";\n' +
            'escreva(111 + numero(testeTexto)); // 222.11\n' +
            '```',
        exemploCodigo: 'numero(valor)'
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
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número com porção decimal.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111.11";\n' +
            'escreva(111 + número(testeTexto)); // 222.11\n' +
            '```',
        exemploCodigo: 'número(valor)'
    },
    {
        nome: 'paraCada',
        documentacao: '### Descrição\n\n' +
            'Percorre um vetor executando uma função para cada item. Diferentemente de filtrar e mapear, o retorno da função não é observado.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetor = [1, 2, 3];\n' +
            'var fn = funcao(valor) { escreva(valor * 2); };\n' +
            'paraCada(vetor, fn);\n' +
            '// 2\n' +
            '// 4\n' +
            '// 6\n' +
            '```',
        exemploCodigo: 'paraCada(vetor, funcao)'
    },
    {
        nome: 'primeiroEmCondicao',
        documentacao: '### Descrição\n\n' +
            'Retorna o primeiro elemento do vetor que satisfaz a condição fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(primeiroEmCondicao(numeros, maiorQue10)); // 12\n' +
            '```',
        exemploCodigo: 'primeiroEmCondicao(vetor, funcaoCondicao)'
    },
    {
        nome: 'real',
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número flutuante (real).' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "504.69";\n' +
            'escreva(0.01 + real(testeTexto)); // 504.7\n' +
            '```',
        exemploCodigo: 'real(valor)'
    },
    {
        nome: 'reduzir',
        documentacao: '### Descrição\n\n' +
            'Executa uma função redutora para cada elemento do vetor, resultando em um único valor.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'funcao somar(acumulador, valor) { retorna acumulador + valor; }\n' +
            'escreva(reduzir(numeros, somar, 0)); // 15\n' +
            '```',
        exemploCodigo: 'reduzir(vetor, funcaoRedutora, valorInicial)'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição\n\n' +
            'Retorna o número de elementos que compõem um vetor ou o número de caracteres de um texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetorNomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];\n' +
            'escreva(tamanho(vetorNomes)); // 5\n' +
            '\n' +
            'var texto = "Egua";\n' +
            'escreva(tamanho(texto)); // 4\n' +
            '```',
        exemploCodigo: 'tamanho(vetor)'
    },
    {
        nome: 'texto',
        documentacao: '### Descrição\n\n' +
            'Transforma números flutuantes ou inteiros em texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numero = 7;\n' +
            'escreva(texto(numero) + " é um número"); // "7 é um número"\n' +
            '```',
        exemploCodigo: 'texto(valor)'
    },
    {
        nome: 'todosEmCondicao',
        documentacao: '### Descrição\n\n' +
            'Retorna verdadeiro se todos os elementos do vetor retornam verdadeiro ao serem aplicados como argumentos da função passada como segundo parâmetro. Retorna falso em caso contrário.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var meuVetor = [1, 2, 3, 4, 5, 6];\n' +
            'var f1 = funcao(x) { retorna x < 10; };\n' +
            'escreva(todosEmCondicao(meuVetor, f1)); // verdadeiro\n' +
            '\n' +
            'var f2 = funcao(x) { retorna x % 2 == 0; };\n' +
            'escreva(todosEmCondicao(meuVetor, f2)); // falso\n' +
            '```',
        exemploCodigo: 'todosEmCondicao(vetor, funcaoCondicao)'
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasTexto = void 0;
const primitivas_texto_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-texto"));
exports.primitivasTexto = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_texto_1.default)) {
    exports.primitivasTexto.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}

},{"@designliquido/delegua/bibliotecas/primitivas-texto":9}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasVetor = void 0;
const primitivas_vetor_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-vetor"));
exports.primitivasVetor = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_vetor_1.default)) {
    exports.primitivasVetor.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}

},{"@designliquido/delegua/bibliotecas/primitivas-vetor":10}],7:[function(require,module,exports){
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
        implementacao: (interpretador, valor, chave) => Promise.resolve(chave in valor),
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
    mesclar: {
        tipoRetorno: 'dicionário',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('outroDicionario', 'dicionário', true, [], 'Outro dicionário a ser mesclado com este dicionário.'),
        ],
        implementacao: (interpretador, valor, outroDicionario) => {
            if (!outroDicionario ||
                Array.isArray(outroDicionario) ||
                outroDicionario.constructor !== Object) {
                return Promise.reject(new Error('O argumento de dicionário.mesclar() deve ser um dicionário.'));
            }
            return Promise.resolve(Object.assign({}, valor, outroDicionario));
        },
        assinaturaFormato: 'dicionário.mesclar(outroDicionario: dicionário)',
    },
    // Compatibilidade retroativa com versões anteriores.
    concatenar: {
        tipoRetorno: 'dicionário',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('outroDicionario', 'dicionário', true, [], 'Outro dicionário a ser mesclado com este dicionário.'),
        ],
        implementacao: (interpretador, valor, outroDicionario) => {
            if (!outroDicionario ||
                Array.isArray(outroDicionario) ||
                outroDicionario.constructor !== Object) {
                return Promise.reject(new Error('O argumento de dicionário.mesclar() deve ser um dicionário.'));
            }
            return Promise.resolve(Object.assign({}, valor, outroDicionario));
        },
        assinaturaFormato: 'dicionário.concatenar(outroDicionario: dicionário)',
    },
    chaves: {
        tipoRetorno: 'texto[]',
        argumentos: [],
        implementacao: (interpretador, valor) => {
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
        implementacao: (interpretador, valor) => {
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
        implementacao: (interpretador, valor, chave) => Promise.resolve(delete valor[chave]),
        assinaturaFormato: `dicionário.remover(chave: qualquer)`,
    },
    valores: {
        tipoRetorno: '<T>[]',
        argumentos: [],
        implementacao: (interpretador, valor) => {
            return Promise.resolve(Object.values(valor));
        },
    },
};

},{"../construtos":40,"../informacao-elemento-sintatico":75}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const informacao_elemento_sintatico_1 = require("../informacao-elemento-sintatico");
exports.default = {
    absoluto: {
        tipoRetorno: 'número',
        argumentos: [],
        implementacao: (interpretador, valor) => {
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
        implementacao: (interpretador, valor) => {
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
        implementacao: (interpretador, valor) => {
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
        implementacao: (interpretador, valor, opcoes) => {
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

},{"../informacao-elemento-sintatico":75}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementacaoParticao = void 0;
const informacao_elemento_sintatico_1 = require("../informacao-elemento-sintatico");
const construtos_1 = require("../construtos");
const excecoes_1 = require("../excecoes");
const implementacaoParticao = (interpretador, texto, separador, ...args) => {
    if (args.length > 0) {
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(null, `A função "partição" aceita apenas um argumento.`, interpretador.linhaDeclaracaoAtual));
    }
    if (typeof texto !== 'string') {
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(null, `A função "partição" só pode ser chamada em textos.`, interpretador.linhaDeclaracaoAtual));
    }
    if (separador === undefined) {
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(null, `A função "partição" requer um argumento separador.`, interpretador.linhaDeclaracaoAtual));
    }
    if (typeof separador !== 'string') {
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(null, 'O separador deve ser do tipo texto.', interpretador.linhaDeclaracaoAtual));
    }
    if (separador === '') {
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(null, 'O separador não pode ser uma string vazia.', interpretador.linhaDeclaracaoAtual));
    }
    const indice = texto.indexOf(separador);
    let partes;
    if (indice === -1) {
        partes = [texto, '', ''];
    }
    else {
        const antes = texto.substring(0, indice);
        const depois = texto.substring(indice + separador.length);
        partes = [antes, separador, depois];
    }
    const elementos = partes.map((p) => new construtos_1.Literal(interpretador.hashArquivoDeclaracaoAtual, interpretador.linhaDeclaracaoAtual, p, 'texto'));
    const tupla = new construtos_1.TuplaN(interpretador.hashArquivoDeclaracaoAtual, interpretador.linhaDeclaracaoAtual, elementos);
    return Promise.resolve(tupla);
};
exports.implementacaoParticao = implementacaoParticao;
exports.default = {
    aparar: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.trim()),
        assinaturaFormato: 'texto.aparar()',
        documentacao: '# `texto.aparar()` \n \n' +
            'Remove espaços em branco no início e no fim de um texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "   meu texto com espaços no início e no fim       "\n' +
            'escreva("|" + t.aparar() + "|") // "|meu texto com espaços no início e no fim|"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.aparar()',
    },
    apararFim: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.trimEnd()),
        assinaturaFormato: 'texto.apararFim()',
        documentacao: '# `texto.apararFim()` \n \n' +
            'Remove espaços em branco no no fim de um texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "   meu texto com espaços no início e no fim       "\n' +
            'escreva("|" + t.apararFim() + "|") // "|   meu texto com espaços no início e no fim|"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.apararFim()',
    },
    apararInicio: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.trimStart()),
        assinaturaFormato: 'texto.apararInicio()',
        documentacao: '# `texto.apararInicio()` \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "   meu texto com espaços no início e no fim       "\n' +
            'escreva("|" + t.apararInicio() + "|") // "|meu texto com espaços no início e no fim       |"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.apararInicio()',
    },
    concatenar: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('outroTexto', 'texto', true, [], 'O texto a ser concatenado.'),
        ],
        implementacao: (interpretador, ...textos) => Promise.resolve(''.concat(...textos)),
        assinaturaFormato: 'texto.concatenar(...outroTexto: texto)',
        documentacao: '# `texto.concatenar(outroTexto)` \n \n' +
            'Realiza a junção de palavras/textos.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t1 = "um"\n' +
            'var t2 = "dois três"\n' +
            'escreva(t1.concatenar(t2)) // "umdois três"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.concatenar(outroTexto)',
    },
    dividir: {
        tipoRetorno: 'texto[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('delimitador', 'texto', true, [], 'O delimitador usado para dividir o texto.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('limite', 'número', false, [], '(Opcional) Número limite de elementos a serem retornados.'),
        ],
        implementacao: (interpretador, texto, divisor, limite) => {
            if (limite) {
                return Promise.resolve(texto.split(divisor, limite));
            }
            return Promise.resolve(texto.split(divisor));
        },
        assinaturaFormato: 'texto.dividir(delimitador: texto, limite?: inteiro)',
        documentacao: '# `texto.dividir(delimitador)` \n \n' +
            'Divide o texto pelo separador passado como parâmetro.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "um dois três"\n' +
            "t.dividir(' ') // ['um','dois','três']\n```" +
            '\n\n ### Formas de uso  \n',
        exemploCodigo: "texto.dividir('<delimitador (, ; ' ')>')",
    },
    encontrar: {
        tipoRetorno: 'inteiro',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('subtexto', 'texto', true, [], 'O texto que deve ser buscado.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('indiceInicio', 'número', false, [], '(Opcional) O índice opcional para iniciar a busca.'),
        ],
        implementacao: (interpretador, texto, subtexto, indiceInicio) => {
            if (indiceInicio !== undefined) {
                return Promise.resolve(texto.indexOf(subtexto, indiceInicio));
            }
            return Promise.resolve(texto.indexOf(subtexto));
        },
        assinaturaFormato: 'texto.encontrar(subtexto: texto, indiceInicio?: número)',
        documentacao: '# `texto.encontrar(subtexto, indiceInicio)` \n \n' +
            'Retorna o índice inicial de um subtexto. Retorna -1 caso não encontre.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "um dois três"\n' +
            't.encontrar("dois") // 3\n' +
            't.encontrar("quatro") // -1\n' +
            't.encontrar("dois", 4) // -1\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.encontre(subtexto, indiceInicio?)',
    },
    fatiar: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('inicio', 'número', true, [], 'A posição inicial da fatia.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('fim', 'número', false, [], '(Opcional) A posição final da fatia. Se não fornecido, seleciona até o final do texto.'),
        ],
        implementacao: (interpretador, texto, inicio, fim) => Promise.resolve(texto.slice(inicio, fim)),
        assinaturaFormato: 'texto.fatiar(inicio: número, fim?: número)',
        documentacao: '# `texto.fatiar(inicio)` \n \n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "Um dois três quatro"\n' +
            't.fatiar() // "um dois três quatro", ou seja, não faz coisa alguma.\n' +
            't.fatiar(2, 7) // "dois"\n' +
            't.fatiar(8, 12) // "três"\n' +
            't.fatiar(8) // "três quatro", ou seja, seleciona tudo da posição 8 até o final do texto.\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.fatiar(início, final)\n' + 'texto.fatiar(aPartirDaPosicao)',
    },
    inclui: {
        tipoRetorno: 'lógico',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('elemento', 'texto', true, [], 'O elemento a ser verificado se está contido no texto.'),
        ],
        implementacao: (interpretador, texto, elemento) => Promise.resolve(texto.includes(elemento)),
        assinaturaFormato: 'inclui(elemento: texto)',
        documentacao: '# `texto.inclui(elemento)` \n \n' +
            'Devolve verdadeiro se elemento passado por parâmetro está contido no texto, e falso em caso contrário.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "um dois três"\n' +
            't.inclui("dois") // verdadeiro\n' +
            't.inclui("quatro") // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: "texto.inclui('palavra')",
    },
    inverter: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.split('').reduce((texto, caracter) => (texto = caracter + texto), '')),
        assinaturaFormato: 'texto.inverter()',
        documentacao: '# `texto.inverter()` \n \n' +
            'Inverte as letras de um texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "um dois três"\n' +
            't.inverter() // "sêrt siod mu"```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.inverter()',
    },
    maiusculo: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.toUpperCase()),
        assinaturaFormato: 'texto.maiusculo()',
        documentacao: '# `texto.maiusculo()` \n \n' +
            'Converte todos os caracteres alfabéticos para suas respectivas formas em maiúsculo.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "tudo em minúsculo"\n' +
            'escreva(t.maiusculo()) // "TUDO EM MINÚSCULO"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.maiusculo()',
    },
    minusculo: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.toLowerCase()),
        assinaturaFormato: 'texto.minusculo()',
        documentacao: '# `texto.minusculo()` \n \n' +
            'Converte todos os caracteres alfabéticos para suas respectivas formas em minúsculo.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "TUDO EM MAIÚSCULO"\n' +
            'escreva(t.minusculo()) // "tudo em maiúsculo"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.minusculo()',
    },
    particao: {
        tipoRetorno: 'tupla',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('separador', 'texto', true, [], 'O separador usado para partir o texto.'),
        ],
        implementacao: exports.implementacaoParticao,
        assinaturaFormato: 'texto.particao(separador: texto)',
        documentacao: '# `texto.particao(separador)` \n \n' +
            'Divide o texto na primeira ocorrência do separador e retorna uma tupla com: ' +
            'o que vem antes, o separador e o que vem depois.',
        exemploCodigo: 'texto.particao(" ")',
    },
    partição: {
        tipoRetorno: 'tupla',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('separador', 'texto', true, [], 'O separador usado para partir o texto.'),
        ],
        implementacao: exports.implementacaoParticao,
        assinaturaFormato: 'texto.partição(separador: texto)',
        documentacao: '# `texto.partição(separador)` \n \n' +
            'Divide o texto na primeira ocorrência do separador e retorna uma tupla com: ' +
            'o que vem antes, o separador e o que vem depois.',
        exemploCodigo: 'texto.partição(" ")',
    },
    substituir: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('textoASerSubstituido', 'texto', true, [], 'Texto a ser substituído.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('substituto', 'texto', true, [], 'A substituição'),
        ],
        implementacao: (interpretador, texto, elemento, substituto) => Promise.resolve(texto.replace(elemento, substituto)),
        assinaturaFormato: 'texto.substituir(textoASerSubstituido: texto, substituto: texto)',
        documentacao: '# `texto.substituir(textoASerSubstituido, substituto)` \n \n' +
            'Substitui a primeira ocorrência no texto do primeiro parâmetro pelo segundo parâmetro.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "Eu gosto de caju"\n' +
            't.substituir("caju", "graviola") // Resultado será "Eu gosto de graviola"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: "texto.substituir('palavra a ser substituída','nova palavra')",
    },
    subtexto: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('inicio', 'inteiro', true, [], 'A posição de início do texto a ser extraído.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('fim', 'inteiro', true, [], 'A posição de fim do texto a ser extraído.'),
        ],
        implementacao: (interpretador, texto, inicio, fim) => Promise.resolve(texto.slice(inicio, fim)),
        assinaturaFormato: 'texto.subtexto(inicio: inteiro, fim: inteiro)',
        documentacao: '# `texto.subtexto(inicio, fim)` \n\n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "Eu gosto de caju e de graviola"\n' +
            't.subtexto(3, 16) // Resultado será "gosto de caju"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.subtexto(posiçãoInicial, posiçãoFinal)',
    },
    tamanho: {
        tipoRetorno: 'inteiro',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.length),
        assinaturaFormato: 'texto.tamanho()',
        documentacao: '# `texto.tamanho()` \n\n' +
            'Devolve um número inteiro com o número de caracteres do texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "Um dois três quatro"\n' +
            't.tamanho() // 19\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.tamanho()',
    },
    terminaCom: {
        tipoRetorno: 'lógico',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('sufixo', 'texto', true, [], 'O sufixo a ser verificado no final do texto.'),
        ],
        implementacao: (interpretador, texto, sufixo) => Promise.resolve(texto.endsWith(sufixo)),
        assinaturaFormato: 'texto.terminaCom(sufixo: texto)',
        documentacao: '# `texto.terminaCom(sufixo)` \n \n' +
            'Verifica se um texto termina com o sufixo especificado e retorna um valor lógico (verdadeiro ou falso).' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar mensagem = "Olá, bem-vindo ao meu mundo."\n' +
            'escreva(mensagem.terminaCom(".")) // verdadeiro\n' +
            'escreva(mensagem.terminaCom("mundo")) // falso\n' +
            'escreva(mensagem.terminaCom("mundo.")) // verdadeiro\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.terminaCom(sufixo)',
    },
    tudoMaiusculo: {
        tipoRetorno: 'lógico',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto === texto.toUpperCase()),
        assinaturaFormato: 'texto.tudoMaiusculo()',
        documentacao: '# `texto.tudoMaiusculo()` \n\n' +
            'Devolve verdadeiro se todos os caracteres alfabéticos do texto estão em maiúsculo, e falso em caso contrário.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t1 = "TUDO EM MAIÚSCULO"\n' +
            'var t2 = "Tudo em Maiúsculo"\n' +
            't1.tudoMaiusculo() // verdadeiro\n' +
            't2.tudoMaiusculo() // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.tudoMaiusculo()',
    },
    tudoMinusculo: {
        tipoRetorno: 'lógico',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto === texto.toLowerCase()),
        assinaturaFormato: 'texto.tudoMinusculo()',
        documentacao: '# `texto.tudoMinusculo()` \n\n' +
            'Devolve verdadeiro se todos os caracteres alfabéticos do texto estão em minúsculo, e falso em caso contrário.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t1 = "tudo em minúsculo"\n' +
            'var t2 = "Tudo em Minúsculo"\n' +
            't1.tudoMinusculo() // verdadeiro\n' +
            't2.tudoMinusculo() // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.tudoMinusculo()',
    },
    apararInício: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.trimStart()),
        assinaturaFormato: 'texto.apararInício()',
        documentacao: '# `texto.apararInício()` \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "   meu texto com espaços no início e no fim       "\n' +
            'escreva("|" + t.apararInício() + "|") // "|meu texto com espaços no início e no fim       |"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.apararInício()',
    },
    maiúsculo: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.toUpperCase()),
        assinaturaFormato: 'texto.maiúsculo()',
        documentacao: '# `texto.maiúsculo()` \n \n' +
            'Converte todos os caracteres alfabéticos para suas respectivas formas em maiúsculo.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "tudo em minúsculo"\n' +
            'escreva(t.maiúsculo()) // "TUDO EM MINÚSCULO"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.maiúsculo()',
    },
    minúsculo: {
        tipoRetorno: 'texto',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto.toLowerCase()),
        assinaturaFormato: 'texto.minúsculo()',
        documentacao: '# `texto.minúsculo()` \n \n' +
            'Converte todos os caracteres alfabéticos para suas respectivas formas em minúsculo.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t = "TUDO EM MAIÚSCULO"\n' +
            'escreva(t.minúsculo()) // "tudo em maiúsculo"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.minúsculo()',
    },
    tudoMaiúsculo: {
        tipoRetorno: 'lógico',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto === texto.toUpperCase()),
        assinaturaFormato: 'texto.tudoMaiúsculo()',
        documentacao: '# `texto.tudoMaiúsculo()` \n\n' +
            'Devolve verdadeiro se todos os caracteres alfabéticos do texto estão em maiúsculo, e falso em caso contrário.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t1 = "TUDO EM MAIÚSCULO"\n' +
            'var t2 = "Tudo em Maiúsculo"\n' +
            't1.tudoMaiúsculo() // verdadeiro\n' +
            't2.tudoMaiúsculo() // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.tudoMaiúsculo()',
    },
    tudoMinúsculo: {
        tipoRetorno: 'lógico',
        argumentos: [],
        implementacao: (interpretador, texto) => Promise.resolve(texto === texto.toLowerCase()),
        assinaturaFormato: 'texto.tudoMinúsculo()',
        documentacao: '# `texto.tudoMinúsculo()` \n\n' +
            'Devolve verdadeiro se todos os caracteres alfabéticos do texto estão em minúsculo, e falso em caso contrário.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar t1 = "tudo em minúsculo"\n' +
            'var t2 = "Tudo em Minúsculo"\n' +
            't1.tudoMinúsculo() // verdadeiro\n' +
            't2.tudoMinúsculo() // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'texto.tudoMinúsculo()',
    },
};

},{"../construtos":40,"../excecoes":72,"../informacao-elemento-sintatico":75}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const informacao_elemento_sintatico_1 = require("../informacao-elemento-sintatico");
const inferenciador_1 = require("../inferenciador");
const construtos_1 = require("../construtos");
const excecoes_1 = require("../excecoes");
const mapaConstrutoresTupla = {
    2: construtos_1.Dupla,
    3: construtos_1.Trio,
    4: construtos_1.Quarteto,
    5: construtos_1.Quinteto,
    6: construtos_1.Sexteto,
    7: construtos_1.Septeto,
    8: construtos_1.Octeto,
    9: construtos_1.Noneto,
    10: construtos_1.Deceto,
};
exports.default = {
    adicionar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('elemento', 'qualquer', true, [], 'Os elementos a serem adicionados ao vetor.'),
        ],
        implementacao: (interpretador, vetor, elemento) => {
            vetor.push(elemento);
            return Promise.resolve(vetor);
        },
        assinaturaFormato: 'vetor.adicionar(...elemento: qualquer)',
        documentacao: '# `vetor.adicionar(elemento)` \n \n' +
            'Adiciona um ou mais elementos em um vetor.' +
            '\n\n ## Exemplo de Código\n' +
            '```delegua\nv.adicionar(7)\n' +
            'v.adicionar(5)\n' +
            'v.adicionar(3)\n' +
            'escreva(v) // [7, 5, 3]\n```' +
            '\n\n ### Formas de uso  \n',
        exemploCodigo: 'vetor.adicionar(elemento)',
    },
    concatenar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('outroVetor', 'qualquer[]', true, [], 'O outro vetorm ou outros vetores, a serem concatenados a este vetor.'),
        ],
        implementacao: (interpretador, vetor, outroVetor) => {
            return Promise.resolve(vetor.concat(outroVetor));
        },
        assinaturaFormato: 'vetor.concatenar(...outroVetor: qualquer[])',
        documentacao: '# `vetor.concatenar(outroVetor)` \n \n' +
            'Adiciona ao conteúdo do vetor um ou mais elementos' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [7, 5, 3]\n' +
            'escreva(v.concatenar([1, 2, 4])) // [7, 5, 3, 1, 2, 4]\n```' +
            '\n\n ### Formas de uso  \n',
        exemploCodigo: 'vetor.concatenar(...argumentos)',
    },
    empilhar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [new informacao_elemento_sintatico_1.InformacaoElementoSintatico('elemento', 'qualquer', true, [], '')],
        implementacao: (interpretador, vetor, elemento) => {
            vetor.push(elemento);
            return Promise.resolve(vetor);
        },
        assinaturaFormato: 'vetor.empilhar(elemento: qualquer)',
        documentacao: '# `vetor.empilhar(elemento)` \n \n' +
            'Adiciona um elemento ao final do vetor, como se o vetor fosse uma pilha na vertical.' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = []\n' +
            'v.empilhar(7)\n' +
            'v.empilhar(5)\n' +
            'v.empilhar(3)\n' +
            'escreva(v) // [7, 5, 3]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.empilhar(elemento)',
    },
    encaixar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('inicio', 'inteiro'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('excluirQuantidade', 'número'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('itens', 'qualquer[]'),
        ],
        implementacao: (interpretador, vetor, posicaoInicial, quantidadeExclusao, ...itens) => {
            let elementos = [];
            if (quantidadeExclusao || quantidadeExclusao === 0) {
                elementos = !itens.length
                    ? vetor.splice(posicaoInicial, quantidadeExclusao)
                    : vetor.splice(posicaoInicial, quantidadeExclusao, ...itens);
                return Promise.resolve(elementos);
            }
            else {
                elementos = !itens.length
                    ? vetor.splice(posicaoInicial)
                    : vetor.splice(posicaoInicial, ...itens);
                return Promise.resolve(elementos);
            }
        },
        assinaturaFormato: 'vetor.encaixar(posicaoInicial?: número, quantidadeExclusao?: número, itens?: qualquer[])',
        documentacao: '# `vetor.encaixar(posicaoInicial, quantidadeExclusao, itens)` \n \n' +
            'Encaixa um vetor em outro, dadas posições de início e quantidade de ítens a serem excluídos do vetor original. \n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3, 4, 5]\n' +
            'escreva(v.encaixar()) // "[1, 2, 3, 4, 5]", ou seja, não faz coisa alguma.\n' +
            `var v1 = v.encaixar(2)\n` +
            'escreva(v) // "[3, 4, 5]", ou seja, a posição 2, onde fica o 3, passa a ser a nova posição inicial do vetor.\n' +
            'escreva(v1) // "[1, 2]", ou seja, o retorno de `encaixar()` são as posições removidas do vetor original.\n' +
            'var v2 = [1, 2, 3, 4, 5]\n' +
            'escreva(v2.encaixar(2, 1)) // "[3]"\n' +
            'escreva(v2) // "[1, 2, 4, 5]"\n```' +
            'var v3 = [1, 2, 3, 4, 5]\n' +
            'escreva(v3.encaixar(2, 1, "teste")) // "[3]"\n' +
            'escreva(v3) // "[1, 2, "teste", 4, 5]"\n```' +
            '\n\n ### Formas de uso \n' +
            '`encaixar` suporta sobrecarga do método.\n\n',
        exemploCodigo: 'vetor.encaixar(<nova posição inicial>)\n' +
            'vetor.encaixar(<a partir desta posição>, <exclua esta quantidade de elementos>)\n' +
            'vetor.encaixar(<a partir desta posição>, <exclua esta quantidade de elementos>, <adicione estes elementos>)',
    },
    fatiar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('inicio', 'número', false, [], 'A posição de início do vetor a ser fatiado. Se não fornecido, retorna o vetor inteiro.'),
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('fim', 'número', false, [], 'A posição de fim do vetor a ser fatiado.'),
        ],
        implementacao: (interpretador, vetor, inicio, fim) => Promise.resolve(vetor.slice(inicio, fim)),
        assinaturaFormato: 'vetor.fatiar(inicio?: número, fim?: número)',
        documentacao: '# `vetor.fatiar(inicio, fim)` \n \n' +
            'Extrai uma fatia do vetor, dadas posições de início e fim. \n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3, 4, 5]\n' +
            'escreva(v.fatiar()) // "[1, 2, 3, 4, 5]", ou seja, não faz coisa alguma.\n' +
            'escreva(v.fatiar(2, 4)) // "[3, 4]"\n' +
            'escreva(v.fatiar(2)) // "[3, 4, 5]", ou seja, extrai trecho da 3ª posição até o final do vetor.\n```' +
            '\n\n ### Formas de uso \n' +
            'Fatiar suporta sobrecarga do método.\n\n',
        exemploCodigo: 'vetor.fatiar(<a partir desta posição>)\n' +
            'vetor.fatiar(<a partir desta posição>, <até esta posição>)',
    },
    filtrarPor: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('funcao', 'função', true, [], 'A função de filtragem.'),
        ],
        implementacao: async (interpretador, vetor, funcao) => {
            if (funcao === undefined || funcao === null) {
                return Promise.reject("É necessário passar uma função para o método 'filtrarPor'");
            }
            const retorno = [];
            for (let elemento of vetor) {
                const resultadoChamada = await funcao.chamar(interpretador, [elemento]);
                if (resultadoChamada.hasOwnProperty('valorRetornado') &&
                    resultadoChamada.valorRetornado.valor === true) {
                    retorno.push(elemento);
                }
            }
            return retorno;
        },
        assinaturaFormato: 'vetor.filtrarPor(funcao: função)',
        documentacao: '# `vetor.filtrarPor(funcao)` \n \n' +
            'Devolve todos os elementos de um vetor cujo resultado da execução de uma função, passada por parâmetro, seja verdadeiro.\n' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3, 4, 5]\n' +
            'var funcaoNumerosImpares = funcao (n) { retorna n % 2 > 0 }\n' +
            'escreva(v.filtrarPor(funcaoNumerosImpares)) // "[1, 3, 5]"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.filtrarPor(funcao (argumento) { <corpo da função com retorna> })',
    },
    inclui: {
        tipoRetorno: 'lógico',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('elemento', 'qualquer', true, [], 'O elemento a ser verificado se está presente no vetor.'),
        ],
        implementacao: (interpretador, vetor, elemento) => Promise.resolve(vetor.includes(elemento)),
        assinaturaFormato: 'vetor.inclui(elemento: qualquer)',
        documentacao: '# `vetor.inclui(elemento)` \n \n' +
            'Verifica se o elemento existe no vetor. Devolve `verdadeiro` se existe, e `falso` em caso contrário.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3]\n' +
            'escreva(v.inclui(2)) // verdadeiro\n' +
            'escreva(v.inclui(4)) // falso\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.inclui(elemento)',
    },
    inverter: {
        tipoRetorno: 'qualquer[]',
        argumentos: [],
        implementacao: (interpretador, vetor) => Promise.resolve(vetor.reverse()),
        assinaturaFormato: 'vetor.inverter()',
        documentacao: '# `vetor.inverter()` \n \n' +
            'Inverte a ordem dos elementos de um vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3]\n' +
            'escreva(v.inverter()) // [3, 2, 1]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.inverter()',
    },
    juntar: {
        tipoRetorno: 'texto',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('separador', 'texto', true, [], 'O separador entre elementos do vetor para o texto.'),
        ],
        implementacao: (interpretador, vetor, separador) => Promise.resolve(vetor.join(separador)),
        assinaturaFormato: 'vetor.juntar(separador: texto)',
        documentacao: '# `vetor.juntar(separador = ",")` \n \n' +
            'Junta todos os elementos de um vetor em um texto, separando cada elemento pelo separador passado como parâmetro.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3]\n' +
            'escreva(v.juntar(":")) // "1:2:3"\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.juntar()\n' + 'vetor.juntar(<separador>)',
    },
    mapear: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('funcao', 'função', true, [], 'A função que transforma cada elemento de um vetor em outro elemento a ser retornado em um novo vetor.'),
        ],
        implementacao: async (interpretador, vetor, funcao) => {
            if (funcao === undefined || funcao === null) {
                return Promise.reject("É necessário passar uma função para o método 'mapear'");
            }
            const retorno = [];
            for (let elemento of vetor) {
                let resultado = await funcao.chamar(interpretador, [elemento]);
                retorno.push(interpretador.resolverValor(resultado));
            }
            return retorno;
        },
        assinaturaFormato: 'vetor.mapear(funcao: função)',
        documentacao: '# `vetor.mapear(funcao)`\n\n' +
            'Dada uma função passada como parâmetro, executa essa função para cada elemento do vetor. \n' +
            'Cada elemento retornado por esta função é adicionado ao vetor resultante. \n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar v = [1, 2, 3, 4, 5]\n' +
            'var funcaoPotenciasDeDois = funcao (n) { retorna n ** 2 }\n' +
            'escreva(v.mapear(funcaoPotenciasDeDois)) // [1, 4, 9, 16, 25]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.mapear(funcao (argumento) { <corpo da função com retorna> })',
    },
    ordenar: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('funcaoOrdenacao', 'função', false, [], '(Opcional) Função para guiar a ordenação.'),
        ],
        implementacao: async (interpretador, vetor, funcaoOrdenacao) => {
            if (funcaoOrdenacao !== undefined && funcaoOrdenacao !== null) {
                for (let i = 0; i < vetor.length - 1; i++) {
                    for (let j = 1; j < vetor.length; j++) {
                        const valorComparacao = await funcaoOrdenacao.chamar(interpretador, [
                            vetor[j - 1],
                            vetor[j],
                        ]);
                        const valorComparacaoResolvido = interpretador.resolverValor(valorComparacao);
                        if (valorComparacaoResolvido > 0) {
                            const aux = vetor[j];
                            vetor[j] = vetor[j - 1];
                            vetor[j - 1] = aux;
                        }
                    }
                }
                return vetor;
            }
            if (!vetor.every((v) => typeof v === 'number')) {
                vetor.sort();
            }
            else {
                vetor.sort((a, b) => a - b);
            }
            return vetor;
        },
        assinaturaFormato: 'vetor.ordenar()',
        documentacao: '# `vetor.ordenar()` \n \n' +
            'Ordena valores de um vetor em ordem crescente.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\n// A ordenação padrão é ascendente, ou seja, para o caso de números, a ordem fica do menor para o maior.\n' +
            'var v = [4, 2, 12, 5]\n' +
            'escreva(v.ordenar()) // [2, 4, 5, 12]\n' +
            '// Para o caso de textos, a ordenação é feita em ordem alfabética, caractere a caractere.\n' +
            'var v = ["aaa", "a", "aba", "abb", "abc"]\n' +
            'escreva(v.ordenar()) // ["a", "aaa", "aba", "abb", "abc"]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.ordenar()',
    },
    paraTupla: {
        tipoRetorno: 'tupla',
        argumentos: [],
        implementacao: (interpretador, vetor) => {
            if (vetor.length < 2) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao({
                    hashArquivo: interpretador.hashArquivoDeclaracaoAtual,
                    linha: interpretador.linhaDeclaracaoAtual,
                }, 'Para converter um vetor em tupla, ele precisa ter no mínimo 2 elementos.'));
            }
            const criarLiteral = (item) => new construtos_1.Literal(interpretador.hashArquivoDeclaracaoAtual, interpretador.linhaDeclaracaoAtual, item, (0, inferenciador_1.inferirTipoVariavel)(item));
            if (mapaConstrutoresTupla.hasOwnProperty(vetor.length)) {
                const Construtor = mapaConstrutoresTupla[vetor.length];
                const args = vetor.map(criarLiteral);
                return Promise.resolve(new Construtor(...args));
            }
            const elementos = vetor.map(criarLiteral);
            return Promise.resolve(new construtos_1.TuplaN(interpretador.hashArquivoDeclaracaoAtual, interpretador.linhaDeclaracaoAtual, elementos));
        },
        assinaturaFormato: 'vetor.paraTupla()',
        documentacao: '# `vetor.paraTupla()` \n \n' +
            'Converte o vetor atual em uma tupla imutável. Requer no mínimo 2 elementos.',
        exemploCodigo: 'vetor.paraTupla()',
    },
    remover: {
        tipoRetorno: 'qualquer[]',
        argumentos: [
            new informacao_elemento_sintatico_1.InformacaoElementoSintatico('elemento', 'qualquer', true, [], 'O elemento a ser removido do vetor.'),
        ],
        implementacao: (interpretador, vetor, elemento) => {
            const index = vetor.indexOf(elemento);
            if (index !== -1)
                vetor.splice(index, 1);
            return Promise.resolve(vetor);
        },
        assinaturaFormato: 'vetor.remover(elemento: qualquer)',
        documentacao: '# `vetor.remover(elemento)` \n \n' +
            'Remove um elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [1, 2, 3]\n' +
            'vetor.remover(2)\n' +
            'escreva(vetor) // [1, 3]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.remover(elemento)',
    },
    removerPrimeiro: {
        tipoRetorno: 'qualquer',
        argumentos: [],
        implementacao: (interpretador, vetor) => {
            let elemento = vetor.shift();
            return Promise.resolve(elemento);
        },
        assinaturaFormato: 'vetor.removerPrimeiro()',
        documentacao: '# `vetor.removerPrimeiro()` \n \n' +
            'Remove o primeiro elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [1, 2, 3]\n' +
            'var primeiroElemento = vetor.removerPrimeiro()\n' +
            'escreva(primeiroElemento) // 1\n' +
            'escreva(vetor) // [2, 3]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.removerPrimeiro()',
    },
    removerUltimo: {
        tipoRetorno: 'qualquer',
        argumentos: [],
        implementacao: (interpretador, vetor) => {
            let elemento = vetor.pop();
            return Promise.resolve(elemento);
        },
        assinaturaFormato: 'vetor.removerUltimo()',
        documentacao: '# `vetor.removerUltimo()` \n \n' +
            'Remove o último elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [1, 2, 3]\n' +
            'var ultimoElemento = vetor.removerUltimo()\n' +
            'escreva(ultimoElemento) // 3\n' +
            'escreva(vetor) // [1, 2]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.removerUltimo()',
    },
    removerÚltimo: {
        tipoRetorno: 'qualquer',
        argumentos: [],
        implementacao: (interpretador, vetor) => {
            let elemento = vetor.pop();
            return Promise.resolve(elemento);
        },
        assinaturaFormato: 'vetor.removerÚltimo()',
        documentacao: '# `vetor.removerÚltimo()` \n \n' +
            'Remove o último elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [1, 2, 3]\n' +
            'var ultimoElemento = vetor.removerÚltimo()\n' +
            'escreva(ultimoElemento) // 3\n' +
            'escreva(vetor) // [1, 2]\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.removerÚltimo()',
    },
    somar: {
        tipoRetorno: 'qualquer',
        argumentos: [],
        implementacao: (interpretador, vetor) => {
            return Promise.resolve(vetor.reduce((acc, item) => acc + (typeof item === 'number' ? item : item.valor), 0));
        },
        assinaturaFormato: 'vetor.somar()',
        documentacao: '# `vetor.somar()` \n \n' +
            'Soma ou concatena todos os elementos do vetor (de acordo com o tipo de dados desses elementos) e retorna o resultado.\n' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [1, 2, 3, 4, 5]\n' +
            'escreva(vetor.somar()) // 15\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.somar()',
    },
    tamanho: {
        tipoRetorno: 'número',
        argumentos: [],
        implementacao: (interpretador, vetor) => Promise.resolve(vetor.length),
        assinaturaFormato: 'vetor.tamanho()',
        documentacao: '# `vetor.tamanho()` \n \n' +
            'Retorna o número de elementos que compõem o vetor.\n' +
            '\n\n ## Exemplo de Código\n' +
            '\n\n```delegua\nvar vetor = [0, 1, 2, 3, 4]\n' +
            'escreva(vetor.tamanho()) // 5\n```' +
            '\n\n ### Formas de uso \n',
        exemploCodigo: 'vetor.tamanho()',
    },
};

},{"../construtos":40,"../excecoes":72,"../inferenciador":74,"../informacao-elemento-sintatico":75}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoIndiceVariavel = void 0;
/**
 * Definido como `Subscript` em Égua Clássico, esse construto serve para acessar índices de
 * vetores e dicionários.
 */
class AcessoIndiceVariavel {
    constructor(hashArquivo, entidadeChamada, indice, simboloFechamento, tipo = 'qualquer') {
        this.tipo = 'qualquer';
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.indice = indice;
        this.simboloFechamento = simboloFechamento;
        this.tipo = tipo;
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessoIntervaloVariavel = void 0;
/**
 * Construto para acesso de intervalos (fatiamento/slicing) em vetores.
 * Ex: vetor[1:4], vetor[1:4:2], vetor[1:], vetor[:3] ou vetor[:]
 */
class AcessoIntervaloVariavel {
    constructor(hashArquivo, entidadeChamada, indiceInicio, indiceFim, indicePasso, simboloFechamento, tipo = 'qualquer') {
        this.tipo = 'qualquer';
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.indiceInicio = indiceInicio;
        this.indiceFim = indiceFim;
        this.indicePasso = indicePasso;
        this.simboloFechamento = simboloFechamento;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAcessoIntervaloVariavel(this);
    }
    paraTexto() {
        const inicio = this.indiceInicio ? this.indiceInicio.paraTexto() : '(sem início)';
        const fim = this.indiceFim ? this.indiceFim.paraTexto() : '(sem fim)';
        const passo = this.indicePasso ? this.indicePasso.paraTexto() : '(sem passo)';
        return (`<acesso-índice-variável entidadeChamada=${this.entidadeChamada.paraTexto()} ` +
            `inicio=${inicio} ` +
            `fim=${fim}` +
            `passo=${passo}` +
            `/>`);
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.AcessoIntervaloVariavel = AcessoIntervaloVariavel;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjudaComoConstruto = void 0;
/**
 * Ajuda pode ser declaração ou construto. Para construto, o comportamento é
 * um pouco diferente do de ajuda como declaração. Por exemplo, se usado com
 * operadores, sempre resolve como um `texto`.
 */
class AjudaComoConstruto {
    constructor(hashArquivo, linha, elemento, funcao = true) {
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.valor = elemento;
        this.funcao = funcao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAjuda(this);
    }
    paraTexto() {
        let retorno = `<ajuda `;
        if (this.valor) {
            retorno += `elemento=${this.valor.paraTexto()} `;
        }
        retorno += `funcao=${this.funcao ? 'Sim' : 'Não'} />`;
        return retorno;
    }
    paraTextoSaida() {
        throw new Error('Method not implemented.');
    }
}
exports.AjudaComoConstruto = AjudaComoConstruto;

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
const variavel_1 = require("./variavel");
/**
 * Construto de atribuição de um valor a um símbolo.
 */
class Atribuir {
    constructor(hashArquivo, alvo, valor, indice, simboloOperador) {
        this.linha = Number(alvo.linha);
        this.hashArquivo = hashArquivo;
        this.alvo = alvo;
        this.valor = valor;
        if (indice !== undefined) {
            const alvoComoVariavel = alvo;
            const tipoAlvo = alvoComoVariavel?.tipo;
            const alvoSuportaIndice = alvo instanceof variavel_1.Variavel &&
                (tipoAlvo === 'vetor' ||
                    tipoAlvo === 'dicionário' ||
                    tipoAlvo === 'qualquer' ||
                    tipoAlvo?.endsWith('[]'));
            if (!alvoSuportaIndice) {
                throw new Error('`indice` só pode ser informado quando o alvo for uma variável de vetor ou dicionário.');
            }
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

},{"./variavel":68}],23:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binario = void 0;
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
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
    /**
     * Dedução otimista de tipos para expressões binárias.
     * @returns O tipo deduzido.
     */
    deduzirTipo() {
        if ([
            delegua_1.default.MAIOR,
            delegua_1.default.MAIOR_IGUAL,
            delegua_1.default.MENOR,
            delegua_1.default.MENOR_IGUAL,
            delegua_1.default.IGUAL,
            delegua_1.default.IGUAL_IGUAL,
            delegua_1.default.DIFERENTE,
        ].includes(this.operador.tipo)) {
            return 'lógico';
        }
        if (['logico', 'lógico'].includes(this.esquerda.tipo) ||
            ['logico', 'lógico'].includes(this.direita.tipo)) {
            return 'lógico';
        }
        if (this.esquerda.tipo === 'texto' || this.direita.tipo === 'texto') {
            return 'texto';
        }
        if (['numero', 'número'].includes(this.esquerda.tipo) ||
            ['numero', 'número'].includes(this.direita.tipo)) {
            return 'número';
        }
        if (this.esquerda.tipo === this.direita.tipo) {
            return this.esquerda.tipo;
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

},{"../tipos-de-simbolos/delegua":78}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bote = void 0;
class Bote {
    constructor(hashArquivo, linha, esquerda, direita) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoBote(this);
    }
    paraTexto() {
        return `<bote />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Bote = Bote;

},{}],25:[function(require,module,exports){
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
        let argumentos = '';
        for (let indice = 0; indice < this.argumentos.length; indice++) {
            argumentos += this.argumentos[indice].paraTexto();
        }
        return `<chamada entidadeChamada=${this.entidadeChamada.paraTexto()} argumentos=[${argumentos}] />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Chamada = Chamada;

},{"../geracao-identificadores":73}],26:[function(require,module,exports){
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
        this.multilinha = ['COMENTARIO_MULTILINHA', 'DOCUMENTARIO'].includes(simboloComentario.tipo);
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
        let atributos = '';
        for (const chave in this.atributos) {
            if (!Object.prototype.hasOwnProperty.call(this.atributos, chave)) {
                continue;
            }
            const valor = this.atributos[chave];
            const valorTexto = valor && typeof valor === 'object' && typeof valor.paraTexto === 'function'
                ? valor.paraTexto()
                : valor;
            atributos += `${chave}=${valorTexto} `;
        }
        if (atributos.length > 0) {
            return `<decorador nome=${this.nome} ${atributos.slice(0, -1)} />`;
        }
        return `<decorador nome=${this.nome} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Decorador = Decorador;

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
class Dicionario {
    constructor(hashArquivo, linha, chaves, valores, esSpread) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.chaves = chaves;
        this.valores = valores;
        this.tipo = 'dicionário';
        this.esSpread = esSpread || chaves.map(() => false);
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoConstruto = void 0;
class FuncaoConstruto {
    constructor(hashArquivo, linha, parametros, corpo, tipoRetorno, tipoExplicito, documentacao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.corpo = corpo;
        this.tipo = tipoRetorno;
        this.tipoExplicito = tipoExplicito || false;
        this.documentacao = documentacao;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoFuncaoConstruto(this));
    }
    paraTexto() {
        let parametros = '';
        for (let indice = 0; indice < this.parametros.length; indice++) {
            const parametro = this.parametros[indice];
            parametros += `${parametro.nome.lexema}:${parametro.tipoDado}`;
            if (indice < this.parametros.length - 1) {
                parametros += ',';
            }
        }
        let corpo = '';
        for (let indice = 0; indice < this.corpo.length; indice++) {
            corpo += this.corpo[indice].paraTexto();
        }
        return `<construto-função parâmetros=[${parametros}] corpo=[${corpo}] tipoRetorno=${this.tipo} tipoExplícito=${this.tipoExplicito ? 'Sim' : 'Não'} />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.FuncaoConstruto = FuncaoConstruto;

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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
__exportStar(require("./acesso-intervalo-variavel"), exports);
__exportStar(require("./acesso-metodo"), exports);
__exportStar(require("./acesso-metodo-ou-propriedade"), exports);
__exportStar(require("./acesso-propriedade"), exports);
__exportStar(require("./agrupamento"), exports);
__exportStar(require("./ajuda-como-construto"), exports);
__exportStar(require("./argumento-referencia-funcao"), exports);
__exportStar(require("./atribuicao-por-indice"), exports);
__exportStar(require("./atribuicao-por-indices-matriz"), exports);
__exportStar(require("./atribuir"), exports);
__exportStar(require("./binario"), exports);
__exportStar(require("./bote"), exports);
__exportStar(require("./chamada"), exports);
__exportStar(require("./comentario-como-construto"), exports);
__exportStar(require("./componente-linguagem"), exports);
__exportStar(require("./constante"), exports);
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
__exportStar(require("./morsa"), exports);
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
__exportStar(require("./tupla-n"), exports);
__exportStar(require("./unario"), exports);
__exportStar(require("./variavel"), exports);
__exportStar(require("./vetor"), exports);

},{"./acesso-elemento-matriz":11,"./acesso-indice-variavel":12,"./acesso-intervalo-variavel":13,"./acesso-metodo":15,"./acesso-metodo-ou-propriedade":14,"./acesso-propriedade":16,"./agrupamento":17,"./ajuda-como-construto":18,"./argumento-referencia-funcao":19,"./atribuicao-por-indice":20,"./atribuicao-por-indices-matriz":21,"./atribuir":22,"./binario":23,"./bote":24,"./chamada":25,"./comentario-como-construto":26,"./componente-linguagem":27,"./constante":28,"./decorador":29,"./definir-valor":30,"./dicionario":31,"./elvis":32,"./enquanto-como-construto":33,"./expressao-regular":34,"./fazer-como-construto":35,"./fim-para":36,"./formatacao-escrita":37,"./funcao":38,"./importar-como-construto":39,"./isto":41,"./leia":42,"./lista-compreensao":43,"./literal":44,"./logico":45,"./morsa":46,"./para-cada-como-construto":47,"./para-como-construto":48,"./referencia-biblioteca-global":49,"./referencia-funcao":50,"./se-ternario":51,"./separador":52,"./super":53,"./tipo-de":54,"./tupla":56,"./tupla-n":55,"./tuplas":59,"./unario":67,"./variavel":68,"./vetor":69}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
class Isto {
    constructor(hashArquivo, linha, simboloChave) {
        this.tipo = 'qualquer';
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.simboloChave = simboloChave;
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

},{}],42:[function(require,module,exports){
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
        this.tipo = 'texto';
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

},{"../geracao-identificadores":73}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
class Literal {
    constructor(hashArquivo, linha, valor, tipo = 'qualquer', delimitadorTexto) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
        this.tipo = tipo;
        this.delimitadorTexto = delimitadorTexto;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLiteral(this);
    }
    paraTexto() {
        let valor = this.valor;
        if (this.valor.hasOwnProperty('paraTextoSaida')) {
            valor = this.valor.paraTextoSaida();
        }
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

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
class Logico {
    constructor(hashArquivo, esquerda, operador, direita) {
        this.negado = false;
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

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Morsa = void 0;
class Morsa {
    constructor(hashArquivo, variavel, valor) {
        this.linha = Number(variavel.linha);
        this.hashArquivo = hashArquivo;
        this.variavel = variavel;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoMorsa(this);
    }
    paraTexto() {
        return `<morsa />`;
    }
    paraTextoSaida() {
        throw new Error('Método não implementado.');
    }
}
exports.Morsa = Morsa;

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuplaN = void 0;
const tupla_1 = require("./tupla");
class TuplaN extends tupla_1.Tupla {
    constructor(hashArquivo, linha, elementos) {
        super();
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.elementos = elementos;
        this.tipo = 'tupla';
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoTuplaN(this);
    }
    paraTexto() {
        const elementosTexto = this.elementos.map((elemento) => elemento.paraTexto()).join(', ');
        return `(${elementosTexto})`;
    }
    paraTextoSaida() {
        const elementosTexto = this.elementos
            .map((elemento) => elemento.paraTextoSaida())
            .join(', ');
        return `(${elementosTexto})`;
    }
}
exports.TuplaN = TuplaN;

},{"./tupla":56}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tupla = void 0;
class Tupla {
    async aceitar(visitante) {
        return await visitante.visitarExpressaoTupla(this);
    }
}
exports.Tupla = Tupla;

},{}],57:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()}, ${this.nono.paraTextoSaida()}, ${this.decimo.paraTextoSaida()})`;
    }
}
exports.Deceto = Deceto;

},{"../tupla":56}],58:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()})`;
    }
}
exports.Dupla = Dupla;

},{"../tupla":56}],59:[function(require,module,exports){
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

},{"./deceto":57,"./dupla":58,"./noneto":60,"./octeto":61,"./quarteto":62,"./quinteto":63,"./septeto":64,"./sexteto":65,"./trio":66}],60:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()}, ${this.nono.paraTextoSaida()})`;
    }
}
exports.Noneto = Noneto;

},{"../tupla":56}],61:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()}, ${this.oitavo.paraTextoSaida()})`;
    }
}
exports.Octeto = Octeto;

},{"../tupla":56}],62:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()})`;
    }
}
exports.Quarteto = Quarteto;

},{"../tupla":56}],63:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, , ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()})`;
    }
}
exports.Quinteto = Quinteto;

},{"../tupla":56}],64:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()}, ${this.setimo.paraTextoSaida()})`;
    }
}
exports.Septeto = Septeto;

},{"../tupla":56}],65:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()}, ${this.quarto.paraTextoSaida()}, ${this.quinto.paraTextoSaida()}, ${this.sexto.paraTextoSaida()})`;
    }
}
exports.Sexteto = Sexteto;

},{"../tupla":56}],66:[function(require,module,exports){
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
        return `(${this.primeiro.paraTextoSaida()}, ${this.segundo.paraTextoSaida()}, ${this.terceiro.paraTextoSaida()})`;
    }
}
exports.Trio = Trio;

},{"../tupla":56}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
class Unario {
    constructor(hashArquivo, operador, operando, incidenciaOperador = 'ANTES') {
        this.tipo = 'qualquer';
        this.linha = operador.linha;
        this.hashArquivo = hashArquivo;
        this.operador = operador;
        this.operando = operando;
        this.incidenciaOperador = incidenciaOperador;
        this.tipo = operando.tipo;
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
const comentario_como_construto_1 = require("./comentario-como-construto");
const separador_1 = require("./separador");
class Vetor {
    constructor(hashArquivo, linha, valores, tipo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.tipo = tipo;
        this.valores = valores;
    }
    /**
     * Retorna apenas os elementos de dados do vetor, excluindo nós sintáticos
     * (Separador, comentários) que podem aparecer entre os elementos.
     */
    get elementos() {
        return this.valores.filter((v) => v.constructor !== separador_1.Separador && v.constructor !== comentario_como_construto_1.ComentarioComoConstruto);
    }
    get tamanho() {
        return this.elementos.length;
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

},{"./comentario-como-construto":26,"./separador":52}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroDeAssertiva = void 0;
const erro_em_tempo_de_execucao_1 = require("./erro-em-tempo-de-execucao");
class ErroDeAssertiva extends erro_em_tempo_de_execucao_1.ErroEmTempoDeExecucao {
    constructor(simbolo, mensagem, esperado, obtido) {
        super(simbolo, mensagem);
        this.esperado = esperado;
        this.obtido = obtido;
        Object.setPrototypeOf(this, ErroDeAssertiva.prototype);
    }
}
exports.ErroDeAssertiva = ErroDeAssertiva;

},{"./erro-em-tempo-de-execucao":71}],71:[function(require,module,exports){
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
__exportStar(require("./erro-de-assertiva"), exports);
__exportStar(require("./erro-em-tempo-de-execucao"), exports);

},{"./erro-de-assertiva":70,"./erro-em-tempo-de-execucao":71}],73:[function(require,module,exports){
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
            r = ((d + r) % 16) | 0;
            d = Math.floor(d / 16);
        }
        else {
            // Use microseconds since page-load if supported
            r = ((d2 + r) % 16) | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

},{}],74:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoNativoSimbolo = void 0;
exports.inferirTipoVariavel = inferirTipoVariavel;
const primitivos_1 = __importDefault(require("./tipos-de-dados/primitivos"));
const delegua_1 = __importDefault(require("./tipos-de-dados/delegua"));
const delegua_2 = __importDefault(require("./tipos-de-simbolos/delegua"));
var TipoNativoSimbolo;
(function (TipoNativoSimbolo) {
    TipoNativoSimbolo["ESCREVA"] = "<palavra reservada escreva ajuda=\"palavra reservada usada para apresentar informa\u00E7\u00F5es\">";
    TipoNativoSimbolo["LEIA"] = "<palavra reservada leia ajuda=\"palavra reservada usada para entrada de dados\">";
    TipoNativoSimbolo["FUNCAO"] = "<palavra reservada funcao ajuda=\"palavra reservada usada para criar fun\u00E7\u00F5es\">";
    TipoNativoSimbolo["SE"] = "<palavra reservada se ajuda=\"palavra reservada usada para estruturas condicionais\">";
    TipoNativoSimbolo["ENQUANTO"] = "<palavra reservada enquanto ajuda=\"palavra reservada usada para loops enquanto\">";
    TipoNativoSimbolo["PARA"] = "<palavra reservada para ajuda=\"palavra reservada usada para loops para\">";
    TipoNativoSimbolo["RETORNA"] = "<palavra reservada retornar ajuda=\"palavra reservada usada para retornar valores em fun\u00E7\u00F5es\">";
    TipoNativoSimbolo["INTEIRO"] = "<palavra reservada inteiro ajuda=\"palavra reservada usada para definir vari\u00E1veis do tipo inteiro\">";
    TipoNativoSimbolo["TEXTO"] = "<palavra reservada texto ajuda=\"palavra reservada usada para definir vari\u00E1veis do tipo texto\">";
    TipoNativoSimbolo["BOOLEANO"] = "<palavra reservada booleano ajuda=\"palavra reservada usada para definir vari\u00E1veis do tipo booleano\">";
    TipoNativoSimbolo["VAZIO"] = "<palavra reservada vazio ajuda=\"palavra reservada usada para definir fun\u00E7\u00F5es que n\u00E3o retornam valores\">";
})(TipoNativoSimbolo || (exports.TipoNativoSimbolo = TipoNativoSimbolo = {}));
function inferirVetor(vetor) {
    const tiposEmVetor = new Set(vetor.map((elemento) => {
        if (elemento === null || elemento === undefined)
            return 'nulo';
        return elemento.constructor.name;
    }));
    if (tiposEmVetor.size > 1) {
        return 'vetor';
    }
    const tipoVetor = tiposEmVetor.values().next().value;
    switch (tipoVetor) {
        case 'bigint':
            return 'longo[]';
        case 'boolean':
            return 'lógico[]';
        case 'number':
            return 'número[]';
        case 'string':
            return 'texto[]';
        case 'object':
            const tiposObjetosEmVetor = new Set(vetor.map((elemento) => elemento.tipo));
            if (tiposObjetosEmVetor.size > 1) {
                return 'vetor';
            }
            return `${tiposObjetosEmVetor.values().next().value}[]`;
        case 'Literal':
            const tiposLiterais = new Set(vetor.map((e) => e.tipo));
            if (tiposLiterais.size > 1)
                return 'vetor';
            return `${tiposLiterais.values().next().value}[]`;
        default:
            return 'vetor';
    }
}
function inferirTipoVariavel(variavel) {
    if (variavel === null) {
        return 'nulo';
    }
    const tipo = variavel && variavel.constructor ? variavel.constructor.name : typeof variavel;
    switch (tipo) {
        case 'String':
        case 'string':
            return 'texto';
        case 'Number':
        case 'number':
            return 'número';
        case 'BigInt':
        case 'bigint':
            return 'longo';
        case 'Boolean':
        case 'boolean':
            return 'lógico';
        case 'undefined':
            return 'nulo';
        case 'Object':
        case 'object':
            if (variavel === null)
                return 'nulo';
            return 'dicionário';
        case 'Array':
        case 'Vetor':
            return inferirVetor(variavel);
        case 'DeleguaFuncao':
            return 'função';
        case 'DeleguaModulo':
            return 'módulo';
        case 'Classe':
        case 'DescritorTipoClasse':
        case 'ObjetoDeleguaClasse':
            return 'objeto';
        case 'Simbolo':
            const simbolo = variavel;
            switch (simbolo.tipo) {
                case primitivos_1.default.BOOLEANO:
                    return TipoNativoSimbolo.BOOLEANO;
                case delegua_2.default.ENQUANTO:
                    return TipoNativoSimbolo.ENQUANTO;
                case delegua_2.default.ESCREVA:
                    return TipoNativoSimbolo.ESCREVA;
                case delegua_2.default.FUNCAO:
                case delegua_2.default.FUNÇÃO:
                    return TipoNativoSimbolo.FUNCAO;
                case delegua_2.default.LEIA:
                    return TipoNativoSimbolo.LEIA;
                case delegua_2.default.PARA:
                    return TipoNativoSimbolo.PARA;
                case delegua_2.default.RETORNA:
                    return TipoNativoSimbolo.RETORNA;
                case delegua_2.default.SE:
                    return TipoNativoSimbolo.SE;
                case primitivos_1.default.TEXTO:
                    return TipoNativoSimbolo.TEXTO;
                case delegua_1.default.VAZIO:
                    return TipoNativoSimbolo.VAZIO;
            }
        case 'function':
        case 'FuncaoPadrao':
            return 'função';
        case 'symbol':
            return 'símbolo';
    }
}

},{"./tipos-de-dados/delegua":76,"./tipos-de-dados/primitivos":77,"./tipos-de-simbolos/delegua":78}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DICIONARIO: 'dicionario',
    DICIONÁRIO: 'dicionário',
    FUNCAO: 'funcao',
    FUNÇÃO: 'função',
    INTEIRO: 'inteiro',
    LOGICO: 'logico',
    LÓGICO: 'lógico',
    LONGO: 'longo',
    MODULO: 'modulo',
    MÓDULO: 'módulo',
    NUMERO: 'numero',
    NÚMERO: 'número',
    NULO: 'nulo',
    OBJETO: 'objeto',
    QUALQUER: 'qualquer',
    REAL: 'real',
    TEXTO: 'texto',
    TUPLA: 'tupla',
    VAZIO: 'vazio',
    VETOR: 'vetor',
    VETOR_INTEIRO: 'inteiro[]',
    VETOR_LOGICO: 'logico[]',
    VETOR_LÓGICO: 'lógico[]',
    VETOR_LONGO: 'longo[]',
    VETOR_NUMERO: 'numero[]',
    VETOR_NÚMERO: 'número[]',
    VETOR_QUALQUER: 'qualquer[]',
    VETOR_TEXTO: 'texto[]',
};

},{}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    BOOLEANO: 'boolean',
    DATA: 'Date',
    FUNCAO: 'function',
    INDEFINIDO: undefined,
    MAPA: 'Map',
    NULO: null,
    NUMERO: 'number',
    OBJETO: 'object',
    PROMESSA: 'Promise',
    QUALQUER: 'any',
    REGEX: 'RegExp',
    SIMBOLO: 'symbol',
    TEXTO: 'string',
};

},{}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ADICAO: 'ADICAO',
    ASSERCAO: 'ASSERCAO',
    ABSTRATO: 'ABSTRATO',
    AJUDA: 'AJUDA',
    ARROBA: 'ARROBA',
    BIT_AND: 'BIT_AND',
    BIT_OR: 'BIT_OR',
    CIRCUMFLEXO: 'BIT_XOR',
    BIT_NOT: 'BIT_NOT',
    CADA: 'CADA',
    CASO: 'CASO',
    CHAVE_DIREITA: 'CHAVE_DIREITA',
    CHAVE_ESQUERDA: 'CHAVE_ESQUERDA',
    CLASSE: 'CLASSE',
    COLCHETE_DIREITO: 'COLCHETE_DIREITO',
    COLCHETE_ESQUERDO: 'COLCHETE_ESQUERDO',
    COMENTARIO: 'COMENTARIO',
    DOCUMENTARIO: 'DOCUMENTARIO',
    COMO: 'COMO',
    CONSTANTE: 'CONSTANTE',
    CONSTRUTOR: 'CONSTRUTOR',
    CONTEM: 'CONTEM',
    CONTINUA: 'CONTINUA',
    DE: 'DE',
    DECREMENTAR: 'DECREMENTAR',
    DIFERENTE: 'DIFERENTE',
    DIVISAO: 'DIVISAO',
    DIVISAO_IGUAL: 'DIVISAO_IGUAL',
    DIVISAO_INTEIRA: 'DIVISAO_INTEIRA',
    DIVISAO_INTEIRA_IGUAL: 'DIVISAO_INTEIRA_IGUAL',
    DOIS_PONTOS: 'DOIS_PONTOS',
    E: 'E',
    ELVIS: 'ELVIS',
    ESTRANGEIRA: 'ESTRANGEIRA',
    EXTENSAO: 'EXTENSAO',
    EM: 'EM',
    ENQUANTO: 'ENQUANTO',
    EOF: 'EOF',
    ESCOLHA: 'ESCOLHA',
    ESCREVA: 'ESCREVA',
    EXPONENCIACAO: 'EXPONENCIACAO',
    EXPRESSAO_REGULAR: 'EXPRESSAO_REGULAR',
    FALHAR: 'FALHAR',
    FALSO: 'FALSO',
    FAZER: 'FAZER',
    FINALMENTE: 'FINALMENTE',
    FUNCAO: 'FUNCAO',
    FUNÇÃO: 'FUNÇÃO',
    HERDA: 'HERDA',
    IDENTIFICADOR: 'IDENTIFICADOR',
    IMPLEMENTA: 'IMPLEMENTA',
    MESCLA: 'MESCLA',
    INTERFACE: 'INTERFACE',
    IGUAL: 'IGUAL',
    IGUAL_IGUAL: 'IGUAL_IGUAL',
    IMPORTAR: 'IMPORTAR',
    INCREMENTAR: 'INCREMENTAR',
    INTERROGACAO: 'INTERROGACAO',
    ISTO: 'ISTO',
    LEIA: 'LEIA',
    LINHA_COMENTARIO: 'LINHA_COMENTARIO',
    MAIOR: 'MAIOR',
    MAIOR_IGUAL: 'MAIOR_IGUAL',
    MAIOR_MAIOR: 'MAIOR_MAIOR',
    MAIS_IGUAL: 'MAIS_IGUAL',
    MENOR: 'MENOR',
    MENOR_IGUAL: 'MENOR_IGUAL',
    MENOR_MENOR: 'MENOR_MENOR',
    MENOS_IGUAL: 'MENOS_IGUAL',
    MODULO: 'MODULO',
    MODULO_IGUAL: 'MODULO_IGUAL',
    MULTIPLICACAO: 'MULTIPLICACAO',
    MULTIPLICACAO_IGUAL: 'MULTIPLICACAO_IGUAL',
    NAO: 'NAO',
    OPERADOR: 'OPERADOR',
    NEGACAO: 'NEGACAO',
    NULO: 'NULO',
    NUMERO: 'NUMERO',
    NÚMERO: 'NÚMERO',
    OU: 'OU',
    PADRAO: 'PADRAO',
    PADRÃO: 'PADRÃO',
    PARA: 'PARA',
    PARENTESE_DIREITO: 'PARENTESE_DIREITO',
    PARENTESE_ESQUERDO: 'PARENTESE_ESQUERDO',
    PEGUE: 'PEGUE',
    PRIVADO: 'PRIVADO',
    PROTEGIDO: 'PROTEGIDO',
    PUBLICO: 'PUBLICO',
    PONTO: 'PONTO',
    PONTO_E_VIRGULA: 'PONTO_E_VIRGULA',
    QUEBRAR: 'QUEBRAR',
    RETORNA: 'RETORNA',
    RETICENCIAS: 'RETICENCIAS',
    SUBTRACAO: 'SUBTRACAO',
    SE: 'SE',
    SENAO: 'SENAO',
    SENÃO: 'SENÃO',
    SETA_ESQUERDA: 'SETA_ESQUERDA',
    SUPER: 'SUPER',
    ESTATICO: 'ESTATICO',
    SUSTAR: 'SUSTAR',
    TENDO: 'TENDO',
    TENTE: 'TENTE',
    TEXTO: 'TEXTO',
    TIPO: 'TIPO',
    TUDO: 'TUDO',
    VARIAVEL: 'VARIAVEL',
    VERDADEIRO: 'VERDADEIRO',
    VIRGULA: 'VIRGULA',
};

},{}]},{},[1])(1)
});
