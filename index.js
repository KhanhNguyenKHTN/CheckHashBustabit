const express = require('express');
const app = express();
const router = express.Router();
const lib = require('./lib');

router.get('/hash', function (req, res) {
    var hash = req.query.hash;
    var gameId = req.query.gameid;
    var lastId = parseInt(gameId.toString());
    var array = [];
    var firstObject = { hash: hash, index: lastId, crash: lib.crashPointFromBustabit(hash), query: ""}; 
    firstObject.query = 'INSERT INTO BustabitGameInfo (GameId, Hash, CrashPoint) VALUES ( '+ firstObject.index + ', '+ firstObject.hash +', ' + firstObject.crash + ');';

    array.push(firstObject);
    for (let index = 2; index <= 5000; index++) {
        lastId--;
        hash = lib.genGameHash(hash);
        var tempObject =  { hash: hash, index: lastId, crash: lib.crashPointFromBustabit(hash), query: ""};
        tempObject.query = 'INSERT INTO BustabitGameInfo (GameId, Hash, CrashPoint) VALUES ( '+ tempObject.index + ', '+ tempObject.hash +', ' + tempObject.crash + ');';
        array.push(tempObject);
    }
    res.send(JSON.stringify(array));
});

app.use('/', router);

app.listen(process.env.port || 3333);

console.log('Running at Port http://localhost:3333/');