"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumirResultadosTestes = resumirResultadosTestes;
exports.formatarNomeResultadoTeste = formatarNomeResultadoTeste;
exports.rotuloStatusResultadoTeste = rotuloStatusResultadoTeste;
exports.iconeStatusResultadoTeste = iconeStatusResultadoTeste;
function resumirResultadosTestes(resultados) {
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
function formatarNomeResultadoTeste(resultado) {
    if (resultado.nomeSuite) {
        return `${resultado.nomeSuite} > ${resultado.nomeTeste}`;
    }
    return resultado.nomeTeste;
}
function rotuloStatusResultadoTeste(status) {
    switch (status) {
        case 'passou':
            return 'passou';
        case 'falhou':
            return 'falhou';
        case 'pulado':
            return 'pulado';
    }
}
function iconeStatusResultadoTeste(status) {
    switch (status) {
        case 'passou':
            return '✓';
        case 'falhou':
            return '✗';
        case 'pulado':
            return '○';
    }
}
