var primitivasVetor = [
    {
        nome: 'mapear',
        documentacao: 'Percorre um vetor executando uma função para cada item desse mesmo vetor.',
        exemplo: null
    },
    {
        nome: 'adicionar',
        documentacao: '### Descrição \n \n' +
            'Escreve um ou mais argumentos na saída padrão da aplicação.' +
            '\n\n ### Exemplo de Código ' +
            '\n    v.adicionar(7)    ' +
            '\n    v.adicionar(5)    ' +
            '\n    v.adicionar(3)    ' +
            '\n    escreva(v) // [7, 5, 3]    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.adicionar(elemento)'
    },
    {
        nome: 'concatenar',
        documentacao: '### Descrição \n \n' +
            'Adiciona ao conteúdo do vetor um ou mais elementos' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [7, 5, 3]    ' +
            '\n    escreva(v.concatenar([1, 2, 4])) // [7, 5, 3, 1, 2, 4]    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.concatenar(...argumentos)'
    },
    {
        nome: 'empilhar',
        documentacao: '### Descrição \n \n' +
            'Adiciona um elemento ao final do vetor.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = []     ' +
            '\n    v.empilhar(7)    ' +
            '\n    v.empilhar(5)    ' +
            '\n    v.empilhar(3)    ' +
            '\n    escreva(v) // [7, 5, 3]     ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.empilhar(conteúdo)'
    },
    {
        nome: 'fatiar',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do vetor, dadas posições de início e fim. \n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3, 4, 5]     ' +
            '\n    escreva(v.fatiar()) // "[1, 2, 3, 4, 5]", ou seja, não faz coisa alguma.     ' +
            '\n    escreva(v.fatiar(2, 4)) // "[3, 4]"    ' +
            '\n    escreva(v.fatiar(2)) // "[3, 4, 5]", ou seja, seleciona tudo da posição 3 até o final do vetor.     ' +
            '\n \n ### Formas de uso  \n' +
            'Fatiar suporta sobrecarga do método\n \n',
        exemplo: 'vetor.fatiar(a partir desta posicao)\n\n' +
            '    vetor.fatiar(a partir desta posicao, ate esta posicao)    '
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do vetor, dadas posições de início e fim. \n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3]    ' +
            '\n    escreva(v.inclui(2)) // verdadeiro    ' +
            '\n    escreva(v.inclui(4)) // falso    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.inclui(elemento)'
    },
    {
        nome: 'inverter',
        documentacao: '### Descrição \n \n' +
            'Inverte a ordem dos elementos de um vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var v = [1, 2, 3]     ' +
            '\n    escreva(v.inverter()) // [3, 2, 1]     ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.inverter()'
    },
    {
        nome: 'ordenar',
        documentacao: '### Descrição \n \n' +
            'Ordena valores em ordem crescente. Esta função só aceita vetores.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    // A ordenação padrão é ascendente, ou seja, para o caso de números, a ordem fica do menor para o maior.    ' +
            '\n    var v = [4, 2, 12, 5]     ' +
            '\n    escreva(v.ordenar()) // [2, 4, 5, 12]     ' +
            '\n    // Para o caso de textos, a ordenação é feita em ordem alfabética, caractere a caractere.    ' +
            '\n    var v = ["aaa", "a", "aba", "abb", "abc"]    ' +
            '\n    escreva(v.ordenar()) // ["a", "aaa", "aba", "abb", "abc"]    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.ordenar()'
    },
    {
        nome: 'remover',
        documentacao: '### Descrição \n \n' +
            'Remove um elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]     ' +
            '\n    vetor.remover(2)     ' +
            '\n    escreva(vetor) // [1, 3]     ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.remover(elemento)'
    },
    {
        nome: 'removerPrimeiro',
        documentacao: '### Descrição \n \n' +
            'Remove o primeiro elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]    ' +
            '\n    var primeiroElemento = vetor.removerPrimeiro()    ' +
            '\n    escreva(primeiroElemento) // 1    ' +
            '\n    escreva(vetor) // [2, 3]    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.removerPrimeiro()'
    },
    {
        nome: 'removerUltimo',
        documentacao: '### Descrição \n \n' +
            'Remove o último elemento do vetor caso o elemento exista no vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3]    ' +
            '\n    var ultimoElemento = vetor.removerUltimo()    ' +
            '\n    escreva(ultimoElemento) // 3    ' +
            '\n    escreva(vetor) // [1, 2]    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.removerUltimo()'
    },
    {
        nome: 'somar',
        documentacao: '### Descrição \n \n' +
            'Soma ou concatena todos os elementos do vetor (de acordo com o tipo de dados desses elementos) e retorna o resultado.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [1, 2, 3, 4, 5]    ' +
            '\n    escreva(vetor.somar()) // 15      ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.somar()'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição \n \n' +
            'Retorna o número de elementos que compõem o vetor.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [0, 1, 2, 3, 4]     ' +
            '\n    escreva(vetor.tamanho()) // 5     ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.tamanho()'
    },
    {
        nome: 'juntar',
        documentacao: '### Descrição \n \n' +
            'Junta os elementos de um vetor em um literal de texto, separando os elementos pelo separados passado como parâmetro.\n' +
            '\n\n ### Exemplo de Código ' +
            '\n    var vetor = [\'maçã\', \'laranja\', \'banana\', \'morango\']     ' +
            '\n    escreva(vetor.juntar(\', \')) // maçã, laranja, banana, morango      ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'vetor.juntar(separador)'
    },
];
//# sourceMappingURL=primitivas-vetor.js.map