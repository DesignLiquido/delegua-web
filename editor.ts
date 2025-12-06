import { IPrimitiva } from "./primitivas/primitiva-interface";

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

const deleguaWeb = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);

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
    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    //ts-ignore
    const linguagem = (<HTMLInputElement>document.querySelector("#linguagem")).value.toLowerCase()

    const funcoes = {
        "python": { tradutor: deleguaWeb.tradutorPython, linguagem: "python" },
        "javascript": { tradutor: deleguaWeb.tradutorJavascript, linguagem: "javascript" },
        // "assemblyscript": { tradutor: delegua.tradutorAssemblyScript, linguagem: "typescript" },
    }
    if (codigo[0]) {
        const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            deleguaWeb.avaliadorSintatico.analisar(retornoLexador);

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
        const editor = Monaco?.editor.getEditors()[0];
        const modelo = Monaco.editor.getModels()[0];
        const codigo = modelo.getValue().split("\n");
        Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', []);

        const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            deleguaWeb.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            return mapearErros(retornoAvaliadorSintatico.erros);
        }

        const analisadorSemantico = deleguaWeb.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
        const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

        if (errosAnaliseSemantica?.length) {
            mapearAvisos(errosAnaliseSemantica);
        }

        const respostaInterpretador = await deleguaWeb.executar({ retornoLexador, retornoAvaliadorSintatico });
        const errosInterpretacao = respostaInterpretador.erros;
        if (errosInterpretacao) {
            errosInterpretacao.forEach((erro: any) => {
                if (erro.linha > 0) {
                    const mensagemErro = `Erro na linha ${erro.linha}: ${erro.erroInterno.message}`;
                    mostrarResultadoExecutar(mensagemErro);
                }
            });
        }
    } catch (erro) {
        const erroFormatado = "Erro: " + erro
        mostrarResultadoExecutar(erroFormatado)
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
        const modelo = Monaco.editor.getModels()[0];
        const codigo = modelo.getValue();

        const codigoBase64 = btoa(codigo);

        const baseUrl = window.location.origin + window.location.pathname;
        const linkCompartilhamento = `${baseUrl}?codigo=${codigoBase64}`;

        navigator.clipboard.writeText(linkCompartilhamento).then(() => {
            mostrarToastNotificacao("✓ Link copiado para área de transferência!", true);
        }).catch(() => {
            mostrarToastNotificacao("Link: " + linkCompartilhamento, true);
        });

    } catch (erro) {
        mostrarToastNotificacao(`Erro ao gerar link de compartilhamento: ${erro}`, false);
    }
};

const analisarCodigo = function () {
    const codigo = Monaco.editor.getModels()[0].getValue().split("\n");

    const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = deleguaWeb.avaliadorSintatico.analisar(retornoLexador);
    if (retornoAvaliadorSintatico.erros.length > 0) {
        return mapearErros(retornoAvaliadorSintatico.erros);
    }

    const analisadorSemantico = deleguaWeb.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
    const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

    mapearAvisos(errosAnaliseSemantica);
};

function definirLinguagemDelegua() {
  return {
    defaultToken: 'invalid',
    tokenPostfix: '.delegua',

    keywords: [
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
      'numero',
      'número',
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
      'senão',
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
      'inclui',
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

let tempoEsperaMudancas: any = null;
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

        tempoEsperaMudancas = setTimeout(function () {
            tempoEsperaMudancas = null;
            analisarCodigo();
        }, 500);
    });
};

