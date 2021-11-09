const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const axios = require('axios').default;
const Redis = require('../models/Redis');
const { nextTick } = require('process');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
let respuesta="AGREGADO";

function sendOperation(req){
  axios.post('localhost:5000/worker/', {
    numero1: req.body.numero1,
    numero2: req.body.numero2,
    operacion: req.body.operacion
  })
  .then((response) => {
    console.log(response);
    response = JSON.parse(response);
    return response;
  }, (error) => {
    console.log(error);
  });
}

function sendHistorial(req){
  let historial = Redis.getOperation();
  return historial;
}



app.all('/', function (req, res) {
    console.log('Peticion recibida: '+req.body.peticion);
    let result = "";
    if(req.body.peticion == 'operacion'){
        result = sendOperation(req);
        //Subimos el resultado
        Redis.uploadOperation(result.resultado);
    }else if(req.body.peticion == 'historial'){
        result = sendHistorial(req);
        //Devuelve un array
    }
    respuesta = {
      respuesta: result
    }
    res.send(JSON.stringify(respuesta));
    res.end();
  });

app.get('/register',  function (req, res) {
  console.log("REGISTRADO");
  let usuario = req.body.usuario;
  let password = req.body.password;
  console.log("PARAMETERS /register");
  console.log(usuario);
  console.log(password);
  let existe;
  try{
     Redis.existsUser(usuario)
    .then((data) => {
      existe = data;
    })
    .catch((error) =>{
      return res.status(503).json({respuesta:false, ocasion: "Error en promesa: "+error});      
    });
  }catch(ex){
    console.log("REDIS EXIST");
    console.log(ex);
    return res.status(503).json({ respuesta:false, resultado:"SI ENTRO", ex: ex });
  }

  if(existe !== 0){
    return res.status(503).json({ respuesta:false, ocasion: "Error en existe: "+existe });
  }else{
    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString('base64');
      console.log("salt: "+newSalt);
      crypto.pbkdf2(password, newSalt, 1000, 64, 'sha1', async (err, key) => {
        const encrypetedPassword = key.toString('base64');
        try {
            await Redis.setUser(usuario, encrypetedPassword, newSalt)
            .then((data) => {
              //empty because success
            })
            .catch((error) => {
              return res.status(503).json({respuesta:false, ocasion: "error ingresando usuario"});
            });
        } catch (error) {
            return res.status(503).json({ respuesta: false, ocasion: "En try: "+error });
        }

      });
    });
  }
  
  console.log("Registrado");
  return res.status(500).json({ respuesta:true });  
});

app.all('/login', function (req, res) {
  let usuario = req.body.usuario;
  let password = req.body.password;
  let existe;
  try{
    existe = Redis.exists(usuario, password);
    if(existe){
      Redis.setLogin(usuario);
    }
    return res.status(200).json({respuesta:existe});
  }catch(err){
    return res.status(503).json({respuesta:false});
  }
  
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
