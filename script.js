// Capturar elementos do formulário e da lista de livros
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const publicationDateInput = document.getElementById('publication-date');
const bookList = document.getElementById('book-list-body');
const nullMessage = document.getElementById('null');

// Array para armazenar os livros
let library = [];

// Função para cadastrar um livro
function cadastrarLivro(event) {
    event.preventDefault();
  
    // Obter os valores dos campos de entrada
    const title = titleInput.value;
    const author = authorInput.value;
    const publicationDate = publicationDateInput.value;
  
    // Criar um objeto de livro
    const book = { title, author, publicationDate };
  
    // Adicionar o livro ao array de livros
    library.push(book);
  
    // Limpar os campos de entrada
    titleInput.value = '';
    authorInput.value = '';
    publicationDateInput.value = '';
  
    // Atualizar a lista de livros
    atualizarListaLivros();
  
    // Salvar os livros no Local Storage
    saveLocalStorage();
  }

// Função para atualizar a lista de livros na tabela
function atualizarListaLivros() {
    // Limpar a lista de livros
    bookList.innerHTML = '';
  
    // Verificar se há livros para exibir
    if (library.length === 0) {
      nullMessage.style.display = 'block';
      return;
    }
  
    nullMessage.style.display = 'none';
  
    // Ordenar a lista de livros pelo critério selecionado
    const sortBy = document.getElementById('sort-by').value;
    if (sortBy === 'publication-date') {
      library.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
    } else {
      library.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }
  
    // Criar as linhas da tabela com os livros
    library.forEach((book) => {
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const publicationDateCell = document.createElement('td');
      const actionsCell = document.createElement('td');
  
      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      publicationDateCell.textContent = book.publicationDate;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', () => editarLivro(book));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => excluirLivro(book));
  
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(publicationDateCell);
      row.appendChild(actionsCell);
  
      bookList.appendChild(row);
    });
}

// Evento de alteração da ordenação
const sortBySelect = document.getElementById('sort-by');
sortBySelect.addEventListener('change', atualizarListaLivros);

// Função para armazenar dados no Local Storage
function saveLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}
  
// Função para carregar dados do Local Storage
function loadLocalStorage() {
    const savedLibrary = localStorage.getItem('library');
    if (savedLibrary) {
      library = JSON.parse(savedLibrary);
      atualizarListaLivros();
    }
}

// Função para editar um livro
function editarLivro(book) {
    // Preencher os campos de entrada com os valores do livro selecionado
    titleInput.value = book.title;
    authorInput.value = book.author;
    publicationDateInput.value = book.publicationDate;
  
    // Remover o livro da lista
    library = library.filter((item) => item !== book);
  
    // Atualizar a lista de livros
    atualizarListaLivros();
  
    // Salvar os livros no Local Storage
    saveLocalStorage();
}

// Função para excluir um livro
function excluirLivro(book) {
    // Remover o livro da lista
    library = library.filter((item) => item !== book);
  
    
    atualizarListaLivros();
  
    
    saveLocalStorage();
}

// Adicionar o evento de submit ao formulário
bookForm.addEventListener('submit', cadastrarLivro);

// Carregar os livros do Local Storage ao carregar a página
loadLocalStorage();