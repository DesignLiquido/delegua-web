"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodosBibliotecaGlobal = void 0;
exports.metodosBibliotecaGlobal = [
    {
        nome: 'aleatorio',
        documentacao: '### Descrição \n \n' +
            'Retorna um número aleatório entre 0 e 1.' +
            '\n\n ### Exemplo de Códig  o ' +
            '\n    var numeroAleatorio = aleatorio();    ' +
            '\n    escreva(numeroAleatorio);    ' +
            '\n    // 0.8540051495195808    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'aleatorio()'
    },
    {
        nome: 'aleatorioEntre',
        documentacao: '### Descrição \n \n' +
            'Retorna um número inteiro aleatório entre os valores passados para a função.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var numeroAleatorio = aleatorioEntre(1, 9);    ' +
            '\n    escreva(numeroAleatorio); // Retornará um valor entre 1 e 8.    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'aleatorioEntre(numero minimo, numero maximo)'
    },
    {
        nome: 'escreva',
        documentacao: 'Escreve um ou mais argumentos na saída padrão da aplicação. \n' +
            '## Interpolação \n' +
            'Delégua suporta interpolação de variáveis: \n \n' +
            '    var comidaFavorita = \'strogonoff\'     \n' +
            '    escreva("Minha comida favorita é ${comidaFavorita}")     ',
        exemploCodigo: 'função escreva(...argumentos)'
    },
    {
        nome: 'filtrarPor',
        documentacao: '### Descrição \n \n' +
            'Retorna uma lista de elementos filtrados de um vetor.' +
            '\n\n ### Exemplo de Código ' +
            '\n    javascript var listaDeIdades = [91, 32, 15, 44, 12, 18, 101];     ' +
            '\n    funcao checarIdade(idade) { retorna(idade >= 18); }    ' +
            '\n    escreva(filtrarPor(listaDeIdades, checarIdade)); // [91, 32, 44, 18, 101]     ' +
            +'\n\n     ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'filtrarPor(meuVetor, minhaFuncaoParaValidar)'
    },
    {
        nome: 'inteiro',
        documentacao: '### Descrição \n \n' +
            'Converte um número flutuante ou texto, que não apresente letras, em um número inteiro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var testeTexto = "111";    ' +
            '\n    escreva(111 + inteiro(testeTexto));    ' +
            '\n    // 222    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'inteiro("123")'
    },
    {
        nome: 'numero',
        assinaturas: [
            {
                formato: 'numero(valor: inteiro ou texto)',
                parametros: [
                    {
                        nome: 'valor',
                        documentacao: 'O valor a ser convertido em número (real, ou com porção decimal).'
                    }
                ]
            }
        ],
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro, ou texto, que não apresente letras, em um número com porção decimal.' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar testeTexto = "111.11";' +
            '\n\nescreva(111 + numero(testeTexto)); // 222.11\n```' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'função numero("123.45")',
    },
    {
        nome: 'número',
        assinaturas: [
            {
                formato: 'número(valor: inteiro ou texto)',
                parametros: [
                    {
                        nome: 'valor',
                        documentacao: 'O valor a ser convertido em número (real, ou com porção decimal).'
                    }
                ]
            }
        ],
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro, ou texto, que não apresente letras, em um número com porção decimal.' +
            '\n\n ### Exemplo de Código\n' +
            '\n\n```delegua\nvar testeTexto = "111.11";' +
            '\n\nescreva(111 + número(testeTexto)); // 222.11\n```' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'função número("123.45")',
    },
    {
        nome: 'real',
        documentacao: '### Descrição \n \n' +
            'Converte um número inteiro ou texto, que não apresente letras, em um número flutuante.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var testeTexto = "504.69";    ' +
            '\n    escreva(0.01 + real(testeTexto));    ' +
            '\n    // 504.7    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'real(texto)'
    },
    {
        nome: 'texto',
        documentacao: '### Descrição \n \n' +
            'Transforma números flutuantes ou inteiros em texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    texto(7)    ' +
            '\n \n ### Formas de uso  \n',
        exemploCodigo: 'texto(1234)'
    },
];
