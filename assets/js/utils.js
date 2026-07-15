/* Funções auxiliares reutilizáveis */
const Utils = (() => {
  const EMAIL_REGEX = /^(?!\.)(?!.*\.\.)(?!.*\.@)[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
  const PHONE_DIGITS_MIN = 10;
  const PHONE_DIGITS_MAX = 11;

  const isEmail = (value) => EMAIL_REGEX.test(String(value).trim());

  const isPhone = (value) => {
    const digits = String(value).replace(/\D/g, "");
    return digits.length >= PHONE_DIGITS_MIN && digits.length <= PHONE_DIGITS_MAX;
  };

  const formatPhone = (value) => {
    const digits = String(value ?? "").replace(/\D/g, "").slice(0, PHONE_DIGITS_MAX);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;

    const ddd = digits.slice(0, 2);
    const number = digits.slice(2);
    const firstPartLength = digits.length === PHONE_DIGITS_MAX ? 5 : 4;
    const firstPart = number.slice(0, firstPartLength);
    const secondPart = number.slice(firstPartLength);

    return secondPart ? `(${ddd}) ${firstPart}-${secondPart}` : `(${ddd}) ${firstPart}`;
  };

  const isNotEmpty = (value) => String(value ?? "").trim().length > 0;

  const getStudentFieldValidationMessage = (name, value) => {
    if (!isNotEmpty(value)) return "Este campo é obrigatório.";
    if (name === "email" && !isEmail(value)) return "Informe um e-mail válido.";
    if (name === "phone" && !isPhone(value)) return "Informe um telefone válido.";
    return "";
  };

  const applyPhoneMask = (input) => {
    const cursorPosition = input.selectionStart ?? input.value.length;
    const digitsBeforeCursor = input.value.slice(0, cursorPosition).replace(/\D/g, "").length;
    const formattedValue = formatPhone(input.value);

    input.value = formattedValue;

    let digitsFound = 0;
    let newCursorPosition = formattedValue.length;
    for (let index = 0; index < formattedValue.length; index += 1) {
      if (/\d/.test(formattedValue[index])) digitsFound += 1;
      if (digitsFound === digitsBeforeCursor) {
        newCursorPosition = index + 1;
        break;
      }
    }
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  };

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
    formatPhone,
    isNotEmpty,
    getStudentFieldValidationMessage,
    applyPhoneMask,
    generateId,
    escapeHTML,
    toast,
    setFieldError,
  };
})();
