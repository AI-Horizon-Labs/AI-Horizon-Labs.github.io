#!/usr/bin/env python3
"""
Script para converter arquivos Markdown em JavaScript
Gera um arquivo com todos os dados embutidos
"""

import os
import json
import re
from pathlib import Path

def parse_frontmatter(content):
    """Parse YAML front matter do arquivo markdown"""
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)
    
    if not match:
        return {}, content
    
    frontmatter_text, markdown = match.groups()
    data = {}
    
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()
            
            # Remove aspas
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            
            data[key] = value
    
    return data, markdown.strip()

def load_content_files(directory):
    """Carrega todos os arquivos .md de um diretório"""
    content_dir = Path('_content') / directory
    items = []
    
    if not content_dir.exists():
        return items
    
    for md_file in sorted(content_dir.glob('*.md')):
        # README.md documenta o formato; não é um item de conteúdo
        if md_file.name.lower() == 'readme.md':
            continue
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        data, markdown = parse_frontmatter(content)
        items.append({
            'data': data,
            'content': markdown
        })
    
    return items

# Nomes completos dos eventos (para exibição agrupada)
EVENT_INFO = {
    "SBSeg":     {"nome": "Simpósio Brasileiro em Segurança da Informação e de Sistemas Computacionais", "ordem": 1},
    "SBRC":      {"nome": "Simpósio Brasileiro de Redes de Computadores e Sistemas Distribuídos", "ordem": 2},
    "SBSI":      {"nome": "Simpósio Brasileiro de Sistemas de Informação", "ordem": 3},
    "ERRC":      {"nome": "Escola Regional de Redes de Computadores", "ordem": 4},
    "ERES":      {"nome": "Escola Regional de Engenharia de Software", "ordem": 5},
    "ERAMIA-RS": {"nome": "Escola Regional de Aprendizado de Máquina e Inteligência Artificial do RS", "ordem": 6},
}

TRACK_LABEL = {
    "principal": "Trilha Principal",
    "estendido": "Anais Estendidos",
}

# Títulos que são front-matter dos anais (prefácio/organização), não publicações
NAO_PUBLICACAO = ("Apresentação e Organização", "Prefácio e Organização")


def strip_accents(text):
    """Remove acentos para comparação de nomes"""
    import unicodedata
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn').lower()


def load_publications_from_sol():
    """Carrega publicações do acervo papers/sol-anais/index.json"""
    index_path = Path('papers/sol-anais/index.json')
    if not index_path.exists():
        print(f"⚠️  {index_path} não encontrado; pulando publicações.")
        return []

    with open(index_path, 'r', encoding='utf-8') as f:
        raw = json.load(f)

    items = []
    for p in raw:
        if p.get('title', '').strip() in NAO_PUBLICACAO:
            continue
        event = p.get('event', '')
        track = p.get('track', '')
        info = EVENT_INFO.get(event, {"nome": event, "ordem": 99})
        track_label = TRACK_LABEL.get(track, track.capitalize())
        venue = f"{event} {p.get('year', '')} — {track_label}".strip()
        authors = '; '.join(a.strip() for a in p.get('authors', '').split(',') if a.strip())
        items.append({
            'data': {
                'event': event,
                'event_nome': info['nome'],
                'event_ordem': info['ordem'],
                'track': track,
                'track_label': track_label,
                'type': 'Conferência',
                'title': p.get('title', ''),
                'authors': authors,
                'venue': venue,
                'year': p.get('year', ''),
                'link': p.get('sol_link', ''),
                'pdf': p.get('pdf_url', ''),
            },
            'content': ''
        })
    return items


def load_authors_from_manifest(publications):
    """Carrega autores/coautores de papers/autores-fotos/fotos-manifest.json,
    contando o número de publicações de cada um no acervo."""
    manifest_path = Path('papers/autores-fotos/fotos-manifest.json')
    if not manifest_path.exists():
        print(f"⚠️  {manifest_path} não encontrado; pulando autores.")
        return []

    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Listas de autores por publicação, normalizadas
    pub_author_lists = []
    for pub in publications:
        names = [strip_accents(a.strip()) for a in pub['data']['authors'].split(';')]
        pub_author_lists.append(names)

    items = []
    for foto in manifest.get('fotos', []):
        nome = foto['autor']
        norm = strip_accents(nome)
        SUFIXOS = {'junior', 'jr', 'filho', 'neto', 'sobrinho', 'segundo'}
        tokens = [t for t in norm.replace('.', ' ').split() if len(t) > 1 and t not in SUFIXOS]
        primeiro, ultimo = (tokens[0], tokens[-1]) if tokens else ('', '')
        # Conta publicações em que primeiro e último nome aparecem no mesmo autor
        count = 0
        for names in pub_author_lists:
            if any(primeiro in n and ultimo in n for n in names):
                count += 1
        items.append({
            'data': {
                'nome': nome,
                'foto': f"papers/autores-fotos/{foto['arquivo']}",
                'perfil': foto.get('perfil', ''),
                'publicacoes': count,
            },
            'content': ''
        })

    # Ordena por número de publicações (desc) e depois nome
    items.sort(key=lambda x: (-x['data']['publicacoes'], x['data']['nome']))
    return items


def escape_js_string(text):
    """Escapa strings para JavaScript"""
    text = text.replace('\\', '\\\\')
    text = text.replace('`', '\\`')
    text = text.replace('${', '\\${')
    return text

def generate_js_content():
    """Gera o conteúdo JavaScript com todos os dados"""
    members = load_content_files('members')
    news = load_content_files('news')
    projects = load_content_files('projects')
    # Publicações e autores vêm do acervo em papers/ (fonte única de verdade)
    publications = load_publications_from_sol()
    authors = load_authors_from_manifest(publications)
    awards = load_content_files('award')
    
    js_code = """/**
 * AI Horizon Labs - Content Data
 * Dados gerados automaticamente dos arquivos Markdown
 * NÃO EDITE ESTE ARQUIVO MANUALMENTE - Use build-content.py
 */

"""
    
    # Members
    js_code += "const MEMBERS_DATA = " + json.dumps(members, ensure_ascii=False, indent=2) + ";\n\n"
    
    # News
    js_code += "const NEWS_DATA = " + json.dumps(news, ensure_ascii=False, indent=2) + ";\n\n"
    
    # Projects
    js_code += "const PROJECTS_DATA = " + json.dumps(projects, ensure_ascii=False, indent=2) + ";\n\n"
    
    # Publications
    js_code += "const PUBLICATIONS_DATA = " + json.dumps(publications, ensure_ascii=False, indent=2) + ";\n\n"

    # Authors / Coautores
    js_code += "const AUTHORS_DATA = " + json.dumps(authors, ensure_ascii=False, indent=2) + ";\n\n"

    # Awards
    js_code += "const AWARDS_DATA = " + json.dumps(awards, ensure_ascii=False, indent=2) + ";\n\n"
    
    return js_code

def main():
    print("🔄 Gerando content-data.js dos arquivos Markdown...")
    
    js_content = generate_js_content()
    
    output_file = Path('assets/js/content-data.js')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Arquivo gerado: {output_file}")
    print(f"📦 Tamanho: {len(js_content)} bytes")
    print("\n💡 Execute este script sempre que modificar arquivos em _content/")

if __name__ == '__main__':
    main()
