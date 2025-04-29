// displayGames

export class UI {
  displayGames(games) {
    let box = "";
    games.forEach((game) => {
      box += `
  <div class="col-lg-3 col-md-6">
    <div class="card game">
    <input type="text" hidden value="${game.id}">

      <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}" />
      <div class="card-body">
        <div class="head d-flex justify-content-between mb-2">
          <h5 class="card-title">${game.title}</h5>
          <span class="badge bg-danger px-2 py-2">free</span>
        </div>
        <p class="card-text text-center">
         ${game.short_description.split(" ").slice(0, 8).join(" ")}
        </p>
      </div>
      <div class="card-footer d-flex justify-content-between ">
        <span class="badge bg-dark px-2 py-2">${game.genre}</span>
        <span class="badge bg-dark px-2 py-2">${game.platform}</span>
      </div>
    </div>
  </div>

`;
    });
    document.querySelector(".cards .row").innerHTML = box;
  }

  displayDetails(data) {
    const content = `
        <div class="col-md-4">
          <img src="${data.thumbnail}" class="w-100" alt="image details" />
        </div>
        <div class="col-md-8">
          <h3 class = "text-white">Title: ${data.title}</h3>
          <p class = "text-white">Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
          <p class = "text-white">Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
          <p class = "text-white">Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
          <p class="small text-white">${data.description}</p>
          <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
        </div>`;
    document.querySelector("#detailsContent .row").innerHTML = content;
  }
}
