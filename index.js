let http = require('http');
let fs = require('fs');

http.createServer((request, response)=>{

    function condicional (content) {
        response.write(content); 
        response.end();
    }

    if (request.url === "/") {
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
    }    
}).listen(8080);