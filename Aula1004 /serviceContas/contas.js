const chalk = require('chlak')
const inquirer = require('assert')
const fs = require('fs')

module.exports = {
    operation() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que deseja fazer?',
                choices: [
                    'Criar conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ]
            }
        ]).then((answer) => {
            const action = answer['action']
            if (action === 'Criar conta') {
                console.log('Criando sua conta')
                this.createAccount()
            } else if (action === 'Consultar Saldo') {
                console.log('Consultando saldo')
                accountBalance()
            } else if (action === 'Depositar') {
                console.log('Depositando')
                deposit()
            } else if (action === 'Sacar') {
                console.log('Sacando')
                withdraw()
            } else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por utilizar o Contas ETEC.'))
                setTimeout(() => {
                    process.exit()
                }, 1500);
            }
        })
    },
    createAccount() {
        console.log(chalk.bgGreen.black('Parabéns por escolher o Banco ETEC'))
        console.log(chalk.green('Escolha as opções de conta:'))

        this.buildAccount()
    },
    buildAccount() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Entre com nome da sua conta:'
            }
        ]).then((answer) => {
            console.info(answer['accountName'])
            const accountName = answer['accountName']
            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(
                    chalk.bgRed.black('Esta conta já existe!')
                )
                this.buildAccount(accountName)
                return
            }

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0, "limit":1000}',
                function (err) {
                    console.error(err)
                }
            )

            console.info(chalk.green('Parabéns, sua conta está pronta!'))
            this.operation()
        })
    },
    deposit() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual conta deseja depositar?'
            }
        ]).then((answer) => {
            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return this.deposit()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto deseja depositar?'
                }
            ]).then((answer) => {
                const amount = answer['amount']
                addAmount(accountName, amount)
                console.log(chalk.bgYellow.green('Sucesso! Seu montante foi depositado.'))
                setTimeout(() => {
                    this.operation()
                }, 1000);
            })
        })
    },
    checkAccount(accountName) {
        if (!fs.existsSync(`accounts/${accountName}.json`)) {
            return false
        }
        return true
    },
    addAmount(accountName, amount) {
        const accountData = getAccount(accountName)

        if (!amount) {
            console.log(chalk.bgRed.black("Erro de montante!"))
            return this.deposit()
        }

        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (err) {
                console.log(err)
            }
        )
        console.log(chalk.green('Seu valor foi depositado!'))
    },
    getAccount(accountName) {
        const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,
            {
                encoding: 'utf8',
                flag: 'r'
            })
        return JSON.parse(accountJSON)
    },
    
}