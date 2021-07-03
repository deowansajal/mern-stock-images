const chalk = require('chalk')
module.exports = {
    success: msg => console.log(chalk.cyan(msg)),
    error: msg => console.log(chalk.red(msg)),
}
