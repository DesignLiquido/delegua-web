import primitivasNumeroDelegua from '@designliquido/delegua/bibliotecas/primitivas-numero';

import { IPrimitiva } from './primitiva-interface';

type PrimitivaNumero = IPrimitiva[];

export const primitivasNumero: PrimitivaNumero = [];

for (const [nomePrimitiva, conteudo] of Object.entries(primitivasNumeroDelegua)) {
    primitivasNumero.push({
        nome: nomePrimitiva,
        documentacao: String(conteudo.documentacao),
        exemploCodigo: String(conteudo.exemploCodigo),
        assinaturas: [
            conteudo.assinaturaFormato
        ]
    } as IPrimitiva);
}
