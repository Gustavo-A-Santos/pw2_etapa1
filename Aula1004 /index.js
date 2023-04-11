const contas = ('./serviceContas/contas')
contas.operation()

//#region Consultar Saldo
function accountBalance(){
    inquirer.prompt([
        {
            name:'accountName',
            message: 'Qual conta deseja verificar o saldo?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return accountBalance()
        }

        const accountData = getAccount(accountName)
        if(accountData.balance > 0){
            console.log(chalk.green(`O saldo da conta: R$ ${accountData.balance}.`))
        }
        else{
            console.log(chalk.red(`O saldo da conta: R$ ${accountData.balance}.`))
        }
        setTimeout(() => {
            operation()
        }, 1000)
        
    })
}
//#endregion

//#region Saque na conta
function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta efetuará o saque?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja sacar?'
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()
        })
        
    })
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('O valor precisa ser informado!'))
        return withdraw()
    }
    
    if(accountData.balance < amount){
        console.log(chalk.bgYellow.black('Entrou no cheque especial!'))
    }

    if((accountData.balance + accountData.limit) < amount){
        console.log(chalk.bgRed.black('Você não tem limite para saque!'))
        return
    }
    else{
        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (err){
                console.log(err)
            }
        )
    
        console.log(chalk.green(`Foi sacado: ${amount} da conta ${accountName}.`))
    }
}
//#endregion