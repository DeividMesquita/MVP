# 🎓 EduCadastro

Um sistema web desenvolvido para o gerenciamento de alunos, criado como um MVP utilizando apenas **HTML5, CSS3 e JavaScript (Vanilla JS)**. O projeto foi desenvolvido para funcionar totalmente no navegador, sem necessidade de servidor ou banco de dados, utilizando o **LocalStorage** para persistência dos dados.

## 🔗 Demonstração

Acesse o projeto publicado no GitHub Pages:

**https://deividmesquita.github.io/MVP/**

---

## 📸 Preview

> Recomenda-se adicionar capturas de tela do projeto.

### Home

`/assets/images/home.png`

### Cadastro

`/assets/images/cadastro.png`

### Listagem

`/assets/images/listagem.png`

---

## ✨ Funcionalidades

* Cadastro de alunos
* Edição de registros
* Exclusão de alunos
* Pesquisa em tempo real
* Filtro por curso
* Contador de alunos cadastrados
* Estatísticas na página inicial
* Exportação dos dados para Excel (CSV)
* Armazenamento local utilizando LocalStorage
* Modal de confirmação para exclusão
* Toasts de sucesso e erro
* Validação de formulário
* Validação de e-mail utilizando Regex
* Máscara automática para telefone
* Interface responsiva
* Estado vazio para listagem sem registros

---

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage
* Bootstrap Icons

---

## 📂 Estrutura do projeto

```text
MVP/
│
├── index.html
├── cadastro.html
├── listagem.html
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
└── README.md
```

---

## 🚀 Como executar

Clone o repositório:

```bash
git clone https://github.com/DeividMesquita/MVP.git
```

Acesse a pasta:

```bash
cd MVP
```

Abra o arquivo **index.html** no navegador.

Ou utilize a extensão **Live Server** no Visual Studio Code para uma melhor experiência durante o desenvolvimento.

---

## 💾 Persistência dos dados

Todos os registros são armazenados utilizando o **LocalStorage** do navegador.

Isso significa que:

* Não há banco de dados.
* Não há API.
* Não há backend.
* Os dados permanecem salvos no navegador até serem removidos manualmente ou o armazenamento local ser limpo.

---

## 📋 Funcionalidades implementadas

### Página Inicial

* Hero com apresentação do sistema
* Cards informativos
* Estatísticas automáticas
* Navegação entre páginas

### Cadastro

* Cadastro de alunos
* Validação de campos obrigatórios
* Validação de e-mail com Regex
* Máscara para telefone
* Feedback visual durante o preenchimento
* Toast de confirmação

### Listagem

* Pesquisa em tempo real
* Filtro por curso
* Contador de registros
* Edição de alunos
* Exclusão com modal de confirmação
* Exportação para CSV
* Estado vazio quando não existem registros

---

## 📱 Responsividade

O projeto foi desenvolvido utilizando a abordagem **Mobile First**, garantindo compatibilidade com:

* Smartphones
* Tablets
* Notebooks
* Desktops

---

## ♿ Acessibilidade

Foram aplicadas boas práticas de acessibilidade, incluindo:

* HTML semântico
* Labels associadas aos campos
* Navegação por teclado
* Estados de foco
* Atributos `aria-label`
* `autocomplete` nos formulários

---

## 🎯 Objetivo

Este projeto foi desenvolvido com fins acadêmicos e como prática de desenvolvimento Front-End, aplicando conceitos como:

* Organização de código
* Componentização
* Metodologia BEM
* Manipulação do DOM
* Eventos
* LocalStorage
* Validação de formulários
* Responsividade
* Experiência do usuário (UX)

---

## 📈 Melhorias futuras

* Exportação em formato XLSX
* Importação de planilhas
* Paginação da listagem
* Ordenação por colunas
* Tema escuro
* Dashboard com gráficos
* Persistência em banco de dados
* Autenticação de usuários

---

## 👨‍💻 Autor

**Deividson Mesquita**

Desenvolvedor Front-End apaixonado por criar interfaces modernas, responsivas e intuitivas.

* GitHub: https://github.com/DeividMesquita
* LinkedIn: https://www.linkedin.com/in/deividmesquita/

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e demonstração, podendo ser utilizado como referência para projetos educacionais.
