const calculadora = require('./calculadora')
const avalia = require('./avalia')
const inquirer = require('inquirer')
const fs = require('fs')

inquirer.prompt([
    {
        name: 'nomeAluno',
        message: 'Nome do Aluno'
    },
    {
        name: 't1',
        message: 'Nota do 1o Trabalho'
    },
    {
        name: 't2',
        message: 'Nota do 2o Trabalho'
    },
    {
        name: 'p3',
        message: 'Nota da 3o Prova'
    },
    {
        name: 'p4',
        message: 'Nota da 4o Prova'
    }
]).then((answers) => {
    console.log(`Sua nota no 1o Trabalho foi: ${answers.t1}`)
    console.log(`Sua nota no 2o Trabalho foi: ${answers.t2}`)
    console.log(`Sua nota na 3o Prova foi: ${answers.p3}`)
    console.log(`Sua nota na 4o Prova foi: ${answers.p4}`)
    let media = calculadora.media(answers.t1, answers.t2, answers.p3, answers.p4)
    console.log(`Sua média foi: ${media}`)
    avalia.mensagem(media)

})
    .catch((erro) => {console.log('Xiii deu erro!')})