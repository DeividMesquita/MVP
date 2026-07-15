/* Funções auxiliares reutilizáveis */
const Utils = (() => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_DIGITS_MIN = 8;

  const isEmail = (value) => EMAIL_REGEX.test(String(value).trim());

  const isPhone = (value) => {
    const digits = String(value).replace(/\D/g, "");
    return digits.length >= PHONE_DIGITS_MIN;
  };

  const isNotEmpty = (value) => String(value ?? "").trim().length > 0;

  const generateId = () =>
    "a_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[ch]);

  const toast = (message, type = "success", timeout = 4000) => {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");
      document.body.appendChild(container);
    }

    const icons = { success: "check-circle-fill", info: "info-circle-fill", danger: "exclamation-circle-fill" };
    const item = document.createElement("div");
    item.className = `toast toast--${type}`;
    item.setAttribute("role", "status");
    item.innerHTML = `<i class="bi bi-${icons[type] || icons.info}" aria-hidden="true"></i><span class="toast__message"></span><button class="toast__close" type="button" aria-label="Fechar mensagem"><i class="bi bi-x-lg" aria-hidden="true"></i></button>`;
    item.querySelector(".toast__message").textContent = message;
    container.appendChild(item);

    const remove = () => {
      item.classList.add("toast--leaving");
      window.setTimeout(() => item.remove(), 180);
    };
    item.querySelector(".toast__close").addEventListener("click", remove);
    window.setTimeout(remove, timeout);
  };

  const setFieldError = (input, errorEl, message) => {
    if (!input || !errorEl) return;
    if (message) {
      input.classList.add("form__input--error");
      input.classList.remove("form__input--valid");
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.classList.remove("form__input--error");
      if (input.value.trim()) input.classList.add("form__input--valid");
      else input.classList.remove("form__input--valid");
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  };

  return {
    isEmail,
    isPhone,
    isNotEmpty,
    generateId,
    escapeHTML,
    toast,
    setFieldError,
  };
})();
