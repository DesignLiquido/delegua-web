import { IPrimitiva } from "./primitivas/primitiva-interface";
import type { CorrecaoImplementacaoInterface, MembroInterfaceFaltando } from '@designliquido/delegua/avaliador-sintatico/erro-avaliador-sintatico';
import type { DocumentarioAnalisado } from '@designliquido/delegua/interfaces/documentario/documentario-analisado';

interface MetodoArgumento {
    nome: string;
    opcional?: boolean;
}

interface MetodoDocumentacao {
    argumentos?: MetodoArgumento[];
    documentacao?: string;
    tipoRetorno?: string;
}

interface SugestaoMetodo {
    label: string;
    kind: number;
    insertText: string;
    insertTextRules: number;
    documentation: string;
    detail: string;
}

const resultadoEditorDiv: HTMLElement = document.getElementById("resultadoEditor") as HTMLElement;
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoCompartilhar = document.getElementById("botaoCompartilhar");
const botaoExecutar = document.getElementById("botaoExecutar");
const statusFormatacao = document.getElementById("statusFormatacao") as HTMLElement | null;

const Delegua = (window as any).Delegua;
const Monaco = (window as any).monaco;
const FormatadorDelegua = Delegua.FormatadorDelegua;
const EstilizadorDelegua = Delegua.EstilizadorDelegua;
const QuebradorDeLinha = Delegua.QuebradorDeLinha;
const RegraFortalecerTipos = Delegua.RegraFortalecerTipos;
const RegraConvencaoNomenclatura = Delegua.RegraConvencaoNomenclatura;
const RegraParadigmaConsistente = Delegua.RegraParadigmaConsistente;

interface ConfiguracoesDeleguaWeb {
    temaEditor: string;
    linguagemTraducao: 'javascript' | 'python';
    tempoAnaliseAutomaticaMs: number;
    tamanhoIndentacaoFormatacao: number;
    maximoCaracteresPorLinhaFormatacao: number;
    delimitadorTextoFormatacao: 'aspas-simples' | 'aspas-duplas' | 'preservar';
    habilitarEstilizador: boolean;
    regraFortalecerTipos: boolean;
    regraConvencaoNomenclatura: boolean;
    regraParadigmaConsistente: boolean;
    convencaoVariavel: 'caixaCamelo' | 'caixa_cobra' | 'CaixaPascal';
    convencaoConstante: 'CAIXA_ALTA' | 'caixaCamelo';
    convencaoFuncao: 'caixaCamelo' | 'caixa_cobra' | 'CaixaPascal';
    paradigmaConsistente: 'imperativo' | 'infinitivo' | 'ambos';
}

const CHAVE_CONFIGURACOES_LOCAL_STORAGE = 'delegua-web:configuracoes';
const CONFIGURACOES_PADRAO: ConfiguracoesDeleguaWeb = {
    temaEditor: 'vs-dark',
    linguagemTraducao: 'javascript',
    tempoAnaliseAutomaticaMs: 500,
    tamanhoIndentacaoFormatacao: 4,
    maximoCaracteresPorLinhaFormatacao: 100,
    delimitadorTextoFormatacao: 'preservar',
    habilitarEstilizador: true,
    regraFortalecerTipos: false,
    regraConvencaoNomenclatura: false,
    regraParadigmaConsistente: false,
    convencaoVariavel: 'caixaCamelo',
    convencaoConstante: 'CAIXA_ALTA',
    convencaoFuncao: 'caixaCamelo',
    paradigmaConsistente: 'ambos',
};

function obterConfiguracoesDeleguaWeb(): ConfiguracoesDeleguaWeb {
    try {
        const configuracoesBrutas = localStorage.getItem(CHAVE_CONFIGURACOES_LOCAL_STORAGE);
        if (!configuracoesBrutas) {
            return { ...CONFIGURACOES_PADRAO };
        }

        const configuracoes = JSON.parse(configuracoesBrutas);
        const temaEditor = String(configuracoes?.temaEditor || CONFIGURACOES_PADRAO.temaEditor);
        const linguagemTraducao = String(configuracoes?.linguagemTraducao || CONFIGURACOES_PADRAO.linguagemTraducao).toLowerCase();
        const tempoAnaliseAutomaticaMs = Number(configuracoes?.tempoAnaliseAutomaticaMs);
        const tamanhoIndentacaoFormatacao = Number(configuracoes?.tamanhoIndentacaoFormatacao);
        const maximoCaracteresPorLinhaFormatacao = Number(configuracoes?.maximoCaracteresPorLinhaFormatacao);
        const delimitadorTextoFormatacao = String(configuracoes?.delimitadorTextoFormatacao || CONFIGURACOES_PADRAO.delimitadorTextoFormatacao);
        const convencaoVariavel = String(configuracoes?.convencaoVariavel || CONFIGURACOES_PADRAO.convencaoVariavel);
        const convencaoConstante = String(configuracoes?.convencaoConstante || CONFIGURACOES_PADRAO.convencaoConstante);
        const convencaoFuncao = String(configuracoes?.convencaoFuncao || CONFIGURACOES_PADRAO.convencaoFuncao);
        const paradigmaConsistente = String(configuracoes?.paradigmaConsistente || CONFIGURACOES_PADRAO.paradigmaConsistente);

        return {
            temaEditor: ['vs', 'vs-dark', 'hc-black', 'hc-light'].includes(temaEditor)
                ? temaEditor
                : CONFIGURACOES_PADRAO.temaEditor,
            linguagemTraducao: linguagemTraducao === 'python' ? 'python' : 'javascript',
            tempoAnaliseAutomaticaMs: Number.isFinite(tempoAnaliseAutomaticaMs) && tempoAnaliseAutomaticaMs >= 150
                ? tempoAnaliseAutomaticaMs
                : CONFIGURACOES_PADRAO.tempoAnaliseAutomaticaMs,
            tamanhoIndentacaoFormatacao: Number.isFinite(tamanhoIndentacaoFormatacao) && tamanhoIndentacaoFormatacao >= 2 && tamanhoIndentacaoFormatacao <= 8
                ? tamanhoIndentacaoFormatacao
                : CONFIGURACOES_PADRAO.tamanhoIndentacaoFormatacao,
            maximoCaracteresPorLinhaFormatacao: Number.isFinite(maximoCaracteresPorLinhaFormatacao) && maximoCaracteresPorLinhaFormatacao >= 40 && maximoCaracteresPorLinhaFormatacao <= 240
                ? maximoCaracteresPorLinhaFormatacao
                : CONFIGURACOES_PADRAO.maximoCaracteresPorLinhaFormatacao,
            delimitadorTextoFormatacao: delimitadorTextoFormatacao === 'aspas-simples' || delimitadorTextoFormatacao === 'aspas-duplas' || delimitadorTextoFormatacao === 'preservar'
                ? delimitadorTextoFormatacao
                : CONFIGURACOES_PADRAO.delimitadorTextoFormatacao,
            habilitarEstilizador: typeof configuracoes?.habilitarEstilizador === 'boolean'
                ? configuracoes.habilitarEstilizador
                : CONFIGURACOES_PADRAO.habilitarEstilizador,
            regraFortalecerTipos: typeof configuracoes?.regraFortalecerTipos === 'boolean'
                ? configuracoes.regraFortalecerTipos
                : CONFIGURACOES_PADRAO.regraFortalecerTipos,
            regraConvencaoNomenclatura: typeof configuracoes?.regraConvencaoNomenclatura === 'boolean'
                ? configuracoes.regraConvencaoNomenclatura
                : CONFIGURACOES_PADRAO.regraConvencaoNomenclatura,
            regraParadigmaConsistente: typeof configuracoes?.regraParadigmaConsistente === 'boolean'
                ? configuracoes.regraParadigmaConsistente
                : CONFIGURACOES_PADRAO.regraParadigmaConsistente,
            convencaoVariavel: convencaoVariavel === 'caixaCamelo' || convencaoVariavel === 'caixa_cobra' || convencaoVariavel === 'CaixaPascal'
                ? convencaoVariavel
                : CONFIGURACOES_PADRAO.convencaoVariavel,
            convencaoConstante: convencaoConstante === 'CAIXA_ALTA' || convencaoConstante === 'caixaCamelo'
                ? convencaoConstante
                : CONFIGURACOES_PADRAO.convencaoConstante,
            convencaoFuncao: convencaoFuncao === 'caixaCamelo' || convencaoFuncao === 'caixa_cobra' || convencaoFuncao === 'CaixaPascal'
                ? convencaoFuncao
                : CONFIGURACOES_PADRAO.convencaoFuncao,
            paradigmaConsistente: paradigmaConsistente === 'imperativo' || paradigmaConsistente === 'infinitivo' || paradigmaConsistente === 'ambos'
                ? paradigmaConsistente
                : CONFIGURACOES_PADRAO.paradigmaConsistente,
        };
    } catch {
        return { ...CONFIGURACOES_PADRAO };
    }
}

enum MarkerSeverity {
    Hint = 1,
    Info = 2,
    Warning = 4,
    Error = 8
}

let errosComCorrecao: Map<number, CorrecaoImplementacaoInterface> = new Map();

