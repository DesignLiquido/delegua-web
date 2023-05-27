var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Exemplos = {
    OlaMundo: 'escreva("Olá, mundo!");',
    OperacoesBasicas: "var a = 10;\nvar b = 4;\n\nescreva(\"Valor de A: \" + texto(a));\n\nescreva(\"Valor de B: \" + texto(b));\n\nvar soma = a + b; // Soma os dois valores\nvar sub  = a - b; // Subtrai os dois valores\nvar mult = a * b; // Multiplica os dois valores\nvar div  = a / b; // Divide os dois valores\n\nescreva(\"A soma dos n\u00FAmeros \u00E9 igual a: \" + texto(soma));\t    // Exibe o resultado da soma\nescreva(\"A subtra\u00E7\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(sub));\t    // Exibe o resultado da subtra\u00E7\u00E3o\nescreva(\"A multiplica\u00E7\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(mult));   // Exibe o resultado da multiplica\u00E7\u00E3o\nescreva(\"A divis\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(div));          // Exibe o resultado da divis\u00E3o",
    Condicional: "var letra = leia('Digite uma letra:');\n// \u00C9 necess\u00E1rio verificar letras min\u00FAsculas e mai\u00FAsculas\nse\n  (\n    letra == 'A' ou letra == 'E' ou letra == 'I' ou letra == 'O' ou letra == 'U' ou\n    letra == 'a' ou letra == 'e' ou letra == 'i' ou letra == 'o' ou letra == 'u'\n  ){\n    escreva(\"A letra \" + letra + \" \u00E9 uma vogal!\");\n  }\nsen\u00E3o {\n  escreva(\"A letra \" + letra + \" n\u00E3o \u00E9 uma vogal!\");\n}",
    Classe: "classe Animal {\n  correr() {\n    escreva(\"Correndo Loucamente\");\n  }\n}\nclasse Cachorro herda Animal {\n  latir() {\n    escreva(\"Au Au Au Au\");\n  }\n}\nvar nomeDoCachorro = Cachorro();\nnomeDoCachorro.correr();\nnomeDoCachorro.latir();",
    MergeSort: "var vetor1 = [8, 2, 9, 5];\nvar a = 0;\nvar aux = 0;\nvar i = 0;\nescreva (\"Vetor: Posi\u00E7\u00E3o[0]:\" + texto(vetor1[0]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[1]:\" + texto(vetor1[1]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[2]:\" + texto(vetor1[2]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[3]:\" + texto(vetor1[3]));\npara (i = 0; i < 3; i = i + 1) {\n  se (vetor1[i] > vetor1[i+1]) {  \n    escreva (\"Vetor \" + texto(i));\n    aux = vetor1[i];\n    vetor1[i] = vetor1[i+1];\n    vetor1[i+1] = aux;\n    escreva(vetor1[i]);\n    escreva(vetor1[i+1]);\n  }\n}\nvar vetor2 = [vetor1[0], vetor1[1]];\nvar vetor3 = [vetor1[2], vetor1[3]];\nvar vetor4 = [];\npara (a = 0; a < 4; a = a + 1) {\n  escreva (\"vetor1(\" + texto(a) + \")\");\n  escreva (vetor1[a]);\n}\npara (a = 0; a < 2; a = a + 1) {\n  escreva (\"vetor2(\" + texto(a) + \")\");\n  escreva (vetor2[a]);\n}\npara (a = 0; a < 2; a = a + 1) {\n  escreva (\"vetor3(\" + texto(a) + \")\");\n  escreva (vetor3[a]);\n}\nse (vetor2[0] < vetor3[0] e vetor2[1] < vetor3[1]) {\n  vetor4[0] = vetor2[0];\n  se (vetor3[0] < vetor2[1]) {\n    vetor4[1] = vetor3[0];\n    vetor4[2] = vetor2[1];\n    vetor4[3] = vetor3[1];\n  } sen\u00E3o {\n    vetor4[1] = vetor2[1];\n    vetor4[2] = vetor3[0];\n    vetor4[3] = vetor3[1];\n  }\n}          \npara (a = 0; a < 4; a = a + 1) {\n  escreva (\"vetor4(\" + texto(vetor4[a]) + \")\");\n}",
    Bhaskara: "funcao bhaskara(a,b,c) {\n  // A vari\u00E1vel \"d\" vai simbolizar o Delta.\n  // \"a\", \"b\", e \"c\" ir\u00E3o representar os coeficientes da equa\u00E7\u00E3o.\n  var d = b ** 2;\n  var f = 4 * a * c; \n            \n  d = d - f;\n            \n  escreva(\"O valor de Delta \u00E9: \" + texto(d));\n            \n  d = d ** 0.5;\n            \n  // Encontrando os valores de X1 e X2.\n  var x1 = -b + d;\n  x1 = x1 / 2 * a;\n  escreva(\"O valor de X1 \u00E9: \"+ texto(x1));\n            \n  var x2 = -b-d;\n  x2 = x2 / 2 * a;\n  escreva(\"O valor de X2 \u00E9: \"+ texto(x2));\n  // Resultado das substitui\u00E7\u00F5es de X por X1 e X2 na equa\u00E7\u00E3o.\n  var r1 = x1 ** 2;\n  r1 = a * r1;\n  r1 = b * x1 + r1;\n  r1 = r1 + c;\n  escreva(\"Substituindo X1 na equa\u00E7\u00E3o obt\u00E9m-se:\"+ texto(r1));\n  var r2 = x2 ** 2;\n  r2 = a * r2;\n  r2 = b * x2 + r2;\n  r2 = r2 + c;\n  escreva(\"Substituindo X2 na equa\u00E7\u00E3o obt\u00E9m-se:\"+ texto(r2));\n}\n// Insira o valor do coeficiente A:\nvar a = 1;\n// Insira o valor do coeficiente B:\nvar b = -1;\n// Insira o valor do coeficiente B:\nvar c = -30;\nbhaskara(a,b,c);",
    Fibonacci: "// Recurs\u00E3o para o c\u00E1lculo da sequ\u00EAncia de Fibonacci\nfuncao fibonacci(n) {\n  se (n == 0) {\n    retorna(0);\n  }\n  se(n == 1) {\n    retorna(1);\n  }\n          \n  var n1 = n-1;\n  var n2 = n-2;\n  var f1 = fibonacci(n1);\n  var f2 = fibonacci(n2);\n  retorna(f1 + f2);\n}\nvar a = fibonacci(0);\nescreva(a);\na = fibonacci(1);\nescreva(a);\na = fibonacci(2);\nescreva(a);\na = fibonacci(3);\nescreva(a);\na = fibonacci(4);\nescreva(a);\na = fibonacci(5);\nescreva(a);",
    Perceptron: "var pesoInicial1 = 0.3;\nvar pesoInicial2 = 0.4;\nvar entrada1 = 1;\nvar entrada2 = 1;\nvar erro = 1;\nvar resultadoEsperado;\nenquanto (erro != 0) {\n  se (entrada1 == 1) {\n    se (entrada2 == 1) {\n      resultadoEsperado = 1;\n    }\n  } sen\u00E3o {\n    resultadoEsperado = 0;\n  }\n          \n  var somatoria = pesoInicial1 * entrada1;\n  somatoria = pesoInicial2 * entrada2 + somatoria;\n          \n  var resultado;\n          \n  se (somatoria < 1) {\n    resultado = 0;\n  } sen\u00E3o {\n    se (somatoria >= 1) {\n      resultado = 1;\n    }\n  }\n          \n  escreva(\"resultado: \" + texto(resultado));\n  \n  erro = resultadoEsperado - resultado;\n  escreva(\"p1: \" + texto(pesoInicial1));\n  escreva(\"p2: \" + texto(pesoInicial2));\n  pesoInicial1 = 0.1 * entrada1 * erro + pesoInicial1;\n  pesoInicial2 = 0.1 * entrada2 * erro + pesoInicial2;\n  escreva(\"erro: \" + texto(erro));\n}",
    FilaEstatica: "funcao enfileirar (valorEntrada) {\n  se (indexFinal == maximoDeElementos) {\n    escreva(\"Fila Cheia\");\n  } senao {\n  filaEstatica[indexFinal] = valorEntrada;\n  escreva(\"Valor inserido com sucesso: \" + texto(filaEstatica[indexFinal]));\n    retorna indexFinal = indexFinal + 1;\n  }\n}\nfun\u00E7\u00E3o desenfileirar() {\n  se (indexInicial == indexFinal) {\n    escreva(\"Fila Vazia\");\n  } senao {\n    para (i = 0; i <= indexFinal; i = i + 1){\n      se (i + 1 == indexFinal) {\n        indexFinal = indexFinal - 1;\n        escreva(\"Valor retirado com sucesso.\");\n      } senao {\n        filaEstatica[i] = filaEstatica[i+1];\n      }\n    }\n  }\n}\nfun\u00E7\u00E3o mostrar_fila() {\n  se (indexInicial == indexFinal) {\n    escreva(\"Fila Vazia\");\n  } senao {\n    para (var i = 0; i < indexFinal; i = i + 1) {\n      escreva(\"index \" + texto(i)); \n      escreva(texto(filaEstatica[i]));\n    }\n  }\n}\nvar maximoDeElementos = 4;\nvar indexInicial = 0;\nvar indexFinal = 0;\n// Variavel de controle em itera\u00E7\u00F5es\nvar i = 0;\nvar filaEstatica = [];\n// Demonstra\u00E7\u00E3o de uso das fun\u00E7\u00F5es:\nmostrar_fila();\nvar valorEntrada = 2;\nenfileirar(valorEntrada);\nvar valorEntrada = 8;\nenfileirar(valorEntrada);\nvar valorEntrada = 23;\nenfileirar(valorEntrada);\nvar valorEntrada = 7;\nenfileirar(valorEntrada);\nmostrar_fila();\ndesenfileirar();\nmostrar_fila();\nvar valorEntrada = 24;\nenfileirar(valorEntrada);\nmostrar_fila();",
};
function definirLinguagemDelegua() {
    return {
        defaultToken: 'invalid',
        tokenPostfix: '.delegua',
        keywords: [
            // Should match the keys of textToKeywordObj in
            // https://github.com/microsoft/TypeScript/blob/master/src/compiler/scanner.ts
            'cada',
            'caso',
            'classe',
            'const',
            'constante',
            'continua',
            'de',
            'em',
            'enquanto',
            'escolha',
            'falhar',
            'falso',
            'fazer',
            'finalmente',
            'fixo',
            'funcao',
            'função',
            'herda',
            'importar',
            'isto',
            'leia',
            'nulo',
            'padrão',
            'padrao',
            'para',
            'para',
            'pegue',
            'retorna',
            'se',
            'senão se',
            'senão',
            'senao se',
            'senao',
            'sustar',
            'tente',
            'tipo',
            'var',
            'variavel',
            'variável',
            'verdadeiro',
            /* keywords delégua funções nativas texto*/
            'dividir',
            'fatiar',
            'inclui',
            'maiusculo',
            'minusculo',
            'texto',
            'substituir',
            'subtexto',
            /* keywords delégua funções nativas vetor*/
            'adicionar',
            'concatenar',
            'empilhar',
            'fatiar',
            'inclui',
            'inverter',
            'juntar',
            'mapear',
            'ordenar',
            'remover',
            'removerPrimeiro',
            'removerUltimo',
            'somar',
            /* keywords delégua funções nativas gerais*/
            'aleatorio',
            'aleatorioEntre',
            'algum',
            'encontrarIndice',
            'encontrarUltimoIndice',
            'encontrarUltimo',
            'encontrar',
            'escreva',
            'filtrarPor',
            'incluido',
            'inteiro',
            'paraCada',
            'primeiroEmCondicao',
            'real',
            'reduzir',
            'tamanho',
            'todos',
            'todosEmCondicao',
        ],
        operators: [
            'e',
            'ou',
            '<=',
            '>=',
            '==',
            '!=',
            '=>',
            '+',
            '-',
            '**',
            '*',
            '/',
            '%',
            '++',
            '--',
            '<<',
            '>>',
            '^',
            '!',
            '~',
            '=',
            '+=',
            '-=',
            '*=',
            '**=',
            '/=',
            '%=',
        ],
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        digits: /\d+(_+\d+)*/,
        octaldigits: /[0-7]+(_+[0-7]+)*/,
        binarydigits: /[0-1]+(_+[0-1]+)*/,
        hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
        regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
        regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [[/[{}]/, 'delimiter.bracket'], { include: 'common' }],
            common: [
                // identifiers and keywords
                [
                    /[a-z_$][çã\w$]*/,
                    {
                        cases: {
                            '@keywords': 'keyword',
                            '@default': 'identifier'
                        }
                    }
                ],
                [/[A-Z][\w\$]*/, 'type.identifier'],
                // [/[A-Z][\w\$]*/, 'identifier'],
                // whitespace
                { include: '@whitespace' },
                // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
                [
                    /\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
                    { token: 'regexp', bracket: '@open', next: '@regexp' }
                ],
                // delimiters and operators
                [/[()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/!(?=([^=]|$))/, 'delimiter'],
                [
                    /@symbols/,
                    {
                        cases: {
                            '@operators': 'delimiter',
                            '@default': ''
                        }
                    }
                ],
                // numbers
                [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
                [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
                [/0[xX](@hexdigits)n?/, 'number.hex'],
                [/0[oO]?(@octaldigits)n?/, 'number.octal'],
                [/0[bB](@binarydigits)n?/, 'number.binary'],
                [/(@digits)n?/, 'number'],
                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],
                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/'([^'\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string_double'],
                [/'/, 'string', '@string_single'],
                [/`/, 'string', '@string_backtick']
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment']
            ],
            comment: [
                [/[^\/*]+/, 'comment'],
                [/\*\//, 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],
            jsdoc: [
                [/[^\/*]+/, 'comment.doc'],
                [/\*\//, 'comment.doc', '@pop'],
                [/[\/*]/, 'comment.doc']
            ],
            // We match regular expression quite precisely
            regexp: [
                [
                    /(\{)(\d+(?:,\d*)?)(\})/,
                    ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']
                ],
                [
                    /(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
                    ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]
                ],
                [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
                [/[()]/, 'regexp.escape.control'],
                [/@regexpctl/, 'regexp.escape.control'],
                [/[^\\\/]/, 'regexp'],
                [/@regexpesc/, 'regexp.escape'],
                [/\\\./, 'regexp.invalid'],
                [/(\/)([dgimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']]
            ],
            regexrange: [
                [/-/, 'regexp.escape.control'],
                [/\^/, 'regexp.invalid'],
                [/@regexpesc/, 'regexp.escape'],
                [/[^\]]/, 'regexp'],
                [
                    /\]/,
                    {
                        token: 'regexp.escape.control',
                        next: '@pop',
                        bracket: '@close'
                    }
                ]
            ],
            string_double: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
            string_single: [
                [/[^\\']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/'/, 'string', '@pop']
            ],
            string_backtick: [
                [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
                [/[^\\`$]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/`/, 'string', '@pop']
            ],
            bracketCounting: [
                [/\{/, 'delimiter.bracket', '@bracketCounting'],
                [/\}/, 'delimiter.bracket', '@pop'],
                { include: 'common' }
            ]
        }
    };
}
window.onload = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var exemploId = window.location.search.split('?exemploId=')[1];
    (_b = (_a = this.Monaco) === null || _a === void 0 ? void 0 : _a.languages) === null || _b === void 0 ? void 0 : _b.register({
        id: 'delegua',
        extensions: ['.delegua'],
        aliases: ['delegua', 'language-generation'],
        mimetypes: ['application/delegua'],
    });
    (_d = (_c = this.Monaco) === null || _c === void 0 ? void 0 : _c.languages) === null || _d === void 0 ? void 0 : _d.setMonarchTokensProvider('delegua', definirLinguagemDelegua());
    (_f = (_e = this.Monaco) === null || _e === void 0 ? void 0 : _e.languages) === null || _f === void 0 ? void 0 : _f.registerCompletionItemProvider('delegua', {
        provideCompletionItems: function () {
            // var suggestions = [{
            //   label: 'escreva',
            //   kind: this.Monaco.languages.CompletionItemKind.Text,
            //   insertText: 'escreva(\'\')'
            // }];
            var formatoPrimitivas = primitivas.filter(function (p) { return p.exemplo; }).map(function (_a) {
                var nome = _a.nome, exemplo = _a.exemplo;
                return {
                    label: nome,
                    kind: 17,
                    insertText: exemplo,
                    insertTextRules: 4 // InsertAsSnippet
                };
            });
            var formatoSnippets = deleguaCodeSnippets === null || deleguaCodeSnippets === void 0 ? void 0 : deleguaCodeSnippets.map(function (_a) {
                var prefix = _a.prefix, body = _a.body, description = _a.description;
                return {
                    label: prefix,
                    kind: 15,
                    insertText: body.join('\n'),
                    documentation: description,
                    insertTextRules: 4 // InsertAsSnippet
                };
            });
            var sugestoes = __spreadArray(__spreadArray([], formatoPrimitivas, true), formatoSnippets, true);
            return { suggestions: sugestoes };
        }
    });
    (_h = (_g = this.Monaco) === null || _g === void 0 ? void 0 : _g.languages) === null || _h === void 0 ? void 0 : _h.registerHoverProvider('delegua', {
        provideHover: function (model, position) {
            var palavra = model.getWordAtPosition(position);
            var primitiva = primitivas.find(function (p) { return p.nome === (palavra === null || palavra === void 0 ? void 0 : palavra.word); });
            if (primitiva) {
                return {
                    contents: [
                        { value: "**".concat(primitiva.nome, "**") },
                        { value: primitiva.documentacao },
                    ]
                };
            }
            return { contents: [] };
        }
    });
    // this.Monaco?.languages?.registerCodeActionProvider('delegua', {
    //   provideCodeActions: (
    //     model /**ITextModel*/,
    //     range /**Range*/,
    //     context /**CodeActionContext*/,
    //     token /**CancellationToken*/
    //   ) => {
    //     // const resource = model.uri;
    //     // const start = model.getOffsetAt({
    //     //   lineNumber: range.startLineNumber,
    //     //   column: range.startColumn
    //     // });
    //     // const end = model.getOffsetAt({
    //     //   lineNumber: range.endLineNumber,
    //     //   column: range.endColumn
    //     // });
    //     // const errorCodes = context.markers
    //     //   .filter((m) => m.code)
    //     //   .map((m) => m.code)
    //     //   .map(Number);
    //     // console.log({resource, start, end, errorCodes})
    //     const actions = context.markers.map(error => {
    //       return {
    //           title: `Example quick fix`,
    //           diagnostics: [error],
    //           kind: "quickfix",
    //           edit: {
    //               edits: [
    //                   {
    //                       resource: model.uri,
    //                       edits: [
    //                           {
    //                               range: error,
    //                               text: "This text replaces the text with the error"
    //                           }
    //                       ]
    //                   }
    //               ]
    //           },
    //           isPreferred: true
    //       };
    //     });
    //     console.log('actions', actions)
    //     return {
    //         actions: actions,
    //         dispose: () => {}
    //     }
    //   }
    // })
    (_k = (_j = this.Monaco) === null || _j === void 0 ? void 0 : _j.editor) === null || _k === void 0 ? void 0 : _k.create(document.getElementById('editor'), {
        value: Exemplos[exemploId],
        language: 'delegua'
    });
    if (exemploId) {
        document.querySelector('#titulo-arquivo').innerHTML = "".concat(exemploId, ".delegua");
    }
};
//# sourceMappingURL=exemplos.js.map