const { default: axios } = require('axios');
var express = require('express');
var app = express();
var path = require('path');
const $ = require('jquery');
const { parse } = require('querystring');
const { rejects } = require('assert');
//agregar rutas globales
app.use(express.static('public'));
app.use('/css', express.static( __dirname + 'public/css'));
app.use('/js', express.static( __dirname + 'public/js'));
//setting views
app.set('views', './views');
app.set('view engine', 'ejs');

//agregar los url a otras paginas
app.get('/',(req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.status(201).sendFile(path.join(__dirname, '../views/about.html'));
});

app.get('/login', (req, res) => {
    res.status(202).sendFile(path.join(__dirname, '../views/login.html'))
});

app.get('/register', (req, res) => {
    res.status(203).sendFile(path.join(__dirname, '../views/register.html'))
});

app.get('/example', (req, res) => {
    console.log("SI PADRE")
    res.send(JSON.stringify({respuesta:"9"}));
    res.end();
})

function collectRequestData(request, callback){
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';    
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function sentRegister(usuario, password){
    return new Promise((resolve, reject) => {
        axios.post('localhost:5000/api/register', {
            usuario: usuario,
            password: password
        }).then((response) => {
            console.log("Response: "+JSON.parse(response));
            resolve(true)
        }, (error) => {
            console.log("Error");
            reject(false);
        });
    })
}

app.post('/register_confirmation', (req, res) => {
    let flag = false;
    let usuario;
    let password;
    let password_confirm;
    collectRequestData(req, result => {
        usuario = result.usuario;
        password = result.password;
        password_confirm = result.password_confirm;
    });
    console.log(usuario);
    console.log(password);
    console.log(password_confirm);
    if (password == password_confirm){
        console.log("Checking")
        sentRegister(usuario, password)
        .then((data) => {
            console.log("THEN DATA");
            console.log(data);
            flag = data;
        })
        .catch((error) => {
            console.log("CATCH");
            console.log(error);
            flag=error;
        });
        console.log("Promise exit");
    }else{
        flag = false;        
    }

    if(flag){
        res.status(203).sendFile(path.join(__dirname, '../views/register_confirmation.html'));
    }else{
        res.status(203).sendFile(path.join(__dirname, '../views/register_fail.html'));
    }
    
});

app.post('/login_confirmation', (req, res) => {  
    collectRequestData(req, result => {
        let usuario = result.usuario.toString();
        let password= result.password.toString();
        axios.post('localhost:5000/api/login', {
            usuario: usuario,
            password: password
        }).then((response) => {
            response = JSON.parse(response);
            console.log(response);
            if(response.respuesta){
                res.render('index');
            }else{
                res.status(203).sendFile(path.join(__dirname, '../views/login_deny.html'))
            }
        }, (error) => {
            console.log(error);
        });
    });
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