# Site trilíngue (PT / ES / EN) - Design

Data: 2026-06-21

## Objetivo
Tornar o site do AI Horizon Labs trilíngue (Português, Espanhol, Inglês),
com troca de idioma no cliente, sem framework e sem mudar a hospedagem
(GitHub Pages estático).

## Decisões (brainstorming)
1. **Arquitetura**: toggle client-side. Um único conjunto de arquivos HTML.
   Textos marcados com `data-i18n`; um seletor de idioma na navbar troca o
   texto via JS; preferência salva em `localStorage`.
2. **Escopo de conteúdo**: apenas as strings de UI agora. O conteúdo dinâmico
   vindo de `_content/*.md` (bios, projetos, notícias, prêmios, publicações),
   renderizado por `content-loader.js` e pelos scripts inline, permanece em
   português em todos os idiomas. `content-loader.js`, `content-data.js` e o
   script de prêmios de `premios.html` NÃO são alterados.
3. **Idioma padrão e URL**: visitante novo vê PT. Visitante recorrente vê a
   escolha salva. Parâmetro `?lang=pt|es|en` força e torna o link compartilhável.

## Arquitetura

### Camada de tradução
- Novo arquivo `assets/js/i18n.js`, carregado **antes** de `main.js` em todas as
  páginas alcançáveis.
- PT é a fonte da verdade: fica no próprio HTML. O dicionário só guarda ES e EN.
- `I18N_STRINGS = { es: { chave: "..." }, en: { chave: "..." } }`.

### Runtime (`i18n.js`)
1. `resolveLang()`: `?lang=` (se pt/es/en) -> `localStorage.ailabs_lang` -> `'pt'`.
2. No `DOMContentLoaded`: cacheia o `innerHTML` original (PT) de cada elemento
   `[data-i18n]` e os valores originais de atributos `[data-i18n-attr]` num `Map`.
3. `applyLang(lang)`:
   - `pt`: restaura do cache.
   - `es`/`en`: usa `I18N_STRINGS[lang][chave]`; se faltar, mantém o cache (PT).
   - Atualiza `<html lang>` para `pt-BR` / `es` / `en`.
   - Marca o botão ativo no seletor.
4. `setLang(lang)`: salva em `localStorage`, atualiza `?lang=` via
   `history.replaceState` (sem recarregar) e chama `applyLang`.

### Marcação
- `data-i18n="chave"`: traduz o `innerHTML` do elemento (suporta `<strong>` etc.).
- `data-i18n-attr="attr|chave"`: traduz um atributo (ex.: `content|meta.desc` no
  `<meta name="description">`, `aria-label|nav.toggle`). Múltiplos separados por `;`.
- `<title data-i18n="...">` traduz o título da aba.

### Seletor de idioma (UI)
- Bloco `.lang-switcher` na navbar com três botões: `PT | ES | EN`, ativo destacado.
- Estilo em `assets/css/style.css`, coerente com a navbar; no mobile entra no menu.

### Chaves
- Compartilhadas: `nav.*`, `footer.*`, `cta.*` comuns.
- Por página: prefixo (`home.*`, `sobre.*`, `linhas.*`, `projetos.*`,
  `membros.*`, `publicacoes.*`, `premios.*`, `noticias.*`, `contato.*`, `marca.*`).

## Páginas afetadas (10 alcançáveis)
index, sobre, linhas-de-pesquisa, projetos, membros, publicacoes, premios,
noticias, contato, logomarca.
`premiacoes-excelencia.html` é órfã (não linkada) e fica de fora.

## Fora de escopo
- Tradução do conteúdo de `_content/*.md` e da saída do `content-loader.js`.
- Geração de páginas por idioma / mudança de URLs / mudança no `build-content.py`.
- Detecção automática do idioma do navegador.

## Verificação
- `node --check assets/js/i18n.js` (sintaxe).
- Conferência manual: trocar PT/ES/EN troca toda a UI estática; `?lang=en`
  abre em inglês; recarregar mantém o idioma; conteúdo dinâmico segue em PT.
