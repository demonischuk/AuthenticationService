const express = require("express");

module.exports = ((concerns) => {
    const responseHandler = concerns.responseHandler;

    const router = express.Router();

    router.route("/accounts")
        .get((req, res) => {
            return res.sendStatus(501);
        })
        .post((req, res) => {
            return responseHandler.handle(res, concerns.createAccount(req.body));
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

    return router;
});