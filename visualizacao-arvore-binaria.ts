export interface NoArvoreBinariaVisual {
    id: number;
    valor: unknown;
    esquerda: NoArvoreBinariaVisual | null;
    direita: NoArvoreBinariaVisual | null;
}

export interface PosicaoNoArvoreBinaria {
    id: number;
    valor: unknown;
    x: number;
    y: number;
}

export interface ArestaArvoreBinaria {
    deId: number;
    paraId: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface LayoutArvoreBinaria {
    nos: PosicaoNoArvoreBinaria[];
    arestas: ArestaArvoreBinaria[];
    largura: number;
    altura: number;
    ordemPorNivel: unknown[];
}

export type ResultadoNormalizacaoArvoreBinaria =
    | { ok: true; arvore: NoArvoreBinariaVisual | null }
    | { ok: false; mensagem: string };

export type EstadoVisualizacaoArvoreBinaria =
    | { solicitada: false }
    | { solicitada: true; tipo: 'vazia' }
    | { solicitada: true; tipo: 'pronta'; arvore: NoArvoreBinariaVisual }
    | { solicitada: true; tipo: 'erro'; mensagem: string };

export const LIMITE_MAXIMO_NOS_ARVORE_BINARIA = 100;
export const LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA = 20;

const ESPACAMENTO_HORIZONTAL = 70;
const ESPACAMENTO_VERTICAL = 80;
const RAIO_NO = 20;
const MARGEM = 28;

interface ObjetoComPropriedades {
    propriedades: Record<string, unknown>;
}

function eObjetoComPropriedades(valor: unknown): valor is ObjetoComPropriedades {
    return !!valor
        && typeof valor === 'object'
        && 'propriedades' in (valor as object)
        && typeof (valor as ObjetoComPropriedades).propriedades === 'object'
        && (valor as ObjetoComPropriedades).propriedades !== null;
}

function extrairValorDeclarado(campos: Record<string, unknown>): { encontrado: boolean; valor: unknown } {
    if (Object.prototype.hasOwnProperty.call(campos, 'valor')) {
        return { encontrado: true, valor: campos.valor };
    }
    if (Object.prototype.hasOwnProperty.call(campos, 'dado')) {
        return { encontrado: true, valor: campos.dado };
    }
    if (Object.prototype.hasOwnProperty.call(campos, 'conteudo')) {
        return { encontrado: true, valor: campos.conteudo };
    }
    return { encontrado: false, valor: undefined };
}

/**
 * Dicionários/objetos literais com esquerda/direita.
 * Aceita valor, dado ou conteudo como carga do nó.
 * Evitamos chamar resolverValor no objeto inteiro quando ele já parece um nó,
 * porque o núcleo desembrulha objetos que possuem a chave "valor".
 */
function eNoEstrutural(valor: unknown): valor is Record<string, unknown> {
    if (!valor || typeof valor !== 'object' || eObjetoComPropriedades(valor)) {
        return false;
    }

    const campos = valor as Record<string, unknown>;
    return extrairValorDeclarado(campos).encontrado
        && ('esquerda' in campos || 'direita' in campos);
}

function resolverValorSeguro(
    valor: unknown,
    resolverValor?: (valor: unknown) => unknown
): unknown {
    if (!resolverValor) {
        return valor;
    }
    try {
        return resolverValor(valor);
    } catch {
        return valor;
    }
}

function montarCamposDeRegistro(campos: Record<string, unknown>): { valor: unknown; esquerda: unknown; direita: unknown } | null {
    const valorDeclarado = extrairValorDeclarado(campos);
    if (!valorDeclarado.encontrado) {
        return null;
    }

    return {
        valor: valorDeclarado.valor,
        esquerda: Object.prototype.hasOwnProperty.call(campos, 'esquerda') ? campos.esquerda : null,
        direita: Object.prototype.hasOwnProperty.call(campos, 'direita') ? campos.direita : null,
    };
}

function obterCamposNo(
    valor: unknown,
    resolverValor?: (valor: unknown) => unknown
): { valor: unknown; esquerda: unknown; direita: unknown } | null {
    if (valor === null || valor === undefined) {
        return null;
    }

    if (eObjetoComPropriedades(valor)) {
        return montarCamposDeRegistro(valor.propriedades);
    }

    if (eNoEstrutural(valor)) {
        return montarCamposDeRegistro(valor);
    }

    const resolvido = resolverValorSeguro(valor, resolverValor);

    if (resolvido === null || resolvido === undefined) {
        return null;
    }

    if (eObjetoComPropriedades(resolvido)) {
        return montarCamposDeRegistro(resolvido.propriedades);
    }

    if (eNoEstrutural(resolvido)) {
        return montarCamposDeRegistro(resolvido);
    }

    return null;
}

/**
 * Converte um objeto Delégua (ou um nó plano de teste) em uma árvore imutável
 * segura para a interface, com proteção contra ciclos e limites de tamanho.
 */
export function normalizarArvoreBinaria(
    raiz: unknown,
    resolverValor?: (valor: unknown) => unknown
): ResultadoNormalizacaoArvoreBinaria {
    const visitados = new WeakSet<object>();
    let proximoId = 1;
    let totalNos = 0;

    const caminhar = (valorAtual: unknown, profundidade: number): ResultadoNormalizacaoArvoreBinaria => {
        if (valorAtual === null || valorAtual === undefined) {
            return { ok: true, arvore: null };
        }

        let identidadeNo: object;
        if (eObjetoComPropriedades(valorAtual) || eNoEstrutural(valorAtual)) {
            identidadeNo = valorAtual as object;
        } else {
            const resolvido = resolverValorSeguro(valorAtual, resolverValor);

            if (resolvido === null || resolvido === undefined) {
                return { ok: true, arvore: null };
            }

            if (typeof resolvido !== 'object') {
                return {
                    ok: false,
                    mensagem: 'A raiz informada não é um nó de árvore. Informe um dicionário ou objeto com as propriedades dado (ou valor), esquerda e direita.',
                };
            }

            identidadeNo = resolvido as object;
        }

        if (visitados.has(identidadeNo)) {
            return {
                ok: false,
                mensagem: 'A árvore contém referências cíclicas e não pode ser visualizada.',
            };
        }

        if (profundidade > LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA) {
            return {
                ok: false,
                mensagem: `A árvore ultrapassa a profundidade máxima permitida (${LIMITE_MAXIMA_PROFUNDIDADE_ARVORE_BINARIA}).`,
            };
        }

        const campos = obterCamposNo(valorAtual, resolverValor);
        if (!campos) {
            return {
                ok: false,
                mensagem: 'Não foi possível ler o nó da árvore. Use um dicionário com dado/valor, esquerda e direita, ou uma classe com essas propriedades.',
            };
        }

        totalNos += 1;
        if (totalNos > LIMITE_MAXIMO_NOS_ARVORE_BINARIA) {
            return {
                ok: false,
                mensagem: `A árvore ultrapassa o número máximo de nós permitido (${LIMITE_MAXIMO_NOS_ARVORE_BINARIA}).`,
            };
        }

        visitados.add(identidadeNo);

        const esquerda = caminhar(campos.esquerda, profundidade + 1);
        if (!esquerda.ok) {
            return esquerda;
        }

        const direita = caminhar(campos.direita, profundidade + 1);
        if (!direita.ok) {
            return direita;
        }

        return {
            ok: true,
            arvore: {
                id: proximoId++,
                valor: campos.valor,
                esquerda: esquerda.arvore,
                direita: direita.arvore,
            },
        };
    };

    return caminhar(raiz, 1);
}

export function serializarOrdemPorNivel(arvore: NoArvoreBinariaVisual | null): unknown[] {
    if (!arvore) {
        return [];
    }

    const resultado: unknown[] = [];
    const fila: NoArvoreBinariaVisual[] = [arvore];

    while (fila.length > 0) {
        const atual = fila.shift() as NoArvoreBinariaVisual;
        resultado.push(atual.valor);
        if (atual.esquerda) {
            fila.push(atual.esquerda);
        }
        if (atual.direita) {
            fila.push(atual.direita);
        }
    }

    return resultado;
}

/**
 * Layout determinístico por percurso em ordem (esquerda → nó → direita):
 * a coordenada X é o índice de visita e a Y é a profundidade.
 */
export function calcularLayoutArvoreBinaria(arvore: NoArvoreBinariaVisual): LayoutArvoreBinaria {
    const posicoesRelativas = new Map<number, { valor: unknown; coluna: number; nivel: number }>();
    let proximaColuna = 0;

    const percorrerEmOrdem = (no: NoArvoreBinariaVisual | null, nivel: number): void => {
        if (!no) {
            return;
        }
        percorrerEmOrdem(no.esquerda, nivel + 1);
        posicoesRelativas.set(no.id, {
            valor: no.valor,
            coluna: proximaColuna,
            nivel,
        });
        proximaColuna += 1;
        percorrerEmOrdem(no.direita, nivel + 1);
    };

    percorrerEmOrdem(arvore, 0);

    const nos: PosicaoNoArvoreBinaria[] = [];
    let maxNivel = 0;

    for (const [id, posicao] of posicoesRelativas.entries()) {
        nos.push({
            id,
            valor: posicao.valor,
            x: MARGEM + posicao.coluna * ESPACAMENTO_HORIZONTAL,
            y: MARGEM + posicao.nivel * ESPACAMENTO_VERTICAL,
        });
        if (posicao.nivel > maxNivel) {
            maxNivel = posicao.nivel;
        }
    }

    const porId = new Map(nos.map((no) => [no.id, no]));
    const arestas: ArestaArvoreBinaria[] = [];

    const coletarArestas = (no: NoArvoreBinariaVisual | null): void => {
        if (!no) {
            return;
        }
        const origem = porId.get(no.id);
        if (!origem) {
            return;
        }

        if (no.esquerda) {
            const destino = porId.get(no.esquerda.id);
            if (destino) {
                arestas.push({
                    deId: no.id,
                    paraId: no.esquerda.id,
                    x1: origem.x,
                    y1: origem.y,
                    x2: destino.x,
                    y2: destino.y,
                });
            }
            coletarArestas(no.esquerda);
        }

        if (no.direita) {
            const destino = porId.get(no.direita.id);
            if (destino) {
                arestas.push({
                    deId: no.id,
                    paraId: no.direita.id,
                    x1: origem.x,
                    y1: origem.y,
                    x2: destino.x,
                    y2: destino.y,
                });
            }
            coletarArestas(no.direita);
        }
    };

    coletarArestas(arvore);

    const largura = Math.max(
        MARGEM * 2 + RAIO_NO * 2,
        MARGEM * 2 + Math.max(proximaColuna - 1, 0) * ESPACAMENTO_HORIZONTAL
    );
    const altura = MARGEM * 2 + maxNivel * ESPACAMENTO_VERTICAL;

    return {
        nos,
        arestas,
        largura,
        altura,
        ordemPorNivel: serializarOrdemPorNivel(arvore),
    };
}

function formatarValorNo(valor: unknown): string {
    if (valor === null || valor === undefined) {
        return 'nulo';
    }
    if (typeof valor === 'string') {
        return valor;
    }
    if (typeof valor === 'number' || typeof valor === 'boolean') {
        return String(valor);
    }
    try {
        return JSON.stringify(valor);
    } catch {
        return String(valor);
    }
}

export function formatarOrdemPorNivel(valores: unknown[]): string {
    const textos = valores.map((valor) => formatarValorNo(valor));
    return `[${textos.join(', ')}]`;
}

/**
 * Renderiza o estado da visualização em um container DOM usando SVG nativo.
 */
export function renderizarVisualizacaoArvoreBinaria(
    container: HTMLElement,
    estado: EstadoVisualizacaoArvoreBinaria
): void {
    container.innerHTML = '';

    if (!estado.solicitada) {
        container.hidden = true;
        return;
    }

    container.hidden = false;

    const titulo = document.createElement('h2');
    titulo.textContent = 'Árvore binária';
    container.appendChild(titulo);

    if (estado.tipo === 'erro') {
        const erro = document.createElement('p');
        erro.className = 'visualizacao-arvore-mensagem visualizacao-arvore-erro';
        erro.textContent = estado.mensagem;
        container.appendChild(erro);
        return;
    }

    if (estado.tipo === 'vazia') {
        const vazio = document.createElement('p');
        vazio.className = 'visualizacao-arvore-mensagem';
        vazio.textContent = 'Árvore vazia.';
        container.appendChild(vazio);
        return;
    }

    const layout = calcularLayoutArvoreBinaria(estado.arvore);

    const ordem = document.createElement('p');
    ordem.className = 'visualizacao-arvore-ordem';
    ordem.textContent = formatarOrdemPorNivel(layout.ordemPorNivel);
    container.appendChild(ordem);

    const envoltorio = document.createElement('div');
    envoltorio.className = 'visualizacao-arvore-svg-container';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${layout.largura} ${layout.altura}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Diagrama da árvore binária');
    svg.classList.add('visualizacao-arvore-svg');

    for (const aresta of layout.arestas) {
        const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linha.setAttribute('x1', String(aresta.x1));
        linha.setAttribute('y1', String(aresta.y1));
        linha.setAttribute('x2', String(aresta.x2));
        linha.setAttribute('y2', String(aresta.y2));
        linha.classList.add('visualizacao-arvore-aresta');
        svg.appendChild(linha);
    }

    for (const no of layout.nos) {
        const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        grupo.classList.add('visualizacao-arvore-no');

        const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circulo.setAttribute('cx', String(no.x));
        circulo.setAttribute('cy', String(no.y));
        circulo.setAttribute('r', String(RAIO_NO));
        circulo.classList.add('visualizacao-arvore-circulo');
        grupo.appendChild(circulo);

        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', String(no.x));
        texto.setAttribute('y', String(no.y));
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('dominant-baseline', 'central');
        texto.classList.add('visualizacao-arvore-rotulo');
        texto.textContent = formatarValorNo(no.valor);
        grupo.appendChild(texto);

        svg.appendChild(grupo);
    }

    envoltorio.appendChild(svg);
    container.appendChild(envoltorio);
}
