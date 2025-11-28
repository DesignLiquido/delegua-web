"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasTexto = void 0;
const primitivas_texto_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-texto"));
exports.primitivasTexto = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_texto_1.default)) {
    exports.primitivasTexto.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}
