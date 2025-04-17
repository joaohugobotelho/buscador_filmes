// Pega a referência do campo de input onde o usuário digita o nome do filme
const inputFilme = document.getElementById("filme");

// Pega o botão que irá disparar a busca
const botaoBuscar = document.getElementById("buscar");

// Pega a div onde o resultado será exibido
const resultado = document.getElementById("resultado");

// Pega a div de loading (mensagem de "Buscando filme...")
const loading = document.getElementById("loading");

// Adiciona um ouvinte de evento para quando o botão "Buscar" for clicado
botaoBuscar.addEventListener("click", async () => {
  // Captura o valor digitado no input, removendo espaços antes/depois
  const filme = inputFilme.value.trim();

  // Limpa o conteúdo anterior do resultado
  resultado.innerHTML = "";

  // Exibe a mensagem de "Buscando filme..."
  loading.style.display = "block";

  // Se o campo estiver vazio, mostra mensagem e para o carregamento
  if (filme === "") {
    loading.style.display = "none";
    resultado.innerHTML = "<p>Digite o nome de um filme.</p>";
    return; // Sai da função
  }

  // Define a chave de acesso da API
  const apiKey = "2b836933";

  // Monta a URL da requisição para a API, usando o título digitado
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
    filme
  )}&apikey=${apiKey}`;

  try {
    // Faz a requisição para a API e espera a resposta
    const response = await fetch(url);

    // Converte a resposta para JSON
    const data = await response.json();

    // Esconde o loading após receber os dados
    loading.style.display = "none";

    // Se a API retornar que o filme não foi encontrado
    if (data.Response === "False") {
      resultado.innerHTML = `<p>Filme não encontrado.</p>`;
    } else {
      // Se o filme foi encontrado, exibe as informações na tela
      resultado.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <p>Nota IMDB: ${data.imdbRating}</p>
        <img src="${data.Poster}" alt="Poster do Filme">
      `;
    }
  } catch (error) {
    // Caso ocorra algum erro na requisição (ex: sem internet)
    loading.style.display = "none";
    resultado.innerHTML = `<p>Erro ao buscar o filme.</p>`;
  }
});