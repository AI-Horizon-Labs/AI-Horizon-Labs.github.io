# AI Horizon Labs - Site Institucional

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://ai-horizon-labs.github.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Site institucional do **AI Horizon Labs**, laboratório de pesquisa em Inteligência Artificial e Engenharia de Software vinculado ao Programa de Pós-Graduação em Engenharia de Software (PPGES) da UNIPAMPA.

## 🚀 Sobre o Projeto

Este site foi desenvolvido para:
- Apresentar o laboratório, sua missão e visão
- Divulgar linhas de pesquisa, projetos e publicações
- Exibir membros (docentes, discentes e colaboradores)
- Atuar como vitrine científica e institucional

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização responsiva com Flexbox e Grid
- **JavaScript (Vanilla)**: Interatividade e funcionalidades
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia (Inter)

## 📁 Estrutura do Projeto

```
AI-Horizon-Labs.github.io/
│
├── index.html                 # Página principal
├── sobre.html                 # Sobre o laboratório
├── linhas-de-pesquisa.html    # Linhas de pesquisa
├── projetos.html              # Projetos
├── publicacoes.html           # Publicações
├── membros.html               # Membros
├── noticias.html              # Notícias e eventos
├── contato.html               # Contato
│
├── assets/
│   ├── css/
│   │   ├── style.css          # Estilos principais
│   │   └── responsive.css     # Media queries
│   │
│   ├── js/
│   │   └── main.js            # JavaScript principal
│   │
│   └── images/                # Imagens do site
│
├── _data/                     # Dados estruturados (JSON)
│   ├── members.json           # Informações de membros
│   ├── publications.json      # Publicações
│   ├── projects.json          # Projetos
│   └── news.json              # Notícias
│
├── PROPOSTA_SITE.md           # Proposta completa do projeto
├── README.md                  # Este arquivo
└── .gitignore                 # Arquivos ignorados pelo Git
```

## 🌐 Deploy

O site é hospedado gratuitamente no **GitHub Pages**:

1. O deploy é automático a cada push na branch `main`
2. O site estará disponível em: `https://[seu-usuario].github.io/AI-Horizon-Labs.github.io/`
3. Configuração em: Settings → Pages → Source: `main` branch

### Como configurar:

1. Acesse as configurações do repositório
2. Vá em "Pages"
3. Selecione a branch `main` como source
4. Aguarde alguns minutos para o deploy

## 📝 Como Contribuir

### Adicionar uma Notícia

1. Abra o arquivo `_data/news.json`
2. Adicione um novo objeto no array seguindo o padrão:

```json
{
  "id": 6,
  "date": "2026-01-15",
  "title": "Título da Notícia",
  "category": "publicacao|projeto|defesa|evento|infraestrutura",
  "summary": "Resumo curto da notícia",
  "content": "Conteúdo completo da notícia"
}
```

3. Salve e faça commit

### Adicionar um Membro

1. Abra o arquivo `_data/members.json`
2. Adicione um novo objeto no array:

```json
{
  "id": 8,
  "name": "Nome Completo",
  "role": "Pesquisador|Mestrando|Doutorando|Colaborador",
  "category": "coordenacao|pesquisadores|discentes|colaboradores",
  "photo": "assets/images/members/foto.jpg",
  "bio": "Breve biografia",
  "interests": ["Área 1", "Área 2"],
  "lattes": "http://lattes.cnpq.br/...",
  "email": "email@unipampa.edu.br"
}
```

### Adicionar uma Publicação

1. Abra o arquivo `_data/publications.json`
2. Adicione seguindo o formato existente

### Fluxo de Trabalho Git

```bash
# Clone o repositório
git clone https://github.com/[usuario]/AI-Horizon-Labs.github.io.git

# Crie uma branch para sua feature
git checkout -b feature/adicionar-noticia

# Faça suas alterações e commit
git add .
git commit -m "Adiciona notícia sobre evento X"

# Push para o GitHub
git push origin feature/adicionar-noticia

# Abra um Pull Request no GitHub
```

## 🎨 Personalização

### Cores

As cores podem ser alteradas no arquivo `assets/css/style.css`, nas variáveis CSS:

```css
:root {
  --color-primary: #1E3A8A;        /* Azul principal */
  --color-primary-light: #3B82F6;  /* Azul claro */
  --color-accent: #10B981;         /* Verde (destaque) */
  /* ... outras cores */
}
```

### Tipografia

Para alterar a fonte, modifique o import no `<head>` das páginas HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=NomeDaFonte:wght@400;500;600;700&display=swap" rel="stylesheet">
```

E atualize a variável CSS:

```css
--font-primary: 'NomeDaFonte', sans-serif;
```

## 📱 Responsividade

O site é totalmente responsivo e adapta-se a:
- **Desktop**: ≥ 1024px
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

## ♿ Acessibilidade

O site segue as diretrizes WCAG 2.1:
- Contraste adequado de cores
- Navegação por teclado
- Alt text em imagens
- HTML semântico
- ARIA labels quando necessário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido e mantido pelo **AI Horizon Labs** - UNIPAMPA

## 📧 Contato

- **Email**: contato@aihorizon.unipampa.edu.br
- **Site**: [aihorizon.unipampa.edu.br](https://aihorizon.unipampa.edu.br)
- **Localização**: Alegrete, RS - Brasil

---

Feito com ❤️ pelo AI Horizon Labs - UNIPAMPA
AI-Horizon-Labs.github.io
