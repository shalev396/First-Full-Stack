import fs from "fs";
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
//stack overflow for sync read/wright
const loadData = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const saveData = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
const util = { getRandomItem, loadData, saveData };
export default util;
