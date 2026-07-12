/* Operações de LocalStorage */
const Storage = (() => {
  const KEY = "sa:students";

  const readAll = () => {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Erro ao ler alunos:", err);
      return [];
    }
  };

  const saveAll = (students) => {
    window.localStorage.setItem(KEY, JSON.stringify(students));
  };

  const add = (student) => {
    const students = readAll();
    students.push(student);
    saveAll(students);
    return student;
  };

  const update = (id, patch) => {
    const students = readAll();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return null;
    students[index] = { ...students[index], ...patch, id };
    saveAll(students);
    return students[index];
  };

  const remove = (id) => {
    const students = readAll();
    const filtered = students.filter((s) => s.id !== id);
    saveAll(filtered);
    return filtered.length !== students.length;
  };

  const findById = (id) => readAll().find((s) => s.id === id) || null;

  return { readAll, saveAll, add, update, remove, findById };
})();
