let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');

http.createServer((request, response)=>{

    /*function condicional (content) {
        response.write(content); 
        response.end();
    }*/

    //response.setHeader("Content-Type", "text/html; charset=utf-8");
    if (request.method === "GET") {
        switch (request.url) {
            case "/":
                readFile("/index.html", response);
                break;
            case "/nosotros":
                readFile("/about.html", response);
                break;
            case "/proyectos":
                readFile("/projects.html", response);
                break;
            case "/contacto":
                readFile("/contact.html", response);
                break;
            case "/favicon.ico":
                response.setHeader("Content-Type", "image/x-icon");
                readFile("/favicon.ico", response);
                break;
            default:
                //response.statusCode = 404;
                readFile(request.url, response);
                break;
        }
    } else if (request.method === "POST") {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
            console.log(chunk);
        })
        request.on('end', () => {
            const usuario = data.toString();
            console.log("fin del stream");
            fs.appendFile("usuarios.txt", usuario + "\n", (error) => {
                if (error) {
                    console.log(error);
                }
                response.end("se ha escrito en el usuario.txt");
            });
        })
        request.on('error', error => {
            console.log(error);
        })
    }
    

    /*if (request.url === "/") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./index.html", (error, content) => {
            if (!error) {
                condicional(content);
            }
        })        
    } else if (request.url === "/nosotros") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./about.html", (error, content) => {
            if (!error) {
                condicional(content);
            }
        })
    } else if (request.url === "/proyectos") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./projects.html", (error, content) => {
            if (!error) {
                condicional(content);
            }
        })
    } else if (request.url === "/contacto") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./contact.html", (error, content) => {
            if (!error) {
                condicional(content);
            }
        })
    } else if (request.url === "/favicon.ico") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./favicon.ico", (error, content) => {
            if (!error) {
                condicional(content);
            }
        })
    } else {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile("./404.html", (error, content) => {            
            condicional(content);            
        })
    }*/    
}).listen(8080);

const readFile = (url, response) => {
    let urlF = __dirname + url;
    fs.readFile( urlF, (error, content) => {
        if (!error) {
            //setContentType(path.extname(urlF), response);
            response.setHeader("Content-Type", mime.getType(urlF));
            response.end(content);
        } else {
            response.writeHead(404); 
            response.end("<h1>404</h1>");
        }
    })
}

/*const setContentType = (ext, response) => {
    if (ext === ".css") {
        response.setHeader("Content-Type", "text/css");
    } else if (ext === ".html") {
        response.setHeader("Content-Type", "text/html");
    }
}*/