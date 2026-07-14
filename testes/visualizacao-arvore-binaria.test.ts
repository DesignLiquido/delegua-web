import {
    LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA,
    LIMITE_MAXIMO_NOS_ARVORE_BINARIA,
    NoArvoreBinariaVisual,
    calcularLayoutArvoreBinaria,
    formatarOrdemPorNivel,
    normalizarArvoreBinaria,
    serializarOrdemPorNivel,
} from '../visualizacao-arvore-binaria';

function assertStrictEqual(atual: unknown, esperado: unknown, mensagem?: string): void {
    if (atual !== esperado) {
        throw new Error(mensagem || `Esperava ${String(esperado)}, mas obteve ${String(atual)}`);
    }
}

function assertDeepStrictEqual(atual: unknown, esperado: unknown, mensagem?: string): void {
    const atualJson = JSON.stringify(atual);
    const esperadoJson = JSON.stringify(esperado);
    if (atualJson !== esperadoJson) {
        throw new Error(mensagem || `Esperava ${esperadoJson}, mas obteve ${atualJson}`);
    }
}

function assertOk(condicao: unknown, mensagem?: string): void {
    if (!condicao) {
        throw new Error(mensagem || 'Condição esperada era verdadeira');
    }
}

function assertMatch(texto: string, padrao: RegExp, mensagem?: string): void {
    if (!padrao.test(texto)) {
        throw new Error(mensagem || `Texto "${texto}" não corresponde a ${padrao}`);
    }
}

function no(valor: unknown, esquerda: unknown = null, direita: unknown = null) {
    return { valor, esquerda, direita };
}

function coletarIds(arvore: NoArvoreBinariaVisual | null, ids: number[] = []): number[] {
    if (!arvore) {
        return ids;
    }
    ids.push(arvore.id);
    coletarIds(arvore.esquerda, ids);
    coletarIds(arvore.direita, ids);
    return ids;
}

function criarArvoreCompleta() {
    return no(
        4,
        no(2, no(1), no(3)),
        no(7, no(6), no(9))
    );
}

function criarArvoreComDado() {
    return {
        dado: 4,
        esquerda: {
            dado: 2,
            esquerda: { dado: 1, esquerda: null, direita: null },
            direita: { dado: 3, esquerda: null, direita: null },
        },
        direita: {
            dado: 7,
            esquerda: { dado: 6, esquerda: null, direita: null },
            direita: { dado: 9, esquerda: null, direita: null },
        },
    };
}

