require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wxpxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('Try again', err))


// sukuriama schema:

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


// sukuriamas kursas ir idedamas i schema:

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

const course = new Course ({
    name: "JavaScript courses",
    author: 'Gintautas',
    tags: [ 'hell', 'no' ],
    isPublished: true
});

    const result = await course.save(); //Issaugo duomenis i mongodb

    console.log(result);
}
// createCourse();


// parnesa duomenis is mongodb i terminala :

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}




// Skaiciuojam kiek turim isviso irasu:

async function countCourses() {
    const coursesCount = await Course.count();
    console.log(coursesCount);
}

// countCourses();


// Updatinam:

async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;

    course.name = "dar kiti kursai"
    const result = await course.save();
    console.log(result);

}

// updateCourse('6203a826072c1404604b4406');


// getCourses();


// antras budas updatint :
async function updateCourseTwo(id) {
    const result = await Course.updateOne({
        _id: id }, {
            $set: {
                author: "Antras budas updatui",
                isPublished: false
            }
    })
 
}

//  updateCourseTwo('6203a826072c1404604b4406');

// trecias budas updatint:

async function updateCourseThree(id) {
    const result = await Course.findByIdAndUpdate(id, {
            $set: {
                author: "trecias budas updatui",
                isPublished: true
            }
    }, { new: true});

 console.log(course);
}

//  updateCourseThree('6203a9adb98017951c96574b');

// trinam lauk pirmas budas. pagal id :

async function removeCourse(id) {
    const course = await Course.findByIdAndDelete(id);
    console.log(course);

}

// removeCourse('6203a9adb98017951c96574b');



// trinam lauk daug irasu:

async function removeCourses() {
    const courses = await Course.deleteMany({
        isPublished: true
    });
    console.log(courses)
}
// removeCourses()


async function findCourses() {
    const result = await Course.find({name: /Java/});
    console.log(result);
}
findCourses();