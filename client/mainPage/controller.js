import model from "./model.js";
async function logIn(user) {
  const users = await model.getAllUser();
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].name === user.name &&
      users[i].email === user.email &&
      users[i].password === user.password
    ) {
      return users[i];
    }
  }
  return undefined;
}

const controller = { logIn };
export default controller;
