/* Renderização da listagem de alunos */
(function initList() {
  const tbody = document.getElementById("table-body");
  if (!tbody) return;

  const wrapper = document.getElementById("table-wrapper");
  const emptyState = document.getElementById("empty-state");
  const alertEl = document.getElementById("alert");
  const modal = document.getElementById("edit-modal");
  const editForm = document.getElementById("edit-form");
  const cancelBtn = document.getElementById("edit-cancel");

  const editFields = ["name", "registration", "course", "email", "phone"].map((name) => ({
    name,
    input: document.getElementById(`edit-${name}`),
    error: document.getElementById(`edit-${name}-error`),
  }));
  const editIdInput = document.getElementById("edit-id");

  const render = () => {
    const students = Storage.readAll();

    if (students.length === 0) {
      tbody.innerHTML = "";
      wrapper.style.display = "none";
      emptyState.classList.remove("empty--hidden");
      return;
    }

    wrapper.style.display = "";
    emptyState.classList.add("empty--hidden");

    tbody.innerHTML = students
      .map(
        (s) => `
        <tr class="table__row" data-id="${Utils.escapeHTML(s.id)}">
          <td class="table__cell table__cell--name">${Utils.escapeHTML(s.name)}</td>
          <td class="table__cell">${Utils.escapeHTML(s.registration)}</td>
          <td class="table__cell">${Utils.escapeHTML(s.course)}</td>
          <td class="table__cell">${Utils.escapeHTML(s.email)}</td>
          <td class="table__cell">${Utils.escapeHTML(s.phone)}</td>
          <td class="table__cell table__cell--actions">
            <div class="table__actions">
              <button type="button" class="button button--secondary button--sm" data-action="edit">Editar</button>
              <button type="button" class="button button--danger button--sm" data-action="delete">Excluir</button>
            </div>
          </td>
        </tr>`
      )
      .join("");
  };

  const openEdit = (student) => {
    editIdInput.value = student.id;
    editFields.forEach(({ name, input, error }) => {
      input.value = student[name] ?? "";
      Utils.setFieldError(input, error, "");
    });
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  };

  const closeEdit = () => {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  };

  const validateEdit = () => {
    let valid = true;
    editFields.forEach(({ name, input, error }) => {
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

  tbody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const row = button.closest("tr[data-id]");
    const id = row?.dataset.id;
    if (!id) return;

    const student = Storage.findById(id);
    if (!student) return;

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm(`Excluir o aluno "${student.name}"?`);
      if (!confirmed) return;
      Storage.remove(id);
      Utils.showAlert(alertEl, "Aluno excluído com sucesso.", "info");
      render();
    } else if (button.dataset.action === "edit") {
      openEdit(student);
    }
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateEdit()) return;

    const id = editIdInput.value;
    const patch = editFields.reduce((acc, { name, input }) => {
      acc[name] = input.value.trim();
      return acc;
    }, {});

    Storage.update(id, patch);
    closeEdit();
    Utils.showAlert(alertEl, "Aluno atualizado com sucesso!", "success");
    render();
  });

  cancelBtn.addEventListener("click", closeEdit);

  render();
})();
