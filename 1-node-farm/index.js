const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modeules/replaceTemplate");

// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }
  // PRODUCT
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // ERROR
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "404 status code",
    });
    res.end("<h1>This is a 404 status code. ERROR!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

/*----------------------------------------------------------*/
// const hello = "hello world";
// console.log(hello);

// Blocking, Synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()} `;

// console.log(textOut);

// fs.writeFileSync("./txt/final.txt", textOut);
// fs.writeFileSync(
//   "./txt/final.txt",
//   "This is the new text added to it so that we can enjoy it."
// );

// Non-Blocking Asynchronous way
// fs.readFile("./txt/starte.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error Ahead!!!!!!!!!");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });

// console.log("will read file!");
