const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
let respuesta="AGREGADO";

app.all('/', function (req, res) {
    const operador = require("./operador")
    let simboloOperador = req.body.operacion;
    let num1 = req.body.numero1;
    let num2 = req.body.numero2;
    if(simboloOperador == "+"){
        respuesta = {
            resultado: operador.sumar(num1, num2)
        }
    }else if(simboloOperador == "-"){
        respuesta = {
            resultado: operador.restar(num1, num2)
        }
    }else if(simboloOperador == "*"){
        respuesta = {
            resultado: operador.multiplicacion(num1, num2)
        }
    }else if(simboloOperador == '/'){
        respuesta = {
            resultado: operador.division(num1, num2)
        }
    }else if(simboloOperador == "^"){
        respuesta = {
            resultado: operador.pow(num1, num2)
        }
    }
    res.send(respuesta);
    res.end();
});

//levantamos el servidor
var server = app.listen(3002, function(){
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
