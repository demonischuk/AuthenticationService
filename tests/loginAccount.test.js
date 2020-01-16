const DatabaseTable = require("../common/repository/mockDataStore");
const Database = require("../repository/database");
const hashPassword = require("../concerns/hashPassword")({
    hashSecret: "midna"
});
const CreateAccount = require("../concerns/createAccount");
const LoginAccount = require("../concerns/loginAccount");

const blankDatabase = () => Database(DatabaseTable);

test("Login account when correct details", () => {
    const db = blankDatabase();
    const createAccount = CreateAccount(hashPassword, db);
    const loginAccount = LoginAccount(hashPassword, db);

    expect.assertions(3);

    return createAccount.create({
        email: "andrew.bate@no.com",
        password: "Pass#word1",
        type: "Teacher",
        reference: "abc"
    })
        .then(_ => loginAccount.login("andrew.bate@no.com", "Pass#word1")
            .then(loginResponse => {
                expect(loginResponse.id).toBe(1);
                expect(loginResponse.type).toBe("Teacher");
                expect(loginResponse.reference).toBe("abc");
            }));
});