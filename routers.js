const express = require("express");
const responseHandler = require("./common/responseHandler")();

module.exports = ((concerns) => {
    const router = express.Router();

    router.route("/accounts")
        .get((req, res) => {
            return res.sendStatus(501);
        })
        .post((req, res) => {
            return responseHandler.handle(res, concerns.createAccount.create(req.body));
        });

    router.route("/accounts/:id")
        .get((req, res) => {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).send("Id is invalid");
            }

            return responseHandler.handle(res, concerns.lookupAccounts.getById(id));
        });

    router.route("/accounts/:id/password")
        .patch((req, res) => {
            const id = parseInt(req.params.id);

            return responseHandler.handle(res, concerns.updateAccount.updatePassword(id, req.body.password));
        });

    router.route("/authentication/login")
        .post((req, res) => {
            return responseHandler.handle(res, concerns.loginAccount.login(req.body.username, req.body.password));
        });

    return router;
});