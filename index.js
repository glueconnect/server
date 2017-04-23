const _ = require('lodash')
const app = require('./app');
const http = require('http')  

const PORT = parseInt(process.env.HTTP_PORT, 10) || 8000;


const server = http.createServer((req, res) => {  
 const request = ({
        path    : req.url,
        method  : req.method,
        headers : req.headers,
        body    : req
      });

      app.processRequest(request).then((response) => {
        res.statusCode = response.statusCode;
        _.each(response.headers, (value, key) => {
          res.setHeader(key, value);
        });

        response.body.pipe(res);
    }).done()
});

server.listen(PORT, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${PORT}`)
})