// TODO: add Zod

// Elements
const tableJokes = document.getElementById("tablejokes");
const loginButton = document.getElementById("loginButton");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const JokeButton = document.getElementById("JokeButton");
const setupInput = document.getElementById("setupInput");
const punchlineInput = document.getElementById("punchlineInput");

let jokes = [];
let users = [];
let user;
let joke;

loginButton.addEventListener("click", () => {
  axios
    .get("http://localhost:3006/api/users")
    .then(function (response) {
      let login = false;
      users = response.data;
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].name === nameInput.value &&
          users[i].email === emailInput.value &&
          users[i].password === passwordInput.value
        ) {
          login = true;
          user = users[i];
          console.log(user);
        }
      }
      if (!login) {
        axios
          .post("http://localhost:3006/api/users", {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          })
          .then(function (response) {
            console.log(response.data);
            user = response.data;
          });
      }
      ///unhide
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
});
axios
  .get("http://localhost:3006/api/jokes")
  .then(function (response) {
    jokes = response.data;
    renderJokesTable(jokes);
    console.log(response.data);
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
  });

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
function addJoke() {
  axios
    .post("http://localhost:3006/api/jokes", {
      setup: setupInput.value,
      punchline: punchlineInput.value,
    })
    .then(function (response) {
      console.log(response.data);
      joke = response.data;
    });
}
