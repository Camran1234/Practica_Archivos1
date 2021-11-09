(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

function revisarNumeros(num1, num2){
    if(num1!=null && num2!=null){
        return true;
    }
    return false;
}


function sendRequest(num1, num2,  operacion){
    let json = {"numero1":num1, "numero2":num2};
    console.log("SENDING PACKAGE TO localhost:3001/");
    //var axios = require('axios').default;
    requirejs(["axios"], function (axios) {
        axios.post('localhost:4000/api/', {
            numero1: num1,
            numero2: num2,
            operacion: operacion,
            peticion: "operacion"
          })
          .then((response) => {
            console.log(response);
            return response.respuesta;
          }, (error) => {
            console.log(error);
        });
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


function sumar () {
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
    let respuesta = sendRequest(num1, num2, '+');
    document.getElementById("answer").innerText = respuesta;
}

function resta () {
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
    let respuesta = sendRequest(num1, num2, '-');
    document.getElementById("answer").innerText = respuesta;
}

function multiplicacion (){
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
    let respuesta = sendRequest(num1, num2, '*');
    document.getElementById("answer").innerText = respuesta;
}

function division (){
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
    let respuesta = sendRequest(num1, num2, '/');
    document.getElementById("answer").innerText = respuesta;
}

function potencia () {
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
    let respuesta = sendRequest(num1, num2, '^');
    document.getElementById("answer").innerText = respuesta;
}

},{}]},{},[1]);
