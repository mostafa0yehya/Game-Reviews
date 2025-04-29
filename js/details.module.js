"use strict";

export class Details {
  constructor() {
    document.querySelector(".btn-close").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector("#detailsContent").classList.add("d-none");
    });
  }
  async getGame(id) {
    document.querySelector(".games .loading").classList.remove("d-none");
    try {
      let url = `https:free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
      let response = await fetch(url, {
        headers: {
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            " da1194aefamsh3b9fe767e162849p16ed93jsnbb890e47200a",
        },
      });
      if (!response.ok) throw new Error("failed to get data");
      const game = await response.json();
      document.querySelector(".games .loading").classList.add("d-none");

      return game;
    } catch (error) {
      console.error("error:", error);
      return {};
    }
  }
}
