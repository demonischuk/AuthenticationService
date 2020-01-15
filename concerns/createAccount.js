const CreateAccount = ((db) => {
    const create = (model) => {
        db.accounts.insert(model);

        return Promise.resolve({
            id: model.id
        });
    };

    return {
        create
    };
});

module.exports = CreateAccount;