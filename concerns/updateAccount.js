module.exports = ((database) => {
    const updateAccount = (id, logic) => {
        return database.accounts.findById(id)
            .then(account => {
                logic(account);

                return database.accounts.update(account);
            });
    }

    const updatePassword = (id, newPassword) => {
        return updateAccount(id, account => account.password = newPassword);
    };

    return {
        updatePassword
    };
});