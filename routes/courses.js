const express= require('express');
const router = express.Router();
//CRUD

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];
/**
 * GET
 * /api/courses
 */
router.get('/',(req,res) =>{
    res.send(courses);
});
/**
 * GET by ID
 * /api/courses/id
 */
router.get('/:id', (req,res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course)return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
/**
 * 
 * POST
 * /api/courses
 */
router.post('/', (req, res) =>{
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {

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

module.exports = router;