async function getAllUser() {
  try {
    const response = await axios.get("http://localhost:3006/api/users");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function createUser(user) {
  try {
    const response = await axios.post("http://localhost:3006/api/users", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
async function getAllJokes() {
  try {
    const response = await axios.get("http://localhost:3006/api/jokes");

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function addJoke(joke) {
  try {
    const response = await axios.post("http://localhost:3006/api/jokes", {
      setup: joke.setup,
      punchline: joke.punchline, // Corrected punchline assignment
      createdBy: joke.createdBy,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding joke:", error);
  }
}

await getAllJokes();
const model = { getAllUser, createUser, getAllJokes, addJoke };
export default model;
