"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visualizacao_arvore_binaria_1 = require("../visualizacao-arvore-binaria");
function assertStrictEqual(atual, esperado, mensagem) {
    if (atual !== esperado) {
        throw new Error(mensagem || `Esperava ${String(esperado)}, mas obteve ${String(atual)}`);
    }
}
function assertDeepStrictEqual(atual, esperado, mensagem) {
    const atualJson = JSON.stringify(atual);
    const esperadoJson = JSON.stringify(esperado);
    if (atualJson !== esperadoJson) {
        throw new Error(mensagem || `Esperava ${esperadoJson}, mas obteve ${atualJson}`);
    }
}
function assertOk(condicao, mensagem) {
    if (!condicao) {
        throw new Error(mensagem || 'Condição esperada era verdadeira');
    }
}
function assertMatch(texto, padrao, mensagem) {
    if (!padrao.test(texto)) {
        throw new Error(mensagem || `Texto "${texto}" não corresponde a ${padrao}`);
    }
}
function no(valor, esquerda = null, direita = null) {
    return { valor, esquerda, direita };
}
function coletarIds(arvore, ids = []) {
    if (!arvore) {
        return ids;
    }
    ids.push(arvore.id);
    coletarIds(arvore.esquerda, ids);
    coletarIds(arvore.direita, ids);
    return ids;
}
function criarArvoreCompleta() {
    return no(4, no(2, no(1), no(3)), no(7, no(6), no(9)));
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
function executarTestes() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // 1. Árvore com um único nó
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(no(42));
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore de um nó');
        }
        assertStrictEqual(resultado.arvore.valor, 42);
        assertStrictEqual(resultado.arvore.esquerda, null);
        assertStrictEqual(resultado.arvore.direita, null);
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), [42]);
    }
    // 2. Exemplo completo de sete nós
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore completa');
        }
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), [4, 2, 7, 1, 3, 6, 9]);
        assertStrictEqual((0, visualizacao_arvore_binaria_1.formatarOrdemPorNivel)((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore)), '[4, 2, 7, 1, 3, 6, 9]');
    }
    // 3. Árvore desbalanceada
    {
        const desbalanceada = no(1, null, no(2, null, no(3, null, no(4))));
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(desbalanceada);
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore desbalanceada');
        }
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), [1, 2, 3, 4]);
        const layout = (0, visualizacao_arvore_binaria_1.calcularLayoutArvoreBinaria)(resultado.arvore);
        assertStrictEqual(layout.nos.length, 4);
        assertOk(layout.nos.every((item, indice, todos) => todos.findIndex((candidato) => candidato.x === item.x && candidato.y === item.y) === indice));
    }
    // 4. Árvore vazia
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(null);
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok) {
            throw new Error('Esperava normalização ok para nulo');
        }
        assertStrictEqual(resultado.arvore, null);
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), []);
    }
    // 5. Serialização por nível
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore para serialização');
        }
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), [4, 2, 7, 1, 3, 6, 9]);
    }
    // 6. IDs únicos
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(criarArvoreCompleta());
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
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(ciclico);
        assertStrictEqual(resultado.ok, false);
        if (resultado.ok) {
            throw new Error('Esperava erro de ciclo');
        }
        assertMatch(resultado.mensagem, /cíclicas/i);
    }
    // 8. Proteção de máximo de nós
    {
        const quantidade = visualizacao_arvore_binaria_1.LIMITE_MAXIMO_NOS_ARVORE_BINARIA + 1;
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
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(nos[0]);
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
        for (let i = 1; i <= visualizacao_arvore_binaria_1.LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA; i++) {
            atual.esquerda = no(i);
            atual = atual.esquerda;
        }
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(raiz);
        assertStrictEqual(resultado.ok, false);
        if (resultado.ok) {
            throw new Error('Esperava erro de profundidade');
        }
        assertMatch(resultado.mensagem, /profundidade máxima/i);
    }
    // 10. Layout determinístico
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(criarArvoreCompleta());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore para layout');
        }
        const layoutA = (0, visualizacao_arvore_binaria_1.calcularLayoutArvoreBinaria)(resultado.arvore);
        const layoutB = (0, visualizacao_arvore_binaria_1.calcularLayoutArvoreBinaria)(resultado.arvore);
        assertDeepStrictEqual(layoutA, layoutB);
        assertStrictEqual(layoutA.nos.length, 7);
        assertStrictEqual(layoutA.arestas.length, 6);
        assertDeepStrictEqual(layoutA.ordemPorNivel, [4, 2, 7, 1, 3, 6, 9]);
        const porValor = new Map(layoutA.nos.map((item) => [item.valor, item]));
        assertOk(((_b = (_a = porValor.get(1)) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : -1) > ((_d = (_c = porValor.get(2)) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : -1));
        assertOk(((_f = (_e = porValor.get(2)) === null || _e === void 0 ? void 0 : _e.x) !== null && _f !== void 0 ? _f : 0) < ((_h = (_g = porValor.get(4)) === null || _g === void 0 ? void 0 : _g.x) !== null && _h !== void 0 ? _h : 0));
        assertOk(((_k = (_j = porValor.get(4)) === null || _j === void 0 ? void 0 : _j.x) !== null && _k !== void 0 ? _k : 0) < ((_m = (_l = porValor.get(7)) === null || _l === void 0 ? void 0 : _l.x) !== null && _m !== void 0 ? _m : 0));
    }
    // Valor primitivo inválido
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(123);
        assertStrictEqual(resultado.ok, false);
    }
    // Nó via dicionário com "dado" (padrão recomendado no playground)
    {
        const resultado = (0, visualizacao_arvore_binaria_1.normalizarArvoreBinaria)(criarArvoreComDado());
        assertStrictEqual(resultado.ok, true);
        if (!resultado.ok || !resultado.arvore) {
            throw new Error('Esperava árvore com propriedade dado');
        }
        assertDeepStrictEqual((0, visualizacao_arvore_binaria_1.serializarOrdemPorNivel)(resultado.arvore), [4, 2, 7, 1, 3, 6, 9]);
    }
    console.log('Todos os testes de visualização de árvore binária passaram.');
}
test('visualização de árvore binária', executarTestes);
