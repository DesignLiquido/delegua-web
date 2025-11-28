import primitivasTextoDelegua from '@designliquido/delegua/bibliotecas/primitivas-texto';

import { IPrimitiva } from "./primitiva-interface";

type PrimitivaTexto = IPrimitiva[];

export const primitivasTexto: PrimitivaTexto = [];

for (const [nomePrimitiva, conteudo] of Object.entries(primitivasTextoDelegua)) {
    primitivasTexto.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    } as IPrimitiva);
}
