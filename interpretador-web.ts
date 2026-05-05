import { Importar, ImportarComoConstruto, Interpretador, Literal, SimboloInterface } from "@designliquido/delegua";
import { DeleguaModulo } from "@designliquido/delegua/interpretador/estruturas";
import { ErroEmTempoDeExecucao } from "@designliquido/delegua/excecoes";

export class InterpretadorWeb 
    extends Interpretador
{
    constructor(
        diretorioBase: string,
        performance = false,
        funcaoDeRetorno: Function | undefined = undefined,
        funcaoDeRetornoMesmaLinha: Function | undefined = undefined
    ) {
        super(diretorioBase, performance, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
    }

    protected async logicaComumImportar(caminho: Literal, linha: number): Promise<DeleguaModulo> {
        switch (caminho.valor) {
            case 'criptografia':
            case 'estatistica':
            case 'fisica':
            case 'json':
            case 'matematica':
            case 'tempo':
                const variavelDoModulo = this.pilhaEscoposExecucao.obterVariavelPorNome(caminho.valor);
                const moduloResolvido = variavelDoModulo.valor as DeleguaModulo;
                return Promise.resolve(moduloResolvido);
            default:
                throw new ErroEmTempoDeExecucao(
                    {
                        hashArquivo: -1,
                        linha: linha,
                    } as SimboloInterface,
                    `Biblioteca ${caminho.valor} não está disponível neste módulo Web. Para suporte a mais bibliotecas, por favor verifique a solução completa, em https://github.com/DesignLiquido/delegua-completo.`,
                    linha
                );
        }
    }

    override async visitarDeclaracaoImportar(declaracao: Importar): Promise<DeleguaModulo> {
        // TODO: Resolver isso não considerando que é um Literal.
        const caminhoResolvido = declaracao.caminho as Literal;
        return this.logicaComumImportar(caminhoResolvido, declaracao.linha);
    }

    override async visitarExpressaoImportar(expressao: ImportarComoConstruto): Promise<DeleguaModulo> {
        // TODO: Resolver isso não considerando que é um Literal.
        const caminhoResolvido = expressao.caminho as Literal;
        return this.logicaComumImportar(caminhoResolvido, expressao.linha);
    }
}