module.exports = {
    calculadora(a, b, op){
        if(op === "+"){
            console.log(`${a} + ${b} = ${a+b}`)

        }else if(op === "-"){
            console.log(`${a} - ${b} = ${a-b}`)

        }else if(op === "*"){
            console.log(`${a} * ${b} = ${a*b}`)

        }else if(op === "/"){
            console.log(`${a} / ${b} = ${a/b}`)
        }
    }
}