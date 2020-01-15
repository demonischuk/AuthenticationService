module.exports = (() => {
    const success = (res, response = undefined) => {
        if (typeof response === "undefined") {
            return res.sendStatus(200);
        }

        return res.status(200).send(response);
    };

    const fail = (res, err = undefined) => {
        if (typeof err === "undefined" || typeof err.code === "undefined") {
            return res.sendStatus(500);
        }

        return err.message ? res.status(err.code).send(err.message) : res.sendStatus(err.code);
    };

    const handle = (res, promise) => {
        return promise.then(d => success(res, d), err => fail(res, err));
    };

    return {
        handle,
        success,
        fail
    };
});