#!/usr/bin/env python3
"""Coleta artigos dos anais SOL/SBC em que ha coautoria do grupo.

Le as paginas de edicao (issue) do OJS da SOL/SBC, extrai titulo, autores,
link e PDF de cada artigo, filtra pelos sobrenomes do grupo e mescla o
resultado em papers/sol-anais/index.json (+ index.csv + README.md). Entradas
ja existentes (mesmo sol_link) sao preservadas e nao duplicadas.

Uso:
    python3 scripts/fetch-sol-anais.py SBRC 2026 principal 1678
    python3 scripts/fetch-sol-anais.py SBRC 2026 estendido 1687
    python3 scripts/fetch-sol-anais.py SBSeg 2026 principal 1728
    python3 scripts/fetch-sol-anais.py SBSeg 2026 estendido 1730

Depois rode `python3 build-content.py` para regerar assets/js/content-data.js.
"""

import csv
import datetime
import html
import json
import re
import sys
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_JSON = ROOT / 'papers' / 'sol-anais' / 'index.json'
INDEX_CSV = ROOT / 'papers' / 'sol-anais' / 'index.csv'
README = ROOT / 'papers' / 'sol-anais' / 'README.md'

# Caminho OJS de cada evento/trilha na SOL
OJS_PATH = {
    ('SBRC', 'principal'): 'sbrc',
    ('SBRC', 'estendido'): 'sbrc_estendido',
    ('SBSeg', 'principal'): 'sbseg',
    ('SBSeg', 'estendido'): 'sbseg_estendido',
    ('SBSI', 'principal'): 'sbsi',
    ('SBSI', 'estendido'): 'sbsi_estendido',
    ('ERRC', 'principal'): 'errc',
    ('ERES', 'principal'): 'eres',
    ('ERAMIA-RS', 'principal'): 'eramia-rs',
}

# Criterio de inclusao: sobrenomes distintivos dos coordenadores do grupo.
# 'quincozes' sozinho traria Vagner e Camilla, que sao outras pessoas; por isso
# exige-se o primeiro nome Silvio.
GROUP_MATCHERS = (
    ('kreutz',),
    ('mansilha',),
    ('silvio', 'quincozes'),
)


