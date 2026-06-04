# Como adicionar novos prêmios

Para adicionar novos prêmios ao site, siga estas etapas:

## 1. Criar arquivo Markdown

Crie um novo arquivo na pasta `_content/award/` com o seguinte formato de nome:
```
YYYY-MM-nome-do-premio.md
```

Exemplo: `2025-06-melhor-artigo-sbes.md`

## 2. Estrutura do arquivo

O arquivo deve seguir este template:

```markdown
---
date: YYYY-MM-DD
title: Título do Prêmio
category: categoria
scope: nacional|international
recipient: Nome do(s) Premiado(s)
institution: Instituição que concedeu o prêmio
link: URL (opcional)
---

# Título do Prêmio

**Data:** DD de Mês de YYYY  
**Premiado(s):** Nome completo  
**Instituição:** Nome da instituição

## Descrição

Descrição completa do prêmio, contexto, importância e impacto.
Pode incluir múltiplos parágrafos.
```

## 3. Campos obrigatórios

- **date**: Data do prêmio no formato YYYY-MM-DD
- **title**: Título curto do prêmio
- **category**: Uma das opções:
  - `laboratory`: Prêmio para o laboratório
  - `student`: Prêmio para aluno(s)
  - `research`: Prêmio de pesquisa
  - `publication`: Prêmio de publicação
  - `innovation`: Prêmio de inovação
- **scope**: `national` ou `international`

## 4. Campos opcionais

- **recipient**: Nome do(s) premiado(s)
- **institution**: Instituição que concedeu
- **link**: URL para mais informações

## 5. Gerar dados

Após criar/editar arquivos, execute:

```bash
python3 build-content.py
```

Isso irá atualizar o arquivo `assets/js/content-data.js` com os novos dados.

## 6. Visualizar

Abra `premios.html` no navegador para ver as alterações.

## Exemplos de arquivos

Veja os arquivos existentes em `_content/award/` para exemplos práticos:
- `2024-11-best-paper-sbes.md`
- `2025-01-distinguished-reviewer-icse.md`
- `2025-03-melhor-dissertacao-ppges.md`
