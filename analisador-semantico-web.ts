import { AnalisadorSemantico } from "@designliquido/delegua/analisador-semantico";
import { Literal, Variavel } from "@designliquido/delegua/construtos";
import { Declaracao, Importar } from "@designliquido/delegua/declaracoes";
import { ConstrutoInterface } from "@designliquido/delegua/interfaces/construtos/construto-interface";
import { RetornoAnalisadorSemanticoInterface } from "@designliquido/delegua/interfaces/retornos/retorno-analisador-semantico-interface";

// Bibliotecas exclusivas do delegua-web cujas funções são chamadas sem
// qualificação de objeto (ex: `teste(...)`, `visualizarArvoreBinaria(...)`).
// O analisador semântico do núcleo do Delégua não rastreia símbolos trazidos
// por `importar`, então essas funções precisam ser conhecidas aqui.
const FUNCOES_POR_BIBLIOTECA_WEB: Record<string, string[]> = {
    testes: ["teste", "grupo"],
    visualizacao: ["visualizarArvoreBinaria"],
};

export class AnalisadorSemanticoWeb extends AnalisadorSemantico {
    private funcoesImportadasDeBibliotecasWeb: Set<string>;

    constructor() {
        super();
        this.funcoesImportadasDeBibliotecasWeb = new Set<string>();
    }

    private registrarFuncoesImportadasDeBibliotecasWeb(declaracao: Importar): void {
        const caminho = declaracao.caminho as Literal;
        const funcoesDoModulo = FUNCOES_POR_BIBLIOTECA_WEB[caminho?.valor as string];
        if (!funcoesDoModulo) {
            return;
        }

        if (declaracao.simboloTudo) {
            for (const nome of funcoesDoModulo) {
                this.funcoesImportadasDeBibliotecasWeb.add(nome);
            }
            return;
        }

        for (const simboloImportado of declaracao.elementosImportacao || []) {
            if (funcoesDoModulo.includes(simboloImportado.lexema)) {
                this.funcoesImportadasDeBibliotecasWeb.add(simboloImportado.lexema);
            }
        }
    }

    override async visitarDeclaracaoImportar(declaracao: Importar): Promise<any> {
        this.registrarFuncoesImportadasDeBibliotecasWeb(declaracao);
        return Promise.resolve();
    }

    override visitarChamadaPorVariavel(
        entidadeChamadaVariavel: Variavel,
        argumentos: ConstrutoInterface[]
    ): Promise<void> {
        const nomeFuncao = entidadeChamadaVariavel.simbolo.lexema;
        if (this.funcoesImportadasDeBibliotecasWeb.has(nomeFuncao)) {
            return Promise.resolve();
        }

        return super.visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos);
    }

    override async analisar(
        declaracoes: Declaracao[]
    ): Promise<RetornoAnalisadorSemanticoInterface> {
        this.funcoesImportadasDeBibliotecasWeb = new Set<string>();
        return super.analisar(declaracoes);
    }
}