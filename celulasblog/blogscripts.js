document.addEventListener("DOMContentLoaded", function () {
  // Logic for blog.html (main blog page)
  if (
    document.querySelector(".latest-articles") &&
    document.querySelector(".popular-articles")
  ) {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        // Convert to array and sort by date descending
        const articlesArr = Object.entries(data)
          .map(([id, art]) => ({ id, ...art }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // "LO ÚLTIMO": the 3 most recent articles
        const latest = articlesArr.slice(0, 3);
        // "MÁS CONSULTADOS": the 3 articles before the latest 3 (i.e., articles 4, 5, 6 when sorted by date)
        const popular = articlesArr.slice(3, 6);

        // Render "LO ÚLTIMO" section
        const latestGrid = document.querySelector(
          ".latest-articles .articles-grid"
        );
        if (latestGrid) {
          latestGrid.innerHTML = latest
            .map(
              (art) => `
            <article>
              <img src="${art.image}" alt="${art.imageAlt}" />
              <div class="article-texts">
                <h3>${art.title}</h3>
                <p>${art.meta}</p>
                <span class="article-date">${art.fecha}</span>
                <a href="articleview.html?id=${art.id}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }

        // Render "MÁS CONSULTADOS" section
        const popularGrid = document.querySelector(
          ".popular-articles .articles-grid"
        );
        if (popularGrid) {
          popularGrid.innerHTML = popular
            .map(
              (art) => `
            <article>
              <img src="${art.image}" alt="${art.imageAlt}" />
              <div class="article-texts">
                <h3>${art.title}</h3>
                <p>${art.meta}</p>
                <span class="article-date">${art.fecha}</span>
                <a href="articleview.html?id=${art.id}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }
        // Render "TODOS LOS ARTÍCULOS" section
        const allArticlesGrid = document.querySelector(
          "main section:last-of-type .articles-grid"
        );
        if (allArticlesGrid) {
          allArticlesGrid.innerHTML = articlesArr
            .map(
              (art) => `
            <article>
              <img src="${art.image}" alt="${art.imageAlt}" />
              <div class="article-texts">
                <h3>${art.title}</h3>
                <a href="articleview.html?id=${art.id}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }
      })
      .catch((error) =>
        console.error("Error fetching articles for blog page:", error)
      );
  }

  // Logic for articleview.html
  if (document.querySelector(".article-content")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      document.querySelector(".article-content").innerHTML =
        "<p>Artículo no encontrado.</p>";
      return;
    }

    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        const article = data[id];

        if (!article) {
          document.querySelector(".article-content").innerHTML =
            "<p>Artículo no encontrado.</p>";
          return;
        }

        // Populate the new hero banner using image2
        const articleHero = document.querySelector(".article-hero");
        const articleHeroTitle = document.querySelector(".article-hero-title");
        if (articleHero && articleHeroTitle) {
          // Only set the dynamic background image here
          articleHero.style.backgroundImage = `url('${article.image2}')`;

          // Set the title text
          articleHeroTitle.textContent = article.title;
        }

        const articleContentDiv = document.querySelector(".article-content");
        if (articleContentDiv) {
          articleContentDiv.innerHTML = `
            <p>${article.introduction}</p>
            ${article.questions
              .map(
                (qanda) => `
                <details>
                  <summary>${qanda.q}</summary>
                  <p>${qanda.a}</p>
                </details>
              `
              )
              .join("")}
            <div class="article-image">
                <img src="${article.image}" alt="${article.imageAlt}">
            </div>
            <p class="bordered-text">${article.conclusion}</p>
            <span><strong>Fuente:</strong> <a href="${
              article.fuente
            }" target="_blank" rel="noopener noreferrer">${
            article.fuente
          }</a></span>
            <span class="article-date">${article.fecha}</span>
          `;
        }

        // Populate "Artículos Similares" (latest 3 articles, excluding the current one)
        const articlesArr = Object.entries(data)
          .map(([artId, art]) => ({ id: artId, ...art }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const similarArticlesGrid = document.querySelector(
          "section:last-of-type .articles-grid"
        );
        if (similarArticlesGrid) {
          // Filter out the current article and take the first 3
          const recommendedArticles = articlesArr
            .filter((art) => art.id !== id)
            .slice(0, 3);

          similarArticlesGrid.innerHTML = recommendedArticles
            .map(
              (art) => `
            <article>
              <img src="${art.image}" alt="${art.imageAlt}" />
              <div class="article-texts">
                <h3>${art.title}</h3>
                <a href="articleview.html?id=${art.id}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }
      })
      .catch((error) =>
        console.error("Error fetching article details:", error)
      );
  }
});
