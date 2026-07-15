/* Exportação reutilizável de alunos para CSV compatível com Excel. */
const StudentExporter = (() => {
  const COLUMNS = [
    { label: "Nome", key: "name" },
    { label: "Matrícula", key: "registration" },
    { label: "Curso", key: "course" },
    { label: "E-mail", key: "email" },
    { label: "Telefone", key: "phone" },
  ];

  const escapeCsvValue = (value) => {
    const text = String(value ?? "").replace(/"/g, '""');
    return `"${text}"`;
  };

  const getFileName = () => {
    const date = new Date();
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return `alunos_${formattedDate}.csv`;
  };

  const exportStudents = (students) => {
    if (!Array.isArray(students) || !students.length) return false;

    const rows = [
      COLUMNS.map(({ label }) => escapeCsvValue(label)).join(";"),
      ...students.map((student) =>
        COLUMNS.map(({ key }) => escapeCsvValue(student[key])).join(";")
      ),
    ];
    const csv = `\uFEFF${rows.join("\r\n")}`;
    const file = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = getFileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  };

  return { exportStudents };
})();