type FixTipoParam = { nome: string; tipo: string };
type FixTipoFuncao = { fixes: FixTipoParam[]; linhaFuncao: number };
let fixesTiposDocstring: Map<number, FixTipoFuncao> = new Map();
let tempoAnaliseAutomaticaMs = CONFIGURACOES_PADRAO.tempoAnaliseAutomaticaMs;

function atualizarStatusFormatacao(configuracoes: ConfiguracoesDeleguaWeb): void {
    if (!statusFormatacao) {
        return;
    }

    const totalRegras = 3;
    const regrasAtivas = Number(configuracoes.regraFortalecerTipos)
        + Number(configuracoes.regraConvencaoNomenclatura)
        + Number(configuracoes.regraParadigmaConsistente);

    if (!configuracoes.habilitarEstilizador) {
        statusFormatacao.textContent = `Estilizador: desligado | Coluna: ${configuracoes.maximoCaracteresPorLinhaFormatacao}`;
        return;
    }

    statusFormatacao.textContent = `Estilizador: ligado | Regras: ${regrasAtivas}/${totalRegras} | Coluna: ${configuracoes.maximoCaracteresPorLinhaFormatacao}`;
}

const mostrarResultadoExecutar = function (resultadoExecucao: string) {
    const paragrafo: any = document.createElement("p");
    const conteudo = resultadoExecucao.replace(/\s/g, '&nbsp;');
    paragrafo.innerHTML = conteudo || '&nbsp;';
    paragrafo.classList = " resultadoEditor";
    resultadoEditorDiv?.appendChild(paragrafo);
    resultadoEditorDiv.scrollTop = resultadoEditorDiv.scrollHeight;
};

const deleguaWeb = new Delegua.DeleguaWeb("", mostrarResultadoExecutar);

const limparResultadoEditor = function () {
    resultadoEditorDiv.innerHTML = "";
};

limparResultadoEditor();

const mapearErros = function (erros: any[]) {
    const editor = Monaco?.editor.getEditors()[0];

    if (erros.length > 0) {
        console.log(erros);
    }

    errosComCorrecao.clear();
    for (const erro of erros) {
        if (erro.correcaoSugerida) {
            const linha = erro.simbolo?.linha || erro.linha;
            errosComCorrecao.set(linha, erro.correcaoSugerida);
        }
    }

    const _erros = erros.map(item => {
        return {
            startLineNumber: item.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item.message || item.mensagem || item.erroInterno,
            severity: MarkerSeverity.Error
        }
    })

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _erros);
}

const mapearAvisos = function (avisos: any[]) {
    const editor = Monaco?.editor.getEditors()[0];

    if (avisos.length > 0) {
        console.log(avisos);
    }

    const _avisos = avisos.map(item => {
        return {
            startLineNumber: item.simbolo?.linha || item.linha,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1000,
            message: item.message || item.mensagem || item.erroInterno,
            severity: MarkerSeverity.Warning
        }
    })

    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', _avisos);
}

const executarTradutor = async function () {
    const codigo = Monaco.editor.getModels()[0].getValue().split("\n")

    //ts-ignore
    const linguagem = (<HTMLInputElement>document.querySelector("#linguagem")).value.toLowerCase()

    const funcoes: { [key: string]: { tradutor: any; linguagem: string } } = {
        "python": { tradutor: deleguaWeb.tradutorPython, linguagem: "python" },
        "javascript": { tradutor: deleguaWeb.tradutorJavascript, linguagem: "javascript" },
        // "assemblyscript": { tradutor: delegua.tradutorAssemblyScript, linguagem: "typescript" },
    }
    if (codigo[0]) {
        const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            await deleguaWeb.avaliadorSintatico.analisar(retornoLexador);

        const funcao = funcoes[linguagem];
        const retornoTradutor = funcao.tradutor.traduzir(retornoAvaliadorSintatico.declaracoes);

        if (retornoTradutor) {
            Monaco.editor.create(document.getElementById("resultadoEditor"), {
                value: retornoTradutor,
                language: funcao.linguagem
            });
        }
    }
}

const executarCodigo = async function () {
    try {
        const editor = Monaco?.editor.getEditors()[0];
        const modelo = Monaco.editor.getModels()[0];
        const codigo = modelo.getValue().split("\n");
        Monaco.editor.setModelMarkers(editor.getModel(), 'delegua', []);

        const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
        const retornoAvaliadorSintatico =
            await deleguaWeb.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            return mapearErros(retornoAvaliadorSintatico.erros);
        }

        const analisadorSemantico = await deleguaWeb.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
        const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

        if (errosAnaliseSemantica?.length) {
            mapearAvisos(errosAnaliseSemantica);
        }

        const respostaInterpretador = await deleguaWeb.executar({ retornoLexador, retornoAvaliadorSintatico });
        const errosInterpretacao = respostaInterpretador.erros;
        if (errosInterpretacao) {
            errosInterpretacao.forEach((erro: any) => {
                if (erro.linha > 0) {
                    const mensagemErro = `Erro na linha ${erro.linha}: ${erro.erroInterno.message}`;
                    mostrarResultadoExecutar(mensagemErro);
                }
            });
        }
    } catch (erro) {
        const erroFormatado = "Erro: " + erro
        mostrarResultadoExecutar(erroFormatado)
    }
};

const formatarCodigoDelegua = async function (codigo: string, configuracoes: ConfiguracoesDeleguaWeb): Promise<string | null> {
    try {
        const retornoLexador = deleguaWeb.lexador.mapear(codigo.split("\n"), -1);
        if (retornoLexador.erros.length > 0) {
            return null;
        }

        const retornoAvaliadorSintatico = await deleguaWeb.avaliadorSintatico.analisar(retornoLexador);
        if (retornoAvaliadorSintatico.erros.length > 0) {
            return null;
        }

        const regrasEstilizador: any[] = [];
        if (configuracoes.habilitarEstilizador) {
            if (configuracoes.regraFortalecerTipos && RegraFortalecerTipos) {
                regrasEstilizador.push(new RegraFortalecerTipos());
            }

            if (configuracoes.regraConvencaoNomenclatura && RegraConvencaoNomenclatura) {
                regrasEstilizador.push(new RegraConvencaoNomenclatura({
                    variavel: configuracoes.convencaoVariavel,
                    constante: configuracoes.convencaoConstante,
                    funcao: configuracoes.convencaoFuncao,
                }));
            }

            if (configuracoes.regraParadigmaConsistente && RegraParadigmaConsistente) {
                regrasEstilizador.push(new RegraParadigmaConsistente({
                    paradigma: configuracoes.paradigmaConsistente,
                }));
            }
        }

        const declaracoesEstilizadas = configuracoes.habilitarEstilizador
            ? new EstilizadorDelegua(regrasEstilizador).estilizar(retornoAvaliadorSintatico.declaracoes)
            : retornoAvaliadorSintatico.declaracoes;

        const formatador = new FormatadorDelegua("\n", configuracoes.tamanhoIndentacaoFormatacao, {
            delimitadorTexto: configuracoes.delimitadorTextoFormatacao,
        });

        let codigoFormatado = formatador.formatar(declaracoesEstilizadas);

        const quebradorDeLinha = new QuebradorDeLinha(
            configuracoes.maximoCaracteresPorLinhaFormatacao,
            configuracoes.tamanhoIndentacaoFormatacao,
            "\n"
        );
        codigoFormatado = quebradorDeLinha.quebrar(codigoFormatado);

        return codigoFormatado.trimEnd();
    } catch {
        return null;
    }
};

