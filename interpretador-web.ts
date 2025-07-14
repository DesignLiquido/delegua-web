import { Importar, Interpretador, Literal, SimboloInterface } from "@designliquido/delegua";
import { DeleguaModulo } from "@designliquido/delegua/interpretador/estruturas";
import { ErroEmTempoDeExecucao } from "@designliquido/delegua/excecoes";

export class InterpretadorWeb 
    extends Interpretador
{
    constructor(
        diretorioBase: string,
        performance = false,
        funcaoDeRetorno: Function = null,
        funcaoDeRetornoMesmaLinha: Function = null
    ) {
        super(diretorioBase, performance, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
    }

    override async visitarDeclaracaoImportar(declaracao: Importar): Promise<DeleguaModulo> {
        // TODO: Resolver isso não considerando que é um Literal.
        const caminhoResolvido = declaracao.caminho as Literal;
        switch (caminhoResolvido.valor) {
            case 'estatistica':
            case 'fisica':
            case 'json':
            case 'matematica':
            case 'tempo':
                const variavelDoModulo = this.pilhaEscoposExecucao.obterVariavelPorNome(caminhoResolvido.valor);
                const moduloResolvido = variavelDoModulo.valor as DeleguaModulo;
                return moduloResolvido;
            default:
                throw new ErroEmTempoDeExecucao(
                    {
                        hashArquivo: -1,
                        linha: declaracao.linha,
                    } as SimboloInterface,
                    `Biblioteca ${caminhoResolvido.valor} não está disponível neste módulo Web. Para suporte a mais bibliotecas, por favor verifique a solução completa, em https://github.com/DesignLiquido/delegua-completo.`,
                    declaracao.linha
                );
        }
    }
}