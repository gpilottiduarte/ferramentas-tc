// Versão melhorada do script com correções críticas
class StyleGuideApp {
  constructor() {
    this.sections = [];
    this.mdText = '';
    this.searchCache = new Map();
    this.eventListeners = [];
    this.currentView = 'home';
  }

  // Utilitário para debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Sanitização robusta de entrada
  sanitizeSearchTerm(term) {
    if (!term || typeof term !== 'string') return '';
    
    // Remove caracteres perigosos e limita tamanho
    const cleaned = term.slice(0, 100).trim();
    
    // Remove caracteres de controle e não-printáveis
    const sanitized = cleaned.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    
    // Escape mais robusto para regex
    return sanitized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Sanitiza HTML para prevenir XSS
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Mostra loading indicator
  showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.remove('hidden');
    }
  }

  // Esconde loading indicator
  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hidden');
    }
  }

  // Adiciona listener com cleanup automático
  addEventListenerWithCleanup(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }

  // Remove todos os event listeners
  cleanup() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
    this.searchCache.clear();
  }

  // Tratamento de erro centralizado
  handleError(context, error) {
    console.error(`❌ ${context}:`, error);
    this.showErrorMessage(context, error.message);
  }

  // Mostra mensagem de erro na interface
  showErrorMessage(context, message) {
    const main = document.querySelector('#home-view main');
    if (main) {
      main.innerHTML = `
        <div class="error-message" style="
          background: #fee; 
          border: 1px solid #fcc; 
          padding: 1rem; 
          border-radius: 0.5rem; 
          margin: 1rem 0;
        ">
          <h2>❌ ${context}</h2>
          <p>${message}</p>
          <button onclick="location.reload()" style="
            background: var(--color-primary); 
            color: white; 
            border: none; 
            padding: 0.5rem 1rem; 
            border-radius: 0.25rem; 
            cursor: pointer; 
            margin-top: 0.5rem;
          ">
            Tentar novamente
          </button>
        </div>
      `;
    }
  }

  // Carrega o markdown com tratamento de erro melhorado
  async loadMarkdown() {
    try {
      const response = await fetch('guia-estilos.md');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      this.mdText = await response.text();
      
      if (!this.mdText.trim()) {
        throw new Error('Arquivo markdown está vazio');
      }
      
      const tokens = marked.lexer(this.mdText);
      this.groupBySection(tokens);
      
      if (this.sections.length === 0) {
        throw new Error('Nenhuma seção encontrada no markdown');
      }
      
      console.log('✅ Guia de estilos carregado com sucesso!');
      console.log(`📄 ${this.sections.length} seções encontradas:`, this.sections.map(s => s.title));
      
    } catch (error) {
      this.handleError('Erro ao carregar guia-estilos.md', error);
      throw error;
    }
  }

  // Agrupa tokens por seção com validação
  groupBySection(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
      throw new Error('Tokens inválidos ou vazios');
    }

    let current = { title: 'Introdução', tokens: [] };
    
    tokens.forEach(token => {
      if (token.type === 'heading' && token.depth === 2) {
        if (current.tokens.length > 0) {
          this.sections.push(current);
        }
        current = { title: token.text || 'Seção sem título', tokens: [token] };
      } else {
        current.tokens.push(token);
      }
    });
    
    if (current.tokens.length > 0) {
      this.sections.push(current);
    }
    
    // Remove seção de introdução vazia
    if (this.sections.length > 0 && this.sections[0].tokens.length === 0) {
      this.sections.shift();
    }
  }

  // Constrói menu com cleanup adequado
  buildMenu() {
    const ul = document.getElementById('section-list');
    if (!ul) {
      throw new Error('Elemento section-list não encontrado');
    }

    // Limpa menu existente
    ul.innerHTML = '';

    this.sections.forEach((sec, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      a.textContent = sec.title;
      a.href = '#';
      a.setAttribute('role', 'button');
      a.setAttribute('aria-label', `Visualizar seção: ${sec.title}`);
      
      const clickHandler = (e) => {
        e.preventDefault();
        this.showSection(i);
      };
      
      this.addEventListenerWithCleanup(a, 'click', clickHandler);
      
      // Suporte para navegação por teclado
      const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showSection(i);
        }
      };
      
      this.addEventListenerWithCleanup(a, 'keydown', keyHandler);
      
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  // Renderiza seção com validação
  showSection(idx) {
    if (idx < 0 || idx >= this.sections.length) {
      console.error('Índice de seção inválido:', idx);
      return;
    }

    try {
      document.getElementById('home-view').classList.add('hidden');
      document.getElementById('content-view').classList.remove('hidden');
      
      const html = marked.parser(this.sections[idx].tokens);
      const contentElement = document.getElementById('content');
      
      if (contentElement) {
        contentElement.innerHTML = html;
        window.scrollTo(0, 0);
        this.currentView = 'content';
      }
      
    } catch (error) {
      this.handleError('Erro ao renderizar seção', error);
    }
  }

  // Busca otimizada com cache
  doSearch(term) {
    const sanitizedTerm = this.sanitizeSearchTerm(term);
    
    if (!sanitizedTerm) {
      this.clearSearchResults();
      return;
    }

    // Verifica cache
    if (this.searchCache.has(sanitizedTerm)) {
      this.displaySearchResults(this.searchCache.get(sanitizedTerm), term);
      return;
    }

    try {
      const results = [];
      const regex = new RegExp(sanitizedTerm, 'i');

      this.sections.forEach((sec, i) => {
        // Usa cache para conteúdo processado
        const cacheKey = `section_${i}`;
        let processedContent;
        
        if (this.searchCache.has(cacheKey)) {
          processedContent = this.searchCache.get(cacheKey);
        } else {
          processedContent = marked.parser(sec.tokens)
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          this.searchCache.set(cacheKey, processedContent);
        }

        if (regex.test(processedContent)) {
          const snippet = this.createSearchSnippet(processedContent, regex, sanitizedTerm);
          results.push({ idx: i, title: sec.title, snippet });
        }
      });

      // Cache dos resultados
      this.searchCache.set(sanitizedTerm, results);
      this.displaySearchResults(results, term);
      
    } catch (error) {
      this.handleError('Erro na busca', error);
    }
  }

  // Cria snippet de busca melhorado
  createSearchSnippet(content, regex, term) {
    const lines = content.split('\n').filter(line => line.trim());
    const matchingLines = lines.filter(line => regex.test(line));
    
    if (matchingLines.length === 0) return 'Conteúdo encontrado...';
    
    return matchingLines
      .slice(0, 2)
      .map(line => {
        // Destaca o termo encontrado
        return line.replace(new RegExp(term, 'gi'), match => `<mark>${match}</mark>`);
      })
      .join(' … ');
  }

  // Exibe resultados da busca
  displaySearchResults(results, originalTerm) {
    const container = document.getElementById('search-results');
    if (!container) return;

    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = `
        <div class="no-results" style="
          text-align: center; 
          padding: 2rem; 
          color: #666;
        ">
          <p>🔍 Nenhum resultado encontrado para "<strong>${originalTerm}</strong>"</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">
            Tente usar termos diferentes ou verifique a ortografia.
          </p>
        </div>
      `;
      return;
    }

    const resultsHeader = document.createElement('div');
    resultsHeader.innerHTML = `
      <h3 style="margin-bottom: 1rem; color: var(--color-primary);">
        📋 ${results.length} resultado${results.length > 1 ? 's' : ''} para "${originalTerm}"
      </h3>
    `;
    container.appendChild(resultsHeader);

    results.forEach(result => {
      const div = document.createElement('div');
      div.className = 'result';
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.setAttribute('aria-label', `Resultado: ${result.title}`);
      
      div.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.snippet}</p>
      `;
      
      const clickHandler = () => this.showSection(result.idx);
      const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showSection(result.idx);
        }
      };
      
      this.addEventListenerWithCleanup(div, 'click', clickHandler);
      this.addEventListenerWithCleanup(div, 'keydown', keyHandler);
      
      container.appendChild(div);
    });
  }

  // Limpa resultados da busca
  clearSearchResults() {
    const container = document.getElementById('search-results');
    if (container) {
      container.innerHTML = '';
    }
  }

  // Volta para a home
  goHome() {
    document.getElementById('content-view').classList.add('hidden');
    document.getElementById('home-view').classList.remove('hidden');
    
    // Limpa busca ao voltar
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.value = '';
    }
    
    this.clearSearchResults();
    this.currentView = 'home';
  }

  // Configura event listeners
  setupEventListeners() {
    // Busca com debounce
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      const debouncedSearch = this.debounce((term) => {
        if (term.trim()) {
          this.doSearch(term.trim());
        } else {
          this.clearSearchResults();
        }
      }, 300);

      // Busca em tempo real
      this.addEventListenerWithCleanup(searchInput, 'input', (e) => {
        debouncedSearch(e.target.value);
      });

      // Busca ao pressionar Enter
      this.addEventListenerWithCleanup(searchInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const term = e.target.value.trim();
          if (term) {
            this.doSearch(term);
          }
        }
      });
    }

    // Botão voltar
    const backButton = document.getElementById('back-button');
    if (backButton) {
      this.addEventListenerWithCleanup(backButton, 'click', () => {
        this.goHome();
      });
    }

    // Navegação por teclado global
    this.addEventListenerWithCleanup(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.currentView === 'content') {
        this.goHome();
      }
    });
  }

  // Inicialização da aplicação
  async init() {
    try {
      console.log('🚀 Inicializando aplicação...');
      
      await this.loadMarkdown();
      this.buildMenu();
      this.setupEventListeners();
      
      console.log('✅ Aplicação inicializada com sucesso!');
      
    } catch (error) {
      this.handleError('Erro na inicialização da aplicação', error);
    }
  }
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new StyleGuideApp();
  app.init();
  
  // Cleanup ao sair da página
  window.addEventListener('beforeunload', () => {
    app.cleanup();
  });
});
