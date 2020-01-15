module.exports = ((database) => {
    const mapAccount = (entity) => {
        return {
            id: entity.id,
            email: entity.email
        };
    };

    const getById = (id) => {
        return database.accounts.findById(id)
            .then(account => mapAccount(account));
    };

    return {
        getById
    };
});