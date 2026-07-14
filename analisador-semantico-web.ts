import { AnalisadorSemantico } from "@designliquido/delegua/analisador-semantico";
import { Literal, Variavel } from "@designliquido/delegua/construtos";
import { Declaracao, Importar } from "@designliquido/delegua/declaracoes";
import { ConstrutoInterface } from "@designliquido/delegua/interfaces/construtos/construto-interface";
import { RetornoAnalisadorSemanticoInterface } from "@designliquido/delegua/interfaces/retornos/retorno-analisador-semantico-interface";

export class AnalisadorSemanticoWeb extends AnalisadorSemantico {
    private funcoesImportadasDeTestes: Set<string>;

    constructor() {
        super();
        this.funcoesImportadasDeTestes = new Set<string>();
    }

    private registrarFuncoesImportadasDeTestes(declaracao: Importar): void {
        const caminho = declaracao.caminho as Literal;
        if (caminho?.valor !== "testes") {
            return;
        }

        const funcoesDoModulo = ["teste", "grupo"];
        if (declaracao.simboloTudo) {
            for (const nome of funcoesDoModulo) {
                this.funcoesImportadasDeTestes.add(nome);
            }
            return;
        }

        for (const simboloImportado of declaracao.elementosImportacao || []) {
            if (funcoesDoModulo.includes(simboloImportado.lexema)) {
                this.funcoesImportadasDeTestes.add(simboloImportado.lexema);
            }
        }
    }

    override async visitarDeclaracaoImportar(declaracao: Importar): Promise<any> {
        this.registrarFuncoesImportadasDeTestes(declaracao);
        return Promise.resolve();
    }

    override visitarChamadaPorVariavel(
        entidadeChamadaVariavel: Variavel,
        argumentos: ConstrutoInterface[]
    ): Promise<void> {
        const nomeFuncao = entidadeChamadaVariavel.simbolo.lexema;
        if (this.funcoesImportadasDeTestes.has(nomeFuncao)) {
            return Promise.resolve();
        }

        return super.visitarChamadaPorVariavel(entidadeChamadaVariavel, argumentos);
    }

    override async analisar(
        declaracoes: Declaracao[]
    ): Promise<RetornoAnalisadorSemanticoInterface> {
        this.funcoesImportadasDeTestes = new Set<string>();
        return super.analisar(declaracoes);
    }
}