// Informações sobre os módulos disponíveis
const informacoesModulos = {
    'criptografia': {
        descricao: 'Módulo para operações criptográficas, incluindo hashing, criptografia simétrica e assimétrica, codificação Base64 e geração de chaves.',
        repositorio: 'https://github.com/DesignLiquido/delegua-criptografia',
        metodosDestaque: ['md5', 'sha256', 'criptografarAes256', 'gerarParChavesRsa', 'codificarBase64']
    },
    'estatistica': {
        descricao: 'Módulo para cálculos estatísticos.',
        repositorio: 'https://github.com/DesignLiquido/delegua-estatistica',
        metodosDestaque: []
    },
    'fisica': {
        descricao: 'Módulo para cálculos e constantes físicas.',
        repositorio: 'https://github.com/DesignLiquido/delegua-fisica',
        metodosDestaque: []
    },
    'matematica': {
        descricao: 'Módulo para operações matemáticas avançadas.',
        repositorio: 'https://github.com/DesignLiquido/delegua-matematica',
        metodosDestaque: []
    },
    'tempo': {
        descricao: 'Módulo para manipulação de datas e tempo.',
        repositorio: 'https://github.com/DesignLiquido/delegua-tempo',
        metodosDestaque: []
    },
    'json': {
        descricao: 'Módulo para manipulação de dados JSON.',
        repositorio: null,
        metodosDestaque: []
    }
};

