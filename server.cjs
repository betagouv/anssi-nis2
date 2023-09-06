const express = require("express");
const basicAuth = require("express-basic-auth");
const path = require("path");

const app = express();
const directory = "/" + (process.env.STATIC_DIR || "anssi-nis2-ui/dist");
const port = process.env.PORT || 3000;

if (process.env.PASSWORD_NIS2_BASIC_AUTH) {
    var staticUserAuth = basicAuth({
        users: {NIS2: process.env.PASSWORD_NIS2_BASIC_AUTH},
        challenge: true,
    });
    app.use("/", staticUserAuth, (req, res, next) => next());
}
app.use("/", express.static(__dirname + directory));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + directory + "/index.html"));
});

app.listen(port, function () {
    console.log("Listening on", port);
});
