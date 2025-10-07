class SiteHeader extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch('partials/header.html', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.innerHTML = await res.text();
    } catch (err) {
      console.error('Erro ao carregar header.html:', err);
      this.innerHTML = `
        <header class="bg-dark-light border-b border-gray-700 py-4">
          <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <a href="index.html" class="text-2xl font-bold text-primary">Teste Tudo</a>
            <nav class="space-x-4 text-sm">
              <a href="teste-touch-screen.html" class="hover:text-primary">Touch</a>
              <a href="audio-microfone.html" class="hover:text-success">Áudio</a>
              <a href="teste-seu-processador.html" class="hover:text-accent">CPU</a>
              <a href="teste-velocidade-internet.html" class="hover:text-cyan-400">Internet</a>
              <a href="teste-sensor-proximidade.html" class="hover:text-purple-400">Proximidade</a>
              <a href="teste-seu-teclado.html" class="hover:text-yellow-400">Teclado</a>
              <a href="identificador-hardware.html" class="hover:text-primary">Identificador</a>
            </nav>
          </div>
        </header>`;
    }
  }
}

class SiteFooter extends HTMLElement {
  async connectedCallback() {
    try {
      const res = await fetch('partials/footer.html', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.innerHTML = await res.text();
    } catch (err) {
      console.error('Erro ao carregar footer.html:', err);
      const year = new Date().getFullYear();
      this.innerHTML = `
        <footer class="bg-dark-light border-t border-gray-700 py-6">
          <div class="max-w-6xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; ${year} Teste Tudo. Todos os direitos reservados.</p>
          </div>
        </footer>`;
    }
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);