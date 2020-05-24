const http = require('http');

const server = http.createServer((req,res)=> {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1>hello world</h1>");
        res.write("<h2>From Node JS</h2>");
        res.write('<form action="/msg" method="post"><input name="msg" type="text"><button type="submit">Send</button></form>');
        res.end();
    }

    if(url === '/msg' && req.method === 'POST') {
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
        })
        res.statusCode = 302 // redirection
        res.setHeader('Location','/');

        return res.end();

    }


});

server.listen(3000);