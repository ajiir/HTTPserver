const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;

  res.setHeader("content-type", "text/html");

  if (url === "/") {
    fs.readFile("./src/index.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write("<h1>Error</h1");
        res.end();
      } else {
        res.statusCode = 200;
        res.write(data);
        res.end();
      }
    });
  } else if (url === "/login") {
    // Login form HTML butsaana
    fs.readFile("./src/login.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else if (url === "/logincheck" && method === "POST") {
    // Login hiisnii daraa usreh heseg
    // DATA ==> CHUNK1 ==> CHUNK2 ==> CHUNK3
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const password = parseBody.split("=")[2];
      if (password === "@jiiR2247") {
        //   Login amjilttai
        res.statusCode = 302;
        res.setHeader("Location", "/home");
      } else {
        //   Login amjiltgui
        res.statusCode = 404;
        res.setHeader("Location", "/error");
      }
      res.end();
      //   fs.writeFileSync("logininfo.txt", parseBody);
      //   res.write("Za huleej avalaa");
      //   res.end();
    });
  } else if (url === "/home") {
    fs.readFile("./src/home.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else if (url === "/error") {
    fs.readFile("./src/error.html", "utf8", (error, data) => {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.write("<h1>404 NOT FOUND</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("http сэрвэр 5000 порт дээр аслаа");
});
