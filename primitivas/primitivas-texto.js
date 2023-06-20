var primitivasTexto = [
    {
        nome: 'aparar',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.aparar() + "|") // "|meu texto com espaços no início e no fim|"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.aparar()'
    },
    {
        nome: 'apararFim',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.apararFim() + "|") // "|   meu texto com espaços no início e no fim|"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.apararFim()'
    },
    {
        nome: 'apararInicio',
        documentacao: '### Descrição \n \n' +
            'Remover espaços em branco no início e no fim de um texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
            '\n    escreva("|" + t.apararInicio() + "|") // "|meu texto com espaços no início e no fim       |"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.apararInicio()'
    },
    {
        nome: 'concatenar',
        documentacao: '### Descrição \n \n' +
            'Realiza a junção de palavras/textos.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t1 = "um"     ' +
            '\n    var t2 = "dois três"    ' +
            '\n    escreva(t1.concatenar(t2)) // "umdois três"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.concatenar(Outro texto)'
    },
    {
        nome: 'dividir',
        documentacao: '### Descrição \n \n' +
            'Divide o texto pelo separador passado como parâmetro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "um dois três"    ' +
            '\n    t.dividir(\' \') // [\'um\',\'dois\',\'três\']    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.dividir(\'<delimitador (, ; \' \')>\')'
    },
    {
        nome: 'fatiar',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ### Exemplo de Código ' +
            '    var t = "Um dois três quatro"    ' +
            '\n    t.fatiar() // "um dois três quatro", ou seja, não faz coisa alguma.    ' +
            '\n    t.fatiar(2, 7) // "dois"    ' +
            '\n    t.fatiar(8, 12) // "três"    ' +
            '\n    t.fatiar(8) // "três quatro", ou seja, seleciona tudo da posição 8 até o final do texto.    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.fatiar(início,final)' +
            '\n    texto.fatiar(a partir da posicao)    '
    },
    {
        nome: 'inclui',
        documentacao: '### Descrição \n \n' +
            'Devolve verdadeiro se elemento passado por parâmetro está contido no texto, e falso em caso contrário.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "um dois três"    ' +
            '\n    t.inclui("dois") // verdadeiro    ' +
            '\n    t.inclui("quatro") // falso    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.inclui(\'palavra\')'
    },
    {
        nome: 'maiusculo',
        documentacao: '### Descrição \n \n' +
            'Converte todos os caracteres alfabéticos para maiúsculas.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "tudo em minúsculo"    ' +
            '\n    escreva(t.maiusculo()) // "TUDO EM MINÚSCULO"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.maiusculo()'
    },
    {
        nome: 'minusculo',
        documentacao: '### Descrição \n \n' +
            'Converte todos os caracteres alfabéticos para minúsculas.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "TUDO EM MAIÚSCULO"    ' +
            '\n    escreva(t.minusculo()) // "tudo em maiúsculo"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.minusculo()'
    },
    {
        nome: 'substituir',
        documentacao: '### Descrição \n \n' +
            'Substitui a primeira ocorrência no texto do primeiro parâmetro pelo segundo parâmetro.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Eu gosto de caju"    ' +
            '\n    t.substituir("caju", "graviola") // Resultado será "Eu gosto de graviola"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.substituir(\'palavra a ser substituída\', \'nova palavra\')'
    },
    {
        nome: 'subtexto',
        documentacao: '### Descrição \n \n' +
            'Extrai uma fatia do texto, dadas posições de início e fim.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Eu gosto de caju e de graviola"    ' +
            '\n    t.subtexto(3, 16) // Resultado será "gosto de caju"    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.subtexto(posição inicial, posição final)'
    },
    {
        nome: 'tamanho',
        documentacao: '### Descrição \n \n' +
            'Devolve um número inteiro com o número de caracteres do texto.' +
            '\n\n ### Exemplo de Código ' +
            '\n    var t = "Um dois três quatro"    ' +
            '\n    t.tamanho() // 19    ' +
            '\n \n ### Formas de uso  \n',
        exemplo: 'texto.tamanho()'
    },
];
//# sourceMappingURL=primitivas-texto.js.map