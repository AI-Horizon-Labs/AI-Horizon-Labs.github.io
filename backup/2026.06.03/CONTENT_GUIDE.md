# AI Horizon Labs - Guia Completo do Site

## 📋 Visão Geral

Este site é uma aplicação **estática** com conteúdo **dinâmico** gerenciado por arquivos Markdown. O sistema utiliza um script Python para converter `.md` em JavaScript, permitindo que o conteúdo seja carregado dinamicamente sem necessidade de servidor backend.

### Tecnologias Utilizadas

- **HTML5 + CSS3**: Estrutura e estilo
- **JavaScript**: Carregamento dinâmico de conteúdo
- **Markdown + YAML**: Gerenciamento de conteúdo
- **Python 3**: Build script para conversão
- **Git Hooks + GitHub Actions**: Automação

## 🎯 Como Funciona

1. **Edite arquivos `.md`** em `_content/` com seus dados
2. **Faça commit** → Git hook executa `build-content.py` automaticamente
3. **`build-content.py`** converte `.md` → `content-data.js`
4. **JavaScript** carrega `content-data.js` e renderiza as páginas
5. **GitHub Actions** valida e regenera (se necessário) ao fazer push

## 📁 Estrutura do Projeto

```
AI-Horizon-Labs.github.io/
├── _content/              # 📝 EDITE AQUI - Conteúdo em Markdown
│   ├── members/          # Membros da equipe
│   ├── news/             # Notícias e eventos
│   ├── projects/         # Projetos de pesquisa
│   └── publications/     # Publicações científicas
├── assets/
│   ├── css/              # Estilos
│   ├── js/
│   │   ├── main.js       # Menu, animações gerais
│   │   ├── content-data.js      # 🤖 GERADO AUTOMATICAMENTE
│   │   └── content-loader.js    # Renderiza conteúdo dinâmico
│   └── images/           # Imagens e favicon
├── build-content.py      # 🔧 Script de build
├── .githooks/            # Automação local
│   └── pre-commit        # Roda build antes de commit
├── .github/workflows/    # Automação GitHub
│   └── build-content.yml # CI/CD pipeline
├── *.html                # Páginas do site
├── AUTOMATION.md         # Guia de automação
└── CONTENT_GUIDE.md      # Este arquivo
```

## 🚀 Workflow Rápido

```bash
# Adicionar novo membro
nano _content/members/novo-membro.md
git add _content/members/novo-membro.md
git commit -m "Adicionar novo membro"
git push

# Hook roda automaticamente e gera content-data.js!
```

---

## 📝 Formatos dos Arquivos Markdown

### 👤 Membros (`_content/members/`)

**Arquivo:** `nome-sobrenome.md`

```markdown
---
id: 8
name: Mestre Yoda
role: Pesquisador Sênior
category: pesquisadores
photo: assets/images/members/yoda.jpeg
lattes: http://lattes.cnpq.br/9999999999
orcid: 0000-0002-1138-0900
scholar: https://scholar.google.com/citations?user=yoda
email: mestre.yoda@unipampa.edu.br
---

# Mestre Yoda

**Função:** Pesquisador Sênior

## Biografia

Mestre Jedi com mais de 900 anos de experiência em IA...

## Interesses de Pesquisa

- Machine Learning Avançado
- Processamento de Linguagem Natural
```

**Campos obrigatórios:** `id`, `name`, `role`, `category`  
**Campos opcionais:** `photo`, `lattes`, `orcid`, `scholar`, `email`

**Categorias:**
- `coordenacao` → Seção "Coordenação"
- `pesquisadores` → Seção "Pesquisadores"
- `discentes` → Seção "Discentes"

---

### 📰 Notícias (`_content/news/`)

**Arquivo:** `YYYY-MM-DD-titulo-slug.md`

```markdown
---
date: 2026-01-10
title: Artigo aceito na ICSE 2025
category: publicacao
summary: Trabalho sobre IA aceito na principal conferência da área.
---

# Artigo aceito na ICSE 2025

## Resumo

Nosso trabalho foi aceito...

## Conteúdo Completo

É com grande satisfação...
```

**Campos obrigatórios:** `date` (YYYY-MM-DD), `title`, `category`, `summary`

**Categorias:** `publicacao`, `projeto`, `defesa`, `evento`, `infraestrutura`

---

### 🔬 Projetos (`_content/projects/`)

**Arquivo:** `nome-do-projeto.md`

```markdown
---
id: 1
title: Automação de Testes com IA
status: ativo
category: ia-engsoft
coordinator: Dr. João Silva
team: Maria Santos, Juliana Lima
funding: CNPq
period: 2024-2026
---

# Automação de Testes com IA

## Descrição

Desenvolvimento de ferramentas baseadas em ML...

## Objetivos

- Desenvolver modelos de ML
- Avaliar eficácia
```

**Campos obrigatórios:** `id`, `title`, `status`, `coordinator`, `funding`, `period`

**Status:**
- `ativo` → "Projetos Ativos"
- `concluído` → "Projetos Concluídos"

---

### 📚 Publicações (`_content/publications/`)

**Arquivo:** `YYYY-venue-titulo.md`

```markdown
---
id: 1
type: Conferência
title: Deep Learning for Automated Testing
authors: Silva, J.; Santos, M.
venue: International Conference on Software Engineering (ICSE)
year: 2025
doi: 10.1109/ICSE.2025.00001
pdf: https://exemplo.com/paper.pdf
code: https://github.com/lab/projeto
dataset: https://zenodo.org/record/123
---

# Deep Learning for Automated Testing

**Tipo:** Conferência  
**Ano:** 2025
```

