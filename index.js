const express = require('express');
const app = express();
__path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;
app.use('/code', code);
const router = require('./qr');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/qr', router);

app.use('/code', code);

app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});

app.use('/qrcode', (req, res) => {
    res.sendFile(__dirname + '/qr.html');
});

app.use('/deploy', async (req, res, next) => {
    res.sendFile(__path + '/deploy.html');
});

app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html');
});

app.listen(PORT, () => {
    console.log(Serveur en cours d'exécution sur http://localhost:${PORT});
});

module.exports = app;
