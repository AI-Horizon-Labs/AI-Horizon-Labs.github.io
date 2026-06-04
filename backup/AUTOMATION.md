# Automação do Build

## GitHub Actions (Recomendado)

O workflow [.github/workflows/build-content.yml](.github/workflows/build-content.yml) roda automaticamente quando:
- ✅ Você faz **push** de mudanças em `_content/` para a branch `main`
- ✅ Você abre um **Pull Request** com mudanças em `_content/`

**O que acontece:**
1. GitHub Actions detecta mudanças em `_content/`
2. Executa `python3 build-content.py`
3. Gera `assets/js/content-data.js` atualizado
4. Comita e faz push automaticamente (se houver mudanças)

**Configuração:** Nenhuma! Já está configurado e funcionando.

---

## Git Hook Local (Alternativa)

O hook [.githooks/pre-commit](.githooks/pre-commit) roda **antes de cada commit local**.

**Ativado automaticamente!** Sempre que você commitar mudanças em `_content/`, o script:
1. 🔍 Detecta mudanças em `_content/`
2. 🔨 Executa `build-content.py`
3. 📦 Adiciona `content-data.js` ao commit automaticamente

**Como funciona:**
```bash
# Você edita um arquivo markdown
nano _content/news/nova-noticia.md

# Adiciona ao git
git add _content/news/nova-noticia.md

# Faz commit (o hook roda automaticamente!)
git commit -m "Adicionar nova notícia"
# 🔄 Hook detecta mudança em _content/
# 🔨 Gera content-data.js
# 📦 Adiciona ao commit
# ✅ Commit concluído

# Push
git push origin main
```

---

## Workflow Completo

### Opção 1: Deixar o GitHub Actions fazer tudo
```bash
# 1. Edite os arquivos .md
nano _content/news/nova-noticia.md

# 2. Commit e push (SEM rodar build-content.py)
git add _content/news/nova-noticia.md
git commit -m "Adicionar nova notícia"
git push origin main

# 3. GitHub Actions roda automaticamente e atualiza content-data.js
# 4. Pull para pegar a atualização
git pull
```

### Opção 2: Usar o hook local
```bash
# 1. Edite os arquivos .md
nano _content/news/nova-noticia.md

# 2. Commit (hook gera content-data.js automaticamente)
git add _content/news/nova-noticia.md
git commit -m "Adicionar nova notícia"
# Hook roda automaticamente aqui ↑

# 3. Push
git push origin main
```

### Opção 3: Manual
```bash
# 1. Edite os arquivos .md
nano _content/news/nova-noticia.md

# 2. Gere manualmente
python3 build-content.py

# 3. Commit tudo
git add _content/news/nova-noticia.md assets/js/content-data.js
git commit -m "Adicionar nova notícia"
git push origin main
```

---

## Desativar o Hook Local

Se preferir usar apenas GitHub Actions:
```bash
git config --unset core.hooksPath
```

Para reativar:
```bash
git config core.hooksPath .githooks
```
