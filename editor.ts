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

    const _erros = erros.map(item => {
        return {
            startLineNumber: item?.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item?.mensagem,
            severity: MarkerSeverity.Error
        }
    })
    console.log(_erros)

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _erros)
}

const executarTradutor = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    //ts-ignore
    const linguagem = (<HTMLInputElement>document.querySelector("#linguagem")).value.toLowerCase()

    const funcoes = {
        "python": { tradutor: delegua.tradutorPython, linguagem: "python" },
        "javascript": { tradutor: delegua.tradutorJavascript, linguagem: "javascript" },
        "assemblyscript": { tradutor: delegua.tradutorAssemblyScript, linguagem: "typescript" },
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
        const analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
        const erros = analisadorSemantico.erros;

        if (erros?.length) return mapearErros(erros);

        delegua.executar({ retornoLexador, retornoAvaliadorSintatico })
            .then(function (response) {
                var ERROS = response.erros;
                if (ERROS) {
                    ERROS.forEach((erro) => {
                        if (erro.linha > 0) {
                            const MENSAGEM_ERRO = `Erro na linha ${erro.linha}:  ${erro.erroInterno.message}`;
                            mostrarResultadoExecutar(MENSAGEM_ERRO);
                        }
                    });
                }
            })
            .catch(function (erro) {
                mostrarResultadoExecutar(erro);
            });
    } catch (error) {
        const ERRO = "Erro: " + error
        mostrarResultadoExecutar(ERRO)
    }
};

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
