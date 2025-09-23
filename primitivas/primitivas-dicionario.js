"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasDicionario = void 0;
const primitivas_dicionario_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-dicionario"));
exports.primitivasDicionario = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_dicionario_1.default)) {
    exports.primitivasDicionario.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}
