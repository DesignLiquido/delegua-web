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

const mostrarResultadoExecutar = function(codigo: string) {
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

    console.log(erros)
    const _erros = erros.map(item => {
        return {
            startLineNumber: item?.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item?.mensagem || item.erroInterno,
            severity: MarkerSeverity.Error
        }
    })

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _erros)
}

const executarTradutor = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    if(codigo[0]){
        const retornoLexador = delegua.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            delegua.avaliadorSintatico.analisar(retornoLexador);
    
        const retornoTradutor = delegua.tradutorJavascript.traduzir(retornoAvaliadorSintatico.declaracoes)

        if(retornoTradutor){
            Monaco.editor.create(document.getElementById("resultadoEditor"), {
                value: retornoTradutor,
                language: "javascript"
            });
        }
    }
}

const executarCodigo = async function () {
    const delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    const retorno = await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });

    mapearErros(retorno.erros);
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
