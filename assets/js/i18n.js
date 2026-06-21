/**
 * AI Horizon Labs - i18n (PT / ES / EN)
 *
 * PT e a fonte da verdade: fica no proprio HTML, marcado com data-i18n.
 * Este arquivo guarda apenas as traducoes ES e EN. Se uma chave faltar,
 * o texto original em PT (em cache) e mantido. Nada renderiza vazio.
 *
 * Marcacao:
 *   data-i18n="chave"            -> traduz o innerHTML do elemento
 *   data-i18n-attr="attr|chave"  -> traduz um atributo (varios: "a|k1;b|k2")
 *
 * Conteudo dinamico (content-loader.js, content-data.js, premios inline)
 * NAO usa data-i18n e permanece em portugues, por decisao de escopo.
 */
(function () {
  'use strict';

  var SUPPORTED = ['pt', 'es', 'en'];
  var STORAGE_KEY = 'ailabs_lang';

  // ============================================================
  // Dicionario (apenas ES e EN; PT vem do HTML)
  // ============================================================
  var STRINGS = {
    es: {
      // ---- Navegacao (compartilhada) ----
      'nav.about': 'Acerca',
      'nav.research': 'Investigación <i class="fas fa-chevron-down"></i>',
      'nav.lines': 'Líneas de Investigación',
      'nav.projects': 'Proyectos',
      'nav.members': 'Miembros',
      'nav.publications': 'Publicaciones',
      'nav.awards': 'Premios',
      'nav.news': 'Noticias',
      'nav.brand': 'Marca',
      'nav.contact': 'Contacto',

      // ---- Rodape (compartilhado) ----
      'footer.tagline': 'Laboratorio de Investigación en Inteligencia Artificial e Ingeniería de Software',
      'footer.unifull': 'Universidad Federal del Pampa',
      'footer.quicklinks': 'Enlaces Rápidos',
      'footer.about_lab': 'Acerca del Laboratorio',
      'footer.rights': '&copy; 2026 AI Horizon Labs - UNIPAMPA. Todos los derechos reservados.',

      // ---- Banner LinkedIn (compartilhado) ----
      'banner.title': 'Novedades en LinkedIn',
      'banner.text': 'Sigue a AI Horizon Labs para conocer los bastidores, premios y anuncios de primera mano.',
      'banner.cta': 'Seguir en LinkedIn <i class="fas fa-arrow-right"></i>',

      // ---- Comuns ----
      'common.learnmore': 'Saber más',
      'common.readmore': 'Leer más &rarr;',
      'common.contactbtn': 'Ponte en Contacto',
      'common.viewmembers': 'Ver Miembros del Laboratorio',
      'common.researchers': 'Investigadores',

      // ---- Home ----
      'home.title': 'AI Horizon Labs | Laboratorio de IA e Ingeniería de Software - UNIPAMPA',
      'home.meta.desc': 'AI Horizon Labs - Laboratorio de Investigación en Inteligencia Artificial e Ingeniería de Software - UNIPAMPA',
      'home.hero.cta1': 'Conoce el Laboratorio',
      'home.hero.cta2': 'Nuestros Proyectos',
      'home.about.title': 'Explorando el Futuro de la Ciberseguridad, la IA y la Ingeniería de Software',
      'home.about.text': 'Desarrollamos investigación de excelencia en Inteligencia Artificial aplicada a la Ingeniería de Software, promoviendo la innovación y formando investigadores cualificados.',
      'home.stat.researchers': 'Investigadores',
      'home.stat.publications': 'Publicaciones',
      'home.stat.projects': 'Proyectos Activos',
      'home.stat.partnerships': 'Alianzas',
      'home.lines.title': 'Líneas de Investigación',
      'home.lines.subtitle': 'Nuestras principales áreas de investigación científica',
      'home.lines.card1.title': 'IA Aplicada a la Ingeniería de Software',
      'home.lines.card1.text': 'Automatización de pruebas, generación de código, análisis de calidad y mantenimiento predictivo de software con técnicas de IA.',
      'home.lines.card2.title': 'Aprendizaje Automático',
      'home.lines.card2.text': 'Desarrollo de modelos predictivos, redes neuronales profundas, transfer learning y optimización de algoritmos.',
      'home.lines.card3.title': 'Procesamiento de Lenguaje Natural',
      'home.lines.card3.text': 'Análisis de requisitos, documentación automática, chatbots inteligentes y extracción de información de texto.',
      'home.projects.title': 'Proyectos Destacados',
      'home.projects.subtitle': 'Algunas de nuestras investigaciones en curso',
      'home.proj.card1.title': 'Automatización de Pruebas con IA',
      'home.proj.card1.text': 'Desarrollo de herramientas basadas en Machine Learning para la generación automática de casos de prueba y la detección de bugs en sistemas de software.',
      'home.proj.card2.title': 'Análisis de Sentimientos en Reseñas',
      'home.proj.card2.text': 'Aplicación de técnicas de PLN para el análisis de sentimientos en reseñas de aplicaciones móviles, ayudando a los desarrolladores en la mejora continua.',
      'home.proj.card3.title': 'Predicción de Defectos en Código',
      'home.proj.card3.text': 'Modelo de Deep Learning para la predicción de defectos en el código fuente, identificando módulos propensos a fallos antes del despliegue.',
      'home.proj.card4.title': 'Chatbot para Documentación Técnica',
      'home.proj.card4.text': 'Sistema inteligente basado en LLMs para responder dudas sobre la documentación técnica de proyectos de software de forma natural y precisa.',
      'home.proj.r3': '<i class="fas fa-user"></i> 3 Investigadores',
      'home.proj.r2': '<i class="fas fa-user"></i> 2 Investigadores',
      'home.proj.r4': '<i class="fas fa-user"></i> 4 Investigadores',
      'home.proj.status': 'En curso',
      'home.viewall.projects': 'Ver todos los proyectos',
      'home.pubs.title': 'Publicaciones Recientes',
      'home.pubs.subtitle': 'Nuestros trabajos más recientes en conferencias y revistas',
      'pub.type.conference': 'Conferencia',
      'pub.type.journal': 'Revista',
      'pub.type.workshop': 'Workshop',
      'home.viewall.pubs': 'Ver todas las publicaciones',
      'home.news.title': 'Noticias y Eventos',
      'home.news.subtitle': 'Mantente al día con las novedades del laboratorio',
      'home.news1.title': 'Artículo aceptado en ICSE 2025',
      'home.news1.text': 'Nuestro trabajo sobre generación automática de casos de prueba con Deep Learning fue aceptado en la International Conference on Software Engineering (ICSE), una de las principales conferencias del área.',
      'home.news2.title': 'Nuevo proyecto aprobado por FAPERGS',
      'home.news2.text': 'El proyecto "IA para la Calidad de Software" recibió financiación de FAPERGS para su desarrollo durante los próximos 24 meses, con foco en herramientas de análisis estático inteligente.',
      'home.news3.title': 'Defensa de Tesis de Maestría',
      'home.news3.text': 'María Santos defendió con éxito su tesis "Análisis de Sentimientos en Reseñas de Aplicaciones usando Transformers", recibiendo aprobación con distinción del tribunal.',
      'home.viewall.news': 'Ver todas las noticias',
      'home.cta.title': '¿Interesado en Participar?',
      'home.cta.text': 'AI Horizon Labs siempre está abierto a nuevos investigadores, colaboraciones y alianzas. <br> ¡Ponte en contacto y forma parte de nuestro equipo!',
      'home.cta.btn': '<i class="fas fa-envelope"></i> Ponte en Contacto',

      // ---- Sobre ----
      'sobre.title': 'Acerca | AI Horizon Labs - UNIPAMPA',
      'sobre.meta.desc': 'Acerca de AI Horizon Labs - Misión, Visión, Historia e Infraestructura del Laboratorio de IA e Ingeniería de Software',
      'sobre.hero': 'Acerca de AI Horizon Labs',
      'sobre.who.title': 'Quiénes Somos',
      'sobre.who.p1': '<strong>AI Horizon Labs</strong> es un laboratorio de investigación vinculado al Programa de Posgrado en Ingeniería de Software (PPGES) de la Universidad Federal del Pampa (UNIPAMPA), con sede en Alegrete, RS.',
      'sobre.who.p2': 'Fundado en 2023, el laboratorio se centra principalmente en la investigación científica en la intersección entre <strong>Inteligencia Artificial</strong> e <strong>Ingeniería de Software</strong>, desarrollando soluciones innovadoras que impactan tanto en la academia como en la industria.',
      'sobre.who.p3': 'Nuestro equipo está formado por investigadores cualificados, estudiantes de maestría y doctorado y colaboradores externos, todos comprometidos con la excelencia científica y la formación de recursos humanos de alto nivel.',
      'sobre.numbers.title': '<i class="fas fa-lightbulb"></i> En Números',
      'sobre.numbers.researchers': 'Investigadores Activos',
      'sobre.numbers.pubs': 'Publicaciones Científicas',
      'sobre.numbers.projects': 'Proyectos de Investigación',
      'sobre.numbers.partnerships': 'Alianzas Institucionales',
      'sobre.mission.title': '<i class="fas fa-bullseye"></i> Misión',
      'sobre.mission.text': 'Desarrollar investigación de excelencia en Inteligencia Artificial aplicada a la Ingeniería de Software, promoviendo la formación de recursos humanos cualificados y la transferencia de tecnología a la sociedad, contribuyendo al avance científico y a la innovación tecnológica en la región y en el país.',
      'sobre.vision.title': '<i class="fas fa-eye"></i> Visión',
      'sobre.vision.text': 'Ser reconocido nacional e internacionalmente como un centro de referencia en investigación de Inteligencia Artificial para Ingeniería de Software, destacándose por la calidad de sus publicaciones, la formación de maestros y doctores y el impacto de sus soluciones tecnológicas en la industria.',
      'sobre.values.title': '<i class="fas fa-heart"></i> Valores',
      'sobre.values.excellence': 'Excelencia',
      'sobre.values.excellence.text': 'Búsqueda continua de la calidad en todas las actividades de investigación y formación.',
      'sobre.values.collab': 'Colaboración',
      'sobre.values.collab.text': 'Trabajo en equipo y alianzas con instituciones nacionales e internacionales.',
      'sobre.values.innovation': 'Innovación',
      'sobre.values.innovation.text': 'Desarrollo de soluciones creativas y disruptivas para problemas complejos.',
      'sobre.values.ethics': 'Ética',
      'sobre.values.ethics.text': 'Realización de investigación con integridad, transparencia y responsabilidad social.',
      'sobre.values.inclusion': 'Inclusión',
      'sobre.values.inclusion.text': 'Promoción de la diversidad y la equidad en todas las actividades del laboratorio.',
      'sobre.values.impact': 'Impacto',
      'sobre.values.impact.text': 'Generación de conocimiento con relevancia científica y aplicabilidad práctica.',
      'sobre.history.title': 'Historia e Hitos',
      'sobre.history.subtitle': 'Nuestra trayectoria desde la fundación',
      'sobre.history.2023.title': '2023 - Fundación',
      'sobre.history.2023.text': 'Creación oficial de AI Horizon Labs como laboratorio vinculado al PPGES/UNIPAMPA, con foco inicial en la IA aplicada a la calidad de software.',
      'sobre.history.2024.title': '2024 - Primeras Publicaciones',
      'sobre.history.2024.text': 'Publicación de 5 artículos en conferencias nacionales y 2 en conferencias internacionales. Inicio de 3 tesis de maestría y aprobación del primer proyecto de investigación con financiación externa.',
      'sobre.history.2025.title': '2025 - Expansión',
      'sobre.history.2025.text': 'Crecimiento del equipo a 15 investigadores, establecimiento de 3 alianzas internacionales, aceptación de un artículo en ICSE (conferencia top-tier) y ampliación de la infraestructura computacional.',
      'sobre.history.2026.title': '2026 - Consolidación',
      'sobre.history.2026.text': 'Planificación de un nuevo ciclo de proyectos, consolidación de las líneas de investigación y ampliación de las colaboraciones con la industria. (En curso)',
      'sobre.infra.title': 'Infraestructura y Recursos',
      'sobre.infra.subtitle': 'Infraestructura computacional compartida con el <a href="https://sites.unipampa.edu.br/lampad/infraestrutura/" target="_blank" rel="noopener noreferrer">LAMPAD</a>, organizada en tres grids computacionales',
      'sobre.infra.grid1.title': 'Grid Computacional 01',
      'sobre.infra.grid1.text': 'Workstations con GPUs NVIDIA para el entrenamiento de modelos de IA/ML',
      'sobre.infra.grid2.title': 'Grid Computacional 02',
      'sobre.infra.gridcluster.text': 'Clúster de servidores para procesamiento distribuido',
      'sobre.infra.grid3.title': 'Grid Computacional 03',
      'sobre.infra.software.title': 'Software y Herramientas',
      'sobre.infra.software.list': '<li>Bibliotecas de ML/DL (PyTorch, TensorFlow)</li><li>Entornos de desarrollo y notebooks</li><li>Herramientas de CI/CD y DevOps</li><li>Frameworks de IA aplicada a la Ingeniería de Software</li>',
      'sobre.infra.biblio.title': 'Recursos Bibliográficos',
      'sobre.infra.biblio.list': '<li>Acceso a bases científicas (IEEE, ACM, Springer)</li><li>Portal de Revistas CAPES</li><li>Repositorios de datasets abiertos</li>',
      'sobre.infra.lampad.text': 'La infraestructura computacional se mantiene en alianza con el <strong>LAMPAD - Laboratorio Multiusuario de Investigación, Aplicación y Desarrollo</strong> de la UNIPAMPA.',
      'sobre.infra.lampad.btn': '<i class="fas fa-external-link-alt"></i> Conoce el LAMPAD',
      'sobre.partners.title': 'Alianzas y Colaboraciones',
      'sobre.partners.subtitle': 'Instituciones y empresas asociadas',
      'sobre.partners.academic.title': '<i class="fas fa-university"></i> Instituciones Académicas',
      'sobre.partners.academic.list': '<li>Universidade Federal do Rio Grande do Sul (UFRGS)</li><li>Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)</li><li>Universidade de São Paulo (USP)</li><li>University of Waterloo, Canadá (colaboración internacional)</li><li>Technical University of Munich, Alemania (colaboración internacional)</li>',
      'sobre.partners.industry.title': '<i class="fas fa-building"></i> Socios de la Industria',
      'sobre.partners.industry.list': '<li>Empresas regionales de desarrollo de software</li><li>Startups de tecnología</li><li>Organismos públicos (alianzas en proyectos de extensión)</li><li>Incubadoras y aceleradoras de tecnología</li>',
      'sobre.partners.funding.title': '<i class="fas fa-handshake"></i> Agencias de Financiamiento',
      'sobre.team.title': 'Conoce a Nuestro Equipo',
      'sobre.team.text': 'Conoce más sobre los investigadores, docentes y estudiantes que forman parte de AI Horizon Labs',

      // ---- Linhas de Pesquisa ----
      'linhas.title': 'Líneas de Investigación | AI Horizon Labs - UNIPAMPA',
      'linhas.topics': 'Temas de Investigación',
      'linhas.relatedpubs': 'Publicaciones Relacionadas',
      'linhas.viewpubs': '<a href="publicacoes.html">Ver publicaciones de esta línea &rarr;</a>',
      'linhas.l1.title': 'IA Aplicada a la Ingeniería de Software',
      'linhas.l1.desc': 'Esta línea de investigación estudia la aplicación de técnicas de Inteligencia Artificial para resolver problemas clásicos de la Ingeniería de Software, como automatización de pruebas, generación de código, análisis de calidad, mantenimiento predictivo y detección de bugs.',
      'linhas.l1.list': '<li>Generación automática de casos de prueba con ML/DL</li><li>Predicción de defectos en el código fuente</li><li>Recomendación de refactorizaciones inteligentes</li><li>Análisis estático de código con IA</li><li>Automatización de revisiones de código</li>',
      'linhas.l2.title': 'Aprendizaje Automático y Deep Learning',
      'linhas.l2.desc': 'Desarrollo de modelos predictivos avanzados, redes neuronales profundas, transfer learning y optimización de algoritmos de ML para aplicaciones en software y otras áreas.',
      'linhas.l2.list': '<li>Redes neuronales convolucionales (CNN) y recurrentes (RNN)</li><li>Transfer learning y fine-tuning de modelos preentrenados</li><li>Interpretabilidad y explicabilidad de modelos (XAI)</li><li>Aprendizaje federado y privacidad</li><li>Optimización de hiperparámetros</li>',
      'linhas.l3.title': 'Procesamiento de Lenguaje Natural',
      'linhas.l3.desc': 'Aplicación de técnicas de PLN a problemas de Ingeniería de Software, como análisis de requisitos, documentación automática, análisis de sentimientos en reseñas, chatbots y extracción de información de texto.',
      'linhas.l3.list': '<li>Análisis de sentimientos en reseñas de apps</li><li>Extracción de requisitos de documentos</li><li>Generación automática de documentación técnica</li><li>Chatbots inteligentes para soporte al desarrollo</li><li>Modelos de lenguaje de gran escala (LLMs)</li><li>Transformers y BERT para tareas de SE</li>',
      'linhas.l4.title': 'Sistemas Inteligentes',
      'linhas.l4.desc': 'Desarrollo de agentes autónomos, sistemas de recomendación, IoT inteligente y otras aplicaciones de IA que implican toma de decisiones, planificación e interacción con entornos complejos.',
      'linhas.l4.list': '<li>Agentes inteligentes y sistemas multiagente</li><li>Sistemas de recomendación para desarrollo de software</li><li>IoT inteligente y computación en el borde</li><li>Aprendizaje por refuerzo</li><li>Optimización y planificación automática</li>',
      'linhas.cta.title': '¿Interés en Colaborar?',
      'linhas.cta.text': 'Si eres investigador o estudiante y te interesa colaborar en alguna de estas líneas de investigación, ¡ponte en contacto con nosotros!',

      // ---- Projetos ----
      'projetos.title': 'Proyectos | AI Horizon Labs',
      'projetos.hero': 'Proyectos de Investigación',

      // ---- Membros ----
      'membros.title': 'Miembros | AI Horizon Labs',
      'membros.hero': 'Nuestro Equipo',
      'membros.cta.title': 'Únete a Nuestro Equipo',
      'membros.cta.text': 'Siempre estamos abiertos a nuevos investigadores y colaboradores',

      // ---- Publicacoes ----
      'publicacoes.title': 'Publicaciones | AI Horizon Labs',
      'publicacoes.hero': 'Publicaciones',
      'publicacoes.intro': 'Producción científica del laboratorio a partir del Google Scholar de los miembros: destacados de mayor impacto, una muestra general y el acervo completo organizado por evento.',
      'publicacoes.tab.selected': 'Seleccionadas',
      'publicacoes.tab.general': 'Generales',
      'publicacoes.tab.events': 'Por Eventos',

      // ---- Premios ----
      'premios.title': 'Premios | AI Horizon Labs - UNIPAMPA',
      'premios.meta.desc': 'Premios y Reconocimientos de AI Horizon Labs - Logros del Laboratorio, Estudiantes e Investigadores',
      'premios.hero': '<i class="fas fa-trophy"></i> Premios y Reconocimientos',
      'premios.section.title': 'Nuestros Premios',
      'premios.section.subtitle': 'Reconocimiento a la excelencia en investigación, desarrollo, ingeniería e innovación',
      'premios.loading': 'Cargando premios...',
      'premios.stat.total': 'Premios Recibidos',
      'premios.stat.2026': 'Premios en 2026',
      'premios.stat.2025': 'Premios en 2025',
      'premios.stat.2024': 'Premios en 2024',
      'premios.stat.international': 'Premios Internacionales',
      'premios.cta.title': '¡Felicidades a nuestros investigadores!',
      'premios.cta.text': 'Conoce al equipo detrás de estos logros',

      // ---- Noticias ----
      'noticias.title': 'Noticias | AI Horizon Labs',
      'noticias.hero': 'Noticias y Eventos',

      // ---- Contato ----
      'contato.title': 'Contacto | AI Horizon Labs',
      'contato.hero': 'Ponte en Contacto',
      'contato.form.title': 'Formulario de Contacto',
      'contato.form.name': 'Nombre',
      'contato.form.email': 'Correo electrónico',
      'contato.form.subject': 'Asunto',
      'contato.form.message': 'Mensaje',
      'contato.form.submit': 'Enviar Mensaje',
      'contato.info.title': '<i class="fas fa-info-circle"></i> Información de Contacto',
      'contato.info.email': '<i class="fas fa-envelope"></i> <strong>Correo:</strong> aihorizonlabs@unipampa.edu.br',
      'contato.info.address': '<i class="fas fa-map-marker-alt"></i> <strong>Dirección:</strong> UNIPAMPA - Campus Alegrete<br>Alegrete, RS - Brasil',
      'contato.info.website': '<i class="fas fa-globe"></i> <strong>Sitio web:</strong> ai-horizon-labs.github.io',
      'contato.social': 'Redes Sociales',

      // ---- Marca / Logomarca ----
      'marca.title': 'Logotipo y Marca | AI Horizon Labs',
      'marca.statuspill': '<span class="dot"></span> Manual de marca',
      'marca.hero': 'Logotipo y Marca',
      'marca.hero.sub': 'Identidad visual, paleta de colores y aplicaciones de la marca AI Horizon Labs',
      'marca.wip': '<strong>Esta es la identidad visual de AI Horizon Labs.</strong> El símbolo une el monograma "A", el sol naciente y el horizonte, inspirado en el "baita chão" del Pampa. A continuación están la paleta de colores oficial, las versiones del logotipo y las aplicaciones en merchandising. <strong>Las sugerencias siguen siendo bienvenidas</strong>: mira cómo contribuir al final de la página.',
      'marca.palette.title': 'Paleta de colores',
      'marca.palette.tag': 'Identidad oficial',
      'marca.palette.desc': 'Los azules profundos transmiten tecnología y confianza; el dorado del sol aporta energía y la calidez del amanecer en el Pampa. Usa los tonos primarios para estructuras y el dorado como acento puntual.',
      'marca.sw1': '<strong>Azul royal</strong><code>#1A4FB5</code><span>Primaria</span>',
      'marca.sw2': '<strong>Azul cielo</strong><code>#2E7CD6</code><span>Primaria clara</span>',
      'marca.sw3': '<strong>Navy profundo</strong><code>#0A1F4D</code><span>Primaria oscura</span>',
      'marca.sw4': '<strong>Sol dorado</strong><code>#F7A823</code><span>Acento</span>',
      'marca.sw5': '<strong>Dorado claro</strong><code>#FCD06C</code><span>Acento claro</span>',
      'marca.sw6': '<strong>Ámbar oscuro</strong><code>#E08A12</code><span>Acento oscuro</span>',
      'marca.sw7': '<strong>Grafito</strong><code>#1F2937</code><span>Texto</span>',
      'marca.sw8': '<strong>Gris claro</strong><code>#F8F9FA</code><span>Fondo</span>',
      'marca.sw9': '<strong>Blanco</strong><code>#FFFFFF</code><span>Fondo / texto</span>',
      'marca.fam1.title': 'Símbolo vertical, azul degradado',
      'marca.fam1.tag': 'Firma principal candidata',
      'marca.fam1.desc': 'Versiones apiladas y centradas con el monograma "A" en degradado azul y el sol naciente sobre el horizonte. Transmiten profundidad y tecnología. Indicadas para uso institucional destacado (portada, presentaciones, perfil).',
      'marca.fam1.c1.title': 'Vertical degradado - A',
      'marca.fam1.c1.text': 'Tagline "Advancing AI Beyond the Horizon".',
      'marca.fam1.c2.title': 'Vertical degradado - B',
      'marca.fam1.c2.text': 'Variación del mismo concepto, ajuste de proporción y brillo.',
      'marca.fam2.title': 'Símbolo vertical, monocromático',
      'marca.fam2.tag': 'Versión blanco y negro',
      'marca.fam2.desc': 'El mismo símbolo vertical en un solo color, sobre fondo claro y sobre fondo oscuro. Esenciales para documentos, sellos, fondos de color y situaciones de impresión a un color.',
      'marca.fam2.c1.title': 'Mono - fondo claro',
      'marca.fam2.c1.text': 'Negro sobre blanco. Tagline "Advancing AI Beyond the Horizon".',
      'marca.fam2.c2.title': 'Mono - fondo oscuro',
      'marca.fam2.c2.text': 'Blanco sobre negro, para aplicaciones invertidas.',
      'marca.fam3.title': 'Lockup horizontal',
      'marca.fam3.tag': 'Encabezados y banners',
      'marca.fam3.desc': 'Composición horizontal, con el símbolo a la izquierda y el nombre a la derecha. Formato ideal para el encabezado del sitio, firmas de correo, banners y papelería. Disponible en azul y monocromático, con tagline en portugués e inglés.',
      'marca.fam3.c1.title': 'Horizontal azul - EN',
      'marca.fam3.c1.text': '"Exploring New Frontiers in Artificial Intelligence".',
      'marca.fam3.c2.title': 'Horizontal azul - PT',
      'marca.fam3.c2.text': '"Explorando Novas Fronteiras da Inteligência Artificial".',
      'marca.fam3.c3.title': 'Horizontal mono - EN',
      'marca.fam3.c3.text': 'Versión blanco y negro, tagline en inglés.',
      'marca.fam3.c4.title': 'Horizontal mono - PT',
      'marca.fam3.c4.text': 'Versión blanco y negro, tagline en portugués.',
      'marca.fam4.title': 'Sistema de marca y versiones claro/oscuro',
      'marca.fam4.tag': 'Hojas de aplicación',
      'marca.fam4.desc': 'Composiciones más completas, que presentan los pilares del laboratorio (Investigación Aplicada, Innovación Científica, Ingeniería de Software e Impacto Real) y el comportamiento de la marca sobre fondos claro y oscuro. Útiles para evaluar la marca como sistema, no solo como ícono aislado.',
      'marca.fam4.c1.title': 'Sistema con pilares - color',
      'marca.fam4.c1.text': 'Tagline "Construindo o futuro da IA" y los cuatro pilares.',
      'marca.fam4.c2.title': 'Sistema con pilares - mono',
      'marca.fam4.c2.text': 'Misma estructura en blanco y negro.',
      'marca.fam4.c3.title': 'Par claro/oscuro - bilingüe',
      'marca.fam4.c3.text': 'Misma marca sobre fondo blanco (EN) y fondo navy (PT).',
      'marca.chips.vert_cor_en': '<span class="chip">Vertical</span><span class="chip accent">Color</span><span class="chip">EN</span>',
      'marca.chips.vert_mono_claro': '<span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fondo claro</span>',
      'marca.chips.vert_mono_escuro': '<span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Fondo oscuro</span>',
      'marca.chips.horiz_cor_en': '<span class="chip">Horizontal</span><span class="chip accent">Color</span><span class="chip">EN</span>',
      'marca.chips.horiz_cor_pt': '<span class="chip">Horizontal</span><span class="chip accent">Color</span><span class="chip">PT</span>',
      'marca.chips.horiz_mono_en': '<span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">EN</span>',
      'marca.chips.horiz_mono_pt': '<span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">PT</span>',
      'marca.chips.sist_cor_pt': '<span class="chip">Sistema</span><span class="chip accent">Color</span><span class="chip">PT</span>',
      'marca.chips.sist_mono_pt': '<span class="chip">Sistema</span><span class="chip">Mono</span><span class="chip">PT</span>',
      'marca.chips.sist_cor_enpt': '<span class="chip">Sistema</span><span class="chip accent">Color</span><span class="chip">EN/PT</span>',
      'marca.merch.title': 'Merchandising y aplicaciones',
      'marca.merch.subtitle': 'En merchandising y materiales promocionales, usa el símbolo aislado (la "A" con el sol y el horizonte). Se mantiene legible en superficies pequeñas y curvas.',
      'marca.m1': '<h3>Tazas</h3><p>Símbolo a color centrado sobre taza blanca.</p>',
      'marca.m2': '<h3>Gorras</h3><p>Símbolo aplicado en el frente de la gorra blanca.</p>',
      'marca.m3': '<h3>Cuia de mate</h3><p>Porongo natural con el símbolo aplicado en el cuerpo de la cuia.</p>',
      'marca.m4': '<h3>Cordones</h3><p>Símbolo repetido en la cinta y en el portacredencial.</p>',
      'marca.m5': '<h3>Llaveros</h3><p>Etiqueta navy con filete dorado y símbolo en blanco.</p>',
      'marca.m6': '<h3>Bombilla de mate</h3><p>Bombilla de plata con etiqueta de la marca.</p>',
      'marca.merch.credits': 'Fotos base de la cuia y la bombilla: <a href="https://commons.wikimedia.org/wiki/File:Erva_mate_chimarrao_in_big_cuia.jpg" target="_blank" rel="noopener noreferrer">ChimaAddicted</a> (CC BY-SA 4.0) y <a href="https://commons.wikimedia.org/wiki/File:Bombilla.jpg" target="_blank" rel="noopener noreferrer">André Karwath (Aka)</a> (CC BY-SA 2.5), vía Wikimedia Commons. El símbolo de la marca se aplicó sobre las fotos; las imágenes derivadas mantienen la licencia CC BY-SA.',
      'marca.feedback.title': 'Propuestas e ideas son bienvenidas',
      'marca.feedback.text': 'Esta identidad se está construyendo de forma colaborativa. ¿Tienes una sugerencia de color, símbolo, tipografía, tagline o incluso una propuesta de logo completa? Compártela con nosotros: cada contribución ayuda a definir la cara de AI Horizon Labs.',
      'marca.feedback.send': '<i class="fas fa-envelope"></i> Enviar propuesta',
      'marca.feedback.contactpage': 'Página de contacto'
    },

    en: {
      // ---- Navigation (shared) ----
      'nav.about': 'About',
      'nav.research': 'Research <i class="fas fa-chevron-down"></i>',
      'nav.lines': 'Research Lines',
      'nav.projects': 'Projects',
      'nav.members': 'Members',
      'nav.publications': 'Publications',
      'nav.awards': 'Awards',
      'nav.news': 'News',
      'nav.brand': 'Brand',
      'nav.contact': 'Contact',

      // ---- Footer (shared) ----
      'footer.tagline': 'Research Laboratory in Artificial Intelligence and Software Engineering',
      'footer.unifull': 'Federal University of Pampa',
      'footer.quicklinks': 'Quick Links',
      'footer.about_lab': 'About the Lab',
      'footer.rights': '&copy; 2026 AI Horizon Labs - UNIPAMPA. All rights reserved.',

      // ---- LinkedIn banner (shared) ----
      'banner.title': 'Updates on LinkedIn',
      'banner.text': 'Follow AI Horizon Labs for behind-the-scenes content, awards and announcements firsthand.',
      'banner.cta': 'Follow on LinkedIn <i class="fas fa-arrow-right"></i>',

      // ---- Common ----
      'common.learnmore': 'Learn more',
      'common.readmore': 'Read more &rarr;',
      'common.contactbtn': 'Get in Touch',
      'common.viewmembers': 'View Lab Members',
      'common.researchers': 'Researchers',

      // ---- Home ----
      'home.title': 'AI Horizon Labs | AI and Software Engineering Lab - UNIPAMPA',
      'home.meta.desc': 'AI Horizon Labs - Research Laboratory in Artificial Intelligence and Software Engineering - UNIPAMPA',
      'home.hero.cta1': 'Discover the Lab',
      'home.hero.cta2': 'Our Projects',
      'home.about.title': 'Exploring the Future of Cybersecurity, AI and Software Engineering',
      'home.about.text': 'We carry out excellent research in Artificial Intelligence applied to Software Engineering, promoting innovation and training qualified researchers.',
      'home.stat.researchers': 'Researchers',
      'home.stat.publications': 'Publications',
      'home.stat.projects': 'Active Projects',
      'home.stat.partnerships': 'Partnerships',
      'home.lines.title': 'Research Lines',
      'home.lines.subtitle': 'Our main areas of scientific investigation',
      'home.lines.card1.title': 'AI Applied to Software Engineering',
      'home.lines.card1.text': 'Test automation, code generation, quality analysis and predictive software maintenance using AI techniques.',
      'home.lines.card2.title': 'Machine Learning',
      'home.lines.card2.text': 'Development of predictive models, deep neural networks, transfer learning and algorithm optimization.',
      'home.lines.card3.title': 'Natural Language Processing',
      'home.lines.card3.text': 'Requirements analysis, automatic documentation, intelligent chatbots and information extraction from text.',
      'home.projects.title': 'Featured Projects',
      'home.projects.subtitle': 'Some of our ongoing research',
      'home.proj.card1.title': 'AI-Based Test Automation',
      'home.proj.card1.text': 'Development of Machine Learning-based tools for the automatic generation of test cases and bug detection in software systems.',
      'home.proj.card2.title': 'Sentiment Analysis in Reviews',
      'home.proj.card2.text': 'Application of NLP techniques for sentiment analysis in mobile app reviews, supporting developers in continuous improvement.',
      'home.proj.card3.title': 'Code Defect Prediction',
      'home.proj.card3.text': 'Deep Learning model for predicting defects in source code, identifying fault-prone modules before deployment.',
      'home.proj.card4.title': 'Chatbot for Technical Documentation',
      'home.proj.card4.text': 'Intelligent LLM-based system to answer questions about the technical documentation of software projects naturally and accurately.',
      'home.proj.r3': '<i class="fas fa-user"></i> 3 Researchers',
      'home.proj.r2': '<i class="fas fa-user"></i> 2 Researchers',
      'home.proj.r4': '<i class="fas fa-user"></i> 4 Researchers',
      'home.proj.status': 'Ongoing',
      'home.viewall.projects': 'View all projects',
      'home.pubs.title': 'Recent Publications',
      'home.pubs.subtitle': 'Our most recent work in conferences and journals',
      'pub.type.conference': 'Conference',
      'pub.type.journal': 'Journal',
      'pub.type.workshop': 'Workshop',
      'home.viewall.pubs': 'View all publications',
      'home.news.title': 'News and Events',
      'home.news.subtitle': 'Stay up to date with the lab news',
      'home.news1.title': 'Paper accepted at ICSE 2025',
      'home.news1.text': 'Our work on automatic test case generation with Deep Learning was accepted at the International Conference on Software Engineering (ICSE), one of the leading conferences in the field.',
      'home.news2.title': 'New project approved by FAPERGS',
      'home.news2.text': 'The project "AI for Software Quality" received funding from FAPERGS for development over the next 24 months, focusing on intelligent static analysis tools.',
      'home.news3.title': "Master's Thesis Defense",
      'home.news3.text': 'Maria Santos successfully defended her thesis "Sentiment Analysis in App Reviews using Transformers", receiving approval with distinction from the committee.',
      'home.viewall.news': 'View all news',
      'home.cta.title': 'Interested in Joining?',
      'home.cta.text': 'AI Horizon Labs is always open to new researchers, collaborations and partnerships. <br> Get in touch and become part of our team!',
      'home.cta.btn': '<i class="fas fa-envelope"></i> Get in Touch',

      // ---- About ----
      'sobre.title': 'About | AI Horizon Labs - UNIPAMPA',
      'sobre.meta.desc': 'About AI Horizon Labs - Mission, Vision, History and Infrastructure of the AI and Software Engineering Lab',
      'sobre.hero': 'About AI Horizon Labs',
      'sobre.who.title': 'Who We Are',
      'sobre.who.p1': '<strong>AI Horizon Labs</strong> is a research laboratory affiliated with the Graduate Program in Software Engineering (PPGES) at the Federal University of Pampa (UNIPAMPA), based in Alegrete, RS, Brazil.',
      'sobre.who.p2': 'Founded in 2023, the lab focuses mainly on scientific research at the intersection of <strong>Artificial Intelligence</strong> and <strong>Software Engineering</strong>, developing innovative solutions that impact both academia and industry.',
      'sobre.who.p3': 'Our team is made up of qualified researchers, master and doctoral students and external collaborators, all committed to scientific excellence and the training of high-level human resources.',
      'sobre.numbers.title': '<i class="fas fa-lightbulb"></i> By the Numbers',
      'sobre.numbers.researchers': 'Active Researchers',
      'sobre.numbers.pubs': 'Scientific Publications',
      'sobre.numbers.projects': 'Research Projects',
      'sobre.numbers.partnerships': 'Institutional Partnerships',
      'sobre.mission.title': '<i class="fas fa-bullseye"></i> Mission',
      'sobre.mission.text': 'To carry out excellent research in Artificial Intelligence applied to Software Engineering, promoting the training of qualified human resources and the transfer of technology to society, contributing to scientific progress and technological innovation in the region and the country.',
      'sobre.vision.title': '<i class="fas fa-eye"></i> Vision',
      'sobre.vision.text': 'To be recognized nationally and internationally as a reference center in Artificial Intelligence research for Software Engineering, standing out for the quality of its publications, the training of masters and doctors, and the impact of its technological solutions on industry.',
      'sobre.values.title': '<i class="fas fa-heart"></i> Values',
      'sobre.values.excellence': 'Excellence',
      'sobre.values.excellence.text': 'Continuous pursuit of quality in all research and training activities.',
      'sobre.values.collab': 'Collaboration',
      'sobre.values.collab.text': 'Teamwork and partnerships with national and international institutions.',
      'sobre.values.innovation': 'Innovation',
      'sobre.values.innovation.text': 'Development of creative and disruptive solutions to complex problems.',
      'sobre.values.ethics': 'Ethics',
      'sobre.values.ethics.text': 'Conducting research with integrity, transparency and social responsibility.',
      'sobre.values.inclusion': 'Inclusion',
      'sobre.values.inclusion.text': 'Promotion of diversity and equity in all lab activities.',
      'sobre.values.impact': 'Impact',
      'sobre.values.impact.text': 'Generation of knowledge with scientific relevance and practical applicability.',
      'sobre.history.title': 'History and Milestones',
      'sobre.history.subtitle': 'Our journey since the founding',
      'sobre.history.2023.title': '2023 - Founding',
      'sobre.history.2023.text': 'Official creation of AI Horizon Labs as a laboratory affiliated with PPGES/UNIPAMPA, with an initial focus on AI applied to software quality.',
      'sobre.history.2024.title': '2024 - First Publications',
      'sobre.history.2024.text': 'Publication of 5 papers in national conferences and 2 in international conferences. Start of 3 master theses and approval of the first research project with external funding.',
      'sobre.history.2025.title': '2025 - Expansion',
      'sobre.history.2025.text': 'Team growth to 15 researchers, establishment of 3 international partnerships, acceptance of a paper at ICSE (top-tier conference) and expansion of the computing infrastructure.',
      'sobre.history.2026.title': '2026 - Consolidation',
      'sobre.history.2026.text': 'Planning of a new project cycle, consolidation of the research lines and expansion of collaborations with industry. (Ongoing)',
      'sobre.infra.title': 'Infrastructure and Resources',
      'sobre.infra.subtitle': 'Computing infrastructure shared with <a href="https://sites.unipampa.edu.br/lampad/infraestrutura/" target="_blank" rel="noopener noreferrer">LAMPAD</a>, organized into three computing grids',
      'sobre.infra.grid1.title': 'Computing Grid 01',
      'sobre.infra.grid1.text': 'Workstations with NVIDIA GPUs for training AI/ML models',
      'sobre.infra.grid2.title': 'Computing Grid 02',
      'sobre.infra.gridcluster.text': 'Server cluster for distributed processing',
      'sobre.infra.grid3.title': 'Computing Grid 03',
      'sobre.infra.software.title': 'Software and Tools',
      'sobre.infra.software.list': '<li>ML/DL libraries (PyTorch, TensorFlow)</li><li>Development environments and notebooks</li><li>CI/CD and DevOps tools</li><li>AI frameworks applied to Software Engineering</li>',
      'sobre.infra.biblio.title': 'Library Resources',
      'sobre.infra.biblio.list': '<li>Access to scientific databases (IEEE, ACM, Springer)</li><li>CAPES Journals Portal</li><li>Open dataset repositories</li>',
      'sobre.infra.lampad.text': 'The computing infrastructure is maintained in partnership with <strong>LAMPAD - Multi-user Laboratory for Research, Application and Development</strong> at UNIPAMPA.',
      'sobre.infra.lampad.btn': '<i class="fas fa-external-link-alt"></i> Discover LAMPAD',
      'sobre.partners.title': 'Partnerships and Collaborations',
      'sobre.partners.subtitle': 'Partner institutions and companies',
      'sobre.partners.academic.title': '<i class="fas fa-university"></i> Academic Institutions',
      'sobre.partners.academic.list': '<li>Universidade Federal do Rio Grande do Sul (UFRGS)</li><li>Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)</li><li>Universidade de São Paulo (USP)</li><li>University of Waterloo, Canada (international collaboration)</li><li>Technical University of Munich, Germany (international collaboration)</li>',
      'sobre.partners.industry.title': '<i class="fas fa-building"></i> Industry Partners',
      'sobre.partners.industry.list': '<li>Regional software development companies</li><li>Technology startups</li><li>Public agencies (partnerships in outreach projects)</li><li>Technology incubators and accelerators</li>',
      'sobre.partners.funding.title': '<i class="fas fa-handshake"></i> Funding Agencies',
      'sobre.team.title': 'Meet Our Team',
      'sobre.team.text': 'Learn more about the researchers, faculty and students who are part of AI Horizon Labs',

      // ---- Research Lines ----
      'linhas.title': 'Research Lines | AI Horizon Labs - UNIPAMPA',
      'linhas.topics': 'Research Topics',
      'linhas.relatedpubs': 'Related Publications',
      'linhas.viewpubs': '<a href="publicacoes.html">View publications in this line &rarr;</a>',
      'linhas.l1.title': 'AI Applied to Software Engineering',
      'linhas.l1.desc': 'This research line investigates the application of Artificial Intelligence techniques to solve classic Software Engineering problems, such as test automation, code generation, quality analysis, predictive maintenance and bug detection.',
      'linhas.l1.list': '<li>Automatic test case generation using ML/DL</li><li>Defect prediction in source code</li><li>Intelligent refactoring recommendation</li><li>AI-based static code analysis</li><li>Code review automation</li>',
      'linhas.l2.title': 'Machine Learning and Deep Learning',
      'linhas.l2.desc': 'Development of advanced predictive models, deep neural networks, transfer learning and ML algorithm optimization for applications in software and other areas.',
      'linhas.l2.list': '<li>Convolutional (CNN) and recurrent (RNN) neural networks</li><li>Transfer learning and fine-tuning of pre-trained models</li><li>Model interpretability and explainability (XAI)</li><li>Federated learning and privacy</li><li>Hyperparameter optimization</li>',
      'linhas.l3.title': 'Natural Language Processing',
      'linhas.l3.desc': 'Application of NLP techniques to Software Engineering problems, such as requirements analysis, automatic documentation, sentiment analysis in reviews, chatbots and information extraction from text.',
      'linhas.l3.list': '<li>Sentiment analysis in app reviews</li><li>Requirements extraction from documents</li><li>Automatic technical documentation generation</li><li>Intelligent chatbots for development support</li><li>Large language models (LLMs)</li><li>Transformers and BERT for SE tasks</li>',
      'linhas.l4.title': 'Intelligent Systems',
      'linhas.l4.desc': 'Development of autonomous agents, recommender systems, intelligent IoT and other AI applications involving decision-making, planning and interaction with complex environments.',
      'linhas.l4.list': '<li>Intelligent agents and multi-agent systems</li><li>Recommender systems for software development</li><li>Intelligent IoT and edge computing</li><li>Reinforcement learning</li><li>Automated optimization and planning</li>',
      'linhas.cta.title': 'Interested in Collaborating?',
      'linhas.cta.text': 'If you are a researcher or student interested in collaborating on any of these research lines, get in touch with us!',

      // ---- Projects ----
      'projetos.title': 'Projects | AI Horizon Labs',
      'projetos.hero': 'Research Projects',

      // ---- Members ----
      'membros.title': 'Members | AI Horizon Labs',
      'membros.hero': 'Our Team',
      'membros.cta.title': 'Join Our Team',
      'membros.cta.text': 'We are always open to new researchers and collaborators',

      // ---- Publications ----
      'publicacoes.title': 'Publications | AI Horizon Labs',
      'publicacoes.hero': 'Publications',
      'publicacoes.intro': "The lab's scientific output drawn from the members' Google Scholar profiles: high-impact highlights, a general sample, and the full archive organized by venue.",
      'publicacoes.tab.selected': 'Selected',
      'publicacoes.tab.general': 'General',
      'publicacoes.tab.events': 'By Venue',

      // ---- Awards ----
      'premios.title': 'Awards | AI Horizon Labs - UNIPAMPA',
      'premios.meta.desc': 'Awards and Recognitions of AI Horizon Labs - Achievements of the Lab, Students and Researchers',
      'premios.hero': '<i class="fas fa-trophy"></i> Awards and Recognitions',
      'premios.section.title': 'Our Awards',
      'premios.section.subtitle': 'Recognition for excellence in research, development, engineering and innovation',
      'premios.loading': 'Loading awards...',
      'premios.stat.total': 'Awards Received',
      'premios.stat.2026': 'Awards in 2026',
      'premios.stat.2025': 'Awards in 2025',
      'premios.stat.2024': 'Awards in 2024',
      'premios.stat.international': 'International Awards',
      'premios.cta.title': 'Congratulations to our researchers!',
      'premios.cta.text': 'Meet the team behind these achievements',

      // ---- News ----
      'noticias.title': 'News | AI Horizon Labs',
      'noticias.hero': 'News and Events',

      // ---- Contact ----
      'contato.title': 'Contact | AI Horizon Labs',
      'contato.hero': 'Get in Touch',
      'contato.form.title': 'Contact Form',
      'contato.form.name': 'Name',
      'contato.form.email': 'Email',
      'contato.form.subject': 'Subject',
      'contato.form.message': 'Message',
      'contato.form.submit': 'Send Message',
      'contato.info.title': '<i class="fas fa-info-circle"></i> Contact Information',
      'contato.info.email': '<i class="fas fa-envelope"></i> <strong>Email:</strong> aihorizonlabs@unipampa.edu.br',
      'contato.info.address': '<i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> UNIPAMPA - Campus Alegrete<br>Alegrete, RS - Brazil',
      'contato.info.website': '<i class="fas fa-globe"></i> <strong>Website:</strong> ai-horizon-labs.github.io',
      'contato.social': 'Social Media',

      // ---- Brand / Logo ----
      'marca.title': 'Logo and Brand | AI Horizon Labs',
      'marca.statuspill': '<span class="dot"></span> Brand guidelines',
      'marca.hero': 'Logo and Brand',
      'marca.hero.sub': 'Visual identity, color palette and brand applications of AI Horizon Labs',
      'marca.wip': '<strong>This is the visual identity of AI Horizon Labs.</strong> The symbol brings together the "A" monogram, the rising sun and the horizon, inspired by the vast plains ("baita chão") of the Pampa. Below are the official color palette, the logo versions and the merchandise applications. <strong>Suggestions are still welcome</strong>: see how to contribute at the end of the page.',
      'marca.palette.title': 'Color palette',
      'marca.palette.tag': 'Official identity',
      'marca.palette.desc': 'Deep blues convey technology and trust; the golden sun brings energy and the warmth of daybreak on the Pampa. Use the primary tones for structures and the gold as a punctual accent.',
      'marca.sw1': '<strong>Royal blue</strong><code>#1A4FB5</code><span>Primary</span>',
      'marca.sw2': '<strong>Sky blue</strong><code>#2E7CD6</code><span>Light primary</span>',
      'marca.sw3': '<strong>Deep navy</strong><code>#0A1F4D</code><span>Dark primary</span>',
      'marca.sw4': '<strong>Golden sun</strong><code>#F7A823</code><span>Accent</span>',
      'marca.sw5': '<strong>Light gold</strong><code>#FCD06C</code><span>Light accent</span>',
      'marca.sw6': '<strong>Dark amber</strong><code>#E08A12</code><span>Dark accent</span>',
      'marca.sw7': '<strong>Graphite</strong><code>#1F2937</code><span>Text</span>',
      'marca.sw8': '<strong>Light gray</strong><code>#F8F9FA</code><span>Background</span>',
      'marca.sw9': '<strong>White</strong><code>#FFFFFF</code><span>Background / text</span>',
      'marca.fam1.title': 'Vertical symbol, blue gradient',
      'marca.fam1.tag': 'Candidate primary signature',
      'marca.fam1.desc': 'Stacked, centered versions with the "A" monogram in a blue gradient and the rising sun over the horizon. They convey depth and technology. Recommended for prominent institutional use (cover, presentations, profile).',
      'marca.fam1.c1.title': 'Vertical gradient - A',
      'marca.fam1.c1.text': 'Tagline "Advancing AI Beyond the Horizon".',
      'marca.fam1.c2.title': 'Vertical gradient - B',
      'marca.fam1.c2.text': 'Variation of the same concept, proportion and brightness adjustment.',
      'marca.fam2.title': 'Vertical symbol, monochrome',
      'marca.fam2.tag': 'Black and white version',
      'marca.fam2.desc': 'The same vertical symbol in a single color, on a light background and on a dark background. Essential for documents, stamps, colored backgrounds and single-color printing situations.',
      'marca.fam2.c1.title': 'Mono - light background',
      'marca.fam2.c1.text': 'Black on white. Tagline "Advancing AI Beyond the Horizon".',
      'marca.fam2.c2.title': 'Mono - dark background',
      'marca.fam2.c2.text': 'White on black, for inverted applications.',
      'marca.fam3.title': 'Horizontal lockup',
      'marca.fam3.tag': 'Headers and banners',
      'marca.fam3.desc': 'Horizontal composition, with the symbol on the left and the name on the right. Ideal format for the site header, email signatures, banners and letterhead. Available in blue and monochrome, with a tagline in Portuguese and English.',
      'marca.fam3.c1.title': 'Horizontal blue - EN',
      'marca.fam3.c1.text': '"Exploring New Frontiers in Artificial Intelligence".',
      'marca.fam3.c2.title': 'Horizontal blue - PT',
      'marca.fam3.c2.text': '"Explorando Novas Fronteiras da Inteligência Artificial".',
      'marca.fam3.c3.title': 'Horizontal mono - EN',
      'marca.fam3.c3.text': 'Black and white version, tagline in English.',
      'marca.fam3.c4.title': 'Horizontal mono - PT',
      'marca.fam3.c4.text': 'Black and white version, tagline in Portuguese.',
      'marca.fam4.title': 'Brand system and light/dark versions',
      'marca.fam4.tag': 'Application sheets',
      'marca.fam4.desc': 'More complete compositions, presenting the lab pillars (Applied Research, Scientific Innovation, Software Engineering and Real Impact) and the brand behavior on light and dark backgrounds. Useful to evaluate the brand as a system, not just as an isolated icon.',
      'marca.fam4.c1.title': 'System with pillars - color',
      'marca.fam4.c1.text': 'Tagline "Construindo o futuro da IA" and the four pillars.',
      'marca.fam4.c2.title': 'System with pillars - mono',
      'marca.fam4.c2.text': 'Same structure in black and white.',
      'marca.fam4.c3.title': 'Light/dark pair - bilingual',
      'marca.fam4.c3.text': 'Same brand on a white background (EN) and a navy background (PT).',
      'marca.chips.vert_cor_en': '<span class="chip">Vertical</span><span class="chip accent">Color</span><span class="chip">EN</span>',
      'marca.chips.vert_mono_claro': '<span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Light bg</span>',
      'marca.chips.vert_mono_escuro': '<span class="chip">Vertical</span><span class="chip">Mono</span><span class="chip">Dark bg</span>',
      'marca.chips.horiz_cor_en': '<span class="chip">Horizontal</span><span class="chip accent">Color</span><span class="chip">EN</span>',
      'marca.chips.horiz_cor_pt': '<span class="chip">Horizontal</span><span class="chip accent">Color</span><span class="chip">PT</span>',
      'marca.chips.horiz_mono_en': '<span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">EN</span>',
      'marca.chips.horiz_mono_pt': '<span class="chip">Horizontal</span><span class="chip">Mono</span><span class="chip">PT</span>',
      'marca.chips.sist_cor_pt': '<span class="chip">System</span><span class="chip accent">Color</span><span class="chip">PT</span>',
      'marca.chips.sist_mono_pt': '<span class="chip">System</span><span class="chip">Mono</span><span class="chip">PT</span>',
      'marca.chips.sist_cor_enpt': '<span class="chip">System</span><span class="chip accent">Color</span><span class="chip">EN/PT</span>',
      'marca.merch.title': 'Merchandise and applications',
      'marca.merch.subtitle': 'On merchandise and promotional materials, use the standalone symbol (the "A" with the sun and the horizon). It stays legible on small and curved surfaces.',
      'marca.m1': '<h3>Mugs</h3><p>Color symbol centered on a white mug.</p>',
      'marca.m2': '<h3>Caps</h3><p>Symbol applied to the front of the white cap.</p>',
      'marca.m3': '<h3>Mate gourd</h3><p>Natural gourd with the symbol applied to the body of the cuia.</p>',
      'marca.m4': '<h3>Lanyards</h3><p>Symbol repeated on the strap and the badge holder.</p>',
      'marca.m5': '<h3>Keychains</h3><p>Navy tag with a golden line and the symbol in white.</p>',
      'marca.m6': '<h3>Mate straw (bombilla)</h3><p>Silver straw with the brand tag.</p>',
      'marca.merch.credits': 'Base photos of the gourd and the straw: <a href="https://commons.wikimedia.org/wiki/File:Erva_mate_chimarrao_in_big_cuia.jpg" target="_blank" rel="noopener noreferrer">ChimaAddicted</a> (CC BY-SA 4.0) and <a href="https://commons.wikimedia.org/wiki/File:Bombilla.jpg" target="_blank" rel="noopener noreferrer">André Karwath (Aka)</a> (CC BY-SA 2.5), via Wikimedia Commons. The brand symbol was applied over the photos; the derivative images keep the CC BY-SA license.',
      'marca.feedback.title': 'Proposals and ideas are welcome',
      'marca.feedback.text': 'This identity is being built collaboratively. Do you have a suggestion for a color, symbol, typography, tagline or even a whole logo proposal? Share it with us: every contribution helps define the face of AI Horizon Labs.',
      'marca.feedback.send': '<i class="fas fa-envelope"></i> Send proposal',
      'marca.feedback.contactpage': 'Contact page'
    }
  };

  // ============================================================
  // Runtime
  // ============================================================
  var cache = new Map(); // element -> { html, attrs }

  function resolveLang() {
    try {
      var param = new URLSearchParams(window.location.search).get('lang');
      if (param && SUPPORTED.indexOf(param) !== -1) return param;
    } catch (e) {}
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return 'pt';
  }

  function cacheOriginals() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = cache.get(el) || {};
      entry.html = el.innerHTML;
      cache.set(el, entry);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var entry = cache.get(el) || {};
      entry.attrs = entry.attrs || {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var attr = pair.split('|')[0].trim();
        if (attr) entry.attrs[attr] = el.getAttribute(attr);
      });
      cache.set(el, entry);
    });
  }

  function applyLang(lang) {
    var dict = STRINGS[lang] || null; // null => PT (source)

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = cache.get(el);
      if (dict && dict[key] != null) {
        el.innerHTML = dict[key];
      } else if (entry) {
        el.innerHTML = entry.html;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var entry = cache.get(el);
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split('|');
        var attr = parts[0].trim();
        var key = (parts[1] || '').trim();
        if (!attr) return;
        if (dict && dict[key] != null) {
          el.setAttribute(attr, dict[key]);
        } else if (entry && entry.attrs && entry.attrs[attr] != null) {
          el.setAttribute(attr, entry.attrs[attr]);
        }
      });
    });

    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : lang);

    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'pt';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    } catch (e) {}
    applyLang(lang);
  }

  function init() {
    cacheOriginals();
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(btn.getAttribute('data-lang'));
      });
    });
    applyLang(resolveLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AILabsI18n = { setLang: setLang, applyLang: applyLang, resolveLang: resolveLang };
})();
