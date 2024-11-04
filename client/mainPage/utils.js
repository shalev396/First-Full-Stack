//here is utility file
//any universal useful function
function makeId() {
  let id = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function findIndex(tempCart, product) {
  for (let i = 0; i < tempCart.length; i++)
    if (tempCart[i].id === product.id) return i;

  return -1;
}
//get random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//isPrime
function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}
export const utils = {
  makeId,
  getFromStorage,
  saveToStorage,
  findIndex,
  getRandomInt,
  isPrime,
};
