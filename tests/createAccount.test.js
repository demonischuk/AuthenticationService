const DatabaseTable = require("../repository/databaseTable");
const CreateAccount = require("../concerns/createAccount");

const blankDatabase = () => {
    return {
        accounts: new DatabaseTable("accounts")
    };
};

test("Create account successfully", () => {
    const db = blankDatabase();
    const subject = CreateAccount(db);

    expect.assertions(3);

    return subject.create({
        email: "andrew.bate@no.com",
        password: "Pass#word1"
    }).then(res => {
        expect(res.id).toBe(1);

        return db.accounts.findById(res.id)
            .then(entity => {
                expect(entity.email).toBe("andrew.bate@no.com");
                expect(entity.password).toBe("Pass#word1");
            });
    });
});