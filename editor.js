var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var resultadoEditorDiv = document.getElementById("resultadoEditor");
var botaoTraduzir = document.getElementById("botaoTraduzir");
var botaoExecutar = document.getElementById("botaoExecutar");
var Delegua = window.Delegua;
var Monaco = window.monaco;
var MarkerSeverity;
(function (MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity || (MarkerSeverity = {}));
var mostrarResultadoExecutar = function (codigo) {
    var paragrafo = document.createElement("p");
    paragrafo.textContent = codigo;
    paragrafo.classList = " resultadoEditor";
    resultadoEditorDiv === null || resultadoEditorDiv === void 0 ? void 0 : resultadoEditorDiv.appendChild(paragrafo);
};
var limparResultadoEditor = function () {
    resultadoEditorDiv.innerHTML = "";
};
limparResultadoEditor();
var mapearErros = function (erros) {
    var editor = Monaco === null || Monaco === void 0 ? void 0 : Monaco.editor.getEditors()[0];
    var _erros = erros.map(function (item) {
        var _a;
        return {
            startLineNumber: ((_a = item === null || item === void 0 ? void 0 : item.simbolo) === null || _a === void 0 ? void 0 : _a.linha) || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item === null || item === void 0 ? void 0 : item.mensagem,
            severity: MarkerSeverity.Error
        };
    });
    console.log(_erros);
    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _erros);
};
var executarTradutor = function () {
    var delegua = new Delegua.DeleguaWeb("");
    var codigo = Monaco.editor.getModels()[0].getValue().split("\n");
    //ts-ignore
    var linguagem = document.querySelector("#linguagem").value.toLowerCase();
    var funcoes = {
        "python": { tradutor: delegua.tradutorPython, linguagem: "python" },
        "javascript": { tradutor: delegua.tradutorJavascript, linguagem: "javascript" },
        "assemblyscript": { tradutor: delegua.tradutorAssemblyScript, linguagem: "typescript" },
    };
    if (codigo[0]) {
        var retornoLexador = delegua.lexador.mapear(codigo, -1);
        var retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
        var funcao = funcoes[linguagem];
        var retornoTradutor = funcao.tradutor.traduzir(retornoAvaliadorSintatico.declaracoes);
        if (retornoTradutor) {
            Monaco.editor.create(document.getElementById("resultadoEditor"), {
                value: retornoTradutor,
                language: funcao.linguagem
            });
        }
    }
};
var executarCodigo = function () {
    return __awaiter(this, void 0, void 0, function () {
        var delegua, codigo, retornoLexador, retornoAvaliadorSintatico, analisadorSemantico, erros, erro;
        return __generator(this, function (_a) {
            try {
                delegua = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);
                codigo = Monaco.editor.getModels()[0].getValue().split("\n");
                retornoLexador = delegua.lexador.mapear(codigo, -1);
                retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(retornoLexador);
                analisadorSemantico = delegua.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
                erros = analisadorSemantico.erros;
                if (erros === null || erros === void 0 ? void 0 : erros.length)
                    return [2 /*return*/, mapearErros(erros)];
                delegua.executar({ retornoLexador: retornoLexador, retornoAvaliadorSintatico: retornoAvaliadorSintatico })
                    .then(function (response) {
                    var erros = response.erros;
                    if (erros) {
                        erros.forEach(function (erro) {
                            if (erro.linha > 0) {
                                var mensagemErro = "Erro na linha ".concat(erro.linha, ":  ").concat(erro.erroInterno.message);
                                mostrarResultadoExecutar(mensagemErro);
                            }
                        });
                    }
                })
                    .catch(function (erro) {
                    mostrarResultadoExecutar(erro);
                });
            }
            catch (error) {
                erro = "Erro: " + error;
                mostrarResultadoExecutar(erro);
            }
            return [2 /*return*/];
        });
    });
};
botaoTraduzir.addEventListener("click", function () {
    limparResultadoEditor();
    executarTradutor();
});
botaoExecutar.addEventListener("click", function () {
    limparResultadoEditor();
    executarCodigo();
});
var definirTema = function (tema) {
    Monaco.editor.setTheme(tema);
};
