import { ResultadoTeste } from "@designliquido/delegua/bibliotecas/testes/registro-testes";

export interface ResumoResultadosTestes {
    passaram: number;
    falharam: number;
    pulados: number;
    tempoTotalMs: number;
}

export function resumirResultadosTestes(resultados: ResultadoTeste[]): ResumoResultadosTestes {
    let passaram = 0;
    let falharam = 0;
    let pulados = 0;
    let tempoTotalMs = 0;

    for (const resultado of resultados) {
        tempoTotalMs += resultado.tempoMs;
        switch (resultado.status) {
            case 'passou':
                passaram++;
                break;
            case 'falhou':
                falharam++;
                break;
            case 'pulado':
                pulados++;
                break;
        }
    }

    return { passaram, falharam, pulados, tempoTotalMs };
}

export function formatarNomeResultadoTeste(resultado: ResultadoTeste): string {
    if (resultado.nomeSuite) {
        return `${resultado.nomeSuite} > ${resultado.nomeTeste}`;
    }
    return resultado.nomeTeste;
}

export function rotuloStatusResultadoTeste(status: ResultadoTeste['status']): string {
    switch (status) {
        case 'passou':
            return 'passou';
        case 'falhou':
            return 'falhou';
        case 'pulado':
            return 'pulado';
    }
}

export function iconeStatusResultadoTeste(status: ResultadoTeste['status']): string {
    switch (status) {
        case 'passou':
            return '✓';
        case 'falhou':
            return '✗';
        case 'pulado':
            return '○';
    }
}
