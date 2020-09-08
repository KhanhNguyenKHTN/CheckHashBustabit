const express = require('express');
const app = express();
const router = express.Router();
const lib = require('./lib');

router.get('/hash', function (req, res) {
    var hash = req.query.hash;
    var array = [];
    array.push( { hash: hash, index: 1, crash: lib.crashPointFromBustabit(hash) })
    for (let index = 2; index <= 5000; index++) {

        hash = lib.genGameHash(hash)
        array.push( { hash: hash, index: index, crash: lib.crashPointFromBustabit(hash) })
    }
    res.send({list: array});
});

app.use('/', router);

app.listen(process.env.port || 3333);

console.log('Running at Port http://localhost:3333/');