const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000

const server = http.createServer((req,res) => {
    // req.url === '/' => 'index.html'
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url)

    console.log(filePath)

    const extName = String(path.extname(filePath)).toLowerCase()

    const mimeTypes= {
        '.html': 'text.html',
        '.css': 'text/css',
        '.png': 'image/png'

    }

    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (err, content)=> {
        if(err){
            if(err.code === "ENOENT"){
                res.writeHead
                (404, {"content-type": 'text/html'})
                res.end('404: FIle not found bro!')
            }
        }else{
            res.writeHead(200, {'content-Type': contentType})
            res.end(content, 'utf-8')
        }
    })
})

/*
| Expression                                 | Explanation                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| `__dirname`                                | Gives you the current folder where the script is running.                        |
| `req.url`                                  | The path part of the URL the client requested, e.g., `/index.html`, `/about.css` |
| `req.url === '/' ? "index.html" : req.url` | If URL is `/`, default to `"index.html"`; else use the actual URL.               |
| `path.join(...)`                           | Joins the directory name with the file name to make a complete path.             |

path.extname(filePath)	Gets the file extension from the path, e.g., .html, .css, .js ----Gets the file extension to later serve the correct content type

*/

server.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
})