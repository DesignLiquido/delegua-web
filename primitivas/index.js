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
    ...primitivasNumero,
    ...primitivasTexto,
    ...primitivasVetor,
    ...metodosBibliotecaGlobal
].sort(ordenarPrimitivaPorNome);
