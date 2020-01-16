const settings = require("./appsettings.json");
const DataStore = require("./common/repository/mockDataStore");
const database = require("./repository/database")(DataStore);

const hashPassword = require("./concerns/hashPassword")({
    hashSecret: settings.hashSecret
});

const createAccount = require("./concerns/createAccount")(hashPassword, database);
const lookupAccounts = require("./concerns/lookupAccounts")(database);
const updateAccount = require("./concerns/updateAccount")(hashPassword, database);
const loginAccount = require("./concerns/loginAccount")(hashPassword, database);

module.exports = {
    createAccount,
    lookupAccounts,
    updateAccount,
    loginAccount
};