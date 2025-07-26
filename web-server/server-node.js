const http = require('http')
const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.statusCode = 200
    res.setHeader('Content-Type', 'Text/plain')
    res.end("hello")
    }else if(req.url === '/about'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'Text/plain')
        res.end("this is about page")

    }else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'Text/plain')
        res.end("404 not found")
    }
}) 

server.listen(port, hostname, ()=>{
    console.log(`Server is listening at http://${hostname}:${port}`)
})

// And then since you'll also be sending some of the data back, we call this as response