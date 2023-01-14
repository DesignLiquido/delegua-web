var outputDiv = document.getElementById("output");
var botaoTraduzir = document.getElementById("botaoTraduzir");
var botaoExecutar = document.getElementById("botaoExecutar");
var seletorDemos = document.getElementById("seletorDemos");
var CodeFlask = window.CodeFlask;
var Delegua = window.Delegua;
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
var editor = new CodeFlask("#editor", {
    language: "js",
    lineNumbers: true,
    defaultTheme: false,
});
clearOutput();
var executarTradutor = function () {
    var delegua = new Delegua.DeleguaWeb("");
    var codigo = editor.getCode().split("\n");
    var retornoLexador = delegua.lexador.mapear(codigo, -1);
    var retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    var retornoTradutor = delegua.tradutorJavascript.traduzir(retornoAvaliadorSintatico.declaracoes);
    this.mostrarResultadoTradutor(retornoTradutor);
};
var executarCodigo = function () {
    var delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);
    var codigo = editor.getCode().split("\n");
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
//# sourceMappingURL=editor.js.map