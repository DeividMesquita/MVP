/* Cadastro e validação do formulário de alunos. */
(function initForm() {
  const form = document.getElementById("student-form");
  if (!form) return;

  const fields = ["name", "registration", "course", "email", "phone"].map((name) => ({
    name,
    input: document.getElementById(name),
    error: document.getElementById(`${name}-error`),
  }));

  const validateField = ({ name, input, error }) => {
    const message = Utils.getStudentFieldValidationMessage(name, input.value.trim());
    Utils.setFieldError(input, error, message);
    return !message;
  };

  const validate = () => fields.every(validateField);

  fields.forEach((field) => {
    const { name, input, error } = field;

    input.addEventListener("input", () => {
      if (name === "phone") Utils.applyPhoneMask(input);
      if (!input.value.trim()) {
        Utils.setFieldError(input, error, "");
        return;
      }
      validateField(field);
    });
    input.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      Utils.toast("Verifique os campos destacados.", "danger");
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
    Utils.toast("Aluno cadastrado com sucesso.", "success");
    form.reset();
    fields[0].input.focus();
  });

  form.addEventListener("reset", () => {
    fields.forEach(({ input, error }) => Utils.setFieldError(input, error, ""));
  });
})();
