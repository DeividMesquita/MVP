/* Cadastro e validação do formulário de alunos */
(function initForm() {
  const form = document.getElementById("student-form");
  if (!form) return;

  const alertEl = document.getElementById("alert");

  const fields = ["name", "registration", "course", "email", "phone"].map((name) => ({
    name,
    input: document.getElementById(name),
    error: document.getElementById(`${name}-error`),
  }));

  const validate = () => {
    let valid = true;

    fields.forEach(({ name, input, error }) => {
      const value = input.value.trim();

      if (!Utils.isNotEmpty(value)) {
        Utils.setFieldError(input, error, "Este campo é obrigatório.");
        valid = false;
        return;
      }

      if (name === "email" && !Utils.isEmail(value)) {
        Utils.setFieldError(input, error, "Informe um e-mail válido.");
        valid = false;
        return;
      }

      if (name === "phone" && !Utils.isPhone(value)) {
        Utils.setFieldError(input, error, "Informe um telefone válido.");
        valid = false;
        return;
      }

      Utils.setFieldError(input, error, "");
    });

    return valid;
  };

  fields.forEach(({ input, error }) => {
    input.addEventListener("input", () => Utils.setFieldError(input, error, ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      Utils.showAlert(alertEl, "Verifique os campos destacados.", "danger");
      return;
    }

    const student = {
      id: Utils.generateId(),
      name: fields[0].input.value.trim(),
      registration: fields[1].input.value.trim(),
      course: fields[2].input.value.trim(),
      email: fields[3].input.value.trim(),
      phone: fields[4].input.value.trim(),
      createdAt: new Date().toISOString(),
    };

    Storage.add(student);
    Utils.showAlert(alertEl, "Aluno cadastrado com sucesso!", "success");
    form.reset();
    fields[0].input.focus();
  });

  form.addEventListener("reset", () => {
    fields.forEach(({ input, error }) => Utils.setFieldError(input, error, ""));
    Utils.hideAlert(alertEl);
  });
})();
