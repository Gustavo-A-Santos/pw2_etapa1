const chalk = require("chalk")
module.exports = {
    mensagem(aluno){
        if(aluno >= 6){
            console.log(chalk.green("O aluno foi aprovado: ")+chalk.black.bgGreen(aluno))
        }else if(aluno >= 5){
            console.log(chalk.yellow("O aluno está de recuperação: ")+chalk.black.bgYellow(aluno))
        }else{
            console.log(chalk.red("O aluno está reprovado: ")+chalk.black.bgRed(aluno))
        }
    }
}