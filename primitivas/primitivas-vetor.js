"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.primitivasVetor = void 0;
const primitivas_vetor_1 = __importDefault(require("@designliquido/delegua/bibliotecas/primitivas-vetor"));
exports.primitivasVetor = [];
for (const [nomePrimitiva, conteudo] of Object.entries(primitivas_vetor_1.default)) {
    exports.primitivasVetor.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    });
}
