document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    performSearch(query);
  }

  function performSearch(query) {
    const pages = ["index.html", "Игры.html", "Новости.html"];
    const results = [];
    query = query.toLowerCase();

    pages.forEach(page => {
      fetch(page)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const text = doc.body.textContent.toLowerCase();

          if (text.includes(query)) {
            results.push({ page, snippet: getSnippet(text, query) });
          }

          if (page === pages[pages.length - 1]) {
            displayResults(results, query);
          }
        })
        .catch(error => console.error("Ошибка загрузки страницы:", error));
    });
  }

  function getSnippet(text, query) {
    const index = text.indexOf(query);
    const start = Math.max(index - 50, 0);
    const end = Math.min(index + 50, text.length);
    return text.substring(start, end) + "...";
  }

  function displayResults(results, query) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>Ничего не найдено.</p>";
    } else {
      results.forEach(result => {
        const highlightedSnippet = result.snippet.replace(new RegExp(query, 'gi'), (match) => `<mark>${match}</mark>`);
        const pageTitle = result.page === "index.html" ? "Главная страница" : result.page.replace('.html', '');
        const resultElement = document.createElement("div");
        resultElement.classList.add("result");
        resultElement.innerHTML = `
            <h3><a href="${result.page}">${pageTitle}</a></h3>
            <p>${highlightedSnippet}</p>
        `;
        resultsContainer.appendChild(resultElement);
      });
    }
  }
});
