# 🌐 AI Horizon Labs - Site Institucional

[![Website](https://img.shields.io/badge/Website-Online-brightgreen)](https://ai-horizon-labs.github.io/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://ai-horizon-labs.github.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Site institucional do **AI Horizon Labs**, laboratório de pesquisa em Inteligência Artificial e Engenharia de Software vinculado ao Programa de Pós-Graduação em Engenharia de Software (PPGES) da UNIPAMPA.

**🔗 Acesse:** [https://ai-horizon-labs.github.io/](https://ai-horizon-labs.github.io/)

---

## 📋 Sobre o Projeto

Este site foi desenvolvido para:

- ✅ Apresentar o laboratório, sua missão e visão
- ✅ Divulgar linhas de pesquisa, projetos e publicações
- ✅ Exibir membros (docentes, discentes e colaboradores)
- ✅ Publicar notícias e eventos
- ✅ Atuar como vitrine científica e institucional

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização responsiva (Flexbox + Grid)
- **JavaScript (Vanilla)** - Carregamento dinâmico de conteúdo
- **Font Awesome** - Ícones vetoriais
- **Google Fonts** - Tipografia (Inter)

### Gerenciamento de Conteúdo
- **Markdown + YAML** - Arquivos de conteúdo estruturado
- **Python 3** - Build script para conversão automática
- **Git Hooks** - Automação local (pre-commit)
- **GitHub Actions** - CI/CD pipeline

### Hospedagem
- **GitHub Pages** - Hosting estático gratuito

---

## 📁 Estrutura do Projeto

```
AI-Horizon-Labs.github.io/
├── _content/              # 📝 Conteúdo em Markdown
│   ├── members/          # Membros do laboratório
│   ├── news/             # Notícias e eventos
│   ├── projects/         # Projetos de pesquisa
│   └── publications/     # Publicações científicas
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Estilos principais
│   │   └── responsive.css     # Media queries
│   ├── js/
│   │   ├── main.js            # Menu e interações
│   │   ├── content-data.js    # Dados gerados (NÃO EDITAR)
│   │   └── content-loader.js  # Renderização dinâmica
│   └── images/                # Imagens e favicon
│
├── *.html                 # Páginas do site
├── build-content.py       # Script de build
├── .githooks/             # Automação local
├── .github/workflows/     # CI/CD
├── CONTENT_GUIDE.md       # Guia de conteúdo
├── AUTOMATION.md          # Guia de automação
└── README.md              # Este arquivo
```

---

## 🚀 Como Começar

### Pré-requisitos

- Python 3.x
- Git

### Configuração Inicial

```bash
# 1. Clone o repositório
git clone https://github.com/AI-Horizon-Labs/AI-Horizon-Labs.github.io.git
cd AI-Horizon-Labs.github.io

# 2. Configure o Git Hook
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit

# 3. Teste o build
python3 build-content.py
```

### Teste Local

```bash
# Iniciar servidor local
python3 -m http.server 8000

# Abrir no navegador
# http://localhost:8000
```

---

## ✏️ Como Editar Conteúdo

### Adicionar Novo Membro

```bash
# 1. Criar arquivo
nano _content/members/nome-sobrenome.md

# 2. Preencher (ver CONTENT_GUIDE.md)
---
id: 9
name: Nome Completo
role: Pesquisador
category: pesquisadores
photo: https://randomuser.me/api/portraits/men/9.jpg
email: email@unipampa.edu.br
---

# Nome Completo

**Função:** Pesquisador

## Biografia
...

# 3. Commit
git add _content/members/nome-sobrenome.md
git commit -m "Adicionar novo membro"
git push origin main
```

### Adicionar Notícia

```bash
nano _content/news/2026-01-15-titulo-noticia.md
git add _content/news/2026-01-15-titulo-noticia.md
git commit -m "Adicionar notícia"
git push
```

**📚 Guia completo:** Veja [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

---

## 🔄 Sistema de Automação

### Como Funciona

1. Você edita arquivos `.md` em `_content/`
2. Ao fazer **commit**, o hook `pre-commit` executa automaticamente
3. `build-content.py` converte `.md` → `content-data.js`
4. JavaScript carrega os dados e renderiza as páginas
5. Ao fazer **push**, GitHub Actions valida e regenera (se necessário)

### Workflow

```bash
# Editar conteúdo
nano _content/members/novo-membro.md

# Commit (hook roda automaticamente)
git add _content/members/novo-membro.md
git commit -m "Adicionar novo membro"
# 🔄 Hook detecta mudança em _content/
# 🔨 Executa build-content.py
# 📦 Gera content-data.js
# ✅ Inclui no commit

# Push
git push origin main
# ☁️ GitHub Actions valida
```

**📚 Detalhes:** Veja [AUTOMATION.md](AUTOMATION.md)

---

## 📊 Estatísticas Atuais

- **8+ Pesquisadores** (coordenação, pesquisadores, discentes)
- **6+ Publicações** (conferências, periódicos, workshops)
- **4+ Projetos Ativos**
- **5+ Parcerias** institucionais

_Estatísticas atualizadas automaticamente a partir dos arquivos `.md`_

---

## �� Páginas do Site

### Páginas Dinâmicas
- **Home** (`index.html`) - Estatísticas e destaques
- **Membros** (`membros.html`) - Equipe do laboratório
- **Notícias** (`noticias.html`) - Últimas atualizações
- **Projetos** (`projetos.html`) - Projetos ativos e concluídos
- **Publicações** (`publicacoes.html`) - Produção científica

### Páginas Estáticas
- **Sobre** (`sobre.html`) - História e missão
- **Linhas de Pesquisa** (`linhas-de-pesquisa.html`) - Áreas de atuação
- **Contato** (`contato.html`) - Informações de contato

---

## 🐛 Troubleshooting

### Conteúdo não aparece

```bash
# Verificar se content-data.js foi gerado
ls -lh assets/js/content-data.js

# Regenerar manualmente
python3 build-content.py

# Verificar console do navegador (F12)
```

### Hook não está rodando

```bash
# Verificar configuração
git config --get core.hooksPath
# Deve retornar: .githooks

# Reconfigurar
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

### Erro de sintaxe no Markdown

- Certifique-se de que o Front Matter está entre `---`
- Use aspas duplas para strings com caracteres especiais
- Valide a estrutura YAML

**📚 Mais soluções:** [CONTENT_GUIDE.md](CONTENT_GUIDE.md#troubleshooting)

---

## 🚀 Deploy

### GitHub Pages (Automático)

1. Push para `main` branch
2. GitHub Pages atualiza automaticamente
3. Site disponível em: https://ai-horizon-labs.github.io/

### Manual

```bash
git add .
git commit -m "Atualizar site"
git push origin main
```

---

## 📂 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `build-content.py` | Script que converte `.md` → `.js` |
| `assets/js/content-data.js` | Dados gerados (NÃO EDITAR) |
| `assets/js/content-loader.js` | Renderiza conteúdo dinâmico |
| `CONTENT_GUIDE.md` | Guia completo de edição de conteúdo |
| `AUTOMATION.md` | Documentação da automação |
| `.githooks/pre-commit` | Hook que roda build automaticamente |
| `.github/workflows/build-content.yml` | CI/CD do GitHub Actions |

---

## 🎯 Próximos Passos

Após configurar o projeto:

1. ✅ Configure o Git Hook: `git config core.hooksPath .githooks`
2. ✅ Leia o [CONTENT_GUIDE.md](CONTENT_GUIDE.md)
3. ✅ Adicione/edite membros em `_content/members/`
4. ✅ Publique notícias em `_content/news/`
5. ✅ Atualize projetos em `_content/projects/`
6. ✅ Adicione publicações em `_content/publications/`

---

## 📞 Suporte

- **Documentação:** [CONTENT_GUIDE.md](CONTENT_GUIDE.md) e [AUTOMATION.md](AUTOMATION.md)
- **Issues:** [GitHub Issues](https://github.com/AI-Horizon-Labs/AI-Horizon-Labs.github.io/issues)
- **Contato:** contato@aihorizon.unipampa.edu.br

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ pelo AI Horizon Labs - UNIPAMPA**

**🔗 [ai-horizon-labs.github.io](https://ai-horizon-labs.github.io/)**
