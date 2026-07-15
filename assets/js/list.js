/* Listagem, filtros e ações dos alunos. */
(function initList() {
  const tbody = document.getElementById("table-body");
  if (!tbody) return;

  const wrapper = document.getElementById("table-wrapper");
  const emptyState = document.getElementById("empty-state");
  const emptyMessage = document.getElementById("empty-message");
  const listCount = document.getElementById("list-count");
  const searchInput = document.getElementById("search-student");
  const courseFilter = document.getElementById("course-filter");
  const editModal = document.getElementById("edit-modal");
  const deleteModal = document.getElementById("delete-modal");
  const editForm = document.getElementById("edit-form");
  const cancelBtn = document.getElementById("edit-cancel");
  const deleteCancel = document.getElementById("delete-cancel");
  const deleteConfirm = document.getElementById("delete-confirm");
  let studentToDelete = null;

  const editFields = ["name", "registration", "course", "email", "phone"].map((name) => ({
    name, input: document.getElementById(`edit-${name}`), error: document.getElementById(`edit-${name}-error`),
  }));
  const editIdInput = document.getElementById("edit-id");

  const showModal = (modal) => {
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  };
  const closeModal = (modal) => {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  };
  const pluralize = (count) => `${count} aluno${count === 1 ? "" : "s"}`;

  const updateCourseFilter = (students) => {
    const selected = courseFilter.value;
    const courses = [...new Set(students.map((s) => s.course.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    courseFilter.innerHTML = '<option value="">Todos os cursos</option>' + courses.map((course) => `<option value="${Utils.escapeHTML(course)}">${Utils.escapeHTML(course)}</option>`).join("");
    courseFilter.value = courses.includes(selected) ? selected : "";
  };

  const render = () => {
    const students = Storage.readAll();
    updateCourseFilter(students);
    const search = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    const course = courseFilter.value;
    const filtered = students.filter((student) =>
      student.name.toLocaleLowerCase("pt-BR").includes(search) && (!course || student.course === course)
    );
    listCount.textContent = search || course ? `${pluralize(filtered.length)} encontrado${filtered.length === 1 ? "" : "s"} de ${pluralize(students.length)} cadastrados` : `${pluralize(students.length)} cadastrados`;

    if (!filtered.length) {
      tbody.innerHTML = "";
      wrapper.style.display = "none";
      emptyMessage.textContent = students.length ? "Nenhum aluno corresponde aos filtros selecionados." : "Comece cadastrando o primeiro aluno do sistema.";
      emptyState.classList.remove("empty--hidden");
      return;
    }
    wrapper.style.display = "";
    emptyState.classList.add("empty--hidden");
    tbody.innerHTML = filtered.map((s) => `
      <tr class="table__row" data-id="${Utils.escapeHTML(s.id)}">
        <td class="table__cell table__cell--name">${Utils.escapeHTML(s.name)}</td>
        <td class="table__cell">${Utils.escapeHTML(s.registration)}</td>
        <td class="table__cell">${Utils.escapeHTML(s.course)}</td>
        <td class="table__cell">${Utils.escapeHTML(s.email)}</td>
        <td class="table__cell">${Utils.escapeHTML(s.phone)}</td>
        <td class="table__cell table__cell--actions"><div class="table__actions">
          <button type="button" class="button button--secondary button--sm" data-action="edit" aria-label="Editar ${Utils.escapeHTML(s.name)}"><i class="bi bi-pencil-square" aria-hidden="true"></i><span>Editar</span></button>
          <button type="button" class="button button--danger button--sm" data-action="delete" aria-label="Excluir ${Utils.escapeHTML(s.name)}"><i class="bi bi-trash3" aria-hidden="true"></i><span>Excluir</span></button>
        </div></td>
      </tr>`).join("");
  };

  const openEdit = (student) => {
    editIdInput.value = student.id;
    editFields.forEach(({ name, input, error }) => { input.value = student[name] ?? ""; Utils.setFieldError(input, error, ""); });
    showModal(editModal);
  };
  const validateEdit = () => {
    let isValid = true;
    editFields.forEach(({ name, input, error }) => {
      const value = input.value.trim();
      const message = !value ? "Este campo é obrigatório." : name === "email" && !Utils.isEmail(value) ? "Informe um e-mail válido." : name === "phone" && !Utils.isPhone(value) ? "Informe um telefone válido." : "";
      Utils.setFieldError(input, error, message);
      if (message) isValid = false;
    });
    return isValid;
  };

  tbody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const student = Storage.findById(button.closest("tr[data-id]")?.dataset.id);
    if (!student) return;
    if (button.dataset.action === "edit") openEdit(student);
    else { studentToDelete = student; showModal(deleteModal); }
  });
  searchInput.addEventListener("input", render);
  courseFilter.addEventListener("change", render);
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateEdit()) return;
    const patch = editFields.reduce((data, { name, input }) => ({ ...data, [name]: input.value.trim() }), {});
    Storage.update(editIdInput.value, patch);
    closeModal(editModal);
    Utils.toast("Aluno atualizado.");
    render();
  });
  cancelBtn.addEventListener("click", () => closeModal(editModal));
  editFields.forEach(({ name, input, error }) => input.addEventListener("input", () => {
    const value = input.value.trim();
    const message = !value ? "" : name === "email" && !Utils.isEmail(value) ? "Informe um e-mail válido." : name === "phone" && !Utils.isPhone(value) ? "Informe um telefone válido." : "";
    Utils.setFieldError(input, error, message);
  }));
  deleteCancel.addEventListener("click", () => closeModal(deleteModal));
  deleteConfirm.addEventListener("click", () => {
    if (!studentToDelete) return;
    Storage.remove(studentToDelete.id);
    closeModal(deleteModal);
    Utils.toast("Aluno removido.", "info");
    studentToDelete = null;
    render();
  });
  render();
})();
