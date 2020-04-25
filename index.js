var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const superagent = require('superagent');


//setting middleware
app.use(express.static('public')); //Serves resources from public folder
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//ROUTES
//Submit of the form
app.post('/submitForm', function (req, res) {
   let captchaToken = req.body['g-recaptcha-response'];
   let captchaVerifyURL = 'https://www.google.com/recaptcha/api/siteverify';
   let captchaServerKey = '6Le88e0UAAAAAFjNaQEnqFhfaiRfx-IGCqQ1UdBg';

superagent.post(captchaVerifyURL)
        .send({ secret: captchaServerKey, response: captchaToken })
        .then( (apiResponse)=>{
            if(apiResponse.success){
                res.redirect('/home.html');
            }else{ res.redirect('/error.html'); }
        } )
        .catch(()=> res.redirect('/error.html'));
  });

var server = app.listen(process.env.PORT);
