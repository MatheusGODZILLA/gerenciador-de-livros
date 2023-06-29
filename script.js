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