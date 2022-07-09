const express = require('express');
const http = require('http');
const fs = require('fs');
const bcrypt = require('bcrypt');
// const passport = require('passport');


var session = require('express-session');

const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
// app.use(express.static(__dirname + 'styles'));
// console.log(__dirname);


app.use(express.static('assets'));
app.use(express.urlencoded({extended:false}));


const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');




/* This is the code that connects the server to the firebase database. */
var admin = require("firebase-admin");

var serviceAccount = require("./pet-community.json");
const { doesNotMatch } = require('assert');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// console.log(db.collection('user_account'));

/* Getting the collections from the database. */
const useraccountcoll = db.collection('user_account');
const userestablishmentcoll = db.collection('user_establishment');


// const initializePassport = require('./passport-config');
// initializePassport(passport, emailinput => useraccountcoll

// ) 



// const initializePassport = require('./passport-config');
// initializePassport(passport, email => {
//     return 
// });


//
// app.use(session({
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     secret: 'shhhh, very secret'
// }));

  
// app.use(function(req, res, next){
//     var err = req.session.error;
//     var msg = req.session.success;
//     delete req.session.error;
//     delete req.session.success;
//     res.locals.message = '';
//     if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
//     if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
//     next();
// });
//


const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader('Content-Type', 'text/html');
    let url1 = './views/';

    if(req.url == '/'){
        url1 += 'pages/index-main-page';
        res.statusCode = 200;
    }else if(req.url == '/adoption-main-page'){
        url1 += 'pages/adoption/adoption-main-page';
        res.statusCode = 200;
    }else if(req.url == '/adoption-about-page'){
        url1 += 'pages/adoption/adoption-about-page';
        res.statusCode = 200;
    }else if(req.url == '/adoption-petslist-page'){
        url1 += 'pages/adoption/adoption-petslist-page';
        res.statusCode = 200;
    }else if(req.url == '/donor-main-page'){
        url1 += 'pages/donation/donor-main-page';
        res.statusCode = 200;
    }else if(req.url == '/donor-about-page'){
        url1 += 'pages/donation/donor-about-page';
        res.statusCode = 200;
    }else if(req.url == '/donor-requirements-page'){
        url1 += 'pages/donation/donor-requirements-page';
        res.statusCode = 200;
    }else if(req.url == '/shelter-main-page'){
        url1 += 'pages/shelter/shelter-main-page';
        res.statusCode = 200;
    }else if(req.url == '/shelter-about-page'){
        url1 += 'pages/shelter/shelter-about-page';
        res.statusCode = 200;
    }else if(req.url == '/shelter-list-page'){
        url1 += 'pages/shelter/shelter-list-page';
        res.statusCode = 200;
    }else if(req.url == '/petshop-main-page'){
        url1 += 'pages/establishment/petshop-main-page';
        res.statusCode = 200;
    }else if(req.url == '/veterinary-main-page'){
        url1 += 'pages/establishment/veterinary-main-page';
        res.statusCode = 200;
    }else if(req.url == '/government-main-page'){
        url1 += 'pages/establishment/government-main-page';
        res.statusCode = 200;
    }else if(req.url == '/event-main-page'){
        url1 += 'pages/event-main-page';
        res.statusCode = 200;
    }else if(req.url == '/trainingseminar-main-page'){
        url1 += 'pages/trainingseminar-main-page';
        res.statusCode = 200;
    }else if(req.url == '/index-login-page'){
        url1 += 'pages/index-login-page';
        res.statusCode = 200;
        res.end();
    } 

    fs.readFile(url1, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });


});

//Authorization

//Authorization


app.get('/',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/index-main-page', data);
});

/* Rendering the adoption-about-page.ejs file. */
app.get('/adoption-about-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/adoption/adoption-about-page', data);
});
/* Rendering the adoption-petslist-page.ejs file. */
app.get('/adoption-petslist-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/adoption/adoption-petslist-page', data);
});
/* Rendering the adoption-main-page.ejs file. */
app.get('/adoption-main-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/adoption/adoption-main-page', data);
});

