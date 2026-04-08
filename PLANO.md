# PLANO.md — Substituição de `window.prompt()` por Modal HTML Assíncrono (Issue #63)

## 1. Contexto e Causa Raiz

### O problema

A função `leia()` em Delégua chama `interfaceEntradaSaida.question(mensagem, callback)` definida em `index.ts` (linhas 65–70). A implementação atual usa `window.prompt()`, que é **síncrona e bloqueante**: o navegador suspende todo o processo de renderização enquanto o diálogo estiver aberto. Como resultado, dentro de um laço `enquanto`, toda a saída produzida por `escreva()` fica represada no buffer de renderização até o programa terminar, pois o browser nunca ganha controle do event loop para pintar os novos `<p>` no `#resultadoEditor`.

### Por que o fix é viável

O método `visitarExpressaoLeia` no interpretador base (em `@designliquido/delegua`) já envolve `question` numa `Promise`:

```js
return new Promise((resolucao) =>
    this.interfaceEntradaSaida.question(mensagem, (resposta) => {
        resolucao(resposta);
    })
);
```

Basta que `question` adie a chamada do `callback` de forma assíncrona para que o interpretador pause ali, ceda o controle ao event loop, e o browser pinte tudo que estava pendente antes de abrir o diálogo de entrada.

O laço `enquanto` é totalmente `async/await` (`logicaComumExecucaoEnquanto` usa `await this.executar(...)`), de modo que pausar em `leia()` já funciona corretamente — o único problema é que `window.prompt()` não cede o controle.

---

## 2. Visão Geral da Solução

Substituir `window.prompt()` por um modal HTML construído com:
- Um `<div>` com overlay posicionado fixo.
- Um `<input type="text">` para a digitação.
- Botões "OK" e "Cancelar" (e suporte a Enter/Escape).
- Uma `Promise` que resolve com o valor digitado (OK/Enter) ou `null` (Cancelar/Escape).

A `Promise` é criada dentro de `question` e o `callback` do interpretador é chamado apenas na resolução, de modo que o interpretador permanece suspenso (via `await`) enquanto o modal está visível, permitindo que o event loop pinte os resultados pendentes antes de mostrar o modal.

---

## 3. Mudanças Necessárias por Arquivo

### 3.1 `index.html` — Estrutura do modal

Adicionar o HTML do modal imediatamente antes de `</body>`.

```html
<!-- Modal de entrada para leia() -->
<div id="modalLeia" class="modal-leia-overlay" role="dialog" aria-modal="true"
     aria-labelledby="modalLeiaLabel" style="display:none;">
  <div class="modal-leia-caixa">
    <label id="modalLeiaLabel" class="modal-leia-mensagem" for="modalLeiaInput"></label>
    <input id="modalLeiaInput" type="text" class="modal-leia-input"
           autocomplete="off" spellcheck="false" />
    <div class="modal-leia-botoes">
      <button id="modalLeiaOk" class="modal-leia-btn modal-leia-btn-ok">OK</button>
      <button id="modalLeiaCancelar" class="modal-leia-btn modal-leia-btn-cancelar">Cancelar</button>
    </div>
  </div>
</div>
```

**Notas de acessibilidade:**
- `role="dialog"` e `aria-modal="true"` informam tecnologias assistivas.
- `aria-labelledby="modalLeiaLabel"` vincula a mensagem ao diálogo.
- `for="modalLeiaInput"` vincula o label ao campo de texto.

**Atenção ao build:** O arquivo fonte fica na raiz e é copiado para `dist/index.html` via `copy-files-from-to`. Qualquer alteração na raiz será refletida após `yarn empacotar`.

---

### 3.2 `scss/estilos.scss` — Estilos do modal

Adicionar ao final do arquivo (as regras de dark mode devem ser inseridas **dentro** do bloco `body[data-tema="escuro"] { ... }` já existente):

