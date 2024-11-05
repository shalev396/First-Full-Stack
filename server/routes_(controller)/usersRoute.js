import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
//util js file
import util from "../utils/util.js";
//middleware
import { validateUser } from "../middleware/validator.js";
//db
import User from "../db_(model)/mongoDB/user.js";
const router = express.Router();
// router.use(validateUser);
router.get("/", validateUser, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", validateUser, getUser, (req, res) => {
  res.json(res.user);
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Joke not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

router.post("/", validateUser, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //TODO: encryption
    user.password = await encryption(user.password);
    console.log(user);

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", validateUser, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", validateUser, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted Joke" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/login", validateUser, async (req, res) => {
  try {
    console.log("login");

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    //TODO: encryption
    let login = undefined;
    const users = await User.find();
    console.log(users);

    for (let i = 0; i < users.length; i++) {
      if (
        (await compareHash(user.password, users[i].password)) &&
        user.email === users[i].email
      ) {
        console.log(await compareHash(user.password, users[i].password));

        login = users[i];
      }
    }
    if (login) {
      console.log(login);
      res.status(200).json(login);
    } else res.status(401).json({ message: "login failed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//TODO:encryption
async function encryption(str) {
  try {
    const hash = await bcrypt.hash(str + process.env.ENCRYPTION_KEY, 10);
    return hash;
  } catch (err) {
    throw new Error("Error in encryption: " + err.message);
  }
}
async function compareHash(str, hashedPassword) {
  return await bcrypt.compare(str + process.env.ENCRYPTION_KEY, hashedPassword);
}
export default router;
