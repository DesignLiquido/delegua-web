"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metodos_biblioteca_global_1 = require("./metodos-biblioteca-global");
const primitivas_dicionario_1 = require("./primitivas-dicionario");
const primitivas_numero_1 = require("./primitivas-numero");
const primitivas_texto_1 = require("./primitivas-texto");
const primitivas_vetor_1 = require("./primitivas-vetor");
const ordenarPrimitivaPorNome = (a, b) => {
    const nome1 = a.nome.toUpperCase();
    const nome2 = b.nome.toUpperCase();
    if (nome1 > nome2)
        return 1;
    else if (nome1 < nome2)
        return -1;
    return 0;
};
const primitivas = [
    ...primitivas_dicionario_1.primitivasDicionario,
    ...primitivas_numero_1.primitivasNumero,
    ...primitivas_texto_1.primitivasTexto,
    ...primitivas_vetor_1.primitivasVetor,
    ...metodos_biblioteca_global_1.metodosBibliotecaGlobal
].sort(ordenarPrimitivaPorNome);
// Registro global
globalThis.primitivas = primitivas;
