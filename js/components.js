class SiteHeader extends HTMLElement {
  connectedCallback() {
    // Template inline para evitar dependência de arquivos externos
    this.innerHTML = `
      <header class="bg-dark-light border-b border-gray-700 py-4">
        <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href="index.html" class="text-2xl font-bold text-primary">Teste Tudo</a>
          <nav class="space-x-4 text-sm">
            <a href="identificador-hardware.html" class="hover:text-primary">Identificador</a>
            <a href="teste-touch-screen.html" class="hover:text-primary">Touch</a>
            <a href="audio-microfone.html" class="hover:text-success">Áudio</a>
            <a href="teste-seu-processador.html" class="hover:text-accent">CPU</a>
            <a href="teste-velocidade-internet.html" class="hover:text-cyan-400">Internet</a>
            <a href="teste-sensor-proximidade.html" class="hover:text-purple-400">Proximidade</a>
            <a href="teste-seu-teclado.html" class="hover:text-yellow-400">Teclado</a>
          </nav>
        </div>
      </header>`;
  }
}

class SiteContainerTitle extends HTMLElement {
  connectedCallback() {
    // Template inline para evitar dependência de arquivos externos
    this.innerHTML = `
       <header class="relative z-10 w-full text-center py-12 px-4">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-6xl md:text-7xl  font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 animate-glow">
                ${this.getAttribute('title')}
            </h1>
            <p class="text-xl md:text-2xl text-gray-300">${this.getAttribute('description')}</p>
        </div>
    </header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    // const year = new Date().getFullYear();
    this.innerHTML = `
          <footer class="relative z-10 mt-16 py-8 border-t border-gray-800">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <p class="text-gray-400">
                    Desenvolvido por 
                    <a href="https://phelipecurty.vercel.app/" target="_blank" class="font-semibold text-primary">Phelipe Curty</a>
                </p>
                <div class="flex space-x-2">
                    <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div class="w-2 h-2 bg-accent rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                    <div class="w-2 h-2 bg-success rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
                </div>
            </div>
        </div>
    </footer>
      `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-container-title', SiteContainerTitle);
customElements.define('site-footer', SiteFooter);