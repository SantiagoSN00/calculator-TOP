function add(num1,num2){

    num1 = +num1
    num2 = +num2

    return num1+num2;
}
function substract(num1,num2){

    num1 = +num1
    num2 = +num2

    return num1-num2;
}

function multiplicacion(num1,num2){
    return num1*num2
}

function division(num, ...args){
    if(num === 0 || num ===NaN) return "ERROR"
    let res = args.reduce(function(a,b){
        return a/b
    },num)
    if(!res)return "ERROR"
    return res.toFixed(2);
}

function potencias(num1,num2){
    return Math.pow(num1,num2)
}
function raiz(num1,num2){
    return Math.pow(num1,1/num2).toFixed(2)
}

let memoria =[]
let counter = 0
let pantalla = document.querySelector('.pantalla')
let numeros = document.querySelectorAll('.numero')
numeros.forEach(numero => {numero.addEventListener('click',agregarNumMemoria)})

let opSimples = document.querySelectorAll('.simple')
opSimples.forEach(op => {op.addEventListener('click',agregarSimpleMemoria)})

let opComplejas = document.querySelectorAll('.complejo')
opComplejas.forEach(op => {op.addEventListener('click',agregarComplejoMemoria)})

let parentesis = document.querySelectorAll('.parentesis')
parentesis.forEach(paren => {paren.addEventListener('click',agregarParentesisMemoria)})

let del = document.querySelector('.del')
del.addEventListener('click',borrarUltimoMemoria)

let igual = document.querySelector('.resultado')
igual.addEventListener('click',analizarMemoria)

actualizarPantalla()

let signos =["+","-","*","**","/","//"]


function actualizarPantalla(){
    let cambios = '';
    if(!memoria.length) {pantalla.textContent = "PANTALLA"}
    else{
        for(x of memoria){
            cambios += x
        }
        pantalla.textContent = cambios
    }
    
    
}
function analizarMemoria(){
resolverTODO(memoria);
if(memoria === NaN){
memoria = "Syntax Error"
actualizarPantalla()

} else{
actualizarPantalla()
    memoria = []
    counter = 0
}
}

function agregarSimpleMemoria(e){
    let input = e.target.textContent
    if(memoria.length === 0 && input ==="-"){
        memoria.push(input)
    }
    else if((memoria.length && !signos.includes(memoria[counter]) || memoria[counter]==="(")){
        memoria.push(input)
        counter++;
    }
    actualizarPantalla()

}
function agregarComplejoMemoria(e){
    let input = e.target.textContent
    let caracteres = ['/','//','*','**']
    if(memoria.length && memoria[counter]!=="(" && memoria[counter]!=="+" && memoria[counter]!=="-"){
        if(memoria[counter]==="*"&&input===memoria[counter]|| memoria[counter]==="/" && memoria[counter]===input){
        memoria[counter] += input
    }
    else if(!caracteres.includes(memoria[counter])){
        memoria.push(input)
        counter++;
    }
    actualizarPantalla()
}
}

function agregarParentesisMemoria(e){
    let input = e.target.textContent
    let operaciones = ["+","-","*","/","**","//"]

    if(input === "(" ){
        if(operaciones.includes(memoria[counter])){
            memoria.push(input)
            counter++;
        }
        else if(memoria.length === 0){
            memoria.push(input)
        
        }
    } else{
        if(!operaciones.includes(memoria[counter]) 
        && cierraParentesis(counter)&& memoria.length && !(memoria[counter]==="(")){
            memoria.push(input)
            counter++
            }
    }
    actualizarPantalla();
}
function borrarUltimoMemoria(e){
    if(memoria.length<=1){ 
        memoria = []
        counter = 0
    }
    else{
    memoria.pop()
    counter--
}
    actualizarPantalla()

}
function agregarNumMemoria(e){


    let num = e.target.textContent

    if(!memoria.length){memoria.push(num)}
    else if(memoria.length===1 && memoria[counter]==="-")
        {
            memoria[counter] += num
        }
    else if(memoria[counter] ===")"){}
    else if(signos.includes(memoria[counter]) || memoria[counter]==="("){
                memoria.push(num)
                counter++
        }else memoria[counter] += num
    actualizarPantalla()
}

function cierraParentesis(index){
    let cierra = 1;
    let abre = 0;
    while(cierra!=abre){
        if(memoria[index]==="(") abre++;
        else if(memoria[index]===")") cierra++;
        index--
        if(index==-1 || cierra === abre) break;
    }
    return (cierra === abre)
}

function correctosParentesis(){
    let cierra = 0;
    let abre = 0;

    for(x of memoria){
        if(x==="(") abre++;
        if(x===")") cierra++;
    }
    return (cierra===abre)
}

let prueba = ['3','+','1','*','5']
let potato = ['3','+','1','*','(','5','*','3',')','+','(','21','-','4',')']
let prueba2 = potato
let copiaprueba2 = potato

function tieneParentesis(arr){
    for(x of arr){
        if(x.includes('Parentesis')) return true
    }
    return false
}

function resolverTODO(arr){
    let contador = 0
    parentesis = getBetweenParentesis(arr);
    console.log(arr,parentesis)
    resultados = []
    let par = parentesis.length-1
    for(let i = 0 ; i<parentesis.length ; i++){
        if(parentesis[i][1]==="-"){
        resultados.push(resolverTerminos(parentesis[i][1]+parentesis[i][2]))
    } else resultados.push(resolverTerminos(parentesis[i][1]))

}
    
    for(let i=0;i<arr.length;i++){
            
            for(let j=par;j>=0;j--){
            if(arr[i].includes(`Parentesis ${j}`)){
                arr[i]=resultados[j]
            }
        }
    }
    
    resolverTerminos(arr)
    
    return(arr)


}

function getBetweenParentesis(arr){
    let contador = 0
    let lastOpen = 0;
    let firstClosed = 0;
    for(let i=0;i<arr.length;i++){
    lastOpen = arr.lastIndexOf("(")
    firstClosed = arr.indexOf(")",lastOpen)
    if(lastOpen!== -1 && firstClosed !== -1){
    arr.splice(lastOpen,0,`Parentesis ${contador++}`)
    arr.push(arr.splice(lastOpen+1,firstClosed-lastOpen+1))
}
}
    let arrays = arr.splice(arr.length-contador,contador)
    return (arrays);

}


function resolverTerminos(arr){

    return resolverSimple(resolverComplejos(resolverPotencias(arr)))

}
function resolverPotencias(arr){

    let inmediata =0
    for(let i=0;i<arr.length;i++){
        if(arr[i]==="**"){
            inmediata=(potencias(arr[i-1],arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        } else if(arr[i]=='//'){
            inmediata=(raiz(arr[i-1],arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        }
    }
    return arr;

}
function resolverComplejos(arr){

    let inmediata =0
    for(let i=0;i<arr.length;i++){
        if(arr[i]==="*"){
            inmediata=(multiplicacion(arr[i-1],arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        } else if(arr[i]=='/'){
            inmediata=(division(arr[i-1],arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        }
    }
    return arr;
}
function resolverSimple(arr){
    let inmediata =0
    for(let i=0;i<arr.length;i++){
        if(arr[i]==="+"){
            inmediata=(add(+arr[i-1],+arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        } else if(arr[i]=='-' && arr[i-1]){
            inmediata=(substract(+arr[i-1],+arr[i+1]))
            arr.splice(i-1,3,inmediata)
            i=0
        }
    }
    return arr;
}

