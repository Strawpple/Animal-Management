const express = require('express');
const http = require('http');
const fs = require('fs');

const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
// app.use(express.static(__dirname + 'styles'));
// console.log(__dirname);

app.use(express.static('assets'));
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


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

// var admin = require("firebase-admin");

// var serviceAccount = require("./animal-adoption-management.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://animal-adoption-management-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const db = admin.firestore();
// // console.log(db.collection('adoption'));
// const itemcoll = db.collection('adoption');

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



app.get('/adoptapet',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/adoptapet', data);
});

app.get('/donatetoshelter',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/donatetoshelter', data);
});

app.get('/findadonor',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/findadonor', data);
});


app.get('/account',function (req, res){
    let data = {
        url: req.url,
    }
    res.render('pages/account', data);
});


app.listen(3000, 'localhost', () => {
    console.log("Server is running");
});
    
