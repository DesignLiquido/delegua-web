interface ConfiguracoesDeleguaWeb {
    temaEditor: string;
    linguagemTraducao: 'javascript' | 'python';
    tempoAnaliseAutomaticaMs: number;
    limiteIteracoesLaco: number;
    tamanhoIndentacaoFormatacao: number;
    delimitadorTextoFormatacao: 'aspas-simples' | 'aspas-duplas' | 'preservar';
    maximoCaracteresPorLinhaFormatacao: number;
}

const CHAVE_CONFIGURACOES_LOCAL_STORAGE = 'delegua-web:configuracoes';
const CONFIGURACOES_PADRAO: ConfiguracoesDeleguaWeb = {
    temaEditor: 'vs-dark',
    linguagemTraducao: 'javascript',
    tempoAnaliseAutomaticaMs: 500,
    limiteIteracoesLaco: 1_000_000,
    tamanhoIndentacaoFormatacao: 4,
    delimitadorTextoFormatacao: 'preservar',
    maximoCaracteresPorLinhaFormatacao: 100,
};

function validarTemaEditor(valor: unknown): string {
    const tema = String(valor || '');
    return ['vs', 'vs-dark', 'hc-black', 'hc-light'].includes(tema)
        ? tema
        : CONFIGURACOES_PADRAO.temaEditor;
}

function validarLinguagem(valor: unknown): 'javascript' | 'python' {
    return String(valor || '').toLowerCase() === 'python' ? 'python' : 'javascript';
}

function validarTempoAnalise(valor: unknown): number {
    const tempo = Number(valor);
    return Number.isFinite(tempo) && tempo >= 150 && tempo <= 10000
        ? Math.round(tempo)
        : CONFIGURACOES_PADRAO.tempoAnaliseAutomaticaMs;
}

function validarLimiteIteracoes(valor: unknown): number {
    const limite = Number(valor);
    return Number.isFinite(limite) && limite >= 1000
        ? Math.round(limite)
        : CONFIGURACOES_PADRAO.limiteIteracoesLaco;
}

function validarTamanhoIndentacao(valor: unknown): number {
    const tamanho = Number(valor);
    return Number.isFinite(tamanho) && tamanho >= 2 && tamanho <= 8
        ? Math.round(tamanho)
        : CONFIGURACOES_PADRAO.tamanhoIndentacaoFormatacao;
}

function validarDelimitadorTexto(valor: unknown): 'aspas-simples' | 'aspas-duplas' | 'preservar' {
    const delimitador = String(valor || '');
    return delimitador === 'aspas-simples' || delimitador === 'aspas-duplas' || delimitador === 'preservar'
        ? delimitador
        : CONFIGURACOES_PADRAO.delimitadorTextoFormatacao;
}

function validarMaximoCaracteresPorLinha(valor: unknown): number {
    const limite = Number(valor);
    return Number.isFinite(limite) && limite >= 40 && limite <= 240
        ? Math.round(limite)
        : CONFIGURACOES_PADRAO.maximoCaracteresPorLinhaFormatacao;
}

function normalizarConfiguracoes(origem: any): ConfiguracoesDeleguaWeb {
    return {
        temaEditor: validarTemaEditor(origem?.temaEditor),
        linguagemTraducao: validarLinguagem(origem?.linguagemTraducao),
        tempoAnaliseAutomaticaMs: validarTempoAnalise(origem?.tempoAnaliseAutomaticaMs),
        limiteIteracoesLaco: validarLimiteIteracoes(origem?.limiteIteracoesLaco),
        tamanhoIndentacaoFormatacao: validarTamanhoIndentacao(origem?.tamanhoIndentacaoFormatacao),
        delimitadorTextoFormatacao: validarDelimitadorTexto(origem?.delimitadorTextoFormatacao),
        maximoCaracteresPorLinhaFormatacao: validarMaximoCaracteresPorLinha(origem?.maximoCaracteresPorLinhaFormatacao),
    };
}

function lerConfiguracoes(): ConfiguracoesDeleguaWeb {
    try {
        const conteudo = localStorage.getItem(CHAVE_CONFIGURACOES_LOCAL_STORAGE);
        if (!conteudo) {
            return { ...CONFIGURACOES_PADRAO };
        }

        return normalizarConfiguracoes(JSON.parse(conteudo));
    } catch {
        return { ...CONFIGURACOES_PADRAO };
    }
}

function salvarConfiguracoes(configuracoes: ConfiguracoesDeleguaWeb): void {
    localStorage.setItem(CHAVE_CONFIGURACOES_LOCAL_STORAGE, JSON.stringify(configuracoes));
}

function aplicarTemaPagina(temaEditor: string): void {
    const temaEscuro = temaEditor === 'vs-dark' || temaEditor === 'hc-black';
    document.body.setAttribute('data-tema', temaEscuro ? 'escuro' : 'claro');
}

