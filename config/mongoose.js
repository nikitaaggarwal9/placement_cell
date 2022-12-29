const mongoose = require('mongoose');
// const DB_URL = 'mongodb+srv://Nikita:Nikita@cluster0.tdrptqt.mongodb.net/?retryWrites=true&w=majority'
 
// mongoose.connect(`${process.env.DB_URL}`);
mongoose.connect(`${process.env.DB_URL}`, {

    useUnifiedTopology: true,

    useNewUrlParser: true,

}).then(console.log('connect sucess to mongodb'))

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;