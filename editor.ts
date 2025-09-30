const resultadoEditorDiv: HTMLElement = document.getElementById("resultadoEditor") as HTMLElement;
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoCompartilhar = document.getElementById("botaoCompartilhar");
const botaoExecutar = document.getElementById("botaoExecutar");

const Delegua = (window as any).Delegua;
const Monaco = (window as any).monaco;

enum MarkerSeverity {
    Hint = 1,
    Info = 2,
    Warning = 4,
    Error = 8
}

const mostrarResultadoExecutar = function (codigo: string) {
    const paragrafo: any = document.createElement("p");
    paragrafo.textContent = codigo;
    paragrafo.classList = " resultadoEditor";
    resultadoEditorDiv?.appendChild(paragrafo);
};

const limparResultadoEditor = function () {
    resultadoEditorDiv.innerHTML = "";
};

limparResultadoEditor();

const mapearErros = function (erros: any[]) {
    const editor = Monaco?.editor.getEditors()[0];

    if (erros.length > 0) {
        console.log(erros);
    }

    const _erros = erros.map(item => {
        return {
            startLineNumber: item.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item.message || item.mensagem || item.erroInterno,
            severity: MarkerSeverity.Error
        }
    })

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _erros);
}

const mapearAvisos = function (avisos: any[]) {
    const editor = Monaco?.editor.getEditors()[0];

    if (avisos.length > 0) {
        console.log(avisos);
    }

    const _avisos = avisos.map(item => {
        return {
            startLineNumber: item.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item.message || item.mensagem || item.erroInterno,
            severity: MarkerSeverity.Warning
        }
    })

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _avisos);
}

const executarTradutor = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    //ts-ignore
    const linguagem = (<HTMLInputElement>document.querySelector("#linguagem")).value.toLowerCase()

    const funcoes = {
        "python": { tradutor: delegua.tradutorPython, linguagem: "python" },
        "javascript": { tradutor: delegua.tradutorJavascript, linguagem: "javascript" },
        // "assemblyscript": { tradutor: delegua.tradutorAssemblyScript, linguagem: "typescript" },
    }
    if (codigo[0]) {
        const retornoLexador = delegua.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            delegua.avaliadorSintatico.analisar(retornoLexador);

        const funcao = funcoes[linguagem]
        const retornoTradutor = funcao.tradutor.traduzir(retornoAvaliadorSintatico.declaracoes)

        if (retornoTradutor) {
            Monaco.editor.create(document.getElementById("resultadoEditor"), {
                value: retornoTradutor,
                language: funcao.linguagem
            });
        }
    }
}

const executarCodigo = async function () {
    try {
        const delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);
        const editor = Monaco?.editor.getEditors()[0];
        const modelo = Monaco.editor.getModels()[0];
        const codigo = modelo.getValue().split("\n");
        Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', []);

        const retornoLexador = delegua.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            delegua.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            return mapearErros(retornoAvaliadorSintatico.erros);
        }

        const analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
        const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

        if (errosAnaliseSemantica?.length) {
            mapearAvisos(errosAnaliseSemantica);
        }

        const respostaInterpretador = await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
        const errosInterpretacao = respostaInterpretador.erros;
        if (errosInterpretacao) {
            errosInterpretacao.forEach((erro: any) => {
                if (erro.linha > 0) {
                    const mensagemErro = `Erro na linha ${erro.linha}: ${erro.erroInterno.message}`;
                    mostrarResultadoExecutar(mensagemErro);
                }
            });
        }
    } catch (error) {
        const erro = "Erro: " + error
        mostrarResultadoExecutar(erro)
    }
};

