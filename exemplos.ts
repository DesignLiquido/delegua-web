const Exemplos = {
OlaMundo: 'escreva("Olá, mundo!");',
OperacoesBasicas: `var a = 10;
var b = 4;

escreva("Valor de A: " + texto(a));

escreva("Valor de B: " + texto(b));

var soma = a + b; // Soma os dois valores
var sub  = a - b; // Subtrai os dois valores
var mult = a * b; // Multiplica os dois valores
var div  = a / b; // Divide os dois valores

escreva("A soma dos números é igual a: " + texto(soma));	    // Exibe o resultado da soma
escreva("A subtração dos números é igual a: " + texto(sub));	    // Exibe o resultado da subtração
escreva("A multiplicação dos números é igual a: " + texto(mult));   // Exibe o resultado da multiplicação
escreva("A divisão dos números é igual a: " + texto(div));          // Exibe o resultado da divisão`,
Condicional: `var letra = leia('Digite uma letra:');
// É necessário verificar letras minúsculas e maiúsculas
se
  (
    letra == 'A' ou letra == 'E' ou letra == 'I' ou letra == 'O' ou letra == 'U' ou
    letra == 'a' ou letra == 'e' ou letra == 'i' ou letra == 'o' ou letra == 'u'
  ){
    escreva("A letra " + letra + " é uma vogal!");
  }
senão {
  escreva("A letra " + letra + " não é uma vogal!");
}`,
Classe: `classe Animal {
  correr() {
    escreva("Correndo Loucamente");
  }
}
classe Cachorro herda Animal {
  latir() {
    escreva("Au Au Au Au");
  }
}
var nomeDoCachorro = Cachorro();
nomeDoCachorro.correr();
nomeDoCachorro.latir();`,
MergeSort: `var vetor1 = [8, 2, 9, 5];
var a = 0;
var aux = 0;
var i = 0;
escreva ("Vetor: Posição[0]:" + texto(vetor1[0]));
escreva ("Vetor: Posição[1]:" + texto(vetor1[1]));
escreva ("Vetor: Posição[2]:" + texto(vetor1[2]));
escreva ("Vetor: Posição[3]:" + texto(vetor1[3]));
para (i = 0; i < 3; i = i + 1) {
  se (vetor1[i] > vetor1[i+1]) {  
    escreva ("Vetor " + texto(i));
    aux = vetor1[i];
    vetor1[i] = vetor1[i+1];
    vetor1[i+1] = aux;
    escreva(vetor1[i]);
    escreva(vetor1[i+1]);
  }
}
var vetor2 = [vetor1[0], vetor1[1]];
var vetor3 = [vetor1[2], vetor1[3]];
var vetor4 = [];
para (a = 0; a < 4; a = a + 1) {
  escreva ("vetor1(" + texto(a) + ")");
  escreva (vetor1[a]);
}
para (a = 0; a < 2; a = a + 1) {
  escreva ("vetor2(" + texto(a) + ")");
  escreva (vetor2[a]);
}
para (a = 0; a < 2; a = a + 1) {
  escreva ("vetor3(" + texto(a) + ")");
  escreva (vetor3[a]);
}
se (vetor2[0] < vetor3[0] e vetor2[1] < vetor3[1]) {
  vetor4[0] = vetor2[0];
  se (vetor3[0] < vetor2[1]) {
    vetor4[1] = vetor3[0];
    vetor4[2] = vetor2[1];
    vetor4[3] = vetor3[1];
  } senão {
    vetor4[1] = vetor2[1];
    vetor4[2] = vetor3[0];
    vetor4[3] = vetor3[1];
  }
}          
para (a = 0; a < 4; a = a + 1) {
  escreva ("vetor4(" + texto(vetor4[a]) + ")");
}`,
Bhaskara: `funcao bhaskara(a,b,c) {
  // A variável "d" vai simbolizar o Delta.
  // "a", "b", e "c" irão representar os coeficientes da equação.
  var d = b ** 2;
  var f = 4 * a * c; 
            
  d = d - f;
            
  escreva("O valor de Delta é: " + texto(d));
            
  d = d ** 0.5;
            
  // Encontrando os valores de X1 e X2.
  var x1 = -b + d;
  x1 = x1 / 2 * a;
  escreva("O valor de X1 é: "+ texto(x1));
            
  var x2 = -b-d;
  x2 = x2 / 2 * a;
  escreva("O valor de X2 é: "+ texto(x2));
  // Resultado das substituições de X por X1 e X2 na equação.
  var r1 = x1 ** 2;
  r1 = a * r1;
  r1 = b * x1 + r1;
  r1 = r1 + c;
  escreva("Substituindo X1 na equação obtém-se:"+ texto(r1));
  var r2 = x2 ** 2;
  r2 = a * r2;
  r2 = b * x2 + r2;
  r2 = r2 + c;
  escreva("Substituindo X2 na equação obtém-se:"+ texto(r2));
}
// Insira o valor do coeficiente A:
var a = 1;
// Insira o valor do coeficiente B:
var b = -1;
// Insira o valor do coeficiente B:
var c = -30;
bhaskara(a,b,c);`,
Fibonacci: `// Recursão para o cálculo da sequência de Fibonacci
funcao fibonacci(n) {
  se (n == 0) {
    retorna(0);
  }
  se(n == 1) {
    retorna(1);
  }
          
  var n1 = n-1;
  var n2 = n-2;
  var f1 = fibonacci(n1);
  var f2 = fibonacci(n2);
  retorna(f1 + f2);
}
var a = fibonacci(0);
escreva(a);
a = fibonacci(1);
escreva(a);
a = fibonacci(2);
escreva(a);
a = fibonacci(3);
escreva(a);
a = fibonacci(4);
escreva(a);
a = fibonacci(5);
escreva(a);`,
Perceptron: `var pesoInicial1 = 0.3;
var pesoInicial2 = 0.4;
var entrada1 = 1;
var entrada2 = 1;
var erro = 1;
var resultadoEsperado;
enquanto (erro != 0) {
  se (entrada1 == 1) {
    se (entrada2 == 1) {
      resultadoEsperado = 1;
    }
  } senão {
    resultadoEsperado = 0;
  }
          
  var somatoria = pesoInicial1 * entrada1;
  somatoria = pesoInicial2 * entrada2 + somatoria;
          
  var resultado;
          
  se (somatoria < 1) {
    resultado = 0;
  } senão {
    se (somatoria >= 1) {
      resultado = 1;
    }
  }
          
  escreva("resultado: " + texto(resultado));
  
  erro = resultadoEsperado - resultado;
  escreva("p1: " + texto(pesoInicial1));
  escreva("p2: " + texto(pesoInicial2));
  pesoInicial1 = 0.1 * entrada1 * erro + pesoInicial1;
  pesoInicial2 = 0.1 * entrada2 * erro + pesoInicial2;
  escreva("erro: " + texto(erro));
}`,

FilaEstatica: `funcao enfileirar (valorEntrada) {
  se (indexFinal == maximoDeElementos) {
    escreva("Fila Cheia");
  } senao {
  filaEstatica[indexFinal] = valorEntrada;
  escreva("Valor inserido com sucesso: " + texto(filaEstatica[indexFinal]));
    retorna indexFinal = indexFinal + 1;
  }
}
função desenfileirar() {
  se (indexInicial == indexFinal) {
    escreva("Fila Vazia");
  } senao {
    para (i = 0; i <= indexFinal; i = i + 1){
      se (i + 1 == indexFinal) {
        indexFinal = indexFinal - 1;
        escreva("Valor retirado com sucesso.");
      } senao {
        filaEstatica[i] = filaEstatica[i+1];
      }
    }
  }
}
função mostrar_fila() {
  se (indexInicial == indexFinal) {
    escreva("Fila Vazia");
  } senao {
    para (var i = 0; i < indexFinal; i = i + 1) {
      escreva("index " + texto(i)); 
      escreva(texto(filaEstatica[i]));
    }
  }
}
var maximoDeElementos = 4;
var indexInicial = 0;
var indexFinal = 0;
// Variavel de controle em iterações
var i = 0;
var filaEstatica = [];
// Demonstração de uso das funções:
mostrar_fila();
var valorEntrada = 2;
enfileirar(valorEntrada);
var valorEntrada = 8;
enfileirar(valorEntrada);
var valorEntrada = 23;
enfileirar(valorEntrada);
var valorEntrada = 7;
enfileirar(valorEntrada);
mostrar_fila();
desenfileirar();
mostrar_fila();
var valorEntrada = 24;
enfileirar(valorEntrada);
mostrar_fila();`,
}

    function definirLinguagemDelegua() {
        return {
          defaultToken: 'invalid',
          tokenPostfix: '.delegua',
        
          keywords: [
            // Should match the keys of textToKeywordObj in
            // https://github.com/microsoft/TypeScript/blob/master/src/compiler/scanner.ts
            'caso',
            'classe',
            'continua',
            'enquanto',
            'escolha',
            'falso',
            'fazer',
            'finalmente',
            'função',
            'funcao',
            'herda',
            'importar',
            'isto',
            'leia',
            'nulo',
            'padrão',
            'padrao',
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
            'var',
            'verdadeiro',

            /* keywords delégua funções nativas */
            'aleatorio',
            'aleatorioEntre',
            'escreva',
            'inteiro',
            'real',
            'texto',
            'mapear',
            'ordenar',
            'tamanho'

            /* keywords javascript */
            // 'abstract',
            // 'any',
            // 'as',
            // 'asserts',
            // 'bigint',
            // 'boolean',
            // 'break',
            // 'case',
            // 'catch',
            // 'class',
            // 'continue',
            // 'const',
            // 'constructor',
            // 'debugger',
            // 'declare',
            // 'default',
            // 'delete',
            // 'do',
            // 'else',
            // 'enum',
            // 'export',
            // 'extends',
            // 'false',
            // 'finally',
            // 'for',
            // 'from',
            // 'function',
            // 'get',
            // 'if',
            // 'implements',
            // 'import',
            // 'in',
            // 'infer',
            // 'instanceof',
            // 'interface',
            // 'is',
            // 'keyof',
            // 'let',
            // 'module',
            // 'namespace',
            // 'never',
            // 'new',
            // 'null',
            // 'number',
            // 'object',
            // 'out',
            // 'package',
            // 'private',
            // 'protected',
            // 'public',
            // 'override',
            // 'readonly',
            // 'require',
            // 'global',
            // 'return',
            // 'satisfies',
            // 'set',
            // 'static',
            // 'string',
            // 'super',
            // 'switch',
            // 'symbol',
            // 'this',
            // 'throw',
            // 'true',
            // 'try',
            // 'type',
            // 'typeof',
            // 'undefined',
            // 'unique',
            // 'unknown',
            // 'var',
            // 'void',
            // 'while',
            // 'with',
            // 'yield',
            // 'async',
            // 'await',
            // 'of'
          ],
        
          operators: [
            'e',
            'ou',

            /* operators javascript */
            '<=',
            '>=',
            '==',
            '!=',
            // '===',
            '!==',
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
            // '</',
            '>>',
            // '>>>',
            '&',
            '|',
            '^',
            '!',
            '~',
            // '&&',
            // '||',
            // '??',
            // '?',
            // ':',
            '=',
            '+=',
            '-=',
            '*=',
            '**=',
            '/=',
            '%=',
            // '<<=',
            // '>>=',
            // '>>>=',
            // '&=',
            // '|=',
            // '^=',
            // '@'
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
                [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely
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
                [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
                [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
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

    const primitivasTexto = [
      {
          nome: 'maiusculo',
          documentacao: 'Converte todos os caracteres alfabéticos para maiúsculas.'
      },
      {
          nome: 'minusculo',
          documentacao: 'Converte todos os caracteres alfabéticos para minúsculas.'
      },
      {
          nome: 'texto',
          documentacao: 'Transforma números flutuantes ou inteiros em texto.'
      },
    ]

    const primitivasVetor = [
      {
          nome: 'mapear',
          documentacao: 'Percorre um vetor executando uma função para cada item desse mesmo vetor.'
      },
      {
          nome: 'ordenar',
          documentacao: 'Ordena valores em ordem crescente. Esta função só aceita vetores.'
      },
      {
          nome: 'tamanho',
          documentacao: 'Retorna o número de elementos que compõem um vetor.'
      },
    ]

    const primitivasNumero = [
      {
          nome: 'aleatorio',
          documentacao: 'Retorna um número aleatório entre 0 e 1.'
      },
      {
          nome: 'aleatorioEntre',
          documentacao: 'Retorna um número inteiro aleatório entre os valores passados para a função.'
      },
      {
          nome: 'inteiro',
          documentacao: 'Converte um número flutuante ou texto, que não apresente letras, em um número inteiro.'
      },
      {
          nome: 'real',
          documentacao: 'Converte um número inteiro ou texto, que não apresente letras, em um número flutuante.'
      },
    ]

    const ordenar = (a: any, b: any) => {
      const nome1 = a['nome'].toUpperCase();
      const nome2 = b['nome'].toUpperCase();
      
      if (nome1 > nome2) return 1;
      else if (nome1 < nome2) return -1;
      return 0;
    }
  
    const primitivas = [
      ...primitivasNumero, 
      ...primitivasTexto, 
      ...primitivasVetor
    ].sort(ordenar);

window.onload = function () {
  const exemploId: any = window.location.search.split('?exemploId=')[1];

  this.Monaco?.editor?.create(document.getElementById('editor'), {
    value: Exemplos[exemploId],
    language: 'delegua'
  });

  this.Monaco?.languages?.register({
    id: 'delegua',
    extensions: ['.delegua'],
    aliases: ['delegua', 'language-generation'],
    mimetypes: ['application/delegua'],
  });
  this.Monaco?.languages?.setMonarchTokensProvider('delegua', definirLinguagemDelegua());

  this.Monaco?.languages?.registerCompletionItemProvider('delegua', {
    provideCompletionItems: () => {
      var suggestions = [{
        label: 'escreva',
        kind: this.Monaco.languages.CompletionItemKind.Text,
        insertText: 'escreva(\'\')'
      }, {
        label: 'aleatorioEntre',
        kind: this.Monaco.languages.CompletionItemKind.Keyword,
        insertText: 'aleatorioEntre(1, 10)',
        insertTextRules: this.Monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'se',
        kind: this.Monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          'se (${1:condition}) {',
          '\t$0',
          '} senao {',
          '\t',
          '}'
        ].join('\n'),
        insertTextRules: this.Monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declaração Se-Senão'
      }];
      return { suggestions: suggestions };
    }
  });

  this.Monaco?.languages?.registerHoverProvider('delegua', {
    provideHover: function(model, position) { 
      const palavra = model.getWordAtPosition(position);
      const primitiva = primitivas.find(p => p.nome === palavra?.word)
      if(primitiva){
        return {
          contents: [
            { value: `**${primitiva.nome}**` },
            { value: primitiva.documentacao },
          ]
        }
      }
      return { contents: [] }
    }
  })
  
  if(exemploId){
    document.querySelector('#titulo-arquivo').innerHTML = `${exemploId}.delegua`;
  }
}