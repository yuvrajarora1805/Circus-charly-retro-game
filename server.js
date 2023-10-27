const http = require("http");
const fs = require("fs");
const path = require("path");
const scores = [];
const PORT = process.env.PORT || 8080;

const mimeLookup = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
  ".html": "text/html",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/scores") {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify(scores.sort(score => score.score)));
    } else if (req.url === "/highscore") {
      if (scores.length === 0) {
        res.writeHead(202, {
          "Access-Control-Allow-Origin": "*"
        });
        res.end();
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });
        res.end(JSON.stringify(scores.sort(score => score.score)[0]));
      }
    } else {
      let fileurl;
      if (req.url === "/") {
        fileurl = "index.html";
      } else {
        fileurl = req.url;
      }

      let filepath = path.resolve("./" + fileurl);

      fs.exists(filepath, exists => {
        if (exists) {
          let fileExt = path.extname(filepath);
          let mimeType = mimeLookup[fileExt];

          res.writeHead(200, { "Content-Type": mimeType });
          fs.createReadStream(filepath).pipe(res);
        } else {
          res.writeHead(404);
          res.end();
        }
      });
    }
  } else if (req.method === "PUT" && req.url === "/") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      scores.push(data);
      res.end("ok");
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
