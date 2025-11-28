import primitivasVetorDelegua from '@designliquido/delegua/bibliotecas/primitivas-vetor';

import { IPrimitiva } from "./primitiva-interface";

type PrimitivasVetor = IPrimitiva[];

export const primitivasVetor: PrimitivasVetor = [];

for (const [nomePrimitiva, conteudo] of Object.entries(primitivasVetorDelegua)) {
    primitivasVetor.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    } as IPrimitiva);
}