const mostrarToastNotificacao = function(mensagem: string, sucesso: boolean = true) {
    const toastExistente = document.querySelector('.toast-notificacao');
    if (toastExistente) {
        toastExistente.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notificacao';
    if (!sucesso) {
        toast.style.backgroundColor = '#f44336';
    }

    toast.innerHTML = `
        ${mensagem}
        <span class="fechar-toast" onclick="this.parentElement.remove()">×</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('mostrar');
    }, 10);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('mostrar');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
};

const compartilharCodigo = function () {
    try {
        const editor = Monaco.editor.getEditors()[0];
        const modelo = editor.getModels()[0];
        const codigo = modelo.getValue();

        const codigoBase64 = btoa(codigo);

        const baseUrl = window.location.origin + window.location.pathname;
        const linkCompartilhamento = `${baseUrl}?codigo=${codigoBase64}`;

        navigator.clipboard.writeText(linkCompartilhamento).then(() => {
            mostrarToastNotificacao("✓ Link copiado para área de transferência!", true);
        }).catch(() => {
            mostrarToastNotificacao("Link: " + linkCompartilhamento, true);
        });

    } catch (error) {
        mostrarToastNotificacao("Erro ao gerar link de compartilhamento", false);
    }
};

const analisarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("");
    const codigo = Monaco.editor.getModels()[0].getValue().split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    if (retornoAvaliadorSintatico.erros.length > 0) {
        return mapearErros(retornoAvaliadorSintatico.erros);
    }

    const analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
    const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

    mapearAvisos(errosAnaliseSemantica);
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
      'inteiro[]',
      'isto',
      'leia',
      'nulo',
      'padrão',
      'padrao',
      'para',
      'para',
      'pegue',
      'qualquer',
      'qualquer[]',
      'real[]',
      'retorna',
      'se',
      'senão se',
      'senão',
      'senao se',
      'senao',
      'sustar',
      'tente',
      'texto[]',
      'tipo',
      'var',
      'variavel',
      'variável',
      'verdadeiro',
      'vazio',
      'vetor',

      /* funções nativas de delégua (texto) */
      'dividir',
      'fatiar',
      'inclui',
      'maiusculo',
      'maiúsculo',
      'minusculo',
      'minúsculo',
      'texto',
      'substituir',
      'subtexto',

      /* funções nativas de delégua (vetor) */
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

      /* funções nativas de delégua (sem tipo específico) */
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
      'incluído',
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
      'em',
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
      '\\',
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

    // Expressões regulares para determinados componentes da linguagem
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
          /[a-z_âáêéíóôõú$][çãâáêéíóôõú\w$]*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }
        ],
        [/[A-ZÂÁÊÉÍÓÔÕÚ][\w\$]*/, 'type.identifier'], // Mostra nomes de classes (normalmente em maiúsculo) com uma cor bonita
        // [/[A-Z][\w\$]*/, 'identifier'], // Talvez voltar com isso um dia

        // whitespace
        { include: '@whitespace' },

        // regular expression: ensure it is terminated before beginning (otherwise it is an operator)
        [
          /\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
          { token: 'regexp', bracket: '@open', next: '@regexp' }
        ],

        // delimitadores e operadores
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

        // números
        [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
        [/0[xX](@hexdigits)n?/, 'number.hex'],
        [/0[oO]?(@octaldigits)n?/, 'number.octal'],
        [/0[bB](@binarydigits)n?/, 'number.binary'],
        [/(@digits)n?/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // textos
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // texto não finalizado
        [/'([^'\\]|\\.)*$/, 'string.invalid'], // idem
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

      // TODO: Ajustar esta parte para expressões regulares de Delégua
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

let tempoEsperaMudancas;
const configurarAtualizacaoAutomatica = function () {
    let editor = Monaco?.editor.getEditors()[0];
    if (!editor) {
        Monaco?.editor?.create(document.getElementById('editor'), {
            value: '// Digite código em Delégua aqui, ou utilize o menu do topo superior esquerdo para selecionar exemplos de código em Delégua.',
            language: 'delegua'
        });
        editor = Monaco?.editor.getEditors()[0];
    }

    const model = editor.getModel();
    if (!model) {
        console.error("Modelo não encontrado. Verifique a inicialização do Monaco Editor.");
        return;
    }

    model.onDidChangeContent(() => {
        if (tempoEsperaMudancas !== null) {
            clearTimeout(tempoEsperaMudancas);
        }

        tempoEsperaMudancas = setInterval(function () {
            clearTimeout(tempoEsperaMudancas);
            tempoEsperaMudancas = null;
            analisarCodigo();
        }, 500);
    });
};

const configurarLinguagemDelegua = function () {
    const primitivas = (globalThis as any).primitivas;
    Monaco.languages?.register({
        id: 'delegua',
        extensions: ['.delegua'],
        aliases: ['delegua', 'language-generation'],
        mimetypes: ['application/delegua'],
    });

    Monaco.languages.setMonarchTokensProvider('delegua', definirLinguagemDelegua());

    Monaco.languages.registerCompletionItemProvider('delegua', {
        provideCompletionItems: () => {
            const formatoPrimitivas = primitivas.filter(p => p.exemploCodigo).map(({ nome, exemploCodigo: exemplo }) => {
                return {
                    label: nome,
                    kind: 17, // Keyword,
                    insertText: exemplo.split('.')[1],
                    insertTextRules: 4 // InsertAsSnippet
                }
            });
            const formatoSnippets = deleguaCodeSnippets?.map(({ prefixo, corpo, descricao }) => {
                return {
                    label: prefixo,
                    kind: 15, // Snippet,
                    insertText: corpo.join('\n'),
                    documentation: descricao,
                    insertTextRules: 4 // InsertAsSnippet
                }
            })
            const sugestoes = [...formatoPrimitivas, ...formatoSnippets]
            return { suggestions: sugestoes };
        }
    });

    Monaco.languages.registerHoverProvider('delegua', {
        provideHover: function (model, position) {
            const palavra = model.getWordAtPosition(position);
            const primitiva = primitivas.find(p => p.nome === palavra?.word)
            if (primitiva) {
                return {
                    contents: [
                        { value: `**${primitiva.nome}**` },
                        { value: primitiva.documentacao },
                        { value: `    ${primitiva.exemploCodigo}    ` }
                    ]
                }
            }
            return { contents: [] }
        }
    })
}

window.addEventListener("load", () => {
    configurarLinguagemDelegua();
    configurarAtualizacaoAutomatica();

    const searchParams = new URLSearchParams(window.location.search.split('?')[1]);
    const exemploId: any = searchParams.get('exemploId');
    const codigo: any = searchParams.get('codigo');

    const editor = Monaco.editor.getEditors()[0];
    const modelo = editor.getModel();
    if (codigo) {
        const codigoDecodificado = atob(codigo);
        modelo.setValue(codigoDecodificado);
    }
    else if (exemploId) {
        modelo.setValue((window as any).Exemplos[exemploId]);
        document.querySelector('#titulo-arquivo').innerHTML = `${exemploId}.delegua`;
    } else {
        modelo.setValue('// Digite código em Delégua aqui, ou utilize o menu do topo superior esquerdo para selecionar exemplos de código em Delégua.');
    }

    Monaco.editor.setModelLanguage(modelo, 'delegua');
});

botaoTraduzir.addEventListener("click", function () {
    limparResultadoEditor();
    executarTradutor();
});

botaoCompartilhar.addEventListener("click", function () {
    compartilharCodigo();
});

botaoExecutar.addEventListener("click", function () {
    limparResultadoEditor();
    executarCodigo();
});

const definirTema = (tema) => {
    Monaco.editor.setTheme(tema)
}
