

function revisarNumeros(num1, num2){
    if(num1!=null && num2!=null){
        return true;
    }
    return false;
}

function ajaxSend(num1, num2, operation){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"localhost:4000/api/",
            data: {
                numero1: num1,
                numero2: num2,
                operacion: operation,
                peticion: "operacion"
            },
            success: function(data){
                console.log("SUCCESS");
                data = JSON.parse(data);
                resolve(data.respuesta);
            },
            error: function(error){
                console.log("HERE")
                console.log(error)
                reject("Conexion Imposible");
            }
        });
    });
}

async function sendRequest(num1, num2,  operacion){
    let newResult = "ASD";
    newResult = await ajaxSend()
    .then((data) => {
        console.log("1");
        console.log(data);
        newResult = data;
        return data;
    })
    .catch((error) => {
        console.log("2");
        console.log(error);
        newResult = error;
        return error;
    });
    console.log("OH NO CODE FAILED")
    console.log(newResult);
    return newResult;
    /*console.log("ASD");
    console.log(newResult);
    return newResult;*/
    /*let json = {"numero1":num1, "numero2":num2};
    console.log("SENDING PACKAGE TO localhost:3001/");
    let respuesta;
    try{
        respuesta = await $.ajax({
            type:"GET",
            dataType:"json",
            url:"localhost:3000/example/",
            data: {
                numero1: num1,
                numero2: num2,
                operacion: operacion,
                peticion: "operacion"
            },
            success: function(data){
                console.log("SUCCESS");
                data = JSON.parse(data);
                return data.respuesta;
            },
            error: function(error){
                console.log("HERE")
                console.log(error)
                return "Conexion imposible";
            }
        });
    }catch(exception){
        console.log(exception);
    }
    
    console.log("OUT");
    console.log(respuesta);
    return respuesta;*/
    /*axios.post('localhost:4000/api/', {
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
    });*/
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


async function sumar () {
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
    let respuesta = await sendRequest(num1, num2, '+');
    document.getElementById("answer").innerText = respuesta;
}

async function resta () {
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
    let respuesta = await sendRequest(num1, num2, '-');
    document.getElementById("answer").innerText = respuesta;
}

async function multiplicacion (){
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
    let respuesta = await sendRequest(num1, num2, '*').toString();
    document.getElementById("answer").innerText = respuesta;
}

async function division (){
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
    let respuesta = await sendRequest(num1, num2, '/').toString();
    document.getElementById("answer").innerText = respuesta;
}

async function potencia () {
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
    let respuesta = await sendRequest(num1, num2, '^').toString();
    document.getElementById("answer").innerText = respuesta;
}
