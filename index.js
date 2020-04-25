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
   let captchaServerKey = '6Le88e0UAAAAAFjNaQEnqFhfaiRfx-IGCqQ1UdBg';
   let captchaVerifyURL = 'https://www.google.com/recaptcha/api/siteverify?secret='+ captchaServerKey +'&response=' + captchaToken;
  

superagent.post(captchaVerifyURL)
         .then( (apiResponse)=>{
            if(apiResponse.statusCode == 200){
                res.redirect('/home.html');
            }else{
               console.log('google rejected key' + apiResponse['error-codes']);
               res.redirect('/error.html'); }
        } )
        .catch(()=>{
               console.log('error loading the api response');
               res.redirect('/error.html')
        });
  });

var server = app.listen(process.env.PORT);
