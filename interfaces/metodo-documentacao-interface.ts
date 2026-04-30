import { MetodoArgumento } from "./metodo-argumento-interface";

export interface MetodoDocumentacao {
    argumentos?: MetodoArgumento[];
    documentacao?: string;
    tipoRetorno?: string;
}
