//Jokes
const validateJoke = (req, res, next) => {
  console.log(req.method);
  console.log(req.body.setup);

  if (req.method === "POST")
    if (!req.body.setup || !req.body.punchline) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  if (req.method === "PATCH") {
    if (!req.params.id || (!req.body.setup && !req.body.punchline)) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  if (req.method === "DELETE") {
    if (!req.params.id) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  next();
};
//Users
const validateUser = (req, res, next) => {
  console.log(req.method);
  if (req.method === "POST")
    if (!req.body.email && !req.body.password) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  if (req.method === "PATCH") {
    if (
      !req.params.id ||
      (!req.body.name && !req.body.email && !req.body.password)
    ) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  if (req.method === "DELETE") {
    if (!req.params.id) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  next();
};
//Products
const validateProducts = (req, res, next) => {
  console.log(req.method);
  if (req.method === "POST")
    if (!req.body.name || !req.body.price || !req.body.inStock) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  if (req.method === "PATCH") {
    if (
      !req.params.id ||
      (!req.body.name && !req.body.price && !req.body.inStock)
    ) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  if (req.method === "DELETE") {
    if (!req.params.id) {
      return res.status(400).send({
        message: "Missing Filed",
      });
    }
  }
  next();
};

export { validateJoke, validateUser, validateProducts };
