"use strict";
import { UI } from "./ui.module.js";
import { Details } from "./details.module.js";
const ui = new UI();
const details = new Details();
export class Games {
  constructor() {
    this.games = [];

    //     let genre = e.target.textContent.trim();

    //     games
    //       .getGames()
    //       .then(() => {
    //         let filteredGames = games.filterByGenre(genre);
    //         ui.displayGames(filteredGames);
    //       })
    //       .catch((error) => {
    //         console.error("error:", error);
    //       });
    //   });
    // });
  }
  async init() {
    document.querySelector(".games .loading").classList.remove("d-none");
    const data = await this.getGames(
      "https://free-to-play-games-database.p.rapidapi.com/api/games"
    );
    document.querySelector(".games .loading").classList.add("d-none");

    ui.displayGames(data);
    this.attachGenreListeners();
    this.startEvent();
  }

  attachGenreListeners() {
    document.querySelectorAll(".nav-item a").forEach((link) => {
      link.addEventListener("click", async (e) => {
        let genre = e.target.textContent.trim();
        document.querySelector(".nav-link.active")?.classList.remove("active");

        e.target.classList.add("active");
        document.querySelector(".games .loading").classList.remove("d-none");

        await this.getGames(
          "https://free-to-play-games-database.p.rapidapi.com/api/games"
        );
        document.querySelector(".games .loading").classList.add("d-none");

        let filteredGames = this.filterByGenre(genre);
        ui.displayGames(filteredGames);
        this.startEvent();
      });
    });
  }

  async getGames(url) {
    try {
      let response = await fetch(url, {
        headers: {
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            " da1194aefamsh3b9fe767e162849p16ed93jsnbb890e47200a",
        },
      });
      if (!response.ok) throw new Error("failed to get data");
      this.games = await response.json();

      return this.games;
    } catch (error) {
      console.error("error:", error);
      return [];
    }
  }
  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const gameId = item.querySelector("input[type='text']").value;
        details
          .getGame(gameId)
          .then((response) => {
            document.querySelector(".games").classList.add("d-none");
            document
              .querySelector("#detailsContent")
              .classList.remove("d-none");
            document;

            ui.displayDetails(response);
          })
          .catch((err) => console.error(err));
      });
    });
  }
  filterByGenre(genre) {
    return this.games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }
}
let games = new Games();
games.init();
