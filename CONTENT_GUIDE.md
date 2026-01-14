# AI Horizon Labs - Gerenciamento de Conteúdo

## Estrutura de Arquivos Markdown

O site agora utiliza arquivos **Markdown (.md)** em vez de JSON para gerenciar o conteúdo. Esta abordagem oferece:

- ✅ Edição mais simples e legível
- ✅ Suporte a formatação rica (Markdown)
- ✅ Metadados via Front Matter (YAML)
- ✅ Versionamento mais claro no Git
- ✅ Fácil revisão de conteúdo

## Estrutura de Diretórios

```
_content/
├── members/          # Membros da equipe
│   ├── joao-silva.md
│   ├── ana-costa.md
│   └── ...
├── news/             # Notícias e eventos
│   ├── 2026-01-10-artigo-icse.md
│   ├── 2026-01-05-projeto-fapergs.md
│   └── ...
├── projects/         # Projetos de pesquisa
│   ├── automacao-testes-ia.md
│   ├── analise-sentimentos.md
│   └── ...
└── publications/     # Publicações científicas
    ├── 2025-icse-deep-learning.md
    ├── 2025-jsep-sentiment.md
    └── ...
```

## Formato dos Arquivos

### Membros (`_content/members/`)

```markdown
---
id: 1
name: Dr. João Silva
role: Coordenador
category: coordenacao
photo: assets/images/members/joao-silva.jpg
lattes: http://lattes.cnpq.br/1234567890
orcid: 0000-0000-0000-0001
email: joao.silva@unipampa.edu.br
---

# Nome do Membro

Biografia e informações detalhadas aqui...
```

### Notícias (`_content/news/`)

```markdown
---
date: 2026-01-10
title: Título da Notícia
category: publicacao
summary: Resumo breve da notícia
---

# Título da Notícia

Conteúdo completo da notícia em Markdown...
```

### Projetos (`_content/projects/`)

```markdown
---
id: 1
title: Nome do Projeto
status: ativo
coordinator: Dr. Coordenador
funding: CNPq
period: 2024-2026
---

# Nome do Projeto

Descrição detalhada do projeto...
```

### Publicações (`_content/publications/`)

```markdown
---
id: 1
type: Conferência
title: Título da Publicação
authors: Autor 1; Autor 2; Autor 3
venue: Nome da Conferência/Revista
year: 2025
doi: 10.1109/exemplo
---

# Título da Publicação

Informações adicionais sobre a publicação...
```

## Como Adicionar Novo Conteúdo

### 1. Novo Membro

Crie um arquivo em `_content/members/nome-sobrenome.md`:

```bash
cp _content/members/joao-silva.md _content/members/novo-membro.md
# Edite o arquivo com os dados do novo membro
```

### 2. Nova Notícia

```bash
# Nome do arquivo: YYYY-MM-DD-titulo-resumido.md
nano _content/news/2026-01-15-nova-noticia.md
```

### 3. Novo Projeto

```bash
nano _content/projects/nome-do-projeto.md
```

### 4. Nova Publicação

```bash
# Nome do arquivo: YYYY-venue-palavra-chave.md
nano _content/publications/2025-icse-novo-artigo.md
```

## Migração dos Dados JSON

Os arquivos JSON originais foram mantidos em `_data/` como backup:
- `_data/members.json` → `_content/members/*.md`
- `_data/news.json` → `_content/news/*.md`
- `_data/projects.json` → `_content/projects/*.md`
- `_data/publications.json` → `_content/publications/*.md`

## Próximos Passos

Para utilizar os arquivos Markdown no site, você pode:

1. **Opção 1 - Jekyll (GitHub Pages nativo)**
   - Ative Jekyll nas configurações do repositório
   - Os arquivos .md serão processados automaticamente

2. **Opção 2 - Script Python de conversão**
   - Crie um script que lê os .md e gera HTML
   - Execute antes do deploy

3. **Opção 3 - JavaScript no navegador**
   - Use uma biblioteca como `marked.js` para renderizar Markdown
   - Carregue os arquivos .md via fetch API

## Vantagens do Formato Markdown

- **Legibilidade**: Arquivos texto puro, fáceis de ler e editar
- **Controle de Versão**: Diffs mais claros no Git
- **Portabilidade**: Formato universal suportado por todas as plataformas
- **SEO**: Conteúdo estruturado e semântico
- **Colaboração**: Facilita contribuições via Pull Requests