```scss
// Modal de entrada para leia()
.modal-leia-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-leia-caixa {
    background-color: variaveis.$branco;
    border: 1px solid variaveis.$borda;
    border-radius: 4px;
    padding: 20px 24px;
    min-width: 320px;
    max-width: 90vw;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.modal-leia-mensagem {
    font-size: 14px;
    color: variaveis.$preto;
}

.modal-leia-input {
    border: 1px solid variaveis.$borda;
    border-radius: 3px;
    padding: 6px 8px;
    font-family: "Roboto Mono", monospace;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
    color: variaveis.$preto;
    background-color: variaveis.$branco;

    &:focus {
        outline: 2px solid #0078d4;
        outline-offset: 1px;
    }
}

.modal-leia-botoes {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.modal-leia-btn {
    cursor: pointer;
    border-radius: 3px;
    padding: 5px 16px;
    font-size: 13px;
    font-family: inherit;
    border: 1px solid transparent;

    &-ok {
        background-color: #0078d4;
        color: #fff;
        border-color: #0078d4;
        &:hover { background-color: #106ebe; }
        &:active { background-color: #005a9e; }
    }

    &-cancelar {
        background-color: transparent;
        color: variaveis.$preto;
        border-color: variaveis.$borda;
        &:hover { background-color: variaveis.$claro; }
    }
}
```

**Regras de dark mode** (inserir dentro do bloco `body[data-tema="escuro"] { }` existente):

```scss
.modal-leia-caixa {
    background-color: #2d2d2d;
    border-color: #3c3c3c;
}

.modal-leia-mensagem {
    color: #d4d4d4;
}

.modal-leia-input {
    background-color: #3c3c3c;
    border-color: #555;
    color: #d4d4d4;
}

.modal-leia-btn-cancelar {
    color: #d4d4d4;
    border-color: #555;
    &:hover { background-color: #3c3c3c; }
}
```

---

### 3.3 `index.ts` — Implementação da função `question` assíncrona

Substituir o bloco nas linhas 65–70:

**Antes:**
```typescript
(this.interpretador as any).interfaceEntradaSaida = {
    question: (mensagem: string, callback: (resposta: any) => any) => {
        const resposta = window.prompt(mensagem);
        callback(resposta);
    }
}
```

**Depois:**
```typescript
(this.interpretador as any).interfaceEntradaSaida = {
    question: (mensagem: string, callback: (resposta: any) => any) => {
        const overlay     = document.getElementById('modalLeia')        as HTMLElement;
        const labelEl     = document.getElementById('modalLeiaLabel')   as HTMLLabelElement;
        const inputEl     = document.getElementById('modalLeiaInput')   as HTMLInputElement;
        const btnOk       = document.getElementById('modalLeiaOk')      as HTMLButtonElement;
        const btnCancelar = document.getElementById('modalLeiaCancelar') as HTMLButtonElement;
        const botaoExecutar = document.getElementById('botaoExecutar')  as HTMLButtonElement;

        labelEl.textContent = mensagem || '> ';
        inputEl.value = '';
        overlay.style.display = 'flex';
        botaoExecutar.disabled = true;
        requestAnimationFrame(() => inputEl.focus());

        const resolver = (valor: string | null) => {
            overlay.style.display = 'none';
            botaoExecutar.disabled = false;
            inputEl.removeEventListener('keydown', onKeydown);
            btnOk.removeEventListener('click', onOk);
            btnCancelar.removeEventListener('click', onCancelar);
            callback(valor);
        };

        const onOk       = () => resolver(inputEl.value);
        const onCancelar = () => resolver(null);
        const onKeydown  = (e: KeyboardEvent) => {
            if (e.key === 'Enter')  { e.preventDefault(); resolver(inputEl.value); }
            if (e.key === 'Escape') { e.preventDefault(); resolver(null); }
        };

        btnOk.addEventListener('click', onOk);
        btnCancelar.addEventListener('click', onCancelar);
        inputEl.addEventListener('keydown', onKeydown);
    }
};
```

