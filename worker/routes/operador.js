
function subirHistorial(num1, num2, op, res){
    //Subir a redis
}

function sumar(num1, num2){
    subirHistorial(num1, num2, "+", num1+num2)
    return num1+num2;
}

function restar(num1, num2){
    subirHistorial(num1, num2, "-", num1-num2)
    return num1-num2
}

function multiplicacion(num1, num2){
    subirHistorial(num1, num2, "*", num1*num2)
    return num1*num2
}

function division(num1, num2){
    if(num2==0){
        return "ERROR"
    }else{
        subirHistorial(num1, num2, "/", num1/num2)
        return num1/num2
    }
}

function pow(num1, num2){
    subirHistorial(num1, num2, "^", Math.pow(num1, num2))
    return Math.pow(num1, num2)
}

module.exports.sumar = sumar;
module.exports.restar = restar;
module.exports.multiplicacion = multiplicacion;
module.exports.division = division;
module.exports.pow = pow;