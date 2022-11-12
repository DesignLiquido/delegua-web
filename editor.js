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
var objetoDemonstracoes = Object.entries(demos);
function carregarDemonstracao(grupo, nome) {
    editor.updateCode(demos[grupo][nome]);
}
var opcaoPadrao = document.createElement("option");
opcaoPadrao.disabled = true;
opcaoPadrao.selected = true;
opcaoPadrao.hidden = true;
opcaoPadrao.textContent = capitalize('Exemplos...');
opcaoPadrao.value = 'Exemplos...';
seletorDemos.appendChild(opcaoPadrao);
objetoDemonstracoes.forEach(function (_a) {
    var chave = _a[0], valor = _a[1];
    var optgroup = document.createElement("optgroup");
    optgroup.textContent = capitalize(chave);
    optgroup.label = chave;
    Object.entries(valor).forEach(function (_a) {
        var exemplo = _a[0], codigo = _a[1];
        var opcao = document.createElement("option");
        opcao.textContent = exemplo;
        optgroup.appendChild(opcao);
    });
    seletorDemos.appendChild(optgroup);
});
var queryCode = getQueryVariable("code");
if (queryCode !== undefined) {
    editor.updateCode(decodeURI(queryCode));
    seletorDemos.value = "custom";
}
else {
    carregarDemonstracao('Fundamentos', 'Olá Mundo');
}
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
seletorDemos.addEventListener("change", function (e) {
    var grupoSelecionado = document.querySelector('#seletorDemos option:checked').parentElement.label;
    carregarDemonstracao(grupoSelecionado, e.target.value);
});
runButton.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
//# sourceMappingURL=editor.js.map