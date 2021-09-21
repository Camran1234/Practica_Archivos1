console.log("Hola Mundo");

function revisarNumeros(num1, num2){
    if(num1!=null && num2!=null){
        return true;
    }
    return false;
}

function sumar(){
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
}

function resta(){
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
}

function multiplicacion(){
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
}

function division(){
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
}

function potencia(){
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