def strip_accents(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


def is_group_paper(authors):
    for autor in authors.split(','):
        norm = strip_accents(autor).lower()
        if any(all(tok in norm for tok in tokens) for tokens in GROUP_MATCHERS):
            return True
    return False


def slugify(title):
    slug = re.sub(r'[^A-Za-z0-9]+', '-', strip_accents(title)).strip('-')
    return slug[:90].rstrip('-')


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode('utf-8', 'replace')


def clean(text):
    return html.unescape(re.sub(r'\s+', ' ', text)).strip()


def parse_issue(event, year, track, issue_id):
    path = OJS_PATH[(event, track)]
    url = f'https://sol.sbc.org.br/index.php/{path}/issue/view/{issue_id}'
    page = fetch(url)

    artigos = []
    for bloco in page.split('obj_article_summary')[1:]:
        m_title = re.search(r'<div class="title">\s*<a href="([^"]+)">(.*?)</a>', bloco, re.S)
        if not m_title:
            continue
        sol_link = m_title.group(1)
        title = clean(re.sub(r'<[^>]+>', '', m_title.group(2)))

        m_auth = re.search(r'<div class="authors">(.*?)</div>', bloco, re.S)
        authors = clean(re.sub(r'<[^>]+>', '', m_auth.group(1))) if m_auth else ''

        m_pdf = re.search(r'class="obj_galley_link pdf" href="([^"]+)"', bloco)
        pdf_url = m_pdf.group(1).replace('/article/view/', '/article/download/') if m_pdf else ''

        artigo_id = sol_link.rstrip('/').split('/')[-1]
        artigos.append({
            'event': event,
            'year': str(year),
            'track': track,
            'title': title,
            'authors': authors,
            'sol_link': sol_link,
            'pdf_url': pdf_url,
            'file': f'{event}/{year}/{track}/{artigo_id}_{slugify(title)}.pdf',
        })

    do_grupo = [a for a in artigos if is_group_paper(a['authors'])]
    print(f'{event} {year} [{track}] issue {issue_id}: '
          f'{len(artigos)} artigos, {len(do_grupo)} do grupo')
    return do_grupo


def escrever_readme(registros):
    """Regera o README.md do acervo a partir dos registros, na mesma ordem de
    index.json (eventos e anos) e, dentro de cada ano, por trilha e titulo."""
    eventos = {}
    ordem_eventos = []
    for r in registros:
        if r['event'] not in eventos:
            eventos[r['event']] = {}
            ordem_eventos.append(r['event'])
        eventos[r['event']].setdefault(r['year'], []).append(r)

    hoje = datetime.date.today().isoformat()
    linhas = [
        '# Papers SOL/SBC: coautoria de Diego Kreutz, Rodrigo Mansilha ou Silvio Quincozes',
        '',
        'Coleta automática das últimas edições de cada evento (anais da trilha '
        '**principal** + anais **estendidos**), realizada com '
        f'`scripts/fetch-sol-anais.py`. Última atualização: {hoje}.',
        '',
        f'**Total: {len(registros)} artigos.** Critério de inclusão: lista de autores contendo '
        '`Kreutz`, `Mansilha`, ou `Silvio`+`Quincozes` (exclui Vagner/Camilla Quincozes, '
        'que são outras pessoas).',
        '',
        'Índices completos para processamento também em `index.csv` e `index.json`. '
        'Estrutura de pastas: `EVENTO/ANO/{principal,estendido}/<id>_<titulo>.pdf`.',
        '',
    ]

    rank = {'principal': 0, 'estendido': 1}
    for evento in ordem_eventos:
        linhas += ['', f'## {evento}', '']
        for ano, artigos in eventos[evento].items():
            linhas.append(f'### {ano}')
            for a in sorted(artigos, key=lambda r: (rank.get(r['track'], 9), r['title'])):
                linhas.append(f'- **[{a["track"]}]** {a["title"]}')
                linhas.append(f'  - Autores: {a["authors"]}')
                linhas.append(f'  - SOL: {a["sol_link"]}')
                linhas.append(f'  - PDF: `{a["file"]}`')
            linhas.append('')

    README.write_text('\n'.join(linhas).rstrip() + '\n', encoding='utf-8')


def merge(event, year, track, novos):
    """Substitui o bloco do (evento, ano, trilha) coletado, preservando a ordem
    dos demais registros e a ordem de publicacao dentro dos anais.

    Um bloco novo entra no bloco do proprio evento na posicao correta (ano
    decrescente, trilha principal antes da estendida); um evento inedito e
    acrescentado ao final.
    """
    registros = json.loads(INDEX_JSON.read_text(encoding='utf-8'))
    chave = (event, str(year), track)

    antigos = [r for r in registros
               if (r['event'], r['year'], r['track']) == chave]
    restantes = [r for r in registros
                 if (r['event'], r['year'], r['track']) != chave]

    # Preserva campos ja curados manualmente (ex.: file com PDF baixado)
    por_link = {r['sol_link']: r for r in antigos}
    for novo in novos:
        anterior = por_link.get(novo['sol_link'])
        if anterior:
            novo['file'] = anterior.get('file', novo['file'])

    ordem_track = {'principal': 0, 'estendido': 1}
    def posicao(r):
        return (-int(r['year']), ordem_track.get(r['track'], 9))

    # Indice de insercao: dentro do bloco do evento, na posicao de (ano, trilha)
    indices_evento = [i for i, r in enumerate(restantes) if r['event'] == event]
    if indices_evento:
        destino = next((i for i in indices_evento
                        if posicao(restantes[i]) > posicao({'year': str(year), 'track': track})),
                       indices_evento[-1] + 1)
    else:
        destino = len(restantes)

    registros = restantes[:destino] + novos + restantes[destino:]

    novos_links = {r['sol_link'] for r in novos} - set(por_link)
    for r in novos:
        if r['sol_link'] in novos_links:
            print(f'  + {r["title"]}')

    INDEX_JSON.write_text(json.dumps(registros, ensure_ascii=False, indent=2) + '\n',
                          encoding='utf-8')
    campos = ['event', 'year', 'track', 'title', 'authors', 'sol_link', 'pdf_url', 'file']
    with open(INDEX_CSV, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=campos)
        writer.writeheader()
        writer.writerows(registros)
    escrever_readme(registros)

    print(f'\n{len(novos_links)} novos registros; '
          f'{len(antigos)} ja existiam no bloco; total {len(registros)}.')


def main():
    if len(sys.argv) != 5:
        print(__doc__)
        sys.exit(1)
    event, year, track, issue_id = sys.argv[1:5]
    merge(event, year, track, parse_issue(event, year, track, issue_id))


if __name__ == '__main__':
    main()
