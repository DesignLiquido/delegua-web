"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DeleguaWeb = void 0;
var lexador_1 = require("@designliquido/delegua/fontes/lexador");
var avaliador_sintatico_1 = require("@designliquido/delegua/fontes/avaliador-sintatico");
var interpretador_1 = require("@designliquido/delegua/fontes/interpretador");
var delegua_1 = __importDefault(require("@designliquido/delegua/fontes/tipos-de-simbolos/delegua"));
var DeleguaWeb = /** @class */ (function () {
    function DeleguaWeb(nomeArquivo, funcaoDeRetorno) {
        if (funcaoDeRetorno === void 0) { funcaoDeRetorno = null; }
        // TODO: Remover todos os `any` abaixo depois de implementar DeleguaInterface.
        this.dialeto = "delegua";
        this.nomeArquivo = nomeArquivo;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.lexador = new lexador_1.Lexador();
        this.avaliadorSintatico = new avaliador_sintatico_1.AvaliadorSintatico();
        this.interpretador = new interpretador_1.Interpretador(null, "", false, this.funcaoDeRetorno);
        this.interpretador.interfaceEntradaSaida = {
            question: function (mensagem, callback) {
                var resposta = window.prompt(mensagem);
                callback(resposta);
            }
        };
        this.teveErro = false;
        this.teveErroEmTempoDeExecucao = false;
    }
    DeleguaWeb.prototype.executar = function (retornoImportador, manterAmbiente) {
        if (manterAmbiente === void 0) { manterAmbiente = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, erroLexador, _b, _c, erroAvaliadorSintatico, retornoInterpretador, _d, _e, erroInterpretador, erroEmJavaScript;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (retornoImportador.retornoLexador.erros.length > 0) {
                            for (_i = 0, _a = retornoImportador.retornoLexador.erros; _i < _a.length; _i++) {
                                erroLexador = _a[_i];
                                this.reportar(erroLexador.linha, " no '".concat(erroLexador.caractere, "'"), erroLexador.mensagem);
                            }
                            return [2 /*return*/];
                        }
                        if (retornoImportador.retornoAvaliadorSintatico.erros.length > 0) {
                            for (_b = 0, _c = retornoImportador
                                .retornoAvaliadorSintatico.erros; _b < _c.length; _b++) {
                                erroAvaliadorSintatico = _c[_b];
                                this.erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.interpretador.interpretar(retornoImportador.retornoAvaliadorSintatico.declaracoes, manterAmbiente)];
                    case 1:
                        retornoInterpretador = _f.sent();
                        if (retornoInterpretador.erros.length > 0) {
                            for (_d = 0, _e = retornoInterpretador.erros; _d < _e.length; _d++) {
                                erroInterpretador = _e[_d];
                                if (erroInterpretador.simbolo) {
                                    this.erroEmTempoDeExecucao(erroInterpretador.simbolo);
                                }
                                else {
                                    erroEmJavaScript = erroInterpretador;
                                    console.error("Erro em JavaScript: " + "".concat(erroEmJavaScript.message));
                                    console.error("Pilha de execu\u00E7\u00E3o: " + "".concat(erroEmJavaScript.stack));
                                }
                            }
                        }
                        return [2 /*return*/, {
                                erros: retornoInterpretador.erros,
                                resultado: retornoInterpretador.resultado
                            }];
                }
            });
        });
    };
    DeleguaWeb.prototype.versao = function () {
        return "0.9";
    };
    DeleguaWeb.prototype.reportar = function (linha, onde, mensagem) {
        if (this.nomeArquivo)
            console.error("[Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(linha, "]") +
                " Erro".concat(onde, ": ").concat(mensagem));
        else
            console.error("[Linha: ".concat(linha, "]") + " Erro".concat(onde, ": ").concat(mensagem));
        this.teveErro = true;
    };
    DeleguaWeb.prototype.erro = function (simbolo, mensagemDeErro) {
        if (simbolo.tipo === delegua_1["default"].EOF) {
            this.reportar(Number(simbolo.linha), " no final", mensagemDeErro);
        }
        else {
            this.reportar(Number(simbolo.linha), " no '".concat(simbolo.lexema, "'"), mensagemDeErro);
        }
    };
    DeleguaWeb.prototype.erroEmTempoDeExecucao = function (erro) {
        if (erro && erro.simbolo && erro.simbolo.linha) {
            if (this.nomeArquivo)
                console.error("Erro: [Arquivo: ".concat(this.nomeArquivo, "] [Linha: ").concat(erro.simbolo.linha, "]") +
                    " ".concat(erro.mensagem));
            else
                console.error("Erro: [Linha: ".concat(erro.simbolo.linha, "]") + " ".concat(erro.mensagem));
        }
        else {
            console.error("Erro: [Linha: ".concat(erro.linha || 0, "]") + " ".concat(erro.mensagem));
        }
        this.teveErroEmTempoDeExecucao = true;
    };
    return DeleguaWeb;
}());
exports.DeleguaWeb = DeleguaWeb;
//# sourceMappingURL=index.js.map