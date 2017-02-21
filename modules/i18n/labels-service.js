let Languages = require("./languages")

module.exports = function (language) {
    if (Languages.indexOf(language) !== -1) {
        return require(`./labels-${language}`);
    }
}