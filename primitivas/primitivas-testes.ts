import { IPrimitiva } from "./primitiva-interface";

type PrimitivasTestes = IPrimitiva[];

export const primitivasTestes: PrimitivasTestes = [
    {
        nome: 'teste',
        documentacao: '### Descrição\n\n' +
            'Declara e executa um teste automatizado com uma descrição e uma função. ' +
            'Requer `importar { teste } de "testes";`. Se nenhuma assertiva de `afirmar` falhar dentro da função, o teste é registrado como aprovado.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { afirmar, teste } de "testes"\n\n' +
            'teste("soma dois números", funcao() {\n' +
            '    afirmar.igual(4, 2 + 2)\n' +
            '})\n' +
            '```',
        exemploCodigo: 'teste("descrição", funcao() { })'
    },
    {
        nome: 'grupo',
        documentacao: '### Descrição\n\n' +
            'Agrupa vários `teste`s (ou outros `grupo`s aninhados) sob um mesmo nome de suíte. ' +
            'Requer `importar { grupo } de "testes";`. Os testes dentro do grupo só são executados após toda a função do grupo ser percorrida para coletá-los.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { afirmar, teste, grupo } de "testes"\n\n' +
            'grupo("Matemática", funcao() {\n' +
            '    teste("soma dois números", funcao() {\n' +
            '        afirmar.igual(4, 2 + 2)\n' +
            '    })\n' +
            '})\n' +
            '```',
        exemploCodigo: 'grupo("descrição do grupo", funcao() { })'
    },
    {
        nome: 'antesDeCada',
        documentacao: '### Descrição\n\n' +
            'Registra uma função executada antes de cada `teste` do `grupo` atual. Requer `importar { antesDeCada } de "testes";`.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { antesDeCada, teste, grupo } de "testes"\n\n' +
            'grupo("Preparação", funcao() {\n' +
            '    antesDeCada(funcao() {\n' +
            '        escreva("Preparando teste...")\n' +
            '    })\n' +
            '})\n' +
            '```',
        exemploCodigo: 'antesDeCada(funcao() { })'
    },
    {
        nome: 'antesDeTodos',
        documentacao: '### Descrição\n\n' +
            'Registra uma função executada uma única vez, antes de todos os testes coletados no `grupo` atual. Requer `importar { antesDeTodos } de "testes";`.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { antesDeTodos, teste, grupo } de "testes"\n\n' +
            'grupo("Configuração", funcao() {\n' +
            '    antesDeTodos(funcao() {\n' +
            '        escreva("Configurando suíte...")\n' +
            '    })\n' +
            '})\n' +
            '```',
        exemploCodigo: 'antesDeTodos(funcao() { })'
    },
    {
        nome: 'depoisDeCada',
        documentacao: '### Descrição\n\n' +
            'Registra uma função executada após cada `teste` do `grupo` atual. Requer `importar { depoisDeCada } de "testes";`.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { depoisDeCada, teste, grupo } de "testes"\n\n' +
            'grupo("Limpeza", funcao() {\n' +
            '    depoisDeCada(funcao() {\n' +
            '        escreva("Limpando estado...")\n' +
            '    })\n' +
            '})\n' +
            '```',
        exemploCodigo: 'depoisDeCada(funcao() { })'
    },
    {
        nome: 'depoisDeTodos',
        documentacao: '### Descrição\n\n' +
            'Registra uma função executada uma única vez, após todos os testes do `grupo` atual. Requer `importar { depoisDeTodos } de "testes";`.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { depoisDeTodos, teste, grupo } de "testes"\n\n' +
            'grupo("Encerramento", funcao() {\n' +
            '    depoisDeTodos(funcao() {\n' +
            '        escreva("Suíte concluída.")\n' +
            '    })\n' +
            '})\n' +
            '```',
        exemploCodigo: 'depoisDeTodos(funcao() { })'
    },
    {
        nome: 'lancarErro',
        documentacao: '### Descrição\n\n' +
            'Lança manualmente um erro de assertiva com a mensagem informada, marcando o teste atual como falho. ' +
            'Útil para condições de falha personalizadas que não se encaixam nos métodos de `afirmar`. Requer `importar { lancarErro } de "testes";`.' +
            '\n\n### Exemplo de Código\n' +
            '```delegua\n' +
            'importar { lancarErro, teste } de "testes"\n\n' +
            'teste("condição inesperada", funcao() {\n' +
            '    lancarErro("Este caminho não deveria ser alcançado")\n' +
            '})\n' +
            '```',
        exemploCodigo: 'lancarErro("mensagem")'
    }
];
