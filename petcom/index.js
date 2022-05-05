const express = require('express');
const http = require('http');
const fs = require('fs');

//

var session = require('express-session');

const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
// app.use(express.static(__dirname + 'styles'));
// console.log(__dirname);


app.use(express.static('assets'));
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
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
        url1 += 'pages/index';
        res.statusCode = 200;
    } else if(req.url == '/adoptapet'){
        url1 += 'pages/adoptapet';
        res.statusCode = 200;
    }else if(req.url == '/findadonor'){
        url1 += 'pages/findadonor';
        res.statusCode = 200;
    }else if(req.url == '/donatetoshelter'){
        url1 += 'pages/donatetoshelter';
        res.statusCode = 200;
    }else if(req.url == '/account'){
        url1 += 'pages/account';
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

var admin = require("firebase-admin");

var serviceAccount = require("./pet-community.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// console.log(db.collection('user_account'));
const itemcoll = db.collection('user_account');


//Authorization

//Authorization


app.get('/',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/index', data);
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

    
//     app.post("/adoptionform",urlencodedParser,function(req, res){
//         var dname = req.body.name;
//         var daddress = req.body.address;
//         var durl_photo = req.body.photo_url;
//         var dpettype = req.body.pettype;
    
//         // console.log(req.body);
//         // res.render('pages/adoption', {qs: req.query});
    
//         db.collection('adoption').add({
//             name: dname,
//             address: daddress,
//             photo_url: durl_photo,
//             pettype: dpettype
//         })
//         .then(() => {
//             console.log("Document added successfully");
//         })
//         .catch((error) => {
//             console.error("Error", error);
//         })
    
//         res.redirect('/adoption');
    
//     })
    
    
// });

// app.get('/adoptionform', function(req,res){
//     res.render('pages/adoptionform', {qs: req.query});
// })



/* This is a route handler. It is a function that is called when the server receives a request to the
specified route (in this case, `/adoptapet`). The function takes two arguments, `req` and `res`.
`req` is the request object, and `res` is the response object. The function can do anything it wants

with the request and response objects, but it usually sends back a response. */
app.get('/adoptapet',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/adoptapet', data);
});

/* This is a route handler. It is a function that is called when the server receives a request to the
specified route (in this case, `/donatetoshelter`). The function takes two arguments, `req` and
`res`.
`req` is the request object, and `res` is the response object. The function can do anything it wants

with the request and response objects, but it usually sends back a response. */
app.get('/donatetoshelter',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/donatetoshelter', data);
});

/* This is a route handler. It is a function that is called when the server receives a request to the
specified route (in this case, `/findadonor`). The function takes two arguments, `req` and `res`.
`req` is the request object, and `res` is the response object. The function can do anything it wants
with the request and response objects, but it usually sends back a response. */
app.get('/findadonor',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/findadonor', data);
});

function authentication(email, password){
    // const useracc = await itemcoll.get();

    // useracc.forEach(doc =>{

    // })
}


app.get('/account', async function (req, res){
    const useracc = await itemcoll.get();

    // useracc.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    // })


    let data = {
        url: req.url,
        itemData: useracc.docs,
    }
    res.render('pages/account', data);

    // app.post('/login', function (req, res, next){

    // })



});

/* Rendering the registration page. */
app.get('/registration',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/registration', data);

    app.post("/registrationform", urlencodedParser,function(req,res){
        var afirstname = req.body.addfirstname;
        var alastname = req.body.addlastname;
        var acontact = req.body.addcontact;
        var aaddress = req.body.addaddress;
        var aemail = req.body.addemail;
        var apassw = req.body.addpass;

        
        // console.log(req.body);
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

        res.redirect('/');
    })


});

/* Listening to the port 3000 and localhost. */
app.listen(3000, 'localhost', () => {
    console.log("Server is running");
});
    
