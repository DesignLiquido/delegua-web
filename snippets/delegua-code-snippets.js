const deleguaCodeSnippets = [
    {
        prefixo: "para",
        corpo: [
            "para (var ${1:i} = 0; ${1:i} < 5; ${1:i} = ${1:i} + 1) {",
            "\tescreva(${1:i});",
            "}"
        ],
        descricao: "Laço de repetição \"para\""
    },
    {
        prefixo: "fazer enquanto",
        corpo: [
            "$var i = 0;",
            "$fazer { ",
            "\tescreva(i);",
            "\ti = i + 1;",
            "} enquanto(i < 5)"
        ],
        descricao: "Laço de repetição \"fazer-enquanto\""
    },
    {
        prefixo: "funcao padrao",
        corpo: [
            "funcao ${1:nome}() {",
            "\tescreva(\"sim!\");",
            "}"
        ],
        descricao: "Declaração de \"funcao-padrao\""
    },
    {
        prefixo: "funcao anonima",
        corpo: [
            "var ${1:nome} = funcao(${2:variavel}) {",
            "\tretorna ${2:variavel};",
            "}"
        ],
        descricao: "Declaração de \"funcao-padrao\""
    },
    {
        prefixo: "se",
        corpo: [
            "se (${1:condicao}) {",
            "\tescreva('sim');",
            "}"
        ],
        descricao: "Declaração de \"se\""
    },
    {
        prefixo: "se senao",
        corpo: [
            "se (${1:condicao}) {",
            "\tescreva('correspondente 1');",
            "} senao {",
            "\tescreva('correspondente 2');",
            "}"
        ],
        descricao: "Declaração \"se-senao\""
    },
    {
        prefixo: "se senaose senao",
        corpo: [
            "se (${1:condicao1}) {",
            "\t$escreva('correspondente 1');",
            "} senao se (${2:condicao2}) {",
            "\tescreva('correspondente 2');",
            "} senao {",
            "\tescreva('sem valor correspondente');",
            "}"
        ],
        descricao: "Declaração \"se-senaose-senao\""
    },
    {
        prefixo: "escolha",
        corpo: [
            "escolha (${1:chave}) {",
            "\tcaso ${2:valor}:",
            "\t\tescreva(\"Olá Mundo!\");",
            "\tpadrao:",
            "\t\tescreva(\"Valor padrão!\");",
            "}"
        ],
        descricao: "Declaração \"escolha\""
    },
    {
        prefixo: "tente pegue",
        corpo: [
            "tente {",
            "\tescreva(\"sucesso\");",
            "} pegue {",
            "\tescreva(\"pegue\");",
            "}"
        ],
        descricao: "Declaração \"tente-pegue\""
    },
    {
        prefixo: "tente pegue finalmente",
        corpo: [
            "tente {",
            "\tescreva(\"sucesso\");",
            "} pegue {",
            "\tescreva(\"pegue\");",
            "} finalmente {",
            "\tescreva(\"pronto\");",
            "}"
        ],
        descricao: "Declaração \"tente-pegue-finalmente\""
    },
];
