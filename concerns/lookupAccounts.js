module.exports = ((db) => {
    const getById = (id) => {
        const account = db.accounts.findById(id);

        if (account === null) {
            throw {
                code: 404,
                message: `Could not find an account matching id: ${id}`
            };
        }

        return {
            email: account.email
        };
    };

    return {
        getById
    };
});