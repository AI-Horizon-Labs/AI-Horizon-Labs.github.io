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
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        data, markdown = parse_frontmatter(content)
        items.append({
            'data': data,
            'content': markdown
        })
    
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
    publications = load_content_files('publications')
    
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
