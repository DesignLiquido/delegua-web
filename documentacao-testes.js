"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentacaoModuloGrupo = exports.DocumentacaoModuloTeste = exports.DocumentacaoModuloAfirmar = void 0;
exports.DocumentacaoModuloAfirmar = {
    igual: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'esperado' },
            { nome: 'obtido' }
        ],
        documentacao: `# \`afirmar.igual(esperado, obtido)\`\n\n` +
            'Verifica se `esperado` e `obtido` são iguais. Se forem diferentes, lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("soma dois números", funcao() {\n' +
            '    afirmar.igual(4, 2 + 2)\n' +
            '})\n' +
            '```\n'
    },
    diferente: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'valorA' },
            { nome: 'valorB' }
        ],
        documentacao: `# \`afirmar.diferente(valorA, valorB)\`\n\n` +
            'Verifica se `valorA` e `valorB` são diferentes. Se forem iguais, lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("nomes devem ser diferentes", funcao() {\n' +
            '    afirmar.diferente("Ana", "Bia")\n' +
            '})\n' +
            '```\n'
    },
    verdadeiro: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'valor' }
        ],
        documentacao: `# \`afirmar.verdadeiro(valor)\`\n\n` +
            'Verifica se `valor` é verdadeiro (ou um valor equivalente a verdadeiro). Se for falso, lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("número é positivo", funcao() {\n' +
            '    afirmar.verdadeiro(5 > 0)\n' +
            '})\n' +
            '```\n'
    },
    falso: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'valor' }
        ],
        documentacao: `# \`afirmar.falso(valor)\`\n\n` +
            'Verifica se `valor` é falso (ou um valor equivalente a falso). Se for verdadeiro, lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("número não é negativo", funcao() {\n' +
            '    afirmar.falso(5 < 0)\n' +
            '})\n' +
            '```\n'
    },
    nulo: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'valor' }
        ],
        documentacao: `# \`afirmar.nulo(valor)\`\n\n` +
            'Verifica se `valor` é `nulo` (ou indefinido). Se não for, lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("busca sem resultado retorna nulo", funcao() {\n' +
            '    afirmar.nulo(encontrar([1, 2, 3], funcao(v) { retorna v > 10 }))\n' +
            '})\n' +
            '```\n'
    },
    erro: {
        tipoRetorno: 'vazio',
        argumentos: [
            { nome: 'funcao' }
        ],
        documentacao: `# \`afirmar.erro(funcao)\`\n\n` +
            'Executa `funcao` e espera que ela lance um erro. Se `funcao` terminar sem lançar nenhum erro, `afirmar.erro` lança um erro de assertiva que marca o teste atual como falho.\n' +
            '\n\n## Exemplo de Código\n\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("dividir por zero lança erro", funcao() {\n' +
            '    afirmar.erro(funcao() {\n' +
            '        lancarErro("divisão por zero")\n' +
            '    })\n' +
            '})\n' +
            '```\n'
    }
};
const documentacaoPular = (funcaoOuGrupo) => ({
    tipoRetorno: 'vazio',
    argumentos: [
        { nome: 'nome' },
        { nome: 'funcao' }
    ],
    documentacao: `# \`${funcaoOuGrupo}.pular(nome, funcao)\`\n\n` +
        `Declara ${funcaoOuGrupo === 'teste' ? 'um teste' : 'um grupo de testes'} que não será executado. ` +
        'Aparece no painel de resultados com o status `pulado`. Útil para desativar temporariamente um caso sem removê-lo do código.\n' +
        '\n\n## Exemplo de Código\n\n' +
        '```delegua\n' +
        `importar { ${funcaoOuGrupo} } de "testes"\n\n` +
        `${funcaoOuGrupo}.pular("ainda não implementado", funcao() {\n` +
        '    // ...\n' +
        '})\n' +
        '```\n'
});
const documentacaoApenas = (funcaoOuGrupo) => ({
    tipoRetorno: 'vazio',
    argumentos: [
        { nome: 'nome' },
        { nome: 'funcao' }
    ],
    documentacao: `# \`${funcaoOuGrupo}.apenas(nome, funcao)\`\n\n` +
        `Marca ${funcaoOuGrupo === 'teste' ? 'um teste' : 'um grupo'} como exclusivo: quando ao menos um \`.apenas\` existe dentro do mesmo grupo, ` +
        'somente os itens marcados são executados, e os demais são ignorados. Útil para focar em um caso durante o desenvolvimento.\n' +
        '\n\n## Exemplo de Código\n\n' +
        '```delegua\n' +
        `importar { ${funcaoOuGrupo} } de "testes"\n\n` +
        `${funcaoOuGrupo}.apenas("investigando esta falha", funcao() {\n` +
        '    // Somente este item (e outros marcados com .apenas) roda.\n' +
        '})\n' +
        '```\n'
});
exports.DocumentacaoModuloTeste = {
    pular: documentacaoPular('teste'),
    apenas: documentacaoApenas('teste'),
};
exports.DocumentacaoModuloGrupo = {
    pular: documentacaoPular('grupo'),
    apenas: documentacaoApenas('grupo'),
};
