// TODO: add Zod
import controller from "./controller.js";
import model from "./model.js";

// Elements
const tableJokes = document.getElementById("tablejokes");
const loginButton = document.getElementById("loginButton");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const JokeButton = document.getElementById("JokeButton");
const setupInput = document.getElementById("setupInput");
const punchlineInput = document.getElementById("punchlineInput");
const jokeForm = document.getElementById("jokeForm");

let jokes = [];
let user;
let joke;
//login/signup
loginButton.addEventListener("click", async () => {
  let loginAttempt = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  user = await controller.logIn(loginAttempt);

  if (user === undefined) {
    user = await model.createUser(loginAttempt);
  }
  jokeForm.style.display = "flex";
});
async function getJokes() {
  //jokes array
  jokes = await model.getAllJokes();

  renderJokesTable(jokes);
}
getJokes();

function renderJokesTable(jokesToRender) {
  tableJokes.innerHTML = `
    <tr>
      <th class="id">ID</th>
      <th class="setup">Setup</th>
      <th class="punchline">Punchline</th>
      <th class="createdAt">Created At</th>
      <th class="createdBy">Created By</th>
    </tr>
  `;

  jokesToRender.forEach((joke) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${joke._id}</td>
      <td>${joke.setup}</td>
      <td>${joke.punchline}</td>
      <td>${joke.createdAt}</td>
      <td>${joke.createdBy}</td>
    `;
    tableJokes.appendChild(row);
  });
}
//add joke
JokeButton.addEventListener("click", async function () {
  joke = {
    setup: setupInput.value,
    punchline: punchlineInput.value,
    createdBy: user._id,
  };
  joke = await model.addJoke(joke);
  jokes.push(joke);
  renderJokesTable(jokes);
});
