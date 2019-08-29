const config=require('./config');
const mongoose=require('mongoose');

//database connection
mongoose.connect(config.mongo.url, { useNewUrlParser: true }, function (err, database) {
    if (err) {
        console.log('Error: ', err);
       // process.exit(1);
    }
    console.log('Database Connected.');

});
module.exports=mongoose;