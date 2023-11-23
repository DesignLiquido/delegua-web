var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ordenarPrimitivaPorNome = function (a, b) {
    var nome1 = a.nome.toUpperCase();
    var nome2 = b.nome.toUpperCase();
    if (nome1 > nome2)
        return 1;
    else if (nome1 < nome2)
        return -1;
    return 0;
};
var primitivas = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], primitivasNumero, true), primitivasTexto, true), primitivasVetor, true), metodosBibliotecaGlobal, true).sort(ordenarPrimitivaPorNome);
