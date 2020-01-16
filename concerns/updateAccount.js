module.exports = ((hashPassword, database) => {
    const updateAccount = (id, logic) => {
        return database.accounts.findById(id)
            .then(account => {
                logic(account);

                return database.accounts.update(account);
            });
    }

    const updatePassword = (id, newPassword) => {
        return hashPassword.hash(newPassword)
            .then(hashedPassword => updateAccount(id, account => account.password = hashedPassword));
    };

    return {
        updatePassword
    };
});