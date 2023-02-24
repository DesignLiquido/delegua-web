const deleguaCodeSnippets = [
	{
		prefix: "para",
		body: [
			"para (var ${1:i} = 0; ${1:i} < 5; ${1:i} = ${1:i} + 1) {",
			"\tescreva(${1:i});",
			"}"
		],
		description: "Laço de repetição \"para\""
	},
	{
		prefix: "fazer enquanto",
		body: [
			"$var i = 0;",
			"$fazer { ",
			"\tescreva(i);",
			"\ti = i + 1;",
			"} enquanto(i < 5)"
		],
		description: "Laço de repetição \"fazer-enquanto\""
	},
	{
		prefix: "funcao padrao",
		body: [
			"funcao ${1:nome}() {",
			"\tescreva(\"sim!\");",
			"}"
		],
		description: "Declaração de \"funcao-padrao\""
	},
	{
		prefix: "funcao anonima",
		body: [
			"var ${1:nome} = funcao(${2:variavel}) {",
			"\tretorna ${2:variavel};",
			"}"
		],
		description: "Declaração de \"funcao-padrao\""
	},
	{
		prefix: "se",
		body: [
			"se (${1:condicao}) {",
			"\tescreva('sim');",
			"}"
		],
		description: "Declaração de \"se\""
	},
	{
		prefix: "se senao",
		body: [
			"se (${1:condicao}) {",
			"\tescreva('correspondente 1');",
			"} senao {",
			"\tescreva('correspondente 2');",
			"}"
		],
		description: "Declaração \"se-senao\""
	},
	{
		prefix: "se senaose senao",
		body: [
			"se (${1:condicao1}) {",
			"\t$escreva('correspondente 1');",
			"} senao se (${2:condicao2}) {",
			"\tescreva('correspondente 2');",
			"} senao {",
			"\tescreva('sem valor correspondente');",
			"}"
		],
		description: "Declaração \"se-senaose-senao\""
	},
	{
		prefix: "escolha",
		body: [
			"escolha (${1:chave}) {",
			"\tcaso ${2:valor}:",
			"\t\tescreva(\"Olá Mundo!\");",
			"\tpadrao:",
			"\t\tescreva(\"Valor padrão!\");",
			"}"
		],
		description: "Declaração \"escolha\""
	},
	{
		prefix: "tente pegue",
		body: [
			"tente {",
			"\tescreva(\"sucesso\");",
			"} pegue {",
			"\tescreva(\"pegue\");",
			"}"
		],
		description: "Declaração \"tente-pegue\""
	},
	{
		prefix: "tente pegue finalmente",
		body: [
			"tente {",
			"\tescreva(\"sucesso\");",
			"} pegue {",
			"\tescreva(\"pegue\");",
			"} finalmente {",
			"\tescreva(\"pronto\");",
			"}"
		],
		description: "Declaração \"tente-pegue-finalmente\""
	},
]