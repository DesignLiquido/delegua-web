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
		prefixo: "enquanto",
		corpo: [
			"var ${1:i} = 1;",
			"enquanto (${1:i} <= 5) {",
			"\tescreva(${1:i});",
			"\t${1:i} = ${1:i} + 1;",
			"}"
		],
		descricao: "Laço de repetição \"enquanto\""
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
			"\tescreva('correspondente 1');",
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
	{
		prefixo: "interface",
		corpo: [
			"interface ${1:NomeDaInterface} {",
			"\t${2:nomePropriedade}: ${3:tipo};",
			"\t${4:nomeMetodo}(${5:param}: ${6:tipo}): ${7:tipoRetorno};",
			"}"
		],
		descricao: "Declaração de interface"
	},
	{
		prefixo: "classe abstrata",
		corpo: [
			"classe abstrata ${1:NomeDaClasse} {",
			"\tabstrato {",
			"\t\t${2:metodoAbstrato}(): ${3:tipo};",
			"\t}",
			"\tpublico {",
			"\t\t${4:metodoConceto}(): ${5:tipo} {",
			"\t\t\tretorna ${6:nulo};",
			"\t\t}",
			"\t}",
			"}"
		],
		descricao: "Declaração de classe abstrata"
	},
	{
		prefixo: "classe implementa",
		corpo: [
			"classe ${1:NomeDaClasse} implementa ${2:Interface} {",
			"\tpublico {",
			"\t\t${3:metodo}(): ${4:tipo} {",
			"\t\t\tretorna ${5:nulo};",
			"\t\t}",
			"\t}",
			"}"
		],
		descricao: "Classe que implementa uma interface"
	},
	{
		prefixo: "classe herda multipla",
		corpo: [
			"classe ${1:NomeDaClasse} herda ${2:SuperclasseA}, ${3:SuperclasseB} {",
			"\tconstrutor() {",
			"\t\tsuper.construtor();",
			"\t}",
			"}"
		],
		descricao: "Classe com herança múltipla"
	},
	{
		prefixo: "classe com construtor",
		corpo: [
			"classe ${1:NomeDaClasse} {",
			"\tprivado {",
			"\t\t${2:atributo}: ${3:tipo};",
			"\t}",
			"\tconstrutor(${2:atributo}: ${3:tipo}) {",
			"\t\tisto.${2:atributo} = ${2:atributo};",
			"\t}",
			"\tpublico {",
			"\t\tobter${4:Atributo}(): ${3:tipo} {",
			"\t\t\tretorna isto.${2:atributo};",
			"\t\t}",
			"\t}",
			"}"
		],
		descricao: "Classe com construtor e modificadores de acesso"
	},
	{
		prefixo: "docstring",
		corpo: [
			"/**",
			" * ${1:Descrição da função ou classe}",
			" * @param ${2:parametro} ${3:Descrição do parâmetro}",
			" * @retorna ${4:Descrição do retorno}",
			" */"
		],
		descricao: "Documentação (docstring) para funções e classes"
	},
]
