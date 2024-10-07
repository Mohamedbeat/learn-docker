const express = require("express");
const bodyparser = require("body-parser");
const os = require("os");

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

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser());

// app.use("/", logger);

app.get("/admin", (req, res) => {
  const hostname = os.hostname;
  res.send(`admin server: ${hostname}`);
});

// app.get("/name/:id", (req, res) => {
//   res.send("hello stalker: " + req.params.id + " happy to see you bruh <3");
// });

app.use("/admin/*", (req, res) => {
  res.send("not found admin");
});

app.listen(port, () => {
  console.log("app listening on port :", port);
});