const mostrarToastNotificacao = function(mensagem: string, sucesso: boolean = true) {
    const toastExistente = document.querySelector('.toast-notificacao');
    if (toastExistente) {
        toastExistente.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notificacao';
    if (!sucesso) {
        toast.style.backgroundColor = '#f44336';
    }

    toast.innerHTML = `
        ${mensagem}
        <span class="fechar-toast" onclick="this.parentElement.remove()">×</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('mostrar');
    }, 10);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('mostrar');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
};

const compartilharCodigo = function () {
    try {
        const modelo = Monaco.editor.getModels()[0];
        const codigo = modelo.getValue();

        const codigoBase64 = btoa(codigo);

        const baseUrl = window.location.origin + window.location.pathname;
        const linkCompartilhamento = `${baseUrl}?codigo=${codigoBase64}`;

        navigator.clipboard.writeText(linkCompartilhamento).then(() => {
            mostrarToastNotificacao("✓ Link copiado para área de transferência!", true);
        }).catch(() => {
            mostrarToastNotificacao("Link: " + linkCompartilhamento, true);
        });

    } catch (erro) {
        mostrarToastNotificacao(`Erro ao gerar link de compartilhamento: ${erro}`, false);
    }
};

const analisarCodigo = async function () {
    const codigoTexto = Monaco.editor.getModels()[0].getValue();
    const codigo = codigoTexto.split("\n");
    const editor = Monaco?.editor.getEditors()[0];

    const retornoLexador = deleguaWeb.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = await deleguaWeb.avaliadorSintatico.analisar(retornoLexador);
    if (retornoAvaliadorSintatico.erros.length > 0) {
        Monaco.editor.setModelMarkers(editor.getModel(), 'delegua-tipos', []);
        fixesTiposDocstring.clear();
        return mapearErros(retornoAvaliadorSintatico.erros);
    }

    const analisadorSemantico = await deleguaWeb.analisadorSemantico.analisar(retornoAvaliadorSintatico.declaracoes);
    const errosAnaliseSemantica = analisadorSemantico.diagnosticos;

    mapearAvisos(errosAnaliseSemantica);

    const { markers: markersTipos, fixes } = detectarTiposNaoAnotados(codigoTexto);
    fixesTiposDocstring = fixes;
    Monaco.editor.setModelMarkers(editor.getModel(), 'delegua-tipos', markersTipos);
};

function stripDocstring(raw: string): string {
    return raw
        .replace(/^\/\*\*\s*/, '')
        .replace(/\s*\*\/\s*$/, '')
        .split('\n')
        .map(l => l.replace(/^\s*\*\s?/, ''))
        .join('\n')
        .trim();
}

function analisarDocumentario(conteudo: string): DocumentarioAnalisado {
    const REGEX_PARAMETRO = /^@(?:par[aâ]metro|param)\s+(?:\{([^}]+)\}\s+)?(\S+)\s*(.*)$/;
    const REGEX_RETORNA = /^@(?:retorna)\s*(?:\{([^}]+)\}\s*)?(.*)$/;
    const REGEX_EXEMPLO = /^@(?:exemplo)\s*(.*)$/;
    const REGEX_DEPRECIADO = /^@depreciado\s*(.*)$/;
    const REGEX_VEJA = /^@veja\s+(\S+).*$/;
    const REGEX_TAG = /^@\w+/;

    const resultado: DocumentarioAnalisado = { descricao: '', parametros: [], veja: [] };
    const linhas = conteudo.split('\n');

    const segmentos: { tag: string; linhas: string[] }[] = [];
    let atual: { tag: string; linhas: string[] } = { tag: '', linhas: [] };
    for (const linha of linhas) {
        if (REGEX_TAG.test(linha)) {
            segmentos.push(atual);
            const tag = linha.match(/^@(\w+)/)?.[1] ?? '';
            atual = { tag, linhas: [linha] };
        } else {
            atual.linhas.push(linha);
        }
    }
    segmentos.push(atual);

    for (const seg of segmentos) {
        if (seg.tag === '') {
            resultado.descricao = seg.linhas.join('\n').trim();
            continue;
        }
        const primeiraLinha = seg.linhas[0] ?? '';
        let mr: RegExpMatchArray | null;
        mr = primeiraLinha.match(REGEX_PARAMETRO);
        if (mr) { resultado.parametros.push({ tipo: mr[1] || undefined, nome: mr[2], descricao: mr[3].trim() }); continue; }
        mr = primeiraLinha.match(REGEX_RETORNA);
        if (mr) { resultado.retorna = { tipo: mr[1] || undefined, descricao: mr[2].trim() }; continue; }
        mr = primeiraLinha.match(REGEX_EXEMPLO);
        if (mr) {
            const restoLinha = mr[1].trim();
            const linhasExtras = seg.linhas.slice(1).join('\n').trim();
            resultado.exemplo = restoLinha
                ? restoLinha + (linhasExtras ? '\n' + linhasExtras : '')
                : linhasExtras;
            continue;
        }
        mr = primeiraLinha.match(REGEX_DEPRECIADO);
        if (mr) { resultado.depreciado = mr[1].trim(); continue; }
        mr = primeiraLinha.match(REGEX_VEJA);
        if (mr) { resultado.veja.push(mr[1]); continue; }
    }

    return resultado;
}

function extrairFuncoesDocumentadas(codigo: string): Map<string, DocumentarioAnalisado> {
    const mapa = new Map<string, DocumentarioAnalisado>();
    const REGEX_FUNCAO_DOC = /\/\*\*([\s\S]*?)\*\/\s*(?:funcao|função)\s+([a-zA-ZÀ-úÇçãâáêéíóôõú_]\w*)\s*\(([^)]*)\)/g;
    let m: RegExpExecArray | null;
    while ((m = REGEX_FUNCAO_DOC.exec(codigo)) !== null) {
        const corpo = stripDocstring('/**' + m[1] + '*/');
        const doc = analisarDocumentario(corpo);

        // Se não há @parametro no docstring, extrair parâmetros da assinatura da função
        if (doc.parametros.length === 0 && m[3].trim()) {
            doc.parametros = m[3].split(',')
                .map(p => {
                    const partes = p.trim().split(':').map(s => s.trim());
                    return { nome: partes[0], tipo: partes[1] || undefined, descricao: '' };
                })
                .filter(p => p.nome);
        }

        mapa.set(m[2], doc);
    }
    return mapa;
}

function extrairClassesDocumentadas(codigo: string): Map<string, DocumentarioAnalisado> {
    const mapa = new Map<string, DocumentarioAnalisado>();
    const REGEX_CLASSE_DOC = /\/\*\*([\s\S]*?)\*\/\s*classe\s+(?:abstrat[ao]\s+)?([a-zA-ZÀ-úÇçãâáêéíóôõú_]\w*)/g;
    let m: RegExpExecArray | null;
    while ((m = REGEX_CLASSE_DOC.exec(codigo)) !== null) {
        const corpo = stripDocstring('/**' + m[1] + '*/');
        mapa.set(m[2], analisarDocumentario(corpo));
    }
    return mapa;
}

function detectarTiposNaoAnotados(codigo: string): { markers: any[]; fixes: Map<number, FixTipoFuncao> } {
    const markers: any[] = [];
    const fixes: Map<number, FixTipoFuncao> = new Map();
    const REGEX_FUNCAO_DOC = /\/\*\*([\s\S]*?)\*\/\s*(?:funcao|função)\s+([a-zA-ZÀ-úÇçãâáêéíóôõú_]\w*)\s*\(([^)]*)\)/g;
    let m: RegExpExecArray | null;
    while ((m = REGEX_FUNCAO_DOC.exec(codigo)) !== null) {
        const corpo = stripDocstring('/**' + m[1] + '*/');
        const doc = analisarDocumentario(corpo);
        const paramsAssinatura = m[3].split(',').map(p => {
            const partes = p.trim().split(':').map(s => s.trim());
            return { nome: partes[0], temTipo: partes.length > 1 && !!partes[1] };
        }).filter(p => p.nome);

        const fixesParaFuncao: FixTipoParam[] = [];
        for (const paramDoc of doc.parametros) {
            if (!paramDoc.tipo) continue;
            const paramSig = paramsAssinatura.find(p => p.nome === paramDoc.nome);
            if (paramSig && !paramSig.temTipo) {
                fixesParaFuncao.push({ nome: paramDoc.nome, tipo: paramDoc.tipo });
            }
        }
        if (fixesParaFuncao.length === 0) continue;

        const posicaoFuncao = m.index + m[0].search(/(?:funcao|função)/);
        const linhaFuncao = codigo.substring(0, posicaoFuncao).split('\n').length;
        const linhaTxt = codigo.split('\n')[linhaFuncao - 1];

        // Emit one Info marker per untyped param, positioned exactly on the param name
        for (const fix of fixesParaFuncao) {
            const iParam = linhaTxt.indexOf(fix.nome);
            if (iParam === -1) continue;
            markers.push({
                severity: MarkerSeverity.Info,
                message: `Adicionar tipo '${fix.tipo}' ao parâmetro '${fix.nome}' (docstring)`,
                startLineNumber: linhaFuncao,
                startColumn: iParam + 1,
                endLineNumber: linhaFuncao,
                endColumn: iParam + fix.nome.length + 1,
                source: 'delegua-tipos'
            });
        }
        fixes.set(linhaFuncao, { fixes: fixesParaFuncao, linhaFuncao });
    }
    return { markers, fixes };
}

function formatarDocumentario(nome: string, doc: DocumentarioAnalisado): { value: string }[] {
    const contents: { value: string }[] = [];

    let titulo = `**${nome}**`;
    if (doc.parametros.length > 0) {
        const params = doc.parametros.map(p => p.tipo ? `${p.nome}: ${p.tipo}` : p.nome).join(', ');
        titulo += `(${params})`;
    }
    if (doc.retorna?.tipo) {
        titulo += ` → ${doc.retorna.tipo}`;
    }
    contents.push({ value: titulo });

    if (doc.depreciado) {
        contents.push({ value: `⚠️ **Depreciado:** ${doc.depreciado}` });
    }

    if (doc.descricao) {
        contents.push({ value: doc.descricao });
    }

    if (doc.parametros.length > 0) {
        const linhas = doc.parametros.map(p => {
            const tipo = ` _(${p.tipo || 'qualquer'})_`;
            const descTexto = p.descricao ? p.descricao.replace(/^[—–-]\s*/, '') : '';
            const desc = descTexto ? ` — ${descTexto}` : '';
            return `- \`${p.nome}\`${tipo}${desc}`;
        });
        contents.push({ value: `**Parâmetros:**\n${linhas.join('\n')}` });
    }

    if (doc.retorna) {
        const tipo = doc.retorna.tipo ? ` _(${doc.retorna.tipo})_` : '';
        contents.push({ value: `**Retorna:**${tipo} ${doc.retorna.descricao}` });
    }

    if (doc.exemplo) {
        contents.push({ value: `**Exemplo:**` });
        contents.push({ value: `\`\`\`delegua\n${doc.exemplo}\n\`\`\`` });
    }

    if (doc.veja.length > 0) {
        contents.push({ value: `**Veja também:** ${doc.veja.join(', ')}` });
    }

    return contents;
}

function definirLinguagemDelegua() {
  return {
    defaultToken: 'invalid',
    tokenPostfix: '.delegua',

    keywords: [
      'abstrata',
      'abstrato',
      'cada',
      'caso',
      'classe',
      'const',
      'constante',
      'construtor',
      'continua',
      'continuar',
      'de',
      'em',
      'enquanto',
      'escolha',
      'escolher',
      'estatico',
      'estático',
      'faca',
      'faça',
      'falhar',
      'falso',
      'fazer',
      'finalmente',
      'fixo',
      'funcao',
      'função',
      'herda',
      'implementa',
      'importar',
      'inteiro[]',
      'interface',
      'isto',
      'leia',
      'ler',
      'mescla',
      'nao',
      'não',
      'nulo',
      'numero',
      'número',
      'padrão',
      'padrao',
      'para',
      'para',
      'pegar',
      'pegue',
      'privado',
      'protegido',
      'publico',
      'público',
      'qualquer',
      'qualquer[]',
      'quebrar',
      'quebre',
      'real[]',
      'retorna',
      'retornar',
      'retorne',
      'se',
      'senão',
      'senao',
      'super',
      'sustar',
      'tente',
      'tentar',
      'texto[]',
      'tipo',
      'var',
      'variavel',
      'variável',
      'verdadeiro',
      'vazio',
      'vetor',

      /* funções nativas de delégua (texto) */
      'dividir',
      'fatiar',
      'inclui',
      'maiusculo',
      'maiúsculo',
      'minusculo',
      'minúsculo',
      'texto',
      'substituir',
      'subtexto',

      /* funções nativas de delégua (vetor) */
      'adicionar',
      'concatenar',
      'empilhar',
      'fatiar',
      'inclui',
      'intervalo',
      'inverter',
      'juntar',
      'mapear',
      'ordenar',
      'remover',
      'removerPrimeiro',
      'removerUltimo',
      'somar',

      /* funções nativas de delégua (sem tipo específico) */
      'aleatorio',
      'aleatorioEntre',
      'algum',
      'encontrarIndice',
      'encontrarUltimoIndice',
      'encontrarUltimo',
      'encontrar',
      'escreva',
      'filtrarPor',
      'inclui',
      'incluido',
      'incluído',
      'inteiro',
      'paraCada',
      'primeiroEmCondicao',
      'real',
      'reduzir',
      'tamanho',
      'todos',
      'todosEmCondicao',
    ],

    operators: [
      'e',
      'em',
      'ou',
      '<=',
      '>=',
      '==',
      '!=',
      '=>',
      '+',
      '-',
      '**',
      '*',
      '/',
      '\\',
      '%',
      '++',
      '--',
      '<<',
      '>>',
      '^',
      '!',
      '~',
      '=',
      '+=',
      '-=',
      '*=',
      '**=',
      '/=',
      '%=',
    ],

    // Expressões regulares para determinados componentes da linguagem
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
    regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

    // The main tokenizer for our languages
    tokenizer: {
      root: [[/[{}]/, 'delimiter.bracket'], { include: 'common' }],

      common: [
        // identifiers and keywords
        [
          /[a-z_âáêéíóôõú$][çãâáêéíóôõú\w$]*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }
        ],
        [/[A-ZÂÁÊÉÍÓÔÕÚ][\w\$]*/, 'type.identifier'], // Mostra nomes de classes (normalmente em maiúsculo) com uma cor bonita
        // [/[A-Z][\w\$]*/, 'identifier'], // Talvez voltar com isso um dia

        // whitespace
        { include: '@whitespace' },

        // regular expression: ensure it is terminated before beginning (otherwise it is an operator)
        [
          /\/(?=([^\\\/]|\\.)+\/([dgimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
          { token: 'regexp', bracket: '@open', next: '@regexp' }
        ],

        // delimitadores e operadores
        [/[()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/!(?=([^=]|$))/, 'delimiter'],
        [
          /@symbols/,
          {
            cases: {
              '@operators': 'delimiter',
              '@default': ''
            }
          }
        ],

        // números
        [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
        [/0[xX](@hexdigits)n?/, 'number.hex'],
        [/0[oO]?(@octaldigits)n?/, 'number.octal'],
        [/0[bB](@binarydigits)n?/, 'number.binary'],
        [/(@digits)n?/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // textos
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // texto não finalizado
        [/'([^'\\]|\\.)*$/, 'string.invalid'], // idem
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        [/`/, 'string', '@string_backtick']
      ],

      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment']
      ],

      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],

      jsdoc: [
        [/@[a-zA-ZÀ-ú]\w*/, 'delegua.doc.tag'],
        [/[^\/*]+/, 'comment.doc'],
        [/\*\//, 'comment.doc', '@pop'],
        [/[\/*]/, 'comment.doc']
      ],

      // TODO: Ajustar esta parte para expressões regulares de Delégua
      regexp: [
        [
          /(\{)(\d+(?:,\d*)?)(\})/,
          ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']
        ],
        [
          /(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
          ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]
        ],
        [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
        [/[()]/, 'regexp.escape.control'],
        [/@regexpctl/, 'regexp.escape.control'],
        [/[^\\\/]/, 'regexp'],
        [/@regexpesc/, 'regexp.escape'],
        [/\\\./, 'regexp.invalid'],
        [/(\/)([dgimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']]
      ],

      regexrange: [
        [/-/, 'regexp.escape.control'],
        [/\^/, 'regexp.invalid'],
        [/@regexpesc/, 'regexp.escape'],
        [/[^\]]/, 'regexp'],
        [
          /\]/,
          {
            token: 'regexp.escape.control',
            next: '@pop',
            bracket: '@close'
          }
        ]
      ],

      string_double: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
      ],

      string_single: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, 'string', '@pop']
      ],

      string_backtick: [
        [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
        [/[^\\`$]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/`/, 'string', '@pop']
      ],

      bracketCounting: [
        [/\{/, 'delimiter.bracket', '@bracketCounting'],
        [/\}/, 'delimiter.bracket', '@pop'],
        { include: 'common' }
      ]
    }
  };
}

function gerarStubMembro(membro: MembroInterfaceFaltando): string {
    if (membro.tipo === 'metodo') {
        const params = (membro.parametros ?? [])
            .map(p => `${p.nome}${p.tipoDado ? ': ' + p.tipoDado : ''}`)
            .join(', ');
        const retorno = membro.tipoRetorno ?? 'vazio';
        return `    ${membro.nome}(${params}): ${retorno} {\n    }\n`;
    } else {
        const tipo = membro.tipoPropriedade ?? 'qualquer';
        return `    ${membro.nome}: ${tipo}\n`;
    }
}

function gerarAcaoImplementarInterface(
    model: any,
    correcao: CorrecaoImplementacaoInterface
): any {
    const linhaInsercao = correcao.linhaFinalClasse;
    const codigo = correcao.membrosFaltando
        .map(membro => gerarStubMembro(membro))
        .join('\n');

    return {
        title: `Implementar membros de '${correcao.nomeInterface}'`,
        kind: 'quickfix',
        edit: {
            edits: [{
                resource: model.uri,
                textEdit: {
                    range: new Monaco.Range(linhaInsercao, 1, linhaInsercao, 1),
                    text: codigo + '\n'
                },
                versionId: model.getVersionId()
            }]
        },
        isPreferred: true
    };
}

function gerarAcaoTiposDocstring(model: any, fix: FixTipoFuncao): any {
    const linhaTxt = model.getLineContent(fix.linhaFuncao);
    const iParenOpen = linhaTxt.indexOf('(');
    const iParenClose = linhaTxt.lastIndexOf(')');
    if (iParenOpen === -1 || iParenClose === -1) return null;

    const paramsStr = linhaTxt.substring(iParenOpen + 1, iParenClose);
    const novosParams = paramsStr.split(',').map((p: string) => {
        const nomeParam = p.trim().split(':')[0].trim();
        const fixParam = fix.fixes.find(f => f.nome === nomeParam);
        if (fixParam) {
            const leading = p.match(/^(\s*)/)?.[1] ?? '';
            return `${leading}${nomeParam}: ${fixParam.tipo}`;
        }
        return p;
    }).join(',');

    const titulo = fix.fixes.length === 1
        ? `Adicionar tipo '${fix.fixes[0].tipo}' ao parâmetro '${fix.fixes[0].nome}'`
        : `Adicionar tipos de parâmetros do docstring`;

    return {
        title: titulo,
        kind: 'quickfix',
        edit: {
            edits: [{
                resource: model.uri,
                textEdit: {
                    range: new Monaco.Range(fix.linhaFuncao, iParenOpen + 1, fix.linhaFuncao, iParenClose + 2),
                    text: `(${novosParams})`
                },
                versionId: model.getVersionId()
            }]
        },
        isPreferred: true
    };
}

let tempoEsperaMudancas: any = null;
const configurarAtualizacaoAutomatica = function () {
    let editor = Monaco?.editor.getEditors()[0];
    if (!editor) {
        Monaco?.editor?.create(document.getElementById('editor'), {
            value: '// Digite código em Delégua aqui, ou utilize o menu do topo superior esquerdo para selecionar exemplos de código em Delégua.',
            language: 'delegua',
            automaticLayout: true
        });
        editor = Monaco?.editor.getEditors()[0];
    }

    const model = editor.getModel();
    if (!model) {
        console.error("Modelo não encontrado. Verifique a inicialização do Monaco Editor.");
        return;
    }

    model.onDidChangeContent(() => {
        if (tempoEsperaMudancas !== null) {
            clearTimeout(tempoEsperaMudancas);
        }

        tempoEsperaMudancas = setTimeout(function () {
            tempoEsperaMudancas = null;
            analisarCodigo();
        }, tempoAnaliseAutomaticaMs);
    });
};

// Informações sobre os módulos disponíveis
const informacoesModulos = {
    'criptografia': {
        descricao: 'Módulo para operações criptográficas, incluindo hashing, criptografia simétrica e assimétrica, codificação Base64 e geração de chaves.',
        repositorio: 'https://github.com/DesignLiquido/delegua-criptografia',
        metodosDestaque: ['md5', 'sha256', 'criptografarAes256', 'gerarParChavesRsa', 'codificarBase64']
    },
    'estatistica': {
        descricao: 'Módulo para cálculos estatísticos.',
        repositorio: 'https://github.com/DesignLiquido/delegua-estatistica',
        metodosDestaque: []
    },
    'fisica': {
        descricao: 'Módulo para cálculos e constantes físicas.',
        repositorio: 'https://github.com/DesignLiquido/delegua-fisica',
        metodosDestaque: []
    },
    'matematica': {
        descricao: 'Módulo para operações matemáticas avançadas.',
        repositorio: 'https://github.com/DesignLiquido/delegua-matematica',
        metodosDestaque: []
    },
    'tempo': {
        descricao: 'Módulo para manipulação de datas e tempo.',
        repositorio: 'https://github.com/DesignLiquido/delegua-tempo',
        metodosDestaque: []
    },
    'json': {
        descricao: 'Módulo para manipulação de dados JSON.',
        repositorio: null,
        metodosDestaque: []
    }
};

const configurarLinguagemDelegua = function () {
    const primitivas: IPrimitiva[] = (globalThis as any).primitivas;
    const documentacoesBibliotecas: {[biblioteca: string]: any} = deleguaWeb.documentacoesBibliotecas;
    
    Monaco.languages?.register({
        id: 'delegua',
        extensions: ['.delegua'],
        aliases: ['delegua', 'language-generation'],
        mimetypes: ['application/delegua'],
    });

    Monaco.languages.setMonarchTokensProvider('delegua', definirLinguagemDelegua());

    Monaco.editor.defineTheme('delegua-escuro', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ token: 'delegua.doc.tag', foreground: '569CD6' }],
        colors: {}
    });
    Monaco.editor.defineTheme('delegua-claro', {
        base: 'vs',
        inherit: true,
        rules: [{ token: 'delegua.doc.tag', foreground: '0070C1' }],
        colors: {}
    });
    Monaco.editor.setTheme('delegua-escuro');
    document.body.setAttribute('data-tema', 'escuro');

    // Interfaces para documentação de métodos
    interface ArgumentoMetodo {
        nome: string;
        opcional?: boolean;
        descricao?: string;
        tipo?: string;
    }
    
    interface ParametroSignatura {
        label: [number, number];
        documentation: string;
    }
    
    interface MetodoDocumentado {
        argumentos: ArgumentoMetodo[];
        tipoRetorno?: string;
        documentacao?: string;
    }
    
    interface ResultadoSignatureHelp {
        value: {
            signatures: Array<{
                label: string;
                documentation: string;
                parameters: ParametroSignatura[];
            }>;
            activeSignature: number;
            activeParameter: number;
        };
        dispose: () => void;
    }

    interface DocumentacaoBiblioteca {
        [nomeMetodo: string]: MetodoDocumentado;
    }

    interface ParametroDocumentado {
        nome: string;
        tipo?: string;
        descricao?: string;
    }

    interface RetornoDocumentado {
        tipo?: string;
    }

    interface FuncaoDocumentada {
        descricao?: string;
        parametros: ParametroDocumentado[];
        retorna?: RetornoDocumentado;
    }

    interface SinaturaProviderResult {
        value: {
            signatures: Array<{
                label: string;
                documentation: string;
                parameters: ParametroSignatura[];
            }>;
            activeSignature: number;
            activeParameter: number;
        };
        dispose: () => void;
    }

    Monaco.languages.registerSignatureHelpProvider('delegua', {
        signatureHelpTriggerCharacters: ['(', ','],
        signatureHelpRetriggerCharacters: [','],
        provideSignatureHelp: (model: any, position: any): SinaturaProviderResult => {
            const linha: string = model.getLineContent(position.lineNumber);
            const textoAntesCursor: string = linha.substring(0, position.column - 1);
            
            // Encontrar a chamada de função mais recente antes do cursor
            // Match pattern: biblioteca.metodo( ou apenas metodo(
            const matchFuncao: RegExpMatchArray | null = textoAntesCursor.match(/(\w+)\.(\w+)\([^)]*$/);
            
            if (matchFuncao) {
                const nomeBiblioteca: string = matchFuncao[1];
                const nomeMetodo: string = matchFuncao[2];
                const documentacaoBiblioteca: DocumentacaoBiblioteca | undefined = documentacoesBibliotecas[nomeBiblioteca];
                
                if (documentacaoBiblioteca) {
                    const metodo: MetodoDocumentado | undefined = documentacaoBiblioteca[nomeMetodo];
                    
                    if (metodo && metodo.argumentos) {
                        // Contar quantos argumentos já foram digitados (contando vírgulas)
                        const dentroParenteses: string | undefined = textoAntesCursor.split('(').pop();
                        const numeroVirgulas: number = (dentroParenteses?.match(/,/g) || []).length;
                        const parametroAtivo: number = numeroVirgulas;
                        
                        // Construir o label e calcular os ranges para cada parâmetro
                        const prefixo: string = `${nomeBiblioteca}.${nomeMetodo}(`;
                        let labelCompleto: string = prefixo;
                        const parametros: ParametroSignatura[] = [];
                        
                        metodo.argumentos.forEach((argumento: ArgumentoMetodo, indice: number): void => {
                            const inicioParam: number = labelCompleto.length;
                            const nomeParam: string = `${argumento.nome}${argumento.opcional ? '?' : ''}`;
                            labelCompleto += nomeParam;
                            const fimParam: number = labelCompleto.length;
                            
                            parametros.push({
                                label: [inicioParam, fimParam], // Range do parâmetro no label
                                documentation: argumento.descricao || `${argumento.nome}: ${argumento.tipo || 'qualquer'}`
                            });
                            
                            // Adicionar vírgula se não for o último parâmetro
                            if (indice < metodo.argumentos.length - 1) {
                                labelCompleto += ', ';
                            }
                        });
                        
                        const retornoTexto: string = metodo.tipoRetorno ? ` → ${metodo.tipoRetorno}` : '';
                        labelCompleto += `)${retornoTexto}`;
                        
                        // Extrair apenas a primeira descrição do markdown (após o título)
                        let descricaoSimples: string = '';
                        if (metodo.documentacao) {
                            const linhas: string[] = metodo.documentacao.split('\n');
                            // Pular o título (primeira linha) e linhas vazias, pegar a primeira linha de conteúdo
                            for (let i: number = 1; i < linhas.length; i++) {
                                const linha: string = linhas[i].trim();
                                if (linha && !linha.startsWith('#') && !linha.startsWith('```')) {
                                    descricaoSimples = linha;
                                    break;
                                }
                            }
                        }
                        
                        const resultado: SinaturaProviderResult = {
                            value: {
                                signatures: [{
                                    label: labelCompleto,
                                    documentation: descricaoSimples,
                                    parameters: parametros
                                }],
                                activeSignature: 0,
                                activeParameter: Math.min(parametroAtivo, parametros.length - 1)
                            },
                            dispose: (): void => {}
                        };
                        return resultado;
                    }
                }
            }
            
            // Verificar funções documentadas pelo usuário
            const matchFuncaoLocal: RegExpMatchArray | null = textoAntesCursor.match(/(?<!\.)([a-zA-ZÀ-úÇçãâáêéíóôõú_]\w*)\([^)]*$/);
            if (matchFuncaoLocal) {
                const nomeFuncao: string = matchFuncaoLocal[1];
                const funcoesDocumentadas: Map<string, FuncaoDocumentada> = extrairFuncoesDocumentadas(model.getValue());
                const doc: FuncaoDocumentada | undefined = funcoesDocumentadas.get(nomeFuncao);
                if (doc && doc.parametros.length > 0) {
                    const dentroParenteses: string | undefined = textoAntesCursor.split('(').pop();
                    const numeroVirgulas: number = (dentroParenteses?.match(/,/g) || []).length;

                    const prefixo: string = `${nomeFuncao}(`;
                    let labelCompleto: string = prefixo;
                    const parametros: ParametroSignatura[] = [];

                    doc.parametros.forEach((param: ParametroDocumentado, index: number): void => {
                        const inicioParam: number = labelCompleto.length;
                        const nomeParam: string = param.tipo ? `${param.nome}: ${param.tipo}` : param.nome;
                        labelCompleto += nomeParam;
                        const fimParam: number = labelCompleto.length;
                        parametros.push({
                            label: [inicioParam, fimParam],
                            documentation: param.descricao || param.nome
                        });
                        if (index < doc.parametros.length - 1) {
                            labelCompleto += ', ';
                        }
                    });

                    const sufixoRetorno: string = doc.retorna?.tipo ? ` → ${doc.retorna.tipo}` : '';
                    labelCompleto += `)${sufixoRetorno}`;

                    return {
                        value: {
                            signatures: [{
                                label: labelCompleto,
                                documentation: doc.descricao || '',
                                parameters: parametros
                            }],
                            activeSignature: 0,
                            activeParameter: Math.min(numeroVirgulas, parametros.length - 1)
                        },
                        dispose: (): void => {}
                    };
                }
            }

            return {
                value: { signatures: [], activeSignature: 0, activeParameter: 0 },
                dispose: (): void => {}
            };
        }
    });

    Monaco.languages.registerCompletionItemProvider('delegua', {
        triggerCharacters: ['.'],
        provideCompletionItems: (model: any, position: any) => {
            const linha: string = model.getLineContent(position.lineNumber);
            const textoAntesCursor: string = linha.substring(0, position.column - 1);

            // Verificar se estamos após um ponto (ex: criptografia.)
            const matchBiblioteca = textoAntesCursor.match(/(\w+)\.(\w*)$/);

            if (matchBiblioteca) {
                const nomeBiblioteca = matchBiblioteca[1];
                const documentacaoBiblioteca = documentacoesBibliotecas[nomeBiblioteca];

                if (documentacaoBiblioteca) {
                    const sugestoesMetodos: SugestaoMetodo[] = Object.keys(documentacaoBiblioteca).map((nomeMetodo: string): SugestaoMetodo => {
                        const metodo: MetodoDocumentacao = documentacaoBiblioteca[nomeMetodo];
                        const argumentos: MetodoArgumento[] = metodo.argumentos || [];
                        const argsTexto: string = argumentos
                            .map((arg: MetodoArgumento, index: number): string => {
                                const placeholder: string = `\${${index + 1}:${arg.nome}}`;
                                return arg.opcional ? placeholder : placeholder;
                            })
                            .join(', ');

                        return {
                            label: nomeMetodo,
                            kind: 1, // Method
                            insertText: `${nomeMetodo}(${argsTexto})`,
                            insertTextRules: 4, // InsertAsSnippet
                            documentation: metodo.documentacao || '',
                            detail: metodo.tipoRetorno ? `→ ${metodo.tipoRetorno}` : ''
                        };
                    });

                    return { suggestions: sugestoesMetodos };
                }
            }

            const textoCompleto = model.getValue();

            // Sugestões de nomes de classes após 'herda' ou 'implementa'
            const matchHeranca = textoAntesCursor.match(/(?:herda|implementa)\s+([\w,\s]*)$/);
            if (matchHeranca) {
                const regexClasses = /classe\s+(?:abstrata?\s+)?([A-ZÂÁÊÉÍÓÔÕÚ]\w*)/g;
                const regexInterfaces = /interface\s+([A-ZÂÁÊÉÍÓÔÕÚ]\w*)/g;
                const nomesEncontrados = new Set<string>();
                let m;
                while ((m = regexClasses.exec(textoCompleto)) !== null) nomesEncontrados.add(m[1]);
                while ((m = regexInterfaces.exec(textoCompleto)) !== null) nomesEncontrados.add(m[1]);
                if (nomesEncontrados.size > 0) {
                    return {
                        suggestions: Array.from(nomesEncontrados).map(nome => ({
                            label: nome,
                            kind: 7, // Class
                            insertText: nome,
                            sortText: `0${nome}`
                        }))
                    };
                }
            }

            // Sugestões de blocos de modificadores de acesso dentro de corpos de classe
            // Verificar se o cursor está dentro de um corpo de classe
            const linhasAntesDoAtual = textoCompleto.split('\n').slice(0, position.lineNumber);
            const textoAteAtual = linhasAntesDoAtual.join('\n');
            const aberturasClasse = (textoAteAtual.match(/\bclasse\b[^{]*\{/g) || []).length;
            const fechamentosTotais = (textoAteAtual.match(/\}/g) || []).length;
            const dentroDeClasse = aberturasClasse > fechamentosTotais;

            if (dentroDeClasse && !textoAntesCursor.trim()) {
                const blocoModificadores = [
                    { label: 'publico { }', insertText: 'publico {\n\t${1}\n}', descricao: 'Bloco de membros públicos' },
                    { label: 'privado { }', insertText: 'privado {\n\t${1}\n}', descricao: 'Bloco de membros privados' },
                    { label: 'protegido { }', insertText: 'protegido {\n\t${1}\n}', descricao: 'Bloco de membros protegidos' },
                    { label: 'estático { }', insertText: 'estático {\n\t${1}\n}', descricao: 'Bloco de membros estáticos' },
                    { label: 'abstrato { }', insertText: 'abstrato {\n\t${1}(): ${2:tipo};\n}', descricao: 'Bloco de métodos abstratos (sem corpo)' },
                    { label: 'construtor', insertText: 'construtor(${1:params}) {\n\t${2}\n}', descricao: 'Método construtor da classe' },
                ];
                return {
                    suggestions: blocoModificadores.map(b => ({
                        label: b.label,
                        kind: 14, // Keyword
                        insertText: b.insertText,
                        insertTextRules: 4, // InsertAsSnippet
                        documentation: b.descricao,
                        sortText: `0${b.label}`
                    }))
                };
            }

            // Extrair variáveis definidas no código (como módulos importados)
            const regexVariaveis = /(?:var|variavel|variável|const|constante|fixo)\s+(\w+)/g;
            const variaveisEncontradas = new Set<string>();
            let match;

            while ((match = regexVariaveis.exec(textoCompleto)) !== null) {
                variaveisEncontradas.add(match[1]);
            }

            // Extrair variáveis de laço: para (var i = ...) ou para (var item de lista)
            const regexLaco = /\bpara\s*\(\s*(?:var|variavel|variável)?\s*(\w+)\s*(?:=|de)\b/g;
            while ((match = regexLaco.exec(textoCompleto)) !== null) {
                variaveisEncontradas.add(match[1]);
            }

            // Criar sugestões para variáveis/módulos
            const sugestoesVariaveis = Array.from(variaveisEncontradas).map((nomeVar: string) => {
                const ehBiblioteca = documentacoesBibliotecas[nomeVar];
                return {
                    label: nomeVar,
                    kind: ehBiblioteca ? 9 : 6, // Module (9) ou Variable (6)
                    insertText: nomeVar,
                    documentation: ehBiblioteca ? `Módulo ${nomeVar}` : `Variável ${nomeVar}`,
                    sortText: `0${nomeVar}` // Priorizar na lista
                };
            });

            // Extrair funções declaradas: funcao nomeFuncao(params)
            const regexFuncoes = /\bfuncao\s+(\w+)\s*\(([^)]*)\)/g;
            const funcoesEncontradas = new Map<string, string[]>();
            while ((match = regexFuncoes.exec(textoCompleto)) !== null) {
                const nomeFuncao = match[1];
                const params = match[2]
                    .split(',')
                    .map((p: string) => p.trim())
                    .filter((p: string) => p.length > 0);
                funcoesEncontradas.set(nomeFuncao, params);
            }

            // Extrair funções anônimas atribuídas: var nome = funcao(params)
            const regexFuncaoAnonima = /(?:var|variavel|variável|const|constante|fixo)\s+(\w+)\s*=\s*funcao\s*\(([^)]*)\)/g;
            while ((match = regexFuncaoAnonima.exec(textoCompleto)) !== null) {
                const nomeFuncao = match[1];
                const params = match[2]
                    .split(',')
                    .map((p: string) => p.trim())
                    .filter((p: string) => p.length > 0);
                funcoesEncontradas.set(nomeFuncao, params);
                variaveisEncontradas.delete(nomeFuncao); // evitar duplicata como variável
            }

            const sugestoesFuncoes = Array.from(funcoesEncontradas.entries()).map(([nomeFuncao, params]) => {
                const argsSnippet = params.map((p, i) => `\${${i + 1}:${p}}`).join(', ');
                return {
                    label: nomeFuncao,
                    kind: 2, // Function
                    insertText: params.length > 0 ? `${nomeFuncao}(${argsSnippet})` : `${nomeFuncao}()`,
                    insertTextRules: 4, // InsertAsSnippet
                    documentation: `Função ${nomeFuncao}(${params.join(', ')})`,
                    detail: `(${params.join(', ')})`,
                    sortText: `0${nomeFuncao}`
                };
            });

            // Extrair parâmetros da função atual (função que contém o cursor)
            const linhasCodigo = textoCompleto.split('\n');
            const linhaAtual = position.lineNumber - 1;
            const sugestoesParametros: any[] = [];
            for (let i = linhaAtual; i >= 0; i--) {
                const matchFuncaoLocal = linhasCodigo[i].match(/\bfuncao\s+\w*\s*\(([^)]*)\)/);
                if (matchFuncaoLocal) {
                    matchFuncaoLocal[1]
                        .split(',')
                        .map((p: string) => p.trim().split(':')[0].trim())
                        .filter((p: string) => p.length > 0)
                        .forEach((param: string) => {
                            sugestoesParametros.push({
                                label: param,
                                kind: 5, // Field (parâmetro)
                                insertText: param,
                                documentation: `Parâmetro ${param}`,
                                sortText: `0${param}`
                            });
                        });
                    break;
                }
            }

            // Extrair nomes de classes declaradas
            const regexClasse = /\bclasse\s+(?:abstrata?\s+)?([A-ZÂÁÊÉÍÓÔÕÚ]\w*)/g;
            const classesEncontradas = new Set<string>();
            while ((match = regexClasse.exec(textoCompleto)) !== null) {
                classesEncontradas.add(match[1]);
            }

            const sugestoesClasses = Array.from(classesEncontradas).map(nomeClasse => ({
                label: nomeClasse,
                kind: 7, // Class
                insertText: nomeClasse,
                documentation: `Classe ${nomeClasse}`,
                sortText: `0${nomeClasse}`
            }));

            // Sugestões padrão (primitivas e snippets)
            const formatoPrimitivas = primitivas
                .filter(p => p.exemploCodigo && p.nome)
                .map(({ nome, exemploCodigo: exemplo }) => {
                    const insertText = exemplo.includes('.') ? exemplo.split('.')[1] : exemplo;
                    return {
                        label: nome,
                        kind: 17, // Keyword,
                        insertText: insertText || nome,
                        insertTextRules: 4 // InsertAsSnippet
                    }
                });

            const formatoSnippets = (typeof deleguaCodeSnippets !== 'undefined' && deleguaCodeSnippets)
                ? deleguaCodeSnippets
                    .filter(s => s.prefixo && s.corpo)
                    .map(({ prefixo, corpo, descricao }) => {
                        return {
                            label: prefixo,
                            kind: 15, // Snippet,
                            insertText: Array.isArray(corpo) ? corpo.join('\n') : corpo,
                            documentation: descricao || '',
                            insertTextRules: 4 // InsertAsSnippet
                        }
                    })
                : [];

            const sugestoes = [...sugestoesParametros, ...sugestoesFuncoes, ...sugestoesClasses, ...sugestoesVariaveis, ...formatoPrimitivas, ...formatoSnippets].filter(s => s.insertText);
            return { suggestions: sugestoes };
        }
    });

    interface KeywordDoc {
        titulo: string;
        descricao: string;
        exemplo: string;
    }

    interface HoverContentItem {
        value: string;
    }

    interface WordPosition {
        word: string;
        startColumn: number;
    }

    interface Metodo {
        documentacao?: string;
        exemploCodigo?: string;
    }

    interface ModuloInfo {
        descricao?: string;
        metodosDestaque?: string[];
        repositorio?: string | null;
    }

    interface HoverProvider {
        contents: HoverContentItem[];
    }

    const documentacaoKeywords: Record<string, KeywordDoc> = {
        'interface': {
            titulo: 'interface',
            descricao: 'Declara um contrato que classes podem implementar. Define assinaturas de métodos e propriedades sem implementação. A conformidade é verificada em tempo de análise.',
            exemplo: `interface Forma {\n    area(): numero;\n    nome: texto;\n}`
        },
        'implementa': {
            titulo: 'implementa',
            descricao: 'Indica que uma classe cumpre o contrato de uma ou mais interfaces (separadas por vírgula). Todos os métodos e propriedades da interface devem ser declarados.',
            exemplo: `classe Circulo implementa Forma {\n    publico {\n        area(): numero { retorna 3.14 * isto.r * isto.r; }\n        nome: texto;\n    }\n}`
        },
        'herda': {
            titulo: 'herda',
            descricao: 'Indica herança de uma ou mais superclasses (herança múltipla), separadas por vírgula. A classe filha herda todos os membros públicos e protegidos.',
            exemplo: `classe Pato herda Voador, Nadador {\n    grasnar() { escreva("Quack!"); }\n}`
        },
        'abstrata': {
            titulo: 'abstrata / abstrato',
            descricao: 'Modifica uma classe para que não possa ser instanciada diretamente. Métodos no bloco `abstrato { }` não têm corpo e devem ser implementados por subclasses.',
            exemplo: `classe abstrata Animal {\n    abstrato {\n        fazerSom(): texto;\n    }\n}`
        },
        'abstrato': {
            titulo: 'abstrato / abstrata',
            descricao: 'Como modificador de classe: impede instanciação direta. Como bloco dentro de uma classe: declara métodos sem implementação que subclasses devem fornecer.',
            exemplo: `classe abstrata Forma {\n    abstrato {\n        area(): numero;\n    }\n}`
        },
        'mescla': {
            titulo: 'mescla',
            descricao: 'Composição de misturas (mixins/traits) em uma classe. Permite reutilizar comportamento de múltiplas fontes sem herança formal.',
            exemplo: `classe Robô herda Maquina mescla Falante, Movivel {\n    // herda de Maquina, incorpora Falante e Movivel\n}`
        },
        'construtor': {
            titulo: 'construtor',
            descricao: 'Método especial executado automaticamente ao instanciar uma classe. Usado para inicializar propriedades.',
            exemplo: `classe Pessoa {\n    construtor(nome: texto) {\n        isto.nome = nome;\n    }\n}`
        },
        'publico': {
            titulo: 'publico',
            descricao: 'Bloco de membros acessíveis de qualquer lugar. Este é o modificador padrão quando nenhum bloco é especificado.',
            exemplo: `classe Conta {\n    publico {\n        saldo: numero;\n        depositar(valor: numero) { isto.saldo = isto.saldo + valor; }\n    }\n}`
        },
        'público': {
            titulo: 'público',
            descricao: 'Bloco de membros acessíveis de qualquer lugar. Este é o modificador padrão quando nenhum bloco é especificado.',
            exemplo: `classe Conta {\n    público {\n        saldo: numero;\n    }\n}`
        },
        'privado': {
            titulo: 'privado',
            descricao: 'Bloco de membros acessíveis apenas dentro da própria classe. Encapsula detalhes de implementação internos.',
            exemplo: `classe Conta {\n    privado {\n        _saldo: numero;\n    }\n    publico {\n        obterSaldo(): numero { retorna isto._saldo; }\n    }\n}`
        },
        'protegido': {
            titulo: 'protegido',
            descricao: 'Bloco de membros acessíveis dentro da própria classe e de subclasses, mas não externamente.',
            exemplo: `classe Animal {\n    protegido {\n        energia: numero;\n    }\n}`
        },
        'estatico': {
            titulo: 'estatico / estático',
            descricao: 'Bloco de membros que pertencem à classe em si, não a instâncias. Acessados diretamente pelo nome da classe.',
            exemplo: `classe Matematica {\n    estatico {\n        pi: numero = 3.14159;\n        quadrado(x: numero): numero { retorna x * x; }\n    }\n}`
        },
        'estático': {
            titulo: 'estático / estatico',
            descricao: 'Bloco de membros que pertencem à classe em si, não a instâncias. Acessados diretamente pelo nome da classe.',
            exemplo: `classe Matematica {\n    estático {\n        pi: numero = 3.14159;\n    }\n}`
        },
        'super': {
            titulo: 'super',
            descricao: 'Referência à superclasse. Usado para chamar o construtor ou métodos da classe pai.',
            exemplo: `classe Cachorro herda Animal {\n    construtor() {\n        super.construtor();\n    }\n}`
        },
    };

    interface MapaDocumentacoesBibliotecasInterface extends Record<string, Metodo | undefined> {}

    Monaco.languages.registerHoverProvider('delegua', {
        provideHover: function (model: any, position: any): HoverProvider {
            const palavra: WordPosition | null = model.getWordAtPosition(position);
            if (!palavra) return { contents: [] };

            // Verificar keywords OOP
            const docKeyword: KeywordDoc | undefined = documentacaoKeywords[palavra.word];
            if (docKeyword) {
                return {
                    contents: [
                        { value: `**${docKeyword.titulo}** _(palavra-chave)_` },
                        { value: docKeyword.descricao },
                        { value: `\`\`\`delegua\n${docKeyword.exemplo}\n\`\`\`` }
                    ]
                };
            }

            // Verificar primitivas nativas
            const primitiva: IPrimitiva | undefined = primitivas.find(p => p.nome === palavra.word);
            if (primitiva) {
                return {
                    contents: [
                        { value: `**${primitiva.nome}**` },
                        { value: primitiva.documentacao },
                        { value: `    ${primitiva.exemploCodigo}    ` }
                    ]
                };
            }
            
            // Verificar métodos de bibliotecas (ex: criptografia.md5)
            // Precisamos verificar se há um ponto antes da palavra atual
            const linha: string = model.getLineContent(position.lineNumber);
            const inicioColuna: number = palavra.startColumn - 1;
            
            // Verificar se há um ponto antes da palavra
            if (inicioColuna > 0 && linha[inicioColuna - 1] === '.') {
                // Procurar o nome da biblioteca antes do ponto
                const textoAntesPonto: string = linha.substring(0, inicioColuna - 1);
                const matchBiblioteca: RegExpMatchArray | null = textoAntesPonto.match(/(\w+)$/);
                
                if (matchBiblioteca) {
                    const nomeBiblioteca: string = matchBiblioteca[1];
                    const nomeMetodo: string = palavra.word;
                    const documentacaoBiblioteca: MapaDocumentacoesBibliotecasInterface | undefined = documentacoesBibliotecas[nomeBiblioteca];
                    
                    if (documentacaoBiblioteca && nomeMetodo) {
                        const metodo: Metodo | undefined = documentacaoBiblioteca[nomeMetodo];
                        if (metodo) {
                            const contents: HoverContentItem[] = [
                                { value: `**${nomeBiblioteca}.${nomeMetodo}**` }
                            ];
                            
                            if (metodo.documentacao) {
                                contents.push({ value: metodo.documentacao });
                            }
                            
                            if (metodo.exemploCodigo) {
                                contents.push({ value: `\`\`\`delegua\n${metodo.exemploCodigo}\n\`\`\`` });
                            }
                            
                            return { contents };
                        }
                    }
                }
            }
            
            // Verificar se é o nome de um módulo (sem ponto depois)
            const nomeModulo: string = palavra.word;
            const infoModulo: ModuloInfo | undefined = informacoesModulos[nomeModulo as keyof typeof informacoesModulos];
            const documentacaoBiblioteca: MapaDocumentacoesBibliotecasInterface | undefined = documentacoesBibliotecas[nomeModulo as keyof typeof documentacoesBibliotecas];
            
            if (infoModulo || documentacaoBiblioteca) {
                const conteudos: HoverContentItem[] = [
                    { value: `**${nomeModulo}** _(módulo)_` }
                ];
                
                if (infoModulo?.descricao) {
                    conteudos.push({ value: infoModulo.descricao });
                }
                
                // Listar métodos disponíveis
                if (documentacaoBiblioteca) {
                    const metodos: string[] = Object.keys(documentacaoBiblioteca);
                    const metodosExibir: string[] = (infoModulo?.metodosDestaque?.length ?? 0) > 0 
                        ? infoModulo?.metodosDestaque ?? metodos.slice(0, 5)
                        : metodos.slice(0, 5);
                    
                    if (metodosExibir.length > 0) {
                        const listaMetodos: string = metodosExibir.map(m => `- \`${nomeModulo}.${m}()\``).join('\n');
                        const sufixo: string = metodos.length > metodosExibir.length 
                            ? `\n\n_...e mais ${metodos.length - metodosExibir.length} métodos_` 
                            : '';
                        conteudos.push({ 
                            value: `**Métodos disponíveis:**\n${listaMetodos}${sufixo}` 
                        });
                    }
                }
                
                if (infoModulo?.repositorio) {
                    conteudos.push({ value: `[📦 Repositório](${infoModulo.repositorio})` });
                }

                return { contents: conteudos };
            }

            // Verificar funções e classes documentadas pelo usuário
            const codigoAtual: string = model.getValue();
            const funcoesDocumentadas: Map<string, DocumentarioAnalisado> = extrairFuncoesDocumentadas(codigoAtual);
            const docFuncao: DocumentarioAnalisado | undefined = funcoesDocumentadas.get(palavra.word);
            if (docFuncao) {
                return { contents: formatarDocumentario(palavra.word, docFuncao) };
            }

            const classesDocumentadas: Map<string, DocumentarioAnalisado> = extrairClassesDocumentadas(codigoAtual);
            const docClasse: DocumentarioAnalisado | undefined = classesDocumentadas.get(palavra.word);
            if (docClasse) {
                return { contents: formatarDocumentario(palavra.word, docClasse) };
            }

            return { contents: [] };
        }
    });

    Monaco.languages.registerCodeActionProvider('delegua', {
        provideCodeActions(model: any, _range: any, context: { markers: any; }) {
            const acoes: any[] = [];

            for (const marcador of context.markers) {
                const correcao = errosComCorrecao.get(marcador.startLineNumber);
                if (correcao) {
                    acoes.push(gerarAcaoImplementarInterface(model, correcao));
                    continue;
                }
                const fixTipo = fixesTiposDocstring.get(marcador.startLineNumber);
                if (fixTipo) {
                    const acao = gerarAcaoTiposDocstring(model, fixTipo);
                    if (acao) acoes.push(acao);
                }
            }

            return { actions: acoes, dispose() {} };
        }
    });

    Monaco.languages.registerDocumentFormattingEditProvider('delegua', {
        provideDocumentFormattingEdits: async (model: any) => {
            const configuracoes = obterConfiguracoesDeleguaWeb();
            const codigoAtual = model.getValue();
            const codigoFormatado = await formatarCodigoDelegua(codigoAtual, configuracoes);

            if (!codigoFormatado || codigoFormatado === codigoAtual) {
                return [];
            }

            return [{
                range: model.getFullModelRange(),
                text: codigoFormatado,
            }];
        }
    });

    Monaco.languages.registerDocumentRangeFormattingEditProvider('delegua', {
        provideDocumentRangeFormattingEdits: async (model: any, range: any) => {
            const configuracoes = obterConfiguracoesDeleguaWeb();
            const codigoSelecionado = model.getValueInRange(range);
            const codigoFormatado = await formatarCodigoDelegua(codigoSelecionado, configuracoes);

            if (!codigoFormatado || codigoFormatado === codigoSelecionado) {
                return [];
            }

            return [{
                range,
                text: codigoFormatado,
            }];
        }
    });
}

window.addEventListener("load", () => {
    configurarLinguagemDelegua();
    configurarAtualizacaoAutomatica();

    const aplicarConfiguracoesNoEditor = (configuracoes: ConfiguracoesDeleguaWeb) => {
        tempoAnaliseAutomaticaMs = configuracoes.tempoAnaliseAutomaticaMs;
        atualizarStatusFormatacao(configuracoes);

        const seletorTema = document.getElementById('temaEditor') as HTMLSelectElement | null;
        if (seletorTema) {
            seletorTema.value = configuracoes.temaEditor;
        }
        definirTema(configuracoes.temaEditor);

        const seletorLinguagem = document.getElementById('linguagem') as HTMLSelectElement | null;
        if (seletorLinguagem) {
            seletorLinguagem.value = configuracoes.linguagemTraducao === 'python' ? 'Python' : 'JavaScript';
        }

        const editorExistente = Monaco.editor.getEditors()[0];
        if (editorExistente) {
            editorExistente.updateOptions({
                tabSize: configuracoes.tamanhoIndentacaoFormatacao,
                insertSpaces: true,
                wordWrap: 'bounded',
                wordWrapColumn: configuracoes.maximoCaracteresPorLinhaFormatacao,
            });
        }
    };

    const configuracoes = obterConfiguracoesDeleguaWeb();
    aplicarConfiguracoesNoEditor(configuracoes);

    const searchParams = new URLSearchParams(window.location.search.split('?')[1]);
    const exemploId: any = searchParams.get('exemploId');
    const codigo: any = searchParams.get('codigo');

    const editor = Monaco.editor.getEditors()[0];
    const modelo = editor.getModel();
    if (codigo) {
        const codigoDecodificado = atob(codigo);
        modelo.setValue(codigoDecodificado);
    }
    else if (exemploId) {
        modelo.setValue((window as any).Exemplos[exemploId]);
        document.querySelector('#titulo-arquivo')!.innerHTML = `${exemploId}.delegua`;
    } else {
        modelo.setValue('// Digite código em Delégua aqui, ou utilize o menu do topo superior esquerdo para selecionar exemplos de código em Delégua.');
    }

    Monaco.editor.setModelLanguage(modelo, 'delegua');

    window.addEventListener('storage', (evento: StorageEvent) => {
        if (evento.key && evento.key !== CHAVE_CONFIGURACOES_LOCAL_STORAGE) {
            return;
        }

        aplicarConfiguracoesNoEditor(obterConfiguracoesDeleguaWeb());
    });
});

botaoTraduzir?.addEventListener("click", function () {
    limparResultadoEditor();
    executarTradutor();
});

botaoCompartilhar?.addEventListener("click", function () {
    compartilharCodigo();
});

botaoExecutar?.addEventListener("click", function () {
    limparResultadoEditor();
    executarCodigo();
});

const definirTema = (tema: string) => {
    const temaCustomizado = tema === 'vs-dark' ? 'delegua-escuro' : tema === 'vs' ? 'delegua-claro' : tema;
    Monaco.editor.setTheme(temaCustomizado);
    const temaEscuro = tema === 'vs-dark' || tema === 'hc-black';
    document.body.setAttribute('data-tema', temaEscuro ? 'escuro' : 'claro');
}