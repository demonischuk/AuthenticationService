const DatabaseTable = require("../common/repository/mockDataStore");
const Database = require("../repository/database");
const hashPassword = require("../concerns/hashPassword")({
    hashSecret: "midna"
});
const CreateAccount = require("../concerns/createAccount");

const blankDatabase = () => Database(DatabaseTable);

test("Create account successfully", () => {
    const db = blankDatabase();
    const subject = CreateAccount(hashPassword, db);

    expect.assertions(5);

    return subject.create({
        email: "andrew.bate@no.com",
        password: "Pass#word1",
        type: "Teacher",
        reference: "abc"
    }).then(res => {
        expect(res.id).toBe(1);

        return db.accounts.findById(res.id)
            .then(entity => {
                expect(entity.email).toBe("andrew.bate@no.com");
                expect(entity.password).toBe("6552a9226a05a20f2bd6a4a01a5e135d4b69addc52a024818baa59bb3f7da16a");
                expect(entity.type).toBe("Teacher");
                expect(entity.reference).toBe("abc");
            });
    });
});