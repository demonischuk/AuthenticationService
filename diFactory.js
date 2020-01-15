const database = require("./repository/database")();

const createAccount = require("./concerns/createAccount")(database);
const lookupAccounts = require("./concerns/lookupAccounts")(database);

module.exports = {
    createAccount,
    lookupAccounts
};