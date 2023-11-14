const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");

const server = express();

function customMorgan(req, res, next) {
  console.log(`it was a ${req.method} request`);
  next();
}

server.use(express.json());
server.use(morgan("dev"));
server.use(customMorgan);

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Weird API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use("*", (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
