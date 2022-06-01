var outputDiv = document.getElementById("output");
var runButton = document.getElementById("runBtn");
var demoSelector = document.getElementById("demoSelector");
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
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
// console.log = console.error = function (msg) {
//   const p = document.createElement("p");
//   p.textContent = msg;
//   p.classList = " output";
//   outputDiv.appendChild(p);
// };
var mostrarResultado = function (msg) {
    var p = document.createElement("p");
    p.textContent = msg;
    p.classList = " output";
    outputDiv.appendChild(p);
};
var clearOutput = function () {
    outputDiv.innerHTML = "";
};
var editor = new CodeFlask("#editor", {
    language: "js",
    lineNumbers: true,
    defaultTheme: false
});
clearOutput();
var demoKeys = Object.keys(demos);
function loadDemo(name) {
    editor.updateCode(demos[name]);
}
demoKeys.forEach(function (demo, index) {
    var option = document.createElement("option");
    if (index === 0) {
        option.disabled = true;
        option.selected = true;
        option.hidden = true;
    }
    option.textContent = demo.capitalize();
    option.value = demo;
    demoSelector.appendChild(option);
});
var queryCode = getQueryVariable("code");
if (queryCode !== undefined) {
    editor.updateCode(decodeURI(queryCode));
    demoSelector.value = "custom";
}
else {
    loadDemo(demoKeys[0]);
}
var executarCodigo = function () {
    var delegua = new Delegua.Delegua('', mostrarResultado);
    var codigo = editor.getCode().split("\n");
    delegua.executar({ codigo: codigo });
};
demoSelector.addEventListener("change", function () {
    loadDemo(demoSelector.value);
});
runButton.addEventListener("click", function () {
    clearOutput();
    executarCodigo();
});
//# sourceMappingURL=editor.js.map