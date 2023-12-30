const eventEmitter = require("events");

const myEmitter = new eventEmitter();

class Scales extends eventEmitter {
  constructor() {
    super();
  }
}

myEmitter.on("newSale", () => {
  console.log("there was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

////////////////////////////

const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("request received");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", (req, res) => {
  console.log("waiting for request...");
});
