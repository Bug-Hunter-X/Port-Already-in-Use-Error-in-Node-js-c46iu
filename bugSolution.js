const http = require('http');
const { findAvailablePort } = require('./port-finder'); //Helper function to find an open port

async function startServer() {
  const port = await findAvailablePort(8080); //attempt to use port 8080

  const requestListener = (request, response) => {
    response.writeHead(200);
    response.end('Hello, World!');
  };

  const server = http.createServer(requestListener);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use, trying another port`);
      startServer(); //try again to find an available port
    } else {
      console.error(`Server error: ${err.message}`);
    }
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();

//port-finder.js
async function findAvailablePort(initialPort) {
  return new Promise((resolve, reject) => {
    let port = initialPort;
    const findPort = async () => {
      try {
        const server = http.createServer(() => {});
        server.listen(port, () => {
          server.close();
          resolve(port);
        });
        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            port++;
            findPort();
          } else {
            reject(err);
          }
        });
      } catch (error) {
        reject(error);
      }
    };
    findPort();
  });
}
module.exports = {findAvailablePort};