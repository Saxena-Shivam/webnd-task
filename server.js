const http = require("http");
const fs = require("fs");
const path = require("path");


const PORT = 8081;


const server = http.createServer((req, res) => {
  
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html"; 
  }

  
  const extname = String(path.extname(filePath)).toLowerCase();

  
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm"
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        
        fs.readFile("./404.html", (err, errorContent) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(errorContent || "404 Not Found", "utf-8");
        });
      } else {
        
        res.writeHead(500);
        res.end(`Sorry, there was an error: ${error.code}`, "utf-8");
      }
    } else {
      
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  