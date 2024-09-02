const http = require('http');
const NTPClient = require('ntp-time').NTPClient;

const ntpClient = new NTPClient('pool.ntp.org', 123, { timeout: 5000 });

const server = http.createServer((req, res) => {
  if (req.url === '/time') {
    ntpClient.getNetworkTime()
      .then(date => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ time: date.toISOString() }));
      })
      .catch(error => {
        console.error("Error fetching time:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error fetching time' }));
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
