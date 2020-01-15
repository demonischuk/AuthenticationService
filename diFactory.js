const database = require("./repository/database")();
const responseHandler = require("./common/responseHandler")();

const createAccount = require("./concerns/createAccount")(database);
const lookupAccounts = require("./concerns/lookupAccounts")(database);
const updateAccount = require("./concerns/updateAccount")(database);

module.exports = {
    createAccount,
    lookupAccounts,
    updateAccount,
    responseHandler
};