function executarTestes(): void {
    // 1. Árvore com um único nó
    {
        const resultado = normalizarArvoreBinaria(no(42));
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore de um nó');
        }
        assertStrictEqual(resultado.arvore.valor, 42);
        assertStrictEqual(resultado.arvore.esquerda, null);
        assertStrictEqual(resultado.arvore.direita, null);
        assertDeepStrictEqual(serializarOrdemPorNivel(resultado.arvore), [42]);
    }

    // 2. Exemplo completo de sete nós
    {
        const resultado = normalizarArvoreBinaria(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore completa');
        }
        assertDeepStrictEqual(
            serializarOrdemPorNivel(resultado.arvore),
            [4, 2, 7, 1, 3, 6, 9]
        );
        assertStrictEqual(
            formatarOrdemPorNivel(serializarOrdemPorNivel(resultado.arvore)),
            '[4, 2, 7, 1, 3, 6, 9]'
        );
    }

    // 3. Árvore desbalanceada
    {
        const desbalanceada = no(1, null, no(2, null, no(3, null, no(4))));
        const resultado = normalizarArvoreBinaria(desbalanceada);
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore desbalanceada');
        }
        assertDeepStrictEqual(serializarOrdemPorNivel(resultado.arvore), [1, 2, 3, 4]);
        const layout = calcularLayoutArvoreBinaria(resultado.arvore);
        assertStrictEqual(layout.nos.length, 4);
        assertOk(layout.nos.every((item, indice, todos) =>
            todos.findIndex((candidato) => candidato.x === item.x && candidato.y === item.y) === indice
        ));
    }

    // 4. Árvore vazia
    {
        const resultado = normalizarArvoreBinaria(null);
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok) {
            throw new Error('Esperava normalização ok para nulo');
        }
        assertStrictEqual(resultado.arvore, null);
        assertDeepStrictEqual(serializarOrdemPorNivel(resultado.arvore), []);
    }

    // 5. Serialização por nível
    {
        const resultado = normalizarArvoreBinaria(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore para serialização');
        }
        assertDeepStrictEqual(serializarOrdemPorNivel(resultado.arvore), [4, 2, 7, 1, 3, 6, 9]);
    }

    // 6. IDs únicos
    {
        const resultado = normalizarArvoreBinaria(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore para IDs');
        }
        const ids = coletarIds(resultado.arvore);
        assertStrictEqual(ids.length, 7);
        assertStrictEqual(new Set(ids).size, 7);
    }

    // 7. Detecção de ciclo
    {
        const ciclico = no(1);
        ciclico.esquerda = ciclico;
        const resultado = normalizarArvoreBinaria(ciclico);
        assertStrictEqual(resultado.ok, false);
        if (resultado.ok) {
            throw new Error('Esperava erro de ciclo');
        }
        assertMatch(resultado.mensagem, /cíclicas/i);
    }

    // 8. Proteção de máximo de nós
    {
        const quantidade = LIMITE_MAXIMO_NOS_ARVORE_BINARIA + 1;
        const nos = Array.from({ length: quantidade }, (_, indice) => no(indice));
        for (let indice = 0; indice < quantidade; indice++) {
            const esquerda = indice * 2 + 1;
            const direita = indice * 2 + 2;
            if (esquerda < quantidade) {
                nos[indice].esquerda = nos[esquerda];
            }
            if (direita < quantidade) {
                nos[indice].direita = nos[direita];
            }
        }
        const resultado = normalizarArvoreBinaria(nos[0]);
        assertStrictEqual(resultado.ok, false);
        if (resultado.ok) {
            throw new Error('Esperava erro de máximo de nós');
        }
        assertMatch(resultado.mensagem, /máximo de nós/i);
    }

    // 9. Proteção de profundidade máxima
    {
        let atual = no(0);
        const raiz = atual;
        for (let i = 1; i <= LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA; i++) {
            atual.esquerda = no(i);
            atual = atual.esquerda as { valor: unknown; esquerda: unknown; direita: unknown };
        }
        const resultado = normalizarArvoreBinaria(raiz);
        assertStrictEqual(resultado.ok, false);
        if (resultado.ok) {
            throw new Error('Esperava erro de profundidade');
        }
        assertMatch(resultado.mensagem, /profundidade máxima/i);
    }

    // 10. Layout determinístico
    {
        const resultado = normalizarArvoreBinaria(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore para layout');
        }
        const layoutA = calcularLayoutArvoreBinaria(resultado.arvore);
        const layoutB = calcularLayoutArvoreBinaria(resultado.arvore);
        assertDeepStrictEqual(layoutA, layoutB);
        assertStrictEqual(layoutA.nos.length, 7);
        assertStrictEqual(layoutA.arestas.length, 6);
        assertDeepStrictEqual(layoutA.ordemPorNivel, [4, 2, 7, 1, 3, 6, 9]);

        const porValor = new Map(layoutA.nos.map((item) => [item.valor, item]));
        assertOk((porValor.get(1)?.y ?? -1) > (porValor.get(2)?.y ?? -1));
        assertOk((porValor.get(2)?.x ?? 0) < (porValor.get(4)?.x ?? 0));
        assertOk((porValor.get(4)?.x ?? 0) < (porValor.get(7)?.x ?? 0));
    }

    // Valor primitivo inválido
    {
        const resultado = normalizarArvoreBinaria(123);
        assertStrictEqual(resultado.ok, false);
    }

    // Nó via dicionário com "dado" (padrão recomendado no playground)
    {
        const resultado = normalizarArvoreBinaria(criarArvoreComDado());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore com propriedade dado');
        }
        assertDeepStrictEqual(serializarOrdemPorNivel(resultado.arvore), [4, 2, 7, 1, 3, 6, 9]);
    }

    console.log('Todos os testes de visualização de árvore binária passaram.');
}

executarTestes();
