document.querySelector(".btn-primary").addEventListener("click", () => loadImages("hamsters"));
document.querySelector(".btn-secondary").addEventListener("click", () => loadImages("tigers"));

function loadImages(query) {
  const API_KEY = "4PyLSwqUOM1IZ3vjlveQwmzID6zvBxPOZMIBF4zxFblcI9MsrDQ29FwX";
  const URL = `https://api.pexels.com/v1/search?query=${query}&per_page=9`;

  fetch(URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const images = data.photos;
      const container = document.querySelector(".album .container .row");
      container.innerHTML = "";

      images.forEach((image) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${image.src.medium}" class="bd-placeholder-img card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${image.photographer}</h5>
              <p class="card-text">Photo by ${image.photographer} on Pexels.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                </div>
                <small class="text-muted">${image.width}x${image.height}</small>
              </div>
            </div>
          </div>
        `;
        container.appendChild(card);

        const hideButton = card.querySelector(".hide-btn");
        hideButton.addEventListener("click", () => {
          card.style.display = "none";
        });
      });
    })
    .catch((error) => console.error("Errore nel recupero delle immagini:", error));
}

document.querySelector("#searchInput").addEventListener("input", function () {
  const query = this.value;
  loadImages(query);
});
