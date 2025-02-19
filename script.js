document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('input[type="number"]');
    const bookContainer = document.getElementById('book-container');
  
    // Função que carrega o livro com base no ISBN inserido
    function searchBookByISBN(isbn) {
      fetch(`https://openlibrary.org/isbn/${isbn}.json`)
        .then(response => response.json())
        .then(data => {
          // Limpa o container de livros antes de mostrar os resultados da pesquisa
          bookContainer.innerHTML = '';
  
          if (data.title) {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book1');  // Ou qualquer classe para organização
  
            // Capa do livro
            const coverDiv = document.createElement('div');
            coverDiv.classList.add('cover');
            const coverImg = document.createElement('img');
            coverImg.src = data.cover_id ? `https://covers.openlibrary.org/b/id/${data.cover_id}-L.jpg` : './Assets_Imgs/default-cover.jpg';
            coverDiv.appendChild(coverImg);
  
            // Título do livro
            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('description');
            const titleH3 = document.createElement('h3');
            titleH3.textContent = data.title;
            descriptionDiv.appendChild(titleH3);
  
            // Autor do livro
            const authorDiv = document.createElement('div');
            authorDiv.classList.add('author');
            const authorH4 = document.createElement('h4');
            authorH4.textContent = data.authors ? data.authors[0].name : 'Autor desconhecido';
            authorDiv.appendChild(authorH4);
  
            // Editora do livro
            const publisherDiv = document.createElement('div');
            publisherDiv.classList.add('publisher');
            const publisherH5 = document.createElement('h5');
            publisherH5.textContent = data.publishers ? data.publishers[0] : 'Editora desconhecida';
            publisherDiv.appendChild(publisherH5);
  
            // Adiciona todos os elementos no livro
            bookDiv.appendChild(coverDiv);
            bookDiv.appendChild(descriptionDiv);
            bookDiv.appendChild(authorDiv);
            bookDiv.appendChild(publisherDiv);
  
            // Adiciona o livro no container
            bookContainer.appendChild(bookDiv);
          } else {
            alert("Livro não encontrado.");
          }
        })
        .catch(error => {
          console.error('Erro ao procurar o livro:', error);
          alert("Erro ao procurar o livro. Verifique o ISBN.");
        });
    }
  
    // Função chamada quando o botão de busca é clicado
    searchBtn.addEventListener('click', function() {
      const isbn = searchInput.value.trim();
      if (isbn) {
        searchBookByISBN(isbn);
      } else {
        alert('Por favor, insira um ISBN válido.');
      }
    });
  
    // Função chamada ao pressionar a tecla Enter na barra de pesquisa
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        const isbn = searchInput.value.trim();
        if (isbn) {
          searchBookByISBN(isbn);
        } else {
          alert('Por favor, insira um ISBN válido.');
        }
      }
    });
  });
  
// Função para buscar livros aleatórios e preenchê-los
function loadRandomBooks() {
    const bookContainer = document.getElementById('book-container');
  
    // Limpa o conteúdo atual do container de livros
    bookContainer.innerHTML = '';
  
    // Faz uma requisição para a API da Open Library para pegar livros aleatórios
    for (let i = 0; i < 6; i++) {
      fetch('https://openlibrary.org/subjects/fiction.json?limit=1&offset=' + Math.floor(Math.random() * 1000)) // Randomize a busca
        .then(response => response.json())
        .then(data => {
          const randomBook = data.works[0];
          
          // Cria a div do livro
          const bookDiv = document.createElement('div');
          bookDiv.classList.add('book' + (i + 1));
  
          // Capa do livro
          const coverDiv = document.createElement('div');
          coverDiv.classList.add('cover');
          const coverImg = document.createElement('img');
          coverImg.src = randomBook.cover_id ? `https://covers.openlibrary.org/b/id/${randomBook.cover_id}-L.jpg` : './Assets_Imgs/default-cover.jpg'; // Se não houver capa, usa uma imagem padrão
          coverDiv.appendChild(coverImg);
  
          // Título do livro
          const descriptionDiv = document.createElement('div');
          descriptionDiv.classList.add('description');
          const title = document.createElement('h3');
          title.textContent = randomBook.title;
          descriptionDiv.appendChild(title);
  
          // Autor do livro
          const authorDiv = document.createElement('div');
          authorDiv.classList.add('author');
          const author = document.createElement('h4');
          author.textContent = randomBook.authors ? randomBook.authors.map(author => author.name).join(', ') : 'Autor não encontrado';
          authorDiv.appendChild(author);
  
          // Editora do livro
          const publisherDiv = document.createElement('div');
          publisherDiv.classList.add('publisher');
          const publisher = document.createElement('h5');
          publisher.textContent = randomBook.publishers ? randomBook.publishers.join(', ') : 'Editora não encontrada';
          publisherDiv.appendChild(publisher);
  
          // Adiciona tudo ao livro
          bookDiv.appendChild(coverDiv);
          bookDiv.appendChild(descriptionDiv);
          bookDiv.appendChild(authorDiv);
          bookDiv.appendChild(publisherDiv);
  
          // Adiciona o livro ao container
          bookContainer.appendChild(bookDiv);
        })
        .catch(error => {
          console.error('Erro ao carregar livro aleatório:', error);
          alert("Erro ao carregar livros aleatórios.");
        });
    }
  }
  
  // Chama a função de carregar livros aleatórios quando a página for carregada
  window.addEventListener('load', loadRandomBooks);
  