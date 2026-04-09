const CHAVE_CONFIGURACOES_LOCAL_STORAGE = 'delegua-web:configuracoes';
const CONFIGURACOES_PADRAO = {
    temaEditor: 'vs-dark',
    linguagemTraducao: 'javascript',
    tempoAnaliseAutomaticaMs: 500,
    limiteIteracoesLaco: 1000000,
    tamanhoIndentacaoFormatacao: 4,
    delimitadorTextoFormatacao: 'preservar',
    maximoCaracteresPorLinhaFormatacao: 100,
    habilitarEstilizador: true,
    regraFortalecerTipos: false,
    regraConvencaoNomenclatura: false,
    regraParadigmaConsistente: false,
    convencaoVariavel: 'caixaCamelo',
    convencaoConstante: 'CAIXA_ALTA',
    convencaoFuncao: 'caixaCamelo',
    paradigmaConsistente: 'ambos',
};
function validarTemaEditor(valor) {
    const tema = String(valor || '');
    return ['vs', 'vs-dark', 'hc-black', 'hc-light'].includes(tema)
        ? tema
        : CONFIGURACOES_PADRAO.temaEditor;
}
function validarLinguagem(valor) {
    return String(valor || '').toLowerCase() === 'python' ? 'python' : 'javascript';
}
function validarTempoAnalise(valor) {
    const tempo = Number(valor);
    return Number.isFinite(tempo) && tempo >= 150 && tempo <= 10000
        ? Math.round(tempo)
        : CONFIGURACOES_PADRAO.tempoAnaliseAutomaticaMs;
}
function validarLimiteIteracoes(valor) {
    const limite = Number(valor);
    return Number.isFinite(limite) && limite >= 1000
        ? Math.round(limite)
        : CONFIGURACOES_PADRAO.limiteIteracoesLaco;
}
function validarTamanhoIndentacao(valor) {
    const tamanho = Number(valor);
    return Number.isFinite(tamanho) && tamanho >= 2 && tamanho <= 8
        ? Math.round(tamanho)
        : CONFIGURACOES_PADRAO.tamanhoIndentacaoFormatacao;
}
function validarDelimitadorTexto(valor) {
    const delimitador = String(valor || '');
    return delimitador === 'aspas-simples' || delimitador === 'aspas-duplas' || delimitador === 'preservar'
        ? delimitador
        : CONFIGURACOES_PADRAO.delimitadorTextoFormatacao;
}
function validarMaximoCaracteresPorLinha(valor) {
    const limite = Number(valor);
    return Number.isFinite(limite) && limite >= 40 && limite <= 240
        ? Math.round(limite)
        : CONFIGURACOES_PADRAO.maximoCaracteresPorLinhaFormatacao;
}
function validarBooleano(valor, padrao) {
    return typeof valor === 'boolean' ? valor : padrao;
}
function validarConvencaoVariavel(valor) {
    const opcao = String(valor || '');
    return opcao === 'caixaCamelo' || opcao === 'caixa_cobra' || opcao === 'CaixaPascal'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoVariavel;
}
function validarConvencaoConstante(valor) {
    const opcao = String(valor || '');
    return opcao === 'CAIXA_ALTA' || opcao === 'caixaCamelo'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoConstante;
}
function validarConvencaoFuncao(valor) {
    const opcao = String(valor || '');
    return opcao === 'caixaCamelo' || opcao === 'caixa_cobra' || opcao === 'CaixaPascal'
        ? opcao
        : CONFIGURACOES_PADRAO.convencaoFuncao;
}
function validarParadigmaConsistente(valor) {
    const opcao = String(valor || '');
    return opcao === 'imperativo' || opcao === 'infinitivo' || opcao === 'ambos'
        ? opcao
        : CONFIGURACOES_PADRAO.paradigmaConsistente;
}
function normalizarConfiguracoes(origem) {
    return {
        temaEditor: validarTemaEditor(origem === null || origem === void 0 ? void 0 : origem.temaEditor),
        linguagemTraducao: validarLinguagem(origem === null || origem === void 0 ? void 0 : origem.linguagemTraducao),
        tempoAnaliseAutomaticaMs: validarTempoAnalise(origem === null || origem === void 0 ? void 0 : origem.tempoAnaliseAutomaticaMs),
        limiteIteracoesLaco: validarLimiteIteracoes(origem === null || origem === void 0 ? void 0 : origem.limiteIteracoesLaco),
        tamanhoIndentacaoFormatacao: validarTamanhoIndentacao(origem === null || origem === void 0 ? void 0 : origem.tamanhoIndentacaoFormatacao),
        delimitadorTextoFormatacao: validarDelimitadorTexto(origem === null || origem === void 0 ? void 0 : origem.delimitadorTextoFormatacao),
        maximoCaracteresPorLinhaFormatacao: validarMaximoCaracteresPorLinha(origem === null || origem === void 0 ? void 0 : origem.maximoCaracteresPorLinhaFormatacao),
        habilitarEstilizador: validarBooleano(origem === null || origem === void 0 ? void 0 : origem.habilitarEstilizador, CONFIGURACOES_PADRAO.habilitarEstilizador),
        regraFortalecerTipos: validarBooleano(origem === null || origem === void 0 ? void 0 : origem.regraFortalecerTipos, CONFIGURACOES_PADRAO.regraFortalecerTipos),
        regraConvencaoNomenclatura: validarBooleano(origem === null || origem === void 0 ? void 0 : origem.regraConvencaoNomenclatura, CONFIGURACOES_PADRAO.regraConvencaoNomenclatura),
        regraParadigmaConsistente: validarBooleano(origem === null || origem === void 0 ? void 0 : origem.regraParadigmaConsistente, CONFIGURACOES_PADRAO.regraParadigmaConsistente),
        convencaoVariavel: validarConvencaoVariavel(origem === null || origem === void 0 ? void 0 : origem.convencaoVariavel),
        convencaoConstante: validarConvencaoConstante(origem === null || origem === void 0 ? void 0 : origem.convencaoConstante),
        convencaoFuncao: validarConvencaoFuncao(origem === null || origem === void 0 ? void 0 : origem.convencaoFuncao),
        paradigmaConsistente: validarParadigmaConsistente(origem === null || origem === void 0 ? void 0 : origem.paradigmaConsistente),
    };
}
function lerConfiguracoes() {
    try {
        const conteudo = localStorage.getItem(CHAVE_CONFIGURACOES_LOCAL_STORAGE);
        if (!conteudo) {
            return Object.assign({}, CONFIGURACOES_PADRAO);
        }
        return normalizarConfiguracoes(JSON.parse(conteudo));
    }
    catch (_a) {
        return Object.assign({}, CONFIGURACOES_PADRAO);
    }
}
function salvarConfiguracoes(configuracoes) {
    localStorage.setItem(CHAVE_CONFIGURACOES_LOCAL_STORAGE, JSON.stringify(configuracoes));
}
function aplicarTemaPagina(temaEditor) {
    const temaEscuro = temaEditor === 'vs-dark' || temaEditor === 'hc-black';
    document.body.setAttribute('data-tema', temaEscuro ? 'escuro' : 'claro');
}
function mostrarMensagem(texto, sucesso = true) {
    const mensagem = document.getElementById('mensagemConfiguracoes');
    if (!mensagem) {
        return;
    }
    mensagem.textContent = texto;
    mensagem.classList.toggle('erro', !sucesso);
}
function preencherFormulario(configuracoes) {
    const temaEditor = document.getElementById('temaEditorConfig');
    const linguagemTraducao = document.getElementById('linguagemTraducaoConfig');
    const tempoAnalise = document.getElementById('tempoAnaliseConfig');
    const limiteIteracoes = document.getElementById('limiteIteracoesConfig');
    const tamanhoIndentacao = document.getElementById('tamanhoIndentacaoConfig');
    const delimitadorTexto = document.getElementById('delimitadorTextoConfig');
    const maximoCaracteresPorLinha = document.getElementById('maximoCaracteresLinhaConfig');
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig');
    const regraFortalecerTipos = document.getElementById('regraFortalecerTiposConfig');
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig');
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig');
    const convencaoVariavel = document.getElementById('convencaoVariavelConfig');
    const convencaoConstante = document.getElementById('convencaoConstanteConfig');
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig');
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig');
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
function atualizarEstadoOpcoesEstilizador() {
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig');
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig');
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig');
    const convencaoVariavel = document.getElementById('convencaoVariavelConfig');
    const convencaoConstante = document.getElementById('convencaoConstanteConfig');
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig');
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig');
    const estilizadorLigado = !!(habilitarEstilizador === null || habilitarEstilizador === void 0 ? void 0 : habilitarEstilizador.checked);
    const convLigada = estilizadorLigado && !!(regraConvencaoNomenclatura === null || regraConvencaoNomenclatura === void 0 ? void 0 : regraConvencaoNomenclatura.checked);
    const paradigmaLigado = estilizadorLigado && !!(regraParadigmaConsistente === null || regraParadigmaConsistente === void 0 ? void 0 : regraParadigmaConsistente.checked);
    if (convencaoVariavel)
        convencaoVariavel.disabled = !convLigada;
    if (convencaoConstante)
        convencaoConstante.disabled = !convLigada;
    if (convencaoFuncao)
        convencaoFuncao.disabled = !convLigada;
    if (paradigmaConsistente)
        paradigmaConsistente.disabled = !paradigmaLigado;
}
function obterConfiguracoesDoFormulario() {
    const temaEditor = document.getElementById('temaEditorConfig');
    const linguagemTraducao = document.getElementById('linguagemTraducaoConfig');
    const tempoAnalise = document.getElementById('tempoAnaliseConfig');
    const limiteIteracoes = document.getElementById('limiteIteracoesConfig');
    const tamanhoIndentacao = document.getElementById('tamanhoIndentacaoConfig');
    const delimitadorTexto = document.getElementById('delimitadorTextoConfig');
    const maximoCaracteresPorLinha = document.getElementById('maximoCaracteresLinhaConfig');
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig');
    const regraFortalecerTipos = document.getElementById('regraFortalecerTiposConfig');
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig');
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig');
    const convencaoVariavel = document.getElementById('convencaoVariavelConfig');
    const convencaoConstante = document.getElementById('convencaoConstanteConfig');
    const convencaoFuncao = document.getElementById('convencaoFuncaoConfig');
    const paradigmaConsistente = document.getElementById('paradigmaConsistenteConfig');
    return normalizarConfiguracoes({
        temaEditor: temaEditor === null || temaEditor === void 0 ? void 0 : temaEditor.value,
        linguagemTraducao: linguagemTraducao === null || linguagemTraducao === void 0 ? void 0 : linguagemTraducao.value,
        tempoAnaliseAutomaticaMs: tempoAnalise === null || tempoAnalise === void 0 ? void 0 : tempoAnalise.value,
        limiteIteracoesLaco: limiteIteracoes === null || limiteIteracoes === void 0 ? void 0 : limiteIteracoes.value,
        tamanhoIndentacaoFormatacao: tamanhoIndentacao === null || tamanhoIndentacao === void 0 ? void 0 : tamanhoIndentacao.value,
        delimitadorTextoFormatacao: delimitadorTexto === null || delimitadorTexto === void 0 ? void 0 : delimitadorTexto.value,
        maximoCaracteresPorLinhaFormatacao: maximoCaracteresPorLinha === null || maximoCaracteresPorLinha === void 0 ? void 0 : maximoCaracteresPorLinha.value,
        habilitarEstilizador: habilitarEstilizador === null || habilitarEstilizador === void 0 ? void 0 : habilitarEstilizador.checked,
        regraFortalecerTipos: regraFortalecerTipos === null || regraFortalecerTipos === void 0 ? void 0 : regraFortalecerTipos.checked,
        regraConvencaoNomenclatura: regraConvencaoNomenclatura === null || regraConvencaoNomenclatura === void 0 ? void 0 : regraConvencaoNomenclatura.checked,
        regraParadigmaConsistente: regraParadigmaConsistente === null || regraParadigmaConsistente === void 0 ? void 0 : regraParadigmaConsistente.checked,
        convencaoVariavel: convencaoVariavel === null || convencaoVariavel === void 0 ? void 0 : convencaoVariavel.value,
        convencaoConstante: convencaoConstante === null || convencaoConstante === void 0 ? void 0 : convencaoConstante.value,
        convencaoFuncao: convencaoFuncao === null || convencaoFuncao === void 0 ? void 0 : convencaoFuncao.value,
        paradigmaConsistente: paradigmaConsistente === null || paradigmaConsistente === void 0 ? void 0 : paradigmaConsistente.value,
    });
}
window.addEventListener('load', () => {
    const configuracoesAtuais = lerConfiguracoes();
    preencherFormulario(configuracoesAtuais);
    const seletorTema = document.getElementById('temaEditorConfig');
    seletorTema === null || seletorTema === void 0 ? void 0 : seletorTema.addEventListener('change', () => aplicarTemaPagina(seletorTema.value));
    const habilitarEstilizador = document.getElementById('habilitarEstilizadorConfig');
    const regraConvencaoNomenclatura = document.getElementById('regraConvencaoNomenclaturaConfig');
    const regraParadigmaConsistente = document.getElementById('regraParadigmaConsistenteConfig');
    habilitarEstilizador === null || habilitarEstilizador === void 0 ? void 0 : habilitarEstilizador.addEventListener('change', atualizarEstadoOpcoesEstilizador);
    regraConvencaoNomenclatura === null || regraConvencaoNomenclatura === void 0 ? void 0 : regraConvencaoNomenclatura.addEventListener('change', atualizarEstadoOpcoesEstilizador);
    regraParadigmaConsistente === null || regraParadigmaConsistente === void 0 ? void 0 : regraParadigmaConsistente.addEventListener('change', atualizarEstadoOpcoesEstilizador);
    const botaoSalvar = document.getElementById('botaoSalvarConfiguracoes');
    botaoSalvar === null || botaoSalvar === void 0 ? void 0 : botaoSalvar.addEventListener('click', () => {
        const configuracoes = obterConfiguracoesDoFormulario();
        salvarConfiguracoes(configuracoes);
        preencherFormulario(configuracoes);
        mostrarMensagem('Configurações salvas com sucesso.');
    });
    const botaoRestaurar = document.getElementById('botaoRestaurarConfiguracoes');
    botaoRestaurar === null || botaoRestaurar === void 0 ? void 0 : botaoRestaurar.addEventListener('click', () => {
        salvarConfiguracoes(Object.assign({}, CONFIGURACOES_PADRAO));
        preencherFormulario(Object.assign({}, CONFIGURACOES_PADRAO));
        mostrarMensagem('Configurações restauradas para o padrão.');
    });
});
