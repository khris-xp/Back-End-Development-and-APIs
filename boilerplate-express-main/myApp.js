let express = require('express');
let app = express();
require('dotenv').config()

console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

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


app.use('/public', express.static(__dirname + '/public'));

module.exports = app;