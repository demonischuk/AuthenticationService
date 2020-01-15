module.exports = function (tableName) {
    let data = [];
    let primaryKeyId = 1;

    this.findById = (id) => {
        console.log(`Lookup by id ${id}`);
        const matches = data.filter(x=>x.id === id);
console.log("Find by id matches", matches);
        return matches.length === 1 ? matches[0] : null;
    };
    
    this.insert = (model) => {
        model.id = primaryKeyId;

        data.push(model);

        primaryKeyId++;
        console.log(`Inserted into table ${tableName}`, model);

        return model;
    };

    this.delete = (id) => {
        const updatedCollection = data.filter(x => typeof id === "object" ? x !== id : x.id != id);

        if (updatedCollection.length === data.length) {
            throw {
                code: 404,
                message: `Could not delete record ${(typeof id === "object" ? id.id : id)} from table ${tableName} because it does not exist`
            };
        }

        console.log(`Deleted from table ${tableName}`, id);

        data = updatedCollection;
    };

    this.update = (model) => {
        const matches = data.filter(x => x.id === model.id);

        if (matches.length === 1) {
            data[data.indexOf(matches[0])] = model;
            console.log(`Updated record in table ${tableName}`, model);
        } else {
            throw {
                code: 404,
                message: `Could not update record ${model.id} in table ${tableName} because it does not exist`
            };
        }
    };
};