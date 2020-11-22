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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/friend", friendRouter);
app.use("/post", postRouter);

app.get('/', (request, response)=> {
    response.send('hello world');
})
//node app.js
//server: localhost:3000/
app.listen(process.env.PORT, ()=>{
    console.log('Server is running at port 3000');
})