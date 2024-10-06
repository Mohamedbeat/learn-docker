const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

function logger(req, res, next) {
  console.log("\x1b[31m", "This text is red!", "\x1b[0m");
  const start = Date.now(); // Record the start time
  const startTime = new Date().toLocaleString();
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate duration of the request
    console.log(
      `\x1b[32m [${startTime}] \x1b[0m :=> ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });
  next(); // Proceed to the next middleware or route handler
}

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbport = process.env.MONGO_INITDB_PORT;
const DB_URI = `mongodb://${username}:${password}@mongo-db:${dbport}`;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("connecting to db");
  })
  .catch((err) => {
    console.log("error connecting to db:", err);
  });

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser());

app.use("/", logger);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/name/:id", (req, res) => {
  res.send("hello stalker: " + req.params.id + " happy to see you bruh <3");
});

app.use("*", (req, res) => {
  res.send("Not found");
});

app.listen(port, () => {
  console.log("app listening on port :", port);
});
