// requieres express
const express = require("express");
const res = require("express/lib/response");

// create a express server function above
const server = express();

//tell our server how to process different payloads
server.use(express.json())

const PORT = process.env.PORT || 3000;

// make the server listen on a port (on our computer)
server.listen(PORT, () => {
    console.log("Server Listening...");
});


const destinations = []

const students = {
    dao:{
        name: "Dao",
        interests: ["food"],
        city: "Sac Town"
    },
    nikko:{
        name: "Nikko",
        interests: ["food"],
        city: "Detroit"
    },
    will:{
        name: "Will",
        interests: ["camaro", "frontier", "wrangler", "bananas"],
        city: "Detroit"

    }
}
//Get /students
//localhost:3000/students?name=will or localhost:3000/students?city or localhost:3000/students?interests=bananas&city=detroit
server.get("/students/name/:name", (req,res) =>{
    const {name} = req.params;

    if (name) {
       const student = students[name.toLowerCase()];

       if(student) {
       return res.send(student);
    }

    return res
    .status(404)
    .send({error: `Student by the name of ${name} not found`});
}
});
    server.get("/students/city/:city", (req,res) => {
        const {city} = req.params;

    if (city) {
        const filteredStudents = Object.values(students).filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
    );
    return res.send(filteredStudents);
    }
});

server.get("/students/interests/:interests", (req,res) => {
    const {interests} = req.params; 
if (interests) {
    const filteredStudents = Object.values(students).filter((student) => 
    student.interests.includes(interests.toLowerCase())
);
return res.send(filteredStudents);
}
});

server.get("/students/name/:name/city/:city", (req,res) => {
    const { name, city} = req.params;
    if(name,city) {
        const student = students[name.toLowerCase()];
        const filteredStudents = Object.values(students).filter(
            (student) => student.city.toLowerCase() === city.toLowerCase()
            );
    
    return res.send(student),(filteredStudents)
}
});


// CREATE => POST
// POST/destinations
// what is a destination, what makes a destination record?
server.post("/destinations", (req,res) => {
    //ONLY grab what I need
    const {destination,location,photo,description} = req.body
    // const destination = req.body.destination

    //VALIDATE that I got what I expected (destination and location are both present and no empty strings)
    if (!destination || !location || destination.lengt=== 0 || location.lengt=== 0){
       return res.status(400).send({error: "Destination and Location are both required"})
    }
   

    //CREATE the new object to put in my database
    const newDest = {
        destination,
        location,
        photo: photo && photo.lengt !==0 ? photo : "no photo",
        description: description && description.lengt !==0 ? description : ""
    }

    destinations.push(newDest)

    res.redirect(303,"/destinations")
    
} );


//GET /destinations
server.get("/destinations", (req,res) => {
    res.send(destinations);
});