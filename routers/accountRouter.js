const express = require("express");

module.exports = ((diFactory) => {
    const router = express.Router();

    router.route("/accounts")
        .get((req, res) => {
            return res.sendStatus(501);
        })
        .post((req, res) => {
            return diFactory.createAccount.create(req.body)
            .then(createAccountResponse => res.status(201).send(createAccountResponse), err => res.sendStatus(500));
        });

    router.route("/accounts/:id")
        .get((req, res) => {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).send("Id is invalid");
            }

            try {
                return res.status(200).send(diFactory.lookupAccounts.getById(id));
            } catch (ex) {
                console.log(ex);
                return res.status(ex.code).send(ex.message);
            }
        });

    router.route("/accounts/:id/password")
        .patch((req, res) => {
            return res.sendStatus(501);
        });

    return router;
});