const express = require('express');

const path = require('path');

const port = 8000;

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
    return res.render('home', {
        title: "My Contacts List",
        contact_list: contactList
    
    });
})


app.post('/create-contact' , function(req,res){
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });           // .push req.body is also fine
    return res.redirect('/') //can  use 'back insteadof '/'
});


app.get('/delete-contact/:phone',function(req,res){
    let phone = req.params.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex != -1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');


});

app.listen(port, function(err){
    if (err) {
        console.log('error in server',err);
    }

    console.log('server is running on port ',port);
});