console.log('INICIANDO APP.JS');
const axios = require('axios').default;

function revisarNumeros(num1, num2){
    if(num1!=null && num2!=null){
        return true;
    }
    return false;
}


function sendRequest(num1, num2,  operacion){
    let json = {"numero1":num1, "numero2":num2};
    console.log("SENDING PACKAGE TO localhost:3001/");
    axios.post('localhost:3001/', {
        numero1: num1,
        numero2: num2,
        operacion: operacion,
        peticion: "operacion"
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}

function requestHistorial(){
    axios.post('localhost:3001/', {
        peticion: 'historial'
    })
    .then((response)=> {
        console.log(response)
    }, (error) => {
        console.log(error);
    });
}


let sumar = () => {
    console.log('SUMANDO')
    let num1 = document.getElementById("valor1").value;
    let num2 = document.getElementById("valor2").value;

    if(revisarNumeros(num1, num2)){
        console.log(num1+"+"+num2);
    }else{
        if(num1==null){
            console.log("Numero 1 esta vacio")
        }
        if(num2==null){
            console.log("Numero 2 esta vacio")
        }
    }
    sendRequest(num1, num2, '+');

}

let resta = () => {
    let num1 = document.getElementById("valor1").value;
    let num2 = document.getElementById("valor2").value;

    if(revisarNumeros(num1, num2)){
        console.log(num1+"-"+num2);
    }else{
        if(num1==null){
            console.log("Numero 1 esta vacio")
        }
        if(num2==null){
            console.log("Numero 2 esta vacio")
        }
    }
    sendRequest(num1, num2, '-');
}

let multiplicacion = () =>{
    let num1 = document.getElementById("valor1").value;
    let num2 = document.getElementById("valor2").value;

    if(revisarNumeros(num1, num2)){
        console.log(num1+"*"+num2);
    }else{
        if(num1==null){
            console.log("Numero 1 esta vacio")
        }
        if(num2==null){
            console.log("Numero 2 esta vacio")
        }
    }
    sendRequest(num1, num2, '*');
}

let division = () =>{
    let num1 = document.getElementById("valor1").value;
    let num2 = document.getElementById("valor2").value;

    if(revisarNumeros(num1, num2)){
        console.log(num1+"/"+num2);
    }else{
        if(num1==null){
            console.log("Numero 1 esta vacio")
        }
        if(num2==null){
            console.log("Numero 2 esta vacio")
        }
    }
    sendRequest(num1, num2, '/');
}

let potencia = () => {
    let num1 = document.getElementById("valor1").value;
    let num2 = document.getElementById("valor2").value;

    if(revisarNumeros(num1, num2)){
        console.log(num1+"^"+num2);
    }else{
        if(num1==null){
            console.log("Numero 1 esta vacio")
        }
        if(num2==null){
            console.log("Numero 2 esta vacio")
        }
    }
}
