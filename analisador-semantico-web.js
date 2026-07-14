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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalisadorSemanticoWeb = void 0;
const analisador_semantico_1 = require("@designliquido/delegua/analisador-semantico");
class AnalisadorSemanticoWeb extends analisador_semantico_1.AnalisadorSemantico {
    constructor() {
        super();
        this.funcoesImportadasDeTestes = new Set();
    }
    registrarFuncoesImportadasDeTestes(declaracao) {
        const caminho = declaracao.caminho;
        if ((caminho === null || caminho === void 0 ? void 0 : caminho.valor) !== "testes") {
            return;
        }
        const funcoesDoModulo = ["teste", "grupo"];
        if (declaracao.simboloTudo) {
            for (const nome of funcoesDoModulo) {
                this.funcoesImportadasDeTestes.add(nome);
            }
            return;
        }
        for (const simboloImportado of declaracao.elementosImportacao || []) {
            if (funcoesDoModulo.includes(simboloImportado.lexema)) {
                this.funcoesImportadasDeTestes.add(simboloImportado.lexema);
            }
        }
    }
    visitarDeclaracaoImportar(declaracao) {
        return __awaiter(this, void 0, void 0, function* () {
            this.registrarFuncoesImportadasDeTestes(declaracao);
            return Promise.resolve();
        });
    }
    visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos) {
        const nomeFuncao = entidadeChamadaVariavel.simbolo.lexema;
        if (this.funcoesImportadasDeTestes.has(nomeFuncao)) {
            return Promise.resolve();
        }
        return super.visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos);
    }
    analisar(declaracoes) {
        const _super = Object.create(null, {
            analisar: { get: () => super.analisar }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.funcoesImportadasDeTestes = new Set();
            return _super.analisar.call(this, declaracoes);
        });
    }
}
exports.AnalisadorSemanticoWeb = AnalisadorSemanticoWeb;