const configurarLinguagemDelegua = function () {
    const primitivas: IPrimitiva[] = (globalThis as any).primitivas;
    const documentacoesBibliotecas: {[biblioteca: string]: any} = deleguaWeb.documentacoesBibliotecas;
    
    Monaco.languages?.register({
        id: 'delegua',
        extensions: ['.delegua'],
        aliases: ['delegua', 'language-generation'],
        mimetypes: ['application/delegua'],
    });

    Monaco.languages.setMonarchTokensProvider('delegua', definirLinguagemDelegua());

    Monaco.languages.registerSignatureHelpProvider('delegua', {
        signatureHelpTriggerCharacters: ['(', ','],
        signatureHelpRetriggerCharacters: [','],
        provideSignatureHelp: (model, position) => {
            const linha = model.getLineContent(position.lineNumber);
            const textoAntesCursor = linha.substring(0, position.column - 1);
            
            // Encontrar a chamada de função mais recente antes do cursor
            // Match pattern: biblioteca.metodo( ou apenas metodo(
            const matchFuncao = textoAntesCursor.match(/(\w+)\.(\w+)\([^)]*$/);
            
            if (matchFuncao) {
                const nomeBiblioteca = matchFuncao[1];
                const nomeMetodo = matchFuncao[2];
                const documentacaoBiblioteca = documentacoesBibliotecas[nomeBiblioteca];
                
                if (documentacaoBiblioteca) {
                    const metodo = documentacaoBiblioteca[nomeMetodo];
                    
                    if (metodo && metodo.argumentos) {
                        // Contar quantos argumentos já foram digitados (contando vírgulas)
                        const dentroParenteses = textoAntesCursor.split('(').pop();
                        const numeroVirgulas = (dentroParenteses.match(/,/g) || []).length;
                        const parametroAtivo = numeroVirgulas;
                        
                        // Construir o label e calcular os ranges para cada parâmetro
                        const prefixo = `${nomeBiblioteca}.${nomeMetodo}(`;
                        let labelCompleto = prefixo;
                        const parametros: any[] = [];
                        
                        metodo.argumentos.forEach((arg, index) => {
                            const inicioParam = labelCompleto.length;
                            const nomeParam = `${arg.nome}${arg.opcional ? '?' : ''}`;
                            labelCompleto += nomeParam;
                            const fimParam = labelCompleto.length;
                            
                            parametros.push({
                                label: [inicioParam, fimParam], // Range do parâmetro no label
                                documentation: arg.descricao || `${arg.nome}: ${arg.tipo || 'qualquer'}`
                            });
                            
                            // Adicionar vírgula se não for o último parâmetro
                            if (index < metodo.argumentos.length - 1) {
                                labelCompleto += ', ';
                            }
                        });
                        
                        const retornoTexto = metodo.tipoRetorno ? ` → ${metodo.tipoRetorno}` : '';
                        labelCompleto += `)${retornoTexto}`;
                        
                        // Extrair apenas a primeira descrição do markdown (após o título)
                        let descricaoSimples = '';
                        if (metodo.documentacao) {
                            const linhas = metodo.documentacao.split('\n');
                            // Pular o título (primeira linha) e linhas vazias, pegar a primeira linha de conteúdo
                            for (let i = 1; i < linhas.length; i++) {
                                const linha = linhas[i].trim();
                                if (linha && !linha.startsWith('#') && !linha.startsWith('```')) {
                                    descricaoSimples = linha;
                                    break;
                                }
                            }
                        }
                        
                        return {
                            value: {
                                signatures: [{
                                    label: labelCompleto,
                                    documentation: descricaoSimples,
                                    parameters: parametros
                                }],
                                activeSignature: 0,
                                activeParameter: Math.min(parametroAtivo, parametros.length - 1)
                            },
                            dispose: () => {}
                        };
                    }
                }
            }
            
            return {
                value: { signatures: [], activeSignature: 0, activeParameter: 0 },
                dispose: () => {}
            };
        }
    });

    Monaco.languages.registerCompletionItemProvider('delegua', {
        triggerCharacters: ['.'],
        provideCompletionItems: (model, position) => {
            const linha = model.getLineContent(position.lineNumber);
            const textoAntesCursor = linha.substring(0, position.column - 1);
            
            // Verificar se estamos após um ponto (ex: criptografia.)
            const matchBiblioteca = textoAntesCursor.match(/(\w+)\.(\w*)$/);
            
            if (matchBiblioteca) {
                const nomeBiblioteca = matchBiblioteca[1];
                const documentacaoBiblioteca = documentacoesBibliotecas[nomeBiblioteca];
                
                if (documentacaoBiblioteca) {
                    const sugestoesMetodos = Object.keys(documentacaoBiblioteca).map(nomeMetodo => {
                        const metodo = documentacaoBiblioteca[nomeMetodo];
                        const argumentos = metodo.argumentos || [];
                        const argsTexto = argumentos
                            .map((arg, index) => {
                                const placeholder = `\${${index + 1}:${arg.nome}}`;
                                return arg.opcional ? placeholder : placeholder;
                            })
                            .join(', ');
                        
                        return {
                            label: nomeMetodo,
                            kind: 1, // Method
                            insertText: `${nomeMetodo}(${argsTexto})`,
                            insertTextRules: 4, // InsertAsSnippet
                            documentation: metodo.documentacao || '',
                            detail: metodo.tipoRetorno ? `→ ${metodo.tipoRetorno}` : ''
                        };
                    });
                    
                    return { suggestions: sugestoesMetodos };
                }
            }
            
            // Extrair variáveis definidas no código (como módulos importados)
            const textoCompleto = model.getValue();
            const regexVariaveis = /(?:var|variavel|variável|const|constante|fixo)\s+(\w+)\s*=/g;
            const variaveisEncontradas = new Set();
            let match;
            
            while ((match = regexVariaveis.exec(textoCompleto)) !== null) {
                variaveisEncontradas.add(match[1]);
            }
            
            // Criar sugestões para variáveis/módulos
            const sugestoesVariaveis = Array.from(variaveisEncontradas).map((nomeVar: string) => {
                const ehBiblioteca = documentacoesBibliotecas[nomeVar];
                return {
                    label: nomeVar,
                    kind: ehBiblioteca ? 9 : 6, // Module (9) ou Variable (6)
                    insertText: nomeVar,
                    documentation: ehBiblioteca ? `Módulo ${nomeVar}` : `Variável ${nomeVar}`,
                    sortText: `0${nomeVar}` // Priorizar na lista
                };
            });
            
            // Sugestões padrão (primitivas e snippets)
            const formatoPrimitivas = primitivas
                .filter(p => p.exemploCodigo && p.nome)
                .map(({ nome, exemploCodigo: exemplo }) => {
                    const insertText = exemplo.includes('.') ? exemplo.split('.')[1] : exemplo;
                    return {
                        label: nome,
                        kind: 17, // Keyword,
                        insertText: insertText || nome,
                        insertTextRules: 4 // InsertAsSnippet
                    }
                });
            
            const formatoSnippets = (typeof deleguaCodeSnippets !== 'undefined' && deleguaCodeSnippets) 
                ? deleguaCodeSnippets
                    .filter(s => s.prefixo && s.corpo)
                    .map(({ prefixo, corpo, descricao }) => {
                        return {
                            label: prefixo,
                            kind: 15, // Snippet,
                            insertText: Array.isArray(corpo) ? corpo.join('\n') : corpo,
                            documentation: descricao || '',
                            insertTextRules: 4 // InsertAsSnippet
                        }
                    })
                : [];
            
            const sugestoes = [...sugestoesVariaveis, ...formatoPrimitivas, ...formatoSnippets].filter(s => s.insertText);
            return { suggestions: sugestoes };
        }
    });

    Monaco.languages.registerHoverProvider('delegua', {
        provideHover: function (model, position) {
            const palavra = model.getWordAtPosition(position);
            if (!palavra) return { contents: [] };
            
            // Verificar primitivas nativas
            const primitiva = primitivas.find(p => p.nome === palavra.word);
            if (primitiva) {
                return {
                    contents: [
                        { value: `**${primitiva.nome}**` },
                        { value: primitiva.documentacao },
                        { value: `    ${primitiva.exemploCodigo}    ` }
                    ]
                };
            }
            
            // Verificar métodos de bibliotecas (ex: criptografia.md5)
            // Precisamos verificar se há um ponto antes da palavra atual
            const linha = model.getLineContent(position.lineNumber);
            const inicioColuna = palavra.startColumn - 1;
            
            // Verificar se há um ponto antes da palavra
            if (inicioColuna > 0 && linha[inicioColuna - 1] === '.') {
                // Procurar o nome da biblioteca antes do ponto
                const textoAntesPonto = linha.substring(0, inicioColuna - 1);
                const matchBiblioteca = textoAntesPonto.match(/(\w+)$/);
                
                if (matchBiblioteca) {
                    const nomeBiblioteca = matchBiblioteca[1];
                    const nomeMetodo = palavra.word;
                    const documentacaoBiblioteca = documentacoesBibliotecas[nomeBiblioteca];
                    
                    if (documentacaoBiblioteca && nomeMetodo) {
                        const metodo = documentacaoBiblioteca[nomeMetodo];
                        if (metodo) {
                            const contents = [
                                { value: `**${nomeBiblioteca}.${nomeMetodo}**` }
                            ];
                            
                            if (metodo.documentacao) {
                                contents.push({ value: metodo.documentacao });
                            }
                            
                            if (metodo.exemploCodigo) {
                                contents.push({ value: `\`\`\`delegua\n${metodo.exemploCodigo}\n\`\`\`` });
                            }
                            
                            return { contents };
                        }
                    }
                }
            }
            
            // Verificar se é o nome de um módulo (sem ponto depois)
            const nomeModulo = palavra.word;
            const infoModulo = informacoesModulos[nomeModulo];
            const documentacaoBiblioteca = documentacoesBibliotecas[nomeModulo];
            
            if (infoModulo || documentacaoBiblioteca) {
                const contents = [
                    { value: `**${nomeModulo}** _(módulo)_` }
                ];
                
                if (infoModulo?.descricao) {
                    contents.push({ value: infoModulo.descricao });
                }
                
                // Listar métodos disponíveis
                if (documentacaoBiblioteca) {
                    const metodos = Object.keys(documentacaoBiblioteca);
                    const metodosExibir = infoModulo?.metodosDestaque?.length > 0 
                        ? infoModulo.metodosDestaque 
                        : metodos.slice(0, 5);
                    
                    if (metodosExibir.length > 0) {
                        const listaMetodos = metodosExibir.map(m => `- \`${nomeModulo}.${m}()\``).join('\n');
                        const sufixo = metodos.length > metodosExibir.length 
                            ? `\n\n_...e mais ${metodos.length - metodosExibir.length} métodos_` 
                            : '';
                        contents.push({ 
                            value: `**Métodos disponíveis:**\n${listaMetodos}${sufixo}` 
                        });
                    }
                }
                
                if (infoModulo?.repositorio) {
                    contents.push({ value: `[📦 Repositório](${infoModulo.repositorio})` });
                }
                
                return { contents };
            }
            
            return { contents: [] };
        }
    });
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