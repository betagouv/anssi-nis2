const express = require('express');
const basicAuth = require('express-basic-auth')

var app = express();
var directory = '/' + (process.env.STATIC_DIR || 'dist')

if (process.env.PASSWORD_NIS2_BASIC_AUTH) {
    var staticUserAuth = basicAuth({
        users: {
            'NIS2': process.env.PASSWORD_NIS2_BASIC_AUTH
        },
        challenge: true
    })
    app.use("/", staticUserAuth, (req, res, next) => {
        next();
    })
}
app.use("/", express.static(__dirname + directory));

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listening on', port);
});
