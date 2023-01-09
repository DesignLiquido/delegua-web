const outputDiv: HTMLElement = document.getElementById("output") as HTMLElement;
const runButton = document.getElementById("botaoExecutar");
const seletorDemos = document.getElementById("seletorDemos");

const CodeFlask = (window as any).CodeFlask;
const Delegua = (window as any).Delegua;

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

const mostrarResultado = function (msg: string) {
    const p: any = document.createElement("p");
    p.textContent = msg;
    p.classList = " output";
    outputDiv?.appendChild(p);
};

const clearOutput = function () {
    outputDiv.innerHTML = "";
};

const editor = new CodeFlask("#editor", {
    language: "js",
    lineNumbers: true,
    defaultTheme: false,
});

clearOutput();

const executarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("", mostrarResultado);

    const codigo = editor.getCode().split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
};

runButton.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
