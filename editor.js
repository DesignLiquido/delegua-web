var outputDiv = document.getElementById("output");
var botaoTraduzir = document.getElementById("botaoTraduzir");
var botaoExecutar = document.getElementById("botaoExecutar");
var seletorDemos = document.getElementById("seletorDemos");
var Delegua = window.Delegua;
var Monaco = window.monaco;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}
var mostrarResultadoTradutor = function (codigo) {
    var textarea = document.createElement("textarea");
    textarea.textContent = codigo;
    textarea.classList = " output";
    textarea.style.height = "100%";
    textarea.style.width = "100%";
    textarea.style.overflow = 'auto';
    outputDiv === null || outputDiv === void 0 ? void 0 : outputDiv.appendChild(textarea);
};
var mostrarResultadoExecutar = function (codigo) {
    var paragrafo = document.createElement("p");
    paragrafo.textContent = codigo;
    paragrafo.classList = " output";
    outputDiv === null || outputDiv === void 0 ? void 0 : outputDiv.appendChild(paragrafo);
};
var clearOutput = function () {
    outputDiv.innerHTML = "";
};
clearOutput();
var executarTradutor = function () {
    var delegua = new Delegua.DeleguaWeb("");
    var codigo = Monaco.editor.getModels()[0].getValue().split("\n");
    var retornoLexador = delegua.lexador.mapear(codigo, -1);
    var retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    var retornoTradutor = delegua.tradutorJavascript.traduzir(retornoAvaliadorSintatico.declaracoes);
    this.mostrarResultadoTradutor(retornoTradutor);
};
var executarCodigo = function () {
    var delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);
    var codigo = Monaco.editor.getModels()[0].getValue().split("\n");
    var retornoLexador = delegua.lexador.mapear(codigo, -1);
    var retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    delegua.executar({ retornoLexador: retornoLexador, retornoAvaliadorSintatico: retornoAvaliadorSintatico });
};
botaoTraduzir.addEventListener("click", function () {
    clearOutput();
    executarTradutor();
});
botaoExecutar.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
var definirTema = function (tema) {
    Monaco.editor.setTheme(tema);
};
//# sourceMappingURL=editor.js.map