import { IPrimitiva } from "./primitiva-interface";

type MetodosBibliotecaGlobal = IPrimitiva[];

export const metodosBibliotecaGlobal: MetodosBibliotecaGlobal = [
    {
        nome: 'aleatorio',
        documentacao: '### Descrição\n\n' +
            'Retorna um número aleatório entre 0 e 1.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeroAleatorio = aleatorio();\n' +
            'escreva(numeroAleatorio); // 0.8540051495195808\n' +
            '```',
        exemploCodigo: 'aleatorio()'
    },
    {
        nome: 'aleatorioEntre',
        documentacao: '### Descrição\n\n' +
            'Retorna um número inteiro aleatório entre os valores passados para a função. O primeiro parâmetro é o número mínimo e o segundo é o máximo. ' +
            'O valor gerado aleatoriamente nunca será igual ao número máximo passado para a função: sempre será uma unidade a menos que o máximo.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeroAleatorio = aleatorioEntre(1, 9);\n' +
            'escreva(numeroAleatorio); // Retorna um valor entre 1 e 8\n' +
            '```',
        exemploCodigo: 'aleatorioEntre(minimo, maximo)'
    },
    {
        nome: 'clonar',
        documentacao: '### Descrição\n\n' +
            'Cria uma cópia profunda de uma variável ou constante. Diferente de uma atribuição simples, a clonagem profunda garante que modificações na cópia não afetem o valor original, ' +
            'mesmo quando se trata de estruturas de dados aninhadas como vetores, dicionários ou objetos.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var original = [1, [2, 3], 4];\n' +
            'var copia = clonar(original);\n' +
            'var subVetor = copia[1];\n' +
            'subVetor[0] = 99;\n' +
            'escreva(original[1][0]); // 2\n' +
            'escreva(copia[1][0]); // 99\n' +
            '```',
        exemploCodigo: 'clonar(valor)'
    },
    {
        nome: 'algum',
        documentacao: '### Descrição\n\n' +
            'Verifica se pelo menos um elemento do vetor satisfaz a condição fornecida pela função de teste.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'funcao ehPar(valor) { retorna valor % 2 == 0; }\n' +
            'escreva(algum(numeros, ehPar)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'algum(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrar',
        documentacao: '### Descrição\n\n' +
            'Retorna o primeiro elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrar(numeros, maiorQue10)); // 12\n' +
            '```',
        exemploCodigo: 'encontrar(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarIndice',
        documentacao: '### Descrição\n\n' +
            'Retorna o índice do primeiro elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarIndice(numeros, maiorQue10)); // 1\n' +
            '```',
        exemploCodigo: 'encontrarIndice(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarUltimo',
        documentacao: '### Descrição\n\n' +
            'Retorna o último elemento do vetor que satisfaz a função de teste fornecida, percorrendo o vetor do fim para o início.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarUltimo(numeros, maiorQue10)); // 44\n' +
            '```',
        exemploCodigo: 'encontrarUltimo(vetor, funcaoTeste)'
    },
    {
        nome: 'encontrarUltimoIndice',
        documentacao: '### Descrição\n\n' +
            'Retorna o índice do último elemento do vetor que satisfaz a função de teste fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(encontrarUltimoIndice(numeros, maiorQue10)); // 4\n' +
            '```',
        exemploCodigo: 'encontrarUltimoIndice(vetor, funcaoTeste)'
    },
    {
        nome: 'escreva',
        documentacao: '### Descrição\n\n' +
            'Escreve um ou mais argumentos na saída padrão da aplicação.\n\n' +
            '### Interpolação\n\n' +
            'Delégua suporta interpolação de variáveis:\n' +
            '```delegua\n' +
            'var comidaFavorita = "strogonoff";\n' +
            'escreva("Minha comida favorita é ${comidaFavorita}");\n' +
            '```',
        exemploCodigo: 'escreva(...argumentos)'
    },
    {
        nome: 'filtrarPor',
        documentacao: '### Descrição\n\n' +
            'Percorre um vetor executando uma função para cada item. Se o valor retornado pela função é verdadeiro, o valor testado é acumulado em um novo vetor.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetor = [1, 2, 3, 4, 5, 6];\n' +
            'var fn = funcao(valor) { retorna valor % 2 == 0; };\n' +
            'escreva(filtrarPor(vetor, fn)); // [2, 4, 6]\n' +
            '```',
        exemploCodigo: 'filtrarPor(vetor, funcaoTeste)'
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição\n\n' +
            'Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var frutas = ["maçã", "banana", "laranja"];\n' +
            'escreva(inclui(frutas, "banana")); // verdadeiro\n' +
            'escreva(inclui("Olá Mundo", "Mundo")); // verdadeiro\n' +
            '```',
        exemploCodigo: 'inclui(vetor, elemento)'
    },
    {
        nome: 'incluido',
        documentacao: '### Descrição\n\n' +
            'Sinônimo de `inclui`. Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'escreva(incluido(numeros, 3)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'incluido(vetor, elemento)'
    },
    {
        nome: 'incluído',
        documentacao: '### Descrição\n\n' +
            'Sinônimo de `inclui`. Verifica se um elemento está presente em um vetor ou texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'escreva(incluído(numeros, 3)); // verdadeiro\n' +
            '```',
        exemploCodigo: 'incluído(vetor, elemento)'
    },
    {
        nome: 'inteiro',
        documentacao: '### Descrição\n\n' +
            'Converte um número flutuante ou texto em um número inteiro.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111";\n' +
            'escreva(111 + inteiro(testeTexto)); // 222\n' +
            'escreva(inteiro(3.7)); // 3\n' +
            '```',
        exemploCodigo: 'inteiro(valor)'
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
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número com porção decimal.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111.11";\n' +
            'escreva(111 + numero(testeTexto)); // 222.11\n' +
            '```',
        exemploCodigo: 'numero(valor)'
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
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número com porção decimal.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "111.11";\n' +
            'escreva(111 + número(testeTexto)); // 222.11\n' +
            '```',
        exemploCodigo: 'número(valor)'
    },
    {
        nome: 'paraCada',
        documentacao: '### Descrição\n\n' +
            'Percorre um vetor executando uma função para cada item. Diferentemente de filtrar e mapear, o retorno da função não é observado.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetor = [1, 2, 3];\n' +
            'var fn = funcao(valor) { escreva(valor * 2); };\n' +
            'paraCada(vetor, fn);\n' +
            '// 2\n' +
            '// 4\n' +
            '// 6\n' +
            '```',
        exemploCodigo: 'paraCada(vetor, funcao)'
    },
    {
        nome: 'primeiroEmCondicao',
        documentacao: '### Descrição\n\n' +
            'Retorna o primeiro elemento do vetor que satisfaz a condição fornecida.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [5, 12, 8, 130, 44];\n' +
            'funcao maiorQue10(valor) { retorna valor > 10; }\n' +
            'escreva(primeiroEmCondicao(numeros, maiorQue10)); // 12\n' +
            '```',
        exemploCodigo: 'primeiroEmCondicao(vetor, funcaoCondicao)'
    },
    {
        nome: 'real',
        documentacao: '### Descrição\n\n' +
            'Converte um número inteiro ou texto em um número flutuante (real).' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var testeTexto = "504.69";\n' +
            'escreva(0.01 + real(testeTexto)); // 504.7\n' +
            '```',
        exemploCodigo: 'real(valor)'
    },
    {
        nome: 'reduzir',
        documentacao: '### Descrição\n\n' +
            'Executa uma função redutora para cada elemento do vetor, resultando em um único valor.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numeros = [1, 2, 3, 4, 5];\n' +
            'funcao somar(acumulador, valor) { retorna acumulador + valor; }\n' +
            'escreva(reduzir(numeros, somar, 0)); // 15\n' +
            '```',
        exemploCodigo: 'reduzir(vetor, funcaoRedutora, valorInicial)'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição\n\n' +
            'Retorna o número de elementos que compõem um vetor ou o número de caracteres de um texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var vetorNomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];\n' +
            'escreva(tamanho(vetorNomes)); // 5\n' +
            '\n' +
            'var texto = "Egua";\n' +
            'escreva(tamanho(texto)); // 4\n' +
            '```',
        exemploCodigo: 'tamanho(vetor)'
    },
    {
        nome: 'texto',
        documentacao: '### Descrição\n\n' +
            'Transforma números flutuantes ou inteiros em texto.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var numero = 7;\n' +
            'escreva(texto(numero) + " é um número"); // "7 é um número"\n' +
            '```',
        exemploCodigo: 'texto(valor)'
    },
    {
        nome: 'todosEmCondicao',
        documentacao: '### Descrição\n\n' +
            'Retorna verdadeiro se todos os elementos do vetor retornam verdadeiro ao serem aplicados como argumentos da função passada como segundo parâmetro. Retorna falso em caso contrário.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'var meuVetor = [1, 2, 3, 4, 5, 6];\n' +
            'var f1 = funcao(x) { retorna x < 10; };\n' +
            'escreva(todosEmCondicao(meuVetor, f1)); // verdadeiro\n' +
            '\n' +
            'var f2 = funcao(x) { retorna x % 2 == 0; };\n' +
            'escreva(todosEmCondicao(meuVetor, f2)); // falso\n' +
            '```',
        exemploCodigo: 'todosEmCondicao(vetor, funcaoCondicao)'
    }
];
