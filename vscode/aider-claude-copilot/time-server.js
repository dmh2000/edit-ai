const http = require("http");
const ntpClient = require("ntp-time");

// const ntpClient = new NTPClient('pool.ntp.org', 123, { timeout: 5000 });

const getTime = () => {
  const NTP = require("ntp-time").Client;
  const client = new NTP("a.st1.ntp.br", 123, { timeout: 5000 })
    .syncTime()
    .then((time) => console.log(time)) // time is the whole NTP packet
    .catch(console.log);
};

const server = http.createServer((req, res) => {
  if (req.url === "/time") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ); // Allow specific headers

    getTime();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ time: new Date().toISOString() }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
