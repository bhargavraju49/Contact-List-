// req lib
const mongoose = require('mongoose');
// connect to db
mongoose.connect('mongodb://localhost/contact_list_db');
// acquire connection
const db = mongoose.connection;
//error if fails
db.on('error',console.error.bind(console,'error connecting to DB'));
// connection suscessful msg
db.once('open', function(){
    console.log('connection sucessful')
});

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }