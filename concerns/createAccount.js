module.exports = ((hashPassword, database) => {
    const create = (model) => {
        return hashPassword.hash(model.password)
            .then(hashedPassword => {
                return {
                    email: model.email,
                    password: hashedPassword,
                    dateCreated: new Date()
                }
            })
            .then(entity => database.accounts.insert(entity)
                .then(_ => ({ id: entity.id })));
    };

    return {
        create
    };
});