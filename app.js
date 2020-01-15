const packageInfo = require("./package.json");
const settings = require("./appsettings.json");
const diFactory = require("./diFactory");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/v1", require("./routers/accountRouter")(diFactory));

const port = settings.port || process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${packageInfo.name} is running, listening on port ${port}`);
});