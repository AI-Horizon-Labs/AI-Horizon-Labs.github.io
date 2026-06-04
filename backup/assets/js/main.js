/**
 * AI Horizon Labs - JavaScript Principal
 * Navegação, interatividade e funcionalidades gerais
 */

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      });
    });

    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');
      dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    });
  }

  // Fechar menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu?.classList.remove('active');
      const icon = mobileToggle?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  });
});

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#!') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// Active Navigation Link
// ============================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============================================
// Scroll to Top Button
// ============================================
function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Voltar ao topo');
  document.body.appendChild(button);

  // Adicionar estilos via CSS
  const style = document.createElement('style');
  style.textContent = `
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--color-primary);
      color: var(--color-white);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .scroll-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    .scroll-to-top:hover {
      background-color: var(--color-primary-light);
      transform: translateY(-5px);
    }
    .scroll-to-top:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
      }
    }
  `;
  document.head.appendChild(style);

  // Mostrar/ocultar botão ao rolar
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });

  // Scroll to top ao clicar
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================
// Loading Animation for Cards
// ============================================
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar a cards, se existirem
  const cards = document.querySelectorAll('.card, .member-card, .news-item');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// Form Validation (Contato)
// ============================================
function setupFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    
    let isValid = true;

    // Validação simples
    if (!name.value.trim()) {
      showError(name, 'Por favor, informe seu nome.');
      isValid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'Por favor, informe um e-mail válido.');
      isValid = false;
    } else {
      clearError(email);
    }

    if (!message.value.trim()) {
      showError(message, 'Por favor, escreva uma mensagem.');
      isValid = false;
    } else {
      clearError(message);
    }

    if (isValid) {
      // Se usar Formspree ou similar, o form será enviado normalmente
      // Caso contrário, processar aqui
      showSuccess('Mensagem enviada com sucesso!');
      form.reset();
    }
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  let error = formGroup.querySelector('.error-message');
  
  if (!error) {
    error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = '#DC2626';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    formGroup.appendChild(error);
  }
  
  error.textContent = message;
  input.style.borderColor = '#DC2626';
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error-message');
  if (error) error.remove();
  input.style.borderColor = '';
}

function showSuccess(message) {
  const alert = document.createElement('div');
  alert.className = 'success-alert';
  alert.textContent = message;
  alert.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #10B981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', setupFormValidation);

// ============================================
// Counter Animation (Stats)
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-count') || target.textContent);
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            target.textContent = targetValue + '+';
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(currentValue) + '+';
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// Filter Publications/Projects
// ============================================
function setupFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter items
      filterItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.5s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', setupFilters);

// ============================================
// Add CSS Animations
// ============================================
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .nav-menu a.active {
    color: var(--color-primary);
    background-color: var(--color-bg-light);
  }
`;
document.head.appendChild(animationStyles);

// ============================================
// Accessibility: Skip to Main Content
// ============================================
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Pular para o conteúdo principal';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
  `;
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', addSkipLink);

console.log('🚀 AI Horizon Labs - Site carregado com sucesso!');
