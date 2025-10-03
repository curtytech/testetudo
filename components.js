class SiteHeader extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('/partials/header.html');
    this.innerHTML = await res.text();
  }
}
class SiteFooter extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('/partials/footer.html');
    this.innerHTML = await res.text();
  }
}
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);