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

  const showAlert = (element, message, type = "success", timeout = 4000) => {
    if (!element) return;
    element.className = `alert alert--${type}`;
    element.textContent = message;
    if (timeout > 0) {
      window.clearTimeout(element.__timer);
      element.__timer = window.setTimeout(() => hideAlert(element), timeout);
    }
  };

  const hideAlert = (element) => {
    if (!element) return;
    element.className = "alert alert--hidden";
    element.textContent = "";
  };

  const setFieldError = (input, errorEl, message) => {
    if (!input || !errorEl) return;
    if (message) {
      input.classList.add("form__input--error");
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.classList.remove("form__input--error");
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
    showAlert,
    hideAlert,
    setFieldError,
  };
})();
