const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://cyesilc:yesil123@cluster0.d1gnq.mongodb.net/e-ticaret?retryWrites=true&w=majority")
    .then(() => {
        console.log("MongoDb Connection Succesful");
    })
    .catch(err => {
        console.error(err);
    })
}

module.exports = connectDatabase;