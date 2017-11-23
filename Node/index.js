const http = require('http');

const server = http.createServer(handler);

function handler(request, response){
    response.end("Hello world!");
}

server.listen(8080, function(){
    console.log("Server is running at http://localhost:8080");
});