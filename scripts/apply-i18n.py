#!/usr/bin/env python3
"""
Migracao unica: injeta marcacao i18n (data-i18n / data-i18n-attr),
o seletor de idioma na navbar e o <script src=i18n.js> nas paginas.

Idempotente: rodar de novo nao duplica (os alvos ja terao mudado).
Reporta qualquer padrao literal nao encontrado.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PAGES = [
    'index.html', 'sobre.html', 'linhas-de-pesquisa.html', 'projetos.html',
    'membros.html', 'publicacoes.html', 'premios.html', 'noticias.html',
    'contato.html', 'logomarca.html',
]

misses = []

def lit(old, new):
    return ('lit', old, new)

def rx(pattern, repl):
    return ('rx', pattern, repl)

def wrap(key, inner):
    """data-i18n span ao redor de conteudo de uma unica linha (com icones/strong)."""
    return lit(inner, f'<span data-i18n="{key}">{inner}</span>')

# ---- Seletor de idioma + script tag + nav/footer/banner compartilhados ----
SWITCHER = (
    '<li><a href="contato.html" class="btn-primary">Contato</a></li>'
    '<li><a href="contato.html" class="btn-primary" data-i18n="nav.contact">Contato</a></li>'
    '<li class="lang-switcher" role="group" aria-label="Idioma / Language">'
    '<button type="button" data-lang="pt" aria-pressed="true">PT</button>'
    '<button type="button" data-lang="es" aria-pressed="false">ES</button>'
    '<button type="button" data-lang="en" aria-pressed="false">EN</button>'
    '</li>'
)

SHARED = [
    # script include (antes do main.js)
    lit('<script src="assets/js/main.js"></script>',
        '<script src="assets/js/i18n.js"></script>\n<script src="assets/js/main.js"></script>'),
    # seletor de idioma + data-i18n no botao Contato
    lit('<li><a href="contato.html" class="btn-primary">Contato</a></li>',
        SWITCHER[:SWITCHER.index('<li class="lang-switcher"')] + SWITCHER[SWITCHER.index('<li class="lang-switcher"'):]),
    # links de navegacao (e repetidos no rodape)
    lit('<a href="sobre.html">Sobre</a>', '<a href="sobre.html" data-i18n="nav.about">Sobre</a>'),
    lit('<a href="#">Pesquisa <i class="fas fa-chevron-down"></i></a>',
        '<a href="#" data-i18n="nav.research">Pesquisa <i class="fas fa-chevron-down"></i></a>'),
    lit('<a href="linhas-de-pesquisa.html">Linhas de Pesquisa</a>',
        '<a href="linhas-de-pesquisa.html" data-i18n="nav.lines">Linhas de Pesquisa</a>'),
    lit('<a href="projetos.html">Projetos</a>', '<a href="projetos.html" data-i18n="nav.projects">Projetos</a>'),
    lit('<a href="membros.html">Membros</a>', '<a href="membros.html" data-i18n="nav.members">Membros</a>'),
    lit('<a href="publicacoes.html">Publicações</a>', '<a href="publicacoes.html" data-i18n="nav.publications">Publicações</a>'),
    lit('<a href="premios.html">Prêmios</a>', '<a href="premios.html" data-i18n="nav.awards">Prêmios</a>'),
    lit('<a href="noticias.html">Notícias</a>', '<a href="noticias.html" data-i18n="nav.news">Notícias</a>'),
    lit('<a href="logomarca.html">Marca</a>', '<a href="logomarca.html" data-i18n="nav.brand">Marca</a>'),
    # rodape
    lit('<p>Laboratório de Pesquisa em Inteligência Artificial e Engenharia de Software</p>',
        '<p data-i18n="footer.tagline">Laboratório de Pesquisa em Inteligência Artificial e Engenharia de Software</p>'),
    lit('<p>Universidade Federal do Pampa</p>', '<p data-i18n="footer.unifull">Universidade Federal do Pampa</p>'),
    lit('<h4>Links Rápidos</h4>', '<h4 data-i18n="footer.quicklinks">Links Rápidos</h4>'),
    lit('<a href="sobre.html">Sobre o Laboratório</a>', '<a href="sobre.html" data-i18n="footer.about_lab">Sobre o Laboratório</a>'),
    lit('<h4>Contato</h4>', '<h4 data-i18n="nav.contact">Contato</h4>'),
    lit('<p>&copy; 2026 AI Horizon Labs - UNIPAMPA. Todos os direitos reservados.</p>',
        '<p data-i18n="footer.rights">&copy; 2026 AI Horizon Labs - UNIPAMPA. Todos os direitos reservados.</p>'),
    # banner LinkedIn
    lit('<strong>Novidades no LinkedIn</strong>', '<strong data-i18n="banner.title">Novidades no LinkedIn</strong>'),
    lit('<span>Siga a AI Horizon Labs para acompanhar bastidores, prêmios e anúncios em primeira mão.</span>',
        '<span data-i18n="banner.text">Siga a AI Horizon Labs para acompanhar bastidores, prêmios e anúncios em primeira mão.</span>'),
    lit('<span class="linkedin-banner-cta">Seguir no LinkedIn <i class="fas fa-arrow-right"></i></span>',
        '<span class="linkedin-banner-cta" data-i18n="banner.cta">Seguir no LinkedIn <i class="fas fa-arrow-right"></i></span>'),
]

# Corrige o segundo item do SHARED (gerei errado acima): refaz o switcher corretamente.
SHARED[1] = lit(
    '<li><a href="contato.html" class="btn-primary">Contato</a></li>',
    '<li><a href="contato.html" class="btn-primary" data-i18n="nav.contact">Contato</a></li>'
    '<li class="lang-switcher" role="group" aria-label="Idioma / Language">'
    '<button type="button" data-lang="pt" aria-pressed="true">PT</button>'
    '<button type="button" data-lang="es" aria-pressed="false">ES</button>'
    '<button type="button" data-lang="en" aria-pressed="false">EN</button>'
    '</li>'
)

# ============================================================
# Por pagina
# ============================================================
PER = {}

PER['index.html'] = [
    lit('<title>AI Horizon Labs | Laboratório de IA e Engenharia de Software - UNIPAMPA</title>',
        '<title data-i18n="home.title">AI Horizon Labs | Laboratório de IA e Engenharia de Software - UNIPAMPA</title>'),
    lit('<meta name="description" content="AI Horizon Labs',
        '<meta name="description" data-i18n-attr="content|home.meta.desc" content="AI Horizon Labs'),
    lit('<a href="sobre.html" class="btn btn-primary">Conheça o Laboratório</a>',
        '<a href="sobre.html" class="btn btn-primary" data-i18n="home.hero.cta1">Conheça o Laboratório</a>'),
    lit('<a href="projetos.html" class="btn btn-secondary">Nossos Projetos</a>',
        '<a href="projetos.html" class="btn btn-secondary" data-i18n="home.hero.cta2">Nossos Projetos</a>'),
    lit('<h2>Explorando o Futuro da Cibersegurança, IA e Engenharia de Software</h2>',
        '<h2 data-i18n="home.about.title">Explorando o Futuro da Cibersegurança, IA e Engenharia de Software</h2>'),
    lit('<p>Desenvolvemos pesquisas de excelência em Inteligência Artificial aplicada à Engenharia de Software, promovendo inovação e formando pesquisadores qualificados.</p>',
        '<p data-i18n="home.about.text">Desenvolvemos pesquisas de excelência em Inteligência Artificial aplicada à Engenharia de Software, promovendo inovação e formando pesquisadores qualificados.</p>'),
    lit('<span class="stat-label">Pesquisadores</span>', '<span class="stat-label" data-i18n="home.stat.researchers">Pesquisadores</span>'),
    lit('<span class="stat-label">Publicações</span>', '<span class="stat-label" data-i18n="home.stat.publications">Publicações</span>'),
    lit('<span class="stat-label">Projetos Ativos</span>', '<span class="stat-label" data-i18n="home.stat.projects">Projetos Ativos</span>'),
    lit('<span class="stat-label">Parcerias</span>', '<span class="stat-label" data-i18n="home.stat.partnerships">Parcerias</span>'),
    lit('<h2>Linhas de Pesquisa</h2>', '<h2 data-i18n="home.lines.title">Linhas de Pesquisa</h2>'),
    lit('<p>Nossas principais áreas de investigação científica</p>',
        '<p data-i18n="home.lines.subtitle">Nossas principais áreas de investigação científica</p>'),
    lit('<h3 class="card-title">IA Aplicada à Engenharia de Software</h3>',
        '<h3 class="card-title" data-i18n="home.lines.card1.title">IA Aplicada à Engenharia de Software</h3>'),
    lit('<p class="card-text">Automação de testes, geração de código, análise de qualidade e manutenção preditiva de software utilizando técnicas de IA.</p>',
        '<p class="card-text" data-i18n="home.lines.card1.text">Automação de testes, geração de código, análise de qualidade e manutenção preditiva de software utilizando técnicas de IA.</p>'),
    lit('<h3 class="card-title">Aprendizado de Máquina</h3>',
        '<h3 class="card-title" data-i18n="home.lines.card2.title">Aprendizado de Máquina</h3>'),
    lit('<p class="card-text">Desenvolvimento de modelos preditivos, redes neurais profundas, transfer learning e otimização de algoritmos.</p>',
        '<p class="card-text" data-i18n="home.lines.card2.text">Desenvolvimento de modelos preditivos, redes neurais profundas, transfer learning e otimização de algoritmos.</p>'),
    lit('<h3 class="card-title">Processamento de Linguagem Natural</h3>',
        '<h3 class="card-title" data-i18n="home.lines.card3.title">Processamento de Linguagem Natural</h3>'),
    lit('<p class="card-text">Análise de requisitos, documentação automática, chatbots inteligentes e extração de informações de texto.</p>',
        '<p class="card-text" data-i18n="home.lines.card3.text">Análise de requisitos, documentação automática, chatbots inteligentes e extração de informações de texto.</p>'),
    lit('class="btn btn-secondary">Saiba mais</a>', 'class="btn btn-secondary" data-i18n="common.learnmore">Saiba mais</a>'),
    lit('<h2>Projetos em Destaque</h2>', '<h2 data-i18n="home.projects.title">Projetos em Destaque</h2>'),
    lit('<p>Algumas de nossas pesquisas em andamento</p>',
        '<p data-i18n="home.projects.subtitle">Algumas de nossas pesquisas em andamento</p>'),
    lit('<h3 class="card-title">Automação de Testes com IA</h3>',
        '<h3 class="card-title" data-i18n="home.proj.card1.title">Automação de Testes com IA</h3>'),
    lit('<p class="card-text">Desenvolvimento de ferramentas baseadas em Machine Learning para geração automática de casos de teste e detecção de bugs em sistemas de software.</p>',
        '<p class="card-text" data-i18n="home.proj.card1.text">Desenvolvimento de ferramentas baseadas em Machine Learning para geração automática de casos de teste e detecção de bugs em sistemas de software.</p>'),
    lit('<h3 class="card-title">Análise de Sentimentos em Reviews</h3>',
        '<h3 class="card-title" data-i18n="home.proj.card2.title">Análise de Sentimentos em Reviews</h3>'),
    lit('<p class="card-text">Aplicação de técnicas de NLP para análise de sentimentos em reviews de aplicativos móveis, auxiliando desenvolvedores na melhoria contínua.</p>',
        '<p class="card-text" data-i18n="home.proj.card2.text">Aplicação de técnicas de NLP para análise de sentimentos em reviews de aplicativos móveis, auxiliando desenvolvedores na melhoria contínua.</p>'),
    lit('<h3 class="card-title">Predição de Defeitos em Código</h3>',
        '<h3 class="card-title" data-i18n="home.proj.card3.title">Predição de Defeitos em Código</h3>'),
    lit('<p class="card-text">Modelo de Deep Learning para predição de defeitos em código-fonte, identificando módulos propensos a falhas antes do deployment.</p>',
        '<p class="card-text" data-i18n="home.proj.card3.text">Modelo de Deep Learning para predição de defeitos em código-fonte, identificando módulos propensos a falhas antes do deployment.</p>'),
    lit('<h3 class="card-title">Chatbot para Documentação Técnica</h3>',
        '<h3 class="card-title" data-i18n="home.proj.card4.title">Chatbot para Documentação Técnica</h3>'),
    lit('<p class="card-text">Sistema inteligente baseado em LLMs para responder dúvidas sobre documentação técnica de projetos de software de forma natural e precisa.</p>',
        '<p class="card-text" data-i18n="home.proj.card4.text">Sistema inteligente baseado em LLMs para responder dúvidas sobre documentação técnica de projetos de software de forma natural e precisa.</p>'),
    wrap('home.proj.r3', '<i class="fas fa-user"></i> 3 Pesquisadores'),
    wrap('home.proj.r2', '<i class="fas fa-user"></i> 2 Pesquisadores'),
    wrap('home.proj.r4', '<i class="fas fa-user"></i> 4 Pesquisadores'),
    lit('<span style="color: var(--color-accent); font-weight: 600;">Em andamento</span>',
        '<span style="color: var(--color-accent); font-weight: 600;" data-i18n="home.proj.status">Em andamento</span>'),
    lit('<a href="projetos.html" class="btn btn-primary">Ver todos os projetos</a>',
        '<a href="projetos.html" class="btn btn-primary" data-i18n="home.viewall.projects">Ver todos os projetos</a>'),
    lit('<h2>Publicações Recentes</h2>', '<h2 data-i18n="home.pubs.title">Publicações Recentes</h2>'),
    lit('<p>Nossos trabalhos mais recentes em conferências e periódicos</p>',
        '<p data-i18n="home.pubs.subtitle">Nossos trabalhos mais recentes em conferências e periódicos</p>'),
    lit('<span class="publication-type">Conferência</span>', '<span class="publication-type" data-i18n="pub.type.conference">Conferência</span>'),
    lit('<span class="publication-type">Periódico</span>', '<span class="publication-type" data-i18n="pub.type.journal">Periódico</span>'),
    lit('<span class="publication-type">Workshop</span>', '<span class="publication-type" data-i18n="pub.type.workshop">Workshop</span>'),
    lit('<a href="publicacoes.html" class="btn btn-primary">Ver todas as publicações</a>',
        '<a href="publicacoes.html" class="btn btn-primary" data-i18n="home.viewall.pubs">Ver todas as publicações</a>'),
    lit('<h2>Notícias e Eventos</h2>', '<h2 data-i18n="home.news.title">Notícias e Eventos</h2>'),
    lit('<p>Fique por dentro das novidades do laboratório</p>',
        '<p data-i18n="home.news.subtitle">Fique por dentro das novidades do laboratório</p>'),
    lit('<h3>Artigo aceito na ICSE 2025</h3>', '<h3 data-i18n="home.news1.title">Artigo aceito na ICSE 2025</h3>'),
    lit('<p>Nosso trabalho sobre geração automática de casos de teste com Deep Learning foi aceito na International Conference on Software Engineering (ICSE), uma das principais conferências da área.</p>',
        '<p data-i18n="home.news1.text">Nosso trabalho sobre geração automática de casos de teste com Deep Learning foi aceito na International Conference on Software Engineering (ICSE), uma das principais conferências da área.</p>'),
    lit('<h3>Novo projeto aprovado pela FAPERGS</h3>', '<h3 data-i18n="home.news2.title">Novo projeto aprovado pela FAPERGS</h3>'),
    lit('<p>Projeto "IA para Qualidade de Software" recebeu financiamento da FAPERGS para desenvolvimento nos próximos 24 meses, com foco em ferramentas de análise estática inteligente.</p>',
        '<p data-i18n="home.news2.text">Projeto "IA para Qualidade de Software" recebeu financiamento da FAPERGS para desenvolvimento nos próximos 24 meses, com foco em ferramentas de análise estática inteligente.</p>'),
    lit('<h3>Defesa de Dissertação de Mestrado</h3>', '<h3 data-i18n="home.news3.title">Defesa de Dissertação de Mestrado</h3>'),
    lit('<p>Maria Santos defendeu com sucesso sua dissertação "Análise de Sentimentos em Reviews de Aplicativos usando Transformers", recebendo aprovação com distinção da banca.</p>',
        '<p data-i18n="home.news3.text">Maria Santos defendeu com sucesso sua dissertação "Análise de Sentimentos em Reviews de Aplicativos usando Transformers", recebendo aprovação com distinção da banca.</p>'),
    lit('<a href="noticias.html">Leia mais →</a>', '<a href="noticias.html" data-i18n="common.readmore">Leia mais →</a>'),
    lit('<a href="noticias.html" class="btn btn-primary">Ver todas as notícias</a>',
        '<a href="noticias.html" class="btn btn-primary" data-i18n="home.viewall.news">Ver todas as notícias</a>'),
    lit('<h2 class="mb-2">Interessado em Participar?</h2>', '<h2 class="mb-2" data-i18n="home.cta.title">Interessado em Participar?</h2>'),
    lit('<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);">',
        '<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);" data-i18n="home.cta.text">'),
    wrap('home.cta.btn', '<i class="fas fa-envelope"></i> Entre em Contato'),
]

PER['sobre.html'] = [
    lit('<title>Sobre | AI Horizon Labs - UNIPAMPA</title>', '<title data-i18n="sobre.title">Sobre | AI Horizon Labs - UNIPAMPA</title>'),
    lit('<meta name="description" content="Sobre o AI Horizon Labs',
        '<meta name="description" data-i18n-attr="content|sobre.meta.desc" content="Sobre o AI Horizon Labs'),
    lit('<h1>Sobre o AI Horizon Labs</h1>', '<h1 data-i18n="sobre.hero">Sobre o AI Horizon Labs</h1>'),
    lit('<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">Quem Somos</h2>',
        '<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);" data-i18n="sobre.who.title">Quem Somos</h2>'),
    wrap('sobre.who.p1', 'O <strong>AI Horizon Labs</strong> é um laboratório de pesquisa vinculado ao Programa de Pós-Graduação em Engenharia de Software (PPGES) da Universidade Federal do Pampa (UNIPAMPA), com sede em Alegrete, RS.'),
    wrap('sobre.who.p2', 'Fundado em 2023, o laboratório tem como foco principal a investigação científica na interseção entre <strong>Inteligência Artificial</strong> e <strong>Engenharia de Software</strong>, desenvolvendo soluções inovadoras que impactam tanto a academia quanto a indústria.'),
    wrap('sobre.who.p3', 'Nosso time é formado por pesquisadores qualificados, mestrandos, doutorandos e colaboradores externos, todos comprometidos com a excelência científica e a formação de recursos humanos de alto nível.'),
    wrap('sobre.numbers.title', '<i class="fas fa-lightbulb"></i> Em Números'),
    lit('<div>Pesquisadores Ativos</div>', '<div data-i18n="sobre.numbers.researchers">Pesquisadores Ativos</div>'),
    lit('<div>Publicações Científicas</div>', '<div data-i18n="sobre.numbers.pubs">Publicações Científicas</div>'),
    lit('<div>Projetos de Pesquisa</div>', '<div data-i18n="sobre.numbers.projects">Projetos de Pesquisa</div>'),
    lit('<div>Parcerias Institucionais</div>', '<div data-i18n="sobre.numbers.partnerships">Parcerias Institucionais</div>'),
    wrap('sobre.mission.title', '<i class="fas fa-bullseye"></i> Missão'),
    wrap('sobre.mission.text', 'Desenvolver pesquisas de excelência em Inteligência Artificial aplicada à Engenharia de Software, promovendo a formação de recursos humanos qualificados e a transferência de tecnologia para a sociedade, contribuindo para o avanço científico e a inovação tecnológica na região e no país.'),
    wrap('sobre.vision.title', '<i class="fas fa-eye"></i> Visão'),
    wrap('sobre.vision.text', 'Ser reconhecido nacionalmente e internacionalmente como um centro de referência em pesquisa de Inteligência Artificial para Engenharia de Software, destacando-se pela qualidade de suas publicações, formação de mestres e doutores, e pelo impacto de suas soluções tecnológicas na indústria.'),
    wrap('sobre.values.title', '<i class="fas fa-heart"></i> Valores'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Excelência</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.excellence">Excelência</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Busca contínua pela qualidade em todas as atividades de pesquisa e formação.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.excellence.text">Busca contínua pela qualidade em todas as atividades de pesquisa e formação.</p>'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Colaboração</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.collab">Colaboração</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Trabalho em equipe e parcerias com instituições nacionais e internacionais.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.collab.text">Trabalho em equipe e parcerias com instituições nacionais e internacionais.</p>'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Inovação</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.innovation">Inovação</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Desenvolvimento de soluções criativas e disruptivas para problemas complexos.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.innovation.text">Desenvolvimento de soluções criativas e disruptivas para problemas complexos.</p>'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Ética</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.ethics">Ética</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Condução de pesquisas com integridade, transparência e responsabilidade social.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.ethics.text">Condução de pesquisas com integridade, transparência e responsabilidade social.</p>'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Inclusão</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.inclusion">Inclusão</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Promoção da diversidade e equidade em todas as atividades do laboratório.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.inclusion.text">Promoção da diversidade e equidade em todas as atividades do laboratório.</p>'),
    lit('<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;">Impacto</h4>',
        '<h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 0.5rem;" data-i18n="sobre.values.impact">Impacto</h4>'),
    lit('<p style="font-size: 0.95rem; color: var(--color-text-medium);">Geração de conhecimento com relevância científica e aplicabilidade prática.</p>',
        '<p style="font-size: 0.95rem; color: var(--color-text-medium);" data-i18n="sobre.values.impact.text">Geração de conhecimento com relevância científica e aplicabilidade prática.</p>'),
    lit('<h2>Histórico e Marcos</h2>', '<h2 data-i18n="sobre.history.title">Histórico e Marcos</h2>'),
    lit('<p>Nossa trajetória desde a fundação</p>', '<p data-i18n="sobre.history.subtitle">Nossa trajetória desde a fundação</p>'),
    lit('<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">2023 - Fundação</h3>',
        '<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;" data-i18n="sobre.history.2023.title">2023 - Fundação</h3>'),
    wrap('sobre.history.2023.text', 'Criação oficial do AI Horizon Labs como laboratório vinculado ao PPGES/UNIPAMPA, com foco inicial em IA aplicada à qualidade de software.'),
    lit('<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">2024 - Primeiras Publicações</h3>',
        '<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;" data-i18n="sobre.history.2024.title">2024 - Primeiras Publicações</h3>'),
    wrap('sobre.history.2024.text', 'Publicação de 5 artigos em conferências nacionais e 2 em conferências internacionais. Início de 3 dissertações de mestrado e aprovação de primeiro projeto de pesquisa com financiamento externo.'),
    lit('<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">2025 - Expansão</h3>',
        '<h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 0.5rem;" data-i18n="sobre.history.2025.title">2025 - Expansão</h3>'),
    wrap('sobre.history.2025.text', 'Crescimento da equipe para 15 pesquisadores, estabelecimento de 3 parcerias internacionais, aceitação de artigo na ICSE (top-tier conference) e ampliação da infraestrutura computacional.'),
    lit('<h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.5rem;">2026 - Consolidação</h3>',
        '<h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.5rem;" data-i18n="sobre.history.2026.title">2026 - Consolidação</h3>'),
    wrap('sobre.history.2026.text', 'Planejamento de novo ciclo de projetos, consolidação das linhas de pesquisa e ampliação das colaborações com a indústria. (Em andamento)'),
    lit('<h2>Infraestrutura e Recursos</h2>', '<h2 data-i18n="sobre.infra.title">Infraestrutura e Recursos</h2>'),
    lit('<p>Infraestrutura computacional compartilhada com o <a href="https://sites.unipampa.edu.br/lampad/infraestrutura/" target="_blank" rel="noopener noreferrer">LAMPAD</a>, organizada em três grades computacionais</p>',
        '<p data-i18n="sobre.infra.subtitle">Infraestrutura computacional compartilhada com o <a href="https://sites.unipampa.edu.br/lampad/infraestrutura/" target="_blank" rel="noopener noreferrer">LAMPAD</a>, organizada em três grades computacionais</p>'),
    lit('<h3>Grade Computacional 01</h3>', '<h3 data-i18n="sobre.infra.grid1.title">Grade Computacional 01</h3>'),
    lit('<h3>Grade Computacional 02</h3>', '<h3 data-i18n="sobre.infra.grid2.title">Grade Computacional 02</h3>'),
    lit('<h3>Grade Computacional 03</h3>', '<h3 data-i18n="sobre.infra.grid3.title">Grade Computacional 03</h3>'),
    lit('<p style="color: var(--color-text-medium); margin-bottom: var(--spacing-sm);">Workstations com GPUs NVIDIA para treinamento de modelos de IA/ML</p>',
        '<p style="color: var(--color-text-medium); margin-bottom: var(--spacing-sm);" data-i18n="sobre.infra.grid1.text">Workstations com GPUs NVIDIA para treinamento de modelos de IA/ML</p>'),
    lit('<p style="color: var(--color-text-medium); margin-bottom: var(--spacing-sm);">Cluster de servidores para processamento distribuído</p>',
        '<p style="color: var(--color-text-medium); margin-bottom: var(--spacing-sm);" data-i18n="sobre.infra.gridcluster.text">Cluster de servidores para processamento distribuído</p>'),
    lit('<h3>Software e Ferramentas</h3>', '<h3 data-i18n="sobre.infra.software.title">Software e Ferramentas</h3>'),
    lit('<h3>Recursos Bibliográficos</h3>', '<h3 data-i18n="sobre.infra.biblio.title">Recursos Bibliográficos</h3>'),
    rx(r'(<ul style="text-align: left; color: var\(--color-text-medium\); line-height: 1\.8;")(>\s*<li>Bibliotecas de ML/DL)',
       r'\1 data-i18n="sobre.infra.software.list"\2'),
    rx(r'(<ul style="text-align: left; color: var\(--color-text-medium\); line-height: 1\.8;")(>\s*<li>Acesso a bases científicas)',
       r'\1 data-i18n="sobre.infra.biblio.list"\2'),
    rx(r'(<p style="color: var\(--color-text-medium\); margin-bottom: var\(--spacing-md\);")(>\s*A infraestrutura computacional)',
       r'\1 data-i18n="sobre.infra.lampad.text"\2'),
    wrap('sobre.infra.lampad.btn', '<i class="fas fa-external-link-alt"></i> Conheça o LAMPAD'),
    lit('<h2>Parcerias e Colaborações</h2>', '<h2 data-i18n="sobre.partners.title">Parcerias e Colaborações</h2>'),
    lit('<p>Instituições e empresas parceiras</p>', '<p data-i18n="sobre.partners.subtitle">Instituições e empresas parceiras</p>'),
    wrap('sobre.partners.academic.title', '<i class="fas fa-university"></i> Instituições Acadêmicas'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(>\s*<li>Universidade Federal do Rio Grande do Sul)',
       r'\1 data-i18n="sobre.partners.academic.list"\2'),
    wrap('sobre.partners.industry.title', '<i class="fas fa-building"></i> Parceiros da Indústria'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(>\s*<li>Empresas de desenvolvimento de software regionais)',
       r'\1 data-i18n="sobre.partners.industry.list"\2'),
    wrap('sobre.partners.funding.title', '<i class="fas fa-handshake"></i> Agências de Fomento'),
    lit('<h2 class="mb-2">Conheça Nossa Equipe</h2>', '<h2 class="mb-2" data-i18n="sobre.team.title">Conheça Nossa Equipe</h2>'),
    wrap('sobre.team.text', 'Saiba mais sobre os pesquisadores, docentes e discentes que fazem parte do AI Horizon Labs'),
    lit('<a href="membros.html" class="btn btn-primary">Ver Membros do Laboratório</a>',
        '<a href="membros.html" class="btn btn-primary" data-i18n="common.viewmembers">Ver Membros do Laboratório</a>'),
]

PER['linhas-de-pesquisa.html'] = [
    lit('<title>Linhas de Pesquisa | AI Horizon Labs - UNIPAMPA</title>', '<title data-i18n="linhas.title">Linhas de Pesquisa | AI Horizon Labs - UNIPAMPA</title>'),
    lit('<h1>Linhas de Pesquisa</h1>', '<h1 data-i18n="nav.lines">Linhas de Pesquisa</h1>'),
    lit('<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">IA Aplicada à Engenharia de Software</h2>',
        '<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);" data-i18n="linhas.l1.title">IA Aplicada à Engenharia de Software</h2>'),
    lit('<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);">Esta linha de pesquisa investiga a aplicação de técnicas de Inteligência Artificial para resolver problemas clássicos da Engenharia de Software, como automação de testes, geração de código, análise de qualidade, manutenção preditiva e detecção de bugs.</p>',
        '<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);" data-i18n="linhas.l1.desc">Esta linha de pesquisa investiga a aplicação de técnicas de Inteligência Artificial para resolver problemas clássicos da Engenharia de Software, como automação de testes, geração de código, análise de qualidade, manutenção preditiva e detecção de bugs.</p>'),
    lit('<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);">Tópicos de Pesquisa</h3>',
        '<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);" data-i18n="linhas.topics">Tópicos de Pesquisa</h3>'),
    lit('<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);">Pesquisadores</h3>',
        '<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);" data-i18n="common.researchers">Pesquisadores</h3>'),
    lit('<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);">Publicações Relacionadas</h3>',
        '<h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);" data-i18n="linhas.relatedpubs">Publicações Relacionadas</h3>'),
    lit('<p><a href="publicacoes.html">Ver publicações desta linha →</a></p>',
        '<p data-i18n="linhas.viewpubs"><a href="publicacoes.html">Ver publicações desta linha →</a></p>'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(><li>Geração automática de casos de teste)',
       r'\1 data-i18n="linhas.l1.list"\2'),
    lit('<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">Aprendizado de Máquina e Deep Learning</h2>',
        '<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);" data-i18n="linhas.l2.title">Aprendizado de Máquina e Deep Learning</h2>'),
    lit('<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);">Desenvolvimento de modelos preditivos avançados, redes neurais profundas, transfer learning e otimização de algoritmos de ML para aplicações em software e outras áreas.</p>',
        '<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);" data-i18n="linhas.l2.desc">Desenvolvimento de modelos preditivos avançados, redes neurais profundas, transfer learning e otimização de algoritmos de ML para aplicações em software e outras áreas.</p>'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(><li>Redes neurais convolucionais)',
       r'\1 data-i18n="linhas.l2.list"\2'),
    lit('<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">Processamento de Linguagem Natural</h2>',
        '<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);" data-i18n="linhas.l3.title">Processamento de Linguagem Natural</h2>'),
    lit('<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);">Aplicação de técnicas de NLP para problemas de Engenharia de Software, como análise de requisitos, documentação automática, análise de sentimentos em reviews, chatbots e extração de informações de texto.</p>',
        '<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);" data-i18n="linhas.l3.desc">Aplicação de técnicas de NLP para problemas de Engenharia de Software, como análise de requisitos, documentação automática, análise de sentimentos em reviews, chatbots e extração de informações de texto.</p>'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(><li>Análise de sentimentos em reviews de apps)',
       r'\1 data-i18n="linhas.l3.list"\2'),
    lit('<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);">Sistemas Inteligentes</h2>',
        '<h2 style="color: var(--color-primary); margin-bottom: var(--spacing-md);" data-i18n="linhas.l4.title">Sistemas Inteligentes</h2>'),
    lit('<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);">Desenvolvimento de agentes autônomos, sistemas de recomendação, IoT inteligente e outras aplicações de IA que envolvem tomada de decisão, planejamento e interação com ambientes complexos.</p>',
        '<p style="font-size: 1.125rem; line-height: 1.75; margin-bottom: var(--spacing-md);" data-i18n="linhas.l4.desc">Desenvolvimento de agentes autônomos, sistemas de recomendação, IoT inteligente e outras aplicações de IA que envolvem tomada de decisão, planejamento e interação com ambientes complexos.</p>'),
    rx(r'(<ul style="color: var\(--color-text-medium\); line-height: 1\.8;")(><li>Agentes inteligentes e sistemas multi-agentes)',
       r'\1 data-i18n="linhas.l4.list"\2'),
    lit('<h2 class="mb-2">Interesse em Colaborar?</h2>', '<h2 class="mb-2" data-i18n="linhas.cta.title">Interesse em Colaborar?</h2>'),
    lit('<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);">Se você é pesquisador ou aluno e tem interesse em colaborar em alguma dessas linhas de pesquisa, entre em contato conosco!</p>',
        '<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);" data-i18n="linhas.cta.text">Se você é pesquisador ou aluno e tem interesse em colaborar em alguma dessas linhas de pesquisa, entre em contato conosco!</p>'),
    lit('<a href="contato.html" class="btn btn-primary">Entre em Contato</a>',
        '<a href="contato.html" class="btn btn-primary" data-i18n="common.contactbtn">Entre em Contato</a>'),
]

PER['projetos.html'] = [
    lit('<title>Projetos | AI Horizon Labs</title>', '<title data-i18n="projetos.title">Projetos | AI Horizon Labs</title>'),
    lit('<h1>Projetos de Pesquisa</h1>', '<h1 data-i18n="projetos.hero">Projetos de Pesquisa</h1>'),
]

PER['membros.html'] = [
    lit('<title>Membros | AI Horizon Labs</title>', '<title data-i18n="membros.title">Membros | AI Horizon Labs</title>'),
    lit('<h1>Nossa Equipe</h1>', '<h1 data-i18n="membros.hero">Nossa Equipe</h1>'),
    lit('<h2 class="mb-2">Junte-se ao Nosso Time</h2>', '<h2 class="mb-2" data-i18n="membros.cta.title">Junte-se ao Nosso Time</h2>'),
    lit('<p class="mb-3" style="font-size:1.125rem;color:var(--color-text-medium);">Estamos sempre abertos a novos pesquisadores e colaboradores</p>',
        '<p class="mb-3" style="font-size:1.125rem;color:var(--color-text-medium);" data-i18n="membros.cta.text">Estamos sempre abertos a novos pesquisadores e colaboradores</p>'),
    lit('<a href="contato.html" class="btn btn-primary">Entre em Contato</a>',
        '<a href="contato.html" class="btn btn-primary" data-i18n="common.contactbtn">Entre em Contato</a>'),
]

PER['publicacoes.html'] = [
    lit('<title>Publicações | AI Horizon Labs</title>', '<title data-i18n="publicacoes.title">Publicações | AI Horizon Labs</title>'),
    lit('<h1>Publicações</h1>', '<h1 data-i18n="publicacoes.hero">Publicações</h1>'),
]

PER['premios.html'] = [
    lit('<title>Prêmios | AI Horizon Labs - UNIPAMPA</title>', '<title data-i18n="premios.title">Prêmios | AI Horizon Labs - UNIPAMPA</title>'),
    lit('<meta name="description" content="Prêmios e Reconhecimentos do AI Horizon Labs',
        '<meta name="description" data-i18n-attr="content|premios.meta.desc" content="Prêmios e Reconhecimentos do AI Horizon Labs'),
    wrap('premios.hero', '<i class="fas fa-trophy"></i> Prêmios e Reconhecimentos'),
    lit('<h2>Nossos Prêmios</h2>', '<h2 data-i18n="premios.section.title">Nossos Prêmios</h2>'),
    lit('<p>Reconhecimento pela excelência em pesquisa, desenvolvimento, engenharia e inovação</p>',
        '<p data-i18n="premios.section.subtitle">Reconhecimento pela excelência em pesquisa, desenvolvimento, engenharia e inovação</p>'),
    lit('<p style="margin-top: var(--spacing-md); color: var(--color-text-medium);">Carregando prêmios...</p>',
        '<p style="margin-top: var(--spacing-md); color: var(--color-text-medium);" data-i18n="premios.loading">Carregando prêmios...</p>'),
    lit('<div style="color: var(--color-text-medium);">Prêmios Recebidos</div>',
        '<div style="color: var(--color-text-medium);" data-i18n="premios.stat.total">Prêmios Recebidos</div>'),
    lit('<div style="color: var(--color-text-medium);">Prêmios em 2026</div>',
        '<div style="color: var(--color-text-medium);" data-i18n="premios.stat.2026">Prêmios em 2026</div>'),
    lit('<div style="color: var(--color-text-medium);">Prêmios em 2025</div>',
        '<div style="color: var(--color-text-medium);" data-i18n="premios.stat.2025">Prêmios em 2025</div>'),
    lit('<div style="color: var(--color-text-medium);">Prêmios em 2024</div>',
        '<div style="color: var(--color-text-medium);" data-i18n="premios.stat.2024">Prêmios em 2024</div>'),
    lit('<div style="color: var(--color-text-medium);">Prêmios Internacionais</div>',
        '<div style="color: var(--color-text-medium);" data-i18n="premios.stat.international">Prêmios Internacionais</div>'),
    lit('<h2 class="mb-2">Parabéns aos nossos pesquisadores!</h2>',
        '<h2 class="mb-2" data-i18n="premios.cta.title">Parabéns aos nossos pesquisadores!</h2>'),
    lit('<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);">',
        '<p class="mb-3" style="font-size: 1.125rem; color: var(--color-text-medium);" data-i18n="premios.cta.text">'),
    lit('<a href="membros.html" class="btn btn-primary">Ver Membros do Laboratório</a>',
        '<a href="membros.html" class="btn btn-primary" data-i18n="common.viewmembers">Ver Membros do Laboratório</a>'),
]

PER['noticias.html'] = [
    lit('<title>Notícias | AI Horizon Labs</title>', '<title data-i18n="noticias.title">Notícias | AI Horizon Labs</title>'),
    lit('<h1>Notícias e Eventos</h1>', '<h1 data-i18n="noticias.hero">Notícias e Eventos</h1>'),
]

PER['contato.html'] = [
    lit('<title>Contato | AI Horizon Labs</title>', '<title data-i18n="contato.title">Contato | AI Horizon Labs</title>'),
    lit('<h1>Entre em Contato</h1>', '<h1 data-i18n="contato.hero">Entre em Contato</h1>'),
    lit('<h2 style="margin-bottom:var(--spacing-md);">Formulário de Contato</h2>',
        '<h2 style="margin-bottom:var(--spacing-md);" data-i18n="contato.form.title">Formulário de Contato</h2>'),
    lit('<label class="form-label">Nome</label>', '<label class="form-label" data-i18n="contato.form.name">Nome</label>'),
    lit('<label class="form-label">E-mail</label>', '<label class="form-label" data-i18n="contato.form.email">E-mail</label>'),
    lit('<label class="form-label">Assunto</label>', '<label class="form-label" data-i18n="contato.form.subject">Assunto</label>'),
    lit('<label class="form-label">Mensagem</label>', '<label class="form-label" data-i18n="contato.form.message">Mensagem</label>'),
    lit('<button type="submit" class="btn btn-primary">Enviar Mensagem</button>',
        '<button type="submit" class="btn btn-primary" data-i18n="contato.form.submit">Enviar Mensagem</button>'),
    wrap('contato.info.title', '<i class="fas fa-info-circle"></i> Informações de Contato'),
    wrap('contato.info.email', '<i class="fas fa-envelope"></i> <strong>E-mail:</strong> aihorizonlabs@unipampa.edu.br'),
    wrap('contato.info.address', '<i class="fas fa-map-marker-alt"></i> <strong>Endereço:</strong> UNIPAMPA - Campus Alegrete<br>Alegrete, RS - Brasil'),
    wrap('contato.info.website', '<i class="fas fa-globe"></i> <strong>Website:</strong> ai-horizon-labs.github.io'),
    lit('<h4>Redes Sociais</h4>', '<h4 data-i18n="contato.social">Redes Sociais</h4>'),
]

PER['logomarca.html'] = [
    lit('<title>Logomarca e Brand | AI Horizon Labs</title>', '<title data-i18n="marca.title">Logomarca e Brand | AI Horizon Labs</title>'),
    lit('<span class="status-pill"><span class="dot"></span> Manual de marca</span>',
        '<span class="status-pill" data-i18n="marca.statuspill"><span class="dot"></span> Manual de marca</span>'),
    lit('<h1>Logomarca e Brand</h1>', '<h1 data-i18n="marca.hero">Logomarca e Brand</h1>'),
    lit('<p>Identidade visual, paleta de cores e aplicações da marca AI Horizon Labs</p>',
        '<p data-i18n="marca.hero.sub">Identidade visual, paleta de cores e aplicações da marca AI Horizon Labs</p>'),
    rx(r'<p>(<strong>Esta é a identidade visual do AI Horizon Labs\.</strong>)', r'<p data-i18n="marca.wip">\1'),
    lit('<h2>Paleta de cores</h2>', '<h2 data-i18n="marca.palette.title">Paleta de cores</h2>'),
    lit('<span class="tag">Identidade oficial</span>', '<span class="tag" data-i18n="marca.palette.tag">Identidade oficial</span>'),
    lit('<p class="family-desc">Azuis profundos transmitem tecnologia e confiança; o dourado do sol traz energia e o calor do nascer do dia no Pampa. Use os tons primários para estruturas e o dourado como destaque pontual.</p>',
        '<p class="family-desc" data-i18n="marca.palette.desc">Azuis profundos transmitem tecnologia e confiança; o dourado do sol traz energia e o calor do nascer do dia no Pampa. Use os tons primários para estruturas e o dourado como destaque pontual.</p>'),
    lit('<div class="info"><strong>Azul royal</strong><code>#1A4FB5</code><span>Primária</span></div>',
        '<div class="info" data-i18n="marca.sw1"><strong>Azul royal</strong><code>#1A4FB5</code><span>Primária</span></div>'),
    lit('<div class="info"><strong>Azul céu</strong><code>#2E7CD6</code><span>Primária clara</span></div>',
        '<div class="info" data-i18n="marca.sw2"><strong>Azul céu</strong><code>#2E7CD6</code><span>Primária clara</span></div>'),
    lit('<div class="info"><strong>Navy profundo</strong><code>#0A1F4D</code><span>Primária escura</span></div>',
        '<div class="info" data-i18n="marca.sw3"><strong>Navy profundo</strong><code>#0A1F4D</code><span>Primária escura</span></div>'),
    lit('<div class="info"><strong>Sol dourado</strong><code>#F7A823</code><span>Destaque</span></div>',
        '<div class="info" data-i18n="marca.sw4"><strong>Sol dourado</strong><code>#F7A823</code><span>Destaque</span></div>'),
    lit('<div class="info"><strong>Dourado claro</strong><code>#FCD06C</code><span>Destaque claro</span></div>',
        '<div class="info" data-i18n="marca.sw5"><strong>Dourado claro</strong><code>#FCD06C</code><span>Destaque claro</span></div>'),
    lit('<div class="info"><strong>Âmbar escuro</strong><code>#E08A12</code><span>Destaque escuro</span></div>',
        '<div class="info" data-i18n="marca.sw6"><strong>Âmbar escuro</strong><code>#E08A12</code><span>Destaque escuro</span></div>'),
    lit('<div class="info"><strong>Grafite</strong><code>#1F2937</code><span>Texto</span></div>',
        '<div class="info" data-i18n="marca.sw7"><strong>Grafite</strong><code>#1F2937</code><span>Texto</span></div>'),
    lit('<div class="info"><strong>Cinza claro</strong><code>#F8F9FA</code><span>Fundo</span></div>',
        '<div class="info" data-i18n="marca.sw8"><strong>Cinza claro</strong><code>#F8F9FA</code><span>Fundo</span></div>'),
    lit('<div class="info"><strong>Branco</strong><code>#FFFFFF</code><span>Fundo / texto</span></div>',
        '<div class="info" data-i18n="marca.sw9"><strong>Branco</strong><code>#FFFFFF</code><span>Fundo / texto</span></div>'),
    lit('<h2>Símbolo vertical, azul gradiente</h2>', '<h2 data-i18n="marca.fam1.title">Símbolo vertical, azul gradiente</h2>'),
    lit('<span class="tag">Assinatura principal candidata</span>', '<span class="tag" data-i18n="marca.fam1.tag">Assinatura principal candidata</span>'),
    lit('<p class="family-desc">Versões empilhadas e centralizadas com o monograma "A" em gradiente azul e o sol nascente sobre o horizonte. Transmitem profundidade e tecnologia. Indicadas para uso institucional de destaque (capa, apresentações, perfil).</p>',
        '<p class="family-desc" data-i18n="marca.fam1.desc">Versões empilhadas e centralizadas com o monograma "A" em gradiente azul e o sol nascente sobre o horizonte. Transmitem profundidade e tecnologia. Indicadas para uso institucional de destaque (capa, apresentações, perfil).</p>'),
    lit('<h3>Vertical gradiente - A</h3>', '<h3 data-i18n="marca.fam1.c1.title">Vertical gradiente - A</h3>'),
    lit('<p>Tagline "Advancing AI Beyond the Horizon".</p>', '<p data-i18n="marca.fam1.c1.text">Tagline "Advancing AI Beyond the Horizon".</p>'),
    lit('<h3>Vertical gradiente - B</h3>', '<h3 data-i18n="marca.fam1.c2.title">Vertical gradiente - B</h3>'),
    lit('<p>Variação do mesmo conceito, ajuste de proporção e brilho.</p>', '<p data-i18n="marca.fam1.c2.text">Variação do mesmo conceito, ajuste de proporção e brilho.</p>'),
    lit('<div class="chips"><span class="chip">Vertical</span><span class="chip accent">Cor</span><span class="chip">EN</span></div>',
        '<div class="chips" data-i18n="marca.chips.vert_cor_en"><span class="chip">Vertical</span><span class="chip accent">Cor</span><span class="chip">EN</span></div>'),
    lit('<h2>Símbolo vertical, monocromático</h2>', '<h2 data-i18n="marca.fam2.title">Símbolo vertical, monocromático</h2>'),
    lit('<span class="tag">Versão preto e branco</span>', '<span class="tag" data-i18n="marca.fam2.tag">Versão preto e branco</span>'),
    lit('<p class="family-desc">O mesmo símbolo vertical em uma só cor, em fundo claro e em fundo escuro. Essenciais para documentos, carimbos, fundos coloridos e situações de impressão em uma cor.</p>',
        '<p class="family-desc" data-i18n="marca.fam2.desc">O mesmo símbolo vertical em uma só cor, em fundo claro e em fundo escuro. Essenciais para documentos, carimbos, fundos coloridos e situações de impressão em uma cor.</p>'),
    lit('<h3>Mono - fundo claro</h3>', '<h3 data-i18n="marca.fam2.c1.title">Mono - fundo claro</h3>'),
    lit('<p>Preto sobre branco. Tagline "Advancing AI Beyond the Horizon".</p>', '<p data-i18n="marca.fam2.c1.text">Preto sobre branco. Tagline "Advancing AI Beyond the Horizon".</p>'),
    lit('<div class="chips"><span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fundo claro</span></div>',
        '<div class="chips" data-i18n="marca.chips.vert_mono_claro"><span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fundo claro</span></div>'),
    lit('<h3>Mono - fundo escuro</h3>', '<h3 data-i18n="marca.fam2.c2.title">Mono - fundo escuro</h3>'),
    lit('<p>Branco sobre preto, para aplicações invertidas.</p>', '<p data-i18n="marca.fam2.c2.text">Branco sobre preto, para aplicações invertidas.</p>'),
    lit('<div class="chips"><span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fundo escuro</span></div>',
        '<div class="chips" data-i18n="marca.chips.vert_mono_escuro"><span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fundo escuro</span></div>'),
    lit('<h2>Lockup horizontal</h2>', '<h2 data-i18n="marca.fam3.title">Lockup horizontal</h2>'),
    lit('<span class="tag">Cabeçalhos e banners</span>', '<span class="tag" data-i18n="marca.fam3.tag">Cabeçalhos e banners</span>'),
    lit('<p class="family-desc">Composição na horizontal, com o símbolo à esquerda e o nome à direita. Formato ideal para cabeçalho do site, assinaturas de e-mail, banners e papel timbrado. Disponível em azul e monocromático, com tagline em português e inglês.</p>',
        '<p class="family-desc" data-i18n="marca.fam3.desc">Composição na horizontal, com o símbolo à esquerda e o nome à direita. Formato ideal para cabeçalho do site, assinaturas de e-mail, banners e papel timbrado. Disponível em azul e monocromático, com tagline em português e inglês.</p>'),
    lit('<h3>Horizontal azul - EN</h3>', '<h3 data-i18n="marca.fam3.c1.title">Horizontal azul - EN</h3>'),
    lit('<p>"Exploring New Frontiers in Artificial Intelligence".</p>', '<p data-i18n="marca.fam3.c1.text">"Exploring New Frontiers in Artificial Intelligence".</p>'),
    lit('<div class="chips"><span class="chip">Horizontal</span><span class="chip accent">Cor</span><span class="chip">EN</span></div>',
        '<div class="chips" data-i18n="marca.chips.horiz_cor_en"><span class="chip">Horizontal</span><span class="chip accent">Cor</span><span class="chip">EN</span></div>'),
    lit('<h3>Horizontal azul - PT</h3>', '<h3 data-i18n="marca.fam3.c2.title">Horizontal azul - PT</h3>'),
    lit('<p>"Explorando Novas Fronteiras da Inteligência Artificial".</p>', '<p data-i18n="marca.fam3.c2.text">"Explorando Novas Fronteiras da Inteligência Artificial".</p>'),
    lit('<div class="chips"><span class="chip">Horizontal</span><span class="chip accent">Cor</span><span class="chip">PT</span></div>',
        '<div class="chips" data-i18n="marca.chips.horiz_cor_pt"><span class="chip">Horizontal</span><span class="chip accent">Cor</span><span class="chip">PT</span></div>'),
    lit('<h3>Horizontal mono - EN</h3>', '<h3 data-i18n="marca.fam3.c3.title">Horizontal mono - EN</h3>'),
    lit('<p>Versão preto e branco, tagline em inglês.</p>', '<p data-i18n="marca.fam3.c3.text">Versão preto e branco, tagline em inglês.</p>'),
    lit('<div class="chips"><span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">EN</span></div>',
        '<div class="chips" data-i18n="marca.chips.horiz_mono_en"><span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">EN</span></div>'),
    lit('<h3>Horizontal mono - PT</h3>', '<h3 data-i18n="marca.fam3.c4.title">Horizontal mono - PT</h3>'),
    lit('<p>Versão preto e branco, tagline em português.</p>', '<p data-i18n="marca.fam3.c4.text">Versão preto e branco, tagline em português.</p>'),
    lit('<div class="chips"><span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">PT</span></div>',
        '<div class="chips" data-i18n="marca.chips.horiz_mono_pt"><span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">PT</span></div>'),
    lit('<h2>Sistema de marca e versões claro/escuro</h2>', '<h2 data-i18n="marca.fam4.title">Sistema de marca e versões claro/escuro</h2>'),
    lit('<span class="tag">Folhas de aplicação</span>', '<span class="tag" data-i18n="marca.fam4.tag">Folhas de aplicação</span>'),
    lit('<p class="family-desc">Composições mais completas, que apresentam os pilares do laboratório (Pesquisa Aplicada, Inovação Científica, Engenharia de Software e Impacto Real) e o comportamento da marca em fundos claro e escuro. Úteis para avaliar a marca como sistema, não só como ícone isolado.</p>',
        '<p class="family-desc" data-i18n="marca.fam4.desc">Composições mais completas, que apresentam os pilares do laboratório (Pesquisa Aplicada, Inovação Científica, Engenharia de Software e Impacto Real) e o comportamento da marca em fundos claro e escuro. Úteis para avaliar a marca como sistema, não só como ícone isolado.</p>'),
    lit('<h3>Sistema com pilares - cor</h3>', '<h3 data-i18n="marca.fam4.c1.title">Sistema com pilares - cor</h3>'),
    lit('<p>Tagline "Construindo o futuro da IA" e os quatro pilares.</p>', '<p data-i18n="marca.fam4.c1.text">Tagline "Construindo o futuro da IA" e os quatro pilares.</p>'),
    lit('<div class="chips"><span class="chip">Sistema</span><span class="chip accent">Cor</span><span class="chip">PT</span></div>',
        '<div class="chips" data-i18n="marca.chips.sist_cor_pt"><span class="chip">Sistema</span><span class="chip accent">Cor</span><span class="chip">PT</span></div>'),
    lit('<h3>Sistema com pilares - mono</h3>', '<h3 data-i18n="marca.fam4.c2.title">Sistema com pilares - mono</h3>'),
    lit('<p>Mesma estrutura em preto e branco.</p>', '<p data-i18n="marca.fam4.c2.text">Mesma estrutura em preto e branco.</p>'),
    lit('<div class="chips"><span class="chip">Sistema</span><span class="chip">Mono</span><span class="chip">PT</span></div>',
        '<div class="chips" data-i18n="marca.chips.sist_mono_pt"><span class="chip">Sistema</span><span class="chip">Mono</span><span class="chip">PT</span></div>'),
    lit('<h3>Par claro/escuro - bilíngue</h3>', '<h3 data-i18n="marca.fam4.c3.title">Par claro/escuro - bilíngue</h3>'),
    lit('<p>Mesma marca em fundo branco (EN) e fundo navy (PT).</p>', '<p data-i18n="marca.fam4.c3.text">Mesma marca em fundo branco (EN) e fundo navy (PT).</p>'),
    lit('<div class="chips"><span class="chip">Sistema</span><span class="chip accent">Cor</span><span class="chip">EN/PT</span></div>',
        '<div class="chips" data-i18n="marca.chips.sist_cor_enpt"><span class="chip">Sistema</span><span class="chip accent">Cor</span><span class="chip">EN/PT</span></div>'),
    lit('<h2>Brindes e aplicações</h2>', '<h2 data-i18n="marca.merch.title">Brindes e aplicações</h2>'),
    lit('<p>Em brindes e materiais promocionais, use o símbolo isolado (o "A" com o sol e o horizonte). Ele se mantém legível em superfícies pequenas e curvas.</p>',
        '<p data-i18n="marca.merch.subtitle">Em brindes e materiais promocionais, use o símbolo isolado (o "A" com o sol e o horizonte). Ele se mantém legível em superfícies pequenas e curvas.</p>'),
    lit('<figcaption class="info"><h3>Canecas</h3><p>Símbolo colorido centralizado sobre caneca branca.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m1"><h3>Canecas</h3><p>Símbolo colorido centralizado sobre caneca branca.</p></figcaption>'),
    lit('<figcaption class="info"><h3>Bonés</h3><p>Símbolo aplicado na frente do boné branco.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m2"><h3>Bonés</h3><p>Símbolo aplicado na frente do boné branco.</p></figcaption>'),
    lit('<figcaption class="info"><h3>Cuia de chimarrão</h3><p>Porongo natural com o símbolo aplicado no corpo da cuia.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m3"><h3>Cuia de chimarrão</h3><p>Porongo natural com o símbolo aplicado no corpo da cuia.</p></figcaption>'),
    lit('<figcaption class="info"><h3>Cordões</h3><p>Símbolo repetido na fita e no porta-crachá.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m4"><h3>Cordões</h3><p>Símbolo repetido na fita e no porta-crachá.</p></figcaption>'),
    lit('<figcaption class="info"><h3>Chaveiros</h3><p>Tag navy com filete dourado e símbolo em branco.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m5"><h3>Chaveiros</h3><p>Tag navy com filete dourado e símbolo em branco.</p></figcaption>'),
    lit('<figcaption class="info"><h3>Bomba de chimarrão</h3><p>Bomba de prata com etiqueta da marca.</p></figcaption>',
        '<figcaption class="info" data-i18n="marca.m6"><h3>Bomba de chimarrão</h3><p>Bomba de prata com etiqueta da marca.</p></figcaption>'),
    lit('<p style="font-size: 0.78rem; color: var(--color-text-medium); margin-top: 1.25rem; text-align: center;">',
        '<p style="font-size: 0.78rem; color: var(--color-text-medium); margin-top: 1.25rem; text-align: center;" data-i18n="marca.merch.credits">'),
    lit('<h2>Propostas e ideias são bem-vindas</h2>', '<h2 data-i18n="marca.feedback.title">Propostas e ideias são bem-vindas</h2>'),
    lit('<p>Esta identidade está sendo construída de forma colaborativa. Tem uma sugestão de cor, símbolo, tipografia, tagline ou até uma proposta de logo inteira? Compartilhe conosco - toda contribuição ajuda a definir a cara do AI Horizon Labs.</p>',
        '<p data-i18n="marca.feedback.text">Esta identidade está sendo construída de forma colaborativa. Tem uma sugestão de cor, símbolo, tipografia, tagline ou até uma proposta de logo inteira? Compartilhe conosco - toda contribuição ajuda a definir a cara do AI Horizon Labs.</p>'),
    wrap('marca.feedback.send', '<i class="fas fa-envelope"></i> Enviar proposta'),
    lit('<a href="contato.html" class="btn btn-secondary">Página de contato</a>',
        '<a href="contato.html" class="btn btn-secondary" data-i18n="marca.feedback.contactpage">Página de contato</a>'),
]


def apply_ops(name, content, ops, required):
    for op in ops:
        kind = op[0]
        if kind == 'lit':
            _, old, new = op
            if old in content:
                content = content.replace(old, new)
            elif required:
                misses.append(f'{name}: LITERAL nao encontrado: {old[:80]!r}')
        elif kind == 'rx':
            _, pat, repl = op
            new_content, n = re.subn(pat, repl, content)
            if n == 0 and required:
                misses.append(f'{name}: REGEX sem match: {pat[:80]!r}')
            content = new_content
    return content


for name in PAGES:
    p = ROOT / name
    content = p.read_text(encoding='utf-8')
    content = apply_ops(name, content, SHARED, required=False)
    content = apply_ops(name, content, PER.get(name, []), required=True)
    p.write_text(content, encoding='utf-8')
    print(f'OK {name}')

print('\n--- MISSES ---')
if misses:
    for m in misses:
        print(m)
else:
    print('nenhum')
