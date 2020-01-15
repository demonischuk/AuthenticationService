const DatabaseTable = require("../repository/databaseTable");
const CreateAccount = require("../concerns/createAccount");
const UpdateAccount = require("../concerns/updateAccount");

const blankDatabase = () => {
    return {
        accounts: new DatabaseTable("accounts")
    };
};
const createTestAccount = (db) => {
    const subject = CreateAccount(db);

    return subject.create({
        email: "andrew.bate@no.com",
        password: "Pass#word1"
    })
        .then(res => res.id);
};

test("Update account password successfully", () => {
    const db = blankDatabase();
    const subject = UpdateAccount(db);

    expect.assertions(1);

    return createTestAccount(db)
        .then(id => subject.updatePassword(id, "abc")
            .then(_ => {
                return db.accounts.findById(id)
                    .then(entity => {
                        expect(entity.password).toBe("abc");
                    });
            }));
});