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
  
  // Renderizar foto ou placeholder
  const photoHeight = isCoordinator ? '200px' : '180px';
  const photoWidth = isCoordinator ? '200px' : '100%';
  const photoHtml = member.data.photo 
    ? `<img src="${member.data.photo}" alt="${member.data.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`
    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f0f4f8,#e2e8f0);display:flex;align-items:center;justify-content:center;border-radius:8px;border:2px dashed #cbd5e0;">
         <i class="fas ${icon}" style="font-size:${iconSize};color:#a0aec0;"></i>
       </div>`;
  
  return `
    <div class="card member-card" style="padding:0;overflow:hidden;">
      <div style="padding:var(--spacing-md);padding-bottom:0;${isCoordinator ? 'display:flex;justify-content:center;' : ''}">
        <div style="width:${photoWidth};height:${photoHeight};overflow:hidden;">
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
      ${members.coordenacao.map(m => renderMember(m, true)).join('')}
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

function renderProjectsPage() {
  const activosContainer = document.getElementById('projetos-ativos-container');
  const concluidosContainer = document.getElementById('projetos-concluidos-container');
  
  const projects = loadProjects();
  
  // Projetos Ativos
  if (activosContainer && projects.ativos.length > 0) {
    activosContainer.innerHTML = `
      <div class="section-title"><h2>Projetos Ativos</h2></div>
      <div class="grid grid-2">
        ${projects.ativos.map(p => renderProject(p)).join('')}
      </div>
    `;
  }
  
  // Projetos Concluídos
  if (concluidosContainer && projects.concluidos.length > 0) {
    concluidosContainer.innerHTML = `
      <div class="section-title"><h2>Projetos Concluídos</h2></div>
      ${projects.concluidos.map(p => renderProject(p)).join('')}
    `;
  }
}

// ============================================
// PUBLICAÇÕES
// ============================================
function loadPublications() {
  // Ordenar por ano (mais recente primeiro)
  return PUBLICATIONS_DATA.sort((a, b) => b.data.year - a.data.year);
}

function renderPublication(pub) {
  const authors = pub.data.authors || '';
  
  const links = `
    ${pub.data.pdf ? `<a href="${pub.data.pdf}"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
    ${pub.data.doi ? `<a href="https://doi.org/${pub.data.doi}"><i class="fas fa-link"></i> DOI</a>` : ''}
    ${pub.data.github ? `<a href="${pub.data.github}"><i class="fab fa-github"></i> Código</a>` : ''}
    ${pub.data.dataset ? `<a href="${pub.data.dataset}"><i class="fas fa-database"></i> Dataset</a>` : ''}
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

function renderPublicationsPage() {
  console.log('renderPublicationsPage chamada');
  const container = document.getElementById('publicacoes-container');
  console.log('Container encontrado:', container);
  if (!container) {
    console.error('Container publicacoes-container não encontrado!');
    return;
  }
  
  const publications = loadPublications();
  console.log('Publicações carregadas:', publications.length, publications);
  
  if (publications.length === 0) {
    container.innerHTML = '<p>Nenhuma publicação disponível no momento.</p>';
    return;
  }
  
  container.innerHTML = publications.map(p => renderPublication(p)).join('');
  console.log('Publicações renderizadas com sucesso');
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
