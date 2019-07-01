const express  = require('express');
const app = express();

//MiddleWare
app.use(express.json());

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
    if(!course)res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
/**
 * 
 * POST
 * /api/courses
 */
app.post('/api/courses', (req, res) =>{
    if(!req.body.name || req.body.name.length < 3){
        //400 BAD REQUEST
        res.status(400).send('Name is requiered and should be minimum 3 characters.');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});





// PORT Environment Variable
// export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));