"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorWeb = void 0;
const delegua_1 = require("@designliquido/delegua");
const excecoes_1 = require("@designliquido/delegua/excecoes");
class InterpretadorWeb extends delegua_1.Interpretador {
    constructor(diretorioBase, performance = false, funcaoDeRetorno = undefined, funcaoDeRetornoMesmaLinha = undefined) {
        super(diretorioBase, performance, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
    }
    logicaComumImportar(caminho, linha) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (caminho.valor) {
                case 'criptografia':
                case 'estatistica':
                case 'fisica':
                case 'json':
                case 'matematica':
                case 'tempo':
                case 'visualizacao':
                    const variavelDoModulo = this.pilhaEscoposExecucao.obterVariavelPorNome(caminho.valor);
                    const moduloResolvido = variavelDoModulo.valor;
                    return Promise.resolve(moduloResolvido);
                default:
                    throw new excecoes_1.ErroEmTempoDeExecucao({
                        hashArquivo: -1,
                        linha: linha,
                    }, `Biblioteca ${caminho.valor} não está disponível neste módulo Web. Para suporte a mais bibliotecas, por favor verifique a solução completa, em https://github.com/DesignLiquido/delegua-completo.`, linha);
            }
        });
    }
    vincularElementosImportacao(declaracao, modulo) {
        if (declaracao.simboloTudo !== null) {
            this.pilhaEscoposExecucao.definirVariavel(declaracao.simboloTudo.lexema, modulo);
            return;
        }
        for (const elemento of declaracao.elementosImportacao) {
            const componente = modulo.componentes[elemento.lexema];
            if (componente !== undefined) {
                this.pilhaEscoposExecucao.definirVariavel(elemento.lexema, componente);
            }
        }
    }
    visitarDeclaracaoImportar(declaracao) {
        const _super = Object.create(null, {
            visitarDeclaracaoImportar: { get: () => super.visitarDeclaracaoImportar }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Resolver isso não considerando que é um Literal.
            const caminhoResolvido = declaracao.caminho;
            if (caminhoResolvido.valor === 'testes') {
                // Reutiliza a implementação nativa do núcleo (registro, módulo e vínculo dos nomes).
                return _super.visitarDeclaracaoImportar.call(this, declaracao);
            }
            const modulo = yield this.logicaComumImportar(caminhoResolvido, declaracao.linha);
            this.vincularElementosImportacao(declaracao, modulo);
            return modulo;
        });
    }
    visitarExpressaoImportar(expressao) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Resolver isso não considerando que é um Literal.
            const caminhoResolvido = expressao.caminho;
            return this.logicaComumImportar(caminhoResolvido, expressao.linha);
        });
    }
}
exports.InterpretadorWeb = InterpretadorWeb;
