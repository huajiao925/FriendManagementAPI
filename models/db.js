const mongoose = require("mongoose");

mongoose
.connect(process.env.DATABASE_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log("Connected to database!");
})
.catch((err) => {
console.log("Cannot connect to the database", err);
process.exit();
});