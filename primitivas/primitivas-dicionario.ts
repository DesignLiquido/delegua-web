import primitivasDicionarioDelegua from '@designliquido/delegua/bibliotecas/primitivas-dicionario';

import { IPrimitiva } from './primitiva-interface';

type PrimitivasDicionario = IPrimitiva[];

export const primitivasDicionario: PrimitivasDicionario = [];

for (const [nomePrimitiva, conteudo] of Object.entries(primitivasDicionarioDelegua)) {
    primitivasDicionario.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    } as IPrimitiva);
}
