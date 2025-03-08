const resultadoEditorDiv: HTMLElement = document.getElementById("resultadoEditor") as HTMLElement;
const botaoTraduzir = document.getElementById("botaoTraduzir");
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

        const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

        const retornoLexador = delegua.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            delegua.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            return mapearErros(retornoAvaliadorSintatico.erros);
        }

        const analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
        const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

        if (errosAnaliseSemantica?.length) {
            return mapearAvisos(errosAnaliseSemantica);
        }

        const editor = Monaco?.editor.getEditors()[0];
        Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', []);

        const respostaInterpretador = await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
        const errosInterpretacao = respostaInterpretador.erros;
        if (errosInterpretacao) {
            errosInterpretacao.forEach((erro: any) => {
                if (erro.linha > 0) {
                    const mensagemErro = `Erro na linha ${erro.linha}:  ${erro.erroInterno.message}`;
                    mostrarResultadoExecutar(mensagemErro);
                }
            });
        }
    } catch (error) {
        const erro = "Erro: " + error
        mostrarResultadoExecutar(erro)
    }
};

const analisarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    if (retornoAvaliadorSintatico.erros.length > 0) {
        mapearErros(retornoAvaliadorSintatico.erros);
        return;
    }

    const analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
    const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

    mapearErros(errosAnaliseSemantica);
};

const configurarAtualizacaoAutomatica = function () {
    const editor = Monaco?.editor.getEditors()[0];
    if (!editor) {
        console.error("Editor não encontrado. Verifique se foi inicializado corretamente.");
        return;
    }

    const model = editor.getModel();
    if (!model) {
        console.error("Modelo não encontrado. Verifique a inicialização do Monaco Editor.");
        return;
    }

    model.onDidChangeContent(() => {
        analisarCodigo();
    });
};

window.addEventListener("load", () => {
    configurarAtualizacaoAutomatica();
});

botaoTraduzir.addEventListener("click", function () {
    limparResultadoEditor();
    executarTradutor();
});

botaoExecutar.addEventListener("click", function () {
    limparResultadoEditor();
    executarCodigo();
});

const definirTema = (tema) => {
    Monaco.editor.setTheme(tema)
}
