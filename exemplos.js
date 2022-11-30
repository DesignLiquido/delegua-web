window.onload = function () {
    var exemploId = window.location.search.split('?exemploId=')[1];
    var OlaMundo = 'escreva("Olá, mundo!");';
    var OperacoesBasicas = "var a = 10;\nvar b = 4;\n\nescreva(\"Valor de A: \" + texto(a));\n\nescreva(\"Valor de B: \" + texto(b));\n\nvar soma = a + b; // Soma os dois valores\nvar sub  = a - b; // Subtrai os dois valores\nvar mult = a * b; // Multiplica os dois valores\nvar div  = a / b; // Divide os dois valores\n\nescreva(\"A soma dos n\u00FAmeros \u00E9 igual a: \" + texto(soma));\t    // Exibe o resultado da soma\nescreva(\"A subtra\u00E7\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(sub));\t    // Exibe o resultado da subtra\u00E7\u00E3o\nescreva(\"A multiplica\u00E7\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(mult));   // Exibe o resultado da multiplica\u00E7\u00E3o\nescreva(\"A divis\u00E3o dos n\u00FAmeros \u00E9 igual a: \" + texto(div));          // Exibe o resultado da divis\u00E3o";
    var Condicional = "var letra = leia('Digite uma letra:');\n\n// \u00C9 necess\u00E1rio verificar letras min\u00FAsculas e mai\u00FAsculas\nse\n  (\n    letra == 'A' ou letra == 'E' ou letra == 'I' ou letra == 'O' ou letra == 'U' ou\n    letra == 'a' ou letra == 'e' ou letra == 'i' ou letra == 'o' ou letra == 'u'\n  ){\n    escreva(\"A letra \" + letra + \" \u00E9 uma vogal!\");\n  }\nsen\u00E3o {\n  escreva(\"A letra \" + letra + \" n\u00E3o \u00E9 uma vogal!\");\n}";
    var Classe = "classe Animal {\n  correr() {\n    escreva(\"Correndo Loucamente\");\n  }\n}\nclasse Cachorro herda Animal {\n  latir() {\n    escreva(\"Au Au Au Au\");\n  }\n}\n\nvar nomeDoCachorro = Cachorro();\nnomeDoCachorro.correr();\nnomeDoCachorro.latir();";
    var MergeSort = "var vetor1 = [8, 2, 9, 5];\nvar a = 0;\nvar aux = 0;\nvar i = 0;\n\nescreva (\"Vetor: Posi\u00E7\u00E3o[0]:\" + texto(vetor1[0]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[1]:\" + texto(vetor1[1]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[2]:\" + texto(vetor1[2]));\nescreva (\"Vetor: Posi\u00E7\u00E3o[3]:\" + texto(vetor1[3]));\n\npara (i = 0; i < 3; i = i + 1)\n{\n  se (vetor1[i] > vetor1[i+1])\n  {\n    escreva (\"Vetor \" + texto(i));\n    aux = vetor1[i];\n    vetor1[i] = vetor1[i+1];\n    vetor1[i+1] = aux;\n    escreva(vetor1[i]);\n    escreva(vetor1[i+1]);\n  }\n}\n\nvar vetor2 = [vetor1[0], vetor1[1]];\nvar vetor3 = [vetor1[2], vetor1[3]];\nvar vetor4 = [];\n\npara (a = 0; a < 4; a = a + 1) {\n  escreva (\"vetor1(\" + texto(a) + \")\");\n  escreva (vetor1[a]);\n}\n\npara (a = 0; a < 2; a = a + 1) {\n  escreva (\"vetor2(\" + texto(a) + \")\");\n  escreva (vetor2[a]);\n}\n\npara (a = 0; a < 2; a = a + 1) {\n  escreva (\"vetor3(\" + texto(a) + \")\");\n  escreva (vetor3[a]);\n}\n\nse (vetor2[0] < vetor3[0] e vetor2[1] < vetor3[1]) {\n  vetor4[0] = vetor2[0];\n\n  se (vetor3[0] < vetor2[1]) {\n    vetor4[1] = vetor3[0];\n    vetor4[2] = vetor2[1];\n    vetor4[3] = vetor3[1];\n  } sen\u00E3o {\n    vetor4[1] = vetor2[1];\n    vetor4[2] = vetor3[0];\n    vetor4[3] = vetor3[1];\n  }\n}\n\npara (a = 0; a < 4; a = a + 1) {\n  escreva (\"vetor4(\" + texto(vetor4[a]) + \")\");\n}";
    var Bhaskara = "funcao bhaskara(a,b,c) {\n  // A vari\u00E1vel \"d\" vai simbolizar o Delta.\n  // \"a\", \"b\", e \"c\" ir\u00E3o representar os coeficientes da equa\u00E7\u00E3o.\n\n  var d = b ** 2;\n  var f = 4 * a * c;\n\n  d = d - f;\n\n  escreva(\"O valor de Delta \u00E9: \" + texto(d));\n\n  d = d ** 0.5;\n\n  // Encontrando os valores de X1 e X2.\n  var x1 = -b + d;\n  x1 = x1 / 2 * a;\n\n  escreva(\"O valor de X1 \u00E9: \"+ texto(x1));\n\n  var x2 = -b-d;\n  x2 = x2 / 2 * a;\n  escreva(\"O valor de X2 \u00E9: \"+ texto(x2));\n\n  // Resultado das substitui\u00E7\u00F5es de X por X1 e X2 na equa\u00E7\u00E3o.\n  var r1 = x1 ** 2;\n  r1 = a * r1;\n  r1 = b * x1 + r1;\n  r1 = r1 + c;\n  escreva(\"Substituindo X1 na equa\u00E7\u00E3o obt\u00E9m-se:\"+ texto(r1));\n\n  var r2 = x2 ** 2;\n  r2 = a * r2;\n  r2 = b * x2 + r2;\n  r2 = r2 + c;\n  escreva(\"Substituindo X2 na equa\u00E7\u00E3o obt\u00E9m-se:\"+ texto(r2));\n}\n\n// Insira o valor do coeficiente A:\nvar a = 1;\n\n// Insira o valor do coeficiente B:\nvar b = -1;\n\n// Insira o valor do coeficiente B:\nvar c = -30;\n\nbhaskara(a,b,c);";
    var Fibonacci = "// Recurs\u00E3o para o c\u00E1lculo da sequ\u00EAncia de Fibonacci\n\nfuncao fibonacci(n) {\n  se (n == 0) {\n    retorna(0);\n  }\n\n  se(n == 1) {\n    retorna(1);\n  }\n\n  var n1 = n-1;\n  var n2 = n-2;\n  var f1 = fibonacci(n1);\n  var f2 = fibonacci(n2);\n  retorna(f1 + f2);\n}\n\nvar a = fibonacci(0);\nescreva(a);\n\na = fibonacci(1);\nescreva(a);\n\na = fibonacci(2);\nescreva(a);\n\na = fibonacci(3);\nescreva(a);\n\na = fibonacci(4);\nescreva(a);\n\na = fibonacci(5);\nescreva(a);";
    var Perceptron = "var pesoInicial1 = 0.3;\nvar pesoInicial2 = 0.4;\n\nvar entrada1 = 1;\nvar entrada2 = 1;\n\nvar erro = 1;\n\nvar resultadoEsperado;\n\nenquanto (erro != 0) {\n  se (entrada1 == 1) {\n    se (entrada2 == 1) {\n      resultadoEsperado = 1;\n    }\n  } sen\u00E3o {\n    resultadoEsperado = 0;\n  }\n\n  var somatoria = pesoInicial1 * entrada1;\n  somatoria = pesoInicial2 * entrada2 + somatoria;\n\n  var resultado;\n\n  se (somatoria < 1) {\n    resultado = 0;\n  } sen\u00E3o {\n    se (somatoria >= 1) {\n      resultado = 1;\n    }\n  }\n\n  escreva(\"resultado: \" + texto(resultado));\n\n  erro = resultadoEsperado - resultado;\n\n  escreva(\"p1: \" + texto(pesoInicial1));\n  escreva(\"p2: \" + texto(pesoInicial2));\n\n  pesoInicial1 = 0.1 * entrada1 * erro + pesoInicial1;\n  pesoInicial2 = 0.1 * entrada2 * erro + pesoInicial2;\n\n  escreva(\"erro: \" + texto(erro));\n}";
    var FilaEstatica = "funcao enfileirar (valorEntrada) {\n  se (indexFinal == maximoDeElementos) {\n    escreva(\"Fila Cheia\");\n  } senao {\n    filaEstatica[indexFinal] = valorEntrada;\n    escreva(\"Valor inserido com sucesso: \" + texto(filaEstatica[indexFinal]));\n    retorna indexFinal = indexFinal + 1;\n  }\n}\n\nfun\u00E7\u00E3o desenfileirar() {\n  se (indexInicial == indexFinal) {\n    escreva(\"Fila Vazia\");\n  } senao {\n    para (i = 0; i <= indexFinal; i = i + 1)\n    {\n      se (i + 1 == indexFinal)\n      {\n        indexFinal = indexFinal - 1;\n        escreva(\"Valor retirado com sucesso.\");\n      } senao {\n        filaEstatica[i] = filaEstatica[i+1];\n      }\n    }\n  }\n}\n\nfun\u00E7\u00E3o mostrar_fila() {\n  se (indexInicial == indexFinal) {\n    escreva(\"Fila Vazia\");\n  } senao {\n    para (var i = 0; i < indexFinal; i = i + 1) {\n      escreva(\"index \" + texto(i));\n      escreva(texto(filaEstatica[i]));\n    }\n  }\n}\n\nvar maximoDeElementos = 4;\nvar indexInicial = 0;\nvar indexFinal = 0;\n\n// Variavel de controle em itera\u00E7\u00F5es\nvar i = 0;\n\nvar filaEstatica = [];\n\n// Demonstra\u00E7\u00E3o de uso das fun\u00E7\u00F5es:\nmostrar_fila();\n\nvar valorEntrada = 2;\nenfileirar(valorEntrada);\n\nvar valorEntrada = 8;\nenfileirar(valorEntrada);\n\nvar valorEntrada = 23;\nenfileirar(valorEntrada);\n\nvar valorEntrada = 7;\nenfileirar(valorEntrada);\n\nmostrar_fila();\n\ndesenfileirar();\n\nmostrar_fila();\n\nvar valorEntrada = 24;\nenfileirar(valorEntrada);\n\nmostrar_fila();";
    if (exemploId == 1) {
        editor.updateCode(OlaMundo);
        document.querySelector('#titulo-arquivo').innerHTML = 'OlaMundo.delegua';
        return;
    }
    if (exemploId == 2) {
        editor.updateCode(OperacoesBasicas);
        document.querySelector('#titulo-arquivo').innerHTML = 'OperacoesBasicas.delegua';
        return;
    }
    if (exemploId == 2) {
        editor.updateCode(OperacoesBasicas);
        document.querySelector('#titulo-arquisdvo').innerHTML = 'OperacoesBasicas.delegua';
        return;
    }
    if (exemploId == 3) {
        editor.updateCode(Condicional);
        document.querySelector('#titulo-arquivo').innerHTML = 'Condicional.delegua';
        return;
    }
    if (exemploId == 4) {
        editor.updateCode(Classe);
        document.querySelector('#titulo-arquivo').innerHTML = 'Classe.delegua';
        return;
    }
    if (exemploId == 5) {
        editor.updateCode(MergeSort);
        document.querySelector('#titulo-arquivo').innerHTML = 'MergeSort.delegua';
        return;
    }
    if (exemploId == 6) {
        editor.updateCode(Bhaskara);
        document.querySelector('#titulo-arquivo').innerHTML = 'Bhaskara.delegua';
        return;
    }
    if (exemploId == 7) {
        editor.updateCode(Fibonacci);
        document.querySelector('#titulo-arquivo').innerHTML = 'Fibonacci.delegua';
        return;
    }
    if (exemploId == 8) {
        editor.updateCode(Perceptron);
        document.querySelector('#titulo-arquivo').innerHTML = 'Perceptron.delegua';
        return;
    }
    if (exemploId == 9) {
        editor.updateCode(FilaEstatica);
        document.querySelector('#titulo-arquivo').innerHTML = 'FilaEstatica.delegua';
        return;
    }
};
//# sourceMappingURL=exemplos.js.map