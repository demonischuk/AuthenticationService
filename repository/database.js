const DatabaseTable = require("./databaseTable");

module.exports = (() => {
    return {
        accounts: new DatabaseTable("Accounts")
    };
});