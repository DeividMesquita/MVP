/* Inicialização compartilhada da aplicação */
(function initApp() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
