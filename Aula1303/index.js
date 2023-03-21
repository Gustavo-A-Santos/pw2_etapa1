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
            createAccount()
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

// #region Criação de Contas
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o Banco ETEC.'))
    console.log(chalk.green('Defina as opções de conta:'))

    buildAccount()
}
function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Entre com nome da sua conta:'
        }
    ]).then((answer) => {
        console.info(answer['accountName'])
        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`account/${accountName}.json`)){
            console.log(
                chalk.bgRed.black('Esta conta já existe!')
            )
            buildAccount(accountName)
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance":0}',
            function (err){
                console.error(err)
            }
        )

        console.info(chalk.green('Parabéns, sua conta está pronta!'))
        operation()
    })
}
//#endregion