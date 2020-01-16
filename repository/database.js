module.exports = ((DataStore) => {
    return {
        accounts: new DataStore("Accounts")
    };
});