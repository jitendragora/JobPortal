const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jobportalDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Connection to database is successful`);
}).catch((err) => {
    console.log(err);
})