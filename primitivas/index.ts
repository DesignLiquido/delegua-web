import { IPrimitiva } from "./primitiva-interface";
import { metodosBibliotecaGlobal } from "./metodos-biblioteca-global";
import { primitivasDicionario } from "./primitivas-dicionario";
import { primitivasNumero } from "./primitivas-numero";
import { primitivasTexto } from "./primitivas-texto";
import { primitivasVetor } from "./primitivas-vetor";

const ordenarPrimitivaPorNome = (a: IPrimitiva, b: IPrimitiva) => {
    const nome1 = a.nome.toUpperCase();
    const nome2 = b.nome.toUpperCase();
    
    if (nome1 > nome2) return 1;
    else if (nome1 < nome2) return -1;
    return 0;
}

const primitivas = [
    ...primitivasDicionario,
    ...primitivasNumero, 
    ...primitivasTexto, 
    ...primitivasVetor,
    ...metodosBibliotecaGlobal
].sort(ordenarPrimitivaPorNome);

// Registro global
(globalThis as any).primitivas = primitivas;