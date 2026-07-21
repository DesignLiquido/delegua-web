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
// Bibliotecas exclusivas do delegua-web cujas funções são chamadas sem
// qualificação de objeto (ex: `teste(...)`, `visualizarArvoreBinaria(...)`).
// O analisador semântico do núcleo do Delégua não rastreia símbolos trazidos
// por `importar`, então essas funções precisam ser conhecidas aqui.
const FUNCOES_POR_BIBLIOTECA_WEB = {
    testes: ["teste", "grupo"],
    visualizacao: ["visualizarArvoreBinaria"],
};
class AnalisadorSemanticoWeb extends analisador_semantico_1.AnalisadorSemantico {
    constructor() {
        super();
        this.funcoesImportadasDeBibliotecasWeb = new Set();
    }
    registrarFuncoesImportadasDeBibliotecasWeb(declaracao) {
        const caminho = declaracao.caminho;
        const funcoesDoModulo = FUNCOES_POR_BIBLIOTECA_WEB[caminho === null || caminho === void 0 ? void 0 : caminho.valor];
        if (!funcoesDoModulo) {
            return;
        }
        if (declaracao.simboloTudo) {
            for (const nome of funcoesDoModulo) {
                this.funcoesImportadasDeBibliotecasWeb.add(nome);
            }
            return;
        }
        for (const simboloImportado of declaracao.elementosImportacao || []) {
            if (funcoesDoModulo.includes(simboloImportado.lexema)) {
                this.funcoesImportadasDeBibliotecasWeb.add(simboloImportado.lexema);
            }
        }
    }
    visitarDeclaracaoImportar(declaracao) {
        return __awaiter(this, void 0, void 0, function* () {
            this.registrarFuncoesImportadasDeBibliotecasWeb(declaracao);
            return Promise.resolve();
        });
    }
    visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos) {
        const nomeFuncao = entidadeChamadaVariavel.simbolo.lexema;
        if (this.funcoesImportadasDeBibliotecasWeb.has(nomeFuncao)) {
            return Promise.resolve();
        }
        return super.visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos);
    }
    analisar(declaracoes) {
        const _super = Object.create(null, {
            analisar: { get: () => super.analisar }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.funcoesImportadasDeBibliotecasWeb = new Set();
            return _super.analisar.call(this, declaracoes);
        });
    }
}
exports.AnalisadorSemanticoWeb = AnalisadorSemanticoWeb;
