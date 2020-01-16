module.exports = function (tableName) {
    let data = [];
    let primaryKeyId = 1;

    this.findById = (id) => {
        const matches = data.filter(x => x.id === id);

        if (matches.length === 1) {
            return Promise.resolve(matches[0]);
        }

        return Promise.reject({
            code: 404,
            message: `Could not find a record in table ${tableName} matching id ${id}`
        });
    };

    this.find = (criteria) => {
        return Promise.resolve(data.filter(record => {
            for (let key in criteria) {
                if (typeof record[key] !== "undefined" && record[key] != criteria[key]) {
                    return false;
                }
            }

            return true;
        }));
    }

    this.insert = (model) => {
        model.id = primaryKeyId;

        data.push(model);

        primaryKeyId++;

        return Promise.resolve();
    };

    this.delete = (id) => {
        const updatedCollection = data.filter(x => typeof id === "object" ? x !== id : x.id != id);

        if (updatedCollection.length === data.length) {
            return Promise.reject({
                code: 404,
                message: `Could not delete record ${(typeof id === "object" ? id.id : id)} from table ${tableName} because it does not exist`
            });
        }

        data = updatedCollection;

        return Promise.resolve();
    };

    this.update = (model) => {
        const matches = data.filter(x => x.id === model.id);

        if (matches.length !== 1) {
            return Promise.reject({
                code: 404,
                message: `Could not update record ${model.id} in table ${tableName} because it does not exist`
            });
        }

        data[data.indexOf(matches[0])] = model;

        return Promise.resolve();
    };
};