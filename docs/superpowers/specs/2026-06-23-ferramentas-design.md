# Design: Estatística e Página de Ferramentas

Data: 2026-06-23

## Objetivo

1. Destacar na página inicial uma estatística com o número de ferramentas publicadas pelo grupo.
2. Criar uma página dedicada de Ferramentas (`ferramentas.html`) que aponta, para cada ferramenta, o paper (SOL/SBC), PDF e o repositório GitHub.
3. Tornar a página de Ferramentas visível a partir de Publicações (callout de destaque) e do menu de navegação.

## Origem dos dados

As ferramentas vêm do Salão de Ferramentas de eventos (SBSeg, SBRC, SBSI), publicadas no track "Anais Estendidos" de `PUBLICATIONS_DATA`. Esse track mistura ferramentas com short papers que não são ferramentas, então a seleção é **curada** (não automática): entram os trabalhos que correspondem a uma ferramenta real, normalmente identificada pelo nome no início do título.

## Arquitetura

### 1. Camada de dados — `assets/js/content-data.js`
Novo array curado `TOOLS_DATA`. Cada entrada:
```js
{
  nome: "MalDataGen",
  descricao: "Framework modular para geração de dados tabulares sintéticos...",
  event: "SBSeg", year: "2025",
  link: "https://sol.sbc.org.br/...",   // página SOL/SBC do paper
  pdf:  "https://sol.sbc.org.br/...",   // PDF (opcional)
  github: "https://github.com/kayua/MalDataGen", // opcional, só quando verificado
  destaque: "Melhor Ferramenta SBSeg 2025"       // opcional
}
```
Links SOL/PDF reaproveitados das entradas correspondentes em `PUBLICATIONS_DATA`. GitHub preenchido com repos verificados por pesquisa (sem inventar URLs); 4 ferramentas ficam sem repo (IWSHAP, BOU-Guard, ERENO-UI, PRORAF) e apontam só para o paper.

### 2. Estatística na home — `index.html` + `content-loader.js`
- `index.html`: novo `.stat-item` "Ferramentas" com `id="stat-ferramentas"` na seção `.stats` (flexbox com wrap, comporta 5 itens).
- `content-loader.js` `updateHomeStats()`: define `stat-ferramentas` = `TOOLS_DATA.length + '+'`.
- i18n: chave `home.stat.tools` (ES/EN).

### 3. Página dedicada — `ferramentas.html`
Shell estático no mesmo padrão de `publicacoes.html` (nav, hero, footer, scripts i18n + content-loader). Container `#ferramentas-container` preenchido por `renderToolsPage()` em `content-loader.js`.
- Card por ferramenta (reusa `.featured-grid` / `.featured-card`): nome (título), descrição, badge evento+ano, badge de destaque/prêmio (quando houver), e links Paper / PDF / GitHub.
- Agrupamento por evento, ordenado por ano desc.
- Conteúdo dinâmico permanece em PT (decisão de escopo do i18n existente).

### 4. Descoberta a partir de Publicações
- `publicacoes.html`: callout de destaque no topo apontando para `ferramentas.html`.
- Nav: nova entrada "Ferramentas" no dropdown "Pesquisa" das páginas principais.

## CSS
Reuso de `.featured-grid`, `.featured-card`, `.pub-badge`, `.publication-links`. Acréscimo de variante `.pub-badge--award` para prêmios e, se necessário, ajuste leve para o card de ferramenta.

## Fora de escopo
- Tradução do conteúdo dinâmico dos cards (mantém PT, como o resto do conteúdo dinâmico).
- Métricas de prêmios na home (apenas contagem de ferramentas).
