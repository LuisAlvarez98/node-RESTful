const express= require('express');
const router = express.Router();
//first argument, URL
//second arguments, callback function

router.get('/',(req, res)=>{
    //res.send('Hello World!!!!');
    //HTML Markup to client pug
    res.render('index',{ title: 'My Express App', message: 'Hello'})
});

module.exports = router;