/* Rendering the shelter-main-page.ejs file. */
app.get('/shelter-main-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/shelter/shelter-main-page', data);
});
/* Rendering the shelter-about-page.ejs file. */
app.get('/shelter-about-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/shelter/shelter-about-page', data);
});
/* Rendering the shelter-list-page.ejs file. */
app.get('/shelter-list-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/shelter/shelter-list-page', data);
});
/* Rendering the donor-requirements-page.ejs file. */
app.get('/donor-requirements-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/donation/donor-requirements-page', data);
});
/* Rendering the donor-about-page.ejs file. */
app.get('/donor-about-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/donation/donor-about-page', data);
});
app.get('/donor-main-page', async function (req, res){
    const establishments = await userestablishmentcoll.get();
    establishments.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    })


    let data = {
        url: req.url,
        itemData: establishments.docs,

    }

    // var itemData1 = establishments.docs;
    // for(var index = 0; index < itemData1.length; index++){

    //     console.log(itemData1[index].data()['name']);
    // }

    res.render('pages/donation/donor-main-page', data);


});

// app.get('/adoption', async function (req, res){
//     // res.render('index');
//     const foradoption = await itemcoll.get();
//     // foradoption.forEach(doc => {
//     //     console.log(doc.id, '=>', doc.data());
//     // })

//     // console.log(foradoption.docs);


    
//     let data ={
//         url: req.url,
//         itemData: foradoption.docs,
        
//     }
//     res.render('pages/adoption', data);

// function authentication(email, password){
//     // const useracc = await itemcoll.get();

//     // useracc.forEach(doc =>{

//     // })
// }


app.get('/index-login-page', async function (req, res){
    const useracc = await useraccountcoll.get();
    // useracc.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    // })

    /* Creating an object called `data` and assigning it the value of the `url` property of the `req`
    object and the `itemData` property of the `useracc` object. */
    let data = {
        url: req.url,
        itemData: useracc.docs,
    }

    res.render('pages/index-login-page', data);

    


    app.post("/loginform", async (req,res,next) => {
        

        const useracc1 = await useraccountcoll.get();
        
        
        var entryemail = req.body.emailinput;
        var entrypassw = req.body.passwordinput;

        let data = {
            url: req.url,
        }

        // var a1 = useracc1.docs;
        
        // for(var index = 0; index < a1.length; index++){
        //     if(entryemail == await a1[index].data()['email'] || await bcrypt.compare(entrypassw, a1[index].data()['password'])){
        //         // return done(null, false, {message: 'No user with that email'});
        //         console.log('right');
        //     }else{
        //         console.log('wrong');
        //     }
        // }
            // console.log(a1[index].data()['first_name']



        



    })





});

app.get('/event-main-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/event-main-page', data);
});
/* Rendering the trainingseminar-main-page.ejs file. */
app.get('/trainingseminar-main-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/trainingseminar-main-page', data);
});

/* Rendering the registration page. */
app.get('/index-registration-page',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/index-registration-page', data);

    app.post("/registrationform", async (req,res) => {
        
        try {
            var apassw = await bcrypt.hash(req.body.addpass, 10);
            var afirstname = req.body.addfirstname;
            var alastname = req.body.addlastname;
            var acontact = req.body.addcontact;
            var aaddress = req.body.addaddress;
            var aemail = req.body.addemail;

            db.collection('user_account').add({
                first_name: afirstname,
                last_name: alastname,
                contact: acontact,
                address: aaddress,
                email: aemail,
                password: apassw
            })
            .then(() => {
                console.log("Document added successfully");
            })
            .catch((error) => {
                console.error("Error", error);
            })

            res.redirect("/index-login-page");

        }catch{
            res.redirect("/registrationform");
        }
        
        // console.log(req.body);
        

    })


});

/* Listening to the port 3000 and localhost. */
app.listen(3000, 'localhost', () => {
    console.log("Server is running");
});
    
