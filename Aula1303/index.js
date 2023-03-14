//#region Modulos Externos
const chalk = require('chalk')
const inquirer = require('inquirer')
//#endregion

//#region Modulos Internos
const fs = require('fs')
//#endregion
operation()
//#region Operaões Iniciais
function operation(){
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'O que deseja fazer?',
            choices:[
                'Criar conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action']
        if(action === 'Criar conta'){
            console.log('Criando sua conta')
        }
        else if(action === 'Consultar saldo'){
            console.log('Consultando saldo')
        }
        else if(action === 'Depositar'){
            console.log('Depositando')
        }
        else if(action === 'Sacar'){
            console.log('Sacando')
        }
        else if(action === 'sair'){
            console.log(chalk.bgBlue.black('Obrigado por utilizar o Contas ETEC.'))
            setTimeout(() => {
                process.exit()
            },1500);
        }
    })
}
//#endregion