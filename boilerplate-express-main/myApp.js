let express = require('express');
let app = express();
require('dotenv').config()
bodyParser = require('body-parser')

console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    const logger = `${req.method} ${req.path} - ${req.ip}`
    console.log(logger);
    next();
})

absolutePath = __dirname + '/views/index.html';

app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

// app.get('/json' , (req,res) => {
//     res.json({"message" : "Hello json"})
// })

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        res.json({ "message": "HELLO JSON" })
    } else {
        res.json({ "message": "Hello json" })
    }
})

app.get('/now' , (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({time : req.time})
})

app.get('/:Careervio/echo' , (req,res) => {
    res.json({echo : req.params.Careervio});
})

app.get('/name' , (req,res) => {
    res.json({name : `${req.query.first} ${req.query.last}`});
})

app.post('/name' , (req,res) => {
    res.json({name : `${req.body.first} ${req.body.last}`});
})

app.use('/public', express.static(__dirname + '/public'));

module.exports = app;