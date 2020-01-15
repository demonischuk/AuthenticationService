module.exports = ((database) => {
    return (model) => {
        const entity = {
            email: model.email,
            password: model.password,
            dateCreated: new Date()
        };

        return database.accounts.insert(entity)
            .then(_ => ({id: entity.id}));
    };
});