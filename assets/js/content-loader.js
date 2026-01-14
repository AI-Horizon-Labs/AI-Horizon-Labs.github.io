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
    ${member.data.lattes ? `<a href="${member.data.lattes}" target="_blank"><i class="fas fa-graduation-cap" title="Lattes"></i></a>` : ''}
    ${member.data.orcid ? `<a href="https://orcid.org/${member.data.orcid}" target="_blank"><i class="fab fa-orcid" title="ORCID"></i></a>` : ''}
    ${member.data.email ? `<a href="mailto:${member.data.email}"><i class="fas fa-envelope" title="Email"></i></a>` : ''}
  `;
  
  return `
    <div class="card member-card">
      <div style="width:${size};height:${size};border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-light));margin:0 auto var(--spacing-md);display:flex;align-items:center;justify-content:center;">
        <i class="fas ${icon}" style="font-size:${iconSize};color:white;"></i>
      </div>
      <h${isCoordinator ? '3' : '4'} class="member-name"${isCoordinator ? '' : ' style="font-size:1.125rem;"'}>${member.data.name}</h${isCoordinator ? '3' : '4'}>
      <p class="member-role">${member.data.role}</p>
      ${bioText && isCoordinator ? `<p class="member-bio">${bioText}</p>` : ''}
      ${interestsList && isCoordinator ? `<p style="color:var(--color-text-medium);margin-bottom:var(--spacing-sm);"><strong>Interesses:</strong> ${interestsList}</p>` : ''}
      <div class="member-links">${links}</div>
    </div>
  `;
}

async function renderMembersPage() {
  const coordSection = document.querySelector('section:has(.section-title h2:first-child)');
  const pesqSection = document.querySelector('section.section-alt:has(.section-title h2:first-child)');
  const discSection = document.querySelector('section:has(.section-title h2:nth-child(1)):not(.section-alt)');
  
  if (!coordSection && !pesqSection && !discSection) return;
  
  const members = loadMembers();
  
  // Coordenação
  if (coordSection && members.coordenacao.length > 0) {
    const container = coordSection.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section-title"><h2>Coordenação</h2></div>
        ${members.coordenacao.map(m => renderMember(m, true)).join('')}
      `;
    }
  }
  
  // Pesquisadores
  if (pesqSection && members.pesquisadores.length > 0) {
    const container = pesqSection.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section-title"><h2>Pesquisadores</h2></div>
        <div class="grid grid-3">
          ${members.pesquisadores.map(m => renderMember(m, true)).join('')}
        </div>
      `;
    }
  }
  
  // Discentes
  if (discSection && members.discentes.length > 0) {
    const container = discSection.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section-title"><h2>Discentes</h2></div>
        <div class="grid grid-4">
          ${members.discentes.map(m => renderMember(m, false)).join('')}
        </div>
      `;
    }
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
  
  return `
    <div class="news-item">
      <div class="news-date">
        <span class="news-date-day">${day}</span>
        <span class="news-date-month">${month}</span>
      </div>
      <div class="news-content">
        <h3>${newsItem.data.title}</h3>
        <p>${newsItem.data.summary}</p>
      </div>
    </div>
  `;
}

async function renderNewsPage() {
  const section = document.querySelector('main section:not(.hero)');
  if (!section) return;
  
  const container = section.querySelector('.container');
  if (!container) return;
  
  const news = await loadNews();
  
  if (news.length === 0) {
    container.innerHTML = '<p>Nenhuma notícia disponível no momento.</p>';
    return;
  }
  
  container.innerHTML = news.map(n => renderNewsItem(n)).join('');
}

// ============================================
// PROJETOS
// ============================================
function loadProjects() {
  // Separar por status
  return {
    ativos: PROJECTS_DATA.filter(p => p.data.status === 'ativo'),
    concluidos: PROJECTS_DATA.filter(p => p.data.status === 'concluído')
  };
}

function renderProject(project) {
  const isActive = project.data.status === 'ativo';
  const badgeColor = isActive ? 'var(--color-accent)' : '';
  
  const objectives = project.content.match(/## Objetivos\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
  let objList = '';
  if (objectives && objectives[1]) {
    const items = objectives[1].match(/- (.+)/g);
    if (items) {
      objList = items.map(i => `<li>${i.replace('- ', '')}</li>`).join('');
    }
  }
  
  const description = project.content.match(/## Descrição\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
  const descText = description ? description[1].trim() : '';
  
  return `
    <div class="card">
      <span class="publication-type" style="${isActive ? `background-color:${badgeColor};` : ''}">${project.data.status.charAt(0).toUpperCase() + project.data.status.slice(1)}</span>
      <h3 class="card-title">${project.data.title}</h3>
      <p class="card-text">${descText}</p>
      <p style="margin-top:var(--spacing-sm);">
        <strong>Coordenador:</strong> ${project.data.coordinator}<br>
        <strong>Financiamento:</strong> ${project.data.funding}<br>
        <strong>Período:</strong> ${project.data.period}
      </p>
    </div>
  `;
}

async function renderProjectsPage() {
  const sections = document.querySelectorAll('main section');
  if (sections.length < 2) return;
  
  const projects = await loadProjects();
  
  // Projetos Ativos
  const activeSection = sections[1];
  if (activeSection && projects.ativos.length > 0) {
    const container = activeSection.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section-title"><h2>Projetos Ativos</h2></div>
        <div class="grid grid-2">
          ${projectos.map(p => renderProject(p)).join('')}
        </div>
      `;
    }
  }
  
  // Projetos Concluídos
  if (sections[2] && projects.concluidos.length > 0) {
    const container = sections[2].querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section-title"><h2>Projetos Concluídos</h2></div>
        ${projects.concluidos.map(p => renderProject(p)).join('')}
      `;
    }
  }
}

// ============================================
// PUBLICAÇÕES
// ============================================
async function loadPublications() {
  const files = [
    '2025-icse-deep-learning.md',
    '2025-jsep-sentiment.md',
    '2025-maltesque-transfer-learning.md',
    '2024-saner-llms.md',
    '2024-ist-systematic-mapping.md',
    '2024-sbes-feature-engineering.md'
  ];
  
function loadPublications() {
  // Ordenar por ano (mais recente primeiro)
  return PUBLICATIONS_DATAt ? `<a href="${pub.data.dataset}"><i class="fas fa-database"></i> Dataset</a>` : ''}
  `;
  
  return `
    <div class="publication-item">
      <span class="publication-type">${pub.data.type}</span>
      <h3 class="publication-title">${pub.data.title}</h3>
      <p class="publication-authors">${authors}</p>
      <p class="publication-venue">${pub.data.venue}, ${pub.data.year}</p>
      <div class="publication-links">${links}</div>
    </div>
  `;
}

async function renderPublicationsPage() {
  const container = document.querySelector('main section:not(.hero) .container');
  if (!container) return;
  
  const publications = await loadPublications();
  
  container.innerHTML = publications.map(p => renderPublication(p)).join('');
}

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  console.log('Content Loader iniciado. Página:', path);
  
  if (path.includes('membros.html')) {
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
