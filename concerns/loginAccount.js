module.exports = ((hashPassword, database) => {
    const login = (email, password) => {
        return hashPassword.hash(password)
        .then(hashedPassword => database.accounts.find({
            email: email,
            password: hashedPassword
        }))
        .then(matches => {
            if (matches.length !== 1) {
                return Promise.reject({
                    code: 404
                });                
            }

            const account = matches[0];

            return {
                id: account.id,
                type: account.type,
                reference: account.reference
            };            
        });
    };

    return {
        login
    };
});