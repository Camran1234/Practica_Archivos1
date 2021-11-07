const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
let respuesta="AGREGADO";

function sendOperation(req){
  axios.post('localhost:3002/', {
    numero1: req.body.numero1,
    numero2: req.body.numero2,
    operacion: req.body.operacion
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
}

app.all('/', function (req, res) {
    console.log('Peticion recibida: '+req.body.peticion);
    if(req.body.peticion == 'operacion'){
        sendOperation(req);
    }else if(req.body.peticion == 'historial'){
        
    }
    res.send(respuesta);
    res.end();
  });

//levantamos el servidor
var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Starting server at ", host, port);
})


/*app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/', (req, res) => {
  console.log(req.body.todo)
}).listen(8000);

console.log("Creating server in http://localhost:8000/");*/
