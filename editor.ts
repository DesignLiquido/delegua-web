const outputDiv: HTMLElement = document.getElementById("output") as HTMLElement;
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoExecutar = document.getElementById("botaoExecutar");
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

const mostrarResultadoTradutor = function(codigo: string) {
    const textarea: any = document.createElement("textarea");
    textarea.textContent = codigo;
    textarea.classList = " output";
    textarea.style.height = "100%";
    textarea.style.width = "100%";
    textarea.style.overflow = 'auto'
    outputDiv?.appendChild(textarea);
}

const mostrarResultadoExecutar = function(codigo: string) {
    const paragrafo: any = document.createElement("p");
    paragrafo.textContent = codigo;
    paragrafo.classList = " output";
    outputDiv?.appendChild(paragrafo);
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

const executarTradutor = function () {
    const delegua = new Delegua.DeleguaWeb("");

    const codigo = editor.getCode().split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    const retornoTradutor = delegua.tradutorJavascript.traduzir(retornoAvaliadorSintatico.declaracoes)

    this.mostrarResultadoTradutor(retornoTradutor);
}

const executarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);

    const codigo = editor.getCode().split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
};

botaoTraduzir.addEventListener("click", function () {
    clearOutput();
    executarTradutor();
});

botaoExecutar.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
