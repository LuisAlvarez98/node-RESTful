const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Error",err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});
//Compile that into a model
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
//Create object based on the class Course
const course = new Course({
    name: 'Angular Course',
    author: 'Luis',
    tags: ['angular','front'],
    isPublished: true
});
//Async Operation
const result = await course.save();
console.log(result);
}

async function getCourses(){
  //Comparison Operators
  // eq =
  // ne !=
  // gt >
  // gte >=
  // lt <
  // lte <=
  // in
  // nin
  //Ex. Comparison Operators
  //.find({price: {$gte: 10, $lte: 20} })
  //.find({ price: {$in: [10, 15, 20]} })

  //Logical operators
  // or
  // and
  //.find()
  //.or([{author:'Mosh'}, {isPublished: true}])

   

  //Regular expresions
  // Starts with Luis RE
  // .find({ author: /^Luis/ })
  // //end with alvarez
  // .find({author: /Alvarez$/i})
  // //contains Luis
  // .find({author: /.*Luis.*/i})

  const pageNumber = 2; // pagination
  const pageSize = 10;  // pagination

  const courses = await Course
    .find({author: 'Luis', isPublished: true})
   // .skip((pageNumber - 1) * pageSize) --- pagination
   // .limit(pageSize) -- pagination
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    //.count(); count documents in mongodb
  console.log(courses);
}

getCourses();