interface ConfiguracoesDeleguaWeb {
    temaEditor: string;
    linguagemTraducao: 'javascript' | 'python';
    tempoAnaliseAutomaticaMs: number;
    limiteIteracoesLaco: number;
    tamanhoIndentacaoFormatacao: number;
    delimitadorTextoFormatacao: 'aspas-simples' | 'aspas-duplas' | 'preservar';
    maximoCaracteresPorLinhaFormatacao: number;
    habilitarEstilizador: boolean;
    regraFortalecerTipos: boolean;
    regraExplicitarTiposParametros: boolean;
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
    limiteIteracoesLaco: 1_000_000,
    tamanhoIndentacaoFormatacao: 4,
    delimitadorTextoFormatacao: 'preservar',
    maximoCaracteresPorLinhaFormatacao: 100,
    habilitarEstilizador: true,
    regraFortalecerTipos: false,
    regraExplicitarTiposParametros: false,
    regraConvencaoNomenclatura: false,
    regraParadigmaConsistente: false,
    convencaoVariavel: 'caixaCamelo',
    convencaoConstante: 'CAIXA_ALTA',
    convencaoFuncao: 'caixaCamelo',
    paradigmaConsistente: 'ambos',
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

function validarBooleano(valor: unknown, padrao: boolean): boolean {
    return typeof valor === 'boolean' ? valor : padrao;
}

function validarConvencaoVariavel(valor: unknown): 'caixaCamelo' | 'caixa_cobra' | 'CaixaPascal' {
    const opcao = String(valor || '');
    return opcao === 'caixaCamelo' || opcao === 'caixa_cobra' || opcao === 'CaixaPascal'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoVariavel;
}

function validarConvencaoConstante(valor: unknown): 'CAIXA_ALTA' | 'caixaCamelo' {
    const opcao = String(valor || '');
    return opcao === 'CAIXA_ALTA' || opcao === 'caixaCamelo'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoConstante;
}

function validarConvencaoFuncao(valor: unknown): 'caixaCamelo' | 'caixa_cobra' | 'CaixaPascal' {
    const opcao = String(valor || '');
    return opcao === 'caixaCamelo' || opcao === 'caixa_cobra' || opcao === 'CaixaPascal'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoFuncao;
}

function validarParadigmaConsistente(valor: unknown): 'imperativo' | 'infinitivo' | 'ambos' {
    const opcao = String(valor || '');
    return opcao === 'imperativo' || opcao === 'infinitivo' || opcao === 'ambos'
        ? opcao
        : CONFIGURACOES_PADRAO.paradigmaConsistente;
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
        habilitarEstilizador: validarBooleano(origem?.habilitarEstilizador, CONFIGURACOES_PADRAO.habilitarEstilizador),
        regraFortalecerTipos: validarBooleano(origem?.regraFortalecerTipos, CONFIGURACOES_PADRAO.regraFortalecerTipos),
        regraExplicitarTiposParametros: validarBooleano(origem?.regraExplicitarTiposParametros, CONFIGURACOES_PADRAO.regraExplicitarTiposParametros),
        regraConvencaoNomenclatura: validarBooleano(origem?.regraConvencaoNomenclatura, CONFIGURACOES_PADRAO.regraConvencaoNomenclatura),
        regraParadigmaConsistente: validarBooleano(origem?.regraParadigmaConsistente, CONFIGURACOES_PADRAO.regraParadigmaConsistente),
        convencaoVariavel: validarConvencaoVariavel(origem?.convencaoVariavel),
        convencaoConstante: validarConvencaoConstante(origem?.convencaoConstante),
        convencaoFuncao: validarConvencaoFuncao(origem?.convencaoFuncao),
        paradigmaConsistente: validarParadigmaConsistente(origem?.paradigmaConsistente),
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
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig') as HTMLInputElement | null;
    const regraFortalecerTipos = document.getElementById('regraFortalecerTiposConfig') as HTMLInputElement | null;
    const regraExplicitarTiposParametros = document.getElementById('regraExplicitarTiposParametrosConfig') as HTMLInputElement | null;
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig') as HTMLInputElement | null;
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig') as HTMLInputElement | null;
    const convencaoVariavel = document.getElementById('convencaoVariavelConfig') as HTMLSelectElement | null;
    const convencaoConstante = document.getElementById('convencaoConstanteConfig') as HTMLSelectElement | null;
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig') as HTMLSelectElement | null;
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig') as HTMLSelectElement | null;

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

    if (habilitarEstilizador) {
        habilitarEstilizador.checked = configuracoes.habilitarEstilizador;
    }

    if (regraFortalecerTipos) {
        regraFortalecerTipos.checked = configuracoes.regraFortalecerTipos;
    }

    if (regraExplicitarTiposParametros) {
        regraExplicitarTiposParametros.checked = configuracoes.regraExplicitarTiposParametros;
    }

    if (regraConvencaoNomenclatura) {
        regraConvencaoNomenclatura.checked = configuracoes.regraConvencaoNomenclatura;
    }

    if (regraParadigmaConsistente) {
        regraParadigmaConsistente.checked = configuracoes.regraParadigmaConsistente;
    }

    if (convencaoVariavel) {
        convencaoVariavel.value = configuracoes.convencaoVariavel;
    }

    if (convencaoConstante) {
        convencaoConstante.value = configuracoes.convencaoConstante;
    }

    if (convencaoFuncao) {
        convencaoFuncao.value = configuracoes.convencaoFuncao;
    }

    if (paradigmaConsistente) {
        paradigmaConsistente.value = configuracoes.paradigmaConsistente;
    }

    atualizarEstadoOpcoesEstilizador();

    aplicarTemaPagina(configuracoes.temaEditor);
}

function atualizarEstadoOpcoesEstilizador(): void {
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig') as HTMLInputElement | null;
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig') as HTMLInputElement | null;
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig') as HTMLInputElement | null;

    const convencaoVariavel = document.getElementById('convencaoVariavelConfig') as HTMLSelectElement | null;
    const convencaoConstante = document.getElementById('convencaoConstanteConfig') as HTMLSelectElement | null;
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig') as HTMLSelectElement | null;
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig') as HTMLSelectElement | null;

    const estilizadorLigado = !!habilitarEstilizador?.checked;
    const convLigada = estilizadorLigado && !!regraConvencaoNomenclatura?.checked;
    const paradigmaLigado = estilizadorLigado && !!regraParadigmaConsistente?.checked;

    if (convencaoVariavel) convencaoVariavel.disabled = !convLigada;
    if (convencaoConstante) convencaoConstante.disabled = !convLigada;
    if (convencaoFuncao) convencaoFuncao.disabled = !convLigada;
    if (paradigmaConsistente) paradigmaConsistente.disabled = !paradigmaLigado;
}

function obterConfiguracoesDoFormulario(): ConfiguracoesDeleguaWeb {
    const temaEditor = document.getElementById('temaEditorConfig') as HTMLSelectElement | null;
    const linguagemTraducao = document.getElementById('linguagemTraducaoConfig') as HTMLSelectElement | null;
    const tempoAnalise = document.getElementById('tempoAnaliseConfig') as HTMLInputElement | null;
    const limiteIteracoes = document.getElementById('limiteIteracoesConfig') as HTMLInputElement | null;
    const tamanhoIndentacao = document.getElementById('tamanhoIndentacaoConfig') as HTMLInputElement | null;
    const delimitadorTexto = document.getElementById('delimitadorTextoConfig') as HTMLSelectElement | null;
    const maximoCaracteresPorLinha = document.getElementById('maximoCaracteresLinhaConfig') as HTMLInputElement | null;
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig') as HTMLInputElement | null;
    const regraFortalecerTipos = document.getElementById('regraFortalecerTiposConfig') as HTMLInputElement | null;
    const regraExplicitarTiposParametros = document.getElementById('regraExplicitarTiposParametrosConfig') as HTMLInputElement | null;
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig') as HTMLInputElement | null;
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig') as HTMLInputElement | null;
    const convencaoVariavel = document.getElementById('convencaoVariavelConfig') as HTMLSelectElement | null;
    const convencaoConstante = document.getElementById('convencaoConstanteConfig') as HTMLSelectElement | null;
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig') as HTMLSelectElement | null;
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig') as HTMLSelectElement | null;

    return normalizarConfiguracoes({
        temaEditor: temaEditor?.value,
        linguagemTraducao: linguagemTraducao?.value,
        tempoAnaliseAutomaticaMs: tempoAnalise?.value,
        limiteIteracoesLaco: limiteIteracoes?.value,
        tamanhoIndentacaoFormatacao: tamanhoIndentacao?.value,
        delimitadorTextoFormatacao: delimitadorTexto?.value,
        maximoCaracteresPorLinhaFormatacao: maximoCaracteresPorLinha?.value,
        habilitarEstilizador: habilitarEstilizador?.checked,
        regraFortalecerTipos: regraFortalecerTipos?.checked,
        regraExplicitarTiposParametros: regraExplicitarTiposParametros?.checked,
        regraConvencaoNomenclatura: regraConvencaoNomenclatura?.checked,
        regraParadigmaConsistente: regraParadigmaConsistente?.checked,
        convencaoVariavel: convencaoVariavel?.value,
        convencaoConstante: convencaoConstante?.value,
        convencaoFuncao: convencaoFuncao?.value,
        paradigmaConsistente: paradigmaConsistente?.value,
    });
}

window.addEventListener('load', () => {
    const configuracoesAtuais = lerConfiguracoes();
    preencherFormulario(configuracoesAtuais);

    const seletorTema = document.getElementById('temaEditorConfig') as HTMLSelectElement | null;
    seletorTema?.addEventListener('change', () => aplicarTemaPagina(seletorTema.value));

    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig') as HTMLInputElement | null;
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig') as HTMLInputElement | null;
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig') as HTMLInputElement | null;
    habilitarEstilizador?.addEventListener('change', atualizarEstadoOpcoesEstilizador);
    regraConvencaoNomenclatura?.addEventListener('change', atualizarEstadoOpcoesEstilizador);
    regraParadigmaConsistente?.addEventListener('change', atualizarEstadoOpcoesEstilizador);

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
