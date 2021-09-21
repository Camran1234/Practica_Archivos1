var express = require('express');
var app = express();
var path = require('path');

//agregar rutas globales
app.use(express.static('public'));
app.use('/css', express.static( __dirname + 'public/css'));
app.use('/jss', express.static( __dirname + 'public/jss'));
//setting views
app.set('views', './views');
app.set('view engine', 'ejs');

//agregar los url a otras paginas
app.get('/',(req, res) => {
    res.status(201).render("index");
});

app.get('/app', (req, res) => {
    res.status(201).render('about');
 });

/*
    function(req, res){

    }
*/

//agregar el 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join( __dirname, '../views/404Error.html'))
});

//levantamos el servidor
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Starting server at ", host, port);
})


/*
Para generar servidor http simples
module.exports = function(){
    this.startServer = function(){
        console.log("Starting server");
        const http = require('http');
        const requestListener = function (req, res) {
        res.writeHead(200);
        res.end('Hello, World!');
        }
        
        const server = http.createServer(requestListener);
        server.listen(8080);
    }
}
*/ 