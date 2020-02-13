const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const authenticator = require('./authenticator');
const express  = require('express');
const app = express();

//MiddleWare
app.use(express.json());
//Url encoder
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());


/**
 * Configuration 
 */
console.log('Application Name: ' + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'))
//export NODE_ENV=production used to change environment variable.
if(app.get('env') === 'development'){
    app.use(morgan('tiny')); //Logs the requests.
    console.log("Morgan enabled...")
}
//Custom middleware runs in sequence
app.use(logger);

app.use(authenticator);

//first argument, URL
//second arguments, callback function

//CRUD

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/',(req, res)=>{
    res.send('Hello World!!!!');
});
/**
 * GET
 * /api/courses
 */
app.get('/api/courses',(req,res) =>{
    res.send(courses);
});
/**
 * GET by ID
 * /api/courses/id
 */
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
/**
 * 
 * POST
 * /api/courses
 */
app.post('/api/courses', (req, res) =>{
    if(!req.body.name || req.body.name.length < 3)return res.status(400).send('Name is requiered and should be minimum 3 characters.');

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

/**
 * PUT
 * /api/courses/:id
 */
app.put('/api/courses/:id', (req, res) => {
    //Process
    /*
        Look up for the course
        If not existing, return 404

        Validate
        if invalid, return 400 - Bad request

        Update course
        Return the updated course

    */
   const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course)return res.status(404).send('The course with the given ID was not found');
   

   if(!req.body.name || req.body.name.length < 3)return res.status(400).send('Name is requiered and should be minimum 3 characters.');

    course.name = req.body.name;
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res) => {

    /*
        Look up the course
        Not existing, return 404

        Delete

        Return the same course
    */

   const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course)return res.status(404).send('The course with the given ID was not found');
   
   const index = courses.indexOf(course);
   courses.splice(index,1);

   res.send(course);
});

// PORT Environment Variable
// export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));