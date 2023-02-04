const resultadoEditorDiv: HTMLElement = document.getElementById("resultadoEditor") as HTMLElement;
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoExecutar = document.getElementById("botaoExecutar");
const seletorDemos = document.getElementById("seletorDemos");

const Delegua = (window as any).Delegua;
const Monaco = (window as any).monaco;

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function getQueryVariable(variable: any) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

const mostrarResultadoExecutar = function(codigo: string) {
    const paragrafo: any = document.createElement("p");
    paragrafo.textContent = codigo;
    paragrafo.classList = " resultadoEditor";
    resultadoEditorDiv?.appendChild(paragrafo);
};

const executarTradutor = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    const retornoTradutor = delegua.tradutorJavascript.traduzir(retornoAvaliadorSintatico.declaracoes)
    
    Monaco.editor.create(document.getElementById("resultadoEditor"), {
        value: retornoTradutor,
        language: "javascript"
    });
}

const executarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);

    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
};

botaoTraduzir.addEventListener("click", function () {
    executarTradutor();
});

botaoExecutar.addEventListener("click", function () {
    executarCodigo();
});

const definirTema = (tema) => {
    Monaco.editor.setTheme(tema)
}