**Por que isso funciona:** `question` retorna sem chamar `callback`. A `Promise` criada pelo interpretador em `visitarExpressaoLeia` permanece pendente, e o `await` no laço `enquanto` cede o controle ao event loop. O browser pode pintar os `<p>` de `escreva()` e renderizar o modal antes de aguardar a interação do usuário.

---

### 3.4 `editor.ts` — Nenhuma mudança necessária

`mostrarResultadoExecutar` já é correto. O problema era que o browser nunca pintava os elementos enquanto `window.prompt()` bloqueava o JS. Com o modal assíncrono, cada `await` em `leia()` libera o event loop para renderizar.

### 3.5 `interpretador-web.ts` — Nenhuma mudança necessária

A mecânica de `leia()`/`interfaceEntradaSaida` é herdada de `InterpretadorBase`. Nenhuma mudança necessária.

---

## 4. Edge Cases

### 4.1 Usuário cancela (Cancelar ou Escape)
`callback(null)` é chamado — espelha o comportamento original de `window.prompt()` cancelado. O código Delégua receberá `nulo` como resultado de `leia()`.

### 4.2 Chamadas concorrentes a `leia()`
Não ocorrem. O interpretador é single-threaded e o laço `enquanto` é serial — o interpretador só avança quando a `Promise` de `leia()` resolve. Nunca haverá dois modais abertos simultaneamente.

### 4.3 Clicar em "Executar" com modal aberto
Mitigado desabilitando `botaoExecutar` enquanto o modal estiver visível (incluído na implementação acima).

### 4.4 Mobile / teclado virtual
`align-items: center` é suficiente para o MVP. Ajustes adicionais para `visualViewport` podem ser feitos separadamente.

### 4.5 Focus trap (acessibilidade)
O modal básico não implementa focus trap completo. Para uma implementação acessível completa, Tab/Shift+Tab deveriam ser interceptados para manter o foco dentro do modal. Isso está além do escopo do bug #63.

---

## 5. Como o Fix Resolve o Bug

**Antes (com `window.prompt`):**
1. `escreva(10)` → cria `<p>` no DOM.
2. `leia()` → chama `window.prompt()` → bloqueia o JS engine.
3. Browser não pode pintar porque o JS engine está bloqueado.
4. Ciclo se repete — os `<p>` só aparecem todos juntos ao final.

**Depois (com modal assíncrono):**
1. `escreva(10)` → cria `<p>` no DOM.
2. `leia()` → `question()` é chamada, exibe modal, **retorna sem chamar callback**.
3. A `Promise` de `visitarExpressaoLeia` permanece pendente.
4. `await` no laço cede o event loop.
5. **Browser pinta o `<p>` com `10` e renderiza o modal.**
6. Usuário digita e clica OK → `callback(valor)` → `Promise` resolve.
7. Interpretador retoma, avança para a próxima iteração.

---

## 6. Sequência de Implementação

1. **`index.html`** — Adicionar HTML do modal antes de `</body>`.
2. **`scss/estilos.scss`** — Adicionar regras CSS (dentro do bloco dark mode existente para as variantes escuras).
3. **`index.ts`** — Substituir a implementação de `question` (linhas 65–70).
4. **Build** — `yarn empacotar`.
5. **Teste manual** com o programa do issue:
   ```
   var valor: inteiro = 1
   enquanto (valor > 0) {
       valor = inteiro(leia("Digite um número inteiro:"))
       escreva(valor)
   }
   ```
   Verificar que cada `escreva(valor)` aparece na tela **antes** do próximo modal de input aparecer.

---

## 7. Resumo das Alterações

| Arquivo | Tipo | Descrição |
|---|---|---|
| `index.html` | Adição | HTML do modal `<div id="modalLeia">` antes de `</body>` |
| `scss/estilos.scss` | Adição | Classes CSS do modal + variante dark mode |
| `index.ts` | Modificação | Substituição de `window.prompt()` por modal Promise-based (linhas 65–70) |
| `editor.ts` | Nenhuma | Confirmado: sem mudanças necessárias |
| `interpretador-web.ts` | Nenhuma | Confirmado: sem mudanças necessárias |
