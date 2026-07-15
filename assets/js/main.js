/* Inicialização compartilhada da aplicação */
(function initApp() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const totalStudents = document.getElementById("total-students");
  const totalCourses = document.getElementById("total-courses");
  if (!totalStudents || !totalCourses || typeof Storage === "undefined") return;

  const updateStats = () => {
    const students = Storage.readAll();
    totalStudents.textContent = students.length;
    totalCourses.textContent = new Set(
      students.map((student) => String(student.course || "").trim().toLocaleLowerCase("pt-BR")).filter(Boolean)
    ).size;
  };

  updateStats();
  window.addEventListener("storage", updateStats);
})();
