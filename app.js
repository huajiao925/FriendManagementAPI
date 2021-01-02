require("dotenv").config();
const friendRouter = require('./routers/friendRouter');
const postRouter = require('./routers/postRouter');
const express = require("express");
const { response } = require("express");
const app = express();
const bodyParser = require("body-parser");
require('./models/db');


console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/api/friend", friendRouter);
app.use("/api/post", postRouter);

app.get('/api', (request, response)=> {
    response.send('hello world');
})
//node app.js
//server: localhost:3000/
app.listen(process.env.PORT, ()=>{
    console.log('Server is running at port 3000');
})
