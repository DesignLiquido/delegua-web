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

const objetoDemonstracoes = Object.entries(demos);
function carregarDemonstracao(grupo: string, nome: string) {
    editor.updateCode(demos[grupo][nome]);
}

const opcaoPadrao = document.createElement("option");
opcaoPadrao.disabled = true;
opcaoPadrao.selected = true;
opcaoPadrao.hidden = true;

opcaoPadrao.textContent = capitalize('Exemplos...');
opcaoPadrao.value = 'Exemplos...';
seletorDemos.appendChild(opcaoPadrao);

objetoDemonstracoes.forEach(([chave, valor]) => {
    const optgroup = document.createElement("optgroup");

    optgroup.textContent = capitalize(chave);
    optgroup.label = chave;

    Object.entries(valor).forEach(([exemplo, codigo]) => {
        const opcao = document.createElement("option");
        opcao.textContent = exemplo;
        optgroup.appendChild(opcao);
    });

    seletorDemos.appendChild(optgroup);
});

let queryCode = getQueryVariable("code");
if (queryCode !== undefined) {
    editor.updateCode(decodeURI(queryCode));
    (seletorDemos as any).value = "custom";
} else {
    carregarDemonstracao('Fundamentos', 'Olá Mundo');
}

const executarCodigo = function () {
    const delegua = new Delegua.DeleguaWeb("", mostrarResultado);

    const codigo = editor.getCode().split("\n");

    for (let linha = 0; linha < codigo.length; linha++) {
        codigo[linha] += "\0";
    }

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador);

    delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
};

seletorDemos.addEventListener("change", function (e: any) {
    const grupoSelecionado = (document.querySelector('#seletorDemos option:checked').parentElement as any).label;
    carregarDemonstracao(grupoSelecionado, e.target.value);
});

runButton.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
