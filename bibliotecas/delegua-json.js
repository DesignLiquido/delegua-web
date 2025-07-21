"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textoParaJson = textoParaJson;
exports.objetoParaTextoJson = objetoParaTextoJson;
/**
 * Converte um texto serializável JSON em um objeto JSON.
 * @param {any} _ O visitante da instrução, normalmente um interpretador.
 * @param {string} texto O texto, normalmente uma representação de JSON.
 * @returns O resultado como um objeto do JavaScript.
 */
function textoParaJson(_, texto) {
    return JSON.parse(texto);
}
/**
 * Converte um objeto do JavaScript, normalmente um dicionário Delégua, para
 * texto representando JSON.
 * @param {any} _ O visitante da instrução, normalmente um interpretador.
 * @param {any} objeto Um objeto JavaScript.
 * @returns {string} A representação do objeto em JSON.
 */
function objetoParaTextoJson(_, objeto) {
    return JSON.stringify(objeto);
}
