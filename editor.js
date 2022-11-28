var outputDiv = document.getElementById("output");
var runButton = document.getElementById("botaoExecutar");
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
var mostrarResultado = function (msg) {
    var p = document.createElement("p");
    p.textContent = msg;
    p.classList = " output";
    outputDiv === null || outputDiv === void 0 ? void 0 : outputDiv.appendChild(p);
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
var executarCodigo = function () {
    var delegua = new Delegua.DeleguaWeb("", mostrarResultado);
    var codigo = editor.getCode().split("\n");
    for (var linha = 0; linha < codigo.length; linha++) {
        codigo[linha] += "\0";
    }
    var retornoLexador = delegua.lexador.mapear(codigo, -1);
    var retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
    delegua.executar({ retornoLexador: retornoLexador, retornoAvaliadorSintatico: retornoAvaliadorSintatico });
};
runButton.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
//# sourceMappingURL=editor.js.map