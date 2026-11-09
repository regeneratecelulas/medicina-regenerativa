document.addEventListener("DOMContentLoaded", function () {
  // Lógica para blog.html (página principal del blog)
  if (
    document.querySelector(".latest-articles") &&
    document.querySelector(".popular-articles")
  ) {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        // Convertir a array y ordenar por fecha descendente
        const articlesArr = Object.entries(data)
          .map(([id, art]) => ({ id, ...art }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // "LO ÚLTIMO": los 3 artículos más recientes
        const latest = articlesArr.slice(0, 3);
        // "MÁS CONSULTADOS": los 3 artículos siguientes
        const popular = articlesArr.slice(3, 6);

        // Renderizar sección "LO ÚLTIMO"
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
                <a href="articleview.html?articulo=${art.slug}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }

        // Renderizar sección "MÁS CONSULTADOS"
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
                <a href="articleview.html?articulo=${art.slug}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }

        // Renderizar sección "TODOS LOS ARTÍCULOS"
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
                <a href="articleview.html?articulo=${art.slug}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }
      })
      .catch((error) =>
        console.error("Error al cargar los artículos para el blog:", error)
      );
  }

  // Lógica para articleview.html (vista detallada del artículo)
  if (document.querySelector(".article-content")) {
    const params = new URLSearchParams(window.location.search);
    const articleSlug = params.get("articulo"); // Leemos el slug de la URL

    if (!articleSlug) {
      document.querySelector(".article-content").innerHTML =
        "<p>Artículo no encontrado.</p>";
      return;
    }

    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        // Buscamos el artículo cuyo slug coincida exactamente con el de la URL
        const entry = Object.entries(data).find(
          ([id, art]) => art.slug === articleSlug
        );

        if (!entry) {
          document.querySelector(".article-content").innerHTML =
            "<p>Artículo no encontrado.</p>";
          return;
        }

        const [id, article] = entry;

        // Poblar el banner principal (Hero)
        const articleHero = document.querySelector(".article-hero");
        const articleHeroTitle = document.querySelector(".article-hero-title");
        if (articleHero && articleHeroTitle) {
          articleHero.style.backgroundImage = `url('${article.image2}')`;
          articleHeroTitle.textContent = article.title;
        }

        document.title = `${article.title} | Regenérate Blog`;

        const metaDescriptionTag = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescriptionTag) {
          metaDescriptionTag.setAttribute("content", article.meta);
        }

        // Poblar el contenido del artículo
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

        // Poblar "Artículos Similares" (excluyendo el artículo actual)
        const articlesArr = Object.entries(data)
          .map(([artId, art]) => ({ id: artId, ...art }))
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const similarArticlesGrid = document.querySelector(
          "section:last-of-type .articles-grid"
        );
        if (similarArticlesGrid) {
          const recommendedArticles = articlesArr
            .filter((art) => art.slug !== articleSlug)
            .slice(0, 3);

          similarArticlesGrid.innerHTML = recommendedArticles
            .map(
              (art) => `
            <article>
              <img src="${art.image}" alt="${art.imageAlt}" />
              <div class="article-texts">
                <h3>${art.title}</h3>
                <a href="articleview.html?articulo=${art.slug}">Leer más</a>
              </div>
            </article>
          `
            )
            .join("");
        }
      })
      .catch((error) =>
        console.error("Error al cargar los detalles del artículo:", error)
      );
  }
});