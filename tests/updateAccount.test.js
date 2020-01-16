const DatabaseTable = require("../common/repository/mockDataStore");
const Database = require("../repository/database");
const hashPassword = require("../concerns/hashPassword")({
    hashSecret: "midna"
});
const CreateAccount = require("../concerns/createAccount");
const UpdateAccount = require("../concerns/updateAccount");

const blankDatabase = () => Database(DatabaseTable);
const createTestAccount = (db) => {
    const subject = CreateAccount(hashPassword, db);

    return subject.create({
        email: "andrew.bate@no.com",
        password: "Pass#word1"
    })
        .then(res => res.id);
};

test("Update account password successfully", () => {
    const db = blankDatabase();
    const subject = UpdateAccount(hashPassword, db);

    expect.assertions(1);

    return createTestAccount(db)
        .then(id => subject.updatePassword(id, "abc")
            .then(_ => {
                return db.accounts.findById(id)
                    .then(entity => {
                        expect(entity.password).toBe("6f08243b108807e62f89b508a8cd6aa2735faa1de61894ab5574cedd2275b008");
                    });
            }));
});