function mostrarMensagem(texto: string, sucesso = true): void {
    const mensagem = document.getElementById('mensagemConfiguracoes') as HTMLElement | null;
    if (!mensagem) {
        return;
    }

    mensagem.textContent = texto;
    mensagem.classList.toggle('erro', !sucesso);
}

function preencherFormulario(configuracoes: ConfiguracoesDeleguaWeb): void {
    const temaEditor = document.getElementById('temaEditorConfig') as HTMLSelectElement | null;
    const linguagemTraducao = document.getElementById('linguagemTraducaoConfig') as HTMLSelectElement | null;
    const tempoAnalise = document.getElementById('tempoAnaliseConfig') as HTMLInputElement | null;
    const limiteIteracoes = document.getElementById('limiteIteracoesConfig') as HTMLInputElement | null;
    const tamanhoIndentacao = document.getElementById('tamanhoIndentacaoConfig') as HTMLInputElement | null;
    const delimitadorTexto = document.getElementById('delimitadorTextoConfig') as HTMLSelectElement | null;
    const maximoCaracteresPorLinha = document.getElementById('maximoCaracteresLinhaConfig') as HTMLInputElement | null;

    if (temaEditor) {
        temaEditor.value = configuracoes.temaEditor;
    }

    if (linguagemTraducao) {
        linguagemTraducao.value = configuracoes.linguagemTraducao;
    }

    if (tempoAnalise) {
        tempoAnalise.value = String(configuracoes.tempoAnaliseAutomaticaMs);
    }

    if (limiteIteracoes) {
        limiteIteracoes.value = String(configuracoes.limiteIteracoesLaco);
    }

    if (tamanhoIndentacao) {
        tamanhoIndentacao.value = String(configuracoes.tamanhoIndentacaoFormatacao);
    }

    if (delimitadorTexto) {
        delimitadorTexto.value = configuracoes.delimitadorTextoFormatacao;
    }

    if (maximoCaracteresPorLinha) {
        maximoCaracteresPorLinha.value = String(configuracoes.maximoCaracteresPorLinhaFormatacao);
    }

    aplicarTemaPagina(configuracoes.temaEditor);
}

function obterConfiguracoesDoFormulario(): ConfiguracoesDeleguaWeb {
    const temaEditor = document.getElementById('temaEditorConfig') as HTMLSelectElement | null;
    const linguagemTraducao = document.getElementById('linguagemTraducaoConfig') as HTMLSelectElement | null;
    const tempoAnalise = document.getElementById('tempoAnaliseConfig') as HTMLInputElement | null;
    const limiteIteracoes = document.getElementById('limiteIteracoesConfig') as HTMLInputElement | null;
    const tamanhoIndentacao = document.getElementById('tamanhoIndentacaoConfig') as HTMLInputElement | null;
    const delimitadorTexto = document.getElementById('delimitadorTextoConfig') as HTMLSelectElement | null;
    const maximoCaracteresPorLinha = document.getElementById('maximoCaracteresLinhaConfig') as HTMLInputElement | null;

    return normalizarConfiguracoes({
        temaEditor: temaEditor?.value,
        linguagemTraducao: linguagemTraducao?.value,
        tempoAnaliseAutomaticaMs: tempoAnalise?.value,
        limiteIteracoesLaco: limiteIteracoes?.value,
        tamanhoIndentacaoFormatacao: tamanhoIndentacao?.value,
        delimitadorTextoFormatacao: delimitadorTexto?.value,
        maximoCaracteresPorLinhaFormatacao: maximoCaracteresPorLinha?.value,
    });
}

window.addEventListener('load', () => {
    const configuracoesAtuais = lerConfiguracoes();
    preencherFormulario(configuracoesAtuais);

    const seletorTema = document.getElementById('temaEditorConfig') as HTMLSelectElement | null;
    seletorTema?.addEventListener('change', () => aplicarTemaPagina(seletorTema.value));

    const botaoSalvar = document.getElementById('botaoSalvarConfiguracoes') as HTMLButtonElement | null;
    botaoSalvar?.addEventListener('click', () => {
        const configuracoes = obterConfiguracoesDoFormulario();
        salvarConfiguracoes(configuracoes);
        preencherFormulario(configuracoes);
        mostrarMensagem('Configurações salvas com sucesso.');
    });

    const botaoRestaurar = document.getElementById('botaoRestaurarConfiguracoes') as HTMLButtonElement | null;
    botaoRestaurar?.addEventListener('click', () => {
        salvarConfiguracoes({ ...CONFIGURACOES_PADRAO });
        preencherFormulario({ ...CONFIGURACOES_PADRAO });
        mostrarMensagem('Configurações restauradas para o padrão.');
    });
});
