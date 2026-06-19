/**
 * AI Horizon Labs - Content Loader
 * Carrega e renderiza conteúdo dos dados embutidos
 */

// ============================================
// MEMBROS
// ============================================
function loadMembers() {
  // Organizar por categoria
  const organized = {
    coordenacao: [],
    pesquisadores: [],
    discentes: []
  };
  
  MEMBERS_DATA.forEach(member => {
    const category = member.data.category || 'discentes';
    organized[category].push(member);
  });
  
  return organized;
}

function renderMember(member, isCoordinator = false) {
  const size = isCoordinator ? '150px' : '120px';
  const iconSize = isCoordinator ? '4rem' : '3rem';
  const icon = isCoordinator ? 'fa-user' : 'fa-user-graduate';
  
  const interests = member.content.match(/## Interesses de Pesquisa\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
  let interestsList = '';
  if (interests && interests[1]) {
    const items = interests[1].match(/- (.+)/g);
    if (items) {
      interestsList = items.map(i => i.replace('- ', '')).join(', ');
    }
  }
  
  const bio = member.content.match(/## Biografia\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
  const bioText = bio ? bio[1].trim() : '';
  
  const links = `
    ${member.data.lattes ? `<a href="${member.data.lattes}" target="_blank" rel="noopener"><i class="fas fa-graduation-cap" title="Lattes"></i></a>` : ''}
    ${member.data.scholar ? `<a href="${member.data.scholar}" target="_blank" rel="noopener"><i class="fas fa-book" title="Google Scholar"></i></a>` : ''}
    ${member.data.orcid ? `<a href="https://orcid.org/${member.data.orcid}" target="_blank" rel="noopener"><i class="fab fa-orcid" title="ORCID"></i></a>` : ''}
    ${member.data.linkedin ? `<a href="${member.data.linkedin}" target="_blank" rel="noopener"><i class="fab fa-linkedin" title="LinkedIn"></i></a>` : ''}
    ${member.data.website ? `<a href="${member.data.website}" target="_blank" rel="noopener"><i class="fas fa-globe" title="Site pessoal"></i></a>` : ''}
    ${member.data.email ? `<a href="mailto:${member.data.email}"><i class="fas fa-envelope" title="Email"></i></a>` : ''}
  `;
  
  // Renderizar foto ou placeholder (estilo redondo)
  const photoSize = isCoordinator ? '200px' : '150px';
  const placeholderHtml = `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f0f4f8,#e2e8f0);display:flex;align-items:center;justify-content:center;border-radius:50%;border:2px dashed #cbd5e0;">
         <i class="fas ${icon}" style="font-size:${iconSize};color:#a0aec0;"></i>
       </div>`;
  const photoHtml = member.data.photo
    ? `<img src="${member.data.photo}" alt="${member.data.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.innerHTML='${placeholderHtml.replace(/\n\s*/g, '').replace(/'/g, "\\'").replace(/"/g, '&quot;')}'">`
    : placeholderHtml;

  return `
    <div class="card member-card" style="padding:0;overflow:hidden;">
      <div style="padding:var(--spacing-md);padding-bottom:0;display:flex;justify-content:center;">
        <div style="width:${photoSize};height:${photoSize};overflow:hidden;border-radius:50%;">
          ${photoHtml}
        </div>
      </div>
      <div style="padding:var(--spacing-md);">
        <h${isCoordinator ? '3' : '4'} class="member-name"${isCoordinator ? '' : ' style="font-size:1.125rem;"'}>${member.data.name}</h${isCoordinator ? '3' : '4'}>
        <p class="member-role">${member.data.role}</p>
        ${bioText && isCoordinator ? `<p class="member-bio">${bioText}</p>` : ''}
        ${interestsList && isCoordinator ? `<p style="color:var(--color-text-medium);margin-bottom:var(--spacing-sm);"><strong>Interesses:</strong> ${interestsList}</p>` : ''}
        <div class="member-links">${links}</div>
      </div>
    </div>
  `;
}

function renderMembersPage() {
  const coordContainer = document.getElementById('coordenacao-container');
  const pesqContainer = document.getElementById('pesquisadores-container');
  const discContainer = document.getElementById('discentes-container');
  
  const members = loadMembers();
  
  // Coordenação
  if (coordContainer && members.coordenacao.length > 0) {
    coordContainer.innerHTML = `
      <div class="section-title"><h2>Coordenação</h2></div>
      <div class="grid grid-2">
        ${members.coordenacao.map(m => renderMember(m, true)).join('')}
      </div>
    `;
  }
  
  // Pesquisadores
  if (pesqContainer && members.pesquisadores.length > 0) {
    pesqContainer.innerHTML = `
      <div class="section-title"><h2>Pesquisadores</h2></div>
      <div class="grid grid-3">
        ${members.pesquisadores.map(m => renderMember(m, true)).join('')}
      </div>
    `;
  }
  
  // Discentes
  if (discContainer && members.discentes.length > 0) {
    discContainer.innerHTML = `
      <div class="section-title"><h2>Discentes</h2></div>
      <div class="grid grid-4">
        ${members.discentes.map(m => renderMember(m, false)).join('')}
      </div>
    `;
  }
}

// ============================================
// NOTÍCIAS
// ============================================
function loadNews() {
  console.log('Carregando notícias dos dados embutidos');
  console.log('Notícias carregadas:', NEWS_DATA.length);
  
  // Ordenar por data (mais recente primeiro)
  return NEWS_DATA.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
}

function renderNewsItem(newsItem) {
  const date = new Date(newsItem.data.date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const readMoreLink = newsItem.data.link
    ? `<a href="${newsItem.data.link}" style="display:inline-block;margin-top:.6rem;font-size:.85rem;font-weight:600;color:var(--color-primary);">Leia mais &rarr;</a>`
    : '';

  return `
    <div class="news-item">
      <div class="news-date">
        <span class="news-date-day">${day}</span>
        <span class="news-date-month">${month}</span>
      </div>
      <div class="news-content">
        <h3>${newsItem.data.title}</h3>
        <p>${newsItem.data.summary}</p>
        ${readMoreLink}
      </div>
    </div>
  `;
}

function renderNewsPage() {
  const container = document.getElementById('noticias-container');
  if (!container) return;
  
  const news = loadNews();
  
  if (news.length === 0) {
    container.innerHTML = '<p>Nenhuma notícia disponível no momento.</p>';
    return;
  }
  
  container.innerHTML = news.map(n => renderNewsItem(n)).join('');
}

// ============================================
// PROJETOS
// ============================================
// Áreas temáticas dos projetos, ordenadas por relevância/impacto.
// A ordem deste array define a ordem das seções na página.
const PROJECT_THEMES = [
  {
    key: 'ia-ciberseguranca',
    title: 'Inteligência Artificial e Cibersegurança',
    icon: 'fa-shield-halved',
    description: 'Aprendizado de máquina, IA explicável e modelos de linguagem aplicados à detecção de ameaças, malwares e intrusões em sistemas e dispositivos conectados.'
  },
  {
    key: 'aprendizado-distribuidos',
    title: 'Aprendizado Profundo, Redes e Sistemas Distribuídos',
    icon: 'fa-network-wired',
    description: 'Técnicas de aprendizado profundo, blockchain e consenso distribuído como mecanismos de inteligência para redes de computadores e sistemas distribuídos de larga escala.'
  },
  {
    key: 'ia-aplicada',
    title: 'IA Aplicada à Saúde e ao Agronegócio',
    icon: 'fa-seedling',
    description: 'Soluções de software e inteligência artificial transferidas para domínios concretos — saúde, agricultura de precisão, pecuária e agricultura familiar.'
  },
  {
    key: 'educacao-empreendedorismo',
    title: 'Educação, Engenharia de Software e Empreendedorismo',
    icon: 'fa-graduation-cap',
    description: 'Formação de recursos humanos, boas práticas de Engenharia de Software, conscientização em segurança e fomento à cultura empreendedora e à inovação.'
  }
];

function loadProjects() {
  // Agrupar por categoria temática, preservando a ordem de impacto do array
  const groups = {};
  PROJECTS_DATA.forEach(p => {
    const theme = p.data.theme || 'outros';
    (groups[theme] = groups[theme] || []).push(p);
  });
  return groups;
}

// Projetos financiados pela RNP (Grupos de Trabalho) recebem destaque visual.
// O front matter é parseado como texto, então 'rnp: true' chega como a string "true".
function isRnpProject(project) {
  return project.data.rnp === 'true' || project.data.rnp === true;
}

function renderProject(project) {
  const d = project.data;
  const isActive = d.status === 'ativo';
  const isRnp = isRnpProject(project);

  const description = project.content.match(/## Descrição\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
  const descText = description ? description[1].trim() : '';

  const statusLabel = isActive ? 'Ativo' : 'Concluído';
  const statusColor = isActive ? 'var(--color-accent)' : '#94a3b8';

  // Selos de impacto
  const badges = [];
  if (isRnp) {
    badges.push('<span class="proj-badge proj-badge-rnp"><i class="fas fa-award"></i> Projeto RNP</span>');
    badges.push('<span class="proj-badge proj-badge-rnp"><i class="fas fa-arrow-right-arrow-left"></i> Transferência tecnológica</span>');
  }
  if (d.international) badges.push('<span class="proj-badge"><i class="fas fa-globe"></i> Cooperação internacional</span>');
  if (d.sector) badges.push('<span class="proj-badge"><i class="fas fa-industry"></i> Interação com setor produtivo</span>');
  const badgesHtml = badges.length
    ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin:var(--spacing-sm) 0;">${badges.join('')}</div>`
    : '';

  // Link para o site do projeto (quando disponível)
  const siteHtml = d.website
    ? `<p style="margin-top:var(--spacing-sm);"><a href="${d.website}" target="_blank" rel="noopener" class="proj-site-link"><i class="fas fa-up-right-from-square"></i> Site do projeto</a></p>`
    : '';

  // Tags de palavras-chave
  const tagsHtml = d.keywords
    ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:var(--spacing-sm);">${
        d.keywords.split('/').map(k => `<span class="proj-tag">${k.trim()}</span>`).join('')
      }</div>`
    : '';

  return `
    <div class="card${isRnp ? ' card-rnp' : ''}" style="display:flex;flex-direction:column;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span class="publication-type" style="background-color:${statusColor};">${statusLabel}</span>
        <span style="font-size:.75rem;color:var(--color-text-medium);font-family:monospace;">${d.registro || ''}</span>
      </div>
      <h3 class="card-title" style="margin-top:var(--spacing-sm);">${d.title}</h3>
      <p class="card-text">${descText}</p>
      ${badgesHtml}
      <p style="margin-top:auto;padding-top:var(--spacing-sm);font-size:.95rem;">
        <strong>Coordenação:</strong> ${d.coordinator}<br>
        ${d.lab ? `<strong>Grupo:</strong> ${d.lab}<br>` : ''}
        <strong>Modalidade:</strong> ${d.funding}<br>
        ${d.financiador ? `<strong>Financiador:</strong> ${d.financiador}<br>` : ''}
        ${d.valor ? `<strong>Valor:</strong> ${d.valor}<br>` : ''}
        ${d.period ? `<strong>Período:</strong> ${d.period}` : ''}
      </p>
      ${siteHtml}
      ${tagsHtml}
    </div>
  `;
}

function renderProjectsPage() {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  const groups = loadProjects();
  const total = PROJECTS_DATA.length;
  const ativos = PROJECTS_DATA.filter(p => p.data.status === 'ativo').length;

  let html = `
    <p style="font-size:1.125rem;color:var(--color-text-medium);max-width:60ch;margin-bottom:var(--spacing-lg);">
      ${total} projetos institucionais de pesquisa, inovação, extensão, ensino e empreendedorismo
      (${ativos} em andamento), organizados por área temática e ordenados por relevância e impacto.
    </p>
  `;

  // Destaque: Grupos de Trabalho financiados pela RNP (PD&I com transferência tecnológica)
  const rnpProjects = PROJECTS_DATA.filter(p => isRnpProject(p));
  if (rnpProjects.length > 0) {
    html += `
      <div class="section-title section-title-rnp" style="margin-top:var(--spacing-md);">
        <h2><i class="fas fa-award" style="color:var(--color-primary);margin-right:.5rem;"></i>Grupos de Trabalho RNP</h2>
        <p style="color:var(--color-text-medium);max-width:75ch;margin-top:.5rem;">
          Projetos de pesquisa, desenvolvimento e inovação (PD&amp;I) com transferência tecnológica,
          financiados pela Rede Nacional de Ensino e Pesquisa (RNP) e conduzidos como Grupos de Trabalho.
        </p>
      </div>
      <div class="grid grid-2">
        ${rnpProjects.map(p => renderProject(p)).join('')}
      </div>
    `;
  }

  PROJECT_THEMES.forEach(theme => {
    // Projetos RNP já aparecem na seção em destaque acima; evita duplicação.
    const projs = (groups[theme.key] || []).filter(p => !isRnpProject(p));
    if (!projs || projs.length === 0) return;
    html += `
      <div class="section-title" style="margin-top:var(--spacing-xl);">
        <h2><i class="fas ${theme.icon}" style="color:var(--color-primary);margin-right:.5rem;"></i>${theme.title}</h2>
        <p style="color:var(--color-text-medium);max-width:70ch;margin-top:.5rem;">${theme.description}</p>
      </div>
      <div class="grid grid-2">
        ${projs.map(p => renderProject(p)).join('')}
      </div>
    `;
  });

  html += renderContributors();

  container.innerHTML = html;
}

// Lista consolidada de colaboradores de todos os projetos
function renderContributors() {
  if (typeof CONTRIBUTORS_DATA === 'undefined' || CONTRIBUTORS_DATA.length === 0) return '';

  const tipoColor = {
    'Docente':  'rgba(37,99,235,.12)',
    'Técnico':  'rgba(16,185,129,.14)',
    'Discente': 'rgba(245,158,11,.14)',
    'Externo':  'rgba(100,116,139,.14)'
  };

  const cards = CONTRIBUTORS_DATA.map(c => {
    const d = c.data;
    const bg = tipoColor[d.tipo] || 'rgba(100,116,139,.14)';
    const coordTag = d.coordena > 0
      ? '<i class="fas fa-star" title="Coordena projeto(s)" style="color:var(--color-accent);font-size:.7rem;margin-left:4px;"></i>'
      : '';
    const plural = d.projetos > 1 ? 'projetos' : 'projeto';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:10px;background:${bg};">
        <div style="min-width:0;">
          <div style="font-weight:600;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.nome}${coordTag}</div>
          <div style="font-size:.72rem;color:var(--color-text-medium);">${d.tipo || ''}</div>
        </div>
        <span class="proj-badge" style="flex-shrink:0;">${d.projetos} ${plural}</span>
      </div>`;
  }).join('');

  return `
    <div class="section-title" style="margin-top:var(--spacing-xl);">
      <h2><i class="fas fa-users" style="color:var(--color-primary);margin-right:.5rem;"></i>Colaboradores dos Projetos</h2>
      <p style="color:var(--color-text-medium);max-width:70ch;margin-top:.5rem;">
        ${CONTRIBUTORS_DATA.length} pessoas — docentes, discentes, técnicos e colaboradores externos —
        que integram as equipes executoras dos projetos. <i class="fas fa-star" style="color:var(--color-accent);font-size:.7rem;"></i> indica coordenação.
      </p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;">
      ${cards}
    </div>
  `;
}

// ============================================
// PUBLICAÇÕES
// ============================================
function renderPublication(pub) {
  const d = pub.data;
  const links = `
    ${d.link ? `<a href="${d.link}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Publicação (SOL/SBC)</a>` : ''}
    ${d.pdf ? `<a href="${d.pdf}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
    ${d.doi ? `<a href="https://doi.org/${d.doi}" target="_blank" rel="noopener"><i class="fas fa-link"></i> DOI</a>` : ''}
    ${d.github ? `<a href="${d.github}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Código</a>` : ''}
    ${d.dataset ? `<a href="${d.dataset}" target="_blank" rel="noopener"><i class="fas fa-database"></i> Dataset</a>` : ''}
  `;

  return `
    <div class="publication-item">
      <span class="publication-type">${d.venue || d.type}</span>
      <h3 class="publication-title">${d.title}</h3>
      <p class="publication-authors">${d.authors || ''}</p>
      <div class="publication-links">${links}</div>
    </div>
  `;
}

// Agrupa as publicações por evento e ordena cronologicamente dentro de cada evento
function groupPublicationsByEvent() {
  const groups = {};
  PUBLICATIONS_DATA.forEach(pub => {
    const key = pub.data.event || 'Outros';
    (groups[key] = groups[key] || []).push(pub);
  });

  const trackRank = { principal: 0, estendido: 1 };
  return Object.keys(groups)
    .map(event => {
      const pubs = groups[event].sort((a, b) => {
        if (b.data.year !== a.data.year) return b.data.year - a.data.year;
        const tr = (trackRank[a.data.track] ?? 9) - (trackRank[b.data.track] ?? 9);
        if (tr !== 0) return tr;
        return a.data.title.localeCompare(b.data.title, 'pt-BR');
      });
      return {
        event,
        nome: pubs[0].data.event_nome || event,
        ordem: pubs[0].data.event_ordem ?? 99,
        pubs
      };
    })
    .sort((a, b) => a.ordem - b.ordem);
}

function renderPublicationsPage() {
  const container = document.getElementById('publicacoes-container');
  if (!container) return;

  if (typeof PUBLICATIONS_DATA === 'undefined' || PUBLICATIONS_DATA.length === 0) {
    container.innerHTML = '<p>Nenhuma publicação disponível no momento.</p>';
    return;
  }

  const eventGroups = groupPublicationsByEvent();

  let html = `
    <p style="font-size:1.125rem;color:var(--color-text-medium);max-width:65ch;margin-bottom:var(--spacing-lg);">
      ${PUBLICATIONS_DATA.length} publicações em anais de eventos científicos, organizadas por evento.
      Cada trabalho traz o link direto para a publicação na Biblioteca Digital da SBC (SOL) e o PDF.
    </p>
  `;

  eventGroups.forEach(g => {
    html += `
      <div class="section-title" style="margin-top:var(--spacing-xl);">
        <h2><i class="fas fa-book" style="color:var(--color-primary);margin-right:.5rem;"></i>${g.event}
          <span style="font-weight:400;color:var(--color-text-medium);font-size:1rem;">(${g.pubs.length})</span>
        </h2>
        <p style="color:var(--color-text-medium);max-width:75ch;margin-top:.25rem;">${g.nome}</p>
      </div>
      ${g.pubs.map(p => renderPublication(p)).join('')}
    `;
  });

  container.innerHTML = html;

  renderAuthorsSection();
}

// ============================================
// AUTORES / COAUTORES
// ============================================
function renderAuthorsSection() {
  const container = document.getElementById('autores-container');
  if (!container || typeof AUTHORS_DATA === 'undefined' || AUTHORS_DATA.length === 0) return;

  const cards = AUTHORS_DATA.map(a => {
    const d = a.data;
    const inner = `
      <img src="${d.foto}" alt="${d.nome}" class="author-photo" loading="lazy"
           onerror="this.style.display='none'">
      <div class="author-info">
        <h3 class="author-name">${d.nome}</h3>
        <p class="author-meta">${d.publicacoes} publicações no acervo</p>
      </div>
    `;
    return d.perfil
      ? `<a class="author-card" href="${d.perfil}" target="_blank" rel="noopener" title="Google Scholar de ${d.nome}">${inner}</a>`
      : `<div class="author-card">${inner}</div>`;
  }).join('');

  container.innerHTML = `
    <div class="section-title">
      <h2><i class="fas fa-users" style="color:var(--color-primary);margin-right:.5rem;"></i>Principais Autores e Coautores</h2>
      <p style="color:var(--color-text-medium);max-width:75ch;margin-top:.25rem;">
        Pesquisadores com três ou mais trabalhos no acervo. Clique para acessar o perfil no Google Scholar.
      </p>
    </div>
    <div class="authors-grid">${cards}</div>
  `;
}

// ============================================
// HOME PAGE STATS
// ============================================
function updateHomeStats() {
  const statPesquisadores = document.getElementById('stat-pesquisadores');
  const statPublicacoes = document.getElementById('stat-publicacoes');
  const statProjetos = document.getElementById('stat-projetos');
  
  if (statPesquisadores) {
    const totalPesquisadores = MEMBERS_DATA.length;
    statPesquisadores.textContent = totalPesquisadores + '+';
  }
  
  if (statPublicacoes) {
    const totalPublicacoes = PUBLICATIONS_DATA.length;
    statPublicacoes.textContent = totalPublicacoes + '+';
  }
  
  if (statProjetos) {
    const projetosAtivos = PROJECTS_DATA.filter(p => p.data.status === 'ativo').length;
    statProjetos.textContent = projetosAtivos + '+';
  }
}

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  console.log('Content Loader iniciado. Página:', path);
  console.log('Dados disponíveis:', {
    membros: typeof MEMBERS_DATA !== 'undefined' ? MEMBERS_DATA.length : 0,
    noticias: typeof NEWS_DATA !== 'undefined' ? NEWS_DATA.length : 0,
    projetos: typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA.length : 0,
    publicacoes: typeof PUBLICATIONS_DATA !== 'undefined' ? PUBLICATIONS_DATA.length : 0
  });
  
  if (path.includes('index.html') || path.endsWith('/')) {
    console.log('Atualizando estatísticas da home...');
    updateHomeStats();
  } else if (path.includes('membros.html')) {
    console.log('Carregando membros...');
    renderMembersPage();
  } else if (path.includes('noticias.html')) {
    console.log('Carregando notícias...');
    renderNewsPage();
  } else if (path.includes('projetos.html')) {
    console.log('Carregando projetos...');
    renderProjectsPage();
  } else if (path.includes('publicacoes.html')) {
    console.log('Carregando publicações...');
    renderPublicationsPage();
  }
});
