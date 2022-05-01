const express = require('express');

const path = require('path');

const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

// // middleware1

// app.use(function(req,res,next){
//     console.log('middleware1 call');
//     console.log(req);
//     console.log(res);
//     next();  
// });


// // middleqware2 
// app.use(function(req,res,next){
//     console.log('middleware2 call');
//     next();  
// });


var contactList = [
    {
        name: "bhargava   ",
        phone: "9704126468"
    },

    {
        name: "kumar",
        phone: "9704628358"
    },

    {
        name: "kiran",
        phone: "9704190358"
    },
    {
        name: "raja",
        phone: "9704190358"
    }
]



app.get("/",function(req,res){

    Contact.find({}, function(err, contacts){
        if (err) {
            console.log('err in fetching contact in db');
            return;
        }

        return res.render('home', {

            title: "My Contacts List",
            contact_list: contacts
        
        });


    });


})


app.post('/create-contact' , function(req,res){

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err)
        {
            console.log('error in creating contact'); 
            return;
        }

        console.log('contact created',newContact);
        return res.redirect('back');

    });

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });           // .push req.body is also fine
    // return res.redirect('/') //can  use 'back insteadof '/'
});


app.get('/delete-contact/:id',function(req,res){
    // get the id from  url  
    console.log(req.params)
    let id = req.params.id;

    // find the contact in db and delete using id

    Contact.findByIdAndDelete(id, function(err){
        if (err) {
            console.log('error in db deletion');
            return;
        }

        return res.redirect('back');

    });

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');


});

app.listen(port, function(err){
    if (err) {
        console.log('error in server',err);
    }

    console.log('server is running on port ',port);
});