**Campos obrigatórios:** `id`, `type`, `title`, `authors`, `venue`, `year`  
**Campos opcionais:** `doi`, `pdf`, `code`, `dataset`

**Tipos:** `Conferência`, `Periódico`, `Workshop`

---

## ✏️ Como Adicionar/Editar Conteúdo

### Adicionar Novo Membro

```bash
# 1. Criar arquivo
nano _content/members/maria-oliveira.md

# 2. Preencher com template acima

# 3. (Opcional) Adicionar foto
cp foto.jpg assets/images/members/maria-oliveira.jpg
# OU usar URL: https://randomuser.me/api/portraits/women/10.jpg

# 4. Commit
git add _content/members/maria-oliveira.md
git commit -m "Adicionar Maria Oliveira"

# 5. Push
git push origin main
```

### Editar Membro Existente

```bash
nano _content/members/joao-silva.md
# Faça as alterações
git add _content/members/joao-silva.md
git commit -m "Atualizar bio João Silva"
git push
```

### Remover Membro

```bash
git rm _content/members/nome.md
git commit -m "Remover membro Nome"
git push
```

---

## 🔧 Sistema de Build

### O que faz o `build-content.py`?

1. Escaneia todos os `.md` em `_content/`
2. Parseia Front Matter (YAML) + Markdown
3. Gera `assets/js/content-data.js`:
   ```javascript
   const MEMBERS_DATA = [...];
   const NEWS_DATA = [...];
   const PROJECTS_DATA = [...];
   const PUBLICATIONS_DATA = [...];
   ```

### Quando roda automaticamente?

- ✅ **Git commit** → pre-commit hook
- ✅ **Git push** → GitHub Actions
- ⚙️ **Manual:** `python3 build-content.py`

### Desabilitar automação

```bash
# Pular hook em um commit
git commit --no-verify -m "Mensagem"

# Desabilitar permanentemente
git config --unset core.hooksPath

# Reabilitar
git config core.hooksPath .githooks
```

---

## 🎨 Como as Páginas Funcionam

### Carregamento Dinâmico

1. **HTML** tem containers vazios:
   ```html
   <div id="membros-container"></div>
   ```

2. **content-loader.js** detecta a página e renderiza:
   - `index.html` → `updateHomeStats()` (contadores)
   - `membros.html` → `renderMembersPage()`
   - `noticias.html` → `renderNewsPage()`
   - `projetos.html` → `renderProjectsPage()`
   - `publicacoes.html` → `renderPublicationsPage()`

### Páginas Dinâmicas

- ✅ **index.html** - Estatísticas (8+ Pesquisadores, 6+ Publicações)
- ✅ **membros.html** - Lista de membros
- ✅ **noticias.html** - Notícias ordenadas por data
- ✅ **projetos.html** - Projetos ativos/concluídos
- ✅ **publicacoes.html** - Publicações ordenadas por ano

### Páginas Estáticas

- `sobre.html`, `linhas-de-pesquisa.html`, `contato.html`

---

## 🐛 Troubleshooting

### ❌ Conteúdo não aparece

**Verifique:**
```bash
# 1. content-data.js existe?
ls -lh assets/js/content-data.js

# 2. Scripts carregados no HTML?
grep "content-data.js" membros.html

# 3. Console do navegador (F12)
# Procure por erros

# 4. Regenere manualmente
python3 build-content.py
```

### ❌ Erro de sintaxe no YAML

**Front Matter inválido:**
```yaml
# ❌ ERRADO
---
title: Análise: Teste
---

# ✅ CORRETO
---
title: "Análise: Teste"
---
```

### ❌ Fotos não carregam

**Verifique caminho:**
```yaml
# ✅ Caminho correto
photo: assets/images/members/nome.jpg

# ✅ URL externa
photo: https://randomuser.me/api/portraits/men/1.jpg

# ❌ Caminho errado
photo: images/nome.jpg
```

### ❌ Hook não roda

```bash
# Verificar configuração
git config --get core.hooksPath
# Deve retornar: .githooks

# Dar permissão
chmod +x .githooks/pre-commit

# Reconfigurar
git config core.hooksPath .githooks
```

### ❌ Estatísticas mostram "0+"

```bash
# Verificar scripts no index.html
grep -E "content-data|content-loader" index.html

# Deve mostrar:
# <script src="assets/js/content-data.js"></script>
# <script src="assets/js/content-loader.js"></script>

# Se não estiver, adicione antes de </body>
```

---

## 📊 Dados Importantes

### Estatísticas Atuais

- **8+ Pesquisadores** (total de membros)
- **6+ Publicações** (total de publicações)
- **4+ Projetos Ativos** (status='ativo')
- **5+ Parcerias** (fixo, pode ser alterado em index.html)

### Arquivos Atuais

```bash
find _content -name "*.md" | wc -l
# Total: 24 arquivos

tree _content -L 2
# ├── members (8)
# ├── news (5)
# ├── projects (5)
# └── publications (6)
```

---

## 🚀 Deploy

### GitHub Pages

```bash
# 1. Habilitar GitHub Pages
# Settings → Pages → Source: main branch

# 2. Push
git push origin main

# 3. Aguardar 1-2 minutos

# 4. Acessar
# https://AI-Horizon-Labs.github.io
```

### Teste Local

```bash
# Python
python3 -m http.server 8000

# OU Node.js
npx serve

# Abrir: http://localhost:8000
```

---

## 📞 Suporte

- **Documentação completa:** [AUTOMATION.md](AUTOMATION.md)
- **Build script:** [build-content.py](build-content.py)
- **Exemplos:** Veja arquivos em `_content/`

**Dicas:**
- Use `git log` para ver histórico
- Consulte `AUTOMATION.md` para detalhes da automação
- Abra console do navegador (